import { SupabaseClient } from "@supabase/supabase-js";

export async function verifyCompanyOwnership(
  supabase: SupabaseClient,
  companyId: string,
  userId: string
): Promise<boolean> {
  const { data } = await supabase
    .from("companies")
    .select("id")
    .eq("id", companyId)
    .filter("settings->>owner_id", "eq", userId)
    .single();
  return !!data;
}
