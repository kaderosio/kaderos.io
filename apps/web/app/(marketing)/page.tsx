"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Github, Shield, Users,
  Check, Lock, Zap,
  ClipboardList, Activity,
  Building2, DollarSign, Layers, Plug,
  Target, ShieldCheck, Settings,
  X, Eye, BarChart3, Cog, Globe,
  FileText, Brain, Calendar, ChevronRight,
} from "lucide-react";
import Link from "next/link";

// -- ANIMATED NUMBER --
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

// -- WAITLIST FORM (secondary) --
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
        body: JSON.stringify({ email, source: "landing", referred_by: params.get("ref") || null }),
      });
      const data = await res.json();
      if (data.success) { setPos(data.position); setRefCode(data.referral_code); setDone(true); }
      else { setError(data.error === "Already registered" ? "Du bist bereits auf der Waitlist!" : "Etwas ist schiefgelaufen."); }
    } catch { setError("Verbindungsfehler. Bitte nochmal versuchen."); }
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
          Teile deinen Link -- rück 10 Plätze vor pro Referral:<br />
          <button onClick={() => navigator.clipboard.writeText(`https://kaderos.io/?ref=${refCode}`)}
            className="mt-1 px-3 py-1 bg-[#F5F5F7] rounded-lg text-[#000088] font-medium hover:bg-[#E5E5EA] transition-colors">
            kaderos.io?ref={refCode} -- kopieren
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
          <>Auf Waitlist <ArrowRight size={16} /></>
        )}
      </button>
    </form>
  );
}

// -- PLATFORM TAB COMPONENT --
function PlatformTabs() {
  const [active, setActive] = useState(0);
  const pillars = [
    {
      label: "Orchestrieren",
      icon: Zap,
      title: "Workflows, Heartbeat Engine, Scheduling",
      points: [
        "Heartbeat Engine: Automatische tägliche Agent-Runs",
        "Multi-Step Workflows mit State und Conditions",
        "Task Delegation zwischen Agents",
        "Cron-basiertes Scheduling für wiederkehrende Aufgaben",
      ],
    },
    {
      label: "Bauen & Integrieren",
      icon: Cog,
      title: "Agent Builder, Connectors, Knowledge Base",
      points: [
        "Visual Agent Builder mit 6 Konfigurations-Tabs",
        "12+ Connectors: Claude, GPT, Mistral, DeepL, GitHub, Notion",
        "Knowledge Base: Dokumente als Agent-Kontext",
        "Templates für Schweizer Branchen",
      ],
    },
    {
      label: "Beobachten & Optimieren",
      icon: Eye,
      title: "Execution Trace, Activity Log, Entscheidungen",
      points: [
        "Execution Trace: Jeder Schritt nachvollziehbar",
        "Activity Log: Wer hat was gemacht, wann, warum",
        "Confidence Scoring für autonome Entscheidungen",
        "Token- und Kosten-Breakdown pro Run",
      ],
    },
    {
      label: "Verwalten & Skalieren",
      icon: Building2,
      title: "Budget, Billing, Team, Multi-Company",
      points: [
        "Budget-Limits in CHF pro Agent pro Monat",
        "Multi-Company: Mehrere Firmen isoliert betreiben",
        "Team-Management mit Rollen und Rechten",
        "Stripe Billing mit CHF-Preisen",
      ],
    },
  ];

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {pillars.map((p, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${active === i ? "bg-[#000088] text-white shadow-lg" : "bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E5E5EA]"}`}>
            <p.icon size={16} />
            {p.label}
          </button>
        ))}
      </div>

      {/* Active Content */}
      <div className="bg-white rounded-2xl border border-[#E5E5EA] p-8 sm:p-10 shadow-sm">
        <h3 className="text-[20px] font-bold mb-6">{pillars[active].title}</h3>
        <ul className="space-y-4">
          {pillars[active].points.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] text-[#1D1D1F]">
              <Check size={18} className="text-[#059669] mt-0.5 shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// -- MAIN LANDING PAGE --
export default function LandingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] overflow-hidden">
      <style>{`
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        .s1 { animation: fadeIn .7s ease .1s forwards; opacity:0; }
        .s2 { animation: fadeIn .7s ease .2s forwards; opacity:0; }
        .s3 { animation: fadeIn .7s ease .35s forwards; opacity:0; }
        .s4 { animation: fadeIn .7s ease .5s forwards; opacity:0; }
      `}</style>

      {/* ---- SECTION 1: HERO ---- */}
      <section className="relative pt-20 sm:pt-28 pb-20 sm:pb-28 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F7]/50 via-white to-white" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(ellipse, #00008808, transparent 70%)" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="s2 text-[32px] sm:text-[56px] md:text-[72px] leading-[1.05] font-extrabold tracking-tight mb-6">
            Dein AI-Team.<br />
            <span className="gradient-text">Für dein Unternehmen.</span>
          </h1>

          <p className="s3 text-[18px] sm:text-[24px] text-[#6E6E73] max-w-2xl mx-auto mb-10 leading-snug font-semibold tracking-tight">
            4 Agents. CHF 49 pro Monat. Arbeiten während du schläfst.
          </p>

          {/* CTAs */}
          <div className="s4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/signup"
              className="px-8 py-4 bg-[#000088] text-white text-[15px] font-semibold rounded-xl hover:bg-[#000066] hover:shadow-xl transition-all flex items-center gap-2">
              Kostenlos starten <ArrowRight size={18} />
            </Link>
            <Link href="/login"
              className="px-8 py-4 bg-white text-[#000088] text-[15px] font-semibold rounded-xl border-2 border-[#000088] hover:bg-[#000088]/5 transition-all flex items-center gap-2">
              Demo testen
            </Link>
          </div>

          <p className="s4 text-[12px] text-[#86868B] mb-0">
            Demo-Login: demo@kaderos.io / Demo2026!
          </p>
        </div>
      </section>

      {/* ---- SECTION 2: SOCIAL PROOF BAR ---- */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 border-y border-[#F5F5F7] bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-[13px] font-bold text-[#1D1D1F] mb-1">Swiss Made</div>
              <div className="text-[11px] text-[#86868B]">Software</div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#1D1D1F] mb-1">Open Source</div>
              <div className="text-[11px] text-[#86868B]">
                <a href="https://github.com/kaderosio/kaderos.io" target="_blank" rel="noopener noreferrer" className="hover:text-[#000088] transition-colors">auf GitHub</a>
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#1D1D1F] mb-1">27 API Endpoints</div>
              <div className="text-[11px] text-[#86868B]">live</div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#1D1D1F] mb-1">11 Dashboard Pages</div>
              <div className="text-[11px] text-[#86868B]">produktiv</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- SECTION 3: SO FUNKTIONIERT'S ---- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">So funktioniert&apos;s</div>
            <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight">3 Schritte. Dann arbeitet dein Team.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Team aufstellen",
                desc: "Wähle ein Template oder erstelle deine Agents manuell. Solo Founder, Agency, Treuhand -- in unter 5 Minuten.",
                icon: Users,
                color: "#000088",
              },
              {
                step: "02",
                title: "Aufgaben verteilen",
                desc: "Erstelle Tasks, setze Ziele, definiere Budgets in CHF. Jeder Agent weiss, was er zu tun hat.",
                icon: ClipboardList,
                color: "#000088",
              },
              {
                step: "03",
                title: "Automatisch arbeiten lassen",
                desc: "Dein Team arbeitet im Hintergrund. Jeden Tag. Die Heartbeat Engine sorgt dafür, dass nichts liegenbleibt.",
                icon: Zap,
                color: "#059669",
              },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="text-[80px] font-extrabold text-[#F5F5F7] absolute -top-8 -left-2 select-none">{s.step}</div>
                <div className="relative pt-14">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: s.color + "10" }}>
                    <s.icon size={24} style={{ color: s.color }} />
                  </div>
                  <h3 className="text-[18px] font-semibold mb-3">{s.title}</h3>
                  <p className="text-[14px] text-[#6E6E73] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- SECTION 4: FEATURES -- 4 SAEULEN ---- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Warum KaderOS</div>
            <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight">Einfach. Vertrauenswürdig. Skalierbar. Swiss.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Einfach */}
            <div className="bg-white rounded-2xl p-8 border border-[#E5E5EA] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[#000088]/10">
                <Zap size={22} className="text-[#000088]" />
              </div>
              <h3 className="text-[18px] font-bold mb-4">Einfach</h3>
              <ul className="space-y-3">
                {[
                  "Templates: 5 Minuten zum ersten AI-Team",
                  "Kein Code. Alles im Browser.",
                  "Visual Agent Builder mit 6 Konfigurations-Tabs",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#6E6E73]">
                    <Check size={16} className="text-[#000088] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vertrauenswuerdig */}
            <div className="bg-white rounded-2xl p-8 border border-[#E5E5EA] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[#059669]/10">
                <ShieldCheck size={22} className="text-[#059669]" />
              </div>
              <h3 className="text-[18px] font-bold mb-4">Vertrauenswürdig</h3>
              <ul className="space-y-3">
                {[
                  "Jede Entscheidung geloggt (Confidence Scoring)",
                  "Budget-Limits in CHF pro Agent",
                  "Execution Trace: Wer hat was gemacht, wann, warum",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#6E6E73]">
                    <Check size={16} className="text-[#059669] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skalierbar */}
            <div className="bg-white rounded-2xl p-8 border border-[#E5E5EA] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[#0891B2]/10">
                <Layers size={22} className="text-[#0891B2]" />
              </div>
              <h3 className="text-[18px] font-bold mb-4">Skalierbar</h3>
              <ul className="space-y-3">
                {[
                  "Von 1 bis 25+ Agents",
                  "Workflows: Multi-Step Automatisierung",
                  "Heartbeat Engine: Automatische tägliche Runs",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#6E6E73]">
                    <Check size={16} className="text-[#0891B2] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Swiss DNA */}
            <div className="bg-white rounded-2xl p-8 border border-[#E5E5EA] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[#DC2626]/10">
                <Shield size={22} className="text-[#DC2626]" />
              </div>
              <h3 className="text-[18px] font-bold mb-4">Swiss DNA</h3>
              <ul className="space-y-3">
                {[
                  "Deutsch-first. Nicht übersetzt.",
                  "CHF. Nicht umgerechnet.",
                  "nDSG-konform. Swiss Hosting.",
                  "Bexio, DeepL, QR-Rechnung (coming soon)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#6E6E73]">
                    <Check size={16} className="text-[#DC2626] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---- SECTION 5: PLATFORM OVERVIEW ---- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Plattform</div>
            <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight mb-4">Alles was du brauchst. In einem Dashboard.</h2>
            <p className="text-[15px] text-[#6E6E73]">4 Säulen. Von Orchestrierung bis Skalierung.</p>
          </div>

          <PlatformTabs />
        </div>
      </section>

      {/* ---- SECTION 6: DEMO ---- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Live Demo</div>
          <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight mb-5">
            Teste KaderOS jetzt -- ohne Registrierung
          </h2>
          <p className="text-[15px] text-[#6E6E73] mb-4 leading-relaxed">
            NovaTech GmbH: 4 Agents, 13 Tasks, CHF 118.60 Kosten -- alles live im Demo-Account.
          </p>

          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-[#E5E5EA] mb-8">
            <span className="text-[13px] text-[#86868B]">Login:</span>
            <code className="text-[13px] font-mono text-[#1D1D1F] font-semibold">demo@kaderos.io</code>
            <span className="text-[13px] text-[#86868B]">/</span>
            <code className="text-[13px] font-mono text-[#1D1D1F] font-semibold">Demo2026!</code>
          </div>

          <div className="block">
            <Link href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#000088] text-white text-[15px] font-semibold rounded-xl hover:bg-[#000066] hover:shadow-xl transition-all">
              Demo starten <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- SECTION 7: PRICING PREVIEW ---- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Pricing</div>
            <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight mb-5">Was es kostet. Ohne Kleingedrucktes.</h2>

            {/* Annual Toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 bg-[#F5F5F7] rounded-xl mb-10">
              <button onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-lg text-[13px] font-medium transition-all ${!annual ? "bg-white text-[#1D1D1F] shadow-sm" : "text-[#6E6E73]"}`}>
                Monatlich
              </button>
              <button onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-lg text-[13px] font-medium transition-all flex items-center gap-2 ${annual ? "bg-white text-[#1D1D1F] shadow-sm" : "text-[#6E6E73]"}`}>
                Jährlich <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#059669]/10 text-[#059669] font-semibold">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              {
                name: "Community", price: 0, annual: 0, per: "für immer", agents: "3 Agents",
                feats: ["Org Chart + Tasks + Goals", "Meeting Room", "1 Unternehmen", "Community Support", "Open Source"],
                pop: false,
              },
              {
                name: "Pro", price: 49, annual: 39, per: "/Monat", agents: "10 Agents",
                feats: ["Alles aus Community", "Budget-Tracking in CHF", "Audit Trail", "5 Swiss Templates", "Email Support innert 24h"],
                pop: true,
              },
              {
                name: "Team", price: 149, annual: 119, per: "/Monat", agents: "25 Agents",
                feats: ["Alles aus Pro", "Multi-Company", "Priority Support innert 4h", "Eigene Templates", "API Access"],
                pop: false,
              },
            ].map(p => (
              <div key={p.name} className={`relative rounded-2xl p-7 border transition-all ${p.pop ? "border-[#000088] bg-white shadow-xl shadow-[#000088]/10 scale-[1.02]" : "border-[#E5E5EA] bg-white"}`}>
                {p.pop && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#000088] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Beliebt</div>}
                <div className="text-[13px] font-semibold text-[#86868B] mb-4">{p.name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[12px] text-[#86868B]">CHF</span>
                  <span className="text-[42px] font-extrabold text-[#1D1D1F]">{annual ? p.annual : p.price}</span>
                  <span className="text-[12px] text-[#86868B]">{p.per}</span>
                </div>
                {annual && p.price > 0 && (
                  <div className="text-[11px] text-[#059669] font-medium mb-1">Spare CHF {(p.price - p.annual) * 12}/Jahr</div>
                )}
                <div className="text-[12px] text-[#000088] font-semibold mb-5">{p.agents}</div>
                <ul className="space-y-2.5 mb-7">
                  {p.feats.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-[#6E6E73]">
                      <Check size={14} className="text-[#000088] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className={`w-full py-3 rounded-xl text-[13px] font-semibold transition-all text-center block ${p.pop ? "bg-[#000088] text-white hover:bg-[#000066] hover:shadow-lg" : "bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5EA] hover:border-[#000088] hover:text-[#000088]"}`}>
                  Kostenlos starten
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center space-y-2">
            <p className="text-[12px] text-[#86868B]">Alle Preise in CHF. Keine versteckten Kosten. BYOK -- deine API-Keys, deine Kosten.</p>
            <Link href="/pricing" className="inline-flex items-center gap-1 text-[13px] text-[#000088] font-semibold hover:underline">
              Alle Preise und Pläne ansehen <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- SECTION 8: WAS KADEROS IST / NICHT IST ---- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight mb-3">
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
                  "Open Source (AGPLv3) -- prüfbar",
                  "BYOK -- deine Keys, deine Kosten",
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
                  "Kein CLI -- alles im Browser",
                  "Kein Python-Code wie CrewAI",
                  "Keine Black Box -- Code ist offen",
                  "Kein Vendor Lock-in -- BYOK",
                  "Keine versteckten Preise",
                  "Nicht production-ready -- ehrlich Beta",
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

      {/* ---- SECTION 9: FINAL CTA ---- */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#000088]/[0.02] to-white" />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-[32px] sm:text-[48px] font-extrabold tracking-tight mb-6">
            Bereit für dein AI-Team?
          </h2>
          <p className="text-[16px] text-[#6E6E73] mb-10 leading-relaxed">
            Starte kostenlos mit 3 Agents. Keine Kreditkarte nötig.
          </p>
          <Link href="/signup"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#000088] text-white text-[16px] font-semibold rounded-xl hover:bg-[#000066] hover:shadow-xl transition-all">
            Kostenlos starten <ArrowRight size={18} />
          </Link>
          <div className="flex items-center justify-center gap-6 mt-8">
            <a href="https://github.com/kaderosio/kaderos.io" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-[#86868B] hover:text-[#1D1D1F] transition-colors font-medium">
              <Github size={15} /> Star on GitHub
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
