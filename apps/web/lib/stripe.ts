import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY nicht konfiguriert");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-03-25.dahlia',
    });
  }
  return _stripe;
}

/* ── Plan Configuration ─────────────────────────────────────────────── */

export const PLANS = {
  free: {
    name: 'Free',
    priceMonthly: 0, // in Rappen (CHF cents)
    agents: 3,
    stripePriceId: null,
  },
  pro: {
    name: 'Pro',
    priceMonthly: 7900, // CHF 79.00
    agents: 10,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? null,
  },
  business: {
    name: 'Business',
    priceMonthly: 19900, // CHF 199.00
    agents: -1, // unlimited
    stripePriceId: process.env.STRIPE_BUSINESS_PRICE_ID ?? null,
  },
} as const;

export type PlanKey = keyof typeof PLANS;
export const PLAN_ORDER: PlanKey[] = ['free', 'pro', 'business'];

// Prices are in Rappen (CHF cents) — Stripe uses smallest currency unit

/**
 * Resolve a Stripe price ID back to a plan key.
 * Returns 'free' if no match is found.
 */
export function resolvePlanFromPriceId(priceId: string): PlanKey {
  for (const [key, plan] of Object.entries(PLANS)) {
    if (plan.stripePriceId === priceId) {
      return key as PlanKey;
    }
  }
  return 'free';
}

/**
 * Format price in CHF from Rappen.
 */
export function formatCHF(rappen: number): string {
  return `CHF ${(rappen / 100).toFixed(0)}`;
}
