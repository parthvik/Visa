import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Globe,
  Shield,
  Zap,
  CreditCard,
  ChevronRight,
  Brain,
  Languages,
  TrendingUp,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CardVisual from "@/components/CardVisual";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* Animated counter hook */
function useCounter(target, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!startOnView || !isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, isInView, startOnView]);
  return { count, ref };
}

const FEATURES = [
  { icon: Brain, title: "GPT-5.2 Intelligence", desc: "Powered by the latest generative AI for nuanced, context-aware benefit explanations tailored to your situation.", color: "from-violet-500/10 to-indigo-500/10", iconColor: "text-indigo-600" },
  { icon: Languages, title: "25+ Languages", desc: "Instantly understand your benefits in any language. Real-time AI translation that preserves tone and clarity.", color: "from-emerald-500/10 to-teal-500/10", iconColor: "text-emerald-600" },
  { icon: Shield, title: "Smart Recommendations", desc: "Contextual AI that surfaces the right benefit at the right moment. Tell us your plans, we'll find the perfect perk.", color: "from-amber-500/10 to-orange-500/10", iconColor: "text-amber-600" },
  { icon: Zap, title: "Instant AI Advisor", desc: "Chat naturally with your personal benefits advisor. Ask anything about your card perks and get clear, actionable answers.", color: "from-rose-500/10 to-pink-500/10", iconColor: "text-rose-600" },
];

const STATS = [
  { value: 5, suffix: "", label: "Card Tiers", icon: CreditCard },
  { value: 25, suffix: "+", label: "Languages", icon: Globe },
  { value: 50, suffix: "+", label: "Benefits", icon: Star },
  { value: 100, suffix: "%", label: "AI-Powered", icon: TrendingUp },
];

function StatPill({ stat }) {
  const { count, ref } = useCounter(stat.value, 1500);
  return (
    <div ref={ref} className="stat-pill flex items-center gap-2.5 px-4 py-2.5 rounded-full">
      <stat.icon className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
      <span className="text-white font-bold text-sm tabular-nums">{count}{stat.suffix}</span>
      <span className="text-white/40 text-xs">{stat.label}</span>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* ======== HERO SECTION ======== */}
      <section className="relative min-h-screen flex items-center overflow-hidden" data-testid="hero-section"
        style={{ background: "linear-gradient(145deg, #020617 0%, #0A0E45 30%, #1A1F71 60%, #0A0E45 100%)" }}
      >
        {/* Animated Orbs */}
        <div className="orb orb-gold" style={{ width: 500, height: 500, top: '10%', right: '15%' }} />
        <div className="orb orb-blue" style={{ width: 600, height: 600, bottom: '-10%', left: '-5%' }} />
        <div className="orb orb-white" style={{ width: 300, height: 300, top: '60%', right: '40%' }} />

        {/* Noise texture */}
        <div className="noise absolute inset-0 pointer-events-none" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                  Powered by GPT-5.2
                </span>
              </motion.div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] mb-8">
                Unlock Your
                <span className="block text-gold-gradient mt-1">Card's Full</span>
                <span className="block text-gold-gradient">Potential</span>
              </h1>

              <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-lg mb-12">
                Discover and maximize every benefit of your Visa card with our AI agent.
                Personalized insights, contextual recommendations, in any language.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Button
                  onClick={() => document.getElementById("card-selector")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-full text-xs font-bold py-6 px-8 bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] hover:from-[#AA8C2C] hover:to-[#D4AF37] text-white shadow-lg shadow-yellow-900/30 hover:shadow-yellow-900/50 transition-all duration-500 tracking-widest uppercase group"
                  data-testid="explore-benefits-btn"
                >
                  Explore Benefits
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/compare")}
                  className="rounded-full text-xs font-bold py-6 px-8 border-white/15 text-white/80 hover:bg-white/8 hover:text-white hover:border-white/30 transition-all duration-500 tracking-widest uppercase"
                  data-testid="compare-cards-btn"
                >
                  Compare Cards
                </Button>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-3">
                {STATS.map((stat, i) => (
                  <StatPill key={i} stat={stat} />
                ))}
              </div>
            </motion.div>

            {/* Right Column: 3D Card Stack */}
            <motion.div
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="relative" style={{ width: 380, height: 340 }}>
                {/* Shadow card 3 (bottom) */}
                <motion.div
                  className="absolute"
                  style={{ top: -15, left: -30 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div style={{ transform: "rotate(-12deg) scale(0.85)", opacity: 0.3, filter: "blur(1px)" }}>
                    <CardVisual cardId="infinite" cardName="Visa Infinite" tier="Infinite" size="md" noTilt />
                  </div>
                </motion.div>

                {/* Shadow card 2 (middle) */}
                <motion.div
                  className="absolute"
                  style={{ top: 5, left: -10 }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                >
                  <div style={{ transform: "rotate(-6deg) scale(0.92)", opacity: 0.5 }}>
                    <CardVisual cardId="platinum" cardName="Visa Platinum" tier="Platinum" size="md" noTilt />
                  </div>
                </motion.div>

                {/* Main card (front) */}
                <motion.div
                  className="absolute"
                  style={{ top: 30, left: 15 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                >
                  <CardVisual cardId="gold" cardName="Visa Gold" tier="Gold" size="md" />
                </motion.div>

                {/* Sparkle dots */}
                <div className="sparkle-dot" style={{ top: '15%', right: '10%', animationDelay: '0s' }} />
                <div className="sparkle-dot" style={{ top: '70%', right: '5%', animationDelay: '1s' }} />
                <div className="sparkle-dot" style={{ top: '40%', left: '0%', animationDelay: '2s' }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFA] to-transparent z-20" />
      </section>

      {/* ======== FEATURES SECTION ======== */}
      <section className="py-28 md:py-36 relative" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-20"
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              Why choose our agent
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5">
              Benefits intelligence,{" "}
              <span className="text-blue-gradient">reimagined</span>
            </h2>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed">
              Stop reading fine print. Our AI agent distills complex card benefits
              into clear, personalized insights you can actually use.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative rounded-2xl p-8 md:p-10 bg-gradient-to-br ${feat.color} border border-slate-100/80 hover:border-slate-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden`}
                data-testid={`feature-card-${i}`}
              >
                {/* Hover glow */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)' }}
                />

                <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <feat.icon className={`w-5 h-5 ${feat.iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{feat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== GOLD DIVIDER LINE ======== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gold-line" />
      </div>

      {/* ======== CARD SELECTOR SECTION ======== */}
      <section id="card-selector" className="py-28 md:py-36" data-testid="card-selector-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              Select Your Card
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5">
              Choose your <span className="text-blue-gradient">Visa card</span>
            </h2>
            <p className="text-base text-slate-400 max-w-lg mx-auto">
              Pick your card tier to unlock AI-powered benefit summaries, personalized
              recommendations, and an interactive advisor.
            </p>
          </motion.div>

          {/* Cards in a single responsive row */}
          <div className="flex flex-wrap justify-center gap-10 lg:gap-8">
            {cards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col items-center gap-5 group"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardVisual
                  cardId={card.id}
                  cardName={card.name}
                  tier={card.tier}
                  size="sm"
                  onClick={() => navigate(`/benefits/${card.id}`)}
                  selected={hoveredCard === card.id}
                />
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-[#1A1F71] transition-colors">{card.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{card.tagline}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/8 px-2 py-0.5 rounded-full">
                      {card.benefit_count} benefits
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {card.annual_fee}/yr
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/benefits/${card.id}`)}
                  className="text-xs text-[#1A1F71] hover:bg-[#1A1F71]/5 gap-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0"
                  data-testid={`explore-card-${card.id}`}
                >
                  Explore Benefits <ChevronRight className="w-3 h-3" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CTA SECTION ======== */}
      <section className="py-28 md:py-36" data-testid="cta-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0A0E45 0%, #1A1F71 50%, #0A0E45 100%)" }}
          >
            <div className="noise absolute inset-0 pointer-events-none" />
            <div className="orb orb-gold" style={{ width: 300, height: 300, top: '-30%', right: '10%' }} />

            <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="font-display text-3xl md:text-4xl text-white tracking-tight leading-tight mb-4">
                  Ready to discover what your card <span className="text-gold-gradient">really</span> offers?
                </h3>
                <p className="text-slate-400 text-base">
                  Select your card tier above and let our AI agent reveal benefits you never knew you had.
                </p>
              </div>
              <Button
                onClick={() => document.getElementById("card-selector")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full text-xs font-bold py-6 px-10 bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] text-white shadow-xl shadow-yellow-900/30 hover:shadow-yellow-900/50 transition-all duration-500 tracking-widest uppercase flex-shrink-0 group"
                data-testid="cta-get-started-btn"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======== FOOTER ======== */}
      <footer className="py-10 border-t border-slate-100" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#1A1F71] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" strokeWidth={2} />
            </div>
            <span className="text-sm text-slate-400 font-medium">Visa Card Benefits AI Agent</span>
          </div>
          <p className="text-xs text-slate-300">
            Hackathon demo application. Not affiliated with Visa Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
