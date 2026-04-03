"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCompany } from "./layout";
import {
  Users,
  ClipboardList,
  Target,
  Activity,
  Plus,
  UserPlus,
  ArrowRight,
} from "lucide-react";

/* ── Types ────────────────────────────────────────────────────────────── */

type Agent = {
  id: string;
  name: string;
  role: string;
  status: string;
};

type Task = {
  id: string;
  title: string;
};

type Goal = {
  id: string;
  title: string;
};

type ActivityEntry = {
  id: string;
  action: string;
  agent_name?: string;
  created_at: string;
};

/* ── Helpers ──────────────────────────────────────────────────────────── */

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function statusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-emerald-500";
    case "standby":
      return "bg-amber-400";
    default:
      return "bg-gray-400";
  }
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Gerade eben";
  if (mins < 60) return `Vor ${mins} Min.`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Vor ${hours} Std.`;
  const days = Math.floor(hours / 24);
  return `Vor ${days} Tag${days > 1 ? "en" : ""}`;
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function DashboardOverview() {
  const { companyId, loading: companyLoading } = useCompany();

  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;

    async function load() {
      setLoading(true);
      try {
        const [aRes, tRes, gRes, actRes] = await Promise.all([
          fetch(`/api/agents?companyId=${companyId}`),
          fetch(`/api/tasks?companyId=${companyId}`),
          fetch(`/api/goals?companyId=${companyId}`),
          fetch(`/api/activity?companyId=${companyId}&limit=5`),
        ]);
        const [aData, tData, gData, actData] = await Promise.all([
          aRes.json(),
          tRes.json(),
          gRes.json(),
          actRes.json(),
        ]);
        setAgents(aData.agents ?? []);
        setTasks(tData.tasks ?? []);
        setGoals(gData.goals ?? []);
        setActivities(actData.activities ?? []);
      } catch {
        /* silent — user sees empty state */
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [companyId]);

  const isLoading = companyLoading || loading;

  /* ── Stat Cards ─────────────────────────────────────────────────── */

  const stats = [
    { label: "Agents", value: agents.length, icon: Users, color: "text-[#000088]" },
    { label: "Aufgaben", value: tasks.length, icon: ClipboardList, color: "text-cyan-600" },
    { label: "Ziele", value: goals.length, icon: Target, color: "text-emerald-600" },
    { label: "Aktivitäten", value: activities.length, icon: Activity, color: "text-amber-600" },
  ];

  /* ── Render ─────────────────────────────────────────────────────── */

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Übersicht
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Dein Team auf einen Blick.
          </p>
        </div>
        <Link
          href="/dashboard/team/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0000aa]"
        >
          <Plus className="h-4 w-4" />
          Agent hinzufügen
        </Link>
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl border border-gray-200 bg-white"
            />
          ))}
        </div>
      )}

      {/* Content */}
      {!isLoading && (
        <>
          {/* Stat Cards */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">
                      {s.label}
                    </p>
                    <Icon className={`h-4 w-4 ${s.color}`} />
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">
                    {s.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {agents.length === 0 && (
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#000088]/10">
                <UserPlus className="h-6 w-6 text-[#000088]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Dein Team ist noch leer
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                Erstelle deinen ersten AI Agent und starte dein digitales Team.
              </p>
              <Link
                href="/dashboard/team/new"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#000088] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0000aa]"
              >
                <Plus className="h-4 w-4" />
                Ersten Agent erstellen
              </Link>
            </div>
          )}

          {/* Team Preview */}
          {agents.length > 0 && (
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Team</h2>
                <Link
                  href="/dashboard/team"
                  className="flex items-center gap-1 text-sm font-medium text-[#000088] hover:underline"
                >
                  Alle anzeigen
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {agents.slice(0, 6).map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4"
                  >
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#000088] text-sm font-semibold text-white">
                        {initials(agent.name)}
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${statusColor(agent.status)}`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {agent.name}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {agent.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          {activities.length > 0 && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">
                  Letzte Aktivität
                </h2>
                <Link
                  href="/dashboard/aktivitaet"
                  className="flex items-center gap-1 text-sm font-medium text-[#000088] hover:underline"
                >
                  Alle anzeigen
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
                {activities.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start gap-3 px-5 py-4"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                      <Activity className="h-3.5 w-3.5 text-gray-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900">{entry.action}</p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        {entry.agent_name && (
                          <span className="font-medium text-gray-500">
                            {entry.agent_name}
                          </span>
                        )}
                        {entry.agent_name && " · "}
                        {entry.created_at ? timeAgo(entry.created_at) : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
