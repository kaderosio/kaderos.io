"use client";

import { useState } from "react";
import Link from "next/link";

export default function BrainDemoPage() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [storeResult, setStoreResult] = useState<null | Record<string, unknown>>(null);
  const [recallResult, setRecallResult] = useState<null | Record<string, unknown>>(null);
  const [storeLoading, setStoreLoading] = useState(false);
  const [recallLoading, setRecallLoading] = useState(false);

  // Public demo workspace — read-only recall, limited store
  const DEMO_API = "https://agent-brain-production-1064.up.railway.app";

  async function handleStore() {
    if (!input.trim()) return;
    setStoreLoading(true);
    setStoreResult(null);
    try {
      const res = await fetch("/api/brain-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "store", content: input }),
      });
      const data = await res.json();
      setStoreResult(data);
    } catch {
      setStoreResult({ error: "Verbindung fehlgeschlagen" });
    }
    setStoreLoading(false);
  }

  async function handleRecall() {
    if (!query.trim()) return;
    setRecallLoading(true);
    setRecallResult(null);
    try {
      const res = await fetch("/api/brain-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "recall", query }),
      });
      const data = await res.json();
      setRecallResult(data);
    } catch {
      setRecallResult({ error: "Verbindung fehlgeschlagen" });
    }
    setRecallLoading(false);
  }

  return (
    <div className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">
            Live Demo
          </div>
          <h1 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight mb-4">
            Teste den Agent Brain.
          </h1>
          <p className="text-[16px] text-[#6E6E73]">
            Speichere eine Erinnerung. Frag den Brain. Sieh was passiert.
          </p>
        </div>

        {/* Store Section */}
        <div className="mb-10 rounded-2xl border border-[#E5E5EA] p-6">
          <h2 className="text-[18px] font-bold mb-1">1. Speichern</h2>
          <p className="text-[13px] text-[#86868B] mb-4">
            Schreib etwas — der Brain bewertet es automatisch (Emotion, Neuheit, Dringlichkeit) und extrahiert Entitäten.
          </p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="z.B. Mieter Müller hat angerufen wegen der defekten Heizung. Er war aufgebracht."
            className="w-full rounded-xl border border-[#E5E5EA] p-4 text-[14px] resize-none h-24 focus:outline-none focus:border-[#000088]"
          />
          <button
            onClick={handleStore}
            disabled={storeLoading || !input.trim()}
            className="mt-3 px-6 py-2.5 bg-[#000088] text-white rounded-xl text-[13px] font-semibold disabled:opacity-50 hover:bg-[#0000aa] transition"
          >
            {storeLoading ? "Speichert..." : "Im Brain speichern →"}
          </button>

          {storeResult && (
            <div className="mt-4 rounded-xl bg-[#F5F5F7] p-4">
              <div className="text-[12px] font-semibold text-[#000088] mb-2">Brain Antwort:</div>
              {"error" in storeResult ? (
                <p className="text-[13px] text-red-600">{String(storeResult.error)}</p>
              ) : (
                <div className="space-y-1 text-[12px] font-mono text-[#6E6E73]">
                  {storeResult.emotion_score !== undefined && (
                    <p>Emotion: <span className="text-[#1D1D1F] font-semibold">{String(storeResult.emotion_score)}</span> {Number(storeResult.emotion_score) < 0 ? "(negativ)" : Number(storeResult.emotion_score) > 0 ? "(positiv)" : "(neutral)"}</p>
                  )}
                  {storeResult.novelty_score !== undefined && (
                    <p>Neuheit: <span className="text-[#1D1D1F] font-semibold">{String(storeResult.novelty_score)}</span></p>
                  )}
                  {storeResult.weight !== undefined && (
                    <p>Gewicht: <span className="text-[#1D1D1F] font-semibold">{String(storeResult.weight)}</span></p>
                  )}
                  {Array.isArray(storeResult.entities) && storeResult.entities.length > 0 && (
                    <p>Entitäten: <span className="text-[#000088] font-semibold">{(storeResult.entities as Array<{name: string; type: string}>).map((e) => `${e.name} (${e.type})`).join(", ")}</span></p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Recall Section */}
        <div className="mb-10 rounded-2xl border border-[#E5E5EA] p-6">
          <h2 className="text-[18px] font-bold mb-1">2. Erinnern</h2>
          <p className="text-[13px] text-[#86868B] mb-4">
            Frag den Brain — er durchsucht alle Schichten und gibt vernetzten Kontext zurück.
          </p>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="z.B. Was wissen wir über Müller?"
            className="w-full rounded-xl border border-[#E5E5EA] p-4 text-[14px] focus:outline-none focus:border-[#000088]"
            onKeyDown={(e) => e.key === "Enter" && handleRecall()}
          />
          <button
            onClick={handleRecall}
            disabled={recallLoading || !query.trim()}
            className="mt-3 px-6 py-2.5 bg-[#000088] text-white rounded-xl text-[13px] font-semibold disabled:opacity-50 hover:bg-[#0000aa] transition"
          >
            {recallLoading ? "Sucht..." : "Brain fragen →"}
          </button>

          {recallResult && (
            <div className="mt-4 rounded-xl bg-[#F5F5F7] p-4">
              <div className="text-[12px] font-semibold text-[#000088] mb-2">Erinnerungen:</div>
              {"error" in recallResult ? (
                <p className="text-[13px] text-red-600">{String(recallResult.error)}</p>
              ) : (
                <div className="space-y-3">
                  {Array.isArray(recallResult.memories) && recallResult.memories.map((m: Record<string, unknown>, i: number) => (
                    <div key={i} className="rounded-lg bg-white p-3 border border-[#E5E5EA]">
                      <p className="text-[13px] text-[#1D1D1F] mb-1">{String(m.content)}</p>
                      <p className="text-[11px] text-[#86868B]">
                        Relevanz: {String((Number(m.relevance) * 100).toFixed(0))}% · Gewicht: {String(m.weight)} · Typ: {String(m.type)}
                      </p>
                    </div>
                  ))}
                  {Array.isArray(recallResult.entities) && recallResult.entities.length > 0 && (
                    <div className="text-[12px] text-[#86868B]">
                      Vernetzte Entitäten: {(recallResult.entities as Array<{name: string}>).map((e) => e.name).join(", ")}
                    </div>
                  )}
                  {Array.isArray(recallResult.memories) && recallResult.memories.length === 0 && (
                    <p className="text-[13px] text-[#86868B]">Noch keine Erinnerungen. Speichere zuerst etwas.</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="rounded-2xl bg-gradient-to-br from-[#000088]/5 to-white p-6 border border-[#000088]/10 text-center">
          <p className="text-[14px] text-[#6E6E73] mb-4">
            Das ist ein öffentlicher Demo-Workspace. Deine Eingaben werden nach 24h gelöscht.
            <br />
            Im echten KaderOS hat jedes Unternehmen einen eigenen, isolierten Brain.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/signup" className="px-6 py-2.5 bg-[#000088] text-white rounded-xl text-[13px] font-semibold hover:bg-[#0000aa] transition">
              Platz sichern
            </Link>
            <Link href="/brain" className="px-6 py-2.5 border border-[#000088] text-[#000088] rounded-xl text-[13px] font-semibold hover:bg-[#000088]/5 transition">
              7 Schichten erklärt
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
