"use client";

import { useState } from "react";
import { Check, ArrowRight, Zap, HelpCircle, X, Minus } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Community", price: 0, annual: 0, per: "für immer", agents: "3 Agents",
    desc: "Perfekt zum Ausprobieren. Dein erster Kader -- kostenlos.",
    feats: ["Org Chart + Tasks + Goals", "Meeting Room (3 Agents)", "1 Unternehmen", "Community Support", "Open Source Code"],
    cta: "Kostenlos starten", pop: false,
  },
  {
    name: "Pro", price: 49, annual: 39, per: "/Monat", agents: "10 Agents",
    desc: "Für Solo-Founders die ernst machen. Dein komplettes AI-Team.",
    feats: ["Alles aus Community", "Budget-Tracking in CHF", "Audit Trail & Execution Trace", "5 Swiss Kader Templates", "Email Support innert 24h"],
    cta: "Kostenlos starten", pop: true,
  },
  {
    name: "Team", price: 149, annual: 119, per: "/Monat", agents: "25 Agents",
    desc: "Für wachsende Teams. Mehrere Firmen, volle Kontrolle.",
    feats: ["Alles aus Pro", "Multi-Company (isoliert)", "Priority Support innert 4h", "Eigene Templates erstellen", "API Access für Automationen"],
    cta: "Kostenlos starten", pop: false,
  },
  {
    name: "Agency", price: 349, annual: 279, per: "/Monat", agents: "Unbegrenzt",
    desc: "Für Agencies und Treuhänder. Mandanten-fähig.",
    feats: ["Alles aus Team", "Mandanten komplett isoliert", "Persönlicher Ansprechpartner", "Eigene Connectors", "SLA 99.9% Verfügbarkeit"],
    cta: "Kostenlos starten", pop: false,
  },
];

const COMPARISON = [
  { feature: "Agents", community: "3", pro: "10", team: "25", agency: "Unbegrenzt" },
  { feature: "Runs/Monat", community: "50", pro: "500", team: "2'000", agency: "10'000" },
  { feature: "Workflows", community: "1", pro: "5", team: "20", agency: "Unbegrenzt" },
  { feature: "Knowledge Docs", community: "5", pro: "50", team: "200", agency: "Unbegrenzt" },
  { feature: "Connectors", community: "2", pro: "Alle", team: "Alle", agency: "Alle" },
  { feature: "Users", community: "1", pro: "2", team: "5", agency: "10" },
  { feature: "Support", community: "Community", pro: "Email", team: "Priority", agency: "Dedicated" },
  { feature: "Swiss Connectors", community: null, pro: true, team: true, agency: true },
  { feature: "Budget-Tracking (CHF)", community: null, pro: true, team: true, agency: true },
  { feature: "Audit Trail", community: null, pro: true, team: true, agency: true },
  { feature: "Multi-Company", community: null, pro: null, team: true, agency: true },
  { feature: "Eigene Templates", community: null, pro: null, team: true, agency: true },
  { feature: "API Access", community: null, pro: null, team: true, agency: true },
  { feature: "SLA", community: null, pro: null, team: null, agency: "99.9%" },
  { feature: "BYOK", community: true, pro: true, team: true, agency: true },
];

function CellValue({ value }: { value: string | boolean | null }) {
  if (value === null) return <Minus size={14} className="text-[#D2D2D7]" />;
  if (value === true) return <Check size={16} className="text-[#059669]" />;
  return <span className="text-[13px] text-[#1D1D1F] font-medium">{value}</span>;
}

const FAQ = [
  { q: "Was passiert mit meinen Daten?", a: "Deine Daten werden sicher in der Cloud gespeichert. KaderOS ist nDSG-konform. BYOK bedeutet: Deine API-Keys gehen direkt an den Provider -- wir sehen sie nie im Klartext." },
  { q: "Kann ich jederzeit kündigen?", a: "Ja. Monatlich kündbar. Keine Mindestlaufzeit. Nach Kündigung funktioniert dein Kader im Community-Modus weiter (3 Agents)." },
  { q: "Was kostet ein Agent wirklich?", a: "Die KaderOS-Lizenz plus deine eigenen API-Kosten (typisch CHF 10-30/Monat je nach Nutzung). BYOK -- du bezahlst direkt beim Provider. Keine versteckten Aufschläge." },
  { q: "Brauche ich technisches Know-how?", a: "Nein. KaderOS läuft komplett im Browser. Kein Terminal, kein Code. Templates und der Agent Builder führen dich durch alles." },
  { q: "Welche AI-Modelle werden unterstützt?", a: "Claude (Anthropic), GPT (OpenAI), Mistral, und jeder OpenAI-kompatible Endpoint. Du bringst deinen eigenen API-Key mit." },
  { q: "Gibt es einen jährlichen Rabatt?", a: "Ja. Bei jährlicher Zahlung sparst du 20% -- das sind bis zu CHF 840/Jahr beim Agency-Plan." },
  { q: "Was ist der Unterschied zu CrewAI?", a: "KaderOS ist für den Schweizer Markt gebaut: nDSG-konform, CHF-Budgets, Deutsch-native UI, Swiss Connectors (Bexio, QR-Rechnung). Kein Python-Code nötig -- alles im Browser." },
];

export default function PricingPageClient() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="py-20 px-6">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-4">Pricing</div>
        <h1 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight mb-5">
          Was es kostet.<br /><span className="gradient-text">Ohne Kleingedrucktes.</span>
        </h1>
        <p className="text-[17px] text-[#6E6E73] max-w-xl mx-auto mb-8">
          Lizenz + deine eigenen API-Kosten. Das war&apos;s. Alle Preise in CHF.
        </p>

        {/* Annual Toggle */}
        <div className="inline-flex items-center gap-3 p-1.5 bg-[#F5F5F7] rounded-xl">
          <button onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-lg text-[13px] font-medium transition-all ${!annual ? "bg-white text-[#1D1D1F] shadow-sm" : "text-[#6E6E73]"}`}>
            Monatlich
          </button>
          <button onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-lg text-[13px] font-medium transition-all flex items-center gap-2 ${annual ? "bg-white text-[#1D1D1F] shadow-sm" : "text-[#6E6E73]"}`}>
            Jährlich <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#059669]/10 text-[#059669] font-semibold">-20%</span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-20">
        {PLANS.map(p => (
          <div key={p.name} className={`relative rounded-2xl p-7 border transition-all ${p.pop ? "border-[#000088] bg-white shadow-xl shadow-[#000088]/10 scale-[1.02]" : "border-[#E5E5EA] bg-white hover:shadow-lg"}`}>
            {p.pop && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#000088] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Beliebt</div>}
            <div className="text-[14px] font-semibold text-[#86868B] mb-2">{p.name}</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[12px] text-[#86868B]">CHF</span>
              <span className="text-[42px] font-extrabold text-[#1D1D1F]">{annual ? p.annual : p.price}</span>
              <span className="text-[12px] text-[#86868B]">{p.per}</span>
            </div>
            {annual && p.price > 0 && (
              <div className="text-[11px] text-[#059669] font-medium mb-1">Spare CHF {(p.price - p.annual) * 12}/Jahr</div>
            )}
            <div className="text-[12px] text-[#000088] font-semibold mb-3">{p.agents}</div>
            <p className="text-[12px] text-[#86868B] mb-5 leading-relaxed">{p.desc}</p>
            <ul className="space-y-2.5 mb-7">
              {p.feats.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] text-[#6E6E73]">
                  <Check size={14} className="text-[#000088] shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className={`w-full py-3 rounded-xl text-[13px] font-semibold transition-all text-center block ${p.pop ? "bg-[#000088] text-white hover:bg-[#000066] hover:shadow-lg" : "bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5EA] hover:border-[#000088] hover:text-[#000088]"}`}>
              {p.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Enterprise CTA */}
      <div className="max-w-3xl mx-auto text-center mb-20 p-8 rounded-2xl bg-[#FAFAFA] border border-[#E5E5EA]">
        <h3 className="text-[20px] font-bold mb-2">Brauchst du mehr?</h3>
        <p className="text-[14px] text-[#6E6E73] mb-5">Persönliche Einrichtung, Custom Templates, API-Integration -- ab CHF 3&apos;000.</p>
        <Link href="/enterprise" className="inline-flex items-center gap-2 px-6 py-3 bg-[#000088] text-white text-[13px] font-semibold rounded-xl hover:bg-[#000066] hover:shadow-lg transition-all">
          Enterprise ansehen <ArrowRight size={14} />
        </Link>
      </div>

      {/* Feature Comparison Table */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-[28px] font-bold text-center mb-10">Feature-Vergleich</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[#E5E5EA]">
                <th className="text-left py-4 pr-4 text-[13px] font-semibold text-[#1D1D1F] w-[200px]">Feature</th>
                <th className="text-center py-4 px-3 text-[13px] font-semibold text-[#86868B]">Community</th>
                <th className="text-center py-4 px-3 text-[13px] font-semibold text-[#000088]">Pro</th>
                <th className="text-center py-4 px-3 text-[13px] font-semibold text-[#86868B]">Team</th>
                <th className="text-center py-4 px-3 text-[13px] font-semibold text-[#86868B]">Agency</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={i} className="border-b border-[#F5F5F7] hover:bg-[#FAFAFA] transition-colors">
                  <td className="py-3.5 pr-4 text-[13px] text-[#1D1D1F] font-medium">{row.feature}</td>
                  <td className="py-3.5 px-3 text-center"><CellValue value={row.community} /></td>
                  <td className="py-3.5 px-3 text-center bg-[#000088]/[0.02]"><CellValue value={row.pro} /></td>
                  <td className="py-3.5 px-3 text-center"><CellValue value={row.team} /></td>
                  <td className="py-3.5 px-3 text-center"><CellValue value={row.agency} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-[12px] text-[#86868B] mt-6">+ deine API-Kosten (typisch CHF 10-30/Monat je nach Nutzung). BYOK -- direkt an den Provider.</p>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[28px] font-bold text-center mb-10">Häufige Fragen</h2>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <div key={i} className="border border-[#E5E5EA] rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#FAFAFA] transition-colors">
                <span className="text-[14px] font-medium text-[#1D1D1F]">{f.q}</span>
                <span className={`text-[#86868B] transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-[13px] text-[#6E6E73] leading-relaxed animate-[fadeIn_.2s_ease]">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-2xl mx-auto text-center mt-20">
        <h2 className="text-[30px] font-bold mb-4">Bereit für dein AI-Team?</h2>
        <p className="text-[15px] text-[#6E6E73] mb-8">Starte kostenlos mit 3 Agents. Upgrade jederzeit.</p>
        <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#000088] text-white text-[14px] font-semibold rounded-xl hover:shadow-lg hover:bg-[#000066] transition-all">
          Kostenlos starten <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
