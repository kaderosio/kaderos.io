"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  GitBranch,
  Loader2,
  Plus,
  Clock,
  Webhook,
  Play,
} from "lucide-react";
import { useCompany } from "../_components/company-context";
import { useToast } from "../_components/toast";

interface Workflow {
  id: string;
  name: string;
  description: string | null;
  trigger_type: string;
  is_enabled: boolean;
  status: string;
  last_run_at: string | null;
  created_at: string;
  step_count?: number;
}

const TRIGGER_STYLES: Record<string, { bg: string; text: string; label: string; icon: typeof Play }> = {
  manual: { bg: "bg-blue-100", text: "text-blue-700", label: "Manuell", icon: Play },
  cron: { bg: "bg-green-100", text: "text-green-700", label: "Cron", icon: Clock },
  webhook: { bg: "bg-purple-100", text: "text-purple-700", label: "Webhook", icon: Webhook },
};

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  draft: { bg: "bg-gray-100", text: "text-gray-600", label: "Entwurf" },
  active: { bg: "bg-green-100", text: "text-green-700", label: "Aktiv" },
  paused: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pausiert" },
};

function relativeTime(dateStr: string | null): string {
  if (!dateStr) return "Noch nicht gestartet";
  const now = Date.now();
  const target = new Date(dateStr).getTime();
  const diff = now - target;

  if (Math.abs(diff) < 60000) return "gerade eben";

  const absDiff = Math.abs(diff);
  const minutes = Math.floor(absDiff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `vor ${days}d`;
  if (hours > 0) return `vor ${hours}h`;
  return `vor ${minutes}m`;
}

export default function WorkflowsPage() {
  const { companyId, loading: companyLoading } = useCompany();
  const { toast } = useToast();
  const router = useRouter();

  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    if (!companyId) return;
    setLoading(true);
    setError(null);

    fetch(`/api/workflows?companyId=${companyId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Fehler beim Laden der Workflows");
        return r.json();
      })
      .then((d) => setWorkflows(d.workflows ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [companyId]);

  async function toggleEnabled(wf: Workflow) {
    setTogglingId(wf.id);
    try {
      const res = await fetch(`/api/workflows/${wf.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isEnabled: !wf.is_enabled }),
      });
      if (!res.ok) throw new Error();
      const { workflow } = await res.json();
      setWorkflows((prev) =>
        prev.map((w) => (w.id === wf.id ? { ...workflow, step_count: wf.step_count } : w))
      );
      toast(
        workflow.is_enabled ? "Workflow aktiviert" : "Workflow pausiert",
        "success"
      );
    } catch {
      toast("Status konnte nicht geändert werden", "error");
    } finally {
      setTogglingId(null);
    }
  }

  const isLoading = companyLoading || loading;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Workflows
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Automatisierte Abläufe erstellen und verwalten
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/workflows/new")}
          className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-4 py-2 text-sm font-medium text-white hover:bg-[#000066] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Neuer Workflow
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && (
        <>
          {/* Empty state */}
          {workflows.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <GitBranch className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Noch keine Workflows
              </h3>
              <p className="mt-1 max-w-sm text-sm text-gray-500">
                Erstelle deinen ersten automatisierten Ablauf.
              </p>
              <button
                onClick={() => router.push("/dashboard/workflows/new")}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#000088] px-4 py-2 text-sm font-medium text-white hover:bg-[#000066] transition-colors"
              >
                <Plus className="h-4 w-4" />
                Neuer Workflow
              </button>
            </div>
          )}

          {/* Workflow cards grid */}
          {workflows.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {workflows.map((wf) => {
                const trigger = TRIGGER_STYLES[wf.trigger_type] ?? TRIGGER_STYLES.manual;
                const status = STATUS_STYLES[wf.status] ?? STATUS_STYLES.draft;
                const TriggerIcon = trigger.icon;
                const isToggling = togglingId === wf.id;

                return (
                  <div
                    key={wf.id}
                    className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                    onClick={() => router.push(`/dashboard/workflows/${wf.id}`)}
                  >
                    {/* Name + Toggle */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                        {wf.name}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleEnabled(wf);
                        }}
                        disabled={isToggling}
                        className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors disabled:opacity-50"
                        style={{
                          backgroundColor: wf.is_enabled ? "#000088" : "#d1d5db",
                        }}
                        role="switch"
                        aria-checked={wf.is_enabled}
                      >
                        {isToggling ? (
                          <Loader2 className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-spin text-white" />
                        ) : (
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                              wf.is_enabled ? "translate-x-[22px]" : "translate-x-[3px]"
                            }`}
                          />
                        )}
                      </button>
                    </div>

                    {/* Description */}
                    {wf.description && (
                      <p className="mt-1.5 text-xs text-gray-500 line-clamp-2">
                        {wf.description}
                      </p>
                    )}

                    {/* Badges */}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${trigger.bg} ${trigger.text}`}
                      >
                        <TriggerIcon className="h-2.5 w-2.5" />
                        {trigger.label}
                      </span>
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${status.bg} ${status.text}`}
                      >
                        {status.label}
                      </span>
                      {typeof wf.step_count === "number" && (
                        <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                          {wf.step_count} {wf.step_count === 1 ? "Schritt" : "Schritte"}
                        </span>
                      )}
                    </div>

                    {/* Last run */}
                    <div className="mt-3 flex items-center gap-1 text-[11px] text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{relativeTime(wf.last_run_at)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
