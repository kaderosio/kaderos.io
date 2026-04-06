import { createClient } from "@/utils/supabase/server";
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

function getBaseUrl(reqHeaders: Headers): string {
  const host = reqHeaders.get("host") ?? "localhost:3000";
  const proto = reqHeaders.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function POST() {
  const supabase = await createClient();
  const reqHeaders = await headers();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  const customerId = company.settings?.stripe_customer_id;
  if (!customerId) {
    return NextResponse.json(
      { error: "Kein aktives Abo gefunden" },
      { status: 400 }
    );
  }

  const baseUrl = getBaseUrl(reqHeaders);

  try {
    const session = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${baseUrl}/dashboard/einstellungen`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe portal error:", err);
    return NextResponse.json(
      { error: "Portal konnte nicht geöffnet werden" },
      { status: 500 }
    );
  }
}
