import { getStripe, PLANS, PlanKey } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Service-role client for webhook (no user auth)
function getServiceSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// Map Stripe price IDs back to plan keys
function resolvePlanFromPriceId(priceId: string): PlanKey {
  for (const [key, plan] of Object.entries(PLANS)) {
    if (
      plan.stripePriceMonthly === priceId ||
      plan.stripePriceYearly === priceId
    ) {
      return key as PlanKey;
    }
  }
  return "community";
}

async function updateCompanyPlan(
  companyId: string,
  updates: Record<string, unknown>
) {
  const supabase = getServiceSupabase();

  // Fetch existing settings first
  const { data: company } = await supabase
    .from("companies")
    .select("settings")
    .eq("id", companyId)
    .single();

  const existingSettings = company?.settings ?? {};

  await supabase
    .from("companies")
    .update({
      settings: { ...existingSettings, ...updates },
    })
    .eq("id", companyId);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const companyId = session.metadata?.companyId;
      const plan = session.metadata?.plan as PlanKey | undefined;

      if (!companyId || !plan) {
        console.error("Webhook: missing metadata on checkout session");
        break;
      }

      // Retrieve subscription to get customer ID
      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id;

      await updateCompanyPlan(companyId, {
        plan,
        stripe_customer_id:
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id,
        stripe_subscription_id: subscriptionId,
      });

      console.log(
        `Checkout complete: company=${companyId} plan=${plan}`
      );
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const priceId = subscription.items.data[0]?.price?.id;
      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer?.id;

      if (!priceId || !customerId) break;

      const newPlan = resolvePlanFromPriceId(priceId);

      // Find company by stripe_customer_id
      const supabase = getServiceSupabase();
      const { data: companies } = await supabase
        .from("companies")
        .select("id, settings")
        .filter("settings->>stripe_customer_id", "eq", customerId)
        .limit(1);

      const company = companies?.[0];
      if (!company) {
        console.error(
          `Webhook: no company found for customer ${customerId}`
        );
        break;
      }

      await updateCompanyPlan(company.id, {
        plan: newPlan,
        stripe_subscription_id: subscription.id,
      });

      console.log(
        `Subscription updated: company=${company.id} plan=${newPlan}`
      );
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer?.id;

      if (!customerId) break;

      const supabase = getServiceSupabase();
      const { data: companies } = await supabase
        .from("companies")
        .select("id, settings")
        .filter("settings->>stripe_customer_id", "eq", customerId)
        .limit(1);

      const company = companies?.[0];
      if (!company) break;

      await updateCompanyPlan(company.id, {
        plan: "community",
        stripe_subscription_id: null,
      });

      console.log(
        `Subscription deleted: company=${company.id} downgraded to community`
      );
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      const customerId =
        typeof invoice.customer === "string"
          ? invoice.customer
          : invoice.customer?.id;

      console.warn(
        `Payment failed: customer=${customerId} invoice=${invoice.id}`
      );
      break;
    }

    default:
      // Unhandled event type — ignore
      break;
  }

  return NextResponse.json({ received: true });
}
