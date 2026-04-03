"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pause,
  Play,
  Trash2,
  Users,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { useCompany } from "../layout";
import { useToast } from "../_components/toast";

/* ── Types ───────────────────────────────────────────────────────────── */

interface Agent {
  id: string;
  name: string;
  role: string;
  type: string;
  status: string;
  accent_color: string | null;
  focus: string | null;
  completed_tasks?: number;
  created_at: string;
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  active:  { bg: "#DCFCE7", text: "#14532D", label: "Aktiv" },
  paused:  { bg: "#FEF9C3", text: "#713F12", label: "Pausiert" },
  standby: { bg: "#F3F4F6", text: "#374151", label: "Standby" },
};

const fallbackStatus = { bg: "#F3F4F6", text: "#374151", label: "Inaktiv" };

function statusStyle(s: string) {
  return STATUS_STYLES[s] ?? fallbackStatus;
}

/* ── Page ────────────────────────────────────────────────────────────── */

export default function TeamPage() {
  const { companyId, loading: companyLoading } = useCompany();
  const { toast } = useToast();

  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  /* Fetch agents */
  useEffect(() => {
    if (!companyId) return;
    setLoading(true);
    fetch(`/api/agents?companyId=${companyId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Fehler beim Laden");
        return r.json();
      })
      .then((d) => setAgents(d.agents ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [companyId]);

  /* Toggle pause / activate */
  async function toggleStatus(agent: Agent) {
    setTogglingId(agent.id);
    const newStatus = agent.status === "active" ? "paused" : "active";
    try {
      const res = await fetch(`/api/agents/${agent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      const { agent: updated } = await res.json();
      setAgents((prev) => prev.map((a) => (a.id === agent.id ? updated : a)));
    } catch {
      toast("Status konnte nicht geaendert werden", "error");
    } finally {
      setTogglingId(null);
    }
  }

  /* Delete agent */
  async function deleteAgent(agent: Agent) {
    if (!confirm(`"${agent.name}" wirklich loeschen?`)) return;
    setDeletingId(agent.id);
    try {
      const res = await fetch(`/api/agents/${agent.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setAgents((prev) => prev.filter((a) => a.id !== agent.id));
      toast("Agent geloescht", "success");
    } catch {
      toast("Agent konnte nicht geloescht werden", "error");
    } finally {
      setDeletingId(null);
    }
  }

  /* ── Render ──────────────────────────────────────────────────────── */

  const isLoading = companyLoading || loading;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Team
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Deine AI-Agenten verwalten
          </p>
        </div>
        <Link
          href="/dashboard/team/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0000aa]"
        >
          <Plus className="h-4 w-4" />
          Neuer Agent
        </Link>
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

      {/* Empty state */}
      {!isLoading && !error && agents.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <Users className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">
            Noch keine Agenten
          </h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            Erstelle deinen ersten AI-Agenten, um loszulegen.
          </p>
          <Link
            href="/dashboard/team/new"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#000088] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0000aa]"
          >
            <Plus className="h-4 w-4" />
            Neuer Agent
          </Link>
        </div>
      )}

      {/* Agent grid */}
      {!isLoading && !error && agents.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => {
            const st = statusStyle(agent.status);
            const accent = agent.accent_color || "#000088";
            const initial = agent.name.charAt(0).toUpperCase();
            const isDeleting = deletingId === agent.id;
            const isToggling = togglingId === agent.id;

            return (
              <div
                key={agent.id}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm"
              >
                {/* Top row: avatar + info */}
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-gray-900">
                        {agent.name}
                      </h3>
                      <span
                        className="inline-block shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium"
                        style={{ backgroundColor: st.bg, color: st.text }}
                      >
                        {st.label}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {agent.role}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
                  <span className="inline-block rounded bg-gray-100 px-1.5 py-0.5 text-[11px] font-medium text-gray-600 capitalize">
                    {agent.type}
                  </span>
                  {typeof agent.completed_tasks === "number" && (
                    <span>{agent.completed_tasks} Aufgaben erledigt</span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">
                  <button
                    onClick={() => toggleStatus(agent)}
                    disabled={isToggling}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                  >
                    {isToggling ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : agent.status === "active" ? (
                      <Pause className="h-3.5 w-3.5" />
                    ) : (
                      <Play className="h-3.5 w-3.5" />
                    )}
                    {agent.status === "active" ? "Pausieren" : "Aktivieren"}
                  </button>
                  <Link
                    href={`/dashboard/meeting-room?agentId=${agent.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#000088]/20 px-3 py-1.5 text-xs font-medium text-[#000088] transition-colors hover:bg-[#000088]/5"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    Starten
                  </Link>
                  <button
                    onClick={() => deleteAgent(agent)}
                    disabled={isDeleting}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                    Loeschen
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
