"use client";

import { useState, useEffect } from "react";
import { Github, Menu, X } from "lucide-react";
import Link from "next/link";

export function NavbarFr() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Produit", href: "/features" },
    { label: "Tarifs", href: "/pricing" },
    { label: "Templates", href: "/templates" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      <nav aria-label="Navigation principale" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 40 ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-[#F5F5F7]" : "bg-white/50 backdrop-blur-sm"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/fr" className="flex items-center gap-2">
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

            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 text-[12px] text-[#86868B]">
              <Link href="/" className="hover:text-[#1D1D1F] transition-colors">DE</Link>
              <span>/</span>
              <span className="text-[#000088] font-semibold">FR</span>
            </div>

            <Link href="/signup" className="px-4 lg:px-5 py-2 bg-[#000088] text-white text-[12px] sm:text-[13px] font-semibold rounded-xl transition-all hover:shadow-lg hover:bg-[#000066]">
              Commencer gratuitement
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/signup" className="px-3 py-1.5 bg-[#000088] text-white text-[12px] font-semibold rounded-lg">
              Commencer
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#6E6E73] p-1" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen}>
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

            {/* Language Switcher Mobile */}
            <div className="flex items-center gap-3 py-3 border-b border-[#F5F5F7]">
              <Link href="/" className="text-[14px] text-[#86868B] hover:text-[#1D1D1F]">Deutsch</Link>
              <span className="text-[14px] text-[#000088] font-semibold">Francais</span>
            </div>

            <Link href="/impressum" className="text-[14px] text-[#86868B] py-2">Mentions legales</Link>
            <Link href="/datenschutz" className="text-[14px] text-[#86868B] py-2">Protection des donnees</Link>
          </div>
        </div>
      )}
    </>
  );
}

export function FooterFr() {
  return (
    <footer aria-label="Footer" className="border-t border-[#E5E5EA] py-10 sm:py-14 px-4 sm:px-6 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/fr" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#000088] flex items-center justify-center">
                <span className="text-white text-[11px] font-bold">K</span>
              </div>
              <span className="text-[14px] font-semibold">KaderOS</span>
            </Link>
            <p className="text-[12px] text-[#86868B] leading-relaxed">
              Le systeme d&apos;exploitation pour votre equipe AI. Open Source. Swiss Made.
            </p>
          </div>
          {[
            { title: "Produit", links: [
              { label: "Fonctionnalites", href: "/features" },
              { label: "Tarifs", href: "/pricing" },
              { label: "Templates", href: "/templates" },
              { label: "Enterprise", href: "/enterprise" },
            ]},
            { title: "Communaute", links: [
              { label: "GitHub", href: "https://github.com/kaderosio/kaderos.io" },
              { label: "Blog", href: "/blog" },
              { label: "Demo", href: "/login" },
            ]},
            { title: "Legal", links: [
              { label: "Mentions legales", href: "/impressum" },
              { label: "Protection des donnees", href: "/datenschutz" },
              { label: "CGV", href: "/agb" },
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
            <span>Zurich, Suisse</span>
            <Link href="/" className="hover:text-[#86868B] transition-colors">DE</Link>
            <span className="text-[#000088] font-semibold">FR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
