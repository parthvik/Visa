import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  X,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CardVisual from "@/components/CardVisual";
import axios from "axios";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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
      if (prev.length >= 3) {
        toast.info("You can compare up to 3 cards at a time.");
        return prev;
      }
      return [...prev, cardId];
    });
    setComparison(null);
  };

  const handleCompare = async () => {
    if (selectedCards.length < 2) {
      toast.error("Select at least 2 cards to compare.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/cards/compare`, {
        card_ids: selectedCards,
      });
      setComparison(res.data.comparison);
    } catch (e) {
      toast.error("Failed to compare cards.");
    } finally {
      setLoading(false);
    }
  };

  // Collect all unique categories across selected cards
  const allCategories = comparison
    ? Array.from(new Set(comparison.flatMap((c) => c.categories))).sort()
    : [];

  return (
    <div className="min-h-screen pt-16" data-testid="compare-page">
      {/* Header */}
      <section className="hero-section relative py-12 md:py-16" data-testid="compare-hero">
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white/60 hover:text-white hover:bg-white/10 gap-2 -ml-2 mb-6"
            data-testid="compare-back-button"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] mb-3">
            Side by Side
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-white tracking-tight leading-none">
            Compare Cards
          </h1>
          <p className="text-base text-slate-300 mt-4 max-w-lg">
            Select 2 or 3 cards to compare their benefits side by side and find the best fit for your lifestyle.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Card Selection */}
      <section className="py-12" data-testid="compare-selector">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-slate-700 mb-6">
            Select cards to compare ({selectedCards.length}/3)
          </p>
          <div className="flex flex-wrap gap-6 justify-center mb-8">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <CardVisual
                  cardId={card.id}
                  cardName={card.name}
                  tier={card.tier}
                  size="sm"
                  onClick={() => toggleCard(card.id)}
                  selected={selectedCards.includes(card.id)}
                />
                <p className="text-xs font-medium text-slate-600">{card.name}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={handleCompare}
              disabled={selectedCards.length < 2 || loading}
              className="rounded-none uppercase tracking-widest font-bold text-xs py-5 px-8 bg-[#1A1F71] hover:bg-[#0A0E45] text-white transition-all duration-300 hover:tracking-[0.2em] gap-2"
              data-testid="compare-button"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Compare Now</>
              )}
            </Button>
            {selectedCards.length > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCards([]);
                  setComparison(null);
                }}
                className="rounded-none uppercase tracking-widest font-bold text-xs py-5 px-8"
                data-testid="clear-selection-button"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      {comparison && (
        <section className="py-12 md:py-16 bg-slate-50" data-testid="comparison-results">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Comparison Results
            </h2>

            {/* Overview Row */}
            <div className="grid gap-6 mb-12" style={{ gridTemplateColumns: `repeat(${comparison.length}, 1fr)` }}>
              {comparison.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-slate-100 bg-white p-6 text-center hover:shadow-lg transition-all duration-300"
                  data-testid={`compare-overview-${card.id}`}
                >
                  <h3 className="text-lg font-bold text-slate-900">{card.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">{card.tagline}</p>
                  <div className="mt-4 flex justify-center gap-3">
                    <Badge className="bg-[#1A1F71]/10 text-[#1A1F71] border-[#1A1F71]/20">
                      {card.annual_fee}/yr
                    </Badge>
                    <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20">
                      {card.benefit_count} benefits
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/benefits/${card.id}`)}
                    className="mt-4 text-xs text-[#1A1F71] gap-1"
                    data-testid={`view-details-${card.id}`}
                  >
                    View Details <ChevronRight className="w-3 h-3" />
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Category Comparison */}
            <div className="space-y-6">
              {allCategories.map((category) => (
                <div key={category} className="rounded-xl border border-slate-100 bg-white overflow-hidden" data-testid={`compare-category-${category}`}>
                  <div className="px-6 py-3 bg-slate-50 border-b border-slate-100">
                    <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                      {category}
                    </h4>
                  </div>
                  <div className="grid divide-x divide-slate-100" style={{ gridTemplateColumns: `repeat(${comparison.length}, 1fr)` }}>
                    {comparison.map((card) => {
                      const benefits = card.benefits.filter(
                        (b) => b.category === category
                      );
                      return (
                        <div key={card.id} className="p-5">
                          {benefits.length > 0 ? (
                            <div className="space-y-3">
                              {benefits.map((b) => (
                                <div key={b.id} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm font-medium text-slate-800">
                                      {b.title}
                                    </p>
                                    <p className="text-xs text-[#D4AF37] font-mono">
                                      {b.max_value}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-slate-300">
                              <X className="w-4 h-4" />
                              <span className="text-sm">Not available</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
