import { createClient } from "@/utils/supabase/server";
import { getStripe, PLANS, PlanKey } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

function getBaseUrl(reqHeaders: Headers): string {
  const host = reqHeaders.get("host") ?? "localhost:3000";
  const proto = reqHeaders.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const reqHeaders = await headers();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { plan } = body as { plan: PlanKey };

  if (!plan || plan === "free" || !PLANS[plan]) {
    return NextResponse.json(
      { error: "Ungültiger Plan" },
      { status: 400 }
    );
  }

  const planConfig = PLANS[plan];
  const priceId = planConfig.stripePriceId;

  if (!priceId) {
    return NextResponse.json(
      { error: "Stripe Price ID nicht konfiguriert für diesen Plan" },
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
      { error: "Kein Unternehmen gefunden" },
      { status: 404 }
    );
  }

  const baseUrl = getBaseUrl(reqHeaders);

  // If company already has a Stripe customer, reuse it
  const existingCustomerId = company.settings?.stripe_customer_id;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sessionParams: any = {
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    currency: "chf",
    success_url: `${baseUrl}/dashboard/einstellungen?billing=success`,
    cancel_url: `${baseUrl}/dashboard/einstellungen?billing=cancelled`,
    metadata: {
      companyId: company.id,
      userId: user.id,
      plan,
    },
    client_reference_id: company.id,
  };

  if (existingCustomerId) {
    sessionParams.customer = existingCustomerId;
  } else {
    sessionParams.customer_email = user.email;
  }

  try {
    const session = await getStripe().checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Checkout konnte nicht erstellt werden" },
      { status: 500 }
    );
  }
}
