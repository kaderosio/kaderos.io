import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

const C = {
  primary: "#000088",
  secondary: "#000088",
  cyan: "#0891B2",
  green: "#059669",
  orange: "#E67E22",
  purple: "#000088",
  pink: "#DB2777",
  text: "#1D1D1F",
  muted: "#86868B",
  dim: "#A1A1AA",
  bg: "#FFFFFF",
  surface: "#F8F8FA",
  border: "#E8E8EC",
  borderLight: "#F0F0F4",
};

const FONT = "Outfit, -apple-system, sans-serif";
const MONO = "JetBrains Mono, SF Mono, Menlo, monospace";
const SMOOTH = { mass: 1, stiffness: 60, damping: 26 };
const GENTLE = { mass: 1.2, stiffness: 40, damping: 30 };

const sp = (f: number, fps: number, d = 0, c = SMOOTH) =>
  spring({ frame: Math.max(0, f - d), fps, config: c });

const fade = (f: number, s = 0, d = 25) =>
  interpolate(f, [s, s + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const slideUp = (f: number, s = 0, d = 30, dist = 25) =>
  interpolate(f, [s, s + d], [dist, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const SceneWrap: React.FC<{ children: React.ReactNode; dur: number; fadeIn?: number; fadeOut?: number }> = ({ children, dur, fadeIn = 20, fadeOut = 20 }) => {
  const f = useCurrentFrame();
  const inOp = fade(f, 0, fadeIn);
  const outOp = interpolate(f, [dur - fadeOut, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ opacity: Math.min(inOp, outOp) }}>{children}</AbsoluteFill>;
};

const SceneBg: React.FC<{ color?: string; op?: number }> = ({ color = C.primary, op = 0.05 }) => (
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${color}${Math.round(op * 255).toString(16).padStart(2, "0")} 0%, transparent 60%)`, pointerEvents: "none" }} />
);

// ── SCENE 0: CLAIM ──
const SceneClaim: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = ["Dein", "Team", "steht", "schon", "bereit."];
  const line2 = "Du musst es nur noch aktivieren.";
  const w1Start = 30;
  const wStag = 12;
  const l2Start = w1Start + words.length * wStag + 30;
  const shimmer = interpolate(f, [l2Start, l2Start + 180], [-100, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = 1 + 0.03 * Math.sin((f / 120) * Math.PI * 2);

  return (
    <SceneWrap dur={240}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.primary}14 0%, transparent 70%)`, transform: `scale(${glow})`, pointerEvents: "none" }} />
        <div style={{ textAlign: "center", padding: "0 60px", position: "relative" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: C.primary, display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 40px", opacity: fade(f, 0, 30), transform: `scale(${interpolate(sp(f, fps, 0, GENTLE), [0, 1], [0.8, 1])})`, boxShadow: "0 6px 20px rgba(0,0,136,0.18)" }}>
            <span style={{ color: "#FFF", fontSize: 22, fontFamily: FONT, fontWeight: 800 }}>K</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            {words.map((w, i) => {
              const d = w1Start + i * wStag;
              return <span key={i} style={{ display: "inline-block", fontSize: 58, fontFamily: FONT, fontWeight: 800, color: C.text, opacity: fade(f, d, 20), transform: `scale(${interpolate(sp(f, fps, d, SMOOTH), [0, 1], [0.93, 1])})`, margin: "0 6px", letterSpacing: "-1.5px", lineHeight: 1.2 }}>{w}</span>;
            })}
          </div>
          <div style={{ fontSize: 46, fontFamily: FONT, fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.2, opacity: fade(f, l2Start, 25), transform: `translateY(${slideUp(f, l2Start, 25, 15)}px)`, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.secondary} 100%)`, backgroundSize: "200% auto", backgroundPosition: `${shimmer}% center`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{line2}</div>
        </div>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ── SCENE 1: TERMINAL ──
const SceneTerminal: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = sp(f, fps, 0, GENTLE);
  const cmd = "npx kaderos onboard";
  const tStart = 45;
  const chars = Math.min(Math.floor(Math.max(0, f - tStart) / 4), cmd.length);
  const done = chars >= cmd.length;
  const tEnd = tStart + cmd.length * 4;
  const lines = [
    { text: '✓ Kader erkannt: "Agentur Zürich"', color: C.green, hl: false },
    { text: "✓ 4 Agents bereit (Max · Aura · Vega · Orion)", color: C.green, hl: false },
    { text: "✓ Budget: CHF 62/Monat", color: C.green, hl: false },
    { text: "🚀 Dein AI-Kader ist einsatzbereit.", color: C.primary, hl: true },
  ];
  const fl = tEnd + 20;
  const exitScale = interpolate(f, [260, 300], [1, 0.85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <SceneWrap dur={300}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg, padding: 50 }}>
        <SceneBg />
        <div style={{ width: 920, borderRadius: 24, overflow: "hidden", border: `1px solid ${C.border}`, backgroundColor: C.bg, boxShadow: "0 20px 60px rgba(0,0,136,0.08), 0 1px 3px rgba(0,0,0,0.04)", transform: `translateY(${interpolate(enter, [0, 1], [60, 0])}px) scale(${exitScale})`, opacity: interpolate(enter, [0, 1], [0, 1]) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "15px 22px", borderBottom: `1px solid ${C.border}`, backgroundColor: C.surface }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: c }} />)}
            <span style={{ marginLeft: 12, fontSize: 13, color: C.muted, fontFamily: MONO }}>kaderos — terminal</span>
          </div>
          <div style={{ padding: "30px 32px", fontFamily: MONO, fontSize: 17, lineHeight: 2.4, minHeight: 300 }}>
            <div style={{ color: C.text }}>
              <span style={{ color: C.primary, fontWeight: 600 }}>$ </span>{cmd.slice(0, chars)}
              {!done && <span style={{ display: "inline-block", width: 2, height: 18, backgroundColor: C.primary, marginLeft: 2, verticalAlign: "middle", opacity: f % 40 < 20 ? 1 : 0.15 }} />}
            </div>
            {done && lines.map((l, i) => {
              const ls = fl + i * 18;
              return <div key={i} style={{ color: l.color, opacity: fade(f, ls, 20), transform: `translateY(${slideUp(f, ls, 20, 12)}px)`, fontWeight: l.hl ? 700 : 400, ...(l.hl ? { background: `linear-gradient(90deg, ${C.primary}0A, ${C.secondary}08, transparent)`, marginLeft: -12, paddingLeft: 12, borderRadius: 6 } : {}) }}>{l.text}</div>;
            })}
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ── SCENE 2: DASHBOARD ──
const SceneDashboard: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const agents = [
    { name: "Max", role: "CTO Agent", task: "Plattform Setup + API", color: C.primary, initial: "M", tasks: "5 offen · 2 erledigt" },
    { name: "Aura", role: "CMO Agent", task: "Landing Page + Waitlist", color: C.cyan, initial: "A", tasks: "4 offen · 1 erledigt" },
    { name: "Vega", role: "CEO Agent", task: "GTM Strategy + Outreach", color: C.purple, initial: "V", tasks: "3 offen · 0 erledigt" },
    { name: "Orion", role: "Strategy", task: "Competitive Analysis", color: C.orange, initial: "O", tasks: "2 offen · 0 erledigt" },
  ];
  const rotY = interpolate(sp(f, fps, 0, GENTLE), [0, 1], [4, 0]);
  const glint = interpolate(f, [80, 160], [-30, 130], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <SceneWrap dur={300}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg, padding: 44 }}>
        <SceneBg />
        <div style={{ transform: `perspective(1400px) rotateY(${rotY}deg)`, width: 940 }}>
          <div style={{ textAlign: "center", marginBottom: 10, opacity: fade(f, 0, 25), transform: `translateY(${slideUp(f, 0, 25)}px)` }}>
            <div style={{ fontSize: 56, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-2px" }}>Dein Kader</div>
          </div>
          <div style={{ textAlign: "center", marginBottom: 28, opacity: fade(f, 12, 20), fontSize: 20, fontFamily: FONT, fontWeight: 500, color: C.muted }}>4 Agents · Active</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28, opacity: fade(f, 20, 25), transform: `translateY(${slideUp(f, 20, 25, 10)}px)` }}>
            {[{ l: "Agents aktiv", v: "3/4" }, { l: "Offene Tasks", v: "6" }, { l: "Budget/Mt.", v: "CHF 62" }].map((s, i) => (
              <div key={i} style={{ padding: "14px 24px", borderRadius: 14, backgroundColor: C.surface, border: `1px solid ${C.border}`, textAlign: "center", minWidth: 160 }}>
                <div style={{ fontSize: 12, fontFamily: FONT, fontWeight: 600, color: C.muted, marginBottom: 4 }}>{s.l}</div>
                <div style={{ fontSize: 24, fontFamily: FONT, fontWeight: 800, color: C.text }}>{s.v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            {agents.map((a, i) => {
              const d = 45 + i * 12;
              const s = sp(f, fps, d);
              return (
                <div key={i} style={{ width: 445, padding: "22px 20px", borderRadius: 18, border: `1px solid ${C.border}`, backgroundColor: C.bg, opacity: fade(f, d, 25), transform: `scale(${interpolate(s, [0, 1], [0.96, 1])}) translateY(${slideUp(f, d, 25, 18)}px)`, boxShadow: `0 4px 24px ${a.color}0F`, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, transparent ${glint - 15}%, rgba(255,255,255,0.5) ${glint}%, transparent ${glint + 15}%)`, pointerEvents: "none" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10, position: "relative" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: a.color, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 18, fontFamily: FONT, fontWeight: 800, color: "#FFF", flexShrink: 0 }}>{a.initial}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 18, fontFamily: FONT, fontWeight: 700, color: C.text }}>{a.name}</div>
                      <div style={{ fontSize: 13, fontFamily: FONT, fontWeight: 500, color: C.muted }}>{a.role}</div>
                    </div>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: C.green }} />
                  </div>
                  <div style={{ fontSize: 14, fontFamily: FONT, color: C.text, fontWeight: 500, marginBottom: 6 }}>{a.task}</div>
                  <div style={{ fontSize: 12, fontFamily: FONT, color: C.dim }}>{a.tasks}</div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ── SCENE 3: CTO DEEP-DIVE ──
const SceneCTODeepDive: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const commits = [
    { msg: "fix: rate limiting for /api/auth", time: "03:12", color: C.cyan },
    { msg: "feat: add input validation layer", time: "03:14", color: C.primary },
    { msg: "test: security audit — all passed", time: "03:15", color: C.green },
    { msg: "chore: create PR #47 → main", time: "03:16", color: C.secondary },
  ];
  const steps = ["Reading codebase", "Security analysis", "Applying fixes", "Creating PR"];
  const tools = [{ n: "filesystem.read", c: C.primary }, { n: "bash.exec", c: C.secondary }, { n: "github.create_pr", c: C.green }];
  const sDur = 50;
  const zoom = interpolate(sp(f, fps, 0, GENTLE), [0, 1], [0.97, 1]);

  return (
    <SceneWrap dur={300}>
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", backgroundColor: C.bg, padding: "50px 44px", transform: `scale(${zoom})` }}>
        <SceneBg color={C.secondary} op={0.04} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 30, opacity: fade(f, 0, 25), transform: `translateY(${slideUp(f, 0, 25)}px)` }}>
          <div style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: C.primary, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 20, fontFamily: FONT, fontWeight: 800, color: "#FFF" }}>M</div>
          <div>
            <div style={{ fontSize: 28, fontFamily: FONT, fontWeight: 800, color: C.text }}>Max · CTO</div>
            <div style={{ fontSize: 15, fontFamily: FONT, color: C.muted }}>Arbeitet autonom · 03:14</div>
          </div>
        </div>
        <div style={{ width: 920, borderRadius: 18, border: `1px solid ${C.border}`, backgroundColor: C.surface, padding: "22px 26px", marginBottom: 20, fontFamily: MONO, fontSize: 15, lineHeight: 2.4 }}>
          {commits.map((c, i) => { const s = 20 + i * 35; return <div key={i} style={{ opacity: fade(f, s, 22), transform: `translateY(${slideUp(f, s, 22, 10)}px)`, color: C.text }}><span style={{ color: C.green }}>✓ </span><span style={{ color: C.dim }}>{c.time}</span>{"  "}<span style={{ color: c.color }}>{c.msg}</span></div>; })}
        </div>
        <div style={{ width: 920, borderRadius: 18, border: `1px solid ${C.border}`, backgroundColor: C.surface, padding: "22px 26px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontFamily: FONT, fontWeight: 700, color: C.dim, marginBottom: 16, textTransform: "uppercase" as const, letterSpacing: 2 }}>Progress</div>
          {steps.map((step, i) => {
            const sS = 35 + i * sDur;
            const sF = Math.max(0, f - sS);
            const isDone = sF > sDur;
            const isAct = sF > 0 && !isDone;
            const fill = isDone ? 100 : isAct ? interpolate(sF, [0, sDur], [0, 100], { extrapolateRight: "clamp" }) : 0;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12, opacity: fade(f, sS, 20), fontSize: 17, fontFamily: FONT, fontWeight: isAct ? 600 : 500, color: isDone ? C.green : isAct ? C.primary : C.dim }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", border: `2px solid ${isDone ? C.green : isAct ? C.primary : C.border}`, position: "relative", overflow: "hidden", flexShrink: 0 }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${fill}%`, backgroundColor: isDone ? C.green : C.primary }} />
                  {isDone && <span style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", color: "#FFF", fontSize: 13, fontWeight: 800 }}>✓</span>}
                </div>
                {step}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 12, width: 920 }}>
          {tools.map((t, i) => { const d = 190 + i * 18; const act = f > d + 30; return <div key={i} style={{ opacity: fade(f, d, 20), transform: `translateY(${slideUp(f, d, 20, 10)}px)`, display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 12, backgroundColor: act ? `${t.c}0C` : C.surface, border: `1px solid ${act ? `${t.c}25` : C.border}`, fontFamily: MONO, fontSize: 14, color: t.c }}><div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: act ? C.green : C.dim }} />{t.n}</div>; })}
        </div>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ── SCENE 4: ROLES CAROUSEL ──
const SceneRoles: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const roles = [{ n: "CEO", c: C.purple, i: "V" }, { n: "CTO", c: C.primary, i: "M" }, { n: "CMO", c: C.cyan, i: "A" }, { n: "CFO", c: C.green, i: "$" }, { n: "PM", c: C.orange, i: "O" }, { n: "Creator", c: C.pink, i: "✍" }];
  const caps = ["Autonome Agents · 24/7", "Lokal · Deine Daten", "nDSG-konform · Swiss Made", "Ab CHF 49/Mt."];
  const tag = ["Dein", "Kader.", "Deine", "Regeln."];
  const base = f * 0.005;

  return (
    <SceneWrap dur={300}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg, overflow: "hidden" }}>
        <SceneBg op={0.06} />
        <div style={{ position: "absolute", left: "50%", top: 580, transform: "translate(-50%, -50%)", width: 72, height: 72, borderRadius: 18, backgroundColor: C.primary, display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 8px 30px rgba(0,0,136,0.18)", opacity: fade(f, 0, 30), zIndex: 10 }}>
          <span style={{ color: "#FFF", fontSize: 32, fontFamily: FONT, fontWeight: 800 }}>K</span>
        </div>
        {roles.map((r, idx) => {
          const a = base + (idx / roles.length) * Math.PI * 2;
          const x = Math.cos(a) * 220;
          const y = Math.sin(a) * 77;
          const z = Math.sin(a);
          const isFr = z > 0.6;
          return (
            <div key={idx} style={{ position: "absolute", left: `calc(50% + ${x}px - 40px)`, top: `calc(580px + ${y}px - 40px)`, width: 80, height: 80, borderRadius: 20, backgroundColor: isFr ? `${r.c}10` : C.surface, border: `1.5px solid ${isFr ? `${r.c}30` : C.border}`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 3, transform: `scale(${interpolate(z, [-1, 1], [0.75, 1.05])})`, opacity: interpolate(z, [-1, 1], [0.35, 1]) * fade(f, idx * 8, 25), zIndex: Math.round(z * 10) + 10, boxShadow: isFr ? `0 4px 20px ${r.c}14` : "none" }}>
              <div style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: r.c, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 14, fontFamily: FONT, fontWeight: 800, color: "#FFF" }}>{r.i}</div>
              <span style={{ fontSize: 11, fontFamily: FONT, fontWeight: 700, color: isFr ? r.c : C.muted }}>{r.n}</span>
            </div>
          );
        })}
        <div style={{ position: "absolute", top: 870, left: 0, right: 0, padding: "0 80px" }}>
          {caps.map((c, i) => { const d = 80 + i * 18; return <div key={i} style={{ opacity: fade(f, d, 25), transform: `translateX(${interpolate(sp(f, fps, d, GENTLE), [0, 1], [35, 0])}px)`, fontSize: 21, fontFamily: FONT, fontWeight: 600, color: C.text, padding: "12px 0", display: "flex", alignItems: "center", gap: 12 }}><span style={{ color: C.green, fontSize: 15 }}>✓</span>{c}</div>; })}
        </div>
        <div style={{ position: "absolute", bottom: 210, left: 0, right: 0, textAlign: "center" }}>
          {tag.map((w, i) => { const d = 200 + i * 12; return <span key={i} style={{ display: "inline-block", fontSize: 42, fontFamily: FONT, fontWeight: 800, color: C.text, opacity: fade(f, d, 20), transform: `scale(${interpolate(sp(f, fps, d, SMOOTH), [0, 1], [0.9, 1])})`, margin: "0 7px", letterSpacing: "-1px" }}>{w}</span>; })}
        </div>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ── SCENE 5: PIPELINE ──
const ScenePipeline: React.FC = () => {
  const f = useCurrentFrame();
  const steps = [{ l: "Brief rein", a: "Du", c: C.muted, i: "📝" }, { l: "Content-Plan", a: "Aura · CMO", c: C.cyan, i: "📋" }, { l: "Texte schreiben", a: "Creator", c: C.pink, i: "✍️" }, { l: "Landing Page", a: "Max · CTO", c: C.primary, i: "🖥️" }, { l: "ROI tracken", a: "CFO", c: C.green, i: "📊" }];
  const ball = interpolate(f, [45, 270], [0, steps.length - 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cur = Math.floor(ball);

  return (
    <SceneWrap dur={300}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg, overflow: "hidden" }}>
        <SceneBg color={C.cyan} op={0.04} />
        <div style={{ position: "absolute", top: 130, textAlign: "center", width: "100%", opacity: fade(f, 0, 25), transform: `translateY(${slideUp(f, 0, 25)}px)` }}>
          <div style={{ fontSize: 42, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-1px" }}>So arbeitet dein Kader</div>
          <div style={{ fontSize: 17, fontFamily: FONT, color: C.muted, marginTop: 10 }}>Agents koordinieren sich autonom</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, marginTop: 50 }}>
          {steps.map((s, i) => {
            const d = 25 + i * 28;
            const pass = ball >= i + 0.9;
            const act = cur === i;
            return (
              <React.Fragment key={i}>
                <div style={{ opacity: fade(f, d, 25), transform: `translateY(${slideUp(f, d, 25, 14)}px)`, display: "flex", alignItems: "center", gap: 18, padding: "20px 28px", width: 580, borderRadius: 16, backgroundColor: act ? `${s.c}08` : C.surface, border: `1.5px solid ${act ? `${s.c}25` : C.borderLight}`, position: "relative", boxShadow: act ? `0 4px 20px ${s.c}0A` : "none" }}>
                  {act && <div style={{ position: "absolute", left: 0, top: "18%", bottom: "18%", width: 3, borderRadius: 2, backgroundColor: s.c, boxShadow: `0 0 8px ${s.c}40` }} />}
                  <span style={{ fontSize: 24 }}>{pass ? "✅" : s.i}</span>
                  <div>
                    <div style={{ fontSize: 19, fontFamily: FONT, fontWeight: act ? 700 : 500, color: pass ? C.green : act ? s.c : C.text }}>{s.l}</div>
                    <div style={{ fontSize: 13, fontFamily: FONT, color: C.muted }}>{s.a}</div>
                  </div>
                </div>
                {i < steps.length - 1 && <div style={{ width: 2, height: 18, background: pass ? `linear-gradient(to bottom, ${s.c}50, ${steps[i + 1].c}30)` : C.border, opacity: fade(f, d + 14, 15) }} />}
              </React.Fragment>
            );
          })}
        </div>
        {ball >= steps.length - 1 && <div style={{ marginTop: 24, opacity: fade(f, 275, 20), fontSize: 20, fontFamily: FONT, fontWeight: 700, color: C.green }}>✅ Pipeline complete</div>}
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ── SCENE 6: PRICING ──
const ScenePricing: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tiers = [
    { name: "Free", price: "0", sub: "/Mt.", features: ["1 Agent", "Basis-Tasks", "Community"], highlight: false },
    { name: "Starter", price: "49", sub: "/Mt.", features: ["2 Agents", "Alle Tools", "E-Mail Support"], highlight: true },
    { name: "Pro", price: "149", sub: "/Mt.", features: ["4 Agents", "Priority", "Konnektoren"], highlight: false },
    { name: "Enterprise", price: "349", sub: "/Mt.", features: ["Unlimited", "Dedicated", "SLA 99.9%"], highlight: false },
  ];

  return (
    <SceneWrap dur={300}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg, overflow: "hidden" }}>
        <SceneBg op={0.04} />

        {/* Title */}
        <div style={{ position: "absolute", top: 130, textAlign: "center", width: "100%", opacity: fade(f, 0, 25), transform: `translateY(${slideUp(f, 0, 25)}px)` }}>
          <div style={{ fontSize: 42, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-1.5px" }}>Was es kostet. Ohne Kleingedrucktes.</div>
          <div style={{ fontSize: 17, fontFamily: FONT, color: C.muted, marginTop: 10 }}>Alle Pläne monatlich kündbar</div>
        </div>

        {/* 4 Pricing Cards */}
        <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
          {tiers.map((tier, i) => {
            const d = 40 + i * 15;
            const s = sp(f, fps, d);
            const scale = interpolate(s, [0, 1], [0.94, 1]);
            const op = fade(f, d, 25);
            const y = slideUp(f, d, 25, 20);

            // Animated counter for price
            const priceNum = parseInt(tier.price);
            const counterVal = Math.round(interpolate(
              Math.max(0, f - d - 10),
              [0, 40],
              [0, priceNum],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ));

            return (
              <div
                key={i}
                style={{
                  width: 210,
                  padding: "28px 20px",
                  borderRadius: 20,
                  backgroundColor: tier.highlight ? `${C.primary}06` : C.bg,
                  border: `${tier.highlight ? 2 : 1}px solid ${tier.highlight ? C.primary + "30" : C.border}`,
                  opacity: op,
                  transform: `scale(${scale}) translateY(${y}px)`,
                  textAlign: "center",
                  boxShadow: tier.highlight ? `0 8px 30px ${C.primary}10` : "0 2px 12px rgba(0,0,0,0.03)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Popular badge */}
                {tier.highlight && (
                  <div style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    fontSize: 10,
                    fontFamily: FONT,
                    fontWeight: 700,
                    color: C.primary,
                    backgroundColor: `${C.primary}10`,
                    padding: "3px 8px",
                    borderRadius: 6,
                    textTransform: "uppercase" as const,
                    letterSpacing: 1,
                    opacity: fade(f, d + 20, 15),
                  }}>
                    Beliebt
                  </div>
                )}

                {/* Plan name */}
                <div style={{ fontSize: 14, fontFamily: FONT, fontWeight: 700, color: tier.highlight ? C.primary : C.muted, marginBottom: 16, textTransform: "uppercase" as const, letterSpacing: 1.5 }}>
                  {tier.name}
                </div>

                {/* Price with counter */}
                <div style={{ marginBottom: 20 }}>
                  <span style={{
                    fontSize: 44,
                    fontFamily: FONT,
                    fontWeight: 800,
                    color: tier.highlight ? C.primary : C.text,
                  }}>
                    {counterVal}
                  </span>
                  <span style={{ fontSize: 16, fontFamily: FONT, fontWeight: 500, color: C.muted, marginLeft: 2 }}>
                    {tier.sub}
                  </span>
                </div>

                {/* Features */}
                {tier.features.map((feat, fi) => (
                  <div key={fi} style={{
                    opacity: fade(f, d + 30 + fi * 10, 15),
                    fontSize: 13,
                    fontFamily: FONT,
                    fontWeight: 500,
                    color: C.muted,
                    padding: "6px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}>
                    <span style={{ color: C.green, fontSize: 11 }}>✓</span>
                    {feat}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <div style={{ marginTop: 36, textAlign: "center", opacity: fade(f, 200, 30) }}>
          <span style={{ fontSize: 20, fontFamily: FONT, fontWeight: 600, color: C.muted }}>
            🇨🇭 Swiss Made · Alle Preise in CHF · Keine versteckten Kosten
          </span>
        </div>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ── SCENE 7: SWISS TRUST ──
const SceneSwissTrust: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ph = f < 100 ? 0 : f < 200 ? 1 : 2;
  const pf = f < 100 ? f : f < 200 ? f - 100 : f - 200;
  const phOp = (d: number) => Math.min(fade(pf, 0, 25), interpolate(pf, [d - 25, d], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  return (
    <SceneWrap dur={300} fadeOut={10}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg }}>
        <SceneBg color={ph === 0 ? "#DC2626" : C.primary} op={0.04} />
        {ph === 0 && <div style={{ textAlign: "center", opacity: phOp(100) }}>
          <div style={{ fontSize: 110, transform: `scale(${interpolate(sp(pf, fps, 0, GENTLE), [0, 1], [0.7, 1])})` }}>🇨🇭</div>
          <div style={{ fontSize: 46, fontFamily: FONT, fontWeight: 800, color: C.text, marginTop: 24, opacity: fade(pf, 18, 25), letterSpacing: "-1px" }}>Swiss Made</div>
          <div style={{ fontSize: 20, fontFamily: FONT, fontWeight: 500, color: C.muted, marginTop: 12, opacity: fade(pf, 30, 25) }}>Gebaut in der Schweiz. Für die Schweiz.</div>
        </div>}
        {ph === 1 && <div style={{ textAlign: "center", padding: 60, opacity: phOp(100) }}>
          {["Lokal.", "Autonom.", "nDSG-konform."].map((w, i) => <div key={i} style={{ fontSize: 52, fontFamily: FONT, fontWeight: 800, color: C.text, opacity: fade(pf, i * 18, 22), transform: `scale(${interpolate(sp(pf, fps, i * 18, SMOOTH), [0, 1], [0.93, 1])})`, letterSpacing: "-1px", marginBottom: 12 }}>{w}</div>)}
          <div style={{ fontSize: 17, fontFamily: MONO, color: C.muted, marginTop: 28, opacity: fade(pf, 58, 25), lineHeight: 1.8 }}>Keine Cloud. Keine Drittanbieter.<br />Deine Daten.</div>
        </div>}
        {ph === 2 && <div style={{ textAlign: "center", opacity: phOp(100) }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, backgroundColor: C.primary, display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 28px", transform: `scale(${interpolate(sp(pf, fps, 0, SMOOTH), [0, 1], [0.7, 1])})`, boxShadow: "0 10px 30px rgba(0,0,136,0.20)" }}><span style={{ color: "#FFF", fontSize: 36, fontFamily: FONT, fontWeight: 800 }}>K</span></div>
          <div style={{ fontSize: 42, fontFamily: FONT, fontWeight: 800, color: C.text, opacity: fade(pf, 10, 25) }}>100% Open Source</div>
          <div style={{ fontSize: 19, fontFamily: FONT, fontWeight: 500, color: C.muted, marginTop: 12, opacity: fade(pf, 22, 25) }}>Community Driven · Transparent · Frei</div>
        </div>}
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ── SCENE 8: CTA → LOOP ──
const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = interpolate(sp(f, fps, 0, GENTLE), [0, 1], [0.7, 1]);
  const trace = (f / 120) * 360;
  const cursor = f > 30 && f % 50 < 25;
  const loop = interpolate(f, [280, 320], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = 1 + 0.01 * Math.sin((f / 90) * Math.PI * 2);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <AbsoluteFill style={{ opacity: loop }}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg }}>
          <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.primary}0D 0%, transparent 70%)`, transform: `scale(${glow})`, pointerEvents: "none" }} />
          <div style={{ textAlign: "center", position: "relative" }}>
            <div style={{ width: 96, height: 96, borderRadius: 24, backgroundColor: C.primary, display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 36px", transform: `scale(${logoS})`, boxShadow: "0 12px 40px rgba(0,0,136,0.22)" }}><span style={{ color: "#FFF", fontSize: 44, fontFamily: FONT, fontWeight: 800 }}>K</span></div>
            <div style={{ fontSize: 58, fontFamily: FONT, fontWeight: 800, color: C.text, opacity: fade(f, 30, 25), letterSpacing: "-2px" }}>
              kaderos.io{cursor && <span style={{ display: "inline-block", width: 3, height: 46, backgroundColor: C.primary, marginLeft: 4, verticalAlign: "middle", opacity: 0.6 }} />}
            </div>
            <div style={{ marginTop: 28, opacity: fade(f, 60, 25), display: "inline-block", position: "relative" }}>
              <div style={{ padding: "16px 52px", borderRadius: 16, backgroundColor: `${C.primary}12`, border: `2px solid ${C.primary}30`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: -2, borderRadius: 16, background: `conic-gradient(from ${trace}deg, transparent 0%, ${C.primary}70 8%, transparent 16%)`, mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMaskComposite: "xor", padding: 2, opacity: 0.5 }} />
                <span style={{ fontSize: 26, fontFamily: FONT, fontWeight: 700, color: C.primary, position: "relative", zIndex: 1 }}>Platz sichern</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 18, justifyContent: "center", marginTop: 32, opacity: fade(f, 90, 25), fontSize: 16, fontFamily: FONT, fontWeight: 500, color: C.muted }}>
              <span>🇨🇭 Swiss Made</span><span style={{ color: C.dim }}>·</span><span>Open Source</span><span style={{ color: C.dim }}>·</span><span>Ab CHF 49/Mt.</span>
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN — 9 Scenes, ~42s @ 60fps, 20-frame crossfade overlap
// ══════════════════════════════════════════════════════════

export const HeroVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Sequence from={0} durationInFrames={240}><SceneClaim /></Sequence>
    <Sequence from={220} durationInFrames={300}><SceneTerminal /></Sequence>
    <Sequence from={500} durationInFrames={300}><SceneDashboard /></Sequence>
    <Sequence from={780} durationInFrames={300}><SceneCTODeepDive /></Sequence>
    <Sequence from={1060} durationInFrames={300}><SceneRoles /></Sequence>
    <Sequence from={1340} durationInFrames={300}><ScenePipeline /></Sequence>
    <Sequence from={1620} durationInFrames={300}><ScenePricing /></Sequence>
    <Sequence from={1900} durationInFrames={300}><SceneSwissTrust /></Sequence>
    <Sequence from={2180} durationInFrames={320}><SceneCTA /></Sequence>
  </AbsoluteFill>
);
