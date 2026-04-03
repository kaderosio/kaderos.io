"use client";

import { useEffect, useState, FormEvent } from "react";
import { useCompany } from "../layout";
import { Plus, Calendar, X } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

type Agent = { id: string; name: string; accent_color?: string };

type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: "high" | "medium" | "low";
  status: string;
  agent_id: string | null;
  due_date: string | null;
  created_at: string;
  agents: { name: string; accent_color: string } | null;
};

const COLUMNS = [
  { key: "todo", label: "To Do" },
  { key: "in_progress", label: "In Arbeit" },
  { key: "review", label: "Review" },
  { key: "done", label: "Erledigt" },
] as const;

const PRIORITY_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  high: { bg: "bg-red-100", text: "text-red-700", label: "Hoch" },
  medium: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Mittel" },
  low: { bg: "bg-green-100", text: "text-green-700", label: "Niedrig" },
};

/* ── Page ──────────────────────────────────────────────────────────── */

export default function AufgabenPage() {
  const { companyId, loading } = useCompany();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);

  /* Form state */
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [agentId, setAgentId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* Fetch */
  useEffect(() => {
    if (loading || !companyId) return;
    setFetching(true);
    Promise.all([
      fetch(`/api/tasks?companyId=${companyId}`).then((r) => r.json()),
      fetch(`/api/agents?companyId=${companyId}`).then((r) => r.json()),
    ])
      .then(([tasksRes, agentsRes]) => {
        setTasks(tasksRes.tasks ?? []);
        setAgents(agentsRes.agents ?? []);
      })
      .finally(() => setFetching(false));
  }, [companyId, loading]);

  /* Move task */
  async function moveTask(taskId: string, newStatus: string) {
    const prev = tasks;
    setTasks((t) =>
      t.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) setTasks(prev);
    } catch {
      setTasks(prev);
    }
  }

  /* Create task */
  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !companyId) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId,
          title: title.trim(),
          priority,
          agentId: agentId || undefined,
        }),
      });
      if (res.ok) {
        const { task } = await res.json();
        /* Re-fetch to get joined agent data */
        const full = await fetch(`/api/tasks?companyId=${companyId}`).then((r) => r.json());
        setTasks(full.tasks ?? []);
        setTitle("");
        setPriority("medium");
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
        <p className="text-sm text-gray-400">Aufgaben laden...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl font-bold text-gray-900">Aufgaben</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-4 py-2 text-sm font-medium text-white hover:bg-[#000066] transition-colors"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Abbrechen" : "Neue Aufgabe"}
        </button>
      </div>

      {/* Inline create form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col sm:flex-row gap-3 items-end"
        >
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-gray-500 mb-1">Titel</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Aufgabe beschreiben..."
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088]"
            />
          </div>
          <div className="w-full sm:w-36">
            <label className="block text-xs font-medium text-gray-500 mb-1">Priorit&auml;t</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30"
            >
              <option value="high">Hoch</option>
              <option value="medium">Mittel</option>
              <option value="low">Niedrig</option>
            </select>
          </div>
          <div className="w-full sm:w-44">
            <label className="block text-xs font-medium text-gray-500 mb-1">Agent</label>
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
          <button
            type="submit"
            disabled={submitting || !title.trim()}
            className="rounded-lg bg-[#000088] px-5 py-2 text-sm font-medium text-white hover:bg-[#000066] disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            {submitting ? "..." : "Erstellen"}
          </button>
        </form>
      )}

      {/* Kanban board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700">{col.label}</h2>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-2 min-h-[120px]">
                {colTasks.map((task) => {
                  const pri = PRIORITY_STYLE[task.priority] ?? PRIORITY_STYLE.medium;
                  return (
                    <div
                      key={task.id}
                      className="rounded-xl border border-gray-200 bg-white p-3 space-y-2 shadow-sm"
                    >
                      <p className="text-sm font-medium text-gray-900 leading-snug">
                        {task.title}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${pri.bg} ${pri.text}`}
                        >
                          {pri.label}
                        </span>
                        {task.agents?.name && (
                          <span className="inline-block rounded-full bg-[#000088]/10 px-2 py-0.5 text-[10px] font-medium text-[#000088]">
                            {task.agents.name}
                          </span>
                        )}
                        {task.due_date && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-gray-400">
                            <Calendar className="h-2.5 w-2.5" />
                            {new Date(task.due_date).toLocaleDateString("de-CH")}
                          </span>
                        )}
                      </div>

                      {/* Move buttons */}
                      <div className="flex gap-1 flex-wrap pt-1">
                        {COLUMNS.filter((c) => c.key !== task.status).map((c) => (
                          <button
                            key={c.key}
                            onClick={() => moveTask(task.id, c.key)}
                            className="rounded-md border border-gray-200 px-2 py-0.5 text-[10px] text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {colTasks.length === 0 && (
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-200 py-8">
                    <p className="text-xs text-gray-400">Keine Aufgaben</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
