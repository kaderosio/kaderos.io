"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Github, Shield, Users,
  Check, Lock,
  BarChart3, MessageSquare, Activity,
  Building2, DollarSign, Layers, Plug,
  Target, ShieldCheck, Settings,
  X
} from "lucide-react";

// ── ANIMATED NUMBER ───────────────────────────────────────────────────────
function AnimNum({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [go, setGo] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!go) return;
    let c = 0;
    const step = target / 50;
    const t = setInterval(() => { c += step; if (c >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(c)); }, 30);
    return () => clearInterval(t);
  }, [go, target]);
  return <span ref={ref}>{count.toLocaleString("de-CH")}{suffix}</span>;
}

// ── WAITLIST FORM ─────────────────────────────────────────────────────────
function WaitlistForm({ variant = "default" }: { variant?: "default" | "hero" }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pos, setPos] = useState(0);
  const [refCode, setRefCode] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || loading) return;
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "landing",
          referred_by: params.get("ref") || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPos(data.position);
        setRefCode(data.referral_code);
        setDone(true);
      } else {
        setError(data.error === "Already registered" ? "Du bist bereits auf der Waitlist!" : "Etwas ist schiefgelaufen.");
      }
    } catch {
      setError("Verbindungsfehler. Bitte nochmal versuchen.");
    }
    setLoading(false);
  };

  if (done) return (
    <div className="text-center py-4 space-y-3">
      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#059669]/10 border border-[#059669]/20 rounded-full">
        <Check size={16} className="text-[#059669]" />
        <span className="text-[14px] font-medium text-[#059669]">Du bist #{pos} auf der Waitlist</span>
      </div>
      {refCode && (
        <div className="text-[12px] text-[#86868B]">
          Teile deinen Link — rück 10 Plätze vor pro Referral:<br />
          <button onClick={() => navigator.clipboard.writeText(`https://kaderos.io/?ref=${refCode}`)}
            className="mt-1 px-3 py-1 bg-[#F5F5F7] rounded-lg text-[#000088] font-medium hover:bg-[#E5E5EA] transition-colors">
            kaderos.io?ref={refCode} — kopieren
          </button>
        </div>
      )}
    </div>
  );

  return (
    <form onSubmit={submit} className={`flex flex-col sm:flex-row gap-3 ${variant === "hero" ? "max-w-xl mx-auto" : ""}`}>
      <div className="flex-1">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="deine@email.ch"
          className="w-full px-5 py-3.5 bg-white border border-[#D2D2D7] rounded-xl text-[14px] text-[#1D1D1F] placeholder:text-[#C7C7CC] outline-none focus:border-[#000088] focus:shadow-[0_0_0_3px_#00008810] transition-all" />
        {error && <div className="text-[11px] text-[#DC2626] mt-1 ml-1">{error}</div>}
      </div>
      <button type="submit" disabled={loading}
        className={`px-7 py-3.5 bg-[#000088] text-white text-[14px] font-semibold rounded-xl flex items-center gap-2 transition-all shrink-0 ${loading ? "opacity-60" : "hover:bg-[#000066] hover:shadow-lg active:scale-[0.98]"}`}>
        {loading ? (
          <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Wird gesendet</>
        ) : (
          <>Platz sichern <ArrowRight size={16} /></>
        )}
      </button>
    </form>
  );
}

// ── MAIN LANDING PAGE ─────────────────────────────────────────────────────
export default function LandingPage() {
  const WAITLIST_OFFSET = 54;
  const [waitlistN, setWaitlistN] = useState(WAITLIST_OFFSET);

  useEffect(() => {
    fetch("/api/waitlist").then(r => r.json()).then(d => setWaitlistN((d.count || 0) + WAITLIST_OFFSET)).catch(() => {});
    const i = setInterval(() => {
      fetch("/api/waitlist").then(r => r.json()).then(d => setWaitlistN((d.count || 0) + WAITLIST_OFFSET)).catch(() => {});
    }, 30000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] overflow-hidden">
      <style>{`
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes pulseGlow { 0%,100% { box-shadow:0 0 15px #00008815; } 50% { box-shadow:0 0 30px #00008825; } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }

        .s1 { animation: fadeIn .7s ease .1s forwards; opacity:0; }
        .s2 { animation: fadeIn .7s ease .2s forwards; opacity:0; }
        .s3 { animation: fadeIn .7s ease .35s forwards; opacity:0; }
        .s4 { animation: fadeIn .7s ease .5s forwards; opacity:0; }
      `}</style>

      {/* ── SECTION 1: HERO ── */}
      <section className="relative pt-20 pb-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F7]/50 via-white to-white" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(ellipse, #00008808, transparent 70%)" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Live Badge */}
          <div className="s1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#F5F5F7] border border-[#E5E5EA] mb-10">
            <div className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            <span className="text-[13px] text-[#6E6E73]">
              <span className="text-[#1D1D1F] font-semibold">{waitlistN}</span> Gründer bauen bereits ihr AI-Team
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#000088]/10 text-[#000088] font-semibold">BETA</span>
          </div>

          {/* Main Headline */}
          <h1 className="s2 text-[28px] sm:text-[52px] md:text-[72px] leading-[1.05] font-extrabold tracking-tight mb-5">
            Dein nächster Mitarbeiter<br />
            <span className="gradient-text">ist kein Mensch.</span>
          </h1>

          {/* Sub Claim */}
          <p className="s3 text-[18px] sm:text-[24px] text-[#6E6E73] max-w-2xl mx-auto mb-4 leading-snug font-semibold tracking-tight">
            Das Betriebssystem für dein AI-Team.<br />
            Open Source. Swiss Made. BYOK.
          </p>

          {/* Badge */}
          <div className="s3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#000088]/5 border border-[#000088]/15 mb-10">
            <span className="text-[13px] text-[#000088] font-semibold">Rollen. Budgets. Audit Trail. CHF 49/Monat.</span>
          </div>

          {/* Hero Video */}
          <div className="s4 relative max-w-3xl mx-auto mb-10 rounded-2xl overflow-hidden border border-[#E5E5EA] shadow-xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full"
              poster="/hero-poster.jpg"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </div>

          {/* CTA */}
          <div className="s4 mb-8" id="cta">
            <WaitlistForm variant="hero" />
          </div>

          {/* Trust */}
          <div className="s4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-[13px] text-[#86868B] font-medium">
            <span className="flex items-center gap-2">🇨🇭 Swiss Made</span>
            <span className="flex items-center gap-2"><Lock size={13} className="text-[#000088]" /> nDSG-konform</span>
            <span className="flex items-center gap-2"><Shield size={13} className="text-[#059669]" /> Open Source (AGPLv3)</span>
            <span className="flex items-center gap-2"><Settings size={13} className="text-[#6E6E73]" /> BYOK — Deine Keys</span>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: SOCIAL PROOF BAR ── */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 border-b border-[#F5F5F7]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-[24px] sm:text-[32px] font-extrabold text-[#000088]">{waitlistN || "—"}</div>
              <div className="text-[11px] text-[#86868B] font-medium">auf der Waitlist</div>
            </div>
            <div>
              <div className="text-[24px] sm:text-[32px] font-extrabold text-[#1D1D1F]">6</div>
              <div className="text-[11px] text-[#86868B] font-medium">Connectors live</div>
            </div>
            <div>
              <div className="text-[24px] sm:text-[32px] font-extrabold text-[#1D1D1F]">AGPLv3</div>
              <div className="text-[11px] text-[#86868B] font-medium">Open Source</div>
            </div>
            <div>
              <div className="text-[24px] sm:text-[32px] font-extrabold text-[#1D1D1F]">🇨🇭</div>
              <div className="text-[11px] text-[#86868B] font-medium">Swiss Made</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PROBLEM → SOLUTION ── */}
      <section className="py-16 sm:py-28 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[26px] sm:text-[36px] font-bold mb-6 tracking-tight">
            Andere prompten.<br />
            <span className="text-[#86868B]">Du führst ein Unternehmen.</span>
          </h2>
          <p className="text-[16px] text-[#6E6E73] max-w-2xl mx-auto mb-16 leading-relaxed">
            Du hast 5 AI-Tools offen. Keiner weiss vom anderen.
            Kein Budget. Kein Audit. KaderOS macht aus deinen Tools
            ein Team — mit Rollen, Zielen und CHF-Budgets.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { before: "10 Tabs offen, keiner weiss vom anderen", after: "1 Team. 1 Dashboard. Volle Kontrolle.", icon: Layers, color: "#000088" },
              { before: "CHF 500 verbrannt ohne es zu merken", after: "Budget pro Agent. Auto-Stopp bei Limit.", icon: DollarSign, color: "#059669" },
              { before: "Agent hat entschieden — keiner weiss warum", after: "Audit Trail. Jede Aktion. Nachvollziehbar.", icon: ShieldCheck, color: "#000088" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-[#E5E5EA] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 mx-auto" style={{ background: item.color + "10" }}>
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <div className="text-[13px] text-[#DC2626] line-through mb-2 font-medium">{item.before}</div>
                <div className="text-[15px] text-[#1D1D1F] font-semibold">{item.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SO FUNKTIONIERT'S ── */}
      <section id="wie" className="py-16 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">So funktioniert&apos;s</div>
            <h2 className="text-[26px] sm:text-[36px] font-bold tracking-tight">3 Schritte. Dann arbeitet dein Team.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: "01",
                title: "Firmenname + Template wählen",
                desc: "Einloggen auf kaderos.io. Firmenname eingeben. Template auswählen — Solo Founder, Agency, Treuhand. Dein Team steht.",
                icon: Users,
                color: "#000088",
              },
              {
                step: "02",
                title: "API Key verbinden",
                desc: "Deinen Anthropic- oder OpenAI-Key verbinden. AES-256 verschlüsselt. Deine Keys, deine Kosten, deine Kontrolle.",
                icon: Settings,
                color: "#000088",
              },
              {
                step: "03",
                title: "Team steuern",
                desc: "Dashboard mit Agents, Tasks, Goals und Meeting Room. Du gibst die Richtung vor. Dein Kader arbeitet.",
                icon: BarChart3,
                color: "#059669",
              },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="text-[72px] font-extrabold text-[#F5F5F7] absolute -top-6 -left-2 select-none">{s.step}</div>
                <div className="relative pt-12">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: s.color + "10" }}>
                    <s.icon size={24} style={{ color: s.color }} />
                  </div>
                  <h3 className="text-[18px] font-semibold mb-3">{s.title}</h3>
                  <p className="text-[14px] text-[#6E6E73] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[13px] text-[#86868B] mt-10">In unter 5 Minuten. Kein Terminal. Kein Code. Cloud-Login.</p>
        </div>
      </section>

      {/* ── SECTION 5: FEATURES ── */}
      <section id="features" className="py-16 sm:py-28 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Features</div>
            <h2 className="text-[26px] sm:text-[36px] font-bold tracking-tight mb-4">Was dein Kader heute kann.</h2>
            <p className="text-[15px] text-[#6E6E73]">9 Features. Alle live. Kein &ldquo;Coming soon&rdquo;-Bloat.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              { icon: Users, title: "Organigramm", desc: "Agents mit Rollen und Departments. Wer macht was. Auf einen Blick.", color: "#000088" },
              { icon: MessageSquare, title: "Meeting Room", desc: "Sprich mit deinem CTO-Agent. In Echtzeit. Streaming. Wie ein Standup.", color: "#000088" },
              { icon: DollarSign, title: "Budget in CHF", desc: "Agent Max darf CHF 50/Monat ausgeben. Bei 100% stoppt er.", color: "#059669" },
              { icon: Activity, title: "Audit Trail", desc: "Welcher Agent hat was entschieden, wann, warum. Jede Aktion protokolliert.", color: "#0891B2" },
              { icon: Plug, title: "6 Connectors", desc: "Anthropic, OpenAI, Mistral, DeepL, GitHub, Notion. Mehr kommen.", color: "#D97706" },
              { icon: Target, title: "Goals und Tasks", desc: "Ziele setzen. Aufgaben zuweisen. Status tracken. Dein Kader arbeitet darauf hin.", color: "#000088" },
              { icon: ShieldCheck, title: "BYOK", desc: "Deine API Keys. AES-256 verschlüsselt. Token-Kosten gehen direkt an den Provider.", color: "#DC2626" },
              { icon: Building2, title: "Multi-Company", desc: "Agentur? 5 Firmen isoliert betreiben. Eigene Agents, Budgets, Audit Trails.", color: "#059669" },
              { icon: Layers, title: "Templates", desc: "Solo Founder, Agency, Treuhand. Starte mit einem fertigen Team. Passe es an.", color: "#000088" },
            ].map((f, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-[#E5E5EA] bg-white hover:border-[#000088]/30 hover:shadow-lg transition-all duration-300">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: f.color + "10" }}>
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <h3 className="text-[15px] font-semibold mb-2">{f.title}</h3>
                <p className="text-[13px] text-[#6E6E73] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: WAS KADEROS IST / NICHT IST ── */}
      <section className="py-16 sm:py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[26px] sm:text-[36px] font-bold tracking-tight mb-3">
              Swiss Made. Nicht US-Import<br />mit Schweizer Flagge.
            </h2>
            <p className="text-[14px] text-[#6E6E73]">nDSG ab Tag 1. CHF ab Tag 1. Deutsch ab Tag 1.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* WAS ES IST */}
            <div className="rounded-2xl border border-[#059669]/30 bg-[#059669]/5 p-8">
              <div className="text-[14px] font-bold text-[#059669] uppercase tracking-widest mb-6">Was KaderOS ist</div>
              <ul className="space-y-4">
                {[
                  "Betriebssystem für dein AI-Team",
                  "Open Source (AGPLv3) — prüfbar",
                  "BYOK — deine Keys, deine Kosten",
                  "Cloud-Login auf kaderos.io",
                  "nDSG-konform mit Audit Trail",
                  "CHF-native Budgets pro Agent",
                  "Deutsch-native UI",
                  "Templates für Schweizer Branchen",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[#1D1D1F]">
                    <Check size={16} className="text-[#059669] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* WAS ES NICHT IST */}
            <div className="rounded-2xl border border-[#DC2626]/30 bg-[#DC2626]/5 p-8">
              <div className="text-[14px] font-bold text-[#DC2626] uppercase tracking-widest mb-6">Was KaderOS nicht ist</div>
              <ul className="space-y-4">
                {[
                  "Kein ChatGPT-Wrapper",
                  "Kein US-Tool mit übersetztem UI",
                  "Kein CLI — du brauchst kein Terminal",
                  "Kein Python-Code wie CrewAI",
                  "Keine Black Box — Code ist offen",
                  "Kein Vendor Lock-in — BYOK",
                  "Keine versteckten Preise",
                  "Nicht production-ready — ehrlich Beta",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[#1D1D1F]">
                    <X size={16} className="text-[#DC2626] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: MANIFESTO ── */}
      <section className="py-24 sm:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233739C1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <blockquote className="text-[22px] sm:text-[32px] md:text-[40px] font-bold leading-[1.2] tracking-tight text-[#1D1D1F] mb-8">
            &ldquo;Die nächste Generation von Unternehmen wird nicht mehr gegründet.<br />
            <span className="gradient-text">Sie wird aufgestellt.&rdquo;</span>
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1D1D1F] flex items-center justify-center">
              <span className="text-white text-[13px] font-semibold">K</span>
            </div>
            <div className="text-left">
              <div className="text-[13px] font-semibold text-[#1D1D1F]">KaderOS Manifesto</div>
              <div className="text-[11px] text-[#86868B]">kaderos.io · Swiss Made</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: PRICING ── */}
      <section id="pricing" className="py-16 sm:py-28 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Pricing</div>
            <h2 className="text-[36px] font-bold tracking-tight mb-3">Was es kostet. Ohne Kleingedrucktes.</h2>
            <p className="text-[15px] text-[#6E6E73]">Lizenz + deine eigenen API-Kosten. Das war&apos;s.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { name: "Community", price: "0", per: "für immer", agents: "3 Agents", feats: ["Org Chart + Tasks + Goals", "1 Unternehmen", "Community Discord", "Open Source Self-Hosting"], pop: false },
              { name: "Pro", price: "49", per: "/Monat", agents: "10 Agents", feats: ["Meeting Room (Agent Chat)", "Budget-Tracking in CHF", "Audit Trail", "5 Swiss Templates", "Support innert 24h"], pop: true },
              { name: "Team", price: "149", per: "/Monat", agents: "25 Agents", feats: ["Mehrere Firmen betreiben", "Priority Support innert 4h", "Eigene Templates bauen", "API für Automationen", "Alle Connectors"], pop: false },
              { name: "Agency", price: "349", per: "/Monat", agents: "Unbegrenzt", feats: ["Mandanten isoliert", "Persönlicher Ansprechpartner", "Eigene Connectors", "SLA 99.9%", "Onboarding-Call inkl."], pop: false },
            ].map(p => (
              <div key={p.name} className={`relative rounded-2xl p-7 border transition-all ${p.pop ? "border-[#000088] bg-white shadow-xl shadow-[#000088]/10 scale-[1.02]" : "border-[#E5E5EA] bg-white"}`}>
                {p.pop && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#000088] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Beliebt</div>}
                <div className="text-[13px] font-semibold text-[#86868B] mb-5">{p.name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[12px] text-[#86868B]">CHF</span>
                  <span className="text-[40px] font-extrabold text-[#1D1D1F]">{p.price}</span>
                  <span className="text-[12px] text-[#86868B]">{p.per}</span>
                </div>
                <div className="text-[12px] text-[#000088] font-semibold mb-6">{p.agents}</div>
                <ul className="space-y-3 mb-7">
                  {p.feats.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-[#6E6E73]">
                      <Check size={14} className="text-[#000088] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <a href="#cta" className={`w-full py-3 rounded-xl text-[13px] font-semibold transition-all text-center block ${p.pop ? "bg-[#000088] text-white hover:bg-[#000066] hover:shadow-lg" : "bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5EA] hover:border-[#000088] hover:text-[#000088]"}`}>
                  Platz sichern
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-[12px] text-[#86868B] mt-6">+ deine API-Kosten (typisch CHF 10-30/Monat je nach Nutzung). BYOK — direkt an den Provider.</p>
        </div>
      </section>

      {/* ── SECTION 9: FINAL CTA ── */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#000088]/[0.02] to-white" />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-[30px] sm:text-[44px] font-extrabold tracking-tight mb-5">
            Die Frage ist nicht ob.<br /><span className="gradient-text">Sondern wann du anfängst.</span>
          </h2>
          <p className="text-[16px] text-[#6E6E73] mb-10 leading-relaxed">
            Dein Wettbewerber baut gerade sein AI-Team.
            <br />Beta läuft. Plätze sind begrenzt.
          </p>
          <WaitlistForm variant="hero" />
          <div className="flex items-center justify-center gap-6 mt-8">
            <a href="https://github.com/kaderosio/kaderos.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] text-[#86868B] hover:text-[#1D1D1F] transition-colors font-medium">
              <Github size={15} /> Star on GitHub
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
