from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from card_data import CARD_TIERS, SUPPORTED_LANGUAGES, BENEFIT_CATEGORIES, CONTEXT_TRIGGERS
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# LLM Key
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

app = FastAPI()
api_router = APIRouter(prefix="/api")

# --- Pydantic Models ---

class SummarizeRequest(BaseModel):
    card_id: str
    benefit_id: Optional[str] = None
    language: str = "en"
    context: Optional[str] = None

class ChatRequest(BaseModel):
    card_id: str
    message: str
    language: str = "en"
    session_id: Optional[str] = None

class CompareRequest(BaseModel):
    card_ids: List[str]

# --- Helper Functions ---

async def get_ai_summary(card_name: str, benefit_title: str, benefit_description: str, language: str, context: str = None):
    """Generate AI-powered benefit summary using Emergent LLM."""
    lang_name = "English"
    for lang in SUPPORTED_LANGUAGES:
        if lang["code"] == language:
            lang_name = lang["name"]
            break

    context_hint = ""
    if context:
        context_hint = f"\nThe user is currently interested in: {context}. Emphasize how this benefit is relevant to their current situation."

    system_message = f"""You are a friendly, knowledgeable Visa card benefits advisor. Your job is to explain credit card benefits in a clear, concise, and engaging way that makes cardholders excited about their perks.

Rules:
- Be concise but informative (2-3 short paragraphs max)
- Use a warm, professional tone
- Highlight the most valuable aspects
- Include a practical example of when this benefit would be useful
- If the language is not English, respond ENTIRELY in {lang_name}
- Do NOT use markdown headers or bullet points, use flowing prose
- End with a brief actionable tip"""

    prompt = f"""Summarize this {card_name} benefit for a cardholder:

Benefit: {benefit_title}
Details: {benefit_description}
{context_hint}

Provide a friendly, personalized summary that helps the cardholder understand and use this benefit. Respond in {lang_name}."""

    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"summary-{uuid.uuid4()}",
            system_message=system_message
        )
        chat.with_model("openai", "gpt-5.2")
        response = await chat.send_message(UserMessage(text=prompt))
        return response
    except Exception as e:
        logger.error(f"AI summarization error: {e}")
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")


async def get_ai_chat_response(card_name: str, card_benefits: list, message: str, language: str):
    """Chat with AI about card benefits."""
    lang_name = "English"
    for lang in SUPPORTED_LANGUAGES:
        if lang["code"] == language:
            lang_name = lang["name"]
            break

    benefits_text = "\n".join([
        f"- {b['title']} ({b['category']}): {b['description']}" for b in card_benefits
    ])

    system_message = f"""You are a helpful Visa card benefits advisor chatbot. You help cardholders understand and maximize their card benefits.

Card: {card_name}
Available Benefits:
{benefits_text}

Rules:
- Be concise and helpful (keep responses under 150 words)
- Only discuss benefits that this specific card has
- If asked about a benefit not available on this card, suggest upgrading
- Provide practical, actionable advice
- If the language is not English, respond ENTIRELY in {lang_name}
- Be warm and professional"""

    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"chat-{uuid.uuid4()}",
            system_message=system_message
        )
        chat.with_model("openai", "gpt-5.2")
        response = await chat.send_message(UserMessage(text=message))
        return response
    except Exception as e:
        logger.error(f"AI chat error: {e}")
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")


# --- API Routes ---

@api_router.get("/")
async def root():
    return {"message": "Visa Card Benefits AI Agent API"}

@api_router.get("/cards")
async def get_cards():
    """Get all available card types."""
    cards = []
    for card_id, card in CARD_TIERS.items():
        cards.append({
            "id": card["id"],
            "name": card["name"],
            "tier": card["tier"],
            "tagline": card["tagline"],
            "annual_fee": card["annual_fee"],
            "color_primary": card["color_primary"],
            "color_secondary": card["color_secondary"],
            "gradient": card["gradient"],
            "benefit_count": len(card["benefits"])
        })
    return {"cards": cards}

@api_router.get("/cards/{card_id}")
async def get_card(card_id: str):
    """Get a specific card with all benefits."""
    card = CARD_TIERS.get(card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card

@api_router.get("/cards/{card_id}/benefits")
async def get_card_benefits(card_id: str, category: Optional[str] = None):
    """Get benefits for a specific card, optionally filtered by category."""
    card = CARD_TIERS.get(card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    benefits = card["benefits"]
    if category and category != "all":
        benefits = [b for b in benefits if b["category"] == category]

    return {
        "card_id": card_id,
        "card_name": card["name"],
        "benefits": benefits,
        "total": len(benefits)
    }

@api_router.post("/benefits/summarize")
async def summarize_benefit(request: SummarizeRequest):
    """AI-powered benefit summarization."""
    card = CARD_TIERS.get(request.card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    if request.benefit_id:
        benefit = next((b for b in card["benefits"] if b["id"] == request.benefit_id), None)
        if not benefit:
            raise HTTPException(status_code=404, detail="Benefit not found")
        benefits_to_summarize = [benefit]
    else:
        benefits_to_summarize = card["benefits"][:3]

    summaries = []
    for benefit in benefits_to_summarize:
        summary = await get_ai_summary(
            card["name"], benefit["title"], benefit["description"],
            request.language, request.context
        )
        summaries.append({
            "benefit_id": benefit["id"],
            "benefit_title": benefit["title"],
            "category": benefit["category"],
            "summary": summary,
            "language": request.language
        })

    # Store in MongoDB
    query_doc = {
        "id": str(uuid.uuid4()),
        "card_id": request.card_id,
        "language": request.language,
        "context": request.context,
        "summaries": summaries,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    await db.benefit_queries.insert_one(query_doc)

    return {"summaries": summaries}

@api_router.post("/chat")
async def chat_with_agent(request: ChatRequest):
    """Chat with the AI benefits agent."""
    card = CARD_TIERS.get(request.card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    response = await get_ai_chat_response(
        card["name"], card["benefits"], request.message, request.language
    )

    session_id = request.session_id or str(uuid.uuid4())

    # Store in MongoDB
    chat_doc = {
        "id": str(uuid.uuid4()),
        "session_id": session_id,
        "card_id": request.card_id,
        "user_message": request.message,
        "ai_response": response,
        "language": request.language,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    await db.chat_history.insert_one(chat_doc)

    return {
        "response": response,
        "session_id": session_id
    }

@api_router.post("/cards/compare")
async def compare_cards(request: CompareRequest):
    """Compare benefits across multiple cards."""
    if len(request.card_ids) < 2:
        raise HTTPException(status_code=400, detail="Provide at least 2 cards to compare")

    comparison = []
    for card_id in request.card_ids:
        card = CARD_TIERS.get(card_id)
        if not card:
            raise HTTPException(status_code=404, detail=f"Card '{card_id}' not found")
        comparison.append({
            "id": card["id"],
            "name": card["name"],
            "tier": card["tier"],
            "annual_fee": card["annual_fee"],
            "tagline": card["tagline"],
            "benefit_count": len(card["benefits"]),
            "categories": list(set(b["category"] for b in card["benefits"])),
            "benefits": card["benefits"]
        })

    return {"comparison": comparison}

@api_router.get("/cards/{card_id}/recommend")
async def get_recommendation(card_id: str, context: Optional[str] = None):
    """Get contextual benefit recommendation."""
    card = CARD_TIERS.get(card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    if context:
        context_lower = context.lower()
        for trigger_key, trigger in CONTEXT_TRIGGERS.items():
            if any(kw in context_lower for kw in trigger["keywords"]):
                relevant = [b for b in card["benefits"] if b["category"] in trigger["relevant_categories"]]
                if relevant:
                    return {
                        "recommendation": relevant[0],
                        "context_message": trigger["message"],
                        "all_relevant": relevant
                    }

    # Default: return the highest-value benefit
    return {
        "recommendation": card["benefits"][0],
        "context_message": f"Here's the top benefit of your {card['name']}.",
        "all_relevant": card["benefits"][:3]
    }

@api_router.get("/languages")
async def get_languages():
    """Get all supported languages."""
    return {"languages": SUPPORTED_LANGUAGES}

@api_router.get("/categories")
async def get_categories():
    """Get benefit categories."""
    return {"categories": BENEFIT_CATEGORIES}

# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
