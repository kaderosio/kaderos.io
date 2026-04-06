"use client";

import { useEffect, useState, useCallback } from "react";
import { useCompany } from "../layout";
import { useToast } from "../_components/toast";
import {
  Wallet,
  Info,
  Loader2,
  Plus,
  X,
  RefreshCw,
  Pencil,
} from "lucide-react";

/* -- Types ---------------------------------------------------------------- */

type Agent = {
  id: string;
  name: string;
};

type Budget = {
  id: string;
  agent_id: string;
  monthly_limit_chf: number;
  spent_chf: number;
  warning_threshold: number;
  period: string;
  is_paused: boolean;
  agents: { id: string; name: string } | null;
};

type CostEntry = {
  id: string;
  amount_chf: number;
  description: string | null;
  tokens_used: number | null;
  model: string | null;
  agent_id: string | null;
  task_id: string | null;
  created_at: string;
};

/* -- Page ----------------------------------------------------------------- */

export default function FinanzenPage() {
  const { companyId, loading } = useCompany();
  const { toast } = useToast();

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [costEntries, setCostEntries] = useState<CostEntry[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* Modal state */
  const [showModal, setShowModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [modalAgentId, setModalAgentId] = useState("");
  const [modalLimit, setModalLimit] = useState("");
  const [modalThreshold, setModalThreshold] = useState("80");
  const [saving, setSaving] = useState(false);

  /* Fetch data */
  const fetchData = useCallback(async () => {
    if (!companyId) return;
    setFetching(true);
    setError(null);
    try {
      const [costsRes, agentsRes] = await Promise.all([
        fetch(`/api/costs?companyId=${companyId}`),
        fetch(`/api/agents?companyId=${companyId}`),
      ]);

      if (!costsRes.ok) throw new Error("Kosten konnten nicht geladen werden");
      if (!agentsRes.ok) throw new Error("Agenten konnten nicht geladen werden");

      const [costsData, agentsData] = await Promise.all([
        costsRes.json(),
        agentsRes.json(),
      ]);

      setBudgets(costsData.budgets ?? []);
      setCostEntries(costsData.costEntries ?? []);
      setAgents(agentsData.agents ?? []);
    } catch (e: unknown) {
      const msg =
        e instanceof Error ? e.message : "Daten konnten nicht geladen werden. Bitte versuche es erneut.";
      setError(msg);
    } finally {
      setFetching(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (loading || !companyId) return;
    fetchData();
  }, [companyId, loading, fetchData]);

  /* Computed values */
  const totalSpent = budgets.reduce((sum, b) => sum + Number(b.spent_chf || 0), 0);
  const totalBudget = budgets.reduce((sum, b) => sum + Number(b.monthly_limit_chf || 0), 0);
  const currentPeriod = new Date().toISOString().slice(0, 7);
  const currentPeriodLabel = new Date().toLocaleDateString("de-CH", {
    month: "long",
    year: "numeric",
  });

  /* Open modal for creating */
  function openCreate() {
    setEditingBudget(null);
    setModalAgentId(agents.length > 0 ? agents[0].id : "");
    setModalLimit("");
    setModalThreshold("80");
    setShowModal(true);
  }

  /* Open modal for editing */
  function openEdit(budget: Budget) {
    setEditingBudget(budget);
    setModalAgentId(budget.agent_id);
    setModalLimit(String(Number(budget.monthly_limit_chf)));
    setModalThreshold(String(budget.warning_threshold));
    setShowModal(true);
  }

  /* Save budget */
  async function handleSave() {
    if (!companyId) return;
    const limit = parseFloat(modalLimit);
    if (isNaN(limit) || limit <= 0) {
      toast("Bitte gib ein gueltiges Limit ein", "error");
      return;
    }
    if (!modalAgentId) {
      toast("Bitte waehle einen Agenten", "error");
      return;
    }

    setSaving(true);
    try {
      if (editingBudget) {
        // PUT update
        const res = await fetch(`/api/budgets/${editingBudget.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            monthlyLimitChf: limit,
            warningThreshold: parseInt(modalThreshold) || 80,
          }),
        });
        if (!res.ok) throw new Error();
        const { budget } = await res.json();
        setBudgets((prev) =>
          prev.map((b) => (b.id === budget.id ? budget : b))
        );
        toast("Budget aktualisiert", "success");
      } else {
        // POST create (upsert)
        const res = await fetch("/api/budgets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId,
            agentId: modalAgentId,
            monthlyLimitChf: limit,
            warningThreshold: parseInt(modalThreshold) || 80,
            period: currentPeriod,
          }),
        });
        if (!res.ok) throw new Error();
        const { budget } = await res.json();
        setBudgets((prev) => {
          const filtered = prev.filter((b) => b.id !== budget.id);
          return [budget, ...filtered];
        });
        toast("Budget erstellt", "success");
      }
      setShowModal(false);
    } catch {
      toast("Budget konnte nicht gespeichert werden", "error");
    } finally {
      setSaving(false);
    }
  }

  /* Get agent name from cost entry */
  function agentName(agentId: string | null): string {
    if (!agentId) return "—";
    const agent = agents.find((a) => a.id === agentId);
    return agent?.name ?? "Unbekannt";
  }

  /* Loading state */
  if (loading || fetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        <p className="ml-2 text-sm text-gray-400">Finanzen laden...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Finanzen
          </h1>
          <p className="mt-1 text-sm text-gray-500">{currentPeriodLabel}</p>
        </div>
        <button
          onClick={openCreate}
          disabled={agents.length === 0}
          className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0000aa] disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Budget erstellen
        </button>
      </div>

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

      {/* Budget Overview Cards */}
      {!error && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-medium text-gray-500">
                Total ausgegeben
              </p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                CHF {totalSpent.toFixed(2)}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-medium text-gray-500">
                Gesamtbudget
              </p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                CHF {totalBudget.toFixed(2)}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-medium text-gray-500">Verbleibend</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                CHF {(totalBudget - totalSpent).toFixed(2)}
              </p>
              {totalBudget > 0 && (
                <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      totalSpent / totalBudget >= 1
                        ? "bg-red-500"
                        : totalSpent / totalBudget >= 0.8
                        ? "bg-yellow-500"
                        : "bg-emerald-500"
                    }`}
                    style={{
                      width: `${Math.min(100, (totalSpent / totalBudget) * 100)}%`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Budget per Agent Table */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-gray-900">
              Budget pro Agent
            </h2>

            {budgets.length === 0 ? (
              <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Noch keine Budgets konfiguriert
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Erstelle ein Budget, um die Kosten deiner Agenten zu kontrollieren.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                        Agent
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                        Budget
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                        Ausgegeben
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                        Verbleibend
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 hidden sm:table-cell">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                        Aktionen
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {budgets.map((budget) => {
                      const limit = Number(budget.monthly_limit_chf) || 0;
                      const spent = Number(budget.spent_chf) || 0;
                      const remaining = limit - spent;
                      const pct = limit > 0 ? (spent / limit) * 100 : 0;
                      const barColor =
                        pct >= 100
                          ? "bg-red-500"
                          : pct >= 80
                          ? "bg-yellow-500"
                          : "bg-emerald-500";

                      return (
                        <tr key={budget.id} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">
                                {budget.agents?.name ?? "Allgemein"}
                              </span>
                              {budget.is_paused && (
                                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-semibold text-yellow-700">
                                  Pausiert
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right text-gray-700">
                            CHF {limit.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-700">
                            CHF {spent.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-700">
                            CHF {remaining.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-20 rounded-full bg-gray-100">
                                <div
                                  className={`h-2 rounded-full transition-all ${barColor}`}
                                  style={{
                                    width: `${Math.min(100, pct)}%`,
                                  }}
                                />
                              </div>
                              <span className="text-xs text-gray-500">
                                {pct.toFixed(0)}%
                              </span>
                              {pct >= 80 && pct < 100 && (
                                <span className="text-yellow-500 text-xs">&#9888;</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => openEdit(budget)}
                              className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                              <Pencil className="h-3 w-3" />
                              Bearbeiten
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Cost Log */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-gray-900">
              Letzte Kosteneinträge
            </h2>

            {costEntries.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-12">
                <Wallet className="h-8 w-8 text-gray-300 mb-2" />
                <p className="text-sm text-gray-400">
                  Noch keine Kosteneinträge
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                        Datum
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                        Agent
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 hidden md:table-cell">
                        Beschreibung
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 hidden sm:table-cell">
                        Model
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 hidden sm:table-cell">
                        Tokens
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                        CHF
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {costEntries.slice(0, 50).map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {new Date(entry.created_at).toLocaleDateString(
                            "de-CH",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {agentName(entry.agent_id)}
                        </td>
                        <td className="px-4 py-3 text-gray-500 truncate max-w-[200px] hidden md:table-cell">
                          {entry.description || "—"}
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          {entry.model ? (
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                              {entry.model}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-500 hidden sm:table-cell">
                          {entry.tokens_used != null
                            ? entry.tokens_used >= 1000
                              ? `${(entry.tokens_used / 1000).toFixed(1)}K`
                              : entry.tokens_used
                            : "—"}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-900">
                          {Number(entry.amount_chf ?? 0).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Budget Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingBudget ? "Budget bearbeiten" : "Budget erstellen"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Agent dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Agent
                </label>
                {editingBudget ? (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                    {editingBudget.agents?.name ?? "Unbekannt"}
                  </div>
                ) : (
                  <select
                    value={modalAgentId}
                    onChange={(e) => setModalAgentId(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#000088] focus:ring-2 focus:ring-[#000088]/10"
                  >
                    {agents.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Monthly limit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monatliches Limit (CHF)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={modalLimit}
                  onChange={(e) => setModalLimit(e.target.value)}
                  placeholder="z.B. 50.00"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-[#000088] focus:ring-2 focus:ring-[#000088]/10"
                />
              </div>

              {/* Warning threshold */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warnung bei (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={modalThreshold}
                  onChange={(e) => setModalThreshold(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#000088] focus:ring-2 focus:ring-[#000088]/10"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Ab diesem Prozentsatz wird eine Warnung angezeigt
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0000aa] disabled:opacity-50"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
