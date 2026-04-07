"use client";

import { useEffect, useState } from "react";
import {
  Scale,
  Loader2,
  CheckCircle2,
  XCircle,
  Info,
  Check,
} from "lucide-react";
import { useCompany } from "../_components/company-context";
import { useToast } from "../_components/toast";

interface Decision {
  id: string;
  agent_id: string;
  request: string;
  type: string;
  confidence: number;
  status: string;
  reason: string | null;
  decided_by: string | null;
  decided_at: string | null;
  requested_at: string;
  agents: { name: string; accent_color: string | null } | null;
}

const TABS = [
  { key: "pending", label: "Offen" },
  { key: "approved", label: "Genehmigt" },
  { key: "denied", label: "Abgelehnt" },
  { key: "all", label: "Alle" },
] as const;

const TYPE_STYLES: Record<string, { bg: string; text: string }> = {
  budget: { bg: "bg-purple-100", text: "text-purple-700" },
  deploy: { bg: "bg-blue-100", text: "text-blue-700" },
  config: { bg: "bg-orange-100", text: "text-orange-700" },
  other: { bg: "bg-gray-100", text: "text-gray-600" },
};

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Offen" },
  approved: { bg: "bg-green-100", text: "text-green-700", label: "Genehmigt" },
  denied: { bg: "bg-red-100", text: "text-red-700", label: "Abgelehnt" },
};

function confidenceColor(c: number) {
  if (c >= 80) return "bg-green-500";
  if (c >= 50) return "bg-yellow-500";
  return "bg-red-500";
}

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

export default function EntscheidungenPage() {
  const { companyId, loading: companyLoading } = useCompany();
  const { toast } = useToast();

  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [actingId, setActingId] = useState<string | null>(null);

  useEffect(() => {
    if (!companyId) return;
    setLoading(true);
    setError(null);

    const url =
      activeTab === "all"
        ? `/api/decisions?companyId=${companyId}`
        : `/api/decisions?companyId=${companyId}&status=${activeTab}`;

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Fehler beim Laden der Entscheidungen");
        return r.json();
      })
      .then((d) => setDecisions(d.decisions ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [companyId, activeTab]);

  async function handleAction(id: string, status: "approved" | "denied") {
    setActingId(id);
    try {
      const res = await fetch(`/api/decisions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      const { decision } = await res.json();
      setDecisions((prev) =>
        prev.map((d) => (d.id === id ? { ...d, ...decision } : d))
      );
      toast(
        status === "approved" ? "Entscheidung genehmigt" : "Entscheidung abgelehnt",
        "success"
      );
    } catch {
      toast("Aktion fehlgeschlagen", "error");
    } finally {
      setActingId(null);
    }
  }

  const isLoading = companyLoading || loading;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Entscheidungen
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Agent-Entscheidungen prüfen und genehmigen
        </p>
      </div>

      <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
        <p className="text-sm text-blue-700">
          Entscheidungen mit Confidence &ge;80% werden automatisch genehmigt
        </p>
      </div>

      <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}

      {error && !isLoading && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!isLoading && !error && decisions.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">
            Keine offenen Entscheidungen
          </h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            Alle Entscheidungen wurden bearbeitet.
          </p>
        </div>
      )}

      {!isLoading && !error && decisions.length > 0 && (
        <div className="space-y-3">
          {decisions.map((decision) => {
            const agentName = decision.agents?.name ?? "Unbekannt";
            const accent = decision.agents?.accent_color || "#000088";
            const initial = agentName.charAt(0).toUpperCase();
            const typeSt = TYPE_STYLES[decision.type] ?? TYPE_STYLES.other;
            const statusSt = STATUS_STYLES[decision.status] ?? STATUS_STYLES.pending;
            const isActing = actingId === decision.id;

            return (
              <div
                key={decision.id}
                className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {initial}
                  </div>

                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {agentName}
                      </span>
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${typeSt.bg} ${typeSt.text}`}
                      >
                        {decision.type}
                      </span>
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusSt.bg} ${statusSt.text}`}
                      >
                        {statusSt.label}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {relativeTime(decision.requested_at)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed">
                      {decision.request}
                    </p>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-gray-400">Confidence</span>
                        <span className="text-[11px] font-medium text-gray-600">
                          {decision.confidence}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className={`h-2 rounded-full transition-all ${confidenceColor(decision.confidence)}`}
                          style={{ width: `${Math.min(100, Math.max(0, decision.confidence))}%` }}
                        />
                      </div>
                    </div>

                    {decision.reason && (
                      <p className="text-xs text-gray-500">
                        Grund: {decision.reason}
                      </p>
                    )}

                    {decision.status === "pending" && (
                      <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
                        <button
                          onClick={() => handleAction(decision.id, "approved")}
                          disabled={isActing}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                        >
                          {isActing ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          )}
                          Genehmigen
                        </button>
                        <button
                          onClick={() => handleAction(decision.id, "denied")}
                          disabled={isActing}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                        >
                          {isActing ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5" />
                          )}
                          Ablehnen
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
