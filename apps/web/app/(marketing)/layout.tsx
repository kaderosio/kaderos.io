"use client";

import { useState, useEffect } from "react";
import { Github, Menu, X } from "lucide-react";
import Link from "next/link";

function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Produkt", href: "/features" },
    { label: "Preise", href: "/pricing" },
    { label: "Templates", href: "/templates" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      <nav aria-label="Hauptnavigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 40 ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-[#F5F5F7]" : "bg-white/50 backdrop-blur-sm"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#000088] flex items-center justify-center shadow-sm">
              <span className="text-white text-xs sm:text-sm font-bold">K</span>
            </div>
            <span className="text-[15px] sm:text-[16px] font-semibold tracking-tight">KaderOS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map(l => (
              <Link key={l.label} href={l.href} className="text-[13px] text-[#6E6E73] hover:text-[#1D1D1F] transition-colors font-medium">{l.label}</Link>
            ))}
            <a href="https://github.com/kaderosio/kaderos.io" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#6E6E73] hover:text-[#1D1D1F] transition-colors font-medium flex items-center gap-1.5"><Github size={14} /> GitHub</a>
            <Link href="/login" className="text-[13px] text-[#6E6E73] hover:text-[#1D1D1F] transition-colors font-medium">Login</Link>
            <Link href="/signup" className="px-4 lg:px-5 py-2 bg-[#000088] text-white text-[12px] sm:text-[13px] font-semibold rounded-xl transition-all hover:shadow-lg hover:bg-[#000066]">
              Kostenlos starten
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/signup" className="px-3 py-1.5 bg-[#000088] text-white text-[12px] font-semibold rounded-lg">
              Kostenlos starten
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#6E6E73] p-1" aria-label={menuOpen ? "Menue schliessen" : "Menue oeffnen"} aria-expanded={menuOpen}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-14 px-6 md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="flex flex-col gap-1 pt-4">
            {links.map(l => (
              <Link key={l.label} href={l.href} className="text-[16px] text-[#1D1D1F] font-medium py-3 border-b border-[#F5F5F7]">{l.label}</Link>
            ))}
            <a href="https://github.com/kaderosio/kaderos.io" target="_blank" rel="noopener noreferrer" className="text-[16px] text-[#1D1D1F] font-medium py-3 border-b border-[#F5F5F7] flex items-center gap-2"><Github size={16} /> GitHub</a>
            <Link href="/login" className="text-[16px] text-[#1D1D1F] font-medium py-3 border-b border-[#F5F5F7]">Login</Link>
            <Link href="/login" className="text-[16px] text-[#6E6E73] font-medium py-3 border-b border-[#F5F5F7]">Demo</Link>

            <Link href="/impressum" className="text-[14px] text-[#86868B] py-2">Impressum</Link>
            <Link href="/datenschutz" className="text-[14px] text-[#86868B] py-2">Datenschutz</Link>
          </div>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer aria-label="Footer" className="border-t border-[#E5E5EA] py-10 sm:py-14 px-4 sm:px-6 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#000088] flex items-center justify-center">
                <span className="text-white text-[11px] font-bold">K</span>
              </div>
              <span className="text-[14px] font-semibold">KaderOS</span>
            </Link>
            <p className="text-[12px] text-[#86868B] leading-relaxed">
              Das Betriebssystem für dein AI-Team. Open Source. Swiss Made.
            </p>
          </div>
          {[
            { title: "Produkt", links: [
              { label: "Features", href: "/features" },
              { label: "Preise", href: "/pricing" },
              { label: "Templates", href: "/templates" },
              { label: "Enterprise", href: "/enterprise" },
            ]},
            { title: "Community", links: [
              { label: "GitHub", href: "https://github.com/kaderosio/kaderos.io" },
              { label: "Blog", href: "/blog" },
              { label: "Demo", href: "/login" },
            ]},
            { title: "Legal", links: [
              { label: "Impressum", href: "/impressum" },
              { label: "Datenschutz", href: "/datenschutz" },
              { label: "AGB", href: "/agb" },
            ]},
          ].map(col => (
            <div key={col.title}>
              <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mb-3">{col.title}</div>
              <div className="space-y-2.5">
                {col.links.map(l => {
                  const isExternal = l.href.startsWith("http");
                  return isExternal ? (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="block text-[12px] text-[#86868B] hover:text-[#1D1D1F] transition-colors">{l.label}</a>
                  ) : (
                    <Link key={l.label} href={l.href} className="block text-[12px] text-[#86868B] hover:text-[#1D1D1F] transition-colors">{l.label}</Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-[#E5E5EA]">
          <div className="text-[11px] text-[#C7C7CC]">&copy; 2026 KaderOS &middot; Swiss Made Software</div>
          <div className="flex items-center gap-5 text-[11px] text-[#C7C7CC]">
            <span>Zürich, Schweiz</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#1D1D1F]" style={{ fontFamily: "var(--font-outfit, 'Outfit'), -apple-system, sans-serif" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        .gradient-text { background: linear-gradient(135deg, #000088 0%, #000088 50%, #0891B2 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 6s linear infinite; }
        @keyframes shimmer { from { background-position:-200% center; } to { background-position:200% center; } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
      <Navbar />
      <main role="main" className="pt-14 sm:pt-16">{children}</main>
      <Footer />
    </div>
  );
}
