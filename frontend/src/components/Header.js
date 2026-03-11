import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CreditCard, GitCompareArrows, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Explore Cards", icon: CreditCard },
    { path: "/compare", label: "Compare", icon: GitCompareArrows },
  ];

  const isActive = (path) => location.pathname === path;
  const isHero = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHero ? "glass-dark-premium" : "glass-premium"
      }`}
      data-testid="main-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" data-testid="logo-link">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#AA8C2C] flex items-center justify-center shadow-lg shadow-yellow-900/20 group-hover:shadow-yellow-900/40 transition-all duration-500 group-hover:scale-105">
              <Sparkles className="w-4.5 h-4.5 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-bold tracking-tight leading-none ${isHero ? "text-white" : "text-[#1A1F71]"}`}>
                VISA Benefits
              </span>
              <span className={`text-[9px] font-mono uppercase tracking-[0.25em] ${isHero ? "text-[#D4AF37]/80" : "text-[#D4AF37]"}`}>
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
                  className={`gap-2 text-sm font-medium transition-all duration-300 rounded-full px-5 ${
                    isActive(path)
                      ? isHero
                        ? "bg-white/10 text-white"
                        : "bg-[#1A1F71]/8 text-[#1A1F71]"
                      : isHero
                      ? "text-white/60 hover:text-white hover:bg-white/8"
                      : "text-slate-400 hover:text-[#1A1F71] hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${isHero ? "text-white" : ""}`}
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
                  className={`w-full justify-start gap-2 text-sm ${
                    isActive(path) ? "text-[#D4AF37]" : isHero ? "text-white/60" : "text-slate-500"
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
