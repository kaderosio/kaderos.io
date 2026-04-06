import { createClient } from "@/utils/supabase/server";
import { getStripe, PLANS, PlanKey } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { plan, interval } = body as {
    plan: "pro" | "team" | "agency";
    interval: "monthly" | "yearly";
  };

  if (!plan || !interval || !PLANS[plan]) {
    return NextResponse.json(
      { error: "Invalid plan or interval" },
      { status: 400 }
    );
  }

  const planConfig = PLANS[plan];
  const priceId =
    interval === "yearly"
      ? planConfig.stripePriceYearly
      : planConfig.stripePriceMonthly;

  if (!priceId) {
    return NextResponse.json(
      { error: "Stripe price not configured for this plan" },
      { status: 500 }
    );
  }

  // Get user's company
  const { data: companies } = await supabase
    .from("companies")
    .select("id, settings")
    .eq("settings->>owner_id", user.id)
    .limit(1);

  const company = companies?.[0];
  if (!company) {
    return NextResponse.json(
      { error: "No company found" },
      { status: 404 }
    );
  }

  // If company already has a Stripe customer, reuse it
  const existingCustomerId = company.settings?.stripe_customer_id;

  const sessionParams: Record<string, unknown> = {
    mode: "subscription" as const,
    line_items: [{ price: priceId, quantity: 1 }],
    currency: "chf",
    success_url:
      "https://kaderos.io/dashboard/einstellungen?billing=success",
    cancel_url:
      "https://kaderos.io/dashboard/einstellungen?billing=cancelled",
    metadata: {
      companyId: company.id,
      userId: user.id,
      plan,
      interval,
    },
    client_reference_id: company.id,
  };

  if (existingCustomerId) {
    sessionParams.customer = existingCustomerId;
  } else {
    sessionParams.customer_email = user.email;
  }

  const session = await getStripe().checkout.sessions.create(sessionParams as any);

  return NextResponse.json({ url: session.url });
}
