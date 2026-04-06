import { createClient } from "@/utils/supabase/server";
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();

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
      { error: "No company found" },
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

  const session = await getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: "https://kaderos.io/dashboard/einstellungen",
  });

  return NextResponse.json({ url: session.url });
}
