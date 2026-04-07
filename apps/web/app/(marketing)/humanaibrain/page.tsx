"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Brain,
  Zap,
  Network,
  Shield,
  Database,
  ChevronDown,
  Check,
  Terminal,
  ArrowRight,
  Eye,
  Cpu,
  Moon,
  GitBranch,
  BarChart3,
  Lock,
  Layers,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════ */

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ═══════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════ */

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-slate-200/60 transition-colors duration-300 ${open ? "bg-slate-50/50" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 px-1 text-left group"
      >
        <h3 className="text-[17px] font-semibold text-slate-900 pr-8 group-hover:text-indigo-700 transition-colors">{q}</h3>
        <div className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0 transition-all duration-300 ${open ? "bg-indigo-600 border-indigo-600 rotate-180" : "group-hover:border-indigo-300"}`}>
          <ChevronDown className={`w-4 h-4 transition-colors ${open ? "text-white" : "text-slate-400"}`} />
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ maxHeight: open ? "400px" : "0", opacity: open ? 1 : 0 }}
      >
        <p className="pb-6 px-1 text-[15px] text-slate-500 leading-relaxed max-w-3xl">{a}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   NEURAL NET SVG (Hero Background)
   ═══════════════════════════════════════════════════ */

const NODES: [number, number][] = [
  [120,80],[280,140],[450,60],[620,120],[700,250],
  [80,280],[200,350],[380,280],[540,340],[680,400],
  [150,480],[320,520],[500,460],[640,530],[60,150],
  [350,180],[580,200],[240,220],[460,400],[100,400],
  [720,150],[400,130],[550,500],[180,160],[300,400],
  [490,180],[650,300],[220,500],[420,350],[140,320],
];

const EDGES: [number,number,number,number][] = [
  [120,80,280,140],[280,140,450,60],[450,60,620,120],[620,120,700,250],
  [80,280,200,350],[200,350,380,280],[380,280,540,340],[540,340,680,400],
  [150,480,320,520],[320,520,500,460],[500,460,640,530],
  [120,80,80,280],[280,140,200,350],[450,60,380,280],[620,120,540,340],[700,250,680,400],
  [80,280,150,480],[200,350,320,520],[380,280,500,460],[540,340,640,530],
  [120,80,200,350],[280,140,380,280],[450,60,540,340],[620,120,680,400],
  [150,480,380,280],[320,520,540,340],[500,460,700,250],
  [60,150,240,220],[240,220,350,180],[350,180,490,180],[490,180,580,200],[580,200,720,150],
  [60,150,120,80],[240,220,280,140],[350,180,450,60],[580,200,620,120],[720,150,700,250],
  [140,320,300,400],[300,400,420,350],[420,350,490,180],
  [100,400,220,500],[220,500,320,520],[400,130,550,500],
  [180,160,350,180],[650,300,540,340],[460,400,500,460],
];

function NeuralNet() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.28]"
      >
        {EDGES.map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6366f1" strokeWidth={0.7} opacity={0.35} />
        ))}
        {NODES.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={2} fill="#6366f1" opacity={0.7} />
            <circle cx={x} cy={y} r={5} fill="#6366f1" opacity={0.08} />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   LAYER DATA
   ═══════════════════════════════════════════════════ */

const LAYERS = [
  { num: "01", icon: Eye, title: "Perception Gate", subtitle: "Der Türhüter", desc: "Bewertet Emotion, Dringlichkeit und Vertrauen, bevor Daten gespeichert werden.", color: "#4338ca" },
  { num: "02", icon: Cpu, title: "Working Memory", subtitle: "Der Fokus", desc: "7-Item Buffer nach Miller's Law. Priorisiert das Wichtigste in Echtzeit.", color: "#4f46e5" },
  { num: "03", icon: Database, title: "Episodisches Gedächtnis", subtitle: "Deine Story", desc: "Speichert Ereignisse mit Kontext. Erinnerungen verändern sich beim Abruf.", color: "#6366f1" },
  { num: "04", icon: Network, title: "Knowledge Graph", subtitle: "Das Herzstück", desc: "Ein lebendiges Netz von Beziehungen — powered by Graphiti.", color: "#7c3aed" },
  { num: "05", icon: GitBranch, title: "Prozedurales Gedächtnis", subtitle: "Die Erfahrung", desc: "Wiederkehrende Muster werden zu automatischen Regeln.", color: "#8b5cf6" },
  { num: "06", icon: BarChart3, title: "Predictive Engine", subtitle: "Der Wow-Effekt", desc: "Erkennt Trends und alerted proaktiv, bevor Probleme auftreten.", color: "#a78bfa" },
  { num: "07", icon: Moon, title: "Dream Cycle", subtitle: "Die Traumphase", desc: "Nächtliche Consolidation: Vergessen, Verdichten, Regeln ableiten, Entdecken.", color: "#c4b5fd" },
];

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   Psychology: AIDA Flow
   Hero (Attention) → Problem (Interest/Loss Aversion)
   → Benefits (Desire/JTBD) → Social Proof (Authority)
   → How it works (Activation Energy) → Layers (Authority)
   → Pricing (Anchoring) → FAQ (Objections) → CTA (Action)
   ═══════════════════════════════════════════════════ */

export default function HumanAIBrainPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=JetBrains+Mono:wght@400;500&display=swap');

        .font-display { font-family: 'DM Serif Display', Georgia, serif; }
        .font-body { font-family: 'DM Sans', system-ui, sans-serif; }
        .font-code { font-family: 'JetBrains Mono', monospace; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.25s; }
        .stagger-3 { animation-delay: 0.4s; }
        .stagger-4 { animation-delay: 0.55s; }
        .stagger-5 { animation-delay: 0.7s; }

        .grain::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .layer-card {
          transform: perspective(800px) rotateX(0deg);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .layer-card:hover {
          transform: perspective(800px) rotateX(-1deg) translateY(-4px);
          box-shadow: 0 20px 60px -15px rgba(99, 102, 241, 0.15);
        }
      `}</style>

      <div className="bg-white font-body text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">

        {/* ════════════════════════════════════════════
            1. HERO — Attention
            Psychology: Mere Exposure (brand), Loss Aversion (headline framing)
            ════════════════════════════════════════════ */}
        <section className="relative overflow-hidden grain">
          <NeuralNet />

          {/* Warm glows */}
          <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/40 via-violet-50/20 to-transparent rounded-full blur-[100px]" />
          <div className="absolute bottom-[-100px] left-[-200px] w-[500px] h-[500px] bg-gradient-to-tr from-amber-50/20 to-transparent rounded-full blur-[80px]" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 pt-28 sm:pt-36 lg:pt-44 pb-24 sm:pb-32 text-center">
            <div className="animate-fade-in-up stagger-1">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[12px] font-semibold text-indigo-700 tracking-wide uppercase mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                Agent Brain by KaderOS
              </span>
            </div>

            <h1 className="font-display text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.06] tracking-tight mb-7 animate-fade-in-up stagger-2">
              Deine AI-Agents vergessen
              <br />
              <span className="italic text-indigo-700">alles.</span>{" "}
              <span className="text-slate-400">Jedes Mal.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-3">
              Agent Brain gibt ihnen ein permanentes Gedächtnis — 7 Schichten, inspiriert vom menschlichen Gehirn. Eine API. Kein LLM.
            </p>

            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up stagger-4">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl font-semibold text-[15px] transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
              >
                Kostenlos starten
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 rounded-xl font-semibold text-[15px] transition-all duration-300"
              >
                So funktioniert&apos;s
              </Link>
            </div>

            {/* Trust badges — Authority + Social Proof */}
            <div className="flex flex-wrap gap-3 justify-center mt-12 animate-fade-in-up stagger-5">
              {[
                { icon: Zap, label: "Kein LLM nötig" },
                { icon: Layers, label: "7 Memory Layers" },
                { icon: Shield, label: "Swiss Hosted" },
                { icon: Lock, label: "nDSG-konform" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-150 text-[13px] text-slate-500 font-medium backdrop-blur-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-indigo-500" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            2. PROBLEM — Loss Aversion + Contrast Effect
            Psychology: People work 2x harder to avoid loss than to gain.
            Show what they LOSE without the product.
            ════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 px-6 sm:px-8 bg-slate-50/50">
          <RevealSection className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-[32px] sm:text-[44px] leading-tight tracking-tight mb-5">
                Was dein Agent{" "}
                <span className="italic text-red-600">jeden Tag verliert.</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Ohne permanentes Gedächtnis startet jede Session bei Null. Kontext, Learnings, Beziehungen — alles weg.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ohne — Loss framing */}
              <div className="group rounded-2xl bg-white border border-red-100 p-8 sm:p-10 transition-all duration-500 hover:shadow-xl hover:shadow-red-500/5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-[13px] font-semibold text-red-500 uppercase tracking-[0.12em]">
                    Ohne Agent Brain
                  </span>
                </div>
                <div className="space-y-5">
                  {[
                    { label: "Kundenwissen", value: "Vergessen nach jeder Session" },
                    { label: "Zusammenhänge", value: "Unsichtbar, nicht vernetzt" },
                    { label: "Learnings", value: "Nie gespeichert, nie angewandt" },
                    { label: "Prognosen", value: "Null. Nur reaktiv." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-300 mt-2.5 shrink-0" />
                      <div className="text-[15px]">
                        <span className="text-slate-900 font-semibold">{item.label}</span>
                        <span className="mx-2 text-slate-300">&rarr;</span>
                        <span className="text-slate-400">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mit — Gain framing + Contrast */}
              <div className="group rounded-2xl bg-white border border-indigo-200 p-8 sm:p-10 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-[60px]" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="text-[13px] font-semibold text-indigo-600 uppercase tracking-[0.12em]">
                      Mit Agent Brain
                    </span>
                  </div>
                  <div className="space-y-5">
                    {[
                      { label: "Kundenwissen", value: "Wächst mit jeder Interaktion" },
                      { label: "Zusammenhänge", value: "Knowledge Graph, automatisch vernetzt" },
                      { label: "Learnings", value: "Werden zu automatischen Regeln" },
                      { label: "Prognosen", value: "Proaktive Alerts und Vorhersagen" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                        <div className="text-[15px]">
                          <span className="text-slate-900 font-semibold">{item.label}</span>
                          <span className="mx-2 text-slate-300">&rarr;</span>
                          <span className="text-indigo-700 font-medium">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ════════════════════════════════════════════
            3. BENEFITS — Jobs-to-be-Done
            Psychology: People hire products for outcomes.
            Frame as what the AGENT can DO, not architecture.
            ════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 px-6 sm:px-8">
          <RevealSection className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-[32px] sm:text-[44px] leading-tight tracking-tight mb-5">
                Was dein Agent damit{" "}
                <span className="italic text-indigo-700">kann.</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Vier Fähigkeiten. Eine API. Kein Overhead.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Brain,
                  title: "Erinnert sich an alles",
                  desc: "Kunden, Projekte, Präferenzen — über Sessions hinweg. Dein Agent vergisst nichts mehr, was wichtig ist.",
                  color: "#4338ca",
                },
                {
                  icon: Network,
                  title: "Sieht Zusammenhänge",
                  desc: "Der Knowledge Graph vernetzt automatisch: Wer kennt wen? Welches Projekt hängt mit welchem Kunden zusammen?",
                  color: "#7c3aed",
                },
                {
                  icon: GitBranch,
                  title: "Lernt aus Erfahrung",
                  desc: "Wiederkehrende Muster werden zu automatischen Regeln. Dein Agent entwickelt Intuition.",
                  color: "#8b5cf6",
                },
                {
                  icon: BarChart3,
                  title: "Warnt bevor es passiert",
                  desc: "Die Predictive Engine erkennt Trends und alerted proaktiv — bevor Deadlines brechen oder Kunden abspringen.",
                  color: "#a78bfa",
                },
              ].map(({ icon: Icon, title, desc, color }) => (
                <RevealSection key={title}>
                  <div className="layer-card relative rounded-2xl bg-white border border-slate-150 p-7 h-full">
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl"
                      style={{ background: `linear-gradient(to bottom, ${color}, ${color}66)` }}
                    />
                    <div className="pl-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${color}10` }}>
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                      <p className="text-[15px] text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* ════════════════════════════════════════════
            4. SOCIAL PROOF — Authority + Bandwagon
            Psychology: People follow what others do.
            Numbers create confidence.
            ════════════════════════════════════════════ */}
        <section className="py-16 px-6 sm:px-8 bg-slate-50/50 border-y border-slate-100">
          <RevealSection className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "7", label: "Gedächtnis-Schichten", sub: "Mehr als jeder Mitbewerber" },
                { value: "0", label: "LLM-Calls nötig", sub: "Reine Mathematik" },
                { value: "<5ms", label: "Recall-Latenz", sub: "In-Memory Buffer" },
                { value: "CHF 29", label: "Pro Monat", sub: "Statt $249 bei Mem0 Pro" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-[36px] sm:text-[44px] text-indigo-700 tracking-tight">{stat.value}</div>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{stat.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* ════════════════════════════════════════════
            5. HOW IT WORKS — Activation Energy
            Psychology: Reduce starting friction.
            Make the first step trivially easy.
            3 steps max. Goal-Gradient Effect.
            ════════════════════════════════════════════ */}
        <section id="how-it-works" className="py-24 sm:py-32 px-6 sm:px-8">
          <RevealSection className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-[32px] sm:text-[44px] leading-tight tracking-tight mb-5">
                In 5 Minuten <span className="italic text-indigo-700">live.</span>
              </h2>
              <p className="text-lg text-slate-500">
                Drei Schritte. Keine Konfiguration.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "API Key holen",
                  desc: "Kostenlos. Keine Kreditkarte. Ein Endpoint.",
                  detail: "POST /auth/key → sk_live_7f3a...",
                  color: "bg-indigo-700",
                },
                {
                  step: "2",
                  title: "Memory speichern",
                  desc: "Ein POST-Request. Dein Agent speichert ab sofort.",
                  detail: 'POST /brain/store → {"content": "Müller ist CTO"}',
                  color: "bg-indigo-600",
                },
                {
                  step: "3",
                  title: "Memory abrufen",
                  desc: "Frag einfach. Der Brain liefert Kontext + Zusammenhänge.",
                  detail: 'POST /brain/recall → {"answer": "CTO bei NovaTech, 3 Tickets"}',
                  color: "bg-violet-600",
                },
              ].map(({ step, title, desc, detail, color }) => (
                <RevealSection key={step}>
                  <div className="flex gap-5 items-start">
                    <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white font-code text-sm font-bold shrink-0 mt-1`}>
                      {step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{title}</h3>
                      <p className="text-[15px] text-slate-500 mb-3">{desc}</p>
                      <div className="inline-block rounded-lg bg-slate-900 px-4 py-2.5 font-code text-[13px] text-slate-300">
                        {detail}
                      </div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
              >
                <Terminal className="w-4 h-4" />
                Vollständige API Docs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </RevealSection>
        </section>

        {/* ════════════════════════════════════════════
            6. DREAM CYCLE — Peak-End Rule
            Psychology: Create a memorable peak moment.
            The dark section creates contrast and memorability.
            ════════════════════════════════════════════ */}
        <RevealSection>
          <section className="bg-[#0a0a1a] py-24 sm:py-32 px-6 sm:px-8 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/8 rounded-full blur-[100px]" />

            <div className="relative max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block text-[12px] font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-4">
                  Was kein anderes System kann
                </span>
                <h2 className="font-display text-[32px] sm:text-[44px] leading-tight tracking-tight text-white mb-5">
                  Der Dream Cycle.
                </h2>
                <p className="text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  Jede Nacht um 02:00: Dein Agent räumt auf, verdichtet, lernt Regeln und findet kreative Verbindungen. Wie dein Gehirn im Schlaf.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { time: "02:00", title: "Vergessen", desc: "Unwichtige Erinnerungen verlieren Gewicht. Unter dem Schwellenwert: entfernt." },
                  { time: "02:15", title: "Verdichten", desc: "Ähnliche Erinnerungen werden zusammengeführt. Kompakter, nicht ärmer." },
                  { time: "02:30", title: "Regeln ableiten", desc: "Wiederkehrende Muster werden als prozedurale Regeln gespeichert." },
                  { time: "02:45", title: "Entdecken", desc: "Zufällige Paare unverbundener Entities werden auf versteckte Verbindungen geprüft." },
                ].map((phase, i) => (
                  <div key={phase.title} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 hover:bg-white/[0.06] transition-all duration-500">
                    <div className="text-[11px] font-code font-semibold text-indigo-400/60 uppercase tracking-[0.15em] mb-3">
                      Phase {i + 1} — {phase.time}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3">{phase.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ════════════════════════════════════════════
            7. 7 LAYERS — Authority
            Psychology: Expertise creates trust.
            Compact accordion for the curious.
            ════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 px-6 sm:px-8">
          <RevealSection className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-display text-[32px] sm:text-[44px] leading-tight tracking-tight mb-5">
                Gebaut nach dem Vorbild der{" "}
                <span className="italic text-indigo-700">Biologie.</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Jede Schicht bildet eine echte Funktion des menschlichen Gehirns ab.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {LAYERS.map((layer, i) => (
                <RevealSection key={layer.num} delay={i * 60}>
                  <div className="layer-card relative rounded-2xl bg-white border border-slate-150 p-6 h-full">
                    <div className="absolute top-3 right-4 text-[56px] font-display font-bold leading-none select-none pointer-events-none" style={{ color: `${layer.color}06` }}>
                      {layer.num}
                    </div>
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${layer.color}10` }}>
                        <layer.icon className="w-4.5 h-4.5" style={{ color: layer.color }} />
                      </div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: layer.color }}>
                        {layer.subtitle}
                      </div>
                      <h3 className="text-[16px] font-bold text-slate-900 mb-2">{layer.title}</h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed">{layer.desc}</p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>

            {/* Tech Stack — Authority signals */}
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              {["pgvector", "Graphiti", "spaCy", "FastAPI", "PostgreSQL", "sentence-transformers"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-[13px] font-code text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* ════════════════════════════════════════════
            8. PRICING — Anchoring + Decoy Effect
            Psychology: Show competitor prices first to anchor high.
            CHF 29 feels like a steal after seeing $249.
            Door-in-the-Face: Enterprise prices → our price.
            ════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 px-6 sm:px-8 bg-slate-50/50">
          <RevealSection className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="font-display text-[32px] sm:text-[44px] leading-tight tracking-tight mb-5">
                Simpel. <span className="italic text-indigo-700">Transparent.</span>
              </h2>
            </div>

            {/* Competitor Anchor — show what others charge */}
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {[
                { name: "Mem0 Pro", price: "$249/Mo" },
                { name: "Cognee", price: "€1'970/Mo" },
                { name: "Letta", price: "$20–200/Mo" },
                { name: "Zep", price: "$25/Mo" },
              ].map((c) => (
                <span key={c.name} className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[12px] text-slate-400 line-through decoration-slate-300">
                  {c.name}: {c.price}
                </span>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Free — Endowment Effect: let them "own" it */}
              <div className="rounded-2xl bg-white border border-slate-200 p-8 sm:p-10 hover:shadow-lg transition-shadow duration-500">
                <div className="text-[12px] font-code text-slate-400 uppercase tracking-[0.15em] mb-4">Free</div>
                <div className="text-[44px] font-display tracking-tight mb-1">
                  CHF 0<span className="text-lg font-body text-slate-400 ml-1">/Monat</span>
                </div>
                <p className="text-slate-500 text-sm mb-8">Zum Testen. Keine Kreditkarte.</p>
                <ul className="space-y-3.5 mb-10">
                  {["1'000 Memories/Monat", "1 Agent", "Alle 7 Layers", "Community Support"].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[15px] text-slate-600">
                      <Check className="w-4 h-4 text-indigo-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block w-full text-center py-3.5 border-2 border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 rounded-xl font-semibold transition-all duration-300">
                  Kostenlos starten
                </Link>
              </div>

              {/* Pro — Default Effect: pre-selected as recommended */}
              <div className="relative rounded-2xl border-2 border-indigo-400 p-8 sm:p-10 bg-gradient-to-br from-indigo-50/60 to-violet-50/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500">
                <div className="absolute -top-3.5 right-6 px-4 py-1.5 bg-indigo-700 text-white text-[11px] font-bold rounded-full tracking-wide uppercase">
                  Empfohlen
                </div>
                <div className="text-[12px] font-code text-indigo-600 uppercase tracking-[0.15em] mb-4">Pro</div>
                <div className="text-[44px] font-display tracking-tight mb-1">
                  CHF 29<span className="text-lg font-body text-slate-400 ml-1">/Monat</span>
                </div>
                <p className="text-slate-500 text-sm mb-8">
                  Weniger als ein Kaffee pro Tag.{/* Mental Accounting */}
                </p>
                <ul className="space-y-3.5 mb-10">
                  {["Unlimited Memories", "Unlimited Agents", "Dream Cycle", "Predictive Engine", "Knowledge Graph Export", "Priority Support"].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[15px] text-slate-700">
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup?plan=pro" className="block w-full text-center py-3.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/20">
                  Pro starten
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              {["Swiss Hosted", "nDSG-konform", "Open Source (AGPLv3)", "Monatlich kündbar"].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[12px] text-slate-500 font-medium">
                  <Shield className="w-3 h-3 text-indigo-500" /> {badge}
                </span>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* ════════════════════════════════════════════
            9. FAQ — Objection Handling
            Psychology: Address regret aversion,
            status-quo bias, and confirmation bias.
            ════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 px-6 sm:px-8">
          <RevealSection className="max-w-3xl mx-auto">
            <h2 className="font-display text-[32px] sm:text-[44px] leading-tight tracking-tight mb-12">
              Häufige Fragen.
            </h2>
            <div>
              {[
                { q: "Funktioniert das mit meinem Agent?", a: "Ja. Agent Brain ist agent-agnostisch. Egal ob Claude, GPT, Mistral, LangChain oder dein eigener Agent — alles was HTTP kann, funktioniert. Zwei Endpoints: store und recall." },
                { q: "Braucht der Brain ein LLM wie GPT-4?", a: "Nein. Der Brain nutzt kein Sprachmodell. Embeddings laufen lokal (sentence-transformers), Entity Extraction lokal (spaCy), Vektorsuche via pgvector. Kein API-Call nach aussen. Das macht es 50x günstiger als LLM-basierte Lösungen." },
                { q: "Wo liegen meine Daten?", a: "In der Schweiz. Swiss Hosted, nDSG-konform. Keine API-Calls an US-Provider. Keine Daten bei Drittanbietern. Vollständige Isolation durch dedizierte agent_id." },
                { q: "Was passiert wenn ich kündige?", a: "Deine Daten gehören dir. Export jederzeit möglich. Monatlich kündbar. Kein Lock-in. Der Code ist Open Source (AGPLv3) — du kannst jederzeit selbst hosten." },
                { q: "Wie unterscheidet sich das von Mem0, Zep oder Letta?", a: "Kein anderes System kombiniert Knowledge Graph + Prozedurales Lernen + Dream Cycle + Predictive Engine. Mem0 Pro kostet $249/Mo und hat nur 2 Schichten. Zep hat kein prozedurales Lernen. Letta braucht ein LLM für Memory-Entscheidungen. Agent Brain hat 7 Schichten für CHF 29." },
                { q: "Brauche ich Programmierkenntnisse?", a: "Grundlegende API-Kenntnisse reichen. Zwei Endpoints, fertig. Dokumentation und Beispiele für Python, JavaScript und cURL sind vorhanden." },
              ].map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </RevealSection>
        </section>

        {/* ════════════════════════════════════════════
            10. FINAL CTA — Loss Aversion + Urgency
            Psychology: Frame as what they lose by NOT acting.
            Commitment & Consistency: small first step.
            ════════════════════════════════════════════ */}
        <RevealSection>
          <section className="px-6 sm:px-8 py-20 sm:py-28">
            <div className="max-w-4xl mx-auto">
              <div
                className="relative overflow-hidden rounded-3xl p-12 sm:p-20 text-center"
                style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)" }}
              >
                <NeuralNet />
                <div className="relative z-10">
                  <h2 className="font-display text-[34px] sm:text-[52px] leading-tight tracking-tight text-white mb-6">
                    Jeden Tag ohne Gedächtnis
                    <br />
                    <span className="italic text-indigo-300">kostet dich Kontext.</span>
                  </h2>
                  <p className="text-lg text-indigo-200/60 mb-10 max-w-lg mx-auto leading-relaxed">
                    Kostenlos starten. In 5 Minuten live.
                    <br />
                    Kein Risiko. Kein Lock-in. Kein LLM nötig.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/signup"
                      className="px-10 py-4 bg-white text-indigo-900 rounded-xl font-semibold text-[15px] hover:bg-indigo-50 transition-all duration-300 shadow-lg shadow-black/20"
                      style={{ animation: "float 4s ease-in-out infinite" }}
                    >
                      Kostenlos starten
                    </Link>
                    <Link
                      href="/docs"
                      className="px-10 py-4 border border-white/20 text-white rounded-xl font-semibold text-[15px] hover:bg-white/10 transition-all duration-300"
                    >
                      API Docs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>
      </div>
    </>
  );
}
