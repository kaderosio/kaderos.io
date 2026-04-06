"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Save,
  User,
  Settings,
  BookOpen,
  Brain,
  Wallet,
  BarChart3,
  Upload,
  Plus,
  Trash2,
  Info,
  Play,
  Filter,
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  Activity,
} from "lucide-react";
import { useCompany } from "../../layout";
import { useToast } from "../../_components/toast";

/* ── Types ───────────────────────────────────────────────────────────── */

interface Agent {
  id: string;
  name: string;
  role: string;
  type: string;
  status: string;
  accent_color: string | null;
  focus: string | null;
  job_description: string | null;
  system_prompt: string | null;
  department_id: string | null;
  reports_to_id: string | null;
  config: Record<string, unknown> | null;
  skills: string[] | null;
  parameters: Record<string, { type: string; required: boolean }> | null;
  completed_tasks?: number;
  open_tasks?: number;
  company_id: string;
  created_at: string;
  updated_at: string;
}

interface AgentSummary {
  id: string;
  name: string;
  role: string;
}

interface Heartbeat {
  id: string;
  agent_id: string;
  is_enabled: boolean;
  cron_expression: string;
  last_run_at: string | null;
  next_run_at: string | null;
  total_runs: number;
  created_at: string;
}

interface Budget {
  id: string;
  agent_id: string;
  monthly_limit_chf: number;
  spent_chf: number;
  warning_threshold: number;
  period: string;
  is_paused: boolean;
}

/* ── Constants ──────────────────────────────────────────────────────── */

const TABS = [
  { key: "profil", label: "Profil", icon: User },
  { key: "konfiguration", label: "Konfiguration", icon: Settings },
  { key: "wissensbasis", label: "Wissensbasis", icon: BookOpen },
  { key: "gedaechtnis", label: "Ged\u00e4chtnis", icon: Brain },
  { key: "budget", label: "Budget & Automation", icon: Wallet },
  { key: "statistiken", label: "Statistiken", icon: BarChart3 },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "#DCFCE7", text: "#14532D", label: "Aktiv" },
  paused: { bg: "#FEF9C3", text: "#713F12", label: "Pausiert" },
  standby: { bg: "#F3F4F6", text: "#374151", label: "Standby" },
};

const MODEL_OPTIONS = [
  { value: "claude", label: "Claude Sonnet" },
  { value: "gpt", label: "GPT-4o" },
  { value: "deepl", label: "DeepL" },
  { value: "custom", label: "Custom" },
];

const CRON_OPTIONS = [
  { value: "0 8 * * *", label: "T\u00e4glich 08:00" },
  { value: "0 * * * *", label: "St\u00fcndlich" },
  { value: "0 8 * * 1", label: "W\u00f6chentlich Montag 08:00" },
];

/* ── Page ────────────────────────────────────────────────────────────── */

export default function AgentDetailPage() {
  const params = useParams();
  const agentId = params.id as string;
  const { companyId, loading: companyLoading } = useCompany();
  const { toast } = useToast();

  const [agent, setAgent] = useState<Agent | null>(null);
  const [agents, setAgents] = useState<AgentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("profil");
  const [saving, setSaving] = useState(false);

  /* ── Profil state ─────────────────────────────────────────────────── */
  const [profilForm, setProfilForm] = useState({
    name: "",
    role: "",
    jobDescription: "",
    department: "",
    reportsToId: "",
    accentColor: "#000088",
  });

  /* ── Konfiguration state ──────────────────────────────────────────── */
  const [configForm, setConfigForm] = useState({
    systemPrompt: "",
    model: "claude",
    type: "claude",
    focus: "",
    skills: [] as string[],
    newSkill: "",
    parameters: [] as { name: string; type: string; required: boolean }[],
  });

  /* ── Budget state ─────────────────────────────────────────────────── */
  const [budgetData, setBudgetData] = useState<Budget | null>(null);
  const [budgetForm, setBudgetForm] = useState({
    monthlyLimit: 100,
    warningAt: 80,
  });

  /* ── Heartbeat state ──────────────────────────────────────────────── */
  const [heartbeat, setHeartbeat] = useState<Heartbeat | null>(null);
  const [heartbeatForm, setHeartbeatForm] = useState({
    isEnabled: false,
    cronExpression: "0 8 * * *",
  });

  /* ── Fetch agent ──────────────────────────────────────────────────── */
  const fetchAgent = useCallback(async () => {
    if (!agentId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/agents/${agentId}`);
      if (!res.ok) throw new Error("Agent nicht gefunden");
      const { agent: data } = await res.json();
      setAgent(data);

      // Populate profil form
      setProfilForm({
        name: data.name || "",
        role: data.role || "",
        jobDescription: data.job_description || "",
        department: data.department_id || "",
        reportsToId: data.reports_to_id || "",
        accentColor: data.accent_color || "#000088",
      });

      // Populate config form
      const params = data.parameters || {};
      const paramArray = Object.entries(params).map(([name, val]: [string, any]) => ({
        name,
        type: val?.type || "text",
        required: val?.required ?? false,
      }));
      setConfigForm({
        systemPrompt: data.system_prompt || "",
        model: data.type || "claude",
        type: data.type || "claude",
        focus: data.focus || "",
        skills: Array.isArray(data.skills) ? data.skills : [],
        newSkill: "",
        parameters: paramArray,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fehler beim Laden");
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  /* ── Fetch all agents (for "Berichtet an" dropdown) ───────────────── */
  const fetchAgents = useCallback(async () => {
    if (!companyId) return;
    try {
      const res = await fetch(`/api/agents?companyId=${companyId}`);
      if (!res.ok) return;
      const { agents: list } = await res.json();
      setAgents(
        (list || [])
          .filter((a: AgentSummary) => a.id !== agentId)
          .map((a: AgentSummary) => ({ id: a.id, name: a.name, role: a.role }))
      );
    } catch {
      /* ignore */
    }
  }, [companyId, agentId]);

  /* ── Fetch budget ─────────────────────────────────────────────────── */
  const fetchBudget = useCallback(async () => {
    if (!companyId) return;
    try {
      const res = await fetch(`/api/budgets?companyId=${companyId}`);
      if (!res.ok) return;
      const { budgets } = await res.json();
      const match = (budgets || []).find((b: Budget) => b.agent_id === agentId);
      if (match) {
        setBudgetData(match);
        setBudgetForm({
          monthlyLimit: match.monthly_limit_chf,
          warningAt: match.warning_threshold,
        });
      }
    } catch {
      /* ignore */
    }
  }, [companyId, agentId]);

  /* ── Fetch heartbeat ──────────────────────────────────────────────── */
  const fetchHeartbeat = useCallback(async () => {
    if (!companyId) return;
    try {
      const res = await fetch(`/api/heartbeats?companyId=${companyId}`);
      if (!res.ok) return;
      const { heartbeats } = await res.json();
      const match = (heartbeats || []).find((h: Heartbeat) => h.agent_id === agentId);
      if (match) {
        setHeartbeat(match);
        setHeartbeatForm({
          isEnabled: match.is_enabled,
          cronExpression: match.cron_expression || "0 8 * * *",
        });
      }
    } catch {
      /* ignore */
    }
  }, [companyId, agentId]);

  useEffect(() => {
    fetchAgent();
  }, [fetchAgent]);

  useEffect(() => {
    fetchAgents();
    fetchBudget();
    fetchHeartbeat();
  }, [fetchAgents, fetchBudget, fetchHeartbeat]);

  /* ── Save profil ──────────────────────────────────────────────────── */
  async function saveProfil() {
    setSaving(true);
    try {
      const res = await fetch(`/api/agents/${agentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profilForm.name,
          role: profilForm.role,
          jobDescription: profilForm.jobDescription,
          departmentId: profilForm.department || null,
          reportsToId: profilForm.reportsToId || null,
          accentColor: profilForm.accentColor,
        }),
      });
      if (!res.ok) throw new Error();
      const { agent: updated } = await res.json();
      setAgent(updated);
      toast("Profil gespeichert", "success");
    } catch {
      toast("Fehler beim Speichern", "error");
    } finally {
      setSaving(false);
    }
  }

  /* ── Save konfiguration ───────────────────────────────────────────── */
  async function saveKonfiguration() {
    setSaving(true);
    try {
      // Convert parameters array back to object
      const paramsObj: Record<string, { type: string; required: boolean }> = {};
      for (const p of configForm.parameters) {
        if (p.name.trim()) {
          paramsObj[p.name.trim()] = { type: p.type, required: p.required };
        }
      }

      const res = await fetch(`/api/agents/${agentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: configForm.systemPrompt,
          type: configForm.type,
          focus: configForm.focus,
          skills: configForm.skills,
          parameters: paramsObj,
        }),
      });
      if (!res.ok) throw new Error();
      const { agent: updated } = await res.json();
      setAgent(updated);
      toast("Konfiguration gespeichert", "success");
    } catch {
      toast("Fehler beim Speichern", "error");
    } finally {
      setSaving(false);
    }
  }

  /* ── Save budget ──────────────────────────────────────────────────── */
  async function saveBudget() {
    if (!companyId) return;
    setSaving(true);
    try {
      if (budgetData) {
        const res = await fetch(`/api/budgets/${budgetData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            monthlyLimitChf: budgetForm.monthlyLimit,
            warningThreshold: budgetForm.warningAt,
          }),
        });
        if (!res.ok) throw new Error();
        const { budget } = await res.json();
        setBudgetData(budget);
      } else {
        const res = await fetch("/api/budgets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId,
            agentId,
            monthlyLimitChf: budgetForm.monthlyLimit,
            warningThreshold: budgetForm.warningAt,
          }),
        });
        if (!res.ok) throw new Error();
        const { budget } = await res.json();
        setBudgetData(budget);
      }
      toast("Budget gespeichert", "success");
    } catch {
      toast("Fehler beim Speichern", "error");
    } finally {
      setSaving(false);
    }
  }

  /* ── Save heartbeat ───────────────────────────────────────────────── */
  async function saveHeartbeat() {
    if (!heartbeat) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/heartbeats/${heartbeat.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isEnabled: heartbeatForm.isEnabled,
          cronExpression: heartbeatForm.cronExpression,
        }),
      });
      if (!res.ok) throw new Error();
      const { heartbeat: updated } = await res.json();
      setHeartbeat(updated);
      toast("Automation gespeichert", "success");
    } catch {
      toast("Fehler beim Speichern", "error");
    } finally {
      setSaving(false);
    }
  }

  /* ── Skills helpers ───────────────────────────────────────────────── */
  function addSkill() {
    const skill = configForm.newSkill.trim();
    if (!skill || configForm.skills.includes(skill)) return;
    setConfigForm((f) => ({ ...f, skills: [...f.skills, skill], newSkill: "" }));
  }

  function removeSkill(skill: string) {
    setConfigForm((f) => ({ ...f, skills: f.skills.filter((s) => s !== skill) }));
  }

  /* ── Parameters helpers ───────────────────────────────────────────── */
  function addParameter() {
    setConfigForm((f) => ({
      ...f,
      parameters: [...f.parameters, { name: "", type: "text", required: false }],
    }));
  }

  function removeParameter(index: number) {
    setConfigForm((f) => ({
      ...f,
      parameters: f.parameters.filter((_, i) => i !== index),
    }));
  }

  function updateParameter(index: number, field: string, value: string | boolean) {
    setConfigForm((f) => ({
      ...f,
      parameters: f.parameters.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    }));
  }

  /* ── Loading / Error ──────────────────────────────────────────────── */

  if (companyLoading || loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link
          href="/dashboard/team"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Zur\u00fcck zum Team
        </Link>
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error || "Agent nicht gefunden"}
        </div>
      </div>
    );
  }

  const st = STATUS_STYLES[agent.status] ?? { bg: "#F3F4F6", text: "#374151", label: "Inaktiv" };
  const accent = agent.accent_color || "#000088";
  const initial = agent.name.charAt(0).toUpperCase();

  /* ── Render ────────────────────────────────────────────────────────── */

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/dashboard/team"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Zur\u00fcck zum Team
      </Link>

      {/* Agent header */}
      <div className="mb-8 flex items-center gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
          style={{ backgroundColor: accent }}
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {agent.name}
            </h1>
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{ backgroundColor: st.bg, color: st.text }}
            >
              {st.label}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">{agent.role}</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-gray-200">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "border-[#000088] text-[#000088]"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        {/* ── Tab 1: Profil ─────────────────────────────────────────── */}
        {activeTab === "profil" && (
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={profilForm.name}
                onChange={(e) => setProfilForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-[#000088] focus:outline-none focus:ring-2 focus:ring-[#000088]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Rolle</label>
              <input
                type="text"
                value={profilForm.role}
                onChange={(e) => setProfilForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-[#000088] focus:outline-none focus:ring-2 focus:ring-[#000088]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Job-Beschreibung</label>
              <textarea
                value={profilForm.jobDescription}
                onChange={(e) => setProfilForm((f) => ({ ...f, jobDescription: e.target.value }))}
                rows={4}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-[#000088] focus:outline-none focus:ring-2 focus:ring-[#000088]/10 resize-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Abteilung</label>
              <input
                type="text"
                value={profilForm.department}
                onChange={(e) => setProfilForm((f) => ({ ...f, department: e.target.value }))}
                placeholder="z.B. Marketing, Engineering..."
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-[#000088] focus:outline-none focus:ring-2 focus:ring-[#000088]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Berichtet an</label>
              <select
                value={profilForm.reportsToId}
                onChange={(e) => setProfilForm((f) => ({ ...f, reportsToId: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-[#000088] focus:outline-none focus:ring-2 focus:ring-[#000088]/10"
              >
                <option value="">Kein Vorgesetzter</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Akzentfarbe</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={profilForm.accentColor}
                  onChange={(e) => setProfilForm((f) => ({ ...f, accentColor: e.target.value }))}
                  className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200 p-1"
                />
                <span className="text-sm text-gray-400">{profilForm.accentColor}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={saveProfil}
                disabled={saving || !profilForm.name.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0000aa] disabled:opacity-50"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Speichern
              </button>
            </div>
          </div>
        )}

        {/* ── Tab 2: Konfiguration ──────────────────────────────────── */}
        {activeTab === "konfiguration" && (
          <div className="space-y-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">System Prompt</label>
              <textarea
                value={configForm.systemPrompt}
                onChange={(e) => setConfigForm((f) => ({ ...f, systemPrompt: e.target.value }))}
                rows={10}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 font-mono text-sm focus:border-[#000088] focus:outline-none focus:ring-2 focus:ring-[#000088]/10 resize-none"
                placeholder="System Prompt f\u00fcr den Agent..."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Model</label>
                <select
                  value={configForm.model}
                  onChange={(e) =>
                    setConfigForm((f) => ({
                      ...f,
                      model: e.target.value,
                      type: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-[#000088] focus:outline-none focus:ring-2 focus:ring-[#000088]/10"
                >
                  {MODEL_OPTIONS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Typ</label>
                <select
                  value={configForm.type}
                  onChange={(e) => setConfigForm((f) => ({ ...f, type: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-[#000088] focus:outline-none focus:ring-2 focus:ring-[#000088]/10"
                >
                  <option value="claude">Claude</option>
                  <option value="gpt">GPT</option>
                  <option value="deepl">DeepL</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Focus</label>
              <input
                type="text"
                value={configForm.focus}
                onChange={(e) => setConfigForm((f) => ({ ...f, focus: e.target.value }))}
                placeholder="Worauf fokussiert sich der Agent gerade?"
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-[#000088] focus:outline-none focus:ring-2 focus:ring-[#000088]/10"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Skills</label>
              <div className="mb-2 flex flex-wrap gap-2">
                {configForm.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-full bg-[#000088]/10 px-3 py-1 text-xs font-medium text-[#000088]"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-[#000088]/20"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={configForm.newSkill}
                  onChange={(e) => setConfigForm((f) => ({ ...f, newSkill: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  placeholder="Neuen Skill hinzuf\u00fcgen..."
                  className="flex-1 rounded-lg border border-gray-200 px-3.5 py-2 text-sm focus:border-[#000088] focus:outline-none focus:ring-2 focus:ring-[#000088]/10"
                />
                <button
                  onClick={addSkill}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Parameters */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Run-Parameter</h3>
              <p className="mb-3 text-xs text-gray-500">
                Definiere Eingabefelder die beim Starten ausgef\u00fcllt werden.
              </p>
              <div className="space-y-2">
                {configForm.parameters.map((param, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={param.name}
                      onChange={(e) => updateParameter(i, "name", e.target.value)}
                      placeholder="Name"
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#000088] focus:outline-none focus:ring-2 focus:ring-[#000088]/10"
                    />
                    <select
                      value={param.type}
                      onChange={(e) => updateParameter(i, "type", e.target.value)}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#000088] focus:outline-none"
                    >
                      <option value="text">Text</option>
                      <option value="number">Zahl</option>
                      <option value="select">Auswahl</option>
                    </select>
                    <label className="flex items-center gap-1.5 text-xs text-gray-600">
                      <input
                        type="checkbox"
                        checked={param.required}
                        onChange={(e) => updateParameter(i, "required", e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-[#000088] focus:ring-[#000088]"
                      />
                      Pflicht
                    </label>
                    <button
                      onClick={() => removeParameter(i)}
                      className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addParameter}
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-800"
              >
                <Plus className="h-3.5 w-3.5" />
                Parameter hinzuf\u00fcgen
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={saveKonfiguration}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0000aa] disabled:opacity-50"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Speichern
              </button>
            </div>
          </div>
        )}

        {/* ── Tab 3: Wissensbasis ───────────────────────────────────── */}
        {activeTab === "wissensbasis" && (
          <div className="space-y-6">
            {/* Upload area */}
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-10 text-center">
              <Upload className="mb-3 h-10 w-10 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">
                Dokumente hier ablegen
              </p>
              <p className="mt-1 text-xs text-gray-500">
                PDF, DOCX, TXT, CSV (max. 10MB)
              </p>
            </div>

            {/* Info banner */}
            <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
              <p className="text-sm text-blue-700">
                Brain Integration kommt bald — Dokumente werden dann automatisch vom Agent genutzt.
              </p>
            </div>

            {/* Documents table (placeholder) */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900">Dokumente</h3>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Name</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Typ</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Gr\u00f6sse</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Status</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Hochgeladen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                        Noch keine Dokumente hochgeladen
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 4: Ged\u00e4chtnis ──────────────────────────────────── */}
        {activeTab === "gedaechtnis" && (
          <div className="space-y-6">
            {/* Info banner */}
            <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
              <p className="text-sm text-blue-700">
                Brain Integration kommt bald — Dein Agent wird sich an Gespr\u00e4che erinnern.
              </p>
            </div>

            {/* Filter bar */}
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-gray-400" />
              <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#000088] focus:outline-none">
                <option value="all">Alle</option>
                <option value="episodic">Episodisch</option>
                <option value="semantic">Semantisch</option>
                <option value="procedural">Prozedural</option>
              </select>
            </div>

            {/* Empty memory timeline */}
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 py-16 text-center">
              <Brain className="mb-3 h-10 w-10 text-gray-300" />
              <p className="text-sm font-medium text-gray-500">Noch keine Erinnerungen</p>
              <p className="mt-1 text-xs text-gray-400">
                Erinnerungen werden hier angezeigt, sobald der Agent aktiv wird.
              </p>
            </div>
          </div>
        )}

        {/* ── Tab 5: Budget & Automation ─────────────────────────────── */}
        {activeTab === "budget" && (
          <div className="space-y-8">
            {/* Budget Section */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900">
                <Wallet className="h-5 w-5" />
                Budget
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Monatliches Limit (CHF)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={10}
                    value={budgetForm.monthlyLimit}
                    onChange={(e) =>
                      setBudgetForm((f) => ({ ...f, monthlyLimit: Number(e.target.value) }))
                    }
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-[#000088] focus:outline-none focus:ring-2 focus:ring-[#000088]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Warnung bei: {budgetForm.warningAt}%
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    step={5}
                    value={budgetForm.warningAt}
                    onChange={(e) =>
                      setBudgetForm((f) => ({ ...f, warningAt: Number(e.target.value) }))
                    }
                    className="w-full accent-[#000088]"
                  />
                </div>

                {budgetData && (
                  <div>
                    <p className="mb-2 text-sm text-gray-600">
                      Aktuell ausgegeben: CHF {budgetData.spent_chf.toFixed(2)} / CHF{" "}
                      {budgetData.monthly_limit_chf.toFixed(2)}
                    </p>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            (budgetData.spent_chf / budgetData.monthly_limit_chf) * 100
                          )}%`,
                          backgroundColor:
                            (budgetData.spent_chf / budgetData.monthly_limit_chf) * 100 >=
                            budgetForm.warningAt
                              ? "#DC2626"
                              : "#000088",
                        }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={saveBudget}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0000aa] disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Speichern
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Automation Section */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900">
                <Zap className="h-5 w-5" />
                Automation
              </h3>

              {!heartbeat ? (
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                  Kein Heartbeat konfiguriert. Erstelle einen Heartbeat in den Einstellungen.
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Heartbeat aktiviert
                    </label>
                    <button
                      onClick={() =>
                        setHeartbeatForm((f) => ({ ...f, isEnabled: !f.isEnabled }))
                      }
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        heartbeatForm.isEnabled ? "bg-[#000088]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          heartbeatForm.isEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Frequency */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Frequenz
                    </label>
                    <select
                      value={heartbeatForm.cronExpression}
                      onChange={(e) =>
                        setHeartbeatForm((f) => ({ ...f, cronExpression: e.target.value }))
                      }
                      className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-[#000088] focus:outline-none focus:ring-2 focus:ring-[#000088]/10"
                    >
                      {CRON_OPTIONS.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Info cards */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <p className="text-[11px] font-medium text-gray-500">N\u00e4chster Run</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {heartbeat.next_run_at
                          ? new Date(heartbeat.next_run_at).toLocaleString("de-CH")
                          : "—"}
                      </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <p className="text-[11px] font-medium text-gray-500">Letzter Run</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {heartbeat.last_run_at
                          ? new Date(heartbeat.last_run_at).toLocaleString("de-CH")
                          : "—"}
                      </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <p className="text-[11px] font-medium text-gray-500">Total Runs</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {heartbeat.total_runs ?? 0}
                      </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <p className="text-[11px] font-medium text-gray-500">Status</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {heartbeatForm.isEnabled ? "Aktiv" : "Pausiert"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={saveHeartbeat}
                      disabled={saving}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0000aa] disabled:opacity-50"
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Speichern
                    </button>
                    <Link
                      href={`/dashboard/meeting-room?agentId=${agentId}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-[#000088]/20 px-5 py-2.5 text-sm font-medium text-[#000088] transition-colors hover:bg-[#000088]/5"
                    >
                      <Play className="h-4 w-4" />
                      Jetzt ausf\u00fchren
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Tab 6: Statistiken ────────────────────────────────────── */}
        {activeTab === "statistiken" && (
          <div className="space-y-6">
            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-gray-400" />
                  <p className="text-xs font-medium text-gray-500">Total Runs</p>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {heartbeat?.total_runs ?? 0}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <p className="text-xs font-medium text-gray-500">Erledigte Tasks</p>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {agent.completed_tasks ?? 0}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-[#000088]" />
                  <p className="text-xs font-medium text-gray-500">Erfolgsrate</p>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {agent.completed_tasks && (agent.completed_tasks + (agent.open_tasks ?? 0)) > 0
                    ? `${Math.round(
                        (agent.completed_tasks /
                          (agent.completed_tasks + (agent.open_tasks ?? 0))) *
                          100
                      )}%`
                    : "—"}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <p className="text-xs font-medium text-gray-500">\u00d8 Kosten/Run</p>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {budgetData && heartbeat && heartbeat.total_runs > 0
                    ? `CHF ${(budgetData.spent_chf / heartbeat.total_runs).toFixed(2)}`
                    : "—"}
                </p>
              </div>
            </div>

            {/* Run History */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900">Run-Verlauf</h3>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Datum</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Status</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Dauer</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Tokens</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Kosten CHF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                        Noch keine Runs — starte den Agent \u00fcber Automation oder Meeting Room.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
