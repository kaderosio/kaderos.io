"use client";

import { useEffect, useState } from "react";
import { useCompany } from "../layout";
import { Activity } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

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

/* ── Page ──────────────────────────────────────────────────────────── */

export default function AktivitaetPage() {
  const { companyId, loading } = useCompany();
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading || !companyId) return;
    setFetching(true);
    fetch(`/api/activity?companyId=${companyId}&limit=100`)
      .then((r) => r.json())
      .then((data) => setActivities(data.activities ?? []))
      .finally(() => setFetching(false));
  }, [companyId, loading]);

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

      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16">
          <Activity className="h-8 w-8 text-gray-300 mb-2" />
          <p className="text-sm text-gray-400">Noch keine Aktivitäten</p>
        </div>
      ) : (
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

                  {/* Details */}
                  {entry.details && Object.keys(entry.details).length > 0 && (
                    <p className="text-xs text-gray-400 truncate">
                      {JSON.stringify(entry.details)
                        .replace(/[{}"]/g, "")
                        .replace(/,/g, ", ")
                        .slice(0, 200)}
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
      )}
    </div>
  );
}
