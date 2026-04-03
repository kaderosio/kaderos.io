"use client";

import { ArrowRight, Users, Check } from "lucide-react";

const TEMPLATES = [
  {
    name: "Solo Founder",
    icon: "🚀",
    agents: 4,
    desc: "Dein minimales Team für maximalen Output. Perfekt wenn du alleine gründest und dein AI-Kader die Execution übernehmen soll.",
    roles: [
      { name: "Vega", role: "CEO Agent", focus: "Strategie, OKRs, Priority Scoring" },
      { name: "Max", role: "CTO Agent", focus: "Plattform, Code, Infrastruktur" },
      { name: "Aura", role: "CMO Agent", focus: "Marketing, Outreach, Pipeline" },
      { name: "Orion", role: "Strategy Partner", focus: "Sparring, Blindspots, GTM" },
    ],
    tags: ["Startups", "SaaS", "Tech"],
    color: "#000088",
  },
  {
    name: "Digital Agency",
    icon: "🎨",
    agents: 8,
    desc: "Ein komplettes Agency-Team. Projekte managen, Content produzieren, Code liefern — ohne 8 Freelancer zu koordinieren.",
    roles: [
      { name: "PM Agent", role: "Project Lead", focus: "Timeline, Tasks, Client Comms" },
      { name: "Designer", role: "Design Agent", focus: "UI/UX, Wireframes, Prototypen" },
      { name: "Dev Lead", role: "CTO Agent", focus: "Frontend, Backend, Deploy" },
      { name: "Dev 2", role: "Dev Agent", focus: "Features, Bug Fixes, Tests" },
    ],
    tags: ["Agencies", "Design", "Development"],
    color: "#000088",
  },
  {
    name: "Treuhand / Immobilien",
    icon: "🏢",
    agents: 6,
    desc: "Für Schweizer Treuhänder und Immobilienverwalter. STWE-Verwaltung, Buchhaltung, Mieter-Kommunikation — alles automatisiert.",
    roles: [
      { name: "Verwalter", role: "Operations Agent", focus: "STWE, Mieterwechsel, Prozesse" },
      { name: "Buchhalter", role: "Finance Agent", focus: "Abrechnungen, Mahnwesen" },
      { name: "Kommunikation", role: "Comms Agent", focus: "Mieter-Anfragen, E-Mails" },
      { name: "Berater", role: "Strategy Agent", focus: "Mandate, Akquisition" },
    ],
    tags: ["Treuhand", "Immobilien", "STWE"],
    color: "#059669",
  },
  {
    name: "E-Commerce KMU",
    icon: "🛒",
    agents: 7,
    desc: "Online-Shop betreiben ohne Team. Produkte, Marketing, Support, Logistik — dein Kader kümmert sich.",
    roles: [
      { name: "Shop Manager", role: "Operations Agent", focus: "Inventar, Bestellungen, Fulfillment" },
      { name: "Marketing", role: "CMO Agent", focus: "Ads, Content, SEO" },
      { name: "Support", role: "Service Agent", focus: "Kundenanfragen, Returns" },
      { name: "Analytics", role: "Data Agent", focus: "Reports, Conversion, KPIs" },
    ],
    tags: ["E-Commerce", "KMU", "Retail"],
    color: "#D97706",
  },
  {
    name: "Consulting",
    icon: "💼",
    agents: 5,
    desc: "Beratungsprojekte durchführen. Research, Analyse, Deliverables — dein Kader liefert wie eine Tier-1 Beratung.",
    roles: [
      { name: "Partner", role: "Lead Agent", focus: "Client Relations, Scope" },
      { name: "Analyst", role: "Research Agent", focus: "Marktanalyse, Daten" },
      { name: "Writer", role: "Content Agent", focus: "Reports, Decks, Proposals" },
      { name: "PM", role: "Project Agent", focus: "Timeline, Deliverables" },
    ],
    tags: ["Consulting", "Beratung", "B2B"],
    color: "#0891B2",
  },
];

export default function TemplatesPage() {
  return (
    <div className="py-20 px-6">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-4">Kader Templates</div>
        <h1 className="text-[48px] font-extrabold tracking-tight mb-5">
          Nicht bei Null anfangen.<br /><span className="gradient-text">Bei Eins.</span>
        </h1>
        <p className="text-[17px] text-[#6E6E73] max-w-2xl mx-auto">
          Wähle ein Template für deine Branche. Passe es an. Dein Kader arbeitet in unter 5 Minuten.
        </p>
      </div>

      {/* Templates */}
      <div className="max-w-5xl mx-auto space-y-8">
        {TEMPLATES.map((t, i) => (
          <div key={t.name} className="rounded-2xl border border-[#E5E5EA] bg-white overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-8">
              <div className="flex items-start gap-6">
                <div className="text-[48px] shrink-0">{t.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-[22px] font-bold">{t.name}</h2>
                    <span className="text-[12px] px-3 py-1 rounded-full font-semibold" style={{ background: t.color + "10", color: t.color }}>{t.agents} Agents</span>
                  </div>
                  <p className="text-[14px] text-[#6E6E73] leading-relaxed mb-5 max-w-2xl">{t.desc}</p>
                  <div className="flex gap-2 mb-6">
                    {t.tags.map(tag => <span key={tag} className="text-[11px] px-2.5 py-1 rounded-lg bg-[#F5F5F7] text-[#86868B] font-medium">{tag}</span>)}
                  </div>

                  {/* Agent Roles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {t.roles.map(r => (
                      <div key={r.name} className="p-3 rounded-xl bg-[#FAFAFA] border border-[#F5F5F7]">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-white" style={{ background: t.color }}>
                            {r.name[0]}
                          </div>
                          <span className="text-[12px] font-semibold">{r.name}</span>
                        </div>
                        <div className="text-[10px] text-[#000088] font-medium mb-0.5">{r.role}</div>
                        <div className="text-[10px] text-[#86868B]">{r.focus}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="shrink-0 px-5 py-2.5 bg-[#000088] text-white text-[13px] font-semibold rounded-xl hover:bg-[#000066] hover:shadow-lg transition-all flex items-center gap-2">
                  Template laden <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Template CTA */}
      <div className="max-w-3xl mx-auto text-center mt-16 p-10 rounded-2xl border-2 border-dashed border-[#E5E5EA]">
        <div className="text-[32px] mb-3">🛠</div>
        <h3 className="text-[20px] font-bold mb-2">Eigenes Template erstellen</h3>
        <p className="text-[14px] text-[#6E6E73] mb-5">Kein passendes Template? Bau dein eigenes Kader — mit den Rollen die dein Business braucht.</p>
        <a href="/landing#cta" className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5F5F7] text-[#1D1D1F] text-[13px] font-semibold rounded-xl border border-[#E5E5EA] hover:border-[#000088] hover:text-[#000088] transition-all">
          Mit Pro starten <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
