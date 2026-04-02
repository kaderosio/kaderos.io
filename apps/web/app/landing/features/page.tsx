"use client";

import {
  Users, MessageSquare, DollarSign, ShieldCheck, Activity,
  Plug, GitBranch, Brain, Building2, Target, Zap, Lock,
  BarChart3, Layers, Clock, Check, ArrowRight, Globe,
  FileCode, Sliders, Shield
} from "lucide-react";

const FEATURES = [
  {
    category: "Dein Team",
    items: [
      { icon: Users, title: "Org Chart", desc: "Hierarchien, Rollen, Reporting Lines. Wer reportet an wen — auf einen Blick, nicht in deinem Kopf. Swiss Company Roles (GF, VR) inklusive.", color: "#3739C1" },
      { icon: MessageSquare, title: "Meeting Room", desc: "Sprich mit deinem CTO. Gib dem CMO neue Richtung. Oder ruf das ganze Team zusammen — wie ein echtes Standup. Nur schneller.", color: "#7C3AED" },
      { icon: Sliders, title: "Agent Config", desc: "Jeder Agent bekommt: LLM-Auswahl, System Prompt, Tools, Skills, Budget, Heartbeat-Schedule. Alles an einem Ort konfigurierbar.", color: "#0891B2" },
    ],
  },
  {
    category: "Dein Business",
    items: [
      { icon: Target, title: "Goal Alignment", desc: "Company Mission → Projekte → Agent Goals → Tasks. Alles kaskadiert. Dein CTO weiss, warum er diese API baut.", color: "#3739C1" },
      { icon: GitBranch, title: "Sprint Planning", desc: "Montag: Sprint planen. Freitag: Ergebnisse reviewen. Dein Kader arbeitet dazwischen autonom. Scrum ohne Meetings.", color: "#7C3AED" },
      { icon: BarChart3, title: "Sales Pipeline", desc: "Deals tracken, Agents zuweisen, Probability scoren. Dein CMO-Agent füllt die Pipeline. Du entscheidest, was Priorität hat.", color: "#059669" },
    ],
  },
  {
    category: "Deine Kontrolle",
    items: [
      { icon: DollarSign, title: "Budget in CHF", desc: "Agent Max darf CHF 50/Monat ausgeben. Bei 80% kriegst du eine Warnung. Bei 100% stoppt er. Automatisch. Pro Agent, pro Monat.", color: "#059669" },
      { icon: ShieldCheck, title: "Governance", desc: "Confidence Gate: Über 90%? Agent handelt autonom. 70–89%? Du wirst informiert. Unter 70%? Agent wartet auf dein OK.", color: "#DC2626" },
      { icon: Activity, title: "Audit Trail", desc: "Welcher Agent hat was entschieden, wann, warum. Unveränderbar protokolliert. nDSG-konform. Exportierbar für deine Buchhaltung.", color: "#0891B2" },
    ],
  },
  {
    category: "Dein Stack",
    items: [
      { icon: Plug, title: "12+ Connectors", desc: "Claude, GPT, Mistral, Ollama. GitHub, Slack, Notion, Supabase. SMTP, Kalender, Webhooks, MCP Server. Dein Stack. Verbunden.", color: "#D97706" },
      { icon: Brain, title: "Skills & Playbooks", desc: "SKILLS.md hochladen. Playbooks definieren. Agents lernen zur Laufzeit — kein Retraining, kein Prompt-Chaos.", color: "#7C3AED" },
      { icon: Building2, title: "Multi-Company", desc: "5 AI-Firmen. Komplett isoliert. Jede mit eigenem Kader, Budget, Audit Trail. Perfekt für Agencies und Treuhänder.", color: "#059669" },
    ],
  },
  {
    category: "Swiss DNA",
    items: [
      { icon: Lock, title: "100% Lokal", desc: "Deine Daten verlassen deine Maschine nicht. Kein Cloud-Zwang. Kein Vendor Lock-in. PostgreSQL embedded, Docker ready.", color: "#1D1D1F" },
      { icon: Shield, title: "nDSG-konform", desc: "Schweizer Datenschutzgesetz ab Tag 1. Retention Policies, Consent Management, DPIA-Templates. Nicht nachgerüstet.", color: "#3739C1" },
      { icon: Globe, title: "Mehrsprachig", desc: "Dashboard auf Deutsch, Français, Italiano, English. Dein Kader spricht die Sprache deiner Kunden.", color: "#0891B2" },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="py-20 px-6">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <div className="text-[12px] font-semibold text-[#3739C1] uppercase tracking-widest mb-4">Features</div>
        <h1 className="text-[48px] font-extrabold tracking-tight mb-5">
          Kein Feature-Bloat.<br /><span className="gradient-text">Nur was zählt.</span>
        </h1>
        <p className="text-[17px] text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
          Jedes Feature existiert, weil ein echtes Business es braucht.
          15 Features. 5 Kategorien. 0 Bullshit.
        </p>
      </div>

      {/* Feature Categories */}
      <div className="max-w-5xl mx-auto space-y-20">
        {FEATURES.map((cat, ci) => (
          <div key={cat.category}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 rounded-full bg-[#3739C1]" />
              <h2 className="text-[24px] font-bold">{cat.category}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {cat.items.map((f, i) => (
                <div key={f.title} className="group p-7 rounded-2xl border border-[#E5E5EA] bg-white hover:border-[#3739C1]/30 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: f.color + "10" }}>
                    <f.icon size={22} style={{ color: f.color }} />
                  </div>
                  <h3 className="text-[16px] font-semibold mb-3">{f.title}</h3>
                  <p className="text-[13px] text-[#6E6E73] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto text-center mt-24">
        <h2 className="text-[30px] font-bold mb-4">Überzeug dich selbst.</h2>
        <p className="text-[15px] text-[#6E6E73] mb-8">30 Sekunden bis zu deinem ersten Kader. Kostenlos.</p>
        <a href="/landing#cta" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3739C1] text-white text-[14px] font-semibold rounded-xl hover:shadow-lg hover:bg-[#2D2FA0] transition-all">
          Platz sichern <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
