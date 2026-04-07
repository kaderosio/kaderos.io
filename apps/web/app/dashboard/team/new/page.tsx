"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { useCompany } from "../../_components/company-context";

/* ── Model Options ───────────────────────────────────────────────────── */

const MODELS = [
  { id: "claude", label: "Claude", desc: "Anthropic", icon: "A" },
  { id: "gpt", label: "GPT", desc: "OpenAI", icon: "G" },
  { id: "mistral", label: "Mistral", desc: "Mistral AI", icon: "M" },
  { id: "custom", label: "Custom", desc: "Eigenes Modell", icon: "C" },
] as const;

/* ── Preset Colors ───────────────────────────────────────────────────── */

const PRESET_COLORS = [
  "#000088",
  "#0891B2",
  "#059669",
  "#D97706",
  "#DC2626",
  "#7C3AED",
  "#1E293B",
];

/* ── Page ────────────────────────────────────────────────────────────── */

export default function NewAgentPage() {
  const { companyId } = useCompany();
  const router = useRouter();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [model, setModel] = useState("claude");
  const [accentColor, setAccentColor] = useState(PRESET_COLORS[0]);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyId || !name.trim() || !role.trim()) return;

    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId,
          name: name.trim(),
          role: role.trim(),
          type: model,
          systemPrompt: systemPrompt.trim() || null,
          accentColor,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Fehler beim Erstellen");
      }

      router.push("/dashboard/team");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      {/* Back link */}
      <Link
        href="/dashboard/team"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurueck zum Team
      </Link>

      <h1 className="mb-8 text-2xl font-bold tracking-tight text-gray-900">
        Neuer Agent
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ── Name ──────────────────────────────────────────────────── */}
        <div>
          <label
            htmlFor="agent-name"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="agent-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z.B. Max, Aura, Vega..."
            className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-[#000088] focus:ring-2 focus:ring-[#000088]/10"
          />
        </div>

        {/* ── Role ─────────────────────────────────────────────────── */}
        <div>
          <label
            htmlFor="agent-role"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Rolle
          </label>
          <input
            id="agent-role"
            type="text"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="z.B. CTO Agent, Marketing Lead..."
            className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-[#000088] focus:ring-2 focus:ring-[#000088]/10"
          />
        </div>

        {/* ── AI Model ─────────────────────────────────────────────── */}
        <div>
          <span className="mb-3 block text-sm font-medium text-gray-700">
            AI-Modell
          </span>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {MODELS.map((m) => {
              const selected = model === m.id;
              return (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setModel(m.id)}
                  className={`relative flex flex-col items-center gap-1.5 rounded-xl border-2 p-4 text-center transition-all ${
                    selected
                      ? "border-[#000088] bg-[#000088]/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                      selected
                        ? "bg-[#000088] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {m.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {m.label}
                  </span>
                  <span className="text-[11px] text-gray-500">{m.desc}</span>
                  {selected && (
                    <div className="absolute right-2 top-2">
                      <Check className="h-4 w-4 text-[#000088]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Color Picker ─────────────────────────────────────────── */}
        <div>
          <span className="mb-3 block text-sm font-medium text-gray-700">
            Farbe
          </span>
          <div className="flex gap-3">
            {PRESET_COLORS.map((color) => {
              const selected = accentColor === color;
              return (
                <button
                  type="button"
                  key={color}
                  onClick={() => setAccentColor(color)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform ${
                    selected ? "scale-110 ring-2 ring-offset-2" : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: color,
                    ["--tw-ring-color" as string]: selected ? color : undefined,
                  }}
                >
                  {selected && <Check className="h-4 w-4 text-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── System Prompt ────────────────────────────────────────── */}
        <div>
          <label
            htmlFor="system-prompt"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            System Prompt
          </label>
          <textarea
            id="system-prompt"
            rows={5}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Beschreibe die Persönlichkeit und Aufgaben des Agenten..."
            className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-[#000088] focus:ring-2 focus:ring-[#000088]/10 resize-none"
          />
          <p className="mt-1.5 text-xs text-gray-400">
            Optional. Definiert, wie sich der Agent verhaelt.
          </p>
        </div>

        {/* ── Error ────────────────────────────────────────────────── */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ── Submit ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 border-t border-gray-100 pt-6">
          <button
            type="submit"
            disabled={saving || !name.trim() || !role.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0000aa] disabled:opacity-50"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Agent erstellen
          </button>
          <Link
            href="/dashboard/team"
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Abbrechen
          </Link>
        </div>
      </form>
    </div>
  );
}
