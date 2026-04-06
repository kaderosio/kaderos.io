import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY nicht konfiguriert");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    });
  }
  return _stripe;
}

export const PLANS = {
  community: {
    name: 'Community',
    priceMonthly: 0,
    priceYearly: 0,
    agents: 3,
    stripePriceMonthly: null,
    stripePriceYearly: null,
  },
  pro: {
    name: 'Pro',
    priceMonthly: 4900,
    priceYearly: 47040,
    agents: 10,
    stripePriceMonthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
    stripePriceYearly: process.env.STRIPE_PRICE_PRO_YEARLY,
  },
  team: {
    name: 'Team',
    priceMonthly: 14900,
    priceYearly: 143040,
    agents: 25,
    stripePriceMonthly: process.env.STRIPE_PRICE_TEAM_MONTHLY,
    stripePriceYearly: process.env.STRIPE_PRICE_TEAM_YEARLY,
  },
  agency: {
    name: 'Agency',
    priceMonthly: 34900,
    priceYearly: 335040,
    agents: -1, // unlimited
    stripePriceMonthly: process.env.STRIPE_PRICE_AGENCY_MONTHLY,
    stripePriceYearly: process.env.STRIPE_PRICE_AGENCY_YEARLY,
  },
} as const;

export type PlanKey = keyof typeof PLANS;

// Prices are in Rappen (CHF cents) — Stripe uses smallest currency unit
