import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email, source, referred_by } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Check if already exists
    const { data: existing } = await supabase
      .from("waitlist")
      .select("position, referral_code")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (existing) {
      return NextResponse.json({
        success: true,
        position: existing.position,
        referral_code: existing.referral_code,
        already_registered: true,
      });
    }

    // Get current count for position
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    const position = (count || 0) + 1;

    // Insert
    const { data, error } = await supabase
      .from("waitlist")
      .insert({
        email: email.toLowerCase().trim(),
        source: source || "landing",
        referred_by: referred_by || null,
      })
      .select("position, referral_code")
      .single();

    if (error) {
      if (error.code === "23505") {
        // Unique violation — race condition
        return NextResponse.json({ error: "Already registered" }, { status: 409 });
      }
      console.error("Waitlist insert error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // Referral Count beim Referrer erhöhen
    if (referred_by) {
      await supabase.rpc("increment_referral_count", { ref_code: referred_by }).catch(() => {
        // Fallback: manuelles Update
        supabase
          .from("waitlist")
          .select("id, referral_count")
          .eq("referral_code", referred_by)
          .single()
          .then(({ data: referrer }) => {
            if (referrer) {
              supabase
                .from("waitlist")
                .update({ referral_count: (referrer.referral_count || 0) + 1 })
                .eq("id", referrer.id)
                .then(() => {});
            }
          });
      });
    }

    return NextResponse.json({
      success: true,
      position: data.position,
      referral_code: data.referral_code,
      already_registered: false,
    });
  } catch (e) {
    console.error("Waitlist error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const { count } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  return NextResponse.json({ count: count || 0 });
}
