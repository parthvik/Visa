import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
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
    // Welcome message
    setMessages([
      {
        role: "assistant",
        content: `Welcome! I'm your ${cardName} benefits advisor. Ask me anything about your card's perks, travel insurance, dining rewards, or how to maximize your benefits. How can I help you today?`,
      },
    ]);
    setSessionId(null);
  }, [cardId, cardName]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
        card_id: cardId,
        message: userMsg,
        language: language,
        session_id: sessionId,
      });
      setSessionId(res.data.session_id);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.response },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What's my best travel benefit?",
    "How does purchase protection work?",
    "Tell me about dining rewards",
    "What insurance is included?",
  ];

  return (
    <div
      className="flex flex-col h-[500px] rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
      data-testid="ai-chat-panel"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100 bg-slate-50/50">
        <div className="w-8 h-8 rounded-lg bg-[#1A1F71] flex items-center justify-center">
          <Bot className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Benefits Advisor</p>
          <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
            AI Powered
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-400">Online</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4" data-testid="chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
              data-testid={`chat-message-${i}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user"
                    ? "bg-[#1A1F71]"
                    : "bg-slate-100"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                ) : (
                  <Bot className="w-3.5 h-3.5 text-[#1A1F71]" strokeWidth={1.5} />
                )}
              </div>
              <div
                className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user" ? "user-bubble" : "ai-bubble"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2.5" data-testid="chat-loading">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-[#1A1F71]" strokeWidth={1.5} />
              </div>
              <div className="ai-bubble px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#1A1F71]" />
                <span className="text-sm text-slate-400">Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick questions (only when no user messages) */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5" data-testid="quick-questions">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(q);
                setTimeout(() => inputRef.current?.focus(), 50);
              }}
              className="text-xs px-3 py-1.5 rounded-full border border-slate-200 text-slate-500 hover:bg-[#1A1F71]/5 hover:text-[#1A1F71] hover:border-[#1A1F71]/20 transition-all duration-200"
              data-testid={`quick-question-${i}`}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 pt-2">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:ring-2 focus-within:ring-[#1A1F71]/20 focus-within:border-[#1A1F71]/30 transition-all">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your card benefits..."
            className="flex-1 bg-transparent text-sm outline-none text-slate-900 placeholder:text-slate-400"
            disabled={loading}
            data-testid="chat-input"
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-lg bg-[#1A1F71] hover:bg-[#0A0E45] disabled:opacity-30"
            data-testid="chat-send-button"
          >
            <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}
