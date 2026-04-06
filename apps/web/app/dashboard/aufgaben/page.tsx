"use client";

import { useEffect, useState, FormEvent } from "react";
import { useCompany } from "../layout";
import { useToast } from "../_components/toast";
import { Plus, Calendar, X, Save, MessageSquare } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

type Agent = { id: string; name: string; accent_color?: string };

type Goal = { id: string; title: string };

type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: "high" | "medium" | "low";
  status: string;
  agent_id: string | null;
  goal_id: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string | null;
  source?: string | null;
  agents: { name: string; accent_color: string } | null;
};

const COLUMNS = [
  { key: "todo", label: "To Do", color: "" },
  { key: "in-progress", label: "In Arbeit", color: "" },
  { key: "review", label: "Review", color: "" },
  { key: "done", label: "Erledigt", color: "" },
  { key: "blocked", label: "Blockiert", color: "red" },
] as const;

const PRIORITY_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  high: { bg: "bg-red-100", text: "text-red-700", label: "Hoch" },
  medium: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Mittel" },
  low: { bg: "bg-green-100", text: "text-green-700", label: "Niedrig" },
};

/* ── Page ──────────────────────────────────────────────────────────── */

export default function AufgabenPage() {
  const { companyId, loading } = useCompany();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);

  /* Detail panel state */
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editAgentId, setEditAgentId] = useState("");
  const [saving, setSaving] = useState(false);

  /* Form state */
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [agentId, setAgentId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* Open detail panel */
  function openDetail(task: Task) {
    setSelectedTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description ?? "");
    setEditStatus(task.status);
    setEditPriority(task.priority);
    setEditAgentId(task.agent_id ?? "");
  }

  function closeDetail() {
    setSelectedTask(null);
  }

  /* Save task changes */
  async function handleSave() {
    if (!selectedTask) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/tasks/${selectedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle.trim(),
          description: editDescription.trim() || null,
          status: editStatus,
          priority: editPriority,
          agentId: editAgentId || null,
        }),
      });
      if (res.ok) {
        /* Re-fetch to get joined agent data */
        const full = await fetch(`/api/tasks?companyId=${companyId}`).then((r) => r.json());
        const updatedTasks: Task[] = full.tasks ?? [];
        setTasks(updatedTasks);
        const updated = updatedTasks.find((t: Task) => t.id === selectedTask.id);
        if (updated) setSelectedTask(updated);
        toast("Aufgabe gespeichert", "success");
      } else {
        toast("Speichern fehlgeschlagen", "error");
      }
    } catch {
      toast("Speichern fehlgeschlagen", "error");
    } finally {
      setSaving(false);
    }
  }

  /* Fetch */
  useEffect(() => {
    if (loading || !companyId) return;
    setFetching(true);
    Promise.all([
      fetch(`/api/tasks?companyId=${companyId}`).then((r) => r.json()),
      fetch(`/api/agents?companyId=${companyId}`).then((r) => r.json()),
      fetch(`/api/goals?companyId=${companyId}`).then((r) => r.json()),
    ])
      .then(([tasksRes, agentsRes, goalsRes]) => {
        setTasks(tasksRes.tasks ?? []);
        setAgents(agentsRes.agents ?? []);
        setGoals(goalsRes.goals ?? []);
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
      if (!res.ok) {
        setTasks(prev);
        toast("Status konnte nicht aktualisiert werden", "error");
      }
    } catch {
      setTasks(prev);
      toast("Status konnte nicht aktualisiert werden", "error");
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
      } else {
        toast("Aufgabe konnte nicht erstellt werden", "error");
      }
    } catch {
      toast("Aufgabe konnte nicht erstellt werden", "error");
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          const isBlocked = col.key === "blocked";
          return (
            <div key={col.key} className="space-y-3">
              <div className={`flex items-center justify-between ${isBlocked ? "rounded-lg bg-red-50 px-2 py-1" : ""}`}>
                <h2 className={`text-sm font-semibold ${isBlocked ? "text-red-700" : "text-gray-700"}`}>{col.label}</h2>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${isBlocked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-2 min-h-[120px]">
                {colTasks.map((task) => {
                  const pri = PRIORITY_STYLE[task.priority] ?? PRIORITY_STYLE.medium;
                  return (
                    <div
                      key={task.id}
                      onClick={() => openDetail(task)}
                      className={`rounded-xl border p-3 space-y-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${isBlocked ? "border-red-200 bg-red-50/50" : "border-gray-200 bg-white"}`}
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
                        {task.source && (
                          <span className="inline-block rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
                            Auto
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
                            onClick={(e) => {
                              e.stopPropagation();
                              moveTask(task.id, c.key);
                            }}
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

      {/* ── Task Detail Slide-in Panel ────────────────────────────────── */}

      {/* Backdrop */}
      {selectedTask && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={closeDetail}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white shadow-xl border-l border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
          selectedTask ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedTask && (
          <div className="flex h-full flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-base font-semibold text-gray-900">Aufgabe bearbeiten</h2>
              <button
                onClick={closeDetail}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Titel</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Beschreibung</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={4}
                  placeholder="Beschreibung hinzufügen..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088] resize-none"
                />
              </div>

              {/* Status + Priority row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30"
                  >
                    {COLUMNS.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Priorit&auml;t</label>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30"
                  >
                    <option value="high">Hoch</option>
                    <option value="medium">Mittel</option>
                    <option value="low">Niedrig</option>
                  </select>
                </div>
              </div>

              {/* Assigned Agent */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Zugewiesener Agent</label>
                <select
                  value={editAgentId}
                  onChange={(e) => setEditAgentId(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30"
                >
                  <option value="">Nicht zugewiesen</option>
                  {agents.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
                {selectedTask.agents?.name && (
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ backgroundColor: selectedTask.agents.accent_color || "#000088" }}
                    >
                      {selectedTask.agents.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-700">{selectedTask.agents.name}</span>
                  </div>
                )}
              </div>

              {/* Linked Goal */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Ziel</label>
                {selectedTask.goal_id ? (
                  <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2">
                    <p className="text-sm text-emerald-700 font-medium">
                      {goals.find((g) => g.id === selectedTask.goal_id)?.title ?? "Verknüpftes Ziel"}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Kein Ziel verknüpft</p>
                )}
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Erstellt</label>
                  <p className="text-sm text-gray-700">
                    {new Date(selectedTask.created_at).toLocaleString("de-CH", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Aktualisiert</label>
                  <p className="text-sm text-gray-700">
                    {selectedTask.updated_at
                      ? new Date(selectedTask.updated_at).toLocaleString("de-CH", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "–"}
                  </p>
                </div>
              </div>

              {/* Source badge */}
              {selectedTask.source && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Quelle</label>
                  <span className="inline-block rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                    Automatisch erstellt
                  </span>
                </div>
              )}

              {/* Agent Output Section */}
              <div className="border-t border-gray-200 pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                  <label className="text-xs font-medium text-gray-500">Agent-Antwort</label>
                </div>
                <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-5 text-center">
                  <p className="text-sm text-gray-400">Noch keine Agent-Antwort</p>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={closeDetail}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editTitle.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-4 py-2 text-sm font-medium text-white hover:bg-[#000066] disabled:opacity-50 transition-colors"
              >
                <Save className="h-4 w-4" />
                {saving ? "Speichern..." : "Speichern"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
