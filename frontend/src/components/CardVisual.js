import { useState, useRef, useCallback } from "react";
import { Wifi } from "lucide-react";

const CARD_STYLES = {
  classic: {
    bg: "bg-gradient-to-br from-[#1A1F71] via-[#2A3190] to-[#4B5EAA]",
    text: "text-white",
    chipBg: "from-[#D4AF37] to-[#AA8C2C]",
  },
  gold: {
    bg: "bg-gradient-to-br from-[#D4AF37] via-[#F7E7CE] to-[#AA8C2C]",
    text: "text-[#0A0E45]",
    chipBg: "from-[#0A0E45] to-[#1A1F71]",
  },
  platinum: {
    bg: "bg-gradient-to-br from-[#E5E4E2] via-[#F8F8F8] to-[#B0B0B0]",
    text: "text-[#0A0E45]",
    chipBg: "from-[#D4AF37] to-[#AA8C2C]",
  },
  signature: {
    bg: "bg-gradient-to-br from-[#0A0E45] via-[#1A1F71] to-[#333996]",
    text: "text-white",
    chipBg: "from-[#D4AF37] to-[#AA8C2C]",
  },
  infinite: {
    bg: "bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#1E293B]",
    text: "text-white",
    chipBg: "from-[#D4AF37] to-[#F7E7CE]",
  },
};

const SIZES = {
  sm: { w: 240, h: 150, textScale: "text-[9px]", nameScale: "text-xs", visaScale: "text-sm", chipW: 30, chipH: 22 },
  md: { w: 340, h: 213, textScale: "text-[10px]", nameScale: "text-sm", visaScale: "text-lg", chipW: 42, chipH: 32 },
  lg: { w: 400, h: 250, textScale: "text-[11px]", nameScale: "text-sm", visaScale: "text-xl", chipW: 48, chipH: 36 },
};

export default function CardVisual({ cardId, cardName, tier, size = "md", onClick, selected, noTilt }) {
  const style = CARD_STYLES[cardId] || CARD_STYLES.classic;
  const dim = SIZES[size] || SIZES.md;
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (noTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -20,
      y: (x - 0.5) * 20,
    });
  }, [noTilt]);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="perspective-container" data-testid={`card-visual-${cardId}`}>
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`visa-card-3d relative cursor-pointer select-none overflow-hidden ${style.bg} ${style.text}`}
        style={{
          width: dim.w,
          height: dim.h,
          borderRadius: 16,
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
          boxShadow: selected
            ? `0 30px 60px rgba(212,175,55,0.25), 0 0 0 2px #D4AF37, 0 0 40px rgba(212,175,55,0.15)`
            : isHovered
            ? `0 30px 60px rgba(0,0,0,0.3), 0 0 40px rgba(212,175,55,0.08)`
            : `0 15px 40px rgba(0,0,0,0.2)`,
        }}
        role="button"
        tabIndex={0}
      >
        {/* Holographic overlay */}
        <div className="holo-overlay" />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.06] z-[1] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-4 sm:p-5">
          {/* Top row: Chip + contactless */}
          <div className="flex items-start justify-between">
            <div
              className={`bg-gradient-to-br ${style.chipBg} relative overflow-hidden`}
              style={{ width: dim.chipW, height: dim.chipH, borderRadius: 6 }}
            >
              <div className="chip-lines absolute inset-0" />
              <div className="absolute top-[30%] left-[10%] w-[80%] h-[40%] border border-white/20 rounded-sm" />
            </div>
            <Wifi className="opacity-50 rotate-90" style={{ width: dim.chipH * 0.6, height: dim.chipH * 0.6 }} strokeWidth={1.5} />
          </div>

          {/* Card number dots */}
          <div className="flex gap-2.5">
            {[1, 2, 3, 4].map((g) => (
              <div key={g} className="flex gap-[3px]">
                {[1, 2, 3, 4].map((d) => (
                  <div key={d} className="rounded-full bg-current opacity-30" style={{ width: size === "sm" ? 3 : 4, height: size === "sm" ? 3 : 4 }} />
                ))}
              </div>
            ))}
          </div>

          {/* Bottom: Name + VISA */}
          <div className="flex items-end justify-between">
            <div>
              <p className={`${dim.textScale} uppercase tracking-[0.15em] opacity-50 mb-0.5`}>Cardholder</p>
              <p className={`${dim.nameScale} font-semibold tracking-wide`}>YOUR NAME</p>
            </div>
            <div className="text-right">
              <p className={`${dim.visaScale} font-bold italic tracking-widest opacity-90`}>VISA</p>
              <p className={`${dim.textScale} uppercase tracking-[0.2em] opacity-60 font-semibold`}>{tier}</p>
            </div>
          </div>
        </div>

        {/* Reflection gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/[0.04] to-transparent z-[3] pointer-events-none" />
      </div>
    </div>
  );
}
