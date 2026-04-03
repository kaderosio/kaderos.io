"use client";

import { useState } from "react";
import {
  LayoutDashboard, Users, CheckSquare, Target, Activity,
  Building2, Zap, Cpu, TrendingUp, Scale, Radio,
  ChevronRight, AlertTriangle, Brain, ShieldCheck,
  MessageSquare, Send, RefreshCw, Settings, BookOpen,
  Calendar, BarChart3, FileText, GitBranch, Clock,
  DollarSign, Shield, Layers, Plus, Search, Bell,
  Menu, X, Plug, Upload, Key, Globe, Server,
  Terminal, Webhook, Mail, Sliders, TestTube,
  Check, AlertCircle, ExternalLink, Trash2, Eye, EyeOff,
  Bot, Wrench, FileCode, Database, Link2
} from "lucide-react";

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────
const COLORS = {
  primary: "#000088",
  primaryLight: "#00008815",
  purple: "#000088",
  cyan: "#0891B2",
  green: "#059669",
  shark: "#1D1D1F",
  textSecondary: "#6E6E73",
  textTertiary: "#86868B",
  bgPrimary: "#FFFFFF",
  bgSecondary: "#F5F5F7",
  border: "#E5E5EA",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
};

// ── AGENT COLORS ──────────────────────────────────────────────────────────
const AC: Record<string, { bg: string; text: string }> = {
  max:   { bg: "#000088", text: "#fff" },
  aura:  { bg: "#000088", text: "#fff" },
  vega:  { bg: "#0891B2", text: "#fff" },
  orion: { bg: "#059669", text: "#fff" },
  team:  { bg: "#1E293B", text: "#fff" },
};

// ── DEMO DATA ─────────────────────────────────────────────────────────────
const AGENTS = [
  { id: "max",   name: "Max",   role: "CTO Agent",        dept: "Engineering",       av: "M", status: "active",  focus: "Plattform Setup + API Architecture",  version: "v1.0", openTasks: 5, doneTasks: 2 },
  { id: "aura",  name: "Aura",  role: "CMO Agent",        dept: "Marketing & Sales", av: "A", status: "active",  focus: "Landing Page + Waitlist Campaign",     version: "v1.0", openTasks: 4, doneTasks: 1 },
  { id: "vega",  name: "Vega",  role: "CEO Agent",        dept: "Leadership",        av: "V", status: "active",  focus: "GTM Strategy + Partner Outreach",      version: "v1.0", openTasks: 3, doneTasks: 0 },
  { id: "orion", name: "Orion", role: "Strategy Partner",  dept: "Strategy",          av: "O", status: "standby", focus: "Competitive Analysis + Positioning",   version: "v1.0", openTasks: 2, doneTasks: 0 },
];

const TASKS = [
  { id: 1, title: "Monorepo + DB Schema aufsetzen",           ag: "max",  pri: "high",   st: "done",        dept: "Engineering", due: "02.04", tags: ["Infra"] },
  { id: 2, title: "Landing Page kaderos.io designen",         ag: "aura", pri: "high",   st: "in-progress", dept: "Marketing",   due: "05.04", tags: ["Launch"] },
  { id: 3, title: "nDSG Compliance Checklist erstellen",      ag: "vega", pri: "high",   st: "todo",        dept: "Legal",       due: "07.04", tags: ["Compliance"] },
  { id: 4, title: "Heartbeat Scheduler Engine bauen",         ag: "max",  pri: "high",   st: "in-progress", dept: "Engineering", due: "08.04", tags: ["Core"] },
  { id: 5, title: "Swiss Kader Templates designen",           ag: "aura", pri: "medium", st: "todo",        dept: "Product",     due: "10.04", tags: ["Templates"] },
  { id: 6, title: "Competitive Brief: Paperclip vs KaderOS",  ag: "orion",pri: "medium", st: "in-progress", dept: "Strategy",    due: "06.04", tags: ["GTM"] },
  { id: 7, title: "Pricing Model finalisieren (CHF)",         ag: "vega", pri: "high",   st: "todo",        dept: "Finance",     due: "09.04", tags: ["Pricing"] },
  { id: 8, title: "Agent Chat (Meeting Room) implementieren", ag: "max",  pri: "high",   st: "todo",        dept: "Engineering", due: "12.04", tags: ["Feature"] },
];

const GOALS = [
  { id: 1, title: "MVP Launch auf kaderos.io",        dept: "Product",     prog: 25, dl: "Mai 2026",  owner: "vega", st: "on-track" },
  { id: 2, title: "10 Beta-User onboarden",           dept: "Sales",       prog: 0,  dl: "Jun 2026",  owner: "aura", st: "at-risk" },
  { id: 3, title: "Core Platform Feature-Complete",   dept: "Engineering", prog: 35, dl: "Mai 2026",  owner: "max",  st: "on-track" },
  { id: 4, title: "Swiss Cloud Deploy (Infomaniak)",  dept: "DevOps",      prog: 0,  dl: "Jun 2026",  owner: "max",  st: "at-risk" },
];

const DECISIONS = [
  { id: "d1", ag: "vega", req: "CHF 56/Jahr für kaderos.io Domain (Infomaniak)",             conf: 98, status: "approved", date: "02.04", type: "Budget",  by: "Thesh" },
  { id: "d2", ag: "max",  req: "Next.js 15 + Tailwind v4 + Drizzle als Tech Stack",         conf: 95, status: "approved", date: "02.04", type: "Config",  by: "Thesh" },
  { id: "d3", ag: "aura", req: "CHF 200 für ProductHunt Launch Promo",                       conf: 82, status: "pending",  date: "03.04", type: "Budget" },
  { id: "d4", ag: "max",  req: "Supabase als DB-Backend statt Self-Hosted Postgres",         conf: 90, status: "pending",  date: "02.04", type: "Config" },
];

const AUDIT = [
  { id: 1, t: "18:16", date: "Heute",   ag: "max",  action: "Monorepo erstellt — 12 DB Tabellen, Drizzle Schema", ok: true },
  { id: 2, t: "17:45", date: "Heute",   ag: "vega", action: "KaderOS Plan approved — Brand, Features, Pricing",  ok: true },
  { id: 3, t: "17:30", date: "Heute",   ag: "vega", action: "kaderos.io Domain gekauft (Infomaniak, CHF 56)",    ok: true },
  { id: 4, t: "16:00", date: "Heute",   ag: "aura", action: "Market Research: Swiss AI 46% Adoption Rate",       ok: true },
  { id: 5, t: "15:30", date: "Heute",   ag: "orion",action: "Paperclip Feature-Analyse abgeschlossen",           ok: true },
];

const SPRINTS = [
  { id: "S01", title: "Foundation — Monorepo + DB",      status: "done",    tasks: 5, done: 5,  prog: 100, owner: "max",  desc: "Turborepo, Drizzle Schema, Supabase" },
  { id: "S02", title: "Dashboard UI — Core Views",       status: "active",  tasks: 8, done: 2,  prog: 25,  owner: "max",  desc: "Layout, Agents, Tasks, Goals, Meeting Room" },
  { id: "S03", title: "Landing Page kaderos.io",         status: "active",  tasks: 6, done: 0,  prog: 0,   owner: "aura", desc: "Hero, Features, Pricing, Waitlist" },
  { id: "S04", title: "Heartbeat + Agent Runtime",       status: "planned", tasks: 7, done: 0,  prog: 0,   owner: "max",  desc: "Scheduler, BYOA, Skill Injection" },
  { id: "S05", title: "License System + Auth",           status: "planned", tasks: 4, done: 0,  prog: 0,   owner: "max",  desc: "License Keys, Supabase Auth, Tiers" },
];

// ── UTILITY COMPONENTS ────────────────────────────────────────────────────
const ga = (id: string) => AGENTS.find(a => a.id === id) || { av: "?", name: "?", role: "?" };
const ac = (id: string) => AC[id] || { bg: "#888", text: "#fff" };

const PRI: Record<string, { bg: string; c: string; lbl: string }> = {
  high:   { bg: "#FEE2E2", c: "#991B1B", lbl: "Hoch" },
  medium: { bg: "#FEF9C3", c: "#713F12", lbl: "Mittel" },
  low:    { bg: "#F3F4F6", c: "#374151", lbl: "Niedrig" },
};

const ST: Record<string, { bg: string; c: string; lbl: string }> = {
  done:          { bg: "#DCFCE7", c: "#14532D", lbl: "Erledigt" },
  "in-progress": { bg: "#DBEAFE", c: "#1E3A5F", lbl: "In Arbeit" },
  todo:          { bg: "#F3F4F6", c: "#374151", lbl: "Offen" },
  blocked:       { bg: "#FEE2E2", c: "#991B1B", lbl: "Blockiert" },
};

const GOAL_ST: Record<string, { bg: string; c: string; lbl: string }> = {
  "on-track":  { bg: "#DCFCE7", c: "#14532D", lbl: "On Track" },
  "at-risk":   { bg: "#FEF9C3", c: "#713F12", lbl: "At Risk" },
  behind:      { bg: "#FEE2E2", c: "#991B1B", lbl: "Behind" },
  completed:   { bg: "#DBEAFE", c: "#1E3A5F", lbl: "Done" },
};

const DEC_ST: Record<string, { bg: string; c: string; lbl: string }> = {
  pending:  { bg: "#FEF9C3", c: "#713F12", lbl: "Pending" },
  approved: { bg: "#DCFCE7", c: "#14532D", lbl: "Approved" },
  denied:   { bg: "#FEE2E2", c: "#991B1B", lbl: "Denied" },
};

const Pill = ({ txt, bg, c }: { txt: string; bg: string; c: string }) => (
  <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap" style={{ background: bg, color: c }}>{txt}</span>
);

const Av = ({ id, size = 28 }: { id: string; size?: number }) => {
  const a = id === "team" ? { av: "T" } : ga(id);
  const col = ac(id);
  return (
    <div className="rounded-full flex items-center justify-center font-medium shrink-0"
      style={{ width: size, height: size, background: col.bg, color: col.text, fontSize: Math.floor(size * 0.42) }}>
      {(a as any).av}
    </div>
  );
};

const Card = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`bg-white border border-[#E5E5EA] rounded-[14px] p-5 ${className}`} {...props}>{children}</div>
);

const PBar = ({ prog, color = "#000088" }: { prog: number; color?: string }) => (
  <div className="bg-[#F5F5F7] rounded h-[5px] overflow-hidden">
    <div className="h-full rounded transition-all duration-300" style={{ width: `${Math.min(100, prog)}%`, background: color }} />
  </div>
);

// ── NAV ITEMS ─────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard",   label: "Dashboard",    icon: LayoutDashboard },
  { id: "agents",      label: "Kader",        icon: Users },
  { id: "tasks",       label: "Aufgaben",     icon: CheckSquare },
  { id: "goals",       label: "Ziele",        icon: Target },
  { id: "meeting",     label: "Meeting Room", icon: MessageSquare },
  { id: "connectors",  label: "Konnektoren",  icon: Plug },
  { id: "decisions",   label: "Entscheide",   icon: ShieldCheck },
  { id: "sprints",     label: "Sprints",      icon: GitBranch },
  { id: "audit",       label: "Audit Trail",  icon: Activity },
  { id: "settings",    label: "Einstellungen",icon: Settings },
];

// ── MAIN APP ──────────────────────────────────────────────────────────────
export default function KaderOS() {
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#F5F5F7]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-[220px]" : "w-[60px]"} bg-white border-r border-[#E5E5EA] flex flex-col transition-all duration-200 shrink-0`}>
        {/* Logo */}
        <div className="h-14 flex items-center gap-2.5 px-4 border-b border-[#E5E5EA]">
          <div className="w-8 h-8 rounded-lg bg-[#000088] flex items-center justify-center">
            <span className="text-white text-sm font-bold">K</span>
          </div>
          {sidebarOpen && (
            <div>
              <div className="text-[13px] font-semibold text-[#1D1D1F]">KaderOS</div>
              <div className="text-[10px] text-[#86868B]">v0.1.0 · Beta</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {NAV.map(item => {
            const active = view === item.id;
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-[13px] transition-all ${active ? "bg-[#00008815] text-[#000088] font-medium" : "text-[#6E6E73] hover:bg-[#F5F5F7]"}`}>
                <Icon size={16} />
                {sidebarOpen && item.label}
              </button>
            );
          })}
        </nav>

        {/* Company Selector */}
        {sidebarOpen && (
          <div className="p-3 border-t border-[#E5E5EA]">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#F5F5F7]">
              <div className="w-6 h-6 rounded bg-[#000088] flex items-center justify-center">
                <Building2 size={12} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-medium text-[#1D1D1F] truncate">KaderOS Demo</div>
                <div className="text-[9px] text-[#86868B]">4 Agents · Free</div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-[#E5E5EA] flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#86868B] hover:text-[#1D1D1F]">
              <Menu size={18} />
            </button>
            <h1 className="text-[15px] font-semibold text-[#1D1D1F]">
              {NAV.find(n => n.id === view)?.label || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F5F5F7] rounded-lg">
              <Search size={14} className="text-[#86868B]" />
              <span className="text-[12px] text-[#86868B]">Suchen...</span>
              <span className="text-[10px] text-[#86868B] bg-white px-1.5 py-0.5 rounded">⌘K</span>
            </div>
            <button className="relative text-[#86868B] hover:text-[#1D1D1F]">
              <Bell size={18} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#DC2626] rounded-full flex items-center justify-center">
                <span className="text-[9px] text-white font-bold">2</span>
              </div>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#1D1D1F] flex items-center justify-center">
              <span className="text-white text-[12px] font-medium">T</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {view === "dashboard" && <DashboardView />}
          {view === "agents" && <AgentsView />}
          {view === "tasks" && <TasksView />}
          {view === "goals" && <GoalsView />}
          {view === "meeting" && <MeetingView />}
          {view === "connectors" && <ConnectorsView />}
          {view === "decisions" && <DecisionsView />}
          {view === "sprints" && <SprintsView />}
          {view === "audit" && <AuditView />}
          {view === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  );
}

// ── DASHBOARD VIEW ────────────────────────────────────────────────────────
function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Agents aktiv", value: "3/4", icon: Users, color: "#000088", sub: "1 Standby" },
          { label: "Offene Tasks", value: "6", icon: CheckSquare, color: "#D97706", sub: "2 In Arbeit" },
          { label: "Budget Monat", value: "CHF 0", icon: DollarSign, color: "#059669", sub: "von CHF 500" },
          { label: "Entscheide offen", value: "2", icon: ShieldCheck, color: "#DC2626", sub: "Approval nötig" },
        ].map((s, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[12px] text-[#86868B] mb-1">{s.label}</div>
                <div className="text-[24px] font-semibold text-[#1D1D1F]">{s.value}</div>
                <div className="text-[11px] text-[#86868B] mt-1">{s.sub}</div>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.color + "15" }}>
                <s.icon size={20} style={{ color: s.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Agent Cards */}
      <div>
        <div className="text-[15px] font-semibold text-[#1D1D1F] mb-3">Dein Kader</div>
        <div className="grid grid-cols-4 gap-4">
          {AGENTS.map(a => {
            const col = ac(a.id);
            return (
              <Card key={a.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <Av id={a.id} size={36} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-[#1D1D1F]">{a.name}</div>
                    <div className="text-[11px] text-[#86868B]">{a.role}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${a.status === "active" ? "bg-[#059669]" : "bg-[#D97706]"}`} />
                </div>
                <div className="text-[11px] text-[#6E6E73] mb-3 line-clamp-1">{a.focus}</div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="text-[10px] text-[#86868B]">{a.openTasks} offen</span>
                    <span className="text-[10px] text-[#059669]">{a.doneTasks} erledigt</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F5F5F7] text-[#86868B]">{a.version}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity + Pending Decisions */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="text-[14px] font-semibold text-[#1D1D1F] mb-4">Letzte Aktivität</div>
          <div className="space-y-3">
            {AUDIT.slice(0, 4).map(a => (
              <div key={a.id} className="flex items-start gap-3">
                <Av id={a.ag} size={24} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-[#1D1D1F] line-clamp-1">{a.action}</div>
                  <div className="text-[10px] text-[#86868B]">{a.date} · {a.t}</div>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${a.ok ? "bg-[#059669]" : "bg-[#D97706]"}`} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="text-[14px] font-semibold text-[#1D1D1F] mb-4 flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#DC2626]" />
            Offene Entscheide
          </div>
          <div className="space-y-3">
            {DECISIONS.filter(d => d.status === "pending").map(d => (
              <div key={d.id} className="p-3 rounded-xl bg-[#FFF8E1] border border-[#FEF3C7]">
                <div className="flex items-center gap-2 mb-1.5">
                  <Av id={d.ag} size={20} />
                  <span className="text-[11px] font-medium text-[#713F12]">{ga(d.ag).name} · {d.type}</span>
                </div>
                <div className="text-[12px] text-[#1D1D1F] mb-2">{d.req}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#86868B]">Confidence: {d.conf}%</span>
                  <div className="flex gap-2">
                    <button className="px-2.5 py-1 text-[11px] rounded-lg border border-[#E5E5EA] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7]">Deny</button>
                    <button className="px-3 py-1 text-[11px] rounded-lg bg-[#000088] text-white font-medium hover:opacity-90">Approve</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sprint Progress */}
      <Card>
        <div className="text-[14px] font-semibold text-[#1D1D1F] mb-4">Aktive Sprints</div>
        <div className="space-y-3">
          {SPRINTS.filter(s => s.status === "active").map(s => {
            const col = ac(s.owner);
            return (
              <div key={s.id} className="flex items-center gap-4">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ color: col.bg, background: col.bg + "15" }}>{s.id}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-medium text-[#1D1D1F]">{s.title}</span>
                    <span className="text-[11px] text-[#86868B]">{s.done}/{s.tasks} Tasks</span>
                  </div>
                  <PBar prog={s.prog} color={col.bg} />
                </div>
                <span className="text-[11px] font-medium text-[#1D1D1F]">{s.prog}%</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ── AGENTS VIEW ───────────────────────────────────────────────────────────
function AgentsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-[15px] font-semibold text-[#1D1D1F]">Dein Kader ({AGENTS.length} Agents)</div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#000088] text-white text-[12px] font-medium rounded-lg hover:opacity-90">
          <Plus size={14} /> Agent hinzufügen
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {AGENTS.map(a => {
          const col = ac(a.id);
          return (
            <Card key={a.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <Av id={a.id} size={48} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[15px] font-semibold text-[#1D1D1F]">{a.name}</div>
                    <Pill txt={a.status === "active" ? "Aktiv" : "Standby"} bg={a.status === "active" ? "#DCFCE7" : "#FEF9C3"} c={a.status === "active" ? "#14532D" : "#713F12"} />
                  </div>
                  <div className="text-[12px] text-[#6E6E73] mb-2">{a.role} · {a.dept}</div>
                  <div className="text-[12px] text-[#1D1D1F] mb-3 p-2 bg-[#F5F5F7] rounded-lg">{a.focus}</div>
                  <div className="flex items-center gap-4 text-[11px] text-[#86868B]">
                    <span>{a.openTasks} offen</span>
                    <span>{a.doneTasks} erledigt</span>
                    <span>{a.version}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── TASKS VIEW ────────────────────────────────────────────────────────────
function TasksView() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? TASKS : TASKS.filter(t => t.st === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {[["all", "Alle"], ["todo", "Offen"], ["in-progress", "In Arbeit"], ["done", "Erledigt"]].map(([id, lbl]) => (
            <button key={id} onClick={() => setFilter(id)}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-all ${filter === id ? "border-[#000088] bg-[#00008815] text-[#000088]" : "border-[#E5E5EA] text-[#6E6E73] hover:bg-[#F5F5F7]"}`}>
              {lbl}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#000088] text-white text-[12px] font-medium rounded-lg"><Plus size={14} /> Neue Aufgabe</button>
      </div>

      <Card className="!p-0 overflow-hidden">
        {filtered.map((t, i) => (
          <div key={t.id} className={`flex items-center gap-4 px-5 py-3.5 ${i < filtered.length - 1 ? "border-b border-[#F5F5F7]" : ""} hover:bg-[#FAFAFA] transition-colors`}>
            <Av id={t.ag} size={28} />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] text-[#1D1D1F] font-medium truncate">{t.title}</div>
              <div className="flex gap-2 mt-1">
                <span className="text-[10px] text-[#86868B]">{ga(t.ag).name}</span>
                <span className="text-[10px] text-[#86868B]">·</span>
                <span className="text-[10px] text-[#86868B]">Fällig: {t.due}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {t.tags.map(tag => <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-[#F5F5F7] text-[#86868B]">{tag}</span>)}
              <Pill txt={PRI[t.pri].lbl} bg={PRI[t.pri].bg} c={PRI[t.pri].c} />
              <Pill txt={ST[t.st].lbl} bg={ST[t.st].bg} c={ST[t.st].c} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── GOALS VIEW ────────────────────────────────────────────────────────────
function GoalsView() {
  return (
    <div className="space-y-4">
      <div className="text-[15px] font-semibold text-[#1D1D1F]">Unternehmensziele</div>
      <div className="grid grid-cols-2 gap-4">
        {GOALS.map(g => {
          const col = ac(g.owner);
          const st = GOAL_ST[g.st];
          return (
            <Card key={g.id}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-[14px] font-medium text-[#1D1D1F]">{g.title}</div>
                <Pill txt={st.lbl} bg={st.bg} c={st.c} />
              </div>
              <div className="flex items-center gap-2 mb-3 text-[11px] text-[#86868B]">
                <Av id={g.owner} size={18} />
                <span>{ga(g.owner).name}</span>
                <span>·</span>
                <span>{g.dept}</span>
                <span>·</span>
                <span>Deadline: {g.dl}</span>
              </div>
              <PBar prog={g.prog} color={col.bg} />
              <div className="text-right text-[11px] text-[#86868B] mt-1">{g.prog}%</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── MEETING VIEW ──────────────────────────────────────────────────────────
function MeetingView() {
  const [activeAgent, setActiveAgent] = useState("vega");
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const current = ga(activeAgent);
  const col = ac(activeAgent);

  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: "user", text: input }]);
    // Simulate agent response
    const reply = `[${current.name}] Verstanden. Ich arbeite daran: "${input.slice(0, 50)}..."`;
    setTimeout(() => setMessages(m => [...m, { from: activeAgent, text: reply }]), 800);
    setInput("");
  };

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 130px)" }}>
      {/* Agent Selector */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[...AGENTS, { id: "team", name: "Team", role: "Alle Agents", av: "T" }].map(a => {
          const c = ac(a.id);
          const active = activeAgent === a.id;
          return (
            <button key={a.id} onClick={() => { setActiveAgent(a.id); setMessages([]); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${active ? "border-[" + c.bg + "] shadow-sm" : "border-[#E5E5EA] hover:bg-[#F5F5F7]"}`}
              style={active ? { background: c.bg + "10", borderColor: c.bg } : {}}>
              <Av id={a.id} size={24} />
              <div className="text-left">
                <div className={`text-[12px] ${active ? "font-medium" : ""}`} style={active ? { color: c.bg } : {}}>{a.name}</div>
                <div className="text-[10px] text-[#86868B]">{a.role}</div>
              </div>
            </button>
          );
        })}
        <button onClick={() => setMessages([])} className="ml-auto px-2.5 py-1.5 rounded-lg border border-[#E5E5EA] text-[#86868B] text-[11px] flex items-center gap-1 hover:bg-[#F5F5F7]">
          <RefreshCw size={12} /> Clear
        </button>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col !p-0 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3 border-b border-[#E5E5EA] flex items-center gap-3 bg-[#FAFAFA]">
          <Av id={activeAgent} size={32} />
          <div>
            <div className="text-[13px] font-medium text-[#1D1D1F]">{current.name} — {current.role}</div>
            <div className="text-[11px] text-[#86868B]">Bereit für Anweisungen</div>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-[#059669]" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-[#86868B] text-[13px] mt-16">
              <Av id={activeAgent} size={48} />
              <div className="font-medium text-[#6E6E73] mt-4 mb-1">{current.name} ist bereit</div>
              <div className="mb-4">Stell deine erste Frage oder gib einen Befehl ein.</div>
              <div className="flex gap-2 justify-center flex-wrap">
                {["Was sind unsere Prioritäten?", "Status Report bitte", "Nächste Schritte?"].map(q => (
                  <button key={q} onClick={() => setInput(q)}
                    className="px-3 py-1.5 text-[11px] rounded-lg border border-[#E5E5EA] bg-white text-[#6E6E73] hover:bg-[#F5F5F7]">{q}</button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => {
            const isUser = m.from === "user";
            return (
              <div key={i} className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
                <Av id={isUser ? "team" : m.from} size={28} />
                <div className={`max-w-[70%] px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${isUser ? "bg-[#000088] text-white rounded-[12px_4px_12px_12px]" : "bg-[#F5F5F7] text-[#1D1D1F] rounded-[4px_12px_12px_12px]"}`}>
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="px-5 py-3 border-t border-[#E5E5EA] flex gap-3">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMsg()}
            placeholder={`Nachricht an ${current.name}...`}
            className="flex-1 px-4 py-2 rounded-lg bg-[#F5F5F7] text-[13px] outline-none focus:ring-2 focus:ring-[#000088] focus:ring-opacity-30" />
          <button onClick={sendMsg}
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${input.trim() ? "bg-[#000088] text-white" : "bg-[#F5F5F7] text-[#86868B]"}`}>
            <Send size={15} />
          </button>
        </div>
      </Card>
    </div>
  );
}

// ── DECISIONS VIEW ────────────────────────────────────────────────────────
function DecisionsView() {
  return (
    <div className="space-y-4">
      <div className="text-[15px] font-semibold text-[#1D1D1F]">Entscheide</div>
      <Card className="!p-0 overflow-hidden">
        {DECISIONS.map((d, i) => {
          const st = DEC_ST[d.status];
          return (
            <div key={d.id} className={`flex items-center gap-4 px-5 py-4 ${i < DECISIONS.length - 1 ? "border-b border-[#F5F5F7]" : ""}`}>
              <Av id={d.ag} size={32} />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-[#1D1D1F] font-medium">{d.req}</div>
                <div className="flex gap-3 mt-1 text-[11px] text-[#86868B]">
                  <span>{ga(d.ag).name}</span>
                  <span>Conf: {d.conf}%</span>
                  <span>{d.date}</span>
                  {d.by && <span>→ {d.by}</span>}
                </div>
              </div>
              <Pill txt={d.type} bg="#F5F5F7" c="#6E6E73" />
              <Pill txt={st.lbl} bg={st.bg} c={st.c} />
              {d.status === "pending" && (
                <div className="flex gap-2">
                  <button className="px-2.5 py-1 text-[11px] rounded-lg border border-[#E5E5EA] hover:bg-[#F5F5F7]">Deny</button>
                  <button className="px-3 py-1 text-[11px] rounded-lg bg-[#000088] text-white font-medium hover:opacity-90">Approve</button>
                </div>
              )}
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// ── SPRINTS VIEW ──────────────────────────────────────────────────────────
function SprintsView() {
  const SPR_ST: Record<string, { bg: string; c: string; lbl: string }> = {
    done:    { bg: "#DCFCE7", c: "#14532D", lbl: "Done" },
    active:  { bg: "#DBEAFE", c: "#1E3A5F", lbl: "Active" },
    planned: { bg: "#F3F4F6", c: "#374151", lbl: "Planned" },
  };

  return (
    <div className="space-y-4">
      <div className="text-[15px] font-semibold text-[#1D1D1F]">Sprint Plan</div>
      <div className="space-y-3">
        {SPRINTS.map(s => {
          const col = ac(s.owner);
          const st = SPR_ST[s.status];
          return (
            <Card key={s.id}>
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg" style={{ color: col.bg, background: col.bg + "15" }}>{s.id}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[13px] font-medium text-[#1D1D1F]">{s.title}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#86868B]">{s.done}/{s.tasks}</span>
                      <Pill txt={st.lbl} bg={st.bg} c={st.c} />
                    </div>
                  </div>
                  <div className="text-[11px] text-[#86868B] mb-2">{s.desc}</div>
                  <PBar prog={s.prog} color={col.bg} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── AUDIT VIEW ────────────────────────────────────────────────────────────
function AuditView() {
  return (
    <div className="space-y-4">
      <div className="text-[15px] font-semibold text-[#1D1D1F]">Audit Trail</div>
      <Card className="!p-0 overflow-hidden">
        {AUDIT.map((a, i) => (
          <div key={a.id} className={`flex items-center gap-4 px-5 py-3.5 ${i < AUDIT.length - 1 ? "border-b border-[#F5F5F7]" : ""}`}>
            <Av id={a.ag} size={28} />
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-[#1D1D1F]">{a.action}</div>
              <div className="text-[10px] text-[#86868B] mt-0.5">{ga(a.ag).name} · {a.date} {a.t}</div>
            </div>
            <div className={`w-2 h-2 rounded-full ${a.ok ? "bg-[#059669]" : "bg-[#D97706]"}`} />
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── CONNECTORS VIEW ───────────────────────────────────────────────────────
const LLM_PROVIDERS = [
  { id: "anthropic", name: "Anthropic", desc: "Claude Sonnet, Opus, Haiku", icon: "🧠", models: ["claude-sonnet-4", "claude-opus-4", "claude-haiku-3.5"], status: "connected", color: "#D97706" },
  { id: "openai",    name: "OpenAI",    desc: "GPT-4o, GPT-4.1, o3",       icon: "🤖", models: ["gpt-4o", "gpt-4.1", "o3-mini", "o3"],                  status: "disconnected", color: "#059669" },
  { id: "mistral",   name: "Mistral",   desc: "EU-hosted, Large & Small",  icon: "🌊", models: ["mistral-large", "mistral-small", "codestral"],          status: "disconnected", color: "#000088" },
  { id: "ollama",    name: "Ollama",    desc: "Lokale Modelle, kein API Key", icon: "🏠", models: ["llama3.3", "qwen3", "deepseek-r1"],                 status: "disconnected", color: "#000088" },
  { id: "custom",    name: "Custom",    desc: "OpenAI-kompatibler Endpoint", icon: "⚙️", models: [],                                                     status: "disconnected", color: "#6E6E73" },
];

const TOOL_CONNECTORS = [
  { id: "github",    name: "GitHub",     desc: "Repos, Issues, PRs, Code",          icon: "🐙", cat: "Development", status: "connected" },
  { id: "slack",     name: "Slack",      desc: "Nachrichten, Benachrichtigungen",    icon: "💬", cat: "Communication", status: "disconnected" },
  { id: "notion",    name: "Notion",     desc: "Docs, Datenbanken, Wikis",           icon: "📝", cat: "Productivity", status: "connected" },
  { id: "supabase",  name: "Supabase",   desc: "PostgreSQL, Auth, Edge Functions",   icon: "⚡", cat: "Database", status: "connected" },
  { id: "n8n",       name: "n8n",        desc: "Workflow Automations",               icon: "🔄", cat: "Automation", status: "disconnected" },
  { id: "smtp",      name: "E-Mail",     desc: "SMTP Versand für Agents",            icon: "📧", cat: "Communication", status: "disconnected" },
  { id: "calendar",  name: "Kalender",   desc: "Google/Outlook, Heartbeat-Planung",  icon: "📅", cat: "Productivity", status: "disconnected" },
  { id: "webhook",   name: "Webhook",    desc: "Custom HTTP Endpoints",              icon: "🔗", cat: "Custom", status: "disconnected" },
  { id: "mcp",       name: "MCP Server", desc: "Model Context Protocol",             icon: "🔌", cat: "AI", status: "disconnected" },
  { id: "drive",     name: "Google Drive",desc: "Docs, Sheets, Files",               icon: "📁", cat: "Productivity", status: "disconnected" },
  { id: "apollo",    name: "Apollo",     desc: "CRM, Kontakte, Sequenzen",           icon: "🚀", cat: "Sales", status: "disconnected" },
  { id: "jira",      name: "Jira",       desc: "Issues, Sprints, Boards",            icon: "📋", cat: "Development", status: "disconnected" },
];

const SKILLS_DATA = [
  { id: "s1", name: "Sales Outreach",    desc: "Cold Outreach, Follow-up, MEDDICC", agents: ["aura"], tags: ["Sales", "Outreach"], type: "official" },
  { id: "s2", name: "Code Review",       desc: "PR Reviews, Architecture Checks",   agents: ["max"],  tags: ["Engineering"],      type: "official" },
  { id: "s3", name: "OKR Management",    desc: "Ziele setzen, tracken, bewerten",   agents: ["vega"], tags: ["Leadership"],       type: "official" },
  { id: "s4", name: "Content Writing",   desc: "Blog Posts, Social Media, Docs",    agents: ["aura"], tags: ["Marketing"],        type: "official" },
  { id: "s5", name: "Competitive Intel",  desc: "Marktanalyse, Wettbewerber",       agents: ["orion"],tags: ["Strategy"],         type: "official" },
];

function ConnectorsView() {
  const [tab, setTab] = useState<"llm" | "tools" | "skills" | "agents">("llm");
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [configAgent, setConfigAgent] = useState<string | null>(null);

  const toggleKey = (id: string) => setShowApiKey(p => ({ ...p, [id]: !p[id] }));
  const connected = TOOL_CONNECTORS.filter(c => c.status === "connected").length;

  return (
    <div className="space-y-5">
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "LLM Providers", value: LLM_PROVIDERS.filter(l => l.status === "connected").length + "/" + LLM_PROVIDERS.length, icon: Brain, color: "#D97706" },
          { label: "Tools verbunden", value: connected + "/" + TOOL_CONNECTORS.length, icon: Plug, color: "#000088" },
          { label: "Skills geladen", value: String(SKILLS_DATA.length), icon: FileCode, color: "#000088" },
          { label: "Agents konfiguriert", value: AGENTS.filter(a => a.status === "active").length + "/" + AGENTS.length, icon: Bot, color: "#059669" },
        ].map((s, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[12px] text-[#86868B] mb-1">{s.label}</div>
                <div className="text-[22px] font-semibold text-[#1D1D1F]">{s.value}</div>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.color + "15" }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-[#F5F5F7] rounded-xl w-fit">
        {([
          ["llm", "LLM Providers", Brain],
          ["tools", "Tool Connectors", Plug],
          ["skills", "Skills", FileCode],
          ["agents", "Agent Config", Sliders],
        ] as const).map(([id, label, Icon]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium transition-all ${tab === id ? "bg-white text-[#000088] shadow-sm" : "text-[#6E6E73] hover:text-[#1D1D1F]"}`}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* ── LLM PROVIDERS TAB ── */}
      {tab === "llm" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-[14px] font-semibold text-[#1D1D1F]">LLM Providers</div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#000088] text-white text-[12px] font-medium rounded-lg">
              <Plus size={14} /> Custom Provider
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {LLM_PROVIDERS.map(p => (
              <Card key={p.id} className={`${p.status === "connected" ? "!border-[#059669]/30" : ""}`}>
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[24px] bg-[#F5F5F7]">{p.icon}</div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-[14px] font-semibold text-[#1D1D1F]">{p.name}</div>
                      <Pill txt={p.status === "connected" ? "Verbunden" : "Nicht verbunden"}
                        bg={p.status === "connected" ? "#DCFCE7" : "#F3F4F6"}
                        c={p.status === "connected" ? "#14532D" : "#6E6E73"} />
                    </div>
                    <div className="text-[12px] text-[#6E6E73] mb-3">{p.desc}</div>

                    {/* API Key Input */}
                    <div className="flex gap-3 mb-3">
                      <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[#F5F5F7] rounded-lg border border-[#E5E5EA]">
                        <Key size={13} className="text-[#86868B] shrink-0" />
                        <input
                          type={showApiKey[p.id] ? "text" : "password"}
                          placeholder={p.id === "ollama" ? "http://localhost:11434" : `${p.name} API Key`}
                          defaultValue={p.status === "connected" ? "sk-••••••••••••••••••••" : ""}
                          className="flex-1 bg-transparent text-[12px] outline-none text-[#1D1D1F] placeholder:text-[#C7C7CC]"
                        />
                        <button onClick={() => toggleKey(p.id)} className="text-[#86868B] hover:text-[#1D1D1F]">
                          {showApiKey[p.id] ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      </div>
                      <button className={`px-4 py-2 rounded-lg text-[12px] font-medium transition-all ${p.status === "connected" ? "bg-[#DCFCE7] text-[#14532D]" : "bg-[#000088] text-white hover:opacity-90"}`}>
                        {p.status === "connected" ? <span className="flex items-center gap-1"><Check size={13} /> Verbunden</span> : "Verbinden"}
                      </button>
                    </div>

                    {/* Models */}
                    {p.models.length > 0 && (
                      <div>
                        <div className="text-[11px] text-[#86868B] mb-1.5">Verfügbare Modelle</div>
                        <div className="flex gap-1.5 flex-wrap">
                          {p.models.map(m => (
                            <span key={m} className="px-2 py-0.5 text-[10px] rounded-md bg-[#F5F5F7] text-[#6E6E73] border border-[#E5E5EA]">{m}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Test & Actions */}
                  <div className="flex flex-col gap-2">
                    <button className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] rounded-lg border border-[#E5E5EA] text-[#6E6E73] hover:bg-[#F5F5F7]">
                      <TestTube size={12} /> Testen
                    </button>
                    {p.status === "connected" && (
                      <button className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] rounded-lg border border-[#FEE2E2] text-[#DC2626] hover:bg-[#FEF2F2]">
                        <Trash2 size={12} /> Trennen
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── TOOL CONNECTORS TAB ── */}
      {tab === "tools" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-[14px] font-semibold text-[#1D1D1F]">Tool Connectors ({connected} verbunden)</div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E5EA] text-[#6E6E73] text-[12px] rounded-lg hover:bg-[#F5F5F7]">
                <Webhook size={14} /> Custom Webhook
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#000088] text-white text-[12px] font-medium rounded-lg">
                <Plus size={14} /> MCP Server
              </button>
            </div>
          </div>

          {/* Category Groups */}
          {["Development", "Communication", "Productivity", "Database", "Automation", "AI", "Sales", "Custom"].map(cat => {
            const tools = TOOL_CONNECTORS.filter(t => t.cat === cat);
            if (tools.length === 0) return null;
            return (
              <div key={cat}>
                <div className="text-[12px] font-medium text-[#86868B] uppercase tracking-wider mb-2">{cat}</div>
                <div className="grid grid-cols-3 gap-3">
                  {tools.map(t => (
                    <Card key={t.id} className={`!p-4 hover:shadow-md transition-all cursor-pointer ${t.status === "connected" ? "!border-[#059669]/30" : ""}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[20px] bg-[#F5F5F7]">{t.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-medium text-[#1D1D1F]">{t.name}</div>
                          <div className="text-[11px] text-[#86868B] truncate">{t.desc}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Pill txt={t.status === "connected" ? "Verbunden" : "Verfügbar"}
                          bg={t.status === "connected" ? "#DCFCE7" : "#F3F4F6"}
                          c={t.status === "connected" ? "#14532D" : "#6E6E73"} />
                        <button className={`px-3 py-1 text-[11px] rounded-lg font-medium ${t.status === "connected" ? "text-[#6E6E73] border border-[#E5E5EA] hover:bg-[#F5F5F7]" : "bg-[#000088] text-white"}`}>
                          {t.status === "connected" ? "Konfigurieren" : "Verbinden"}
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── SKILLS TAB ── */}
      {tab === "skills" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-[14px] font-semibold text-[#1D1D1F]">Skills Library ({SKILLS_DATA.length} Skills)</div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#000088] text-white text-[12px] font-medium rounded-lg">
              <Upload size={14} /> Skill hochladen
            </button>
          </div>

          {/* Upload Area */}
          <Card className="!p-0 overflow-hidden">
            <div className="border-2 border-dashed border-[#E5E5EA] rounded-xl m-4 p-8 text-center hover:border-[#000088] hover:bg-[#00008815] transition-all cursor-pointer">
              <Upload size={32} className="mx-auto mb-3 text-[#86868B]" />
              <div className="text-[13px] font-medium text-[#1D1D1F] mb-1">SKILLS.md oder JSON hochladen</div>
              <div className="text-[11px] text-[#86868B]">Drag & Drop oder klicken · Markdown, JSON, YAML</div>
            </div>
          </Card>

          {/* Skills List */}
          <Card className="!p-0 overflow-hidden">
            {SKILLS_DATA.map((s, i) => (
              <div key={s.id} className={`flex items-center gap-4 px-5 py-3.5 ${i < SKILLS_DATA.length - 1 ? "border-b border-[#F5F5F7]" : ""} hover:bg-[#FAFAFA]`}>
                <div className="w-9 h-9 rounded-xl bg-[#00008815] flex items-center justify-center">
                  <FileCode size={16} className="text-[#000088]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[#1D1D1F]">{s.name}</div>
                  <div className="text-[11px] text-[#86868B]">{s.desc}</div>
                </div>
                <div className="flex gap-1.5">
                  {s.tags.map(t => <span key={t} className="px-2 py-0.5 text-[10px] rounded bg-[#F5F5F7] text-[#86868B]">{t}</span>)}
                </div>
                <div className="flex gap-1.5">
                  {s.agents.map(a => <Av key={a} id={a} size={22} />)}
                </div>
                <Pill txt={s.type === "official" ? "Offiziell" : "Custom"} bg={s.type === "official" ? "#DBEAFE" : "#F5F5F7"} c={s.type === "official" ? "#1E3A5F" : "#6E6E73"} />
                <button className="text-[#86868B] hover:text-[#1D1D1F]"><Wrench size={14} /></button>
              </div>
            ))}
          </Card>

          {/* Skill Templates */}
          <div>
            <div className="text-[13px] font-medium text-[#1D1D1F] mb-3">Skill Templates</div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: "Swiss Sales", desc: "MEDDICC, Outreach, Follow-up", icon: "🇨🇭" },
                { name: "DevOps", desc: "CI/CD, Monitoring, Deploy", icon: "🔧" },
                { name: "Content Creator", desc: "Blog, Social, Newsletter", icon: "✍️" },
                { name: "Data Analyst", desc: "SQL, Reports, Dashboards", icon: "📊" },
              ].map(t => (
                <Card key={t.name} className="!p-3 hover:shadow-md cursor-pointer transition-all">
                  <div className="text-[20px] mb-2">{t.icon}</div>
                  <div className="text-[12px] font-medium text-[#1D1D1F]">{t.name}</div>
                  <div className="text-[10px] text-[#86868B] mb-2">{t.desc}</div>
                  <button className="text-[11px] text-[#000088] font-medium">+ Installieren</button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── AGENT CONFIG TAB ── */}
      {tab === "agents" && (
        <div className="space-y-4">
          <div className="text-[14px] font-semibold text-[#1D1D1F]">Agent Konfiguration</div>

          {configAgent ? (
            // ── Agent Detail Config ──
            <AgentConfigDetail agentId={configAgent} onBack={() => setConfigAgent(null)} />
          ) : (
            // ── Agent List ──
            <div className="grid grid-cols-2 gap-4">
              {AGENTS.map(a => {
                const col = ac(a.id);
                return (
                  <Card key={a.id} className="hover:shadow-md cursor-pointer transition-all" onClick={() => setConfigAgent(a.id)}>
                    <div className="flex items-start gap-4">
                      <Av id={a.id} size={44} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-[14px] font-semibold text-[#1D1D1F]">{a.name}</div>
                          <Pill txt={a.status === "active" ? "Aktiv" : "Standby"} bg={a.status === "active" ? "#DCFCE7" : "#FEF9C3"} c={a.status === "active" ? "#14532D" : "#713F12"} />
                        </div>
                        <div className="text-[12px] text-[#6E6E73] mb-3">{a.role} · {a.dept}</div>

                        {/* Config Summary */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="px-2.5 py-1.5 bg-[#F5F5F7] rounded-lg">
                            <div className="text-[9px] text-[#86868B] uppercase tracking-wider">LLM</div>
                            <div className="text-[11px] font-medium text-[#1D1D1F]">Claude Sonnet 4</div>
                          </div>
                          <div className="px-2.5 py-1.5 bg-[#F5F5F7] rounded-lg">
                            <div className="text-[9px] text-[#86868B] uppercase tracking-wider">Budget</div>
                            <div className="text-[11px] font-medium text-[#1D1D1F]">CHF 50/Monat</div>
                          </div>
                          <div className="px-2.5 py-1.5 bg-[#F5F5F7] rounded-lg">
                            <div className="text-[9px] text-[#86868B] uppercase tracking-wider">Tools</div>
                            <div className="text-[11px] font-medium text-[#1D1D1F]">{a.id === "max" ? "3 verbunden" : a.id === "aura" ? "2 verbunden" : "1 verbunden"}</div>
                          </div>
                          <div className="px-2.5 py-1.5 bg-[#F5F5F7] rounded-lg">
                            <div className="text-[9px] text-[#86868B] uppercase tracking-wider">Heartbeat</div>
                            <div className="text-[11px] font-medium text-[#1D1D1F]">{a.status === "active" ? "Alle 2h" : "Deaktiviert"}</div>
                          </div>
                        </div>

                        <button className="mt-3 flex items-center gap-1 text-[12px] text-[#000088] font-medium hover:underline">
                          <Sliders size={13} /> Konfigurieren <ChevronRight size={13} />
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── AGENT CONFIG DETAIL ───────────────────────────────────────────────────
function AgentConfigDetail({ agentId, onBack }: { agentId: string; onBack: () => void }) {
  const agent = ga(agentId);
  const col = ac(agentId);
  const [configTab, setConfigTab] = useState<"general" | "llm" | "tools" | "skills" | "governance">("general");

  return (
    <div className="space-y-4">
      {/* Back + Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="px-2.5 py-1.5 rounded-lg border border-[#E5E5EA] text-[#6E6E73] text-[12px] hover:bg-[#F5F5F7]">← Zurück</button>
        <Av id={agentId} size={32} />
        <div>
          <div className="text-[15px] font-semibold text-[#1D1D1F]">{agent.name} konfigurieren</div>
          <div className="text-[11px] text-[#86868B]">{agent.role}</div>
        </div>
      </div>

      {/* Config Tabs */}
      <div className="flex gap-1 p-1 bg-[#F5F5F7] rounded-xl w-fit">
        {([
          ["general", "Allgemein"],
          ["llm", "LLM & Modell"],
          ["tools", "Tools & Connectors"],
          ["skills", "Skills"],
          ["governance", "Governance"],
        ] as const).map(([id, label]) => (
          <button key={id} onClick={() => setConfigTab(id)}
            className={`px-4 py-2 rounded-lg text-[12px] font-medium transition-all ${configTab === id ? "bg-white text-[#000088] shadow-sm" : "text-[#6E6E73]"}`}>
            {label}
          </button>
        ))}
      </div>

      {/* General Tab */}
      {configTab === "general" && (
        <Card>
          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-medium text-[#1D1D1F] block mb-1.5">Name</label>
              <input defaultValue={agent.name} className="w-full px-3 py-2 bg-[#F5F5F7] rounded-lg text-[13px] outline-none border border-[#E5E5EA] focus:border-[#000088]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#1D1D1F] block mb-1.5">Rolle</label>
              <input defaultValue={agent.role} className="w-full px-3 py-2 bg-[#F5F5F7] rounded-lg text-[13px] outline-none border border-[#E5E5EA] focus:border-[#000088]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#1D1D1F] block mb-1.5">System Prompt</label>
              <textarea rows={6} defaultValue={`Du bist ${agent.name}, der ${agent.role} von KaderOS Demo. Du arbeitest autonom, berichtest klar und eskalierst bei Unsicherheit. Antworte auf Deutsch, kurz und präzise.`}
                className="w-full px-3 py-2 bg-[#F5F5F7] rounded-lg text-[12px] outline-none border border-[#E5E5EA] focus:border-[#000088] font-mono leading-relaxed" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#1D1D1F] block mb-1.5">Reports an</label>
              <select className="w-full px-3 py-2 bg-[#F5F5F7] rounded-lg text-[13px] outline-none border border-[#E5E5EA]">
                <option>— Kein Vorgesetzter —</option>
                {AGENTS.filter(a => a.id !== agentId).map(a => <option key={a.id}>{a.name} ({a.role})</option>)}
              </select>
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#1D1D1F] block mb-1.5">Accent Farbe</label>
              <div className="flex gap-2">
                {["#000088", "#000088", "#0891B2", "#059669", "#D97706", "#DC2626"].map(c => (
                  <button key={c} className="w-8 h-8 rounded-full border-2 transition-all" style={{ background: c, borderColor: col.bg === c ? "#1D1D1F" : "transparent" }} />
                ))}
              </div>
            </div>
            <button className="px-4 py-2 bg-[#000088] text-white text-[12px] font-medium rounded-lg hover:opacity-90">Speichern</button>
          </div>
        </Card>
      )}

      {/* LLM Tab */}
      {configTab === "llm" && (
        <Card>
          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-medium text-[#1D1D1F] block mb-1.5">LLM Provider</label>
              <select className="w-full px-3 py-2 bg-[#F5F5F7] rounded-lg text-[13px] outline-none border border-[#E5E5EA]">
                {LLM_PROVIDERS.map(p => <option key={p.id} disabled={p.status !== "connected"}>{p.icon} {p.name} {p.status !== "connected" ? "(nicht verbunden)" : ""}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#1D1D1F] block mb-1.5">Modell</label>
              <select className="w-full px-3 py-2 bg-[#F5F5F7] rounded-lg text-[13px] outline-none border border-[#E5E5EA]">
                <option>claude-sonnet-4 (empfohlen)</option>
                <option>claude-opus-4 (premium)</option>
                <option>claude-haiku-3.5 (schnell & günstig)</option>
              </select>
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#1D1D1F] block mb-1.5">Max Tokens pro Request</label>
              <input type="number" defaultValue={4096} className="w-full px-3 py-2 bg-[#F5F5F7] rounded-lg text-[13px] outline-none border border-[#E5E5EA]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#1D1D1F] block mb-1.5">Temperature</label>
              <div className="flex items-center gap-3">
                <input type="range" min="0" max="100" defaultValue={30} className="flex-1" />
                <span className="text-[12px] text-[#6E6E73] w-10 text-right">0.3</span>
              </div>
              <div className="text-[10px] text-[#86868B] mt-1">Niedrig = präzise, Hoch = kreativ</div>
            </div>
            <button className="px-4 py-2 bg-[#000088] text-white text-[12px] font-medium rounded-lg hover:opacity-90">Speichern</button>
          </div>
        </Card>
      )}

      {/* Tools Tab */}
      {configTab === "tools" && (
        <Card>
          <div className="text-[13px] font-medium text-[#1D1D1F] mb-3">Welche Tools darf {agent.name} nutzen?</div>
          <div className="space-y-2">
            {TOOL_CONNECTORS.map(t => {
              const enabled = t.status === "connected" && (agentId === "max" ? ["github", "supabase", "n8n"].includes(t.id) : agentId === "aura" ? ["notion", "apollo"].includes(t.id) : ["notion"].includes(t.id));
              return (
                <div key={t.id} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all ${enabled ? "border-[#059669]/30 bg-[#F0FDF4]" : "border-[#E5E5EA]"} ${t.status !== "connected" ? "opacity-40" : "cursor-pointer hover:bg-[#FAFAFA]"}`}>
                  <div className="text-[18px]">{t.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-[#1D1D1F]">{t.name}</div>
                    <div className="text-[10px] text-[#86868B]">{t.desc}</div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-all ${enabled ? "bg-[#059669]" : "bg-[#E5E5EA]"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${enabled ? "left-[22px]" : "left-0.5"}`} />
                  </div>
                </div>
              );
            })}
          </div>
          <button className="mt-4 px-4 py-2 bg-[#000088] text-white text-[12px] font-medium rounded-lg hover:opacity-90">Speichern</button>
        </Card>
      )}

      {/* Skills Tab */}
      {configTab === "skills" && (
        <Card>
          <div className="text-[13px] font-medium text-[#1D1D1F] mb-3">Skills für {agent.name}</div>
          <div className="space-y-2 mb-4">
            {SKILLS_DATA.map(s => {
              const assigned = s.agents.includes(agentId);
              return (
                <div key={s.id} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all cursor-pointer hover:bg-[#FAFAFA] ${assigned ? "border-[#000088]/30 bg-[#FAF5FF]" : "border-[#E5E5EA]"}`}>
                  <FileCode size={16} className="text-[#000088]" />
                  <div className="flex-1">
                    <div className="text-[12px] font-medium text-[#1D1D1F]">{s.name}</div>
                    <div className="text-[10px] text-[#86868B]">{s.desc}</div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-all ${assigned ? "bg-[#000088]" : "bg-[#E5E5EA]"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${assigned ? "left-[22px]" : "left-0.5"}`} />
                  </div>
                </div>
              );
            })}
          </div>
          <button className="px-4 py-2 bg-[#000088] text-white text-[12px] font-medium rounded-lg hover:opacity-90">Speichern</button>
        </Card>
      )}

      {/* Governance Tab */}
      {configTab === "governance" && (
        <Card>
          <div className="space-y-5">
            <div>
              <div className="text-[13px] font-medium text-[#1D1D1F] mb-3">Confidence Gate</div>
              <div className="space-y-2">
                {[
                  { range: "≥ 90%", action: "Auto-Execute", desc: "Agent führt eigenständig aus", color: "#059669", bg: "#DCFCE7" },
                  { range: "70–89%", action: "Inform", desc: "Ausführen + Benachrichtigung", color: "#D97706", bg: "#FEF9C3" },
                  { range: "< 70%", action: "Eskalieren", desc: "Wartet auf Genehmigung", color: "#DC2626", bg: "#FEE2E2" },
                ].map(g => (
                  <div key={g.range} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ background: g.bg }}>
                    <span className="text-[12px] font-mono font-semibold w-16" style={{ color: g.color }}>{g.range}</span>
                    <span className="text-[12px] font-medium text-[#1D1D1F]">{g.action}</span>
                    <span className="text-[11px] text-[#6E6E73]">— {g.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[12px] font-medium text-[#1D1D1F] block mb-1.5">Monatsbudget (CHF)</label>
              <div className="flex items-center gap-3">
                <input type="number" defaultValue={50} className="w-32 px-3 py-2 bg-[#F5F5F7] rounded-lg text-[13px] outline-none border border-[#E5E5EA]" />
                <span className="text-[12px] text-[#86868B]">Auto-Pause bei 100%</span>
              </div>
            </div>

            <div>
              <label className="text-[12px] font-medium text-[#1D1D1F] block mb-1.5">Heartbeat Schedule</label>
              <select className="w-full px-3 py-2 bg-[#F5F5F7] rounded-lg text-[13px] outline-none border border-[#E5E5EA]">
                <option>Alle 2 Stunden</option>
                <option>Stündlich</option>
                <option>Alle 30 Minuten</option>
                <option>Täglich um 09:00</option>
                <option>Custom Cron</option>
                <option>Deaktiviert</option>
              </select>
            </div>

            <div>
              <label className="text-[12px] font-medium text-[#1D1D1F] block mb-1.5">Berechtigungen</label>
              <div className="space-y-2">
                {[
                  { perm: "Darf Tasks erstellen", enabled: true },
                  { perm: "Darf Budget-Requests stellen", enabled: true },
                  { perm: "Darf Agents delegieren", enabled: false },
                  { perm: "Darf externe APIs aufrufen", enabled: true },
                  { perm: "Darf Deployments auslösen", enabled: false },
                ].map(p => (
                  <div key={p.perm} className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#E5E5EA]">
                    <span className="text-[12px] text-[#1D1D1F]">{p.perm}</span>
                    <div className={`w-10 h-5 rounded-full relative transition-all ${p.enabled ? "bg-[#059669]" : "bg-[#E5E5EA]"}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${p.enabled ? "left-[22px]" : "left-0.5"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="px-4 py-2 bg-[#000088] text-white text-[12px] font-medium rounded-lg hover:opacity-90">Speichern</button>
          </div>
        </Card>
      )}
    </div>
  );
}

// ── SETTINGS VIEW ─────────────────────────────────────────────────────────
function SettingsView() {
  return (
    <div className="space-y-4">
      <div className="text-[15px] font-semibold text-[#1D1D1F]">Einstellungen</div>
      <Card>
        <div className="space-y-4">
          <div>
            <div className="text-[12px] font-medium text-[#1D1D1F] mb-1">Company</div>
            <div className="text-[13px] text-[#6E6E73]">KaderOS Demo</div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-[#1D1D1F] mb-1">Sprache</div>
            <div className="flex gap-2">
              {["DE", "FR", "IT", "EN"].map(l => (
                <span key={l} className={`px-2.5 py-1 text-[11px] rounded-lg border ${l === "DE" ? "border-[#000088] bg-[#00008815] text-[#000088] font-medium" : "border-[#E5E5EA] text-[#86868B]"}`}>{l}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-[#1D1D1F] mb-1">Währung</div>
            <div className="text-[13px] text-[#6E6E73]">CHF (Schweizer Franken)</div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-[#1D1D1F] mb-1">Timezone</div>
            <div className="text-[13px] text-[#6E6E73]">Europe/Zurich (CET/CEST)</div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-[#1D1D1F] mb-1">Supabase</div>
            <div className="text-[11px] text-[#059669] flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#059669]" /> Verbunden</div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-[#1D1D1F] mb-1">License</div>
            <Pill txt="Community (Free)" bg="#DBEAFE" c="#1E3A5F" />
          </div>
        </div>
      </Card>
    </div>
  );
}
