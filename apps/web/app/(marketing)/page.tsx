"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Github, Star, Shield, Zap, Users, Brain,
  Terminal, ChevronRight, Check, Globe, Lock, Cpu,
  BarChart3, MessageSquare, GitBranch, Activity,
  Building2, Clock, DollarSign, Layers, Plug,
  ExternalLink, Play, Sparkles, ArrowUpRight,
  Target, CheckSquare, ShieldCheck, Settings
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

// ── TERMINAL TYPING ───────────────────────────────────────────────────────
function TerminalDemo() {
  const lines = [
    { p: "$ ", t: "npx kaderos onboard --yes", delay: 0 },
    { p: "", t: "✓ PostgreSQL gestartet", delay: 1600 },
    { p: "", t: "✓ 4 Agents bereit (CEO · CTO · CMO · Strategy)", delay: 2200 },
    { p: "", t: "✓ Heartbeats aktiv · Budget gesetzt", delay: 2800 },
    { p: "", t: "✓ Dashboard live → http://localhost:3000", delay: 3300 },
    { p: "🚀 ", t: "Dein AI-Kader ist einsatzbereit.", delay: 3800 },
  ];
  const [vis, setVis] = useState(0);
  const [chars, setChars] = useState(0);
  const [go, setGo] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !go) setGo(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [go]);

  useEffect(() => {
    if (!go) return;
    lines.forEach((l, i) => {
      setTimeout(() => {
        setVis(i + 1);
        if (i === 0) { let c = 0; const t = setInterval(() => { c++; setChars(c); if (c >= l.t.length) clearInterval(t); }, 40); }
      }, l.delay);
    });
  }, [go]);

  return (
    <div ref={ref} className="relative max-w-2xl mx-auto">
      <div className="absolute -inset-4 bg-gradient-to-b from-[#000088]/[0.04] to-transparent rounded-3xl blur-2xl" />
      <div className="relative bg-[#FAFAFA] border border-[#E5E5EA] rounded-2xl overflow-hidden shadow-xl">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-[#E5E5EA]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[11px] text-[#86868B] ml-2 font-mono">kaderos — terminal</span>
        </div>
        <div className="p-6 font-mono text-[13px] leading-loose min-h-[200px] bg-white">
          {lines.slice(0, vis).map((l, i) => (
            <div key={i} className={`${l.t.startsWith("✓") ? "text-[#059669]" : l.t.startsWith("Dein") ? "text-[#1D1D1F] font-semibold" : "text-[#1D1D1F]"}`}
              style={{ opacity: i === 0 ? 1 : 0, animation: i > 0 ? "fadeIn .3s ease forwards" : "none" }}>
              <span className="text-[#000088]">{l.p}</span>
              {i === 0 ? (
                <>{l.t.slice(0, chars)}{chars < l.t.length && <span className="inline-block w-[2px] h-[14px] bg-[#000088] ml-px align-middle animate-pulse" />}</>
              ) : l.t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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
  const [waitlistN, setWaitlistN] = useState(0);

  useEffect(() => {
    fetch("/api/waitlist").then(r => r.json()).then(d => setWaitlistN(d.count || 0)).catch(() => {});
    const i = setInterval(() => {
      fetch("/api/waitlist").then(r => r.json()).then(d => setWaitlistN(d.count || 0)).catch(() => {});
    }, 30000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] overflow-hidden">
      {/* Animations + utility classes — fonts & gradient-text from layout.tsx */}
      <style>{`
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes pulseGlow { 0%,100% { box-shadow:0 0 15px #00008815; } 50% { box-shadow:0 0 30px #00008825; } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }

        .s1 { animation: fadeIn .7s ease .1s forwards; opacity:0; }
        .s2 { animation: fadeIn .7s ease .2s forwards; opacity:0; }
        .s3 { animation: fadeIn .7s ease .35s forwards; opacity:0; }
        .s4 { animation: fadeIn .7s ease .5s forwards; opacity:0; }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-24 px-6">
        {/* Subtle gradient bg */}
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
          <p className="s3 text-[20px] sm:text-[26px] text-[#6E6E73] max-w-2xl mx-auto mb-4 leading-snug font-semibold tracking-tight">
            Die C-Suite, die niemals schläft.
          </p>

          {/* Badge */}
          <div className="s3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#000088]/5 border border-[#000088]/15 mb-10">
            <span className="text-[13px] text-[#000088] font-semibold">Agenten statt Stellenanzeigen.</span>
          </div>

          {/* Hero Video */}
          <div className="s4 relative max-w-3xl mx-auto mb-10 rounded-2xl overflow-hidden border border-[#E5E5EA] shadow-xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full"
              poster=""
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
            <span className="flex items-center gap-2"><Shield size={13} className="text-[#059669]" /> Open Source</span>
            <span className="flex items-center gap-2"><Globe size={13} className="text-[#0891B2]" /> 100% Lokal</span>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 border-b border-[#F5F5F7]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-[24px] sm:text-[32px] font-extrabold text-[#000088]">{waitlistN || "—"}</div>
              <div className="text-[11px] text-[#86868B] font-medium">auf der Waitlist</div>
            </div>
            <div>
              <div className="text-[24px] sm:text-[32px] font-extrabold text-[#1D1D1F]">12+</div>
              <div className="text-[11px] text-[#86868B] font-medium">Connectors ab Launch</div>
            </div>
            <div>
              <div className="text-[24px] sm:text-[32px] font-extrabold text-[#1D1D1F]">AGPLv3</div>
              <div className="text-[11px] text-[#86868B] font-medium">100% Open Source</div>
            </div>
            <div>
              <div className="text-[24px] sm:text-[32px] font-extrabold text-[#1D1D1F]">🇨🇭</div>
              <div className="text-[11px] text-[#86868B] font-medium">Swiss Made</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM → SOLUTION ── */}
      <section className="py-16 sm:py-28 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[26px] sm:text-[36px] font-bold mb-6 tracking-tight">
            Andere prompten.<br />
            <span className="text-[#86868B]">Du führst ein Unternehmen.</span>
          </h2>
          <p className="text-[16px] text-[#6E6E73] max-w-2xl mx-auto mb-16 leading-relaxed">
            Du hast 5 AI Tools offen. Keiner weiss vom anderen. Kein Budget. Kein Audit.
            KaderOS macht aus deinen Tools ein Team — mit Rollen, Zielen und CHF-Budgets.
            Dein Kader arbeitet. Du steuerst.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { before: "10 Tabs offen, keiner weiss vom anderen", after: "1 Team. 1 Dashboard. Volle Kontrolle.", icon: Layers, color: "#000088" },
              { before: "CHF 500 verbrannt ohne es zu merken", after: "Budget pro Agent. Auto-Stopp bei Limit.", icon: DollarSign, color: "#059669" },
              { before: "Agent hat falsch entschieden — keiner weiss warum", after: "Audit Trail. Jede Aktion. Nachvollziehbar.", icon: ShieldCheck, color: "#000088" },
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

      {/* ── SO FUNKTIONIERT'S ── */}
      <section id="wie" className="py-16 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">So funktioniert's</div>
            <h2 className="text-[26px] sm:text-[36px] font-bold tracking-tight">Vom Founder zum CEO. In 3 Schritten.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: "01",
                title: "Stelle dein Team auf",
                desc: "CTO der deine Plattform baut. CMO der deine Pipeline füllt. CEO der priorisiert. Jeder Agent hat Rolle, Budget und Verantwortung.",
                icon: Users,
                color: "#000088",
              },
              {
                step: "02",
                title: "Gib die Richtung vor",
                desc: "Setze die Mission. Definiere Ziele. Dein Kader bricht sie runter in Tasks und arbeitet sie ab — autonom, mit Governance.",
                icon: Target,
                color: "#000088",
              },
              {
                step: "03",
                title: "Skaliere ohne Headcount",
                desc: "Dein Kader arbeitet 24/7. Du genehmigst Entscheide, steuerst das Budget und skalierst — ohne ein einziges Bewerbungsgespräch.",
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
        </div>
      </section>

      {/* ── TERMINAL ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Installation</div>
            <h2 className="text-[30px] font-bold mb-2 tracking-tight">30 Sekunden bis zu deinem ersten Team.</h2>
            <p className="text-[14px] text-[#86868B]">Kein Account. Keine Cloud. Kein Vendor Lock-in. Deine Maschine, deine Daten.</p>
          </div>
          <TerminalDemo />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-16 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Features</div>
            <h2 className="text-[26px] sm:text-[36px] font-bold tracking-tight mb-4">Kein Feature-Bloat. Nur was zählt.</h2>
            <p className="text-[15px] text-[#6E6E73]">Jedes Feature existiert, weil ein echtes Business es braucht. Nicht weil es gut auf einer Slide aussieht.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              { icon: Users, title: "Dein Organigramm", desc: "Wer reportet an wen. Wer ist wofür verantwortlich. Auf einen Blick — nicht in deinem Kopf.", color: "#000088" },
              { icon: MessageSquare, title: "Meeting Room", desc: "Frag deinen CTO nach dem Status. Gib dem CMO eine neue Richtung. Wie ein echtes Standup — nur schneller.", color: "#000088" },
              { icon: DollarSign, title: "Budget in CHF", desc: "Agent Max darf CHF 50/Monat ausgeben. Bei 80% kriegst du eine Warnung. Bei 100% stoppt er. Automatisch.", color: "#059669" },
              { icon: ShieldCheck, title: "Du bleibst CEO", desc: "Über 90% Confidence? Agent handelt. Unter 70%? Du entscheidest. Dein Unternehmen, deine Regeln.", color: "#DC2626" },
              { icon: Activity, title: "Volle Transparenz", desc: "Welcher Agent hat was entschieden, wann, warum. Unveränderbar protokolliert. nDSG-konform ab Tag 1.", color: "#0891B2" },
              { icon: Plug, title: "Dein Stack. Verbunden.", desc: "Claude, GPT, GitHub, Slack, Notion — alles was du schon nutzt. Anschliessen, nicht ersetzen.", color: "#D97706" },
              { icon: GitBranch, title: "Sprints mit Agents", desc: "Montag: Sprint planen. Freitag: Ergebnisse reviewen. Dazwischen? Arbeitet dein Kader.", color: "#000088" },
              { icon: Brain, title: "Wissen das bleibt", desc: "Deine Agents vergessen nichts. Skills, Playbooks, Regeln — einmal definiert, immer angewendet.", color: "#000088" },
              { icon: Building2, title: "Mehrere Firmen", desc: "Agentur? Betreib 5 AI-Companies isoliert. Jede mit eigenem Kader, Budget und Audit Trail.", color: "#059669" },
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

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Early Access</div>
            <h2 className="text-[30px] font-bold tracking-tight">Was Beta-User sagen.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                quote: "Ich hab in 2 Tagen mehr erledigt als sonst in 2 Wochen. Mein CTO-Agent hat die ganze Architektur geplant, während ich Kunden akquiriert habe.",
                name: "Luca M.",
                role: "Founder, SaaS Startup",
                loc: "Zürich",
              },
              {
                quote: "Endlich weiss ich, was meine AI-Tools kosten. Das Budget-Feature allein hat mir CHF 200 im ersten Monat gespart.",
                name: "Sarah K.",
                role: "Freelance Designerin",
                loc: "Bern",
              },
              {
                quote: "Wir betreuen 8 Mandanten. Jeder hat seinen eigenen Kader. Isoliert, nachvollziehbar, nDSG-konform. Genau was wir brauchten.",
                name: "Marco T.",
                role: "Partner, Digitalagentur",
                loc: "Basel",
              },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-[#E5E5EA] shadow-sm">
                <div className="text-[24px] text-[#000088] mb-4">&ldquo;</div>
                <p className="text-[14px] text-[#6E6E73] leading-relaxed mb-6">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#000088]/10 flex items-center justify-center">
                    <span className="text-[13px] font-bold text-[#000088]">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#1D1D1F]">{t.name}</div>
                    <div className="text-[11px] text-[#86868B]">{t.role} · {t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
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

      {/* ── SWISS DIFFERENZIERUNG ── */}
      <section className="py-14 sm:py-24 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[30px] font-bold tracking-tight mb-3">Swiss Made. Nicht US-Import mit Schweizer Flagge.</h2>
            <p className="text-[14px] text-[#6E6E73]">nDSG ab Tag 1. CHF ab Tag 1. Keine Übersetzung eines US-Produkts.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E5E5EA] bg-white shadow-sm">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="bg-[#FAFAFA]">
                  <th className="text-left px-4 sm:px-6 py-4 text-[12px] font-medium text-[#86868B] sticky left-0 bg-[#FAFAFA] z-10"></th>
                  <th className="text-center px-4 sm:px-6 py-4"><span className="text-[13px] font-bold text-[#000088]">KaderOS</span></th>
                  <th className="text-center px-4 sm:px-6 py-4 text-[12px] text-[#86868B]">Paperclip</th>
                  <th className="text-center px-4 sm:px-6 py-4 text-[12px] text-[#86868B]">CrewAI</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["nDSG Datenschutz", true, false, false],
                  ["CHF-native Budgets", true, false, false],
                  ["Meeting Room (Agent Chat)", true, false, false],
                  ["Mehrsprachig (DE/FR/IT/EN)", true, false, false],
                  ["Swiss Cloud Option", true, false, false],
                  ["100% lokale Datenhaltung", true, true, false],
                  ["Open Source", true, true, false],
                  ["Org Chart & Governance", true, true, false],
                  ["Bring Your Own Agent", true, true, true],
                ].map(([feat, k, p, c], i) => (
                  <tr key={i} className="border-t border-[#F5F5F7]">
                    <td className="px-4 sm:px-6 py-3 text-[13px] text-[#6E6E73] sticky left-0 bg-white z-10">{feat as string}</td>
                    <td className="text-center">{k ? <Check size={16} className="text-[#000088] mx-auto" /> : <span className="text-[#E5E5EA]">—</span>}</td>
                    <td className="text-center">{p ? <Check size={16} className="text-[#C7C7CC] mx-auto" /> : <span className="text-[#E5E5EA]">—</span>}</td>
                    <td className="text-center">{c ? <Check size={16} className="text-[#C7C7CC] mx-auto" /> : <span className="text-[#E5E5EA]">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ── */}
      <section className="py-14 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Templates</div>
            <h2 className="text-[30px] font-bold tracking-tight mb-3">Nicht bei Null anfangen. Bei Eins.</h2>
            <p className="text-[14px] text-[#6E6E73]">Wähle ein Template. Passe es an. Dein Kader arbeitet in unter 5 Minuten.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              { name: "Solo Founder", n: 4, icon: "🚀", sub: "CEO · CTO · CMO · Strategy" },
              { name: "Digital Agency", n: 8, icon: "🎨", sub: "PM · Designer · Dev · QA" },
              { name: "Treuhand", n: 6, icon: "🏢", sub: "Verwaltung · Buchhaltung" },
              { name: "E-Commerce", n: 7, icon: "🛒", sub: "Shop · Marketing · Support" },
              { name: "Consulting", n: 5, icon: "💼", sub: "Partner · Analyst · Writer" },
            ].map(t => (
              <div key={t.name} className="text-center p-6 rounded-2xl border border-[#E5E5EA] bg-white hover:shadow-lg hover:border-[#000088]/30 transition-all group cursor-pointer">
                <div className="text-[36px] mb-3 group-hover:scale-110 transition-transform">{t.icon}</div>
                <div className="text-[14px] font-semibold mb-1">{t.name}</div>
                <div className="text-[11px] text-[#86868B] mb-2">{t.sub}</div>
                <div className="text-[12px] text-[#000088] font-semibold">{t.n} Agents</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-16 sm:py-28 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Pricing</div>
            <h2 className="text-[36px] font-bold tracking-tight mb-3">Was es kostet. Ohne Kleingedrucktes.</h2>
            <p className="text-[15px] text-[#6E6E73]">Du zahlst für die Lizenz. Nicht für deine Daten. Die gehören dir.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { name: "Community", price: "0", per: "für immer", agents: "3 Agents", feats: ["Org Chart + Tasks + Goals", "1 Unternehmen", "Community Discord", "Lokal auf deiner Maschine"], pop: false },
              { name: "Pro", price: "49", per: "/Monat", agents: "10 Agents", feats: ["Sprich mit deinem Kader", "Entscheide genehmigen", "Sprints planen", "5 Swiss Templates", "Support innert 24h"], pop: true },
              { name: "Team", price: "149", per: "/Monat", agents: "25 Agents", feats: ["Mehrere Firmen betreiben", "Priority Support innert 4h", "Eigene Templates bauen", "API für Automationen", "Playbooks ohne Code"], pop: false },
              { name: "Agency", price: "349", per: "/Monat", agents: "Unbegrenzt", feats: ["Dein Logo, dein Brand", "Mandanten isoliert", "Persönlicher Ansprechpartner", "Eigene Connectors", "SLA 99.9%"], pop: false },
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
                <button className={`w-full py-3 rounded-xl text-[13px] font-semibold transition-all ${p.pop ? "bg-[#000088] text-white hover:bg-[#000066] hover:shadow-lg" : "bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5EA] hover:border-[#000088] hover:text-[#000088]"}`}>
                  {p.price === "0" ? "Jetzt kostenlos starten" : "Platz sichern →"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-[#E5E5EA]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            { n: 46, s: "%", l: "der CH-Firmen setzen auf AI" },
            { n: 30, s: "s", l: "bis dein Kader steht" },
            { n: 12, s: "+", l: "Connectors ab Launch" },
            { n: 200, s: "", l: "Beta-Plätze. Danach Waitlist." },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-[40px] font-extrabold text-[#1D1D1F]"><AnimNum target={s.n} suffix={s.s} /></div>
              <div className="text-[12px] text-[#86868B] font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#000088]/[0.02] to-white" />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-[30px] sm:text-[44px] font-extrabold tracking-tight mb-5">
            Die Frage ist nicht ob.<br /><span className="gradient-text">Sondern wann du anfängst.</span>
          </h2>
          <p className="text-[16px] text-[#6E6E73] mb-10 leading-relaxed">
            Jeder Tag ohne dein AI-Team ist ein Tag, an dem dein Wettbewerber eins aufbaut.
            <br />200 Beta-Plätze. Danach Waitlist.
          </p>
          <WaitlistForm variant="hero" />
          <div className="flex items-center justify-center gap-6 mt-8">
            <a href="https://github.com/kaderos" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] text-[#86868B] hover:text-[#1D1D1F] transition-colors font-medium">
              <Github size={15} /> Star on GitHub
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
