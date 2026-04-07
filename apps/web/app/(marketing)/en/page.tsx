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
  return <span ref={ref}>{count.toLocaleString("en-CH")}{suffix}</span>;
}

// -- WAITLIST COUNT --
function WaitlistCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch("/api/waitlist").then(r => r.json()).then(d => { if (d.count) setCount(d.count); }).catch(() => {});
  }, []);
  return <>{count > 0 ? count : "..."}</>;
}

// -- REFERRAL PROGRESS BAR --
function ReferralProgress({ count, goal }: { count: number; goal: number }) {
  const clamped = Math.min(count, goal);
  const pct = (clamped / goal) * 100;
  const remaining = goal - clamped;

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-semibold text-[#1D1D1F]">
          {clamped} of {goal} friends invited
        </span>
        {remaining > 0 ? (
          <span className="text-[11px] text-[#86868B]">{remaining} more!</span>
        ) : (
          <span className="text-[11px] font-semibold text-[#059669]">Goal reached!</span>
        )}
      </div>
      <div className="w-full h-2.5 bg-[#F5F5F7] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: pct >= 100
              ? "linear-gradient(90deg, #059669, #10B981)"
              : "linear-gradient(90deg, #000088, #3739C1)",
          }}
        />
      </div>
      {remaining > 0 && (
        <p className="text-[11px] text-[#86868B] mt-1.5">
          Invite {remaining} {remaining === 1 ? "friend" : "friends"} and jump 50 spots ahead
        </p>
      )}
    </div>
  );
}

// -- REFERRAL LEADERBOARD --
function ReferralLeaderboard() {
  const [leaders, setLeaders] = useState<{ name: string; referral_count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/referral")
      .then((r) => r.json())
      .then((d) => {
        if (d.leaderboard) setLeaders(d.leaderboard);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || leaders.length === 0) return null;

  return (
    <div className="max-w-md mx-auto mt-6">
      <div className="text-[12px] font-semibold text-[#86868B] uppercase tracking-widest mb-3 text-center">
        Top Referrers
      </div>
      <div className="bg-[#F5F5F7] rounded-xl p-3 space-y-1.5">
        {leaders.slice(0, 5).map((entry, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-white"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-bold text-[#86868B] w-5 text-center">
                {i === 0 ? "\u{1F947}" : i === 1 ? "\u{1F948}" : i === 2 ? "\u{1F949}" : `${i + 1}.`}
              </span>
              <span className="text-[13px] font-medium text-[#1D1D1F]">{entry.name}</span>
            </div>
            <span className="text-[12px] font-semibold text-[#000088]">
              {entry.referral_count} {entry.referral_count === 1 ? "invite" : "invites"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// -- WAITLIST FORM (secondary) --
function WaitlistForm({ variant = "default" }: { variant?: "default" | "hero" }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pos, setPos] = useState(0);
  const [refCode, setRefCode] = useState("");
  const [error, setError] = useState("");
  const [referralCount, setReferralCount] = useState(0);

  const REFERRAL_GOAL = 3;

  // After signup: load referral stats
  useEffect(() => {
    if (refCode) {
      fetch(`/api/referral?code=${refCode}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.referral_count !== undefined) setReferralCount(d.referral_count);
          if (d.effective_position) setPos(d.effective_position);
        })
        .catch(() => {});
    }
  }, [refCode]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || loading) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams(window.location.search);
      const referredBy = params.get("ref") || null;
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "landing-en", referred_by: referredBy }),
      });
      const data = await res.json();
      if (data.success) {
        setPos(data.position);
        setRefCode(data.referral_code);
        setDone(true);

        // Increase referral count for referrer
        if (referredBy && !data.already_registered) {
          fetch("/api/referral", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ referred_by: referredBy }),
          }).catch(() => {});
        }
      } else {
        setError(data.error === "Already registered" ? "You're already on the waitlist!" : "Something went wrong.");
      }
    } catch { setError("Connection error. Please try again."); }
    setLoading(false);
  };

  const [copied, setCopied] = useState(false);
  const referralLink = `https://kaderos.io/en?ref=${refCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`KaderOS -- the AI platform for Swiss SMEs. Secure your spot: ${referralLink}`)}`, "_blank");
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`, "_blank");
  };

  const shareX = () => {
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(`KaderOS brings AI agents to Swiss SMEs. I'm on the waitlist -- join me:`)}&url=${encodeURIComponent(referralLink)}`, "_blank");
  };

  const shareEmail = () => {
    const subject = encodeURIComponent("KaderOS -- AI Team for your company");
    const body = encodeURIComponent(`Hey,\n\nI'm on the waitlist for KaderOS -- an AI platform built for Swiss SMEs. 4 AI agents for CHF 79/month.\n\nSecure your spot: ${referralLink}\n\nCheers`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  if (done) return (
    <div className="text-center py-6 space-y-5">
      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#059669]/10 border border-[#059669]/20 rounded-full">
        <Check size={16} className="text-[#059669]" />
        <span className="text-[14px] font-medium text-[#059669]">You&apos;re #{pos} on the waitlist</span>
      </div>

      {refCode && (
        <div className="space-y-5">
          {/* Progress Bar */}
          <ReferralProgress count={referralCount} goal={REFERRAL_GOAL} />

          <p className="text-[13px] text-[#1D1D1F] font-medium leading-relaxed">
            Invite 3 friends = jump 50 spots ahead
          </p>

          {/* Referral Link Display */}
          <div className="flex items-center gap-2 max-w-md mx-auto bg-[#F5F5F7] rounded-xl p-1.5">
            <span className="flex-1 text-[12px] text-[#86868B] truncate pl-3 select-all">
              kaderos.io/en?ref={refCode}
            </span>
            <button onClick={copyLink}
              className={`px-4 py-2 rounded-lg text-[12px] font-semibold transition-all shrink-0 ${
                copied
                  ? "bg-[#059669] text-white"
                  : "bg-[#000088] text-white hover:bg-[#000066]"
              }`}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button onClick={shareWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#25D366]/10 text-[#25D366] rounded-lg text-[12px] font-medium hover:bg-[#25D366]/20 transition-colors"
              aria-label="Share on WhatsApp">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </button>
            <button onClick={shareLinkedIn}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0A66C2]/10 text-[#0A66C2] rounded-lg text-[12px] font-medium hover:bg-[#0A66C2]/20 transition-colors"
              aria-label="Share on LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </button>
            <button onClick={shareX}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1D1D1F]/5 text-[#1D1D1F] rounded-lg text-[12px] font-medium hover:bg-[#1D1D1F]/10 transition-colors"
              aria-label="Share on X">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X
            </button>
            <button onClick={shareEmail}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#6E6E73]/5 text-[#6E6E73] rounded-lg text-[12px] font-medium hover:bg-[#6E6E73]/10 transition-colors"
              aria-label="Share via email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Email
            </button>
          </div>

          {/* Leaderboard */}
          <ReferralLeaderboard />
        </div>
      )}
    </div>
  );

  return (
    <form onSubmit={submit} className={`flex flex-col sm:flex-row gap-3 ${variant === "hero" ? "max-w-xl mx-auto" : ""}`}>
      <div className="flex-1">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-5 py-3.5 bg-white border border-[#D2D2D7] rounded-xl text-[14px] text-[#1D1D1F] placeholder:text-[#C7C7CC] outline-none focus:border-[#000088] focus:shadow-[0_0_0_3px_#00008810] transition-all" />
        {error && <div className="text-[11px] text-[#DC2626] mt-1 ml-1">{error}</div>}
      </div>
      <button type="submit" disabled={loading}
        className={`px-7 py-3.5 bg-[#000088] text-white text-[14px] font-semibold rounded-xl flex items-center gap-2 transition-all shrink-0 ${loading ? "opacity-60" : "hover:bg-[#000066] hover:shadow-lg active:scale-[0.98]"}`}>
        {loading ? (
          <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting</>
        ) : (
          <>Join Waitlist <ArrowRight size={16} /></>
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
      label: "Orchestrate",
      icon: Zap,
      title: "Workflows, Heartbeat Engine, Scheduling",
      points: [
        "Heartbeat Engine: Automatic daily agent runs",
        "Multi-step workflows with state and conditions",
        "Task delegation between agents",
        "Cron-based scheduling for recurring tasks",
      ],
    },
    {
      label: "Build & Integrate",
      icon: Cog,
      title: "Agent Builder, Connectors, Knowledge Base",
      points: [
        "Visual Agent Builder with 6 configuration tabs",
        "12+ connectors: Claude, GPT, Mistral, DeepL, GitHub, Notion",
        "Knowledge Base: documents as agent context",
        "Templates for Swiss industries",
      ],
    },
    {
      label: "Observe & Optimize",
      icon: Eye,
      title: "Execution Trace, Activity Log, Decisions",
      points: [
        "Execution Trace: every step fully transparent",
        "Activity Log: who did what, when, and why",
        "Confidence scoring for autonomous decisions",
        "Token and cost breakdown per run",
      ],
    },
    {
      label: "Manage & Scale",
      icon: Building2,
      title: "Budget, Billing, Team, Multi-Company",
      points: [
        "Budget limits in CHF per agent per month",
        "Multi-Company: run multiple companies in isolation",
        "Team management with roles and permissions",
        "Stripe billing with CHF pricing",
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
export default function LandingPageEN() {
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
          {/* Language Switcher */}
          <div className="s1 flex items-center justify-center gap-2 mb-6">
            <Link href="/" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#86868B] hover:bg-[#F5F5F7] transition-colors">
              <Globe size={13} /> DE
            </Link>
            <span className="text-[#E5E5EA]">|</span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-[#000088] bg-[#000088]/5">
              <Globe size={13} /> EN
            </span>
          </div>

          <h1 className="s2 text-[32px] sm:text-[56px] md:text-[72px] leading-[1.05] font-extrabold tracking-tight mb-6">
            Your AI Team.<br />
            <span className="gradient-text">For your company.</span>
          </h1>

          <p className="s3 text-[18px] sm:text-[24px] text-[#6E6E73] max-w-2xl mx-auto mb-10 leading-snug font-semibold tracking-tight">
            4 Agents. CHF 79 per month. Working while you sleep.
          </p>

          {/* CTAs */}
          <div className="s4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/signup"
              className="px-8 py-4 bg-[#000088] text-white text-[15px] font-semibold rounded-xl hover:bg-[#000066] hover:shadow-xl transition-all flex items-center gap-2">
              Secure your spot <ArrowRight size={18} />
            </Link>
            <Link href="/login"
              className="px-8 py-4 bg-white text-[#000088] text-[15px] font-semibold rounded-xl border-2 border-[#000088] hover:bg-[#000088]/5 transition-all flex items-center gap-2">
              Try the demo
            </Link>
          </div>

          <p className="s4 text-[12px] text-[#86868B] mb-8">
            Demo login: demo@kaderos.io / Demo2026!
          </p>

          {/* Product Hunt Badge */}
          <div className="s4 mb-10">
            <a href="https://www.producthunt.com/products/kaderos?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-kaderos" target="_blank" rel="noopener noreferrer">
              <img alt="KaderOS - Hire an AI team. Run it like a CEO. | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1117355&theme=light&t=1775528008705" className="mx-auto" />
            </a>
          </div>

          {/* Hero Video */}
          <div className="s4 relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[#E5E5EA]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23FAFBFF' width='1920' height='1080'/%3E%3C/svg%3E"
            >
              <source src="https://ivihifwhfxxqnoznuumm.supabase.co/storage/v1/object/public/kaderos-videos/hero-promo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ---- SECTION 2: SOCIAL PROOF BAR ---- */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 border-y border-[#F5F5F7] bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-[13px] font-bold text-[#1D1D1F] mb-1">Swiss Made</div>
              <div className="text-[11px] text-[#86868B]">Software</div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#1D1D1F] mb-1">Open Source</div>
              <div className="text-[11px] text-[#86868B]">
                <a href="https://github.com/kaderosio/kaderos.io" target="_blank" rel="noopener noreferrer" className="hover:text-[#000088] transition-colors">on GitHub</a>
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#000088] mb-1"><WaitlistCount /> founders</div>
              <div className="text-[11px] text-[#86868B]">on the waitlist</div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#1D1D1F] mb-1">27 API Endpoints</div>
              <div className="text-[11px] text-[#86868B]">live</div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#1D1D1F] mb-1">11 Dashboard Pages</div>
              <div className="text-[11px] text-[#86868B]">in production</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- SECTION 3: HOW IT WORKS ---- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">How it works</div>
            <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight">3 steps. Then your team is working.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Set up your team",
                desc: "Pick a template or build your agents manually. Solo founder, agency, accounting firm -- up and running in under 5 minutes.",
                icon: Users,
                color: "#000088",
              },
              {
                step: "02",
                title: "Assign tasks",
                desc: "Create tasks, set goals, define budgets in CHF. Every agent knows exactly what to do.",
                icon: ClipboardList,
                color: "#000088",
              },
              {
                step: "03",
                title: "Let them work automatically",
                desc: "Your team works in the background. Every day. The Heartbeat Engine makes sure nothing falls through the cracks.",
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

      {/* ---- SECTION 4: FEATURES -- 4 PILLARS ---- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Why KaderOS</div>
            <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight">Simple. Trustworthy. Scalable. Swiss.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Simple */}
            <div className="bg-white rounded-2xl p-8 border border-[#E5E5EA] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[#000088]/10">
                <Zap size={22} className="text-[#000088]" />
              </div>
              <h3 className="text-[18px] font-bold mb-4">Simple</h3>
              <ul className="space-y-3">
                {[
                  "Templates: 5 minutes to your first AI team",
                  "No code. Everything in the browser.",
                  "Visual Agent Builder with 6 configuration tabs",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#6E6E73]">
                    <Check size={16} className="text-[#000088] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trustworthy */}
            <div className="bg-white rounded-2xl p-8 border border-[#E5E5EA] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[#059669]/10">
                <ShieldCheck size={22} className="text-[#059669]" />
              </div>
              <h3 className="text-[18px] font-bold mb-4">Trustworthy</h3>
              <ul className="space-y-3">
                {[
                  "Every decision logged (confidence scoring)",
                  "Budget limits in CHF per agent",
                  "Execution Trace: who did what, when, and why",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#6E6E73]">
                    <Check size={16} className="text-[#059669] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Scalable */}
            <div className="bg-white rounded-2xl p-8 border border-[#E5E5EA] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[#0891B2]/10">
                <Layers size={22} className="text-[#0891B2]" />
              </div>
              <h3 className="text-[18px] font-bold mb-4">Scalable</h3>
              <ul className="space-y-3">
                {[
                  "From 1 to 25+ agents",
                  "Workflows: multi-step automation",
                  "Heartbeat Engine: automatic daily runs",
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
                  "Built in Switzerland. Not translated.",
                  "CHF pricing. Not converted.",
                  "nDSG-compliant. Swiss hosting.",
                  "Bexio, DeepL, QR invoices (coming soon)",
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
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Platform</div>
            <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight mb-4">Everything you need. In one dashboard.</h2>
            <p className="text-[15px] text-[#6E6E73]">4 pillars. From orchestration to scaling.</p>
          </div>

          <PlatformTabs />
        </div>
      </section>

      {/* ---- SECTION 5.5: BRAIN / AGENT MEMORY -- THE USP ---- */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#000088] to-[#000066] text-white">
        <div className="max-w-5xl mx-auto">
          {/* Hero Statement */}
          <div className="text-center mb-16">
            <div className="text-[12px] font-semibold text-white/60 uppercase tracking-widest mb-4">The Core</div>
            <h2 className="text-[32px] sm:text-[52px] font-extrabold tracking-tight mb-6 leading-[1.1]">
              A memory that never forgets.<br />
              A system that improves every day.
            </h2>
            <p className="text-[17px] text-white/70 max-w-2xl mx-auto leading-relaxed">
              Most AI tools build a better hard drive. The Agent Brain builds a living knowledge graph.
              It draws connections no one defined. It thinks ahead. And it learns every night.
            </p>
            <p className="text-[14px] text-white/50 mt-4">
              No LLM. No API call to OpenAI. Pure database work and math. CHF 5/month operating cost.
            </p>
          </div>

          {/* 7 Layers Visual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { num: "01", title: "Perception Gate", desc: "Evaluates every piece of info: emotion, novelty, urgency, trust. The gatekeeper.", color: "#4d4dff" },
              { num: "02", title: "Working Memory", desc: "7-item buffer like in humans. What survives gets consolidated.", color: "#5c5cff" },
              { num: "03", title: "Episodic Memory", desc: "Concrete memories. Reconsolidation: they change when retrieved.", color: "#6b6bff" },
              { num: "04", title: "Knowledge Graph", desc: "A living network of entities and relationships. Grows exponentially.", color: "#7a7aff" },
              { num: "05", title: "Procedural Memory", desc: "Patterns through repetition. After 3x it becomes a rule.", color: "#8989ff" },
              { num: "06", title: "Predictive Engine", desc: "Proactive alerts every 60 min. Warns before problems escalate.", color: "#9898ff" },
              { num: "07", title: "Dream Cycle", desc: "2:00 AM: forgetting, compressing, discovering creative connections.", color: "#a7a7ff" },
            ].map((layer, i) => (
              <div key={i} className={`rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-all ${i === 6 ? "sm:col-span-2 lg:col-span-4 lg:max-w-md lg:mx-auto" : ""}`}>
                <div className="text-[11px] font-mono text-white/40 mb-2">LAYER {layer.num}</div>
                <h3 className="text-[15px] font-bold mb-1">{layer.title}</h3>
                <p className="text-[12px] text-white/60 leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>

          {/* Dream Cycle Highlight */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-[12px] font-semibold text-white/50 uppercase tracking-widest mb-3">What happens at 2:00 AM</div>
                <h3 className="text-[24px] sm:text-[28px] font-bold mb-4">Your AI squad dreams.</h3>
                <p className="text-[15px] text-white/70 leading-relaxed mb-4">
                  Not like a human. But similarly. The Dream Cycle takes random pairs of memories and searches
                  for non-obvious connections. Object A always has problems in winter. Object B does too.
                  Both have the same person responsible. A connection nobody drew during the day.
                </p>
                <p className="text-[14px] text-white/50">
                  This is the equivalent of human REM sleep. Humans solve problems in their sleep
                  because the brain can test connections undisturbed.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Forget", desc: "Ebbinghaus curve. Unimportant things fade. Important things remain." },
                  { label: "Compress", desc: "Similar memories (92%+) get merged together." },
                  { label: "Discover", desc: "Creative connection search between unrelated entities." },
                  { label: "Derive", desc: "New rules emerge. They migrate to procedural memory." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start rounded-xl bg-white/5 p-4">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[11px] font-bold">{i + 1}</div>
                    <div>
                      <div className="text-[13px] font-semibold">{item.label}</div>
                      <div className="text-[12px] text-white/50">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline: How it becomes human */}
          <div className="mb-16">
            <h3 className="text-[20px] font-bold text-center mb-8">How your AI squad improves over time</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { time: "Day 1", desc: "Stores everything. First connections." },
                { time: "Week 1", desc: "Knows all contacts. First patterns." },
                { time: "Month 1", desc: "500+ connections. First alerts." },
                { time: "Month 3", desc: "70%+ correct predictions." },
                { time: "Year 1", desc: "Irreplaceable. Institutional knowledge." },
              ].map((step, i) => (
                <div key={i} className="text-center rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-[13px] font-bold text-white/90 mb-1">{step.time}</div>
                  <div className="text-[11px] text-white/50 leading-relaxed">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison: What competitors DON'T have */}
          <div className="mb-16">
            <h3 className="text-[20px] font-bold text-center mb-6">No other product has this.</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 px-3 font-semibold text-white/60">Feature</th>
                    <th className="text-center py-2 px-3 font-bold text-white">KaderOS</th>
                    <th className="text-center py-2 px-3 font-semibold text-white/40">Mem0</th>
                    <th className="text-center py-2 px-3 font-semibold text-white/40">Zep</th>
                    <th className="text-center py-2 px-3 font-semibold text-white/40">CrewAI</th>
                    <th className="text-center py-2 px-3 font-semibold text-white/40">MemGPT</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feat: "Knowledge Graph", k: true, m: false, z: false, c: false, mg: false },
                    { feat: "Emotion Scoring", k: true, m: false, z: false, c: false, mg: false },
                    { feat: "Ebbinghaus Forgetting", k: true, m: false, z: false, c: false, mg: false },
                    { feat: "Reconsolidation", k: true, m: false, z: false, c: false, mg: false },
                    { feat: "Dream Cycle", k: true, m: false, z: false, c: false, mg: false },
                    { feat: "Predictive Engine", k: true, m: false, z: false, c: false, mg: false },
                    { feat: "No LLM required", k: true, m: false, z: true, c: false, mg: false },
                    { feat: "CHF 5/mo operation", k: true, m: false, z: false, c: false, mg: false },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-2 px-3 text-white/70">{row.feat}</td>
                      <td className="py-2 px-3 text-center text-green-400 font-bold">{row.k ? "\u2713" : "\u2014"}</td>
                      <td className="py-2 px-3 text-center text-white/20">{row.m ? "\u2713" : "\u2014"}</td>
                      <td className="py-2 px-3 text-center text-white/20">{row.z ? "\u2713" : "\u2014"}</td>
                      <td className="py-2 px-3 text-center text-white/20">{row.c ? "\u2713" : "\u2014"}</td>
                      <td className="py-2 px-3 text-center text-white/20">{row.mg ? "\u2713" : "\u2014"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/brain" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#000088] rounded-xl font-semibold text-[14px] hover:bg-white/90 transition">
              Learn more about Agent Brain <ArrowRight size={16} />
            </Link>
            <p className="text-[12px] text-white/40 mt-3">Open Source. AGPLv3. Everything on GitHub.</p>
          </div>
        </div>
      </section>

      {/* ---- SECTION 6: DEMO ---- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Live Demo</div>
          <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight mb-5">
            Try KaderOS now -- no registration required
          </h2>
          <p className="text-[15px] text-[#6E6E73] mb-4 leading-relaxed">
            NovaTech GmbH: 4 agents, 13 tasks, CHF 118.60 in costs -- all live in the demo account.
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
              Start demo <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- SECTION 7: PRICING PREVIEW ---- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">Pricing</div>
            <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight mb-5">What it costs. No fine print.</h2>

            {/* Annual Toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 bg-[#F5F5F7] rounded-xl mb-10">
              <button onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-lg text-[13px] font-medium transition-all ${!annual ? "bg-white text-[#1D1D1F] shadow-sm" : "text-[#6E6E73]"}`}>
                Monthly
              </button>
              <button onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-lg text-[13px] font-medium transition-all flex items-center gap-2 ${annual ? "bg-white text-[#1D1D1F] shadow-sm" : "text-[#6E6E73]"}`}>
                Annually <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#059669]/10 text-[#059669] font-semibold">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              {
                name: "Community", price: 0, annual: 0, per: "forever", agents: "3 Agents",
                feats: ["Org Chart + Tasks + Goals", "Meeting Room", "1 Company", "Community Support", "Open Source"],
                pop: false,
              },
              {
                name: "Pro", price: 79, annual: 63, per: "/month", agents: "10 Agents",
                feats: ["Everything in Community", "Budget tracking in CHF", "Audit Trail", "5 Swiss templates", "Email support within 24h"],
                pop: true,
              },
              {
                name: "Team", price: 149, annual: 119, per: "/month", agents: "25 Agents",
                feats: ["Everything in Pro", "Multi-Company", "Priority support within 4h", "Custom templates", "API Access"],
                pop: false,
              },
            ].map(p => (
              <div key={p.name} className={`relative rounded-2xl p-7 border transition-all ${p.pop ? "border-[#000088] bg-white shadow-xl shadow-[#000088]/10 scale-[1.02]" : "border-[#E5E5EA] bg-white"}`}>
                {p.pop && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#000088] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Popular</div>}
                <div className="text-[13px] font-semibold text-[#86868B] mb-4">{p.name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[12px] text-[#86868B]">CHF</span>
                  <span className="text-[42px] font-extrabold text-[#1D1D1F]">{annual ? p.annual : p.price}</span>
                  <span className="text-[12px] text-[#86868B]">{p.per}</span>
                </div>
                {annual && p.price > 0 && (
                  <div className="text-[11px] text-[#059669] font-medium mb-1">Save CHF {(p.price - p.annual) * 12}/year</div>
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
                  Get started free
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center space-y-2">
            <p className="text-[12px] text-[#86868B]">All prices in CHF. No hidden costs. BYOK -- your API keys, your costs.</p>
            <Link href="/pricing" className="inline-flex items-center gap-1 text-[13px] text-[#000088] font-semibold hover:underline">
              View all plans and pricing <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- SECTION 8: WHAT KADEROS IS / IS NOT ---- */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight mb-3">
              Swiss Made. Not a US import<br />with a Swiss flag.
            </h2>
            <p className="text-[14px] text-[#6E6E73]">nDSG from day 1. CHF from day 1. Built locally from day 1.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* WHAT IT IS */}
            <div className="rounded-2xl border border-[#059669]/30 bg-[#059669]/5 p-8">
              <div className="text-[14px] font-bold text-[#059669] uppercase tracking-widest mb-6">What KaderOS is</div>
              <ul className="space-y-4">
                {[
                  "Operating system for your AI team",
                  "Open Source (AGPLv3) -- auditable",
                  "BYOK -- your keys, your costs",
                  "Cloud login at kaderos.io",
                  "nDSG-compliant with audit trail",
                  "CHF-native budgets per agent",
                  "Swiss-built UI",
                  "Templates for Swiss industries",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[#1D1D1F]">
                    <Check size={16} className="text-[#059669] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* WHAT IT IS NOT */}
            <div className="rounded-2xl border border-[#DC2626]/30 bg-[#DC2626]/5 p-8">
              <div className="text-[14px] font-bold text-[#DC2626] uppercase tracking-widest mb-6">What KaderOS is not</div>
              <ul className="space-y-4">
                {[
                  "Not a ChatGPT wrapper",
                  "Not a US tool with a translated UI",
                  "Not a CLI -- everything in the browser",
                  "Not Python code like CrewAI",
                  "Not a black box -- code is open",
                  "No vendor lock-in -- BYOK",
                  "No hidden pricing",
                  "Not production-ready -- honestly beta",
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
            Ready for your AI team?
          </h2>
          <p className="text-[16px] text-[#6E6E73] mb-10 leading-relaxed">
            Start free with 3 agents. No credit card required.
          </p>
          <Link href="/signup"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#000088] text-white text-[16px] font-semibold rounded-xl hover:bg-[#000066] hover:shadow-xl transition-all">
            Secure your spot <ArrowRight size={18} />
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
