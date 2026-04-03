"use client";

import { useEffect, useState } from "react";
import { useCompany } from "../layout";
import { Wallet, Info } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

type Budget = {
  id: string;
  monthly_limit_chf: number;
  spent_chf: number;
  period: string;
  agents: { name: string } | null;
};

type CostEntry = {
  id: string;
  amount_chf: number;
  description: string | null;
  category: string | null;
  agent_id: string | null;
  created_at: string;
};

/* ── Page ──────────────────────────────────────────────────────────── */

export default function FinanzenPage() {
  const { companyId, loading } = useCompany();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [costEntries, setCostEntries] = useState<CostEntry[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading || !companyId) return;
    setFetching(true);
    fetch(`/api/costs?companyId=${companyId}`)
      .then((r) => r.json())
      .then((data) => {
        setBudgets(data.budgets ?? []);
        setCostEntries(data.costEntries ?? []);
      })
      .finally(() => setFetching(false));
  }, [companyId, loading]);

  if (loading || fetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-gray-400">Finanzen laden...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Finanzen</h1>

      {/* Budgets section */}
      {budgets.length === 0 ? (
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">
              Noch keine Budgets konfiguriert
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Budgets werden automatisch erstellt, wenn Agents Kosten verursachen.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-700">Budgets pro Agent</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {budgets.map((budget) => {
              const limit = budget.monthly_limit_chf || 0;
              const spent = budget.spent_chf || 0;
              const pct = limit > 0 ? Math.min(100, (spent / limit) * 100) : 0;
              const isOver = spent > limit && limit > 0;

              return (
                <div
                  key={budget.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {budget.agents?.name ?? "Allgemein"}
                    </h3>
                    <span className="text-[11px] text-gray-400">{budget.period}</span>
                  </div>

                  {/* Amount display */}
                  <div className="flex items-baseline gap-1">
                    <span className={`text-lg font-bold ${isOver ? "text-red-600" : "text-gray-900"}`}>
                      CHF {spent.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400">
                      / CHF {limit.toFixed(2)}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isOver
                          ? "bg-red-500"
                          : pct > 80
                          ? "bg-yellow-500"
                          : "bg-[#000088]"
                      }`}
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-gray-400">
                    {pct.toFixed(0)}% verbraucht
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cost entries */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-700">Letzte Kosteneinträge</h2>

        {costEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-12">
            <Wallet className="h-8 w-8 text-gray-300 mb-2" />
            <p className="text-sm text-gray-400">Noch keine Kosteneinträge</p>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
            {costEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between px-4 py-3">
                <div className="space-y-0.5 min-w-0 flex-1">
                  <p className="text-sm text-gray-800 truncate">
                    {entry.description || "Kosteneintrag"}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    {entry.category && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                        {entry.category}
                      </span>
                    )}
                    <span>
                      {new Date(entry.created_at).toLocaleString("de-CH")}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 shrink-0 ml-3">
                  CHF {(entry.amount_chf ?? 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
