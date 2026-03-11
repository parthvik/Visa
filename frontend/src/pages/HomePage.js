import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, Sparkles, Globe, Shield, Zap, CreditCard,
  ChevronRight, Plane, Utensils, ShoppingBag, HeartPulse,
  Ticket, Lock, ChevronDown, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CardVisual from "@/components/CardVisual";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* ── Animated Counter ── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, isInView]);
  return { count, ref };
}
function StatItem({ value, suffix, label }) {
  const { count, ref } = useCounter(value, 1600);
  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl font-bold text-white tabular-nums">{count}{suffix}</p>
      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mt-1">{label}</p>
    </div>
  );
}

/* ── Benefit category data ── */
const BENEFIT_TABS = [
  { key: "travel", label: "Travel", icon: Plane, desc: "Airport lounges, travel insurance, and luxury hotel perks that transform every journey into a first-class experience.", highlights: ["Airport Lounge Access", "Travel Accident Insurance", "Luxury Hotel Collection", "Rental Car Coverage"] },
  { key: "dining", label: "Dining", icon: Utensils, desc: "Earn premium rewards at restaurants worldwide. Access chef's table experiences, wine pairing events, and exclusive reservations.", highlights: ["Up to 10x Dining Rewards", "Chef's Table Experiences", "Priority Reservations", "Dining Cashback"] },
  { key: "shopping", label: "Shopping", icon: ShoppingBag, desc: "Extended warranties, purchase protection, and elevated rewards on every purchase you make with your Visa card.", highlights: ["Purchase Protection", "Extended Warranty", "Price Protection", "4x Shopping Rewards"] },
  { key: "insurance", label: "Insurance", icon: Shield, desc: "Comprehensive protection for your purchases, travel, and everyday life. Because peace of mind is the ultimate benefit.", highlights: ["Purchase Security", "Travel Medical Coverage", "Emergency Evacuation", "Zero Liability Policy"] },
  { key: "lifestyle", label: "Lifestyle", icon: Star, desc: "From dedicated concierge services to wellness programs and golf access, elevate every moment of your daily life.", highlights: ["24/7 Concierge", "Premium Golf Access", "Wellness Programs", "VIP Event Access"] },
];

/* ── Card tier descriptions ── */
const TIER_DETAILS = {
  classic: { headline: "Essential Protection", value: "6 core benefits", accent: "The foundation of smart spending" },
  gold: { headline: "Elevated Everyday", value: "8 premium benefits", accent: "Travel rewards and dining privileges" },
  platinum: { headline: "Premium Privileges", value: "9 elite benefits", accent: "Lounge access and luxury hotel perks" },
  signature: { headline: "Curated Exclusivity", value: "9 signature benefits", accent: "VIP experiences and dedicated lifestyle manager" },
  infinite: { headline: "Without Limits", value: "10 ultimate benefits", accent: "The pinnacle of card membership" },
};

export default function HomePage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [activeTab, setActiveTab] = useState("travel");
  const [heroCardIdx, setHeroCardIdx] = useState(0);

  const heroCards = ["gold", "platinum", "signature", "infinite"];

  useEffect(() => {
    axios.get(`${API}/cards`).then(res => setCards(res.data.cards)).catch(() => {});
  }, []);

  // Auto-rotate hero card
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroCardIdx(prev => (prev + 1) % heroCards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentHeroCard = heroCards[heroCardIdx];
  const currentTab = BENEFIT_TABS.find(t => t.key === activeTab);

  return (
    <div className="min-h-screen" data-testid="home-page">

      {/* ════════════════════════════════════════════
          HERO — Full-screen immersive
         ════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        data-testid="hero-section"
        style={{ background: "linear-gradient(160deg, #020617 0%, #0A0E45 35%, #1A1F71 55%, #0A0E45 80%, #020617 100%)" }}
      >
        {/* Ambient orbs */}
        <div className="orb orb-gold" style={{ width: 600, height: 600, top: '-10%', right: '5%' }} />
        <div className="orb orb-blue" style={{ width: 500, height: 500, bottom: '-15%', left: '-5%' }} />
        <div className="noise absolute inset-0 pointer-events-none" />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`, backgroundSize: '80px 80px' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[70vh]">

            {/* Left: Copy — takes 7 cols */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37]/90">
                  AI-Powered Benefits Agent
                </span>
              </motion.div>

              <h1 className="font-display text-[3.2rem] sm:text-[4rem] lg:text-[5rem] text-white tracking-tight leading-[1.02] mb-6">
                Endless Possibilities
                <span className="block text-gold-gradient">With Every Card</span>
              </h1>

              <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mb-10">
                Discover the full power of your Visa card membership. Our AI agent
                delivers personalized benefit insights, contextual recommendations,
                and expert advice — in over 25 languages.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-14">
                <Button
                  onClick={() => document.getElementById("card-tiers")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-full text-[11px] font-bold py-5 px-8 bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] hover:from-[#AA8C2C] hover:to-[#D4AF37] text-white shadow-lg shadow-yellow-900/25 hover:shadow-yellow-900/40 transition-all duration-500 tracking-[0.15em] uppercase group"
                  data-testid="explore-benefits-btn"
                >
                  Explore Your Card
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/compare")}
                  className="rounded-full text-[11px] font-bold py-5 px-8 text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-500 tracking-[0.15em] uppercase"
                  data-testid="compare-cards-btn"
                >
                  Compare Cards
                </Button>
              </div>

              {/* Scroll indicator */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="hidden lg:flex items-center gap-2 text-white/20"
              >
                <ChevronDown className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Scroll to explore</span>
              </motion.div>
            </motion.div>

            {/* Right: Rotating card showcase — 5 cols */}
            <motion.div
              className="lg:col-span-5 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHeroCard}
                    initial={{ opacity: 0, y: 20, rotateY: -10 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    exit={{ opacity: 0, y: -20, rotateY: 10 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <CardVisual
                      cardId={currentHeroCard}
                      cardName={`Visa ${currentHeroCard.charAt(0).toUpperCase() + currentHeroCard.slice(1)}`}
                      tier={currentHeroCard.charAt(0).toUpperCase() + currentHeroCard.slice(1)}
                      size="lg"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Card name label below */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHeroCard + "-label"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center mt-6"
                  >
                    <p className="text-sm font-bold text-white/80">
                      Visa {currentHeroCard.charAt(0).toUpperCase() + currentHeroCard.slice(1)}
                    </p>
                    <p className="text-[10px] text-[#D4AF37]/70 font-mono uppercase tracking-[0.2em] mt-1">
                      {TIER_DETAILS[currentHeroCard]?.accent}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Card dots indicator */}
                <div className="flex items-center justify-center gap-2 mt-5">
                  {heroCards.map((c, i) => (
                    <button
                      key={c}
                      onClick={() => setHeroCardIdx(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === heroCardIdx ? "w-6 bg-[#D4AF37]" : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                      data-testid={`hero-dot-${c}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] to-transparent z-20" />
      </section>

      {/* ════════════════════════════════════════════
          STATS BAR
         ════════════════════════════════════════════ */}
      <section className="relative -mt-20 z-30" data-testid="stats-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl glass-dark-premium px-8 py-8 flex items-center justify-around gap-4 flex-wrap">
            <StatItem value={5} suffix="" label="Card Tiers" />
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <StatItem value={25} suffix="+" label="Languages" />
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <StatItem value={50} suffix="+" label="Benefits" />
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <StatItem value={100} suffix="%" label="AI Powered" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BENEFIT CATEGORIES — Tab-based (AMEX-style)
         ════════════════════════════════════════════ */}
      <section className="py-28 md:py-36" data-testid="benefits-preview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-14"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              Benefit Categories
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              A world of privileges,{" "}
              <span className="text-blue-gradient">at your fingertips</span>
            </h2>
          </motion.div>

          {/* Horizontal Tabs */}
          <div className="flex items-center gap-1 mb-12 overflow-x-auto pb-2 scrollbar-hide" data-testid="benefit-tabs">
            {BENEFIT_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                data-testid={`benefit-tab-${tab.key}`}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-400 ${
                  activeTab === tab.key
                    ? "bg-[#1A1F71] text-white shadow-lg shadow-[#1A1F71]/20"
                    : "text-slate-400 hover:text-[#1A1F71] hover:bg-slate-50"
                }`}
              >
                <tab.icon className="w-4 h-4" strokeWidth={1.5} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content — Alternating layout */}
          <AnimatePresence mode="wait">
            {currentTab && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Left: Description */}
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1A1F71]/8 to-[#1A1F71]/3 flex items-center justify-center mb-6">
                    <currentTab.icon className="w-6 h-6 text-[#1A1F71]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{currentTab.label}</h3>
                  <p className="text-base text-slate-500 leading-relaxed mb-8">
                    {currentTab.desc}
                  </p>
                  <Button
                    onClick={() => {
                      document.getElementById("card-tiers")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="rounded-full text-[11px] font-bold py-4 px-6 bg-[#1A1F71] hover:bg-[#0A0E45] text-white transition-all duration-400 tracking-[0.1em] uppercase gap-2 group"
                    data-testid={`explore-${activeTab}-btn`}
                  >
                    Discover {currentTab.label} Benefits
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>

                {/* Right: Highlights grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentTab.highlights.map((h, i) => (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="group relative rounded-xl border border-slate-100 bg-white p-5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500"
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-[#1A1F71] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/8 flex items-center justify-center flex-shrink-0">
                          <Shield className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
                        </div>
                        <p className="text-sm font-semibold text-slate-800">{h}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Gold divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="gold-line" /></div>

      {/* ════════════════════════════════════════════
          CARD TIERS — Premium showcase
         ════════════════════════════════════════════ */}
      <section id="card-tiers" className="py-28 md:py-36" data-testid="card-selector-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              Choose Your Card
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Five tiers. <span className="text-blue-gradient">One destination.</span>
            </h2>
            <p className="text-base text-slate-400 max-w-lg mx-auto">
              Select your Visa card to unlock AI-powered benefit insights,
              personalized for your lifestyle.
            </p>
          </motion.div>

          {/* Card Tier Items */}
          <div className="space-y-6">
            {cards.map((card, i) => {
              const detail = TIER_DETAILS[card.id] || {};
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  onClick={() => navigate(`/benefits/${card.id}`)}
                  className="group relative rounded-2xl border border-slate-100 bg-white p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10 cursor-pointer hover:shadow-[0_20px_60px_rgba(0,0,0,0.07)] hover:border-slate-200 transition-all duration-500"
                  data-testid={`card-tier-${card.id}`}
                >
                  {/* Hover accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-[#1A1F71] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Card Visual */}
                  <div className="flex-shrink-0">
                    <CardVisual cardId={card.id} cardName={card.name} tier={card.tier} size="sm" noTilt />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{card.name}</h3>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Badge className="bg-[#D4AF37]/8 text-[#D4AF37] border-[#D4AF37]/15 text-[10px] rounded-full">
                          {card.annual_fee}/yr
                        </Badge>
                        <Badge className="bg-[#1A1F71]/6 text-[#1A1F71] border-[#1A1F71]/12 text-[10px] rounded-full">
                          {card.benefit_count} benefits
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 mb-1">{card.tagline}</p>
                    <p className="text-xs text-slate-500">{detail.accent}</p>
                  </div>

                  {/* CTA */}
                  <div className="flex-shrink-0">
                    <Button
                      variant="ghost"
                      className="rounded-full gap-2 text-xs text-[#1A1F71] group-hover:bg-[#1A1F71] group-hover:text-white transition-all duration-400 font-semibold"
                      data-testid={`explore-card-${card.id}`}
                    >
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          AI CTA BANNER
         ════════════════════════════════════════════ */}
      <section className="py-20" data-testid="cta-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative rounded-3xl overflow-hidden px-8 md:px-16 py-16 md:py-20"
            style={{ background: "linear-gradient(135deg, #0A0E45 0%, #1A1F71 50%, #0A0E45 100%)" }}
          >
            <div className="noise absolute inset-0 pointer-events-none" />
            <div className="orb orb-gold" style={{ width: 350, height: 350, top: '-40%', right: '5%' }} />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37]/80">Powered by GPT-5.2</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-white tracking-tight leading-tight mb-4">
                  Your personal benefits advisor, <span className="text-gold-gradient">always ready</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Ask questions, get instant AI-powered summaries in any language,
                  and discover benefits you never knew you had.
                </p>
              </div>
              <Button
                onClick={() => document.getElementById("card-tiers")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full text-[11px] font-bold py-6 px-10 bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] text-white shadow-xl shadow-yellow-900/25 transition-all duration-500 tracking-[0.15em] uppercase flex-shrink-0 group"
                data-testid="cta-get-started-btn"
              >
                Start Exploring
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
         ════════════════════════════════════════════ */}
      <footer className="py-10 border-t border-slate-100" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#D4AF37] to-[#AA8C2C] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" strokeWidth={2} />
            </div>
            <span className="text-sm text-slate-400 font-medium">Visa Card Benefits AI Agent</span>
          </div>
          <p className="text-xs text-slate-300">
            Hackathon demo. Not affiliated with Visa Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
