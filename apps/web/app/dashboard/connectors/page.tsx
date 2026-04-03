"use client";

import { useEffect, useState } from "react";
import {
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Loader2,
  Trash2,
  TestTube,
} from "lucide-react";
import { useCompany } from "../layout";

/* ── Types ───────────────────────────────────────────────────────────── */

interface Connector {
  id: string;
  provider: string;
  label: string;
  credential_type: string;
  metadata: Record<string, unknown>;
  is_active: boolean;
  last_tested_at: string | null;
  last_test_result: { success: boolean; message: string } | null;
  created_at: string;
}

/* ── Provider Catalogue ──────────────────────────────────────────────── */

interface ProviderDef {
  id: string;
  name: string;
  description: string;
  disabled?: boolean;
  disabledLabel?: string;
}

interface Category {
  label: string;
  providers: ProviderDef[];
}

const CATEGORIES: Category[] = [
  {
    label: "LLM",
    providers: [
      { id: "anthropic", name: "Anthropic", description: "Claude API Key" },
      { id: "openai", name: "OpenAI", description: "GPT API Key" },
      { id: "mistral", name: "Mistral", description: "Mistral API Key" },
    ],
  },
  {
    label: "SWISS",
    providers: [
      { id: "deepl", name: "DeepL", description: "Uebersetzungs-API" },
      {
        id: "bexio",
        name: "Bexio",
        description: "Buchhaltung & ERP",
        disabled: true,
        disabledLabel: "Coming soon",
      },
    ],
  },
  {
    label: "DEV",
    providers: [
      { id: "github", name: "GitHub", description: "Personal Access Token" },
    ],
  },
  {
    label: "PRODUKTIVITAET",
    providers: [
      { id: "notion", name: "Notion", description: "Integration Token" },
    ],
  },
];

/* ── Page ────────────────────────────────────────────────────────────── */

export default function ConnectorsPage() {
  const { companyId, loading: companyLoading } = useCompany();

  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* Per-provider input state */
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [testing, setTesting] = useState<Record<string, boolean>>({});
  const [removing, setRemoving] = useState<Record<string, boolean>>({});

  /* Fetch existing connectors */
  useEffect(() => {
    if (companyLoading) return;
    setLoading(true);
    fetch("/api/connectors")
      .then((r) => {
        if (!r.ok) throw new Error("Fehler beim Laden");
        return r.json();
      })
      .then((d) => setConnectors(d.connectors ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [companyLoading]);

  /* Helpers */
  function getConnector(providerId: string): Connector | undefined {
    return connectors.find((c) => c.provider === providerId);
  }

  /* Save a new key */
  async function handleSave(providerId: string) {
    const value = inputs[providerId]?.trim();
    if (!value || !companyId) return;

    setSaving((p) => ({ ...p, [providerId]: true }));
    try {
      const res = await fetch("/api/connectors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId, provider: providerId, value }),
      });
      if (!res.ok) throw new Error();
      const { connector } = await res.json();
      setConnectors((prev) => {
        const filtered = prev.filter((c) => c.provider !== providerId);
        return [connector, ...filtered];
      });
      setInputs((p) => ({ ...p, [providerId]: "" }));
    } catch {
      /* silent */
    } finally {
      setSaving((p) => ({ ...p, [providerId]: false }));
    }
  }

  /* Test a connector */
  async function handleTest(connector: Connector) {
    setTesting((p) => ({ ...p, [connector.provider]: true }));
    try {
      const res = await fetch(`/api/connectors/${connector.id}/test`, {
        method: "POST",
      });
      const result = await res.json();
      /* Update connector in state with test result */
      setConnectors((prev) =>
        prev.map((c) =>
          c.id === connector.id
            ? {
                ...c,
                last_tested_at: new Date().toISOString(),
                last_test_result: {
                  success: result.success,
                  message: result.message,
                },
              }
            : c
        )
      );
    } catch {
      /* silent */
    } finally {
      setTesting((p) => ({ ...p, [connector.provider]: false }));
    }
  }

  /* Remove a connector */
  async function handleRemove(connector: Connector) {
    setRemoving((p) => ({ ...p, [connector.provider]: true }));
    try {
      const res = await fetch(`/api/connectors?id=${connector.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setConnectors((prev) => prev.filter((c) => c.id !== connector.id));
    } catch {
      /* silent */
    } finally {
      setRemoving((p) => ({ ...p, [connector.provider]: false }));
    }
  }

  /* ── Render ──────────────────────────────────────────────────────── */

  const isLoading = companyLoading || loading;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Connectors
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          API-Keys und Integrationen verbinden
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Categories */}
      {!isLoading && (
        <div className="space-y-8">
          {CATEGORIES.map((category) => (
            <section key={category.label}>
              {/* Category header */}
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {category.label}
              </h2>

              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                {category.providers.map((provider, idx) => {
                  const connector = getConnector(provider.id);
                  const isConnected = !!connector;
                  const isSaving = saving[provider.id];
                  const isTesting = testing[provider.id];
                  const isRemoving = removing[provider.id];
                  const isPasswordVisible = showPassword[provider.id];
                  const inputValue = inputs[provider.id] ?? "";

                  /* Test result status */
                  let testIcon = null;
                  if (isConnected && connector.last_test_result) {
                    testIcon = connector.last_test_result.success ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    );
                  } else if (isConnected) {
                    testIcon = (
                      <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                    );
                  }

                  return (
                    <div
                      key={provider.id}
                      className={`flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-4 ${
                        idx > 0 ? "border-t border-gray-100" : ""
                      } ${provider.disabled ? "opacity-50" : ""}`}
                    >
                      {/* Left: icon + info */}
                      <div className="flex items-center gap-3 sm:w-48 sm:shrink-0">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                          <Key className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">
                              {provider.name}
                            </span>
                            {provider.disabled && provider.disabledLabel && (
                              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                                {provider.disabledLabel}
                              </span>
                            )}
                          </div>
                          <p className="truncate text-xs text-gray-400">
                            {provider.description}
                          </p>
                        </div>
                      </div>

                      {/* Right: connected state or input */}
                      <div className="flex flex-1 items-center gap-2">
                        {provider.disabled ? (
                          <div className="flex-1" />
                        ) : isConnected ? (
                          <>
                            {/* Status indicator */}
                            <div className="flex items-center gap-1.5">
                              {testIcon}
                              {connector.last_test_result && (
                                <span
                                  className={`text-xs ${
                                    connector.last_test_result.success
                                      ? "text-emerald-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {connector.last_test_result.success
                                    ? "Verbunden"
                                    : "Fehlgeschlagen"}
                                </span>
                              )}
                              {!connector.last_test_result && (
                                <span className="text-xs text-gray-400">
                                  Nicht getestet
                                </span>
                              )}
                            </div>
                            <div className="flex-1" />
                            {/* Test button */}
                            <button
                              onClick={() => handleTest(connector)}
                              disabled={isTesting}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                            >
                              {isTesting ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <TestTube className="h-3.5 w-3.5" />
                              )}
                              Test
                            </button>
                            {/* Remove button */}
                            <button
                              onClick={() => handleRemove(connector)}
                              disabled={isRemoving}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                            >
                              {isRemoving ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                              )}
                              Entfernen
                            </button>
                          </>
                        ) : (
                          <>
                            {/* Password input */}
                            <div className="relative flex-1">
                              <input
                                type={isPasswordVisible ? "text" : "password"}
                                value={inputValue}
                                onChange={(e) =>
                                  setInputs((p) => ({
                                    ...p,
                                    [provider.id]: e.target.value,
                                  }))
                                }
                                placeholder="API Key eingeben..."
                                className="w-full rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-9 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-[#000088] focus:ring-2 focus:ring-[#000088]/10"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowPassword((p) => ({
                                    ...p,
                                    [provider.id]: !p[provider.id],
                                  }))
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {isPasswordVisible ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            {/* Save button */}
                            <button
                              onClick={() => handleSave(provider.id)}
                              disabled={isSaving || !inputValue.trim()}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[#000088] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0000aa] disabled:opacity-50"
                            >
                              {isSaving && (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              )}
                              Speichern
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
