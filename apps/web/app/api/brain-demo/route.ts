import { NextRequest, NextResponse } from "next/server";

const BRAIN_API = "https://agent-brain-production-1064.up.railway.app";
const DEMO_WORKSPACE = process.env.BRAIN_WORKSPACE_ID ?? "b00d8f28-88a1-4516-8089-94064f4d4f48";
const DEMO_API_KEY = process.env.BRAIN_API_KEY ?? "brain_GdmP4i8lspBWLpXcCQZ15ENYhvbZRVaTBEwq_sqfltU";

// Simple in-memory rate limit (per IP, 10 requests per minute)
const rateLimit = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + 60000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Zu viele Anfragen. Warte kurz." }, { status: 429 });
  }

  const { action, content, query } = await req.json();

  if (action === "store" && content) {
    const res = await fetch(`${BRAIN_API}/memory/store`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": DEMO_API_KEY },
      body: JSON.stringify({
        workspace_id: DEMO_WORKSPACE,
        content: content.slice(0, 500), // Limit input length
        source_trust: 0.5,
        agent_id: "demo-visitor",
      }),
    });
    if (!res.ok) return NextResponse.json({ error: "Brain nicht erreichbar" }, { status: 502 });
    return NextResponse.json(await res.json());
  }

  if (action === "recall" && query) {
    const res = await fetch(`${BRAIN_API}/memory/recall`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": DEMO_API_KEY },
      body: JSON.stringify({
        workspace_id: DEMO_WORKSPACE,
        query: query.slice(0, 200),
        limit: 5,
      }),
    });
    if (!res.ok) return NextResponse.json({ error: "Brain nicht erreichbar" }, { status: 502 });
    return NextResponse.json(await res.json());
  }

  return NextResponse.json({ error: "Ungültige Aktion" }, { status: 400 });
}
