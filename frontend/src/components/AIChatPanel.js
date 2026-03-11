import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AIChatPanel({ cardId, cardName, language }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Welcome! I'm your ${cardName} benefits advisor, powered by AI. Ask me anything about your card's perks -- travel insurance, dining rewards, purchase protection, or how to maximize your benefits. How can I help you today?`,
      },
    ]);
    setSessionId(null);
  }, [cardId, cardName]);

  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await axios.post(`${API}/chat`, {
        card_id: cardId, message: userMsg, language, session_id: sessionId,
      });
      setSessionId(res.data.session_id);
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.response }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again in a moment.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const quickQuestions = [
    "What's my best travel benefit?",
    "How does purchase protection work?",
    "Tell me about dining rewards",
    "What insurance is included?",
  ];

  return (
    <div className="flex flex-col h-[540px] rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06)]" data-testid="ai-chat-panel">
      {/* Header */}
      <div className="flex items-center gap-3.5 px-6 py-4 border-b border-slate-100/80 bg-gradient-to-r from-slate-50/80 to-white">
        <div className="w-9 h-9 rounded-xl bg-[#1A1F71] flex items-center justify-center shadow-md shadow-[#1A1F71]/15">
          <Bot className="w-4.5 h-4.5 text-[#D4AF37]" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">Benefits Advisor</p>
          <p className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-[0.2em]">GPT-5.2 Powered</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-600 font-medium">Live</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-5 py-4" ref={scrollRef}>
        <div className="space-y-4" data-testid="chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              data-testid={`chat-message-${i}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "user" ? "bg-[#1A1F71]" : "bg-slate-100"
              }`}>
                {msg.role === "user"
                  ? <User className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                  : <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
                }
              </div>
              <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user" ? "user-bubble" : "ai-bubble"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2.5" data-testid="chat-loading">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <div className="ai-bubble px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick questions */}
      {messages.length <= 1 && (
        <div className="px-5 pb-2 flex flex-wrap gap-1.5" data-testid="quick-questions">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50); }}
              className="text-[11px] px-3 py-1.5 rounded-full border border-slate-200/80 text-slate-400 hover:bg-[#1A1F71]/5 hover:text-[#1A1F71] hover:border-[#1A1F71]/15 transition-all duration-300"
              data-testid={`quick-question-${i}`}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-5 pb-5 pt-2">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#1A1F71]/15 focus-within:border-[#1A1F71]/25 focus-within:bg-white transition-all duration-300">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your card benefits..."
            className="flex-1 bg-transparent text-sm outline-none text-slate-900 placeholder:text-slate-300"
            disabled={loading}
            data-testid="chat-input"
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-lg bg-[#1A1F71] hover:bg-[#0A0E45] disabled:opacity-20 shadow-sm transition-all duration-300"
            data-testid="chat-send-button"
          >
            <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}
