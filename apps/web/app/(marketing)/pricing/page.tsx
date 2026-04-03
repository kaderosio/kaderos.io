"use client";

import { useState } from "react";
import { Check, ArrowRight, Zap, HelpCircle } from "lucide-react";

const PLANS = [
  {
    name: "Community", price: 0, annual: 0, per: "für immer", agents: "3 Agents",
    desc: "Perfekt zum Ausprobieren. Dein erster Kader — kostenlos.",
    feats: ["Org Chart + Tasks + Goals", "Meeting Room (3 Agents)", "1 Unternehmen", "Community Discord", "Lokal auf deiner Maschine", "Open Source Code"],
    cta: "Jetzt kostenlos starten", pop: false,
  },
  {
    name: "Pro", price: 49, annual: 39, per: "/Monat", agents: "10 Agents",
    desc: "Für Solo-Founders die ernst machen. Dein komplettes AI-Team.",
    feats: ["Alles aus Community", "Sprich mit deinem Kader", "Entscheide genehmigen/ablehnen", "Sprints planen + tracken", "5 Swiss Kader Templates", "Budget Control in CHF", "Support innert 24h"],
    cta: "Platz sichern →", pop: true,
  },
  {
    name: "Team", price: 149, annual: 119, per: "/Monat", agents: "25 Agents",
    desc: "Für wachsende Teams. Mehrere Firmen, volle Kontrolle.",
    feats: ["Alles aus Pro", "Mehrere Firmen isoliert betreiben", "Eigene Templates erstellen", "Playbook Engine (no-code Regeln)", "API Access für Automationen", "Priority Support innert 4h"],
    cta: "Platz sichern →", pop: false,
  },
  {
    name: "Agency", price: 349, annual: 279, per: "/Monat", agents: "Unbegrenzt",
    desc: "Für Agencies und Treuhänder. Mandanten-fähig. White-Label.",
    feats: ["Alles aus Team", "Dein Logo, dein Brand", "Mandanten komplett isoliert", "Persönlicher Ansprechpartner", "Eigene Connectors + Integrationen", "SLA 99.9% Verfügbarkeit"],
    cta: "Platz sichern →", pop: false,
  },
];

const FAQ = [
  { q: "Was passiert mit meinen Daten?", a: "Nichts. Deine Daten bleiben zu 100% auf deiner Maschine. KaderOS speichert keine Daten in der Cloud. Der License-Server validiert nur deinen Key — kein Daten-Transfer." },
  { q: "Kann ich jederzeit kündigen?", a: "Ja. Monatlich kündbar. Keine Mindestlaufzeit. Dein Kader funktioniert nach Kündigung weiter im Community-Modus (3 Agents)." },
  { q: "Was ist der Unterschied zu Paperclip?", a: "KaderOS ist für den Schweizer Markt gebaut: nDSG-konform, CHF-Budgets, Meeting Room, Mehrsprachig (DE/FR/IT/EN), Swiss Cloud Option. Nicht ein US-Produkt mit Flagge." },
  { q: "Brauche ich technisches Know-how?", a: "Grundlegendes Terminal-Verständnis hilft. npx kaderos onboard führt dich durch alles. Wenn du einen Computer bedienen kannst, kannst du KaderOS nutzen." },
  { q: "Welche AI-Modelle werden unterstützt?", a: "Claude (Anthropic), GPT (OpenAI), Mistral, Ollama (lokal), und jeder OpenAI-kompatible Endpoint. Du bringst deinen eigenen API-Key mit." },
  { q: "Gibt es einen jährlichen Rabatt?", a: "Ja. Bei jährlicher Zahlung sparst du 20% — das sind bis zu CHF 840/Jahr beim Agency-Plan." },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="py-20 px-6">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-4">Pricing</div>
        <h1 className="text-[48px] font-extrabold tracking-tight mb-5">
          Was es kostet.<br /><span className="gradient-text">Ohne Kleingedrucktes.</span>
        </h1>
        <p className="text-[17px] text-[#6E6E73] max-w-xl mx-auto mb-8">
          Du zahlst für die Lizenz. Nicht für deine Daten. Die gehören dir.
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
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16 sm:mb-24">
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
            <button className={`w-full py-3 rounded-xl text-[13px] font-semibold transition-all ${p.pop ? "bg-[#000088] text-white hover:bg-[#000066] hover:shadow-lg" : "bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5EA] hover:border-[#000088] hover:text-[#000088]"}`}>
              {p.cta}
            </button>
          </div>
        ))}
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
    </div>
  );
}
