"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import { useCompany } from "../../layout";
import { useToast } from "../../_components/toast";

export default function NewWorkflowPage() {
  const { companyId, loading: companyLoading } = useCompany();
  const { toast } = useToast();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [triggerType, setTriggerType] = useState("manual");
  const [submitting, setSubmitting] = useState(false);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !companyId) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId,
          name: name.trim(),
          description: description.trim() || null,
          triggerType,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Unbekannter Fehler" }));
        throw new Error(data.error || "Workflow konnte nicht erstellt werden");
      }

      const { workflow } = await res.json();
      toast("Workflow erstellt", "success");
      router.push(`/dashboard/workflows/${workflow.id}`);
    } catch (e: any) {
      toast(e.message || "Workflow konnte nicht erstellt werden", "error");
    } finally {
      setSubmitting(false);
    }
  }

  if (companyLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <button
        onClick={() => router.push("/dashboard/workflows")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zu Workflows
      </button>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Neuer Workflow
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Erstelle einen neuen automatisierten Ablauf für dein Team.
        </p>

        <form onSubmit={handleCreate} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z.B. Wöchentlicher Report"
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Beschreibung
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Was macht dieser Workflow?"
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088] resize-none"
            />
          </div>

          {/* Trigger Type */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
              Trigger Typ
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              {[
                { value: "manual", label: "Manuell", desc: "Per Knopfdruck starten" },
                { value: "cron", label: "Cron", desc: "Zeitgesteuert ausführen" },
                { value: "webhook", label: "Webhook", desc: "Über externe URL auslösen" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex flex-1 cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                    triggerType === opt.value
                      ? "border-[#000088] bg-[#000088]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="triggerType"
                    value={opt.value}
                    checked={triggerType === opt.value}
                    onChange={(e) => setTriggerType(e.target.value)}
                    className="mt-0.5 accent-[#000088]"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{opt.label}</p>
                    <p className="text-xs text-gray-500">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/dashboard/workflows")}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-[#000088] px-5 py-2 text-sm font-medium text-white hover:bg-[#000066] disabled:opacity-50 transition-colors"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Erstellen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
