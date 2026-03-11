import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Sparkles, Loader2, Plane, Utensils, ShoppingBag, Shield, Lock,
  HeartPulse, Ticket, Zap, Headphones, Clock, CreditCard, Car, Banknote,
  Tag, Building, Armchair, Flag, Layers, MessageSquare, ListChecks
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
  plane: Plane, utensils: Utensils, "shopping-bag": ShoppingBag, shield: Shield,
  lock: Lock, "heart-pulse": HeartPulse, ticket: Ticket, zap: Zap,
  headphones: Headphones, clock: Clock, "credit-card": CreditCard, car: Car,
  banknote: Banknote, tag: Tag, building: Building, armchair: Armchair,
  flag: Flag, sparkles: Sparkles, layers: Layers,
};

function BenefitIcon({ name, className }) {
  const Icon = ICON_MAP[name] || Shield;
  return <Icon className={className} strokeWidth={1.5} />;
}

const TIER_ACCENTS = {
  classic: { accent: "#4B5EAA", bg: "from-[#1A1F71]/5 to-[#4B5EAA]/5" },
  gold: { accent: "#D4AF37", bg: "from-[#D4AF37]/5 to-[#F7E7CE]/10" },
  platinum: { accent: "#B0B0B0", bg: "from-[#E5E4E2]/10 to-[#B0B0B0]/5" },
  signature: { accent: "#1A1F71", bg: "from-[#0A0E45]/5 to-[#1A1F71]/5" },
  infinite: { accent: "#1E293B", bg: "from-[#020617]/5 to-[#1E293B]/5" },
};

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
  const [activeTab, setActiveTab] = useState("benefits");

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
        navigate("/");
      }
    };
    fetchData();
  }, [cardId, navigate]);

  const filteredBenefits = card?.benefits?.filter(
    (b) => activeCategory === "all" || b.category === activeCategory
  ) || [];

  const handleSummarize = async (benefitId) => {
    setSummarizing((prev) => ({ ...prev, [benefitId]: true }));
    try {
      const res = await axios.post(`${API}/benefits/summarize`, {
        card_id: cardId, benefit_id: benefitId, language, context: contextInput || null,
      });
      setSummaries((prev) => ({ ...prev, [benefitId]: res.data.summaries[0].summary }));
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
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#1A1F71]" />
          <span className="text-sm text-slate-400 font-mono">Loading benefits...</span>
        </div>
      </div>
    );
  }

  const tierStyle = TIER_ACCENTS[cardId] || TIER_ACCENTS.classic;
  const cardCategories = [
    { id: "all", name: "All", icon: "layers" },
    ...Array.from(new Set(card.benefits.map((b) => b.category))).map((cat) => {
      const catData = categories.find((c) => c.id === cat);
      return { id: cat, name: cat, icon: catData?.icon || "shield" };
    }),
  ];

  return (
    <div className="min-h-screen pt-16" data-testid="benefits-page">
      {/* ======== HERO BANNER ======== */}
      <section className="relative overflow-hidden" data-testid="benefits-hero"
        style={{ background: "linear-gradient(145deg, #020617 0%, #0A0E45 30%, #1A1F71 60%, #0A0E45 100%)" }}
      >
        <div className="noise absolute inset-0 pointer-events-none" />
        <div className="orb orb-gold" style={{ width: 400, height: 400, top: '-20%', right: '10%' }} />
        <div className="orb orb-blue" style={{ width: 300, height: 300, bottom: '-10%', left: '5%' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white/50 hover:text-white hover:bg-white/8 gap-2 -ml-2 mb-8 rounded-full"
            data-testid="back-button"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cards
          </Button>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <CardVisual cardId={card.id} cardName={card.name} tier={card.tier} size="lg" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-4">
                {card.tier} Card Benefits
              </p>
              <h1 className="font-display text-4xl md:text-6xl text-white tracking-tight leading-none mb-4">
                {card.name}
              </h1>
              <p className="text-base text-slate-400 mb-5 max-w-md">{card.tagline}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className="bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/25 hover:bg-[#D4AF37]/25 rounded-full px-3.5 py-1">
                  {card.annual_fee}/year
                </Badge>
                <Badge className="bg-white/8 text-white/70 border-white/15 hover:bg-white/15 rounded-full px-3.5 py-1">
                  {card.benefits.length} Benefits
                </Badge>
                {card.benefits.some(b => b.category === "Travel") && (
                  <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20 rounded-full px-3.5 py-1">
                    Travel Protected
                  </Badge>
                )}
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FAFAFA] to-transparent z-20" />
      </section>

      {/* ======== STICKY CONTROLS ======== */}
      <section className="sticky top-16 z-30 glass-premium border-b border-slate-100/50 py-3" data-testid="controls-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-hide">
              {cardCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`cat-pill flex items-center gap-1.5 ${activeCategory === cat.id ? "active" : ""}`}
                  data-testid={`category-${cat.id.toLowerCase()}`}
                >
                  <BenefitIcon name={cat.icon} className="w-3.5 h-3.5" />
                  {cat.name}
                </button>
              ))}
            </div>
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>
        </div>
      </section>

      {/* ======== MAIN CONTENT ======== */}
      <section className="py-10 md:py-14" data-testid="benefits-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 bg-slate-100/60 rounded-full p-1" data-testid="content-tabs">
              <TabsTrigger value="benefits" className="rounded-full gap-2 data-[state=active]:shadow-sm" data-testid="tab-benefits">
                <ListChecks className="w-3.5 h-3.5" /> All Benefits
              </TabsTrigger>
              <TabsTrigger value="chat" className="rounded-full gap-2 data-[state=active]:shadow-sm" data-testid="tab-chat">
                <MessageSquare className="w-3.5 h-3.5" /> AI Advisor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="benefits" data-testid="benefits-tab-content">
              {/* Context Input */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-10 p-6 rounded-2xl bg-gradient-to-br ${tierStyle.bg} border border-slate-100/80`}
                data-testid="context-input-section"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1A1F71] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800 mb-1">Personalize your AI summaries</p>
                    <p className="text-xs text-slate-400 mb-3">
                      Describe your situation for contextual benefit recommendations.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={contextInput}
                        onChange={(e) => setContextInput(e.target.value)}
                        placeholder='e.g., "booking a flight to Tokyo", "shopping for electronics"...'
                        className="flex-1 h-10 px-4 text-sm rounded-xl bg-white border border-slate-200/80 outline-none focus:ring-2 focus:ring-[#1A1F71]/15 focus:border-[#1A1F71]/25 transition-all placeholder:text-slate-300"
                        data-testid="context-input"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Benefits Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="benefits-grid">
                <AnimatePresence mode="popLayout">
                  {filteredBenefits.map((benefit, idx) => (
                    <motion.div
                      key={benefit.id}
                      layout
                      initial={{ opacity: 0, y: 25, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className={`benefit-card-premium p-6 ${
                        idx === 0 ? "md:col-span-2 md:row-span-1" : ""
                      } ${idx === 3 ? "md:col-span-2" : ""}`}
                      data-testid={`benefit-card-${benefit.id}`}
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1A1F71]/8 to-[#1A1F71]/3 flex items-center justify-center group-hover:from-[#1A1F71] group-hover:to-[#0A0E45] transition-all duration-500">
                          <BenefitIcon name={benefit.icon} className="w-5 h-5 text-[#1A1F71]" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-wider rounded-full border-slate-200 text-slate-400">
                            {benefit.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-base font-bold text-slate-900 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                        {benefit.description}
                      </p>

                      {/* Value highlight */}
                      <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-slate-50/80">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Max Value</span>
                        <span className="text-sm font-bold text-[#1A1F71] ml-auto">{benefit.max_value}</span>
                      </div>

                      {/* AI Summary */}
                      <AnimatePresence>
                        {summaries[benefit.id] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-4 p-4 rounded-xl bg-[#1A1F71]/[0.03] border border-[#1A1F71]/8 overflow-hidden"
                            data-testid={`summary-${benefit.id}`}
                          >
                            <div className="flex items-center gap-2 mb-2.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span className="text-[11px] font-bold text-[#1A1F71] uppercase tracking-wider">AI Summary</span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                              {summaries[benefit.id]}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Action button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSummarize(benefit.id)}
                        disabled={summarizing[benefit.id]}
                        className="w-full gap-2 text-xs rounded-xl border-[#1A1F71]/15 text-[#1A1F71] hover:bg-[#1A1F71] hover:text-white hover:border-[#1A1F71] transition-all duration-400"
                        data-testid={`summarize-btn-${benefit.id}`}
                      >
                        {summarizing[benefit.id] ? (
                          <><Loader2 className="w-3 h-3 animate-spin" /> Generating...</>
                        ) : (
                          <><Sparkles className="w-3 h-3" /> {summaries[benefit.id] ? "Regenerate" : "AI Summarize"}</>
                        )}
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredBenefits.length === 0 && (
                <div className="text-center py-20" data-testid="no-benefits">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Layers className="w-7 h-7 text-slate-300" />
                  </div>
                  <p className="text-slate-400 text-sm">No benefits in this category.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="chat" data-testid="chat-tab-content">
              <div className="max-w-2xl mx-auto">
                <AIChatPanel cardId={card.id} cardName={card.name} language={language} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
