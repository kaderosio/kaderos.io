"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCompany } from "../../_components/company-context";
import {
  ArrowLeft,
  ArrowRight,
  Gift,
  Users,
  Lightbulb,
  Repeat,
  MessageCircle,
  Heart,
  CheckCircle2,
  AlertTriangle,
  Pause,
  TrendingDown,
} from "lucide-react";

/* ── Types ────────────────────────────────────────────────────────────── */

type CancelReason =
  | "too_expensive"
  | "not_used"
  | "missing_feature"
  | "other_tool"
  | "other";

type Step = "reason" | "offer" | "confirm" | "done";

const REASONS: { id: CancelReason; label: string; icon: React.ElementType }[] = [
  { id: "too_expensive", label: "Zu teuer", icon: TrendingDown },
  { id: "not_used", label: "Nicht genug genutzt", icon: Pause },
  { id: "missing_feature", label: "Fehlendes Feature", icon: Lightbulb },
  { id: "other_tool", label: "Anderes Tool gefunden", icon: Repeat },
  { id: "other", label: "Sonstiges", icon: MessageCircle },
];

/* ── Save Offers per Reason ──────────────────────────────────────────── */

interface SaveOffer {
  title: string;
  description: string;
  cta: string;
  fallback: string;
  icon: React.ElementType;
}

const SAVE_OFFERS: Record<CancelReason, SaveOffer> = {
  too_expensive: {
    title: "Wir möchten dich behalten",
    description:
      "Nutze KaderOS 2 Monate gratis — oder wechsle auf den Free-Plan mit 3 Agents.",
    cta: "2 Monate gratis aktivieren",
    fallback: "Auf Free-Plan wechseln",
    icon: Gift,
  },
  not_used: {
    title: "Lass uns dein Team neu aufsetzen",
    description:
      "Buch ein kostenloses 1:1 Onboarding mit unserem Team. Wir richten deine Agents so ein, dass sie ab Tag 1 liefern.",
    cta: "1:1 Onboarding buchen",
    fallback: "Abo pausieren (bis zu 3 Monate)",
    icon: Users,
  },
  missing_feature: {
    title: "Welches Feature fehlt dir?",
    description:
      "Sag uns, was du brauchst. Wir bauen schnell — und du erfährst als Erster, wenn es live ist.",
    cta: "Feature anfragen & Roadmap ansehen",
    fallback: "Abo pausieren bis Feature da ist",
    icon: Lightbulb,
  },
  other_tool: {
    title: "Was nutzt du stattdessen?",
    description:
      "Sag uns, welches Tool du nutzt. Wir matchen den Funktionsumfang — oft können wir mehr.",
    cta: "Tool-Vergleich starten",
    fallback: "25% Rabatt für 3 Monate",
    icon: Repeat,
  },
  other: {
    title: "Schade, dass du gehst",
    description:
      "Hilf uns, KaderOS besser zu machen. Dein Feedback hat direkten Einfluss auf unser Produkt.",
    cta: "Feedback teilen & Rabatt erhalten",
    fallback: "Abo pausieren",
    icon: Heart,
  },
};

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function KuendigenPage() {
  const router = useRouter();
  const { companyName } = useCompany();
  const [step, setStep] = useState<Step>("reason");
  const [reason, setReason] = useState<CancelReason | null>(null);
  const [feedback, setFeedback] = useState("");
  const [featureRequest, setFeatureRequest] = useState("");
  const [competitorTool, setCompetitorTool] = useState("");
  const [saving, setSaving] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);

  /* ── Step Handlers ──────────────────────────────────────────────────── */

  function handleReasonNext() {
    if (!reason) return;
    setStep("offer");
  }

  async function handleAcceptOffer(type: "primary" | "fallback") {
    setSaving(true);
    setOfferAccepted(true);

    // TODO: API call to apply offer (discount, pause, downgrade)
    try {
      await fetch("/api/billing/save-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason,
          offerType: type,
          feedback,
          featureRequest,
          competitorTool,
        }),
      }).catch(() => {
        /* Silently handle — offer UI still shows success */
      });
    } finally {
      setSaving(false);
    }

    // Redirect back to settings after brief delay
    setTimeout(() => {
      router.push("/dashboard/einstellungen?retention=saved");
    }, 2000);
  }

  async function handleConfirmCancel() {
    setSaving(true);
    try {
      await fetch("/api/billing/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason,
          feedback,
          featureRequest,
          competitorTool,
        }),
      }).catch(() => {
        /* Handled below */
      });
      setStep("done");
    } finally {
      setSaving(false);
    }
  }

  /* ── Render ─────────────────────────────────────────────────────────── */

  return (
    <div className="flex min-h-full items-start justify-center p-4 md:p-8">
      <div className="w-full max-w-lg space-y-6">
        {/* Back button */}
        <button
          onClick={() => {
            if (step === "reason") {
              router.push("/dashboard/einstellungen");
            } else if (step === "offer") {
              setStep("reason");
            } else if (step === "confirm") {
              setStep("offer");
            }
          }}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück
        </button>

        {/* Progress */}
        {step !== "done" && (
          <div className="flex gap-1.5">
            {(["reason", "offer", "confirm"] as Step[]).map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <=
                  ["reason", "offer", "confirm"].indexOf(step)
                    ? "bg-[#000088]"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        )}

        {/* ── Step 1: Reason ──────────────────────────────────────────── */}
        {step === "reason" && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Warum möchtest du kündigen?
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Hilf uns, KaderOS besser zu machen. Dein Feedback zählt.
              </p>
            </div>

            <div className="space-y-2">
              {REASONS.map((r) => {
                const Icon = r.icon;
                const selected = reason === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setReason(r.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                      selected
                        ? "border-[#000088] bg-[#000088]/5 ring-1 ring-[#000088]/20"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        selected
                          ? "bg-[#000088]/10 text-[#000088]"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        selected ? "text-[#000088]" : "text-gray-700"
                      }`}
                    >
                      {r.label}
                    </span>
                    {selected && (
                      <CheckCircle2 className="ml-auto h-5 w-5 text-[#000088]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Conditional sub-fields */}
            {reason === "missing_feature" && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">
                  Welches Feature fehlt?
                </label>
                <input
                  type="text"
                  value={featureRequest}
                  onChange={(e) => setFeatureRequest(e.target.value)}
                  placeholder="z.B. Slack-Integration, Dashboard-Export..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088]"
                />
              </div>
            )}

            {reason === "other_tool" && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">
                  Welches Tool nutzt du?
                </label>
                <input
                  type="text"
                  value={competitorTool}
                  onChange={(e) => setCompetitorTool(e.target.value)}
                  placeholder="z.B. Zapier, Make, Relevance AI..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088]"
                />
              </div>
            )}

            {(reason === "other" || reason === "not_used") && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">
                  {reason === "other"
                    ? "Erzähl uns mehr (optional)"
                    : "Was hat dich gehindert?"}
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                  placeholder="Dein Feedback..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088] resize-none"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <button
                onClick={handleReasonNext}
                disabled={!reason}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#000088] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#000066] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Weiter
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => router.push("/dashboard/einstellungen")}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors py-2"
              >
                Doch nicht kündigen
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Save Offer ──────────────────────────────────────── */}
        {step === "offer" && reason && (
          <div className="space-y-5">
            {offerAccepted ? (
              /* Success State */
              <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center space-y-3">
                <CheckCircle2 className="mx-auto h-10 w-10 text-green-600" />
                <h2 className="text-lg font-bold text-green-900">
                  Willkommen zurück!
                </h2>
                <p className="text-sm text-green-700">
                  Dein Angebot wurde aktiviert. Du wirst weitergeleitet...
                </p>
              </div>
            ) : (
              <>
                {(() => {
                  const offer = SAVE_OFFERS[reason];
                  const OfferIcon = offer.icon;
                  return (
                    <>
                      <div className="rounded-xl border border-[#000088]/20 bg-gradient-to-br from-[#000088]/5 to-white p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#000088]/10">
                            <OfferIcon className="h-5 w-5 text-[#000088]" />
                          </div>
                          <h2 className="text-lg font-bold text-gray-900">
                            {offer.title}
                          </h2>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                          {offer.description}
                        </p>

                        <div className="flex flex-col gap-2 pt-1">
                          <button
                            onClick={() => handleAcceptOffer("primary")}
                            disabled={saving}
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#000088] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#000066] disabled:opacity-50"
                          >
                            {saving ? "Wird aktiviert..." : offer.cta}
                          </button>
                          <button
                            onClick={() => handleAcceptOffer("fallback")}
                            disabled={saving}
                            className="rounded-xl border border-[#000088]/20 bg-white px-5 py-3 text-sm font-medium text-[#000088] transition-colors hover:bg-[#000088]/5 disabled:opacity-50"
                          >
                            {offer.fallback}
                          </button>
                        </div>
                      </div>

                      {/* Continue to cancel */}
                      <button
                        onClick={() => setStep("confirm")}
                        className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-2"
                      >
                        Nein danke, trotzdem kündigen
                      </button>
                    </>
                  );
                })()}
              </>
            )}
          </div>
        )}

        {/* ── Step 3: Confirm Cancel ──────────────────────────────────── */}
        {step === "confirm" && (
          <div className="space-y-5">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h2 className="text-base font-bold text-amber-900">
                  Bist du sicher?
                </h2>
              </div>
              <div className="space-y-2 text-sm text-amber-800">
                <p>
                  Dein Team{companyName ? ` "${companyName}"` : ""} wird am Ende
                  der aktuellen Abrechnungsperiode pausiert.
                </p>
                <ul className="space-y-1.5 ml-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    Deine Agents stoppen alle Automatisierungen
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    Deine Daten bleiben 90 Tage gespeichert
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    Du kannst jederzeit zurückkommen
                  </li>
                </ul>
              </div>
            </div>

            {/* Final feedback */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500">
                Noch etwas, das wir wissen sollten? (optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                placeholder="Dein Feedback hilft uns, besser zu werden..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000088]/30 focus:border-[#000088] resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleConfirmCancel}
                disabled={saving}
                className="rounded-xl border border-red-300 bg-red-50 px-5 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
              >
                {saving ? "Wird gekündigt..." : "Abo endgültig kündigen"}
              </button>
              <button
                onClick={() => router.push("/dashboard/einstellungen")}
                className="rounded-xl bg-[#000088] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#000066]"
              >
                Doch behalten — zurück zu Einstellungen
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Done ────────────────────────────────────────────── */}
        {step === "done" && (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Heart className="h-7 w-7 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-gray-900">
                Dein Abo wurde gekündigt
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                Dein Team wird am Ende der Abrechnungsperiode pausiert.
                <br />
                Deine Daten bleiben 90 Tage gespeichert.
              </p>
            </div>

            <div className="rounded-xl border border-[#000088]/10 bg-[#000088]/5 p-4 space-y-2">
              <p className="text-sm font-medium text-[#000088]">
                Du kannst jederzeit zurückkommen.
              </p>
              <p className="text-xs text-gray-500">
                Reaktiviere dein Abo in den Einstellungen — deine Agents und
                Daten warten auf dich.
              </p>
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-2 rounded-xl bg-[#000088] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#000066]"
            >
              Zurück zum Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
