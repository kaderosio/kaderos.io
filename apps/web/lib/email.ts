/**
 * Email System — Onboarding + Transactional Emails
 * Provider: Resend (EU servers, GDPR-compliant)
 * Fallback: Console log wenn kein RESEND_API_KEY gesetzt
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.EMAIL_FROM ?? "KaderOS <noreply@kaderos.io>";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log(`[EMAIL STUB] To: ${to} | Subject: ${subject}`);
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        subject,
        html,
        reply_to: replyTo ?? "hello@kaderos.io",
      }),
    });
    return res.ok;
  } catch {
    console.error(`[EMAIL ERROR] Failed to send to ${to}`);
    return false;
  }
}

// ── Onboarding Sequence ──────────────────────────────────────────────

interface OnboardingData {
  name: string;
  email: string;
  templateName?: string;
  agentCount?: number;
}

const BRAND = {
  color: "#000088",
  logo: "https://kaderos.io/logo.png",
  footer: `
    <div style="margin-top:40px;padding-top:20px;border-top:1px solid #E5E5E7;color:#86868B;font-size:12px;">
      <p>KaderOS — Dein AI-Betriebssystem</p>
      <p><a href="https://kaderos.io" style="color:#000088;">kaderos.io</a> · <a href="https://github.com/kaderosio/kaderos.io" style="color:#000088;">GitHub</a></p>
      <p style="margin-top:8px;">Swiss Made. Open Source. CHF.</p>
    </div>
  `,
};

function wrap(content: string): string {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;padding:40px 20px;color:#1D1D1F;">
      <div style="margin-bottom:32px;">
        <span style="display:inline-block;width:32px;height:32px;background:${BRAND.color};border-radius:8px;text-align:center;line-height:32px;color:white;font-weight:800;font-size:14px;">K</span>
      </div>
      ${content}
      ${BRAND.footer}
    </div>
  `;
}

// Email 1 — Tag 0: Willkommen
export function emailWelcome(data: OnboardingData): SendEmailParams {
  return {
    to: data.email,
    subject: "Dein Kader steht bereit.",
    html: wrap(`
      <h2 style="font-size:24px;font-weight:700;margin-bottom:16px;">Hey ${data.name},</h2>
      <p style="color:#6E6E73;line-height:1.6;margin-bottom:16px;">
        Dein AI-Team ist aufgestellt. ${data.templateName ? `${data.templateName} — ` : ""}${data.agentCount ?? 3} Agents, bereit.
      </p>
      <p style="color:#6E6E73;line-height:1.6;margin-bottom:24px;">Was jetzt passiert:</p>
      <ol style="color:#6E6E73;line-height:1.8;padding-left:20px;">
        <li>Öffne dein Dashboard</li>
        <li>Schau dir dein Organigramm an</li>
        <li>Erstelle deinen ersten Task</li>
      </ol>
      <a href="https://kaderos.io/dashboard" style="display:inline-block;margin-top:24px;padding:12px 28px;background:${BRAND.color};color:white;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Dashboard öffnen</a>
      <p style="color:#86868B;margin-top:24px;font-size:13px;">Dein Kader wartet auf den ersten Auftrag.</p>
    `),
  };
}

// Email 2 — Tag 1: Use Case Story
export function emailUseCase(data: OnboardingData): SendEmailParams {
  return {
    to: data.email,
    subject: "So hat ein Solo-Founder sein erstes Kader aufgestellt.",
    html: wrap(`
      <h2 style="font-size:24px;font-weight:700;margin-bottom:16px;">Hey ${data.name},</h2>
      <p style="color:#6E6E73;line-height:1.6;margin-bottom:16px;">
        Simon, 29, Solo-Founder aus Zürich. 5 AI-Tools offen. Kein System.
      </p>
      <p style="color:#6E6E73;line-height:1.6;margin-bottom:16px;">
        Er hat das Startup-Template gewählt. 4 Agents. 5 Minuten Setup.
        Nach einer Woche: 23 Tasks erledigt. CHF 12 Kosten.
      </p>
      <p style="color:#6E6E73;line-height:1.6;margin-bottom:24px;">
        Der Trick? Er hat die Heartbeat Engine aktiviert. Seine Agents arbeiten jeden Morgen um 08:00 — automatisch.
      </p>
      <p style="color:#6E6E73;line-height:1.6;">Hast du die Heartbeat Engine schon aktiviert?</p>
      <a href="https://kaderos.io/dashboard/automation" style="display:inline-block;margin-top:24px;padding:12px 28px;background:${BRAND.color};color:white;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Automation einrichten</a>
    `),
  };
}

// Email 3 — Tag 3: Brain Teaser
export function emailBrainTeaser(data: OnboardingData): SendEmailParams {
  return {
    to: data.email,
    subject: "Was dein Kader letzte Nacht gemacht hat.",
    html: wrap(`
      <h2 style="font-size:24px;font-weight:700;margin-bottom:16px;">Hey ${data.name},</h2>
      <p style="color:#6E6E73;line-height:1.6;margin-bottom:16px;">
        Um 02:00 Uhr heute Nacht ist etwas passiert.
      </p>
      <p style="color:#6E6E73;line-height:1.6;margin-bottom:16px;">
        Dein Kader hat geträumt. Nicht wie ein Mensch. Aber ähnlich:
      </p>
      <ul style="color:#6E6E73;line-height:1.8;padding-left:20px;">
        <li>Unwichtiges vergessen</li>
        <li>Wichtiges verdichtet</li>
        <li>Verbindungen gezogen</li>
      </ul>
      <p style="color:#6E6E73;line-height:1.6;margin-top:16px;margin-bottom:16px;">
        Das ist der Dream Cycle. 7 Schichten Gedächtnis. Kein anderes AI-Tool hat das.
      </p>
      <p style="color:#6E6E73;line-height:1.6;">Dein Kader wird jeden Tag besser. Ohne dass du was tust.</p>
      <a href="https://kaderos.io/dashboard/gedaechtnis" style="display:inline-block;margin-top:24px;padding:12px 28px;background:${BRAND.color};color:white;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Memory-Ansicht öffnen</a>
    `),
  };
}

// Email 4 — Tag 7: Value Report
export function emailValueReport(data: OnboardingData & { taskCount: number; cost: string; decisionCount: number }): SendEmailParams {
  return {
    to: data.email,
    subject: `Diese Woche: ${data.taskCount} Tasks. Ohne dich.`,
    html: wrap(`
      <h2 style="font-size:24px;font-weight:700;margin-bottom:16px;">Hey ${data.name},</h2>
      <p style="color:#6E6E73;line-height:1.6;margin-bottom:24px;">Kurzer Report von deinem Kader:</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr style="border-bottom:1px solid #E5E5E7;">
          <td style="padding:12px 0;color:#86868B;">Tasks erledigt</td>
          <td style="padding:12px 0;text-align:right;font-weight:600;">${data.taskCount}</td>
        </tr>
        <tr style="border-bottom:1px solid #E5E5E7;">
          <td style="padding:12px 0;color:#86868B;">Kosten</td>
          <td style="padding:12px 0;text-align:right;font-weight:600;">CHF ${data.cost}</td>
        </tr>
        <tr style="border-bottom:1px solid #E5E5E7;">
          <td style="padding:12px 0;color:#86868B;">Agents aktiv</td>
          <td style="padding:12px 0;text-align:right;font-weight:600;">${data.agentCount ?? 3}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;color:#86868B;">Entscheidungen</td>
          <td style="padding:12px 0;text-align:right;font-weight:600;">${data.decisionCount}</td>
        </tr>
      </table>
      <p style="color:#6E6E73;line-height:1.6;">Dein Kader arbeitet. Auch wenn du nicht hinschaust.</p>
      <a href="https://kaderos.io/dashboard" style="display:inline-block;margin-top:24px;padding:12px 28px;background:${BRAND.color};color:white;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Dashboard öffnen</a>
    `),
  };
}

// Email 5 — Tag 14: Upgrade
export function emailUpgrade(data: OnboardingData & { taskCount: number }): SendEmailParams {
  return {
    to: data.email,
    subject: "3 Agents reichen dir nicht mehr?",
    html: wrap(`
      <h2 style="font-size:24px;font-weight:700;margin-bottom:16px;">Hey ${data.name},</h2>
      <p style="color:#6E6E73;line-height:1.6;margin-bottom:16px;">
        Dein Kader hat in 14 Tagen ${data.taskCount} Tasks erledigt. Mit 3 Agents. Stell dir vor was 10 könnten.
      </p>
      <div style="background:#F5F5F7;border-radius:12px;padding:24px;margin:24px 0;">
        <p style="font-weight:700;font-size:18px;margin-bottom:12px;">Pro: CHF 79/Monat</p>
        <ul style="color:#6E6E73;line-height:1.8;padding-left:20px;">
          <li>10 Agents statt 3</li>
          <li>Budget-Tracking in CHF</li>
          <li>Audit Trail</li>
          <li>5 Swiss Templates</li>
          <li>Email Support innert 24h</li>
        </ul>
      </div>
      <p style="color:#6E6E73;line-height:1.6;">Die Frage ist nicht ob. Sondern wann.</p>
      <a href="https://kaderos.io/dashboard/einstellungen?upgrade=pro" style="display:inline-block;margin-top:24px;padding:12px 28px;background:${BRAND.color};color:white;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Upgrade auf Pro</a>
    `),
  };
}

// ── Onboarding Scheduler ─────────────────────────────────────────────

export type OnboardingEmailType = "welcome" | "use-case" | "brain-teaser" | "value-report" | "upgrade";

export const ONBOARDING_SCHEDULE: { type: OnboardingEmailType; delayDays: number }[] = [
  { type: "welcome", delayDays: 0 },
  { type: "use-case", delayDays: 1 },
  { type: "brain-teaser", delayDays: 3 },
  { type: "value-report", delayDays: 7 },
  { type: "upgrade", delayDays: 14 },
];
