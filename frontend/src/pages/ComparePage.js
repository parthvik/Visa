import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Check, X, Loader2, ChevronRight, Sparkles, ArrowRight, Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CardVisual from "@/components/CardVisual";
import axios from "axios";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TIER_ORDER = ["classic", "gold", "platinum", "signature", "infinite"];

export default function ComparePage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(`${API}/cards`);
        setCards(res.data.cards);
      } catch (e) {
        console.error("Failed to fetch cards", e);
      }
    };
    fetchCards();
  }, []);

  const toggleCard = (cardId) => {
    setSelectedCards((prev) => {
      if (prev.includes(cardId)) return prev.filter((id) => id !== cardId);
      if (prev.length >= 3) { toast.info("You can compare up to 3 cards."); return prev; }
      return [...prev, cardId];
    });
    setComparison(null);
  };

  const handleCompare = async () => {
    if (selectedCards.length < 2) { toast.error("Select at least 2 cards."); return; }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/cards/compare`, { card_ids: selectedCards });
      setComparison(res.data.comparison);
    } catch { toast.error("Failed to compare cards."); }
    finally { setLoading(false); }
  };

  const allCategories = comparison
    ? Array.from(new Set(comparison.flatMap((c) => c.categories))).sort()
    : [];

  // Find "best" card (most benefits)
  const bestCardId = comparison
    ? comparison.reduce((best, c) => c.benefit_count > best.benefit_count ? c : best, comparison[0])?.id
    : null;

  return (
    <div className="min-h-screen pt-16" data-testid="compare-page">
      {/* Hero */}
      <section className="relative overflow-hidden" data-testid="compare-hero"
        style={{ background: "linear-gradient(145deg, #020617 0%, #0A0E45 30%, #1A1F71 60%, #0A0E45 100%)" }}
      >
        <div className="noise absolute inset-0 pointer-events-none" />
        <div className="orb orb-gold" style={{ width: 400, height: 400, top: '-20%', right: '20%' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white/50 hover:text-white hover:bg-white/8 gap-2 -ml-2 mb-6 rounded-full"
            data-testid="compare-back-button"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4AF37]">Side by Side</p>
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-white tracking-tight leading-none mb-4">
            Compare Cards
          </h1>
          <p className="text-base text-slate-400 max-w-lg">
            Select 2 or 3 cards to compare benefits side by side. Find the perfect card for your lifestyle.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FAFAFA] to-transparent z-20" />
      </section>

      {/* Card Selection */}
      <section className="py-14" data-testid="compare-selector">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-bold text-slate-800">Select cards to compare</p>
              <p className="text-xs text-slate-400 mt-1">Choose {selectedCards.length}/3 cards</p>
            </div>
            <div className="flex gap-2">
              {selectedCards.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setSelectedCards([]); setComparison(null); }}
                  className="text-xs text-slate-400 rounded-full"
                  data-testid="clear-selection-button"
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>

          {/* Card grid */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {cards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex flex-col items-center gap-3"
              >
                <div className={`relative transition-all duration-300 ${selectedCards.includes(card.id) ? "scale-[1.02]" : ""}`}>
                  <CardVisual
                    cardId={card.id}
                    cardName={card.name}
                    tier={card.tier}
                    size="sm"
                    onClick={() => toggleCard(card.id)}
                    selected={selectedCards.includes(card.id)}
                  />
                  {selectedCards.includes(card.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-lg z-20"
                    >
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    </motion.div>
                  )}
                </div>
                <p className="text-xs font-semibold text-slate-700">{card.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Compare button */}
          <div className="flex justify-center">
            <Button
              onClick={handleCompare}
              disabled={selectedCards.length < 2 || loading}
              className="rounded-full text-xs font-bold py-5 px-10 bg-[#1A1F71] hover:bg-[#0A0E45] text-white shadow-lg shadow-[#1A1F71]/20 transition-all duration-500 tracking-widest uppercase gap-2 disabled:opacity-30"
              data-testid="compare-button"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Compare Now <ArrowRight className="w-4 h-4" /></>}
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Results */}
      <AnimatePresence>
        {comparison && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="py-14 md:py-20 bg-slate-50/50"
            data-testid="comparison-results"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-10">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Comparison Results</h2>
              </div>

              {/* Overview Cards */}
              <div className="grid gap-5 mb-14" style={{ gridTemplateColumns: `repeat(${comparison.length}, 1fr)` }}>
                {comparison.map((card) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative rounded-2xl p-6 text-center transition-all duration-500 ${
                      card.id === bestCardId
                        ? "bg-gradient-to-br from-[#1A1F71] to-[#0A0E45] text-white shadow-xl shadow-[#1A1F71]/15"
                        : "bg-white border border-slate-100 hover:shadow-lg"
                    }`}
                    data-testid={`compare-overview-${card.id}`}
                  >
                    {card.id === bestCardId && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#D4AF37] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        <Crown className="w-3 h-3" /> Best Match
                      </div>
                    )}
                    <h3 className={`text-lg font-bold ${card.id === bestCardId ? "text-white" : "text-slate-900"}`}>
                      {card.name}
                    </h3>
                    <p className={`text-xs mt-1 ${card.id === bestCardId ? "text-white/60" : "text-slate-400"}`}>
                      {card.tagline}
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                      <Badge className={`rounded-full text-[10px] ${
                        card.id === bestCardId
                          ? "bg-white/15 text-white border-white/20"
                          : "bg-[#1A1F71]/8 text-[#1A1F71] border-[#1A1F71]/15"
                      }`}>
                        {card.annual_fee}/yr
                      </Badge>
                      <Badge className={`rounded-full text-[10px] ${
                        card.id === bestCardId
                          ? "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30"
                          : "bg-[#D4AF37]/8 text-[#D4AF37] border-[#D4AF37]/15"
                      }`}>
                        {card.benefit_count} benefits
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/benefits/${card.id}`)}
                      className={`mt-4 text-xs gap-1 rounded-full ${
                        card.id === bestCardId ? "text-white/70 hover:text-white hover:bg-white/10" : "text-[#1A1F71]"
                      }`}
                      data-testid={`view-details-${card.id}`}
                    >
                      View Details <ChevronRight className="w-3 h-3" />
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Category-by-category comparison */}
              <div className="space-y-4">
                {allCategories.map((category, ci) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ci * 0.05, duration: 0.4 }}
                    className="rounded-2xl border border-slate-100 bg-white overflow-hidden"
                    data-testid={`compare-category-${category}`}
                  >
                    <div className="px-6 py-3.5 bg-slate-50/80 border-b border-slate-100/80">
                      <h4 className="text-xs font-bold text-slate-600 uppercase tracking-[0.15em]">{category}</h4>
                    </div>
                    <div className="grid divide-x divide-slate-100/80" style={{ gridTemplateColumns: `repeat(${comparison.length}, 1fr)` }}>
                      {comparison.map((card) => {
                        const benefits = card.benefits.filter((b) => b.category === category);
                        return (
                          <div key={card.id} className="p-5">
                            {benefits.length > 0 ? (
                              <div className="space-y-3">
                                {benefits.map((b) => (
                                  <div key={b.id} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <Check className="w-3 h-3 text-emerald-500" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-slate-800">{b.title}</p>
                                      <p className="text-[11px] text-[#D4AF37] font-mono mt-0.5">{b.max_value}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-slate-200 py-2">
                                <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center">
                                  <X className="w-3 h-3 text-slate-300" />
                                </div>
                                <span className="text-sm text-slate-300">Not available</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
