"use client";

import { Zap, GitBranch, Check, Rocket } from "lucide-react";

const CHANGELOG = [
  {
    version: "v0.1.0",
    date: "2. April 2026",
    tag: "BETA",
    tagColor: "#000088",
    title: "KaderOS ist geboren",
    changes: [
      { type: "new", text: "Monorepo mit Turborepo + pnpm aufgesetzt" },
      { type: "new", text: "12 Drizzle DB-Tabellen: Companies, Agents, Tasks, Goals, Budgets, Audit, Decisions, Sprints, Playbooks, Heartbeats, Meetings, Templates" },
      { type: "new", text: "Dashboard mit 10 Views: Dashboard, Kader, Aufgaben, Ziele, Meeting Room, Konnektoren, Entscheide, Sprints, Audit Trail, Einstellungen" },
      { type: "new", text: "Konnektoren-Seite: 5 LLM Providers, 12 Tool Connectors, Skills Library, Agent Config (5 Tabs)" },
      { type: "new", text: "Landing Page kaderos.io mit Waitlist" },
      { type: "new", text: "5 Swiss Kader Templates: Solo Founder, Digital Agency, Treuhand, E-Commerce, Consulting" },
      { type: "new", text: "KaderOS Brand Skill erstellt (/kaderos-brand)" },
      { type: "infra", text: "Next.js 15 + Tailwind v4 + Drizzle ORM + Supabase" },
      { type: "infra", text: "kaderos.io Domain gesichert (Infomaniak)" },
    ],
  },
  {
    version: "v0.0.1",
    date: "2. April 2026",
    tag: "INIT",
    tagColor: "#86868B",
    title: "Projekt gestartet",
    changes: [
      { type: "new", text: "Paperclip.ing Feature-Analyse abgeschlossen" },
      { type: "new", text: "Swiss Market Research: 46% AI Adoption, nDSG, Infomaniak/Exoscale" },
      { type: "new", text: "Brand entschieden: KaderOS = Kader + OS" },
      { type: "new", text: "Produkt-Spec mit 14 Core Features + 10 Swiss-exklusiven Features" },
    ],
  },
];

const TYPE_STYLE: Record<string, { label: string; color: string }> = {
  new: { label: "NEU", color: "#059669" },
  fix: { label: "FIX", color: "#DC2626" },
  improve: { label: "BESSER", color: "#D97706" },
  infra: { label: "INFRA", color: "#6E6E73" },
};

export default function ChangelogPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-4">Changelog</div>
          <h1 className="text-[48px] font-extrabold tracking-tight mb-4">
            Was sich tut.
          </h1>
          <p className="text-[16px] text-[#6E6E73]">Jedes Update. Transparent. Chronologisch.</p>
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          {CHANGELOG.map((release, i) => (
            <div key={release.version} className="relative">
              {/* Timeline dot */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: release.tagColor + "10" }}>
                  <Rocket size={18} style={{ color: release.tagColor }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] font-bold">{release.version}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: release.tagColor + "15", color: release.tagColor }}>{release.tag}</span>
                  </div>
                  <div className="text-[12px] text-[#86868B]">{release.date}</div>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold mb-4 ml-14">{release.title}</h3>

              <div className="ml-14 space-y-2">
                {release.changes.map((c, j) => {
                  const style = TYPE_STYLE[c.type];
                  return (
                    <div key={j} className="flex items-start gap-3 py-1.5">
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0 mt-0.5" style={{ background: style.color + "15", color: style.color }}>{style.label}</span>
                      <span className="text-[13px] text-[#6E6E73]">{c.text}</span>
                    </div>
                  );
                })}
              </div>

              {i < CHANGELOG.length - 1 && <div className="border-b border-[#F5F5F7] mt-8" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
