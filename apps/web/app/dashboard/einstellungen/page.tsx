"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCompany } from "../layout";
import { useToast } from "../_components/toast";
import {
  Settings,
  Globe,
  Clock,
  Trash2,
  CreditCard,
  Check,
  ArrowUpRight,
  Zap,
  Building2,
  Users,
} from "lucide-react";

/* ── Plan Config (client-side mirror of lib/stripe.ts) ──────────────── */

const PLANS = {
  free: {
    name: "Free",
    price: "CHF 0",
    agents: 3,
    icon: Users,
    features: ["3 Agents", "Grundfunktionen", "Community Support"],
  },
  pro: {
    name: "Pro",
    price: "CHF 49",
    agents: 10,
    icon: Zap,
    features: [
      "10 Agents",
      "Alle Connectors",
      "3 Templates",
      "Priority Support",
    ],
  },
  business: {
    name: "Business",
    price: "CHF 199",
    agents: -1,
    icon: Building2,
    features: [
      "Unbegrenzte Agents",
      "Alle Connectors",
      "Unbegrenzte Templates",
      "White-Label",
      "Dedicated Support",
    ],
  },
} as const;

type PlanKey = keyof typeof PLANS;
const PLAN_ORDER: PlanKey[] = ["free", "pro", "business"];

/* ── Page ──────────────────────────────────────────────────────────── */

function EinstellungenContent() {
  const { companyId, companyName, loading } = useCompany();
  const [name, setName] = useState(companyName ?? "");
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const searchParams = useSearchParams();

  // Billing state
  const [currentPlan, setCurrentPlan] = useState<PlanKey>("free");
  const [hasStripeCustomer, setHasStripeCustomer] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(
    null
  );
  const [portalLoading, setPortalLoading] = useState(false);

  /* Show success/cancelled banner from Stripe redirect */
  const billingStatus = searchParams.get("billing");

  useEffect(() => {
    if (billingStatus === "success") {
      toast("Abo erfolgreich aktiviert!", "success");
    } else if (billingStatus === "cancelled") {
      toast("Checkout abgebrochen", "error");
    }
  }, [billingStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Sync initial value when context loads */
  useEffect(() => {
    if (companyName) setName(companyName);
  }, [companyName]);

  /* Load company settings to get current plan */
  useEffect(() => {
    if (!companyId) return;
    async function loadPlan() {
      try {
        const res = await fetch(`/api/companies/${companyId}`);
        if (!res.ok) return;
        const { company } = await res.json();
        const plan = company?.settings?.plan;
        if (plan && plan in PLANS) {
          setCurrentPlan(plan as PlanKey);
        }
        if (company?.settings?.stripe_customer_id) {
          setHasStripeCustomer(true);
        }
      } catch {
        /* silent */
      }
    }
    loadPlan();
  }, [companyId, billingStatus]);

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

  async function handleCheckout(plan: PlanKey) {
    if (plan === "free") return;
    setCheckoutLoading(plan);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast(data.error || "Checkout fehlgeschlagen", "error");
      }
    } catch {
      toast("Checkout fehlgeschlagen", "error");
    } finally {
      setCheckoutLoading(null);
    }
  }

  async function handlePortal() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast(data.error || "Portal konnte nicht geöffnet werden", "error");
      }
    } catch {
      toast("Portal konnte nicht geöffnet werden", "error");
    } finally {
      setPortalLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-gray-400">Einstellungen laden...</p>
      </div>
    );
  }

  const currentPlanIndex = PLAN_ORDER.indexOf(currentPlan);
  const CurrentIcon = PLANS[currentPlan].icon;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-2xl">
      <h1 className="text-xl font-bold text-gray-900">Einstellungen</h1>

      {/* Billing success banner */}
      {billingStatus === "success" && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 flex items-center gap-3">
          <Check className="h-5 w-5 text-green-600 shrink-0" />
          <p className="text-sm text-green-800">
            Dein Abo wurde erfolgreich aktiviert! Willkommen bei KaderOS{" "}
            {PLANS[currentPlan].name}.
          </p>
        </div>
      )}

      {/* ── Abo & Abrechnung ──────────────────────────────────────────── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-5">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-[#000088]" />
          <h2 className="text-sm font-semibold text-gray-900">
            Abo & Abrechnung
          </h2>
        </div>

        {/* Current plan display */}
        <div className="rounded-lg border border-[#000088]/20 bg-[#000088]/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#000088]/10">
                <CurrentIcon className="h-4 w-4 text-[#000088]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {PLANS[currentPlan].name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {currentPlan === "free"
                    ? "Kostenlos"
                    : `${PLANS[currentPlan].price}/Monat`}
                </p>
              </div>
            </div>
            {hasStripeCustomer && (
              <button
                onClick={handlePortal}
                disabled={portalLoading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <ArrowUpRight className="h-3 w-3" />
                {portalLoading ? "..." : "Abo verwalten"}
              </button>
            )}
          </div>
          <ul className="space-y-1">
            {PLANS[currentPlan].features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-xs text-gray-600"
              >
                <Check className="h-3 w-3 text-[#000088]" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Upgrade options */}
        {currentPlan !== "business" && (
          <div className="grid gap-3">
            {PLAN_ORDER.filter((_, i) => i > currentPlanIndex).map(
              (planKey) => {
                const plan = PLANS[planKey];
                const PlanIcon = plan.icon;
                return (
                  <div
                    key={planKey}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:border-[#000088]/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                        <PlanIcon className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {plan.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {plan.price}/Monat{" "}
                          {plan.agents === -1
                            ? "— Unbegrenzte Agents"
                            : `— ${plan.agents} Agents`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCheckout(planKey)}
                      disabled={checkoutLoading === planKey}
                      className="rounded-lg bg-[#000088] px-4 py-2 text-xs font-medium text-white hover:bg-[#000066] disabled:opacity-50 transition-colors"
                    >
                      {checkoutLoading === planKey ? "..." : "Upgrade"}
                    </button>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>

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
            <label className="block text-xs font-medium text-gray-500">
              Locale
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              <Globe className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-sm text-gray-700">de-CH</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-500">
              Zeitzone
            </label>
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
          Das Löschen des Unternehmens ist unwiderruflich. Alle Daten, Agents
          und Konfigurationen werden dauerhaft entfernt.
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

export default function EinstellungenPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <span className="text-gray-400">Laden...</span>
        </div>
      }
    >
      <EinstellungenContent />
    </Suspense>
  );
}
