"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Rocket,
  Users,
  Briefcase,
  UserCheck,
  Sparkles,
  ShoppingCart,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react";

/* ── Types ────────────────────────────────────────────────────────────── */

type Template = {
  id: string;
  label: string;
  agents: number;
  icon: React.ElementType;
  description: string;
};

const TEMPLATES: Template[] = [
  {
    id: "side-hustle",
    label: "Side Hustle",
    agents: 2,
    icon: Rocket,
    description: "2 Agents für deinen Start — ein Allrounder und ein Assistent.",
  },
  {
    id: "startup",
    label: "Startup",
    agents: 4,
    icon: Sparkles,
    description: "4 Agents — CEO, CTO, Sales, Content. Für Founder die skalieren.",
  },
  {
    id: "agentur",
    label: "Agentur",
    agents: 5,
    icon: Users,
    description: "5 Agents — CEO, PM, Designer, Dev, Content. Für 1-3 Mann Agenturen.",
  },
  {
    id: "freelancer",
    label: "Freelancer Pro",
    agents: 3,
    icon: UserCheck,
    description: "3 Agents — Assistent, Buchhalter, Content. Wie eine Firma auftreten.",
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    agents: 4,
    icon: ShoppingCart,
    description: "4 Agents — Shop Manager, Kundendienst, Marketing, Logistik.",
  },
  {
    id: "leer",
    label: "Leer starten",
    agents: 0,
    icon: Briefcase,
    description: "0 Agents — Du baust selbst auf",
  },
];

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canNext =
    (step === 1 && companyName.trim().length >= 2) ||
    (step === 2 && selectedTemplate !== null) ||
    step === 3;

  async function handleComplete(skipConnector = false) {
    setSubmitting(true);
    setError("");

    try {
      /* 1. Create company */
      const companyRes = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: companyName.trim() }),
      });

      if (!companyRes.ok) {
        const err = await companyRes.json();
        throw new Error(err.error || "Firma konnte nicht erstellt werden.");
      }

      const { company } = await companyRes.json();

      /* 2. Import template (skip if "leer") */
      if (selectedTemplate && selectedTemplate !== "leer") {
        const importRes = await fetch(
          `/api/companies/${company.id}/import-template`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ templateId: selectedTemplate }),
          }
        );

        if (!importRes.ok) {
          const err = await importRes.json();
          console.error("Template import failed:", err);
        }
      }

      /* 3. Optionally save connector */
      if (!skipConnector && apiKey.trim()) {
        await fetch("/api/connectors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId: company.id,
            provider: "openai",
            label: "OpenAI API Key",
            value: apiKey.trim(),
            credentialType: "api_key",
          }),
        });
      }

      router.push("/dashboard");
    } catch (e: any) {
      setError(e.message || "Ein Fehler ist aufgetreten.");
      setSubmitting(false);
    }
  }

  function next() {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete(false);
    }
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  /* ── Progress Bar ───────────────────────────────────────────────── */

  const progressBar = (
    <div className="mx-auto mb-10 flex w-full max-w-xs gap-2">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            s <= step ? "bg-[#000088]" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );

  /* ── Step 1: Company Name ───────────────────────────────────────── */

  const step1 = (
    <div className="text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        Wie heisst dein Unternehmen?
      </h1>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
        Du kannst den Namen jederzeit in den Einstellungen ändern.
      </p>
      <input
        type="text"
        placeholder="z.B. Meine Agentur GmbH"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && canNext && next()}
        autoFocus
        className="mx-auto mt-8 block w-full max-w-sm rounded-xl border border-gray-200 bg-white px-4 py-3 text-center text-base text-gray-900 outline-none transition-shadow placeholder:text-gray-400 focus:border-[#000088] focus:ring-2 focus:ring-[#000088]/20"
      />
    </div>
  );

  /* ── Step 2: Template Selection ─────────────────────────────────── */

  const step2 = (
    <div className="text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        Wähl dein Starter-Team
      </h1>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
        Du kannst Agents jederzeit hinzufügen oder entfernen.
      </p>
      <div className="mx-auto mt-8 grid max-w-lg gap-3">
        {TEMPLATES.map((t) => {
          const Icon = t.icon;
          const selected = selectedTemplate === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTemplate(t.id)}
              className={`flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all ${
                selected
                  ? "border-[#000088] bg-[#000088]/5 ring-2 ring-[#000088]/20"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  selected ? "bg-[#000088] text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {t.label}
                </p>
                <p className="text-xs text-gray-500">{t.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  /* ── Step 3: API Key ────────────────────────────────────────────── */

  const step3 = (
    <div className="text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        Verbinde dein AI
      </h1>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
        Dein OpenAI API Key wird verschlüsselt gespeichert.
      </p>
      <div className="relative mx-auto mt-8 max-w-sm">
        <KeyRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="password"
          placeholder="sk-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && next()}
          autoFocus
          className="block w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition-shadow placeholder:text-gray-400 focus:border-[#000088] focus:ring-2 focus:ring-[#000088]/20"
        />
      </div>
      <button
        type="button"
        onClick={() => handleComplete(true)}
        disabled={submitting}
        className="mt-4 text-sm font-medium text-gray-500 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-700"
      >
        Später verbinden
      </button>
    </div>
  );

  /* ── Render ─────────────────────────────────────────────────────── */

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      {/* Logo */}
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-[#000088]">
        <span className="text-base font-extrabold text-white">K</span>
      </div>

      {progressBar}

      <div className="w-full max-w-xl">
        {step === 1 && step1}
        {step === 2 && step2}
        {step === 3 && step3}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
      )}

      {/* Navigation Buttons */}
      <div className="mt-10 flex items-center gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={back}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </button>
        )}
        <button
          type="button"
          onClick={next}
          disabled={!canNext || submitting}
          className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0000aa] disabled:opacity-40"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Wird erstellt...
            </>
          ) : step === 3 ? (
            <>
              Abschliessen
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              Weiter
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
