import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CreditCard, GitCompareArrows, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { path: "/", label: "Explore Cards", icon: CreditCard },
    { path: "/compare", label: "Compare", icon: GitCompareArrows },
  ];

  const isActive = (path) => location.pathname === path;
  const isHeroPage = location.pathname === "/" || location.pathname === "/compare";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showSolid = scrolled || !isHeroPage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolid
          ? "glass-premium shadow-sm"
          : "bg-transparent border-b border-white/[0.04]"
      }`}
      data-testid="main-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" data-testid="logo-link">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#AA8C2C] flex items-center justify-center shadow-md shadow-yellow-900/15 group-hover:shadow-yellow-900/30 transition-all duration-500 group-hover:scale-105">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className={`text-[13px] font-bold tracking-tight leading-none transition-colors duration-300 ${
                showSolid ? "text-[#1A1F71]" : "text-white"
              }`}>
                VISA Benefits
              </span>
              <span className={`text-[8px] font-mono uppercase tracking-[0.3em] transition-colors duration-300 ${
                showSolid ? "text-[#D4AF37]" : "text-[#D4AF37]/70"
              }`}>
                AI Agent
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" data-testid="desktop-nav">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button
                  variant="ghost"
                  data-testid={`nav-${label.toLowerCase().replace(/\s/g, '-')}`}
                  className={`gap-2 text-[12px] font-semibold transition-all duration-300 rounded-full px-5 h-9 ${
                    isActive(path)
                      ? showSolid
                        ? "bg-[#1A1F71]/6 text-[#1A1F71]"
                        : "bg-white/10 text-white"
                      : showSolid
                      ? "text-slate-400 hover:text-[#1A1F71] hover:bg-slate-50"
                      : "text-white/40 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${showSolid ? "" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-4 space-y-1" data-testid="mobile-nav">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path} onClick={() => setMobileOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-2 text-sm rounded-xl ${
                    isActive(path) ? "text-[#D4AF37]" : showSolid ? "text-slate-500" : "text-white/60"
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
