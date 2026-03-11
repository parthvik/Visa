import { CreditCard, Wifi } from "lucide-react";

const CARD_STYLES = {
  classic: {
    bg: "bg-gradient-to-br from-[#1A1F71] to-[#4B5EAA]",
    text: "text-white",
    chip: "bg-gradient-to-br from-[#D4AF37] to-[#AA8C2C]",
  },
  gold: {
    bg: "bg-gradient-to-br from-[#D4AF37] via-[#F7E7CE] to-[#AA8C2C]",
    text: "text-[#0A0E45]",
    chip: "bg-gradient-to-br from-[#0A0E45] to-[#1A1F71]",
  },
  platinum: {
    bg: "bg-gradient-to-br from-[#E5E4E2] via-white to-[#B0B0B0]",
    text: "text-[#0A0E45]",
    chip: "bg-gradient-to-br from-[#D4AF37] to-[#AA8C2C]",
  },
  signature: {
    bg: "bg-gradient-to-br from-[#0A0E45] via-[#1A1F71] to-[#333996]",
    text: "text-white",
    chip: "bg-gradient-to-br from-[#D4AF37] to-[#AA8C2C]",
  },
  infinite: {
    bg: "bg-gradient-to-br from-[#020617] via-[#1A1F71] to-[#020617]",
    text: "text-white",
    chip: "bg-gradient-to-br from-[#D4AF37] to-[#F7E7CE]",
  },
};

export default function CardVisual({ cardId, cardName, tier, size = "md", onClick, selected }) {
  const style = CARD_STYLES[cardId] || CARD_STYLES.classic;
  const sizeClasses = {
    sm: "w-[240px] h-[150px]",
    md: "w-[320px] h-[200px]",
    lg: "w-[380px] h-[238px]",
  };

  return (
    <div
      onClick={onClick}
      data-testid={`card-visual-${cardId}`}
      className={`visa-card ${sizeClasses[size]} ${style.bg} ${style.text} p-5 flex flex-col justify-between cursor-pointer select-none relative
        ${selected ? "ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-background shadow-2xl shadow-[#D4AF37]/20" : "shadow-xl"}
      `}
      role="button"
      tabIndex={0}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 card-shimmer rounded-2xl pointer-events-none" />

      {/* Top row */}
      <div className="flex items-start justify-between relative z-10">
        <div className={`visa-card-chip ${style.chip}`} />
        <Wifi className="w-5 h-5 opacity-60 rotate-90" strokeWidth={1.5} />
      </div>

      {/* Card number placeholder */}
      <div className="flex gap-3 relative z-10">
        {[1, 2, 3, 4].map((g) => (
          <div key={g} className="flex gap-1">
            {[1, 2, 3, 4].map((d) => (
              <div key={d} className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
            ))}
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="flex items-end justify-between relative z-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] opacity-60 mb-0.5">Cardholder</p>
          <p className="text-sm font-semibold tracking-wide">YOUR NAME</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold italic tracking-wide opacity-90">VISA</p>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-70 font-medium">{tier}</p>
        </div>
      </div>
    </div>
  );
}
