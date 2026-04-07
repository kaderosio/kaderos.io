"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Brain,
  AlertTriangle,
  Network,
  Clock,
  Loader2,
  Info,
  Sparkles,
  Filter,
} from "lucide-react";
import { useCompany } from "../_components/company-context";
import { useToast } from "../_components/toast";

/* ── Types ────────────────────────────────────────────────────────────── */

interface Memory {
  id: string;
  agent_id: string;
  agent_name?: string;
  agent_color?: string;
  content: string;
  type: "episodic" | "semantic" | "procedural";
  relevance?: number;
  created_at: string;
}

interface Agent {
  id: string;
  name: string;
  accent_color: string | null;
}

/* ── Constants ────────────────────────────────────────────────────────── */

const TABS = [
  { key: "erinnerungen", label: "Erinnerungen", icon: Clock },
  { key: "entitaeten", label: "Entitäten", icon: Network },
  { key: "alerts", label: "Alerts", icon: AlertTriangle },
] as const;

const TYPE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  episodic: { bg: "bg-blue-100", text: "text-blue-700", label: "Episodisch" },
  semantic: { bg: "bg-purple-100", text: "text-purple-700", label: "Semantisch" },
  procedural: { bg: "bg-orange-100", text: "text-orange-700", label: "Prozedural" },
};

const TYPE_FILTER_OPTIONS = [
  { value: "", label: "Alle Typen" },
  { value: "episodic", label: "Episodisch" },
  { value: "semantic", label: "Semantisch" },
  { value: "procedural", label: "Prozedural" },
];

/* ── Helpers ──────────────────────────────────────────────────────────── */

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "gerade eben";
  if (minutes < 60) return `vor ${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `vor ${hours}h`;
  const days = Math.floor(hours / 24);
  return `vor ${days}d`;
}

/* ── Component ────────────────────────────────────────────────────────── */

export default function GedaechtnisPage() {
  const { companyId, loading: companyLoading } = useCompany();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<string>("erinnerungen");
  const [memories, setMemories] = useState<Memory[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [agentFilter, setAgentFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Fetch agents list
  useEffect(() => {
    if (!companyId) return;
    fetch(`/api/agents?companyId=${companyId}`)
      .then((r) => (r.ok ? r.json() : { agents: [] }))
      .then((d) => setAgents(d.agents ?? []))
      .catch(() => {});
  }, [companyId]);

  // Fetch memories
  const fetchMemories = useCallback(async () => {
    if (!companyId) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ companyId });
      if (agentFilter) params.set("agentId", agentFilter);
      if (typeFilter) params.set("type", typeFilter);

      const res = await fetch(`/api/memories?${params}`);
      if (!res.ok) throw new Error("Fehler beim Laden der Erinnerungen");
      const data = await res.json();
      setMemories(data.memories ?? []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [companyId, agentFilter, typeFilter]);

  useEffect(() => {
    if (activeTab === "erinnerungen") {
      fetchMemories();
    } else {
      setLoading(false);
    }
  }, [activeTab, fetchMemories]);

  const isLoading = companyLoading || loading;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Gedächtnis
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Erinnerungen, Entitäten und Vorhersagen deiner AI-Agents
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab 1: Erinnerungen ──────────────────────────────────────────── */}
      {activeTab === "erinnerungen" && (
        <>
          {/* Filter Bar */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={agentFilter}
                onChange={(e) => setAgentFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#000088] focus:outline-none focus:ring-1 focus:ring-[#000088]"
              >
                <option value="">Alle Agents</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#000088] focus:outline-none focus:ring-1 focus:ring-[#000088]"
            >
              {TYPE_FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
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

          {/* Empty State */}
          {!isLoading && !error && memories.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Noch keine Erinnerungen
              </h3>
              <p className="mt-1 max-w-sm text-sm text-gray-500">
                Sobald der Brain verbunden ist, lernen deine Agents aus jedem
                Gespräch.
              </p>
            </div>
          )}

          {/* Memory Timeline */}
          {!isLoading && !error && memories.length > 0 && (
            <div className="space-y-3">
              {memories.map((memory) => {
                const agent = agents.find((a) => a.id === memory.agent_id);
                const agentName =
                  memory.agent_name || agent?.name || "Unbekannt";
                const accent =
                  memory.agent_color || agent?.accent_color || "#000088";
                const initial = agentName.charAt(0).toUpperCase();
                const typeSt =
                  TYPE_STYLES[memory.type] ?? TYPE_STYLES.episodic;

                return (
                  <div
                    key={memory.id}
                    className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                        style={{ backgroundColor: accent }}
                      >
                        {initial}
                      </div>
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {agentName}
                          </span>
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeSt.bg} ${typeSt.text}`}
                          >
                            {typeSt.label}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {relativeTime(memory.created_at)}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-700">
                          {memory.content}
                        </p>
                        {memory.relevance != null && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-gray-400">
                                Relevanz
                              </span>
                              <span className="text-[11px] font-medium text-gray-600">
                                {Math.round(memory.relevance * 100)}%
                              </span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-gray-100">
                              <div
                                className="h-1.5 rounded-full bg-purple-500 transition-all"
                                style={{
                                  width: `${Math.min(100, Math.max(0, memory.relevance * 100))}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ── Tab 2: Entitäten ─────────────────────────────────────────────── */}
      {activeTab === "entitaeten" && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
            <Network className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Entitäten-Graph
          </h3>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Verfügbar mit Brain Integration
          </p>
          <p className="mt-3 max-w-md text-sm text-gray-400">
            Personen, Orte, Konzepte und ihre Verbindungen — automatisch
            erkannt.
          </p>
        </div>
      )}

      {/* ── Tab 3: Alerts ────────────────────────────────────────────────── */}
      {activeTab === "alerts" && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <AlertTriangle className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Proaktive Vorhersagen
          </h3>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Verfügbar mit Brain Integration
          </p>
          <p className="mt-3 max-w-md text-sm text-gray-400">
            Dein AI-Team erkennt Muster und warnt dich bevor es Probleme gibt.
          </p>
        </div>
      )}

      {/* ── Brain CTA Banner ─────────────────────────────────────────────── */}
      <div className="mt-10 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-600">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900">
              Agent Brain aktivieren
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              7-Layer Memory System — Episodisch, Semantisch, Prozedural,
              Emotional, Kontextuell, Strategisch und Kreativ. Deine Agents
              lernen, erinnern sich und werden mit jeder Interaktion besser.
            </p>
          </div>
          <button className="shrink-0 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-700">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Aktivieren
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
