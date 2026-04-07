"use client";

import { useEffect, useState } from "react";
import { Zap, Loader2, BarChart3, TrendingUp, Play, X } from "lucide-react";
import { useCompany } from "../_components/company-context";
import { useToast } from "../_components/toast";

interface Heartbeat {
  id: string;
  agent_id: string;
  cron_expression: string;
  is_enabled: boolean;
  status: string;
  run_count: number;
  next_run_at: string | null;
  last_run_at: string | null;
  created_at: string;
  agents: { name: string; accent_color: string | null; role: string } | null;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  scheduled: { bg: "bg-blue-100", text: "text-blue-700", label: "Geplant" },
  running: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Läuft" },
  completed: { bg: "bg-green-100", text: "text-green-700", label: "Erledigt" },
  failed: { bg: "bg-red-100", text: "text-red-700", label: "Fehlgeschlagen" },
};

const fallbackStatus = { bg: "bg-gray-100", text: "text-gray-600", label: "Unbekannt" };

function cronToHuman(cron: string): string {
  const parts = (cron || "").trim().split(/\s+/);
  if (parts.length < 5) return cron;

  const minute = parts[0];
  const hour = parts[1];

  if (hour === "*" && minute === "*") return "Jede Minute";
  if (hour === "*") return `Stündlich um :${minute.padStart(2, "0")}`;
  if (hour !== "*" && minute !== "*") {
    return `Taeglich ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  }
  return cron;
}

function relativeTime(dateStr: string | null): string {
  if (!dateStr) return "-";
  const now = Date.now();
  const target = new Date(dateStr).getTime();
  const diff = target - now;

  if (Math.abs(diff) < 60000) return "jetzt";

  const absDiff = Math.abs(diff);
  const minutes = Math.floor(absDiff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const prefix = diff > 0 ? "in " : "vor ";

  if (days > 0) return `${prefix}${days}d`;
  if (hours > 0) return `${prefix}${hours}h`;
  return `${prefix}${minutes}m`;
}

export default function AutomationPage() {
  const { companyId, loading: companyLoading } = useCompany();
  const { toast } = useToast();

  const [heartbeats, setHeartbeats] = useState<Heartbeat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [runningId, setRunningId] = useState<string | null>(null);
  const [confirmRunHb, setConfirmRunHb] = useState<Heartbeat | null>(null);

  useEffect(() => {
    if (!companyId) return;
    setLoading(true);
    setError(null);

    fetch(`/api/heartbeats?companyId=${companyId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Fehler beim Laden der Automationen");
        return r.json();
      })
      .then((d) => setHeartbeats(d.heartbeats ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [companyId]);

  async function toggleEnabled(hb: Heartbeat) {
    setTogglingId(hb.id);
    try {
      const res = await fetch(`/api/heartbeats/${hb.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isEnabled: !hb.is_enabled }),
      });
      if (!res.ok) throw new Error();
      const { heartbeat } = await res.json();
      setHeartbeats((prev) =>
        prev.map((h) => (h.id === hb.id ? heartbeat : h))
      );
      toast(
        heartbeat.is_enabled ? "Automation aktiviert" : "Automation pausiert",
        "success"
      );
    } catch {
      toast("Status konnte nicht geändert werden", "error");
    } finally {
      setTogglingId(null);
    }
  }

  async function runAgent(hb: Heartbeat) {
    setConfirmRunHb(null);
    setRunningId(hb.agent_id);
    try {
      const res = await fetch(`/api/agents/${hb.agent_id}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Führe deine nächste offene Aufgabe aus." }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Unbekannter Fehler" }));
        throw new Error(data.error || "Fehler beim Ausführen");
      }
      toast("Agent hat Task erledigt", "success");
      // Refresh heartbeat list
      const refresh = await fetch(`/api/heartbeats?companyId=${companyId}`);
      if (refresh.ok) {
        const d = await refresh.json();
        setHeartbeats(d.heartbeats ?? []);
      }
    } catch (e: any) {
      toast(e.message || "Fehler beim Ausführen", "error");
    } finally {
      setRunningId(null);
    }
  }

  const isLoading = companyLoading || loading;

  const totalRuns = heartbeats.reduce((sum, h) => sum + (h.run_count ?? 0), 0);
  const completedCount = heartbeats.filter((h) => h.status === "completed").length;
  const successRate =
    heartbeats.length > 0
      ? Math.round((completedCount / heartbeats.length) * 100)
      : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Automation
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Heartbeats und automatische Agent-Runs verwalten
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}

      {error && !isLoading && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <>
          {heartbeats.length > 0 && (
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                      Total Runs
                    </p>
                    <p className="text-xl font-bold text-gray-900">{totalRuns}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                      Erfolgsrate
                    </p>
                    <p className="text-xl font-bold text-gray-900">{successRate}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {heartbeats.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <Zap className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Noch keine Automationen konfiguriert
              </h3>
              <p className="mt-1 max-w-sm text-sm text-gray-500">
                Aktiviere Heartbeats bei deinen Agents, um automatische Runs zu starten.
              </p>
            </div>
          )}

          {heartbeats.length > 0 && (
            <div className="space-y-3">
              {heartbeats.map((hb) => {
                const agentName = hb.agents?.name ?? "Unbekannt";
                const accent = hb.agents?.accent_color || "#000088";
                const initial = agentName.charAt(0).toUpperCase();
                const st = STATUS_STYLES[hb.status] ?? fallbackStatus;
                const isToggling = togglingId === hb.id;

                return (
                  <div
                    key={hb.id}
                    className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3 sm:w-48 sm:shrink-0">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                          style={{ backgroundColor: accent }}
                        >
                          {initial}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {agentName}
                          </p>
                          {hb.agents?.role && (
                            <p className="truncate text-xs text-gray-400">
                              {hb.agents.role}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
                        <div>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                            Frequenz
                          </span>
                          <p className="font-medium text-gray-700">
                            {cronToHuman(hb.cron_expression)}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                            Naechster Run
                          </span>
                          <p className="font-medium text-gray-700">
                            {relativeTime(hb.next_run_at)}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                            Letzter Run
                          </span>
                          <p className="font-medium text-gray-700">
                            {relativeTime(hb.last_run_at)}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                            Runs
                          </span>
                          <p className="font-medium text-gray-700">
                            {hb.run_count ?? 0}
                          </p>
                        </div>
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${st.bg} ${st.text}`}
                        >
                          {st.label}
                        </span>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <button
                          onClick={() => setConfirmRunHb(hb)}
                          disabled={runningId === hb.agent_id}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                          title="Jetzt ausführen"
                        >
                          {runningId === hb.agent_id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Play className="h-3.5 w-3.5" />
                          )}
                          <span className="hidden sm:inline">Jetzt ausführen</span>
                        </button>
                        <button
                          onClick={() => toggleEnabled(hb)}
                          disabled={isToggling}
                          className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors disabled:opacity-50"
                          style={{
                            backgroundColor: hb.is_enabled ? "#000088" : "#d1d5db",
                          }}
                          role="switch"
                          aria-checked={hb.is_enabled}
                        >
                          {isToggling ? (
                            <Loader2 className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-spin text-white" />
                          ) : (
                            <span
                              className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                                hb.is_enabled ? "translate-x-[22px]" : "translate-x-[3px]"
                              }`}
                            />
                          )}
                        </button>
                        <span className="text-xs font-medium text-gray-500">
                          {hb.is_enabled ? "Aktiv" : "Pausiert"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Confirm Run Modal */}
      {confirmRunHb && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                Agent manuell ausführen?
              </h3>
              <button
                onClick={() => setConfirmRunHb(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">{confirmRunHb.agents?.name ?? "Agent"}</span> wird
              sofort mit der nächsten offenen Aufgabe gestartet.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setConfirmRunHb(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Abbrechen
              </button>
              <button
                onClick={() => runAgent(confirmRunHb)}
                className="rounded-lg bg-[#000088] px-4 py-2 text-sm font-medium text-white hover:bg-[#0000aa]"
              >
                Ausführen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
