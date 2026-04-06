"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  Save,
  Play,
  Plus,
  X,
  Clock,
  Webhook,
  Bot,
  CheckCircle2,
  GitFork,
  Timer,
  ChevronDown,
  ArrowDown,
} from "lucide-react";
import { useCompany } from "../../layout";
import { useToast } from "../../_components/toast";

/* ── Types ───────────────────────────────────────────────────────── */

interface WorkflowStep {
  id: string;
  position: number;
  step_type: string;
  agent_id: string | null;
  prompt_template: string | null;
  config: Record<string, any>;
  timeout_minutes: number | null;
}

interface Workflow {
  id: string;
  name: string;
  description: string | null;
  trigger_type: string;
  cron_expression: string | null;
  webhook_secret: string | null;
  is_enabled: boolean;
  status: string;
  last_run_at: string | null;
  created_at: string;
  steps?: WorkflowStep[];
}

interface WorkflowRun {
  id: string;
  status: string;
  trigger: string;
  started_at: string | null;
  completed_at: string | null;
  error: string | null;
}

interface Agent {
  id: string;
  name: string;
  accent_color?: string;
}

/* ── Constants ───────────────────────────────────────────────────── */

const STEP_TYPES = [
  { value: "agent_run", label: "Agent Run", icon: Bot, color: "text-blue-600 bg-blue-100" },
  { value: "human_approval", label: "Genehmigung", icon: CheckCircle2, color: "text-green-600 bg-green-100" },
  { value: "conditional", label: "Bedingung", icon: GitFork, color: "text-purple-600 bg-purple-100" },
  { value: "delay", label: "Verzögerung", icon: Timer, color: "text-orange-600 bg-orange-100" },
];

const RUN_STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-gray-100", text: "text-gray-600", label: "Ausstehend" },
  running: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Läuft" },
  waiting_approval: { bg: "bg-blue-100", text: "text-blue-700", label: "Wartet auf Genehmigung" },
  completed: { bg: "bg-green-100", text: "text-green-700", label: "Erledigt" },
  failed: { bg: "bg-red-100", text: "text-red-700", label: "Fehlgeschlagen" },
};

const CRON_PRESETS = [
  { label: "Täglich 08:00", value: "0 8 * * *" },
  { label: "Täglich 18:00", value: "0 18 * * *" },
  { label: "Stündlich", value: "0 * * * *" },
  { label: "Alle 30 Minuten", value: "*/30 * * * *" },
  { label: "Montag 09:00", value: "0 9 * * 1" },
  { label: "Jeden 1. des Monats", value: "0 9 1 * *" },
];

/* ── Helpers ─────────────────────────────────────────────────────── */

function formatDuration(start: string | null, end: string | null): string {
  if (!start) return "-";
  const s = new Date(start).getTime();
  const e = end ? new Date(end).getTime() : Date.now();
  const diff = Math.max(0, e - s);
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ${sec % 60}s`;
  return `${Math.floor(min / 60)}h ${min % 60}m`;
}

function formatTime(dateStr: string | null): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ── Component ───────────────────────────────────────────────────── */

export default function WorkflowBuilderPage() {
  const params = useParams();
  const workflowId = params.id as string;
  const router = useRouter();
  const { companyId, loading: companyLoading } = useCompany();
  const { toast } = useToast();

  // Workflow state
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [triggerType, setTriggerType] = useState("manual");
  const [cronExpression, setCronExpression] = useState("");

  // Steps state
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);

  // Runs state
  const [runs, setRuns] = useState<WorkflowRun[]>([]);

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [addingStep, setAddingStep] = useState(false);

  /* ── Fetch workflow + agents + runs ────────────────────────────── */

  const fetchWorkflow = useCallback(async () => {
    if (!workflowId) return;
    setLoading(true);
    setError(null);

    try {
      const [wfRes, runsRes] = await Promise.all([
        fetch(`/api/workflows/${workflowId}`),
        fetch(`/api/workflows/${workflowId}/runs`),
      ]);

      if (!wfRes.ok) throw new Error("Workflow konnte nicht geladen werden");

      const wfData = await wfRes.json();
      const wf = wfData.workflow;

      setWorkflow(wf);
      setName(wf.name);
      setDescription(wf.description ?? "");
      setTriggerType(wf.trigger_type);
      setCronExpression(wf.cron_expression ?? "");
      setSteps((wf.steps ?? []).sort((a: WorkflowStep, b: WorkflowStep) => a.position - b.position));

      if (runsRes.ok) {
        const runsData = await runsRes.json();
        setRuns(runsData.runs ?? []);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [workflowId]);

  useEffect(() => {
    fetchWorkflow();
  }, [fetchWorkflow]);

  useEffect(() => {
    if (!companyId) return;
    fetch(`/api/agents?companyId=${companyId}`)
      .then((r) => r.json())
      .then((d) => setAgents(d.agents ?? []))
      .catch(() => {});
  }, [companyId]);

  /* ── Save workflow ─────────────────────────────────────────────── */

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/workflows/${workflowId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          triggerType,
          cronExpression: triggerType === "cron" ? cronExpression.trim() : null,
        }),
      });
      if (!res.ok) throw new Error();
      const { workflow: updated } = await res.json();
      setWorkflow(updated);
      toast("Workflow gespeichert", "success");
    } catch {
      toast("Speichern fehlgeschlagen", "error");
    } finally {
      setSaving(false);
    }
  }

  /* ── Run workflow ──────────────────────────────────────────────── */

  async function handleRun() {
    setRunning(true);
    try {
      const res = await fetch(`/api/workflows/${workflowId}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Unbekannter Fehler" }));
        throw new Error(data.error || "Workflow konnte nicht gestartet werden");
      }
      toast("Workflow gestartet", "success");
      // Refresh runs
      const runsRes = await fetch(`/api/workflows/${workflowId}/runs`);
      if (runsRes.ok) {
        const runsData = await runsRes.json();
        setRuns(runsData.runs ?? []);
      }
    } catch (e: any) {
      toast(e.message || "Fehler beim Starten", "error");
    } finally {
      setRunning(false);
    }
  }

  /* ── Add step ──────────────────────────────────────────────────── */

  async function handleAddStep(stepType: string) {
    setAddingStep(true);
    try {
      const res = await fetch(`/api/workflows/${workflowId}/steps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stepType,
          position: steps.length,
          config: {},
        }),
      });
      if (!res.ok) throw new Error();
      const { step } = await res.json();
      setSteps((prev) => [...prev, step]);
      toast("Schritt hinzugefügt", "success");
    } catch {
      toast("Schritt konnte nicht hinzugefügt werden", "error");
    } finally {
      setAddingStep(false);
    }
  }

  /* ── Update step ───────────────────────────────────────────────── */

  async function handleUpdateStep(stepId: string, updates: Partial<WorkflowStep>) {
    try {
      const res = await fetch(`/api/workflows/${workflowId}/steps/${stepId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error();
      const { step: updated } = await res.json();
      setSteps((prev) => prev.map((s) => (s.id === stepId ? updated : s)));
    } catch {
      toast("Schritt konnte nicht aktualisiert werden", "error");
    }
  }

  /* ── Delete step ───────────────────────────────────────────────── */

  async function handleDeleteStep(stepId: string) {
    try {
      const res = await fetch(`/api/workflows/${workflowId}/steps/${stepId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setSteps((prev) => prev.filter((s) => s.id !== stepId));
      toast("Schritt entfernt", "success");
    } catch {
      toast("Schritt konnte nicht entfernt werden", "error");
    }
  }

  /* ── Render ────────────────────────────────────────────────────── */

  if (companyLoading || loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!workflow) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back */}
      <button
        onClick={() => router.push("/dashboard/workflows")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zu Workflows
      </button>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* TOP SECTION: Workflow Config                                    */}
      {/* ═══════════════════════════════════════════════════════════════ */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-6">
        <div className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Workflow Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Beschreibung
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Was macht dieser Workflow?"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088] resize-none"
            />
          </div>

          {/* Trigger Type */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
              Trigger
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              {[
                { value: "manual", label: "Manuell", icon: Play },
                { value: "cron", label: "Cron", icon: Clock },
                { value: "webhook", label: "Webhook", icon: Webhook },
              ].map((opt) => {
                const Icon = opt.icon;
                return (
                  <label
                    key={opt.value}
                    className={`flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border p-3 transition-colors ${
                      triggerType === opt.value
                        ? "border-[#000088] bg-[#000088]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="triggerType"
                      value={opt.value}
                      checked={triggerType === opt.value}
                      onChange={(e) => setTriggerType(e.target.value)}
                      className="accent-[#000088]"
                    />
                    <Icon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{opt.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Cron config */}
            {triggerType === "cron" && (
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  value={cronExpression}
                  onChange={(e) => setCronExpression(e.target.value)}
                  placeholder="z.B. 0 8 * * *"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088]"
                />
                <div className="flex flex-wrap gap-1.5">
                  {CRON_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setCronExpression(preset.value)}
                      className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                        cronExpression === preset.value
                          ? "border-[#000088] bg-[#000088]/10 text-[#000088]"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Webhook URL */}
            {triggerType === "webhook" && workflow.webhook_secret && (
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Webhook URL
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${typeof window !== "undefined" ? window.location.origin : ""}/api/workflows/${workflowId}/webhook?secret=${workflow.webhook_secret}`}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-mono text-gray-600"
                  onClick={(e) => {
                    (e.target as HTMLInputElement).select();
                    navigator.clipboard?.writeText((e.target as HTMLInputElement).value);
                    toast("URL kopiert", "success");
                  }}
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  Klicken zum Kopieren
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-1 border-t border-gray-100">
            <button
              onClick={handleRun}
              disabled={running || steps.length === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 disabled:opacity-50 transition-colors"
            >
              {running ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Workflow starten
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !name.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-4 py-2 text-sm font-medium text-white hover:bg-[#000066] disabled:opacity-50 transition-colors"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Speichern
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* STEPS SECTION                                                   */}
      {/* ═══════════════════════════════════════════════════════════════ */}

      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Schritte
        </h2>

        {steps.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-12 text-center mb-4">
            <p className="text-sm text-gray-500">
              Noch keine Schritte. Füge den ersten Schritt hinzu.
            </p>
          </div>
        )}

        {/* Step list with connectors */}
        <div className="space-y-0">
          {steps.map((step, idx) => {
            const typeInfo = STEP_TYPES.find((t) => t.value === step.step_type) ?? STEP_TYPES[0];
            const StepIcon = typeInfo.icon;

            return (
              <div key={step.id}>
                {/* Step card */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 relative">
                  {/* Step number + delete */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${typeInfo.color}`}
                      >
                        {idx + 1}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        Schritt {idx + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteStep(step.id)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                      title="Schritt entfernen"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Step type selector */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Typ
                    </label>
                    <div className="relative">
                      <select
                        value={step.step_type}
                        onChange={(e) =>
                          handleUpdateStep(step.id, { step_type: e.target.value } as any)
                        }
                        className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30"
                      >
                        {STEP_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Type-specific config */}
                  {step.step_type === "agent_run" && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Agent
                        </label>
                        <select
                          value={step.agent_id ?? ""}
                          onChange={(e) =>
                            handleUpdateStep(step.id, { agent_id: e.target.value || null } as any)
                          }
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30"
                        >
                          <option value="">Agent wählen...</option>
                          {agents.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Prompt Template
                        </label>
                        <textarea
                          value={step.prompt_template ?? ""}
                          onChange={(e) =>
                            handleUpdateStep(step.id, { prompt_template: e.target.value } as any)
                          }
                          rows={3}
                          placeholder="Beschreibe die Aufgabe für den Agent..."
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#000088]/30 resize-none font-mono"
                        />
                        <p className="mt-1 text-[11px] text-gray-400">
                          Nutze {"{input}"} und {"{previous_output}"} als Variablen
                        </p>
                      </div>
                    </div>
                  )}

                  {step.step_type === "human_approval" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Worauf soll gewartet werden?
                      </label>
                      <textarea
                        value={step.config?.approval_description ?? ""}
                        onChange={(e) =>
                          handleUpdateStep(step.id, {
                            config: { ...step.config, approval_description: e.target.value },
                          } as any)
                        }
                        rows={2}
                        placeholder="z.B. Budget-Freigabe durch CEO"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#000088]/30 resize-none"
                      />
                    </div>
                  )}

                  {step.step_type === "conditional" && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Bedingung
                        </label>
                        <input
                          type="text"
                          value={step.config?.condition ?? ""}
                          onChange={(e) =>
                            handleUpdateStep(step.id, {
                              config: { ...step.config, condition: e.target.value },
                            } as any)
                          }
                          placeholder="Wenn Ausgabe enthält: ..."
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30"
                        />
                      </div>
                      <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={step.config?.skip_on_false ?? false}
                          onChange={(e) =>
                            handleUpdateStep(step.id, {
                              config: { ...step.config, skip_on_false: e.target.checked },
                            } as any)
                          }
                          className="accent-[#000088]"
                        />
                        Sonst überspringen
                      </label>
                    </div>
                  )}

                  {step.step_type === "delay" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Verzögerung (Minuten)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={step.timeout_minutes ?? ""}
                        onChange={(e) =>
                          handleUpdateStep(step.id, {
                            timeout_minutes: parseInt(e.target.value) || null,
                          } as any)
                        }
                        placeholder="z.B. 30"
                        className="w-32 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30"
                      />
                    </div>
                  )}
                </div>

                {/* Connector arrow between steps */}
                {idx < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="flex flex-col items-center">
                      <div className="h-4 w-px bg-gray-300" />
                      <ArrowDown className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add step connector */}
        {steps.length > 0 && (
          <div className="flex justify-center py-2">
            <div className="flex flex-col items-center">
              <div className="h-4 w-px bg-gray-300" />
              <ArrowDown className="h-4 w-4 text-gray-300" />
            </div>
          </div>
        )}

        {/* Add step button */}
        <div className="flex justify-center">
          <div className="relative">
            <button
              onClick={() => {
                const menu = document.getElementById("step-type-menu");
                menu?.classList.toggle("hidden");
              }}
              disabled={addingStep}
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 hover:border-[#000088] hover:text-[#000088] transition-colors disabled:opacity-50"
            >
              {addingStep ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Schritt hinzufügen
            </button>

            {/* Step type dropdown */}
            <div
              id="step-type-menu"
              className="hidden absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white py-1 shadow-lg z-10"
            >
              {STEP_TYPES.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.value}
                    onClick={() => {
                      document.getElementById("step-type-menu")?.classList.add("hidden");
                      handleAddStep(t.value);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full ${t.color}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* RUN HISTORY                                                     */}
      {/* ═══════════════════════════════════════════════════════════════ */}

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Ausführungen
        </h2>

        {runs.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-gray-400">Noch keine Ausführungen</p>
          </div>
        )}

        {runs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  <th className="pb-2 pr-4">Gestartet</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2 pr-4">Dauer</th>
                  <th className="pb-2">Trigger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {runs.map((run) => {
                  const st = RUN_STATUS_STYLES[run.status] ?? RUN_STATUS_STYLES.pending;
                  return (
                    <tr key={run.id} className="text-gray-700">
                      <td className="py-2.5 pr-4 text-xs">
                        {formatTime(run.started_at)}
                      </td>
                      <td className="py-2.5 pr-4">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${st.bg} ${st.text}`}
                        >
                          {st.label}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 text-xs font-mono">
                        {formatDuration(run.started_at, run.completed_at)}
                      </td>
                      <td className="py-2.5 text-xs capitalize">
                        {run.trigger === "manual" ? "Manuell" : run.trigger === "cron" ? "Cron" : run.trigger === "webhook" ? "Webhook" : run.trigger}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
