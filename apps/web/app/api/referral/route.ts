import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

/**
 * Supabase Schema (nicht automatisch ausgeführt — manuell migrieren):
 *
 * ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;
 * ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS referred_by TEXT;
 * ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS referral_count INTEGER DEFAULT 0;
 *
 * -- Trigger: Auto-generate referral_code on insert
 * CREATE OR REPLACE FUNCTION generate_referral_code()
 * RETURNS TRIGGER AS $$
 * BEGIN
 *   NEW.referral_code := LOWER(SUBSTR(MD5(NEW.email || NOW()::TEXT), 1, 8));
 *   RETURN NEW;
 * END;
 * $$ LANGUAGE plpgsql;
 *
 * CREATE TRIGGER set_referral_code
 *   BEFORE INSERT ON waitlist
 *   FOR EACH ROW
 *   WHEN (NEW.referral_code IS NULL)
 *   EXECUTE FUNCTION generate_referral_code();
 *
 * -- Index für schnelle Lookups
 * CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist(referral_code);
 * CREATE INDEX IF NOT EXISTS idx_waitlist_referred_by ON waitlist(referred_by);
 */

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );
}

const POSITIONS_PER_REFERRAL = 50;
const REFERRALS_NEEDED = 3;

/**
 * GET /api/referral?code=XXXX
 * Referral Stats für einen User (position, referral_count, referral_code)
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    // Leaderboard: Top 10 Referrer (anonymisiert)
    const { data: leaderboard } = await getSupabase()
      .from("waitlist")
      .select("email, referral_count, created_at")
      .gt("referral_count", 0)
      .order("referral_count", { ascending: false })
      .limit(10);

    const { count: totalCount } = await getSupabase()
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      leaderboard: (leaderboard || []).map((entry) => ({
        // Anonymisiert: "T.S. aus Zürich" — wir zeigen Initialen + Count
        name: anonymize(entry.email),
        referral_count: entry.referral_count,
      })),
      total_waitlist: totalCount || 0,
    });
  }

  // Stats für spezifischen Referral Code
  const { data: user } = await getSupabase()
    .from("waitlist")
    .select("position, referral_count, referral_code, email")
    .eq("referral_code", code)
    .single();

  if (!user) {
    return NextResponse.json({ error: "Referral code nicht gefunden" }, { status: 404 });
  }

  // Effektive Position berechnen (Original-Position minus Bonus)
  const bonus = Math.min(user.referral_count, REFERRALS_NEEDED) * POSITIONS_PER_REFERRAL;
  const effectivePosition = Math.max(1, (user.position || 1) - bonus);

  return NextResponse.json({
    referral_code: user.referral_code,
    referral_count: user.referral_count || 0,
    original_position: user.position,
    effective_position: effectivePosition,
    positions_skipped: bonus,
    referrals_needed: REFERRALS_NEEDED,
    positions_per_referral: POSITIONS_PER_REFERRAL,
    goal_reached: (user.referral_count || 0) >= REFERRALS_NEEDED,
  });
}

/**
 * POST /api/referral
 * Referral tracken: Wenn jemand sich über einen Referral Link anmeldet,
 * wird der referral_count des Referrers erhöht.
 *
 * Body: { referred_by: "REFERRAL_CODE" }
 */
export async function POST(req: NextRequest) {
  try {
    const { referred_by } = await req.json();

    if (!referred_by) {
      return NextResponse.json({ error: "referred_by ist erforderlich" }, { status: 400 });
    }

    // Referrer finden und Count erhöhen
    const { data: referrer, error: findError } = await getSupabase()
      .from("waitlist")
      .select("id, referral_count")
      .eq("referral_code", referred_by)
      .single();

    if (findError || !referrer) {
      return NextResponse.json({ error: "Referrer nicht gefunden" }, { status: 404 });
    }

    const { error: updateError } = await getSupabase()
      .from("waitlist")
      .update({ referral_count: (referrer.referral_count || 0) + 1 })
      .eq("id", referrer.id);

    if (updateError) {
      console.error("Referral count update error:", updateError);
      return NextResponse.json({ error: "Update fehlgeschlagen" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      new_count: (referrer.referral_count || 0) + 1,
    });
  } catch (e) {
    console.error("Referral error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/**
 * E-Mail anonymisieren: "thesh.sritharan@gmail.com" → "T.S."
 */
function anonymize(email: string): string {
  const local = email.split("@")[0];
  // Versuche Vor- und Nachname aus der E-Mail zu extrahieren
  const parts = local.split(/[._-]/);
  if (parts.length >= 2) {
    return `${parts[0][0].toUpperCase()}.${parts[1][0].toUpperCase()}.`;
  }
  return `${local[0].toUpperCase()}.${local[1]?.toUpperCase() || "X"}.`;
}
