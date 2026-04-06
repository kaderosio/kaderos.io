"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, TrendingDown, ArrowRight, Mail, Check, Users, Bot, ChevronDown } from "lucide-react";

const BRANCHEN = [
  "IT & Software",
  "Marketing & Agentur",
  "Treuhand & Buchhaltung",
  "Rechtsberatung",
  "Immobilien",
  "E-Commerce",
  "Beratung & Consulting",
  "Gesundheitswesen",
  "Produktion & Industrie",
  "Andere",
] as const;

const KADEROS_PRO = 49;
const KADEROS_BUSINESS = 199;

function formatCHF(n: number) {
  return new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(n);
}

export default function AITeamCalculatorClient() {
  const [mitarbeiter, setMitarbeiter] = useState(3);
  const [lohn, setLohn] = useState(6500);
  const [branche, setBranche] = useState("IT & Software");
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [brancheOpen, setBrancheOpen] = useState(false);

  const kostenMensch = mitarbeiter * lohn;
  const plan = mitarbeiter <= 10 ? "Pro" : "Business";
  const kaderosPreis = mitarbeiter <= 10 ? KADEROS_PRO : KADEROS_BUSINESS;
  const einsparung = kostenMensch - kaderosPreis;
  const einsparungProzent = kostenMensch > 0 ? Math.round((einsparung / kostenMensch) * 100) : 0;
  const einsparungJahr = einsparung * 12;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
    // Hier wuerde die Email an ein Backend geschickt
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#000088]/5 border border-[#000088]/10 rounded-full text-[12px] font-medium text-[#000088] mb-6">
            <Calculator size={14} />
            Kostenloses Tool
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
            AI Team <span className="gradient-text">Kalkulator</span>
          </h1>
          <p className="text-[15px] sm:text-[17px] text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
            Berechne in 10 Sekunden, wie viel du mit einem AI-Team sparst.
            Nicht &laquo;Mitarbeiter ersetzen&raquo; &mdash; sondern Aufgaben automatisieren, die kein Mensch machen will.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-20 sm:pb-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Inputs */}
            <div className="bg-white border border-[#E5E5EA] rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Deine Situation</h2>

              {/* Anzahl Mitarbeiter */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[13px] font-medium text-[#6E6E73]">
                    Aufgaben-Aequivalent (Mitarbeiter)
                  </label>
                  <span className="text-[15px] font-bold text-[#000088] tabular-nums">
                    {mitarbeiter}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={mitarbeiter}
                  onChange={(e) => setMitarbeiter(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #000088 ${((mitarbeiter - 1) / 49) * 100}%, #E5E5EA ${((mitarbeiter - 1) / 49) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-[11px] text-[#C7C7CC] mt-1.5">
                  <span>1</span>
                  <span>25</span>
                  <span>50</span>
                </div>
              </div>

              {/* Durchschnittslohn */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[13px] font-medium text-[#6E6E73]">
                    Durchschnittslohn (CHF/Monat)
                  </label>
                  <span className="text-[15px] font-bold text-[#000088] tabular-nums">
                    {formatCHF(lohn)}
                  </span>
                </div>
                <input
                  type="range"
                  min={3000}
                  max={15000}
                  step={500}
                  value={lohn}
                  onChange={(e) => setLohn(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #000088 ${((lohn - 3000) / 12000) * 100}%, #E5E5EA ${((lohn - 3000) / 12000) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-[11px] text-[#C7C7CC] mt-1.5">
                  <span>CHF 3&apos;000</span>
                  <span>CHF 9&apos;000</span>
                  <span>CHF 15&apos;000</span>
                </div>
              </div>

              {/* Branche */}
              <div className="mb-6">
                <label className="text-[13px] font-medium text-[#6E6E73] block mb-3">
                  Branche
                </label>
                <div className="relative">
                  <button
                    onClick={() => setBrancheOpen(!brancheOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[#F5F5F7] rounded-xl text-[14px] text-[#1D1D1F] font-medium hover:bg-[#EEEEEF] transition-colors"
                  >
                    {branche}
                    <ChevronDown size={16} className={`text-[#86868B] transition-transform ${brancheOpen ? "rotate-180" : ""}`} />
                  </button>
                  {brancheOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E5EA] rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                      {BRANCHEN.map((b) => (
                        <button
                          key={b}
                          onClick={() => { setBranche(b); setBrancheOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#F5F5F7] transition-colors first:rounded-t-xl last:rounded-b-xl ${branche === b ? "text-[#000088] font-semibold bg-[#000088]/5" : "text-[#1D1D1F]"}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Kontext-Info */}
              <div className="bg-[#F5F5F7] rounded-xl p-4 text-[12px] text-[#86868B] leading-relaxed">
                <strong className="text-[#6E6E73]">Hinweis:</strong> Die Berechnung basiert auf dem Aufgaben-Aequivalent.
                KaderOS ersetzt nicht deine Mitarbeiter &mdash; es uebernimmt repetitive Aufgaben wie E-Mails,
                Reports, Scheduling und Admin-Arbeit.
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Vergleich */}
              <div className="bg-white border border-[#E5E5EA] rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-semibold mb-6">Kosten-Vergleich</h2>

                {/* Mensch */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-[#FF3B30]" />
                      <span className="text-[13px] font-medium text-[#6E6E73]">Manuell (Lohnkosten)</span>
                    </div>
                    <span className="text-[15px] font-bold text-[#FF3B30] tabular-nums">
                      {formatCHF(kostenMensch)}/Mt.
                    </span>
                  </div>
                  <div className="h-3 bg-[#FF3B30]/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF3B30] rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>

                {/* KaderOS */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Bot size={16} className="text-[#000088]" />
                      <span className="text-[13px] font-medium text-[#6E6E73]">KaderOS {plan}</span>
                    </div>
                    <span className="text-[15px] font-bold text-[#000088] tabular-nums">
                      {formatCHF(kaderosPreis)}/Mt.
                    </span>
                  </div>
                  <div className="h-3 bg-[#000088]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#000088] rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(1, (kaderosPreis / kostenMensch) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-[#E5E5EA] pt-5">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown size={16} className="text-[#34C759]" />
                    <span className="text-[13px] font-medium text-[#6E6E73]">Deine Einsparung</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-[#34C759] tabular-nums">
                    {formatCHF(einsparung)}
                    <span className="text-[15px] font-medium text-[#86868B] ml-1">/Monat</span>
                  </div>
                  <p className="text-[13px] text-[#86868B] mt-1">
                    Das sind <strong className="text-[#1D1D1F]">{formatCHF(einsparungJahr)}</strong> pro Jahr
                    &mdash; {einsparungProzent}% weniger Kosten.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#000088] rounded-2xl p-6 sm:p-8 text-white">
                <h3 className="text-lg font-semibold mb-2">
                  Du sparst {formatCHF(einsparung)} pro Monat mit KaderOS
                </h3>
                <p className="text-[13px] text-white/70 mb-5 leading-relaxed">
                  Starte jetzt kostenlos und automatisiere die Aufgaben, die kein Mensch machen will.
                  Keine Kreditkarte noetig.
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#000088] text-[14px] font-semibold rounded-xl hover:bg-white/90 transition-all hover:shadow-lg"
                >
                  Platz sichern
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Email Report */}
              <div className="bg-white border border-[#E5E5EA] rounded-2xl p-6 shadow-sm">
                {!emailSent ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <Mail size={16} className="text-[#000088]" />
                      <h3 className="text-[14px] font-semibold">Detaillierten Report erhalten</h3>
                    </div>
                    <p className="text-[12px] text-[#86868B] mb-4 leading-relaxed">
                      Wir schicken dir eine personalisierte Analyse fuer {branche} mit konkreten Einspar-Szenarien.
                    </p>
                    <form onSubmit={handleEmailSubmit} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="deine@email.ch"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-[#F5F5F7] rounded-xl text-[13px] placeholder:text-[#C7C7CC] focus:outline-none focus:ring-2 focus:ring-[#000088]/20 transition-all"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#000088] text-white text-[13px] font-semibold rounded-xl hover:bg-[#000066] transition-colors whitespace-nowrap"
                      >
                        Senden
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#34C759]/10 flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-[#34C759]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold">Report wird gesendet!</p>
                      <p className="text-[12px] text-[#86868B]">Pruefe dein Postfach in den naechsten Minuten.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "Open Source", sub: "MIT Lizenz" },
              { label: "Swiss Hosted", sub: "Daten in der Schweiz" },
              { label: "NDSG konform", sub: "Datenschutz garantiert" },
              { label: "Keine Kreditkarte", sub: "Kostenlos starten" },
            ].map((badge) => (
              <div key={badge.label} className="text-center p-4 bg-[#F5F5F7] rounded-xl">
                <div className="text-[13px] font-semibold text-[#1D1D1F]">{badge.label}</div>
                <div className="text-[11px] text-[#86868B] mt-0.5">{badge.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
