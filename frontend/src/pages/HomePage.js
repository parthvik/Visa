import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Globe,
  Shield,
  Zap,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CardVisual from "@/components/CardVisual";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    desc: "Get personalized benefit summaries tailored to your lifestyle and spending habits.",
  },
  {
    icon: Globe,
    title: "25+ Languages",
    desc: "Understand your benefits in your preferred language with real-time AI translation.",
  },
  {
    icon: Shield,
    title: "Smart Recommendations",
    desc: "Contextual suggestions that surface the right benefit at the right moment.",
  },
  {
    icon: Zap,
    title: "Instant Answers",
    desc: "Chat with our AI advisor to get clear answers about any card benefit instantly.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

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

  const handleCardSelect = (card) => {
    setSelectedCard(card.id);
    setTimeout(() => navigate(`/benefits/${card.id}`), 400);
  };

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="hero-section relative min-h-[85vh] flex items-center pt-16" data-testid="hero-section">
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-6">
                AI-Powered Benefits Agent
              </p>
              <h1 className="font-display text-5xl md:text-7xl text-white tracking-tight leading-none mb-8">
                Unlock Your
                <span className="block text-[#D4AF37] mt-2">Card's Full Potential</span>
              </h1>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-lg mb-10">
                Discover, understand, and maximize every benefit of your Visa card.
                Our AI agent delivers personalized insights in your language, instantly.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => {
                    document
                      .getElementById("card-selector")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-none uppercase tracking-widest font-bold text-xs py-6 px-8 bg-[#D4AF37] hover:bg-[#AA8C2C] text-white shadow-lg shadow-yellow-900/20 transition-all duration-300 hover:tracking-[0.2em]"
                  data-testid="explore-benefits-btn"
                >
                  Explore Benefits
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/compare")}
                  className="rounded-none uppercase tracking-widest font-bold text-xs py-6 px-8 border-white/20 text-white hover:bg-white/10 hover:text-white transition-all duration-300"
                  data-testid="compare-cards-btn"
                >
                  Compare Cards
                </Button>
              </div>
            </motion.div>

            {/* Right: Floating Cards */}
            <motion.div
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Back card */}
                <div className="absolute -top-4 -left-4 opacity-40 blur-[1px] transform rotate-[-6deg] scale-95">
                  <CardVisual cardId="infinite" cardName="Visa Infinite" tier="Infinite" size="md" />
                </div>
                {/* Front card */}
                <div className="relative z-10 transform rotate-[3deg]">
                  <CardVisual cardId="gold" cardName="Visa Gold" tier="Gold" size="md" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] mb-3">
              Why use our agent
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Benefits, Simplified
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-xl border border-slate-100 bg-white p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500"
                data-testid={`feature-card-${i}`}
              >
                <div className="w-11 h-11 rounded-lg bg-[#1A1F71]/5 flex items-center justify-center mb-6 group-hover:bg-[#1A1F71] transition-colors duration-300">
                  <feat.icon
                    className="w-5 h-5 text-[#1A1F71] group-hover:text-[#D4AF37] transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Card Selector Section */}
      <section id="card-selector" className="py-24 md:py-32 bg-slate-50" data-testid="card-selector-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] mb-3">
              Select Your Card
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Choose Your Visa Card
            </h2>
            <p className="text-base text-slate-500 max-w-xl mx-auto">
              Select your card type to discover AI-powered benefit summaries,
              personalized recommendations, and more.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center">
            <AnimatePresence>
              {cards.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex flex-col items-center gap-4"
                >
                  <CardVisual
                    cardId={card.id}
                    cardName={card.name}
                    tier={card.tier}
                    size="sm"
                    onClick={() => handleCardSelect(card)}
                    selected={selectedCard === card.id}
                  />
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-900">{card.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{card.tagline}</p>
                    <p className="text-xs font-mono text-[#D4AF37] mt-1">
                      {card.benefit_count} benefits
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCardSelect(card)}
                    className="text-xs text-[#1A1F71] hover:bg-[#1A1F71]/5 gap-1"
                    data-testid={`explore-card-${card.id}`}
                  >
                    Explore <ChevronRight className="w-3 h-3" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#1A1F71]" strokeWidth={1.5} />
            <span className="text-sm text-slate-400">
              Visa Card Benefits AI Agent
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Demo application. Not affiliated with Visa Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
