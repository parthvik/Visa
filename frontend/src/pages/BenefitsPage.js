import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  Plane,
  Utensils,
  ShoppingBag,
  Shield,
  Lock,
  HeartPulse,
  Ticket,
  Zap,
  Headphones,
  Clock,
  CreditCard,
  Car,
  Banknote,
  Tag,
  Building,
  Armchair,
  Flag,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardVisual from "@/components/CardVisual";
import LanguageSelector from "@/components/LanguageSelector";
import AIChatPanel from "@/components/AIChatPanel";
import axios from "axios";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ICON_MAP = {
  plane: Plane,
  utensils: Utensils,
  "shopping-bag": ShoppingBag,
  shield: Shield,
  lock: Lock,
  "heart-pulse": HeartPulse,
  ticket: Ticket,
  zap: Zap,
  headphones: Headphones,
  clock: Clock,
  "credit-card": CreditCard,
  car: Car,
  banknote: Banknote,
  tag: Tag,
  building: Building,
  armchair: Armchair,
  flag: Flag,
  sparkles: Sparkles,
  layers: Layers,
};

function BenefitIcon({ name, className }) {
  const Icon = ICON_MAP[name] || Shield;
  return <Icon className={className} strokeWidth={1.5} />;
}

export default function BenefitsPage() {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [language, setLanguage] = useState("en");
  const [summarizing, setSummarizing] = useState({});
  const [summaries, setSummaries] = useState({});
  const [contextInput, setContextInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardRes, catRes] = await Promise.all([
          axios.get(`${API}/cards/${cardId}`),
          axios.get(`${API}/categories`),
        ]);
        setCard(cardRes.data);
        setCategories(catRes.data.categories);
      } catch (e) {
        console.error("Failed to fetch card data", e);
        navigate("/");
      }
    };
    fetchData();
  }, [cardId, navigate]);

  const filteredBenefits =
    card?.benefits?.filter(
      (b) => activeCategory === "all" || b.category === activeCategory
    ) || [];

  const handleSummarize = async (benefitId) => {
    setSummarizing((prev) => ({ ...prev, [benefitId]: true }));
    try {
      const res = await axios.post(`${API}/benefits/summarize`, {
        card_id: cardId,
        benefit_id: benefitId,
        language: language,
        context: contextInput || null,
      });
      const summary = res.data.summaries[0];
      setSummaries((prev) => ({ ...prev, [benefitId]: summary.summary }));
      toast.success("AI summary generated!");
    } catch (e) {
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setSummarizing((prev) => ({ ...prev, [benefitId]: false }));
    }
  };

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16" data-testid="loading-state">
        <Loader2 className="w-8 h-8 animate-spin text-[#1A1F71]" />
      </div>
    );
  }

  const cardCategories = [
    { id: "all", name: "All Benefits", icon: "layers" },
    ...Array.from(new Set(card.benefits.map((b) => b.category))).map((cat) => {
      const catData = categories.find((c) => c.id === cat);
      return { id: cat, name: cat, icon: catData?.icon || "shield" };
    }),
  ];

  return (
    <div className="min-h-screen pt-16" data-testid="benefits-page">
      {/* Hero Banner */}
      <section className="hero-section relative py-16 md:py-24" data-testid="benefits-hero">
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-white/60 hover:text-white hover:bg-white/10 gap-2 -ml-2"
              data-testid="back-button"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </div>

          <div className="mt-8 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
            <CardVisual
              cardId={card.id}
              cardName={card.name}
              tier={card.tier}
              size="lg"
            />
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] mb-3">
                {card.tier} Card Benefits
              </p>
              <h1 className="font-display text-4xl md:text-6xl text-white tracking-tight leading-none mb-4">
                {card.name}
              </h1>
              <p className="text-base text-slate-300 mb-3">{card.tagline}</p>
              <div className="flex items-center gap-4">
                <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30 hover:bg-[#D4AF37]/30">
                  {card.annual_fee}/year
                </Badge>
                <Badge className="bg-white/10 text-white/80 border-white/20 hover:bg-white/20">
                  {card.benefits.length} Benefits
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Controls Bar */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-slate-100 py-4" data-testid="controls-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {cardCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`category-pill flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? "active"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  data-testid={`category-${cat.id}`}
                >
                  <BenefitIcon name={cat.icon} className="w-3.5 h-3.5" />
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector value={language} onChange={setLanguage} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16" data-testid="benefits-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="benefits" className="w-full">
            <TabsList className="mb-8 bg-slate-100/80" data-testid="content-tabs">
              <TabsTrigger value="benefits" data-testid="tab-benefits">
                All Benefits
              </TabsTrigger>
              <TabsTrigger value="chat" data-testid="tab-chat">
                AI Advisor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="benefits" data-testid="benefits-tab-content">
              {/* Context Input */}
              <div className="mb-8 p-5 rounded-xl bg-slate-50 border border-slate-100" data-testid="context-input-section">
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  Personalize your summaries
                </p>
                <p className="text-xs text-slate-400 mb-3">
                  Tell us what you're doing (e.g., "booking a flight to Tokyo", "shopping online") for
                  contextual recommendations.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={contextInput}
                    onChange={(e) => setContextInput(e.target.value)}
                    placeholder="e.g., planning a vacation to Europe..."
                    className="flex-1 h-10 px-4 text-sm rounded-lg bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-[#1A1F71]/20 focus:border-[#1A1F71]/30 transition-all"
                    data-testid="context-input"
                  />
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-enter" data-testid="benefits-grid">
                {filteredBenefits.map((benefit) => (
                  <motion.div
                    key={benefit.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="group rounded-xl border border-slate-100 bg-white p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500"
                    data-testid={`benefit-card-${benefit.id}`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1F71]/5 flex items-center justify-center group-hover:bg-[#1A1F71] transition-colors duration-300">
                        <BenefitIcon
                          name={benefit.icon}
                          className="w-5 h-5 text-[#1A1F71] group-hover:text-[#D4AF37] transition-colors duration-300"
                        />
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-mono uppercase tracking-wider"
                      >
                        {benefit.category}
                      </Badge>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-semibold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-3">
                      {benefit.description}
                    </p>

                    {/* Value */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Value
                      </span>
                      <span className="text-sm font-bold text-[#1A1F71]">
                        {benefit.max_value}
                      </span>
                    </div>

                    {/* AI Summary */}
                    {summaries[benefit.id] && (
                      <div
                        className="mb-4 p-3.5 rounded-lg bg-[#1A1F71]/[0.03] border border-[#1A1F71]/10"
                        data-testid={`summary-${benefit.id}`}
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span className="text-xs font-semibold text-[#1A1F71]">
                            AI Summary
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {summaries[benefit.id]}
                        </p>
                      </div>
                    )}

                    {/* Summarize Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSummarize(benefit.id)}
                      disabled={summarizing[benefit.id]}
                      className="w-full gap-2 text-xs border-[#1A1F71]/20 text-[#1A1F71] hover:bg-[#1A1F71] hover:text-white transition-all duration-300"
                      data-testid={`summarize-btn-${benefit.id}`}
                    >
                      {summarizing[benefit.id] ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3" />
                          {summaries[benefit.id]
                            ? "Regenerate Summary"
                            : "AI Summarize"}
                        </>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {filteredBenefits.length === 0 && (
                <div className="text-center py-16" data-testid="no-benefits">
                  <p className="text-slate-400">
                    No benefits found in this category.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="chat" data-testid="chat-tab-content">
              <div className="max-w-2xl mx-auto">
                <AIChatPanel
                  cardId={card.id}
                  cardName={card.name}
                  language={language}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
