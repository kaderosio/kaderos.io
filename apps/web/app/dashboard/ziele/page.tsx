"use client";

import { useEffect, useState, FormEvent } from "react";
import { useCompany } from "../layout";
import { Plus, X, Target } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

type Agent = { id: string; name: string };

type Goal = {
  id: string;
  title: string;
  description: string | null;
  progress: number;
  status: string;
  deadline: string | null;
  owner_agent_id: string | null;
  agents: { name: string } | null;
};

const STATUS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  "on-track": { bg: "bg-green-100", text: "text-green-700", label: "On Track" },
  "at-risk": { bg: "bg-yellow-100", text: "text-yellow-700", label: "Gefährdet" },
  behind: { bg: "bg-red-100", text: "text-red-700", label: "Im Rückstand" },
  completed: { bg: "bg-blue-100", text: "text-blue-700", label: "Abgeschlossen" },
  active: { bg: "bg-gray-100", text: "text-gray-600", label: "Aktiv" },
};

/* ── Page ──────────────────────────────────────────────────────────── */

export default function ZielePage() {
  const { companyId, loading } = useCompany();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);

  /* Form state */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [agentId, setAgentId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* Fetch */
  useEffect(() => {
    if (loading || !companyId) return;
    setFetching(true);
    Promise.all([
      fetch(`/api/goals?companyId=${companyId}`).then((r) => r.json()),
      fetch(`/api/agents?companyId=${companyId}`).then((r) => r.json()),
    ])
      .then(([goalsRes, agentsRes]) => {
        setGoals(goalsRes.goals ?? []);
        setAgents(agentsRes.agents ?? []);
      })
      .finally(() => setFetching(false));
  }, [companyId, loading]);

  /* Create goal */
  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !companyId) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId,
          title: title.trim(),
          description: description.trim() || undefined,
          ownerAgentId: agentId || undefined,
          deadline: deadline || undefined,
        }),
      });
      if (res.ok) {
        const full = await fetch(`/api/goals?companyId=${companyId}`).then((r) => r.json());
        setGoals(full.goals ?? []);
        setTitle("");
        setDescription("");
        setDeadline("");
        setAgentId("");
        setShowForm(false);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || fetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-gray-400">Ziele laden...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl font-bold text-gray-900">Ziele</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-4 py-2 text-sm font-medium text-white hover:bg-[#000066] transition-colors"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Abbrechen" : "Neues Ziel"}
        </button>
      </div>

      {/* Inline create form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-xl border border-gray-200 bg-white p-4 space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Titel</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ziel beschreiben..."
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Beschreibung</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Verantwortlicher Agent</label>
              <select
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30"
              >
                <option value="">Nicht zugewiesen</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting || !title.trim()}
            className="rounded-lg bg-[#000088] px-5 py-2 text-sm font-medium text-white hover:bg-[#000066] disabled:opacity-50 transition-colors"
          >
            {submitting ? "..." : "Ziel erstellen"}
          </button>
        </form>
      )}

      {/* Goals list */}
      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16">
          <Target className="h-8 w-8 text-gray-300 mb-2" />
          <p className="text-sm text-gray-400">Noch keine Ziele definiert</p>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => {
            const st = STATUS_STYLE[goal.status] ?? STATUS_STYLE.active;
            const pct = Math.min(100, Math.max(0, goal.progress ?? 0));
            return (
              <div
                key={goal.id}
                className="rounded-xl border border-gray-200 bg-white p-4 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="space-y-1 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">{goal.title}</h3>
                    {goal.description && (
                      <p className="text-xs text-gray-500 leading-relaxed">{goal.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${st.bg} ${st.text}`}
                    >
                      {st.label}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">Fortschritt</span>
                    <span className="text-[11px] font-medium text-gray-600">{pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-[#000088] transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400">
                  {goal.agents?.name && (
                    <span>
                      Agent: <span className="font-medium text-gray-600">{goal.agents.name}</span>
                    </span>
                  )}
                  {goal.deadline && (
                    <span>
                      Deadline:{" "}
                      <span className="font-medium text-gray-600">
                        {new Date(goal.deadline).toLocaleDateString("de-CH")}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
