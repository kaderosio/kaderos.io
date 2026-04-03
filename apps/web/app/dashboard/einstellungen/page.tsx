"use client";

import { useEffect, useState } from "react";
import { useCompany } from "../layout";
import { useToast } from "../_components/toast";
import { Settings, Globe, Clock, Trash2 } from "lucide-react";

/* ── Page ──────────────────────────────────────────────────────────── */

export default function EinstellungenPage() {
  const { companyId, companyName, loading } = useCompany();
  const [name, setName] = useState(companyName ?? "");
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  /* Sync initial value when context loads */
  useEffect(() => {
    if (companyName) setName(companyName);
  }, [companyName]);

  async function handleSave() {
    if (!companyId || !name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/companies/${companyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (res.ok) {
        toast("Gespeichert", "success");
      } else {
        toast("Speichern fehlgeschlagen", "error");
      }
    } catch {
      toast("Speichern fehlgeschlagen", "error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-gray-400">Einstellungen laden...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-2xl">
      <h1 className="text-xl font-bold text-gray-900">Einstellungen</h1>

      {/* Company name */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-[#000088]" />
          <h2 className="text-sm font-semibold text-gray-900">Unternehmen</h2>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-500">
            Unternehmensname
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088]"
            />
            <button
              onClick={handleSave}
              disabled={saving || !name.trim() || name === companyName}
              className="rounded-lg bg-[#000088] px-4 py-2 text-sm font-medium text-white hover:bg-[#000066] disabled:opacity-50 transition-colors"
            >
              {saving ? "..." : "Speichern"}
            </button>
          </div>
        </div>
      </div>

      {/* Locale & Timezone */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-[#000088]" />
          <h2 className="text-sm font-semibold text-gray-900">Region</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-500">Locale</label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              <Globe className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-sm text-gray-700">de-CH</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-500">Zeitzone</label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-sm text-gray-700">Europe/Zurich</span>
            </div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-xl border border-red-200 bg-red-50/50 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-red-700">Gefahrenzone</h2>
        <p className="text-xs text-red-600/80">
          Das Löschen des Unternehmens ist unwiderruflich. Alle Daten, Agents und
          Konfigurationen werden dauerhaft entfernt.
        </p>
        <button
          disabled
          className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 opacity-50 cursor-not-allowed"
        >
          <span className="inline-flex items-center gap-2">
            <Trash2 className="h-3.5 w-3.5" />
            Unternehmen löschen
          </span>
        </button>
      </div>
    </div>
  );
}
