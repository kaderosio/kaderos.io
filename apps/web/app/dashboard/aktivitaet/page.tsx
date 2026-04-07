"use client";

import { useEffect, useState, useCallback } from "react";
import { useCompany } from "../_components/company-context";
import { Activity, RefreshCw } from "lucide-react";

/* -- Types ---------------------------------------------------------------- */

type ActivityEntry = {
  id: string;
  action: string;
  actor_type: string;
  entity_type: string;
  details: Record<string, unknown> | null;
  created_at: string;
};

const ENTITY_COLORS: Record<string, { bg: string; text: string }> = {
  task: { bg: "bg-blue-100", text: "text-blue-700" },
  goal: { bg: "bg-purple-100", text: "text-purple-700" },
  agent: { bg: "bg-green-100", text: "text-green-700" },
  connector: { bg: "bg-orange-100", text: "text-orange-700" },
  budget: { bg: "bg-yellow-100", text: "text-yellow-700" },
  company: { bg: "bg-gray-100", text: "text-gray-600" },
};

const DOT_COLORS: Record<string, string> = {
  task: "bg-blue-400",
  goal: "bg-purple-400",
  agent: "bg-green-400",
  connector: "bg-orange-400",
  budget: "bg-yellow-400",
  company: "bg-gray-400",
};

function formatAction(action: string): string {
  return action
    .replace(/_/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
}

/** Format details object as human-readable key-value pairs */
function formatDetails(details: Record<string, unknown>): string {
  return Object.entries(details)
    .filter(([, v]) => v != null && v !== "")
    .map(([key, value]) => {
      const label = key
        .replace(/_/g, " ")
        .replace(/^./, (c) => c.toUpperCase());
      const display =
        typeof value === "object" ? JSON.stringify(value) : String(value);
      return `${label}: ${display}`;
    })
    .join(" · ");
}

/* -- Page ----------------------------------------------------------------- */

export default function AktivitätPage() {
  const { companyId, loading } = useCompany();
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!companyId) return;
    setFetching(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/activity?companyId=${companyId}&limit=100`
      );
      if (!res.ok) throw new Error("Aktivitäten konnten nicht geladen werden");
      const data = await res.json();
      setActivities(data.activities ?? []);
    } catch (e: unknown) {
      const msg =
        e instanceof Error
          ? e.message
          : "Daten konnten nicht geladen werden. Bitte versuche es erneut.";
      setError(msg);
    } finally {
      setFetching(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (loading || !companyId) return;
    fetchData();
  }, [companyId, loading, fetchData]);

  if (loading || fetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-gray-400">Aktivitäten laden...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Aktivität</h1>

      {/* Error banner */}
      {error && (
        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button
            onClick={fetchData}
            className="ml-3 inline-flex items-center gap-1.5 rounded-md border border-red-300 bg-white px-3 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-50"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Erneut versuchen
          </button>
        </div>
      )}

      {!error && activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16">
          <Activity className="h-8 w-8 text-gray-300 mb-2" />
          <p className="text-sm text-gray-400">Noch keine Aktivitäten</p>
        </div>
      ) : (
        !error && (
          <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
            {activities.map((entry) => {
              const entityStyle = ENTITY_COLORS[entry.entity_type] ?? {
                bg: "bg-gray-100",
                text: "text-gray-600",
              };
              const dotColor = DOT_COLORS[entry.entity_type] ?? "bg-gray-400";

              return (
                <div key={entry.id} className="flex items-start gap-3 px-4 py-3">
                  {/* Colored dot */}
                  <div className="mt-1.5 shrink-0">
                    <div className={`h-2.5 w-2.5 rounded-full ${dotColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-gray-800">
                        {formatAction(entry.action)}
                      </p>
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${entityStyle.bg} ${entityStyle.text}`}
                      >
                        {entry.entity_type}
                      </span>
                    </div>

                    {/* Details — human-readable key-value pairs */}
                    {entry.details && Object.keys(entry.details).length > 0 && (
                      <p className="text-xs text-gray-400 truncate">
                        {formatDetails(entry.details)}
                      </p>
                    )}

                    {/* Timestamp */}
                    <p className="text-[11px] text-gray-400">
                      {new Date(entry.created_at).toLocaleString("de-CH")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}
