import { createClient } from "@/utils/supabase/server";
import {
  sendEmail,
  emailWelcome,
  emailUseCase,
  emailBrainTeaser,
  emailValueReport,
  emailUpgrade,
  ONBOARDING_SCHEDULE,
  type OnboardingEmailType,
} from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/email/onboarding
 * Triggers onboarding emails for users based on their signup date.
 * Called by Vercel Cron or manually.
 *
 * Body: { type: "welcome" } — send specific email to newly signed up user
 * No body: batch process all pending onboarding emails
 */
export async function POST(req: NextRequest) {
  // Verify cron secret or auth
  const cronSecret = req.headers.get("x-cron-secret");
  if (cronSecret !== process.env.CRON_SECRET) {
    // Fallback: check if authenticated admin
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }
  }

  const body = await req.json().catch(() => ({}));

  // Single email trigger (e.g., on signup)
  if (body.type === "welcome" && body.email && body.name) {
    const params = emailWelcome({
      name: body.name,
      email: body.email,
      templateName: body.templateName,
      agentCount: body.agentCount,
    });
    const ok = await sendEmail(params);
    return NextResponse.json({ sent: ok });
  }

  // Batch: process all users needing onboarding emails
  const supabase = await createClient();
  const { data: users } = await supabase
    .from("companies")
    .select("id, name, owner_id, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (!users?.length) {
    return NextResponse.json({ processed: 0 });
  }

  let sent = 0;

  for (const company of users) {
    // Get user email
    const { data: profile } = await supabase.auth.admin.getUserById(company.owner_id);
    if (!profile?.user?.email) continue;

    const daysSinceSignup = Math.floor(
      (Date.now() - new Date(company.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );

    // Find which email to send based on days since signup
    for (const step of ONBOARDING_SCHEDULE) {
      if (daysSinceSignup === step.delayDays) {
        const data = {
          name: company.name,
          email: profile.user.email,
          agentCount: 3,
        };

        let params;
        switch (step.type as OnboardingEmailType) {
          case "welcome":
            params = emailWelcome(data);
            break;
          case "use-case":
            params = emailUseCase(data);
            break;
          case "brain-teaser":
            params = emailBrainTeaser(data);
            break;
          case "value-report":
            // Fetch actual stats
            const { count: taskCount } = await supabase
              .from("tasks")
              .select("*", { count: "exact", head: true })
              .eq("company_id", company.id)
              .eq("status", "done");
            const { count: decisionCount } = await supabase
              .from("decisions")
              .select("*", { count: "exact", head: true })
              .eq("company_id", company.id);
            params = emailValueReport({
              ...data,
              taskCount: taskCount ?? 0,
              cost: "0.00",
              decisionCount: decisionCount ?? 0,
            });
            break;
          case "upgrade":
            const { count: totalTasks } = await supabase
              .from("tasks")
              .select("*", { count: "exact", head: true })
              .eq("company_id", company.id)
              .eq("status", "done");
            params = emailUpgrade({ ...data, taskCount: totalTasks ?? 0 });
            break;
        }

        if (params) {
          const ok = await sendEmail(params);
          if (ok) sent++;
        }
      }
    }
  }

  return NextResponse.json({ processed: users.length, sent });
}
