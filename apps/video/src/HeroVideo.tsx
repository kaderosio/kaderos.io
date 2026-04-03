import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// ══════════════════════════════════════════════════════════
// V2 — CINEMATIC
// ══════════════════════════════════════════════════════════

const C = {
  primary: "#000088",
  cyan: "#0891B2",
  green: "#059669",
  orange: "#E67E22",
  purple: "#6C3AC8",
  pink: "#DB2777",
  text: "#1D1D1F",
  muted: "#86868B",
  dim: "#A1A1AA",
  bg: "#FFFFFF",
  surface: "#F8F8FA",
  border: "#E8E8EC",
};

const FONT = "Outfit, -apple-system, sans-serif";
const MONO = "JetBrains Mono, SF Mono, Menlo, monospace";

// Varied spring presets for different feels
const SNAPPY = { mass: 0.6, stiffness: 120, damping: 18 };
const SMOOTH = { mass: 1, stiffness: 60, damping: 26 };
const HEAVY = { mass: 2, stiffness: 50, damping: 30 };
const BOUNCY = { mass: 0.8, stiffness: 100, damping: 12 };

const sp = (f: number, fps: number, d = 0, c = SMOOTH) =>
  spring({ frame: Math.max(0, f - d), fps, config: c });

const fade = (f: number, s = 0, d = 25) =>
  interpolate(f, [s, s + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const fadeOut = (f: number, s: number, d = 20) =>
  interpolate(f, [s, s + d], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

// ══════════════════════════════════════════════════════════
// SCENE 0 — CINEMATIC CLAIM (5s / 300 frames)
// Big typography, dramatic reveal, breathing space
// ══════════════════════════════════════════════════════════

const SceneClaim: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom on entire scene — cinematic drift
  const sceneDrift = interpolate(f, [0, 300], [1.02, 1], { extrapolateRight: "clamp" });

  // Logo: drops in with weight
  const logoDrop = sp(f, fps, 20, HEAVY);
  const logoY = interpolate(logoDrop, [0, 1], [-80, 0]);
  const logoOp = interpolate(logoDrop, [0, 1], [0, 1]);

  // Line 1: each letter staggers in from bottom
  const line1 = "Dein Team steht schon bereit.";
  const line1Start = 60;
  const charDelay = 2;

  // Line 2: sweeps in as a block from right with blur
  const line2 = "Du musst es nur noch aktivieren.";
  const line2Start = 150;
  const l2Progress = sp(f, fps, line2Start, SNAPPY);
  const l2X = interpolate(l2Progress, [0, 1], [120, 0]);
  const l2Op = interpolate(l2Progress, [0, 1], [0, 1]);
  const l2Blur = interpolate(f, [line2Start, line2Start + 20], [12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Underline draw animation under line 2
  const lineDrawStart = line2Start + 30;
  const lineDraw = interpolate(f, [lineDrawStart, lineDrawStart + 40], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Exit: everything lifts up and out
  const exitStart = 250;
  const exitY = interpolate(f, [exitStart, 300], [0, -60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOp = fadeOut(f, exitStart, 40);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, transform: `scale(${sceneDrift})` }}>
      {/* Ambient moving gradient */}
      <div style={{
        position: "absolute",
        width: 800,
        height: 800,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${C.primary}08 0%, transparent 70%)`,
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) translate(${Math.sin(f / 60) * 30}px, ${Math.cos(f / 80) * 20}px)`,
        pointerEvents: "none",
      }} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `translateY(${exitY}px)`, opacity: exitOp }}>
        <div style={{ textAlign: "center", padding: "0 50px" }}>
          {/* Logo */}
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            backgroundColor: C.primary,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 50px",
            opacity: logoOp,
            transform: `translateY(${logoY}px)`,
            boxShadow: "0 8px 30px rgba(0,0,136,0.2)",
          }}>
            <span style={{ color: "#FFF", fontSize: 26, fontFamily: FONT, fontWeight: 800 }}>K</span>
          </div>

          {/* Line 1 — per-character stagger from bottom */}
          <div style={{ fontSize: 48, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-1.5px", lineHeight: 1.15, marginBottom: 16 }}>
            {line1.split("").map((ch, i) => {
              const d = line1Start + i * charDelay;
              const charY = interpolate(f, [d, d + 18], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const charOp = fade(f, d, 15);
              return (
                <span key={i} style={{
                  display: "inline-block",
                  transform: `translateY(${charY}px)`,
                  opacity: charOp,
                  whiteSpace: ch === " " ? "pre" : undefined,
                }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              );
            })}
          </div>

          {/* Line 2 — sweep from right with blur */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{
              fontSize: 38,
              fontFamily: FONT,
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.2,
              color: C.primary,
              opacity: l2Op,
              transform: `translateX(${l2X}px)`,
              filter: `blur(${l2Blur}px)`,
            }}>
              {line2}
            </div>

            {/* Animated underline */}
            <div style={{
              position: "absolute",
              bottom: -6,
              left: 0,
              height: 3,
              width: `${lineDraw}%`,
              background: `linear-gradient(90deg, ${C.primary}, ${C.primary}40)`,
              borderRadius: 2,
            }} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 1 — TERMINAL (5s / 300 frames)
// Cinematic: perspective tilt, scanline, glow cursor
// ══════════════════════════════════════════════════════════

const SceneTerminal: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Terminal rises with 3D perspective rotation
  const enterSpring = sp(f, fps, 0, HEAVY);
  const rotX = interpolate(enterSpring, [0, 1], [15, 0]);
  const termY = interpolate(enterSpring, [0, 1], [200, 0]);
  const termOp = interpolate(enterSpring, [0, 1], [0, 1]);
  const termScale = interpolate(enterSpring, [0, 1], [0.85, 1]);

  const cmd = "npx kaderos onboard";
  const tStart = 50;
  const chars = Math.min(Math.floor(Math.max(0, f - tStart) / 3), cmd.length);
  const done = chars >= cmd.length;
  const tEnd = tStart + cmd.length * 3;

  const lines = [
    { text: '✓ Kader erkannt: "Agentur Zürich"', color: C.green },
    { text: "✓ 4 Agents bereit (Max · Aura · Vega · Orion)", color: C.green },
    { text: "✓ Budget: CHF 62/Monat", color: C.green },
    { text: "🚀 Dein AI-Kader ist einsatzbereit.", color: C.primary },
  ];
  const fl = tEnd + 15;

  // Scanline sweeps after typing
  const scanY = done ? interpolate(f, [tEnd + 5, tEnd + 25], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : -10;

  // Exit: terminal tilts and slides away
  const exitStart = 260;
  const exitRotX = interpolate(f, [exitStart, 300], [0, -10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitY2 = interpolate(f, [exitStart, 300], [0, -100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOp = fadeOut(f, exitStart, 35);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg, perspective: "1000px" }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", width: 600, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.primary}0A 0%, transparent 70%)`, top: "40%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />

      <div style={{
        width: 920,
        borderRadius: 24,
        overflow: "hidden",
        border: `1px solid ${C.border}`,
        backgroundColor: C.bg,
        boxShadow: `0 30px 80px rgba(0,0,136,0.10), 0 2px 4px rgba(0,0,0,0.04)`,
        transform: `translateY(${termY + exitY2}px) scale(${termScale}) rotateX(${rotX + exitRotX}deg)`,
        opacity: termOp * exitOp,
        transformStyle: "preserve-3d" as const,
      }}>
        {/* Title Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "15px 22px", borderBottom: `1px solid ${C.border}`, backgroundColor: C.surface }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: c }} />)}
          <span style={{ marginLeft: 12, fontSize: 13, color: C.muted, fontFamily: MONO }}>kaderos — terminal</span>
        </div>

        {/* Body */}
        <div style={{ padding: "30px 32px", fontFamily: MONO, fontSize: 17, lineHeight: 2.4, minHeight: 300, position: "relative", overflow: "hidden" }}>
          {/* Scanline */}
          {scanY >= 0 && scanY <= 100 && (
            <div style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${scanY}%`,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${C.primary}60, ${C.cyan}40, transparent)`,
              boxShadow: `0 0 15px ${C.primary}30`,
              zIndex: 5,
            }} />
          )}

          {/* Command with glow cursor */}
          <div style={{ color: C.text }}>
            <span style={{ color: C.primary, fontWeight: 600 }}>$ </span>{cmd.slice(0, chars)}
            {!done && (
              <span style={{
                display: "inline-block",
                width: 10,
                height: 20,
                backgroundColor: C.primary,
                marginLeft: 2,
                verticalAlign: "middle",
                opacity: f % 30 < 15 ? 0.9 : 0.2,
                borderRadius: 2,
                boxShadow: `0 0 12px ${C.primary}60`,
              }} />
            )}
          </div>

          {/* Output — each line slides in from different direction */}
          {done && lines.map((l, i) => {
            const ls = fl + i * 16;
            const lineSpring = sp(f, fps, ls, SNAPPY);
            const lx = interpolate(lineSpring, [0, 1], [i % 2 === 0 ? -40 : 40, 0]);
            const lOp = fade(f, ls, 18);
            const lBlur = interpolate(f, [ls, ls + 12], [6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                color: l.color,
                opacity: lOp,
                transform: `translateX(${lx}px)`,
                filter: `blur(${lBlur}px)`,
                fontWeight: i === 3 ? 700 : 400,
              }}>
                {l.text}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 2 — DASHBOARD (6s / 360 frames)
// Cards fly in from scattered positions, settle into grid
// ══════════════════════════════════════════════════════════

const SceneDashboard: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const agents = [
    { name: "Max", role: "CTO Agent", task: "Plattform Setup + API", color: C.primary, initial: "M", startX: -180, startY: -120, startRot: -10 },
    { name: "Aura", role: "CMO Agent", task: "Landing Page + Waitlist", color: C.cyan, initial: "A", startX: 180, startY: -100, startRot: 8 },
    { name: "Vega", role: "CEO Agent", task: "GTM Strategy + Outreach", color: C.purple, initial: "V", startX: -150, startY: 130, startRot: 6 },
    { name: "Orion", role: "Strategy", task: "Competitive Analysis", color: C.orange, initial: "O", startX: 200, startY: 150, startRot: -12 },
  ];

  // Title — types out
  const title = "Dein Kader";
  const titleChars = Math.min(Math.floor(f / 4), title.length);

  // Stats counter animations
  const stat1 = Math.min(Math.round(interpolate(f, [80, 130], [0, 3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })), 3);
  const stat2 = Math.min(Math.round(interpolate(f, [90, 140], [0, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })), 6);
  const stat3 = Math.min(Math.round(interpolate(f, [100, 150], [0, 62], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })), 62);

  // Glint sweep
  const glint = interpolate(f, [180, 280], [-30, 130], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg, padding: 44, overflow: "hidden" }}>
      {/* Subtle grid pattern */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(${C.border} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        opacity: interpolate(f, [0, 60], [0, 0.3], { extrapolateRight: "clamp" }),
      }} />

      <div style={{ width: 940, position: "relative" }}>
        {/* Title — typewriter */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 56, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-2px" }}>
            {title.slice(0, titleChars)}
          </span>
          {titleChars < title.length && (
            <span style={{ display: "inline-block", width: 3, height: 44, backgroundColor: C.primary, marginLeft: 3, verticalAlign: "middle", opacity: f % 30 < 15 ? 1 : 0.2 }} />
          )}
        </div>

        <div style={{ textAlign: "center", marginBottom: 28, opacity: fade(f, 30, 20), fontSize: 20, fontFamily: FONT, fontWeight: 500, color: C.muted }}>
          4 Agents · Active
        </div>

        {/* Stats row with counting animation */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28, opacity: fade(f, 60, 30) }}>
          {[
            { l: "Agents aktiv", v: `${stat1}/4` },
            { l: "Offene Tasks", v: `${stat2}` },
            { l: "Budget/Mt.", v: `CHF ${stat3}` },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "14px 24px",
              borderRadius: 14,
              backgroundColor: C.surface,
              border: `1px solid ${C.border}`,
              textAlign: "center",
              minWidth: 160,
              transform: `translateY(${interpolate(sp(f, fps, 60 + i * 8, SNAPPY), [0, 1], [20, 0])}px)`,
            }}>
              <div style={{ fontSize: 12, fontFamily: FONT, fontWeight: 600, color: C.muted, marginBottom: 4 }}>{s.l}</div>
              <div style={{ fontSize: 24, fontFamily: FONT, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Agent cards — fly in from scattered positions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          {agents.map((a, i) => {
            const d = 50 + i * 20;
            const s = sp(f, fps, d, BOUNCY);
            // Fly from scattered position to grid position
            const x = interpolate(s, [0, 1], [a.startX, 0]);
            const y = interpolate(s, [0, 1], [a.startY, 0]);
            const rot = interpolate(s, [0, 1], [a.startRot, 0]);
            const scale = interpolate(s, [0, 1], [0.6, 1]);
            const op = fade(f, d, 20);

            return (
              <div key={i} style={{
                width: 445,
                padding: "22px 20px",
                borderRadius: 18,
                border: `1px solid ${C.border}`,
                backgroundColor: C.bg,
                opacity: op,
                transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`,
                boxShadow: `0 4px 24px ${a.color}12`,
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Glint sweep */}
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, transparent ${glint - 15}%, ${C.bg}CC ${glint}%, transparent ${glint + 15}%)`, pointerEvents: "none" }} />

                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10, position: "relative" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: a.color, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 18, fontFamily: FONT, fontWeight: 800, color: "#FFF", flexShrink: 0 }}>{a.initial}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 18, fontFamily: FONT, fontWeight: 700, color: C.text }}>{a.name}</div>
                    <div style={{ fontSize: 13, fontFamily: FONT, fontWeight: 500, color: C.muted }}>{a.role}</div>
                  </div>
                  {/* Pulsing active dot */}
                  <div style={{ position: "relative" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: C.green }} />
                    <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `1.5px solid ${C.green}`, opacity: 0.3 + 0.3 * Math.sin(f / 20 + i), transform: `scale(${1 + 0.3 * Math.sin(f / 20 + i)})` }} />
                  </div>
                </div>
                <div style={{ fontSize: 14, fontFamily: FONT, color: C.text, fontWeight: 500 }}>{a.task}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 3 — CTO DEEP-DIVE (5s / 300 frames)
// Zoom punch-in, code matrix rain, progress bar fills
// ══════════════════════════════════════════════════════════

const SceneCTODeepDive: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const commits = [
    { msg: "fix: rate limiting for /api/auth", time: "03:12", color: C.cyan },
    { msg: "feat: add input validation layer", time: "03:14", color: C.primary },
    { msg: "test: security audit — all passed", time: "03:15", color: C.green },
    { msg: "chore: create PR #47 → main", time: "03:16", color: C.purple },
  ];

  const steps = ["Reading codebase", "Security analysis", "Applying fixes", "Creating PR"];
  const tools = [{ n: "filesystem.read", c: C.primary }, { n: "bash.exec", c: C.purple }, { n: "github.create_pr", c: C.green }];

  // Punch-in zoom
  const zoomSpring = sp(f, fps, 0, SNAPPY);
  const zoom = interpolate(zoomSpring, [0, 1], [1.3, 1]);
  const zoomOp = interpolate(zoomSpring, [0, 1], [0, 1]);

  // Overall progress bar
  const totalProgress = interpolate(f, [30, 260], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", backgroundColor: C.bg, padding: "50px 44px", transform: `scale(${zoom})`, opacity: zoomOp, overflow: "hidden" }}>
      {/* Faint code rain in background */}
      {Array.from({ length: 8 }).map((_, i) => {
        const col = (i * 120 + 60);
        const yOff = ((f * 1.5 + i * 200) % 2200) - 200;
        return (
          <div key={i} style={{
            position: "absolute",
            left: col,
            top: yOff,
            fontFamily: MONO,
            fontSize: 11,
            color: `${C.primary}05`,
            lineHeight: 1.8,
            pointerEvents: "none",
            whiteSpace: "pre",
          }}>
            {"const\nfetch\nawait\nasync\nreturn\nexport\nimport\nclass".split("\n").map((w, wi) => <div key={wi}>{w}</div>)}
          </div>
        );
      })}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, opacity: fade(f, 0, 20), width: 920 }}>
        <div style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: C.primary, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 20, fontFamily: FONT, fontWeight: 800, color: "#FFF" }}>M</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 28, fontFamily: FONT, fontWeight: 800, color: C.text }}>Max · CTO</div>
          <div style={{ fontSize: 15, fontFamily: FONT, color: C.muted }}>Arbeitet autonom · 03:14</div>
        </div>
        {/* Overall progress bar */}
        <div style={{ width: 200, height: 6, borderRadius: 3, backgroundColor: C.border, overflow: "hidden" }}>
          <div style={{ width: `${totalProgress}%`, height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${C.primary}, ${C.green})` }} />
        </div>
      </div>

      {/* Commits */}
      <div style={{ width: 920, borderRadius: 18, border: `1px solid ${C.border}`, backgroundColor: C.surface, padding: "22px 26px", marginBottom: 20, fontFamily: MONO, fontSize: 15, lineHeight: 2.4 }}>
        {commits.map((c, i) => {
          const s = 25 + i * 30;
          const lineSpring = sp(f, fps, s, SNAPPY);
          const scaleX = interpolate(lineSpring, [0, 1], [0.3, 1]);
          return (
            <div key={i} style={{ opacity: fade(f, s, 15), transform: `scaleX(${scaleX})`, transformOrigin: "left", color: C.text }}>
              <span style={{ color: C.green }}>✓ </span>
              <span style={{ color: C.dim }}>{c.time}</span>{"  "}
              <span style={{ color: c.color }}>{c.msg}</span>
            </div>
          );
        })}
      </div>

      {/* Steps with horizontal fill bars */}
      <div style={{ width: 920, borderRadius: 18, border: `1px solid ${C.border}`, backgroundColor: C.surface, padding: "22px 26px", marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontFamily: FONT, fontWeight: 700, color: C.dim, marginBottom: 16, textTransform: "uppercase" as const, letterSpacing: 2 }}>Progress</div>
        {steps.map((step, i) => {
          const sS = 40 + i * 45;
          const sF = Math.max(0, f - sS);
          const isDone = sF > 45;
          const isAct = sF > 0 && !isDone;
          const fill = isDone ? 100 : isAct ? interpolate(sF, [0, 45], [0, 100], { extrapolateRight: "clamp" }) : 0;

          return (
            <div key={i} style={{ marginBottom: 14, opacity: fade(f, sS, 18) }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 16, fontFamily: FONT, fontWeight: isAct ? 700 : 500, color: isDone ? C.green : isAct ? C.primary : C.dim }}>{step}</span>
                <span style={{ fontSize: 13, fontFamily: MONO, color: isDone ? C.green : C.dim }}>{Math.round(fill)}%</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, backgroundColor: C.border, overflow: "hidden" }}>
                <div style={{ width: `${fill}%`, height: "100%", borderRadius: 2, backgroundColor: isDone ? C.green : C.primary, transition: "none" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tool pills — pop in with bounce */}
      <div style={{ display: "flex", gap: 12, width: 920 }}>
        {tools.map((t, i) => {
          const d = 200 + i * 15;
          const s = sp(f, fps, d, BOUNCY);
          const scale = interpolate(s, [0, 1], [0, 1]);
          return (
            <div key={i} style={{
              transform: `scale(${scale})`,
              display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 12,
              backgroundColor: `${t.c}0C`, border: `1px solid ${t.c}25`,
              fontFamily: MONO, fontSize: 14, color: t.c,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: C.green }} />
              {t.n}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 4 — ROLES ORBIT (5s / 300 frames)
// Orbiting cards, center logo pulses
// ══════════════════════════════════════════════════════════

const SceneRoles: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const roles = [
    { n: "CEO", c: C.purple, i: "V" }, { n: "CTO", c: C.primary, i: "M" },
    { n: "CMO", c: C.cyan, i: "A" }, { n: "CFO", c: C.green, i: "$" },
    { n: "PM", c: C.orange, i: "O" }, { n: "Creator", c: C.pink, i: "✍" },
  ];
  const caps = ["Autonome Agents · 24/7", "Lokal · Deine Daten", "nDSG-konform · Swiss Made", "Ab CHF 49/Mt."];
  const tag = ["Dein", "Kader.", "Deine", "Regeln."];
  const base = f * 0.008; // Faster orbit
  const radius = 220;

  // Logo pulse
  const logoPulse = 1 + 0.04 * Math.sin(f / 25);

  // Connection lines from logo to orbiting cards
  const logoX = 540; // center of 1080
  const logoY = 580;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg, overflow: "hidden" }}>
      {/* Radial glow */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.primary}0A 0%, transparent 70%)`, left: "50%", top: 580, transform: "translate(-50%, -50%)" }} />

      {/* Connection lines */}
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} viewBox="0 0 1080 1920">
        {roles.map((r, idx) => {
          const a = base + (idx / roles.length) * Math.PI * 2;
          const cx = logoX + Math.cos(a) * radius;
          const cy = logoY + Math.sin(a) * radius * 0.35;
          const lineOp = fade(f, 30 + idx * 5, 20) * 0.12;
          return <line key={idx} x1={logoX} y1={logoY} x2={cx} y2={cy} stroke={r.c} strokeWidth={1} opacity={lineOp} />;
        })}
      </svg>

      {/* Center logo */}
      <div style={{
        position: "absolute", left: "50%", top: 580, transform: `translate(-50%, -50%) scale(${logoPulse})`,
        width: 72, height: 72, borderRadius: 18, backgroundColor: C.primary,
        display: "flex", justifyContent: "center", alignItems: "center",
        boxShadow: `0 8px 30px rgba(0,0,136,0.20), 0 0 60px rgba(0,0,136,${0.05 + 0.03 * Math.sin(f / 25)})`,
        opacity: fade(f, 0, 30), zIndex: 10,
      }}>
        <span style={{ color: "#FFF", fontSize: 32, fontFamily: FONT, fontWeight: 800 }}>K</span>
      </div>

      {/* Orbiting cards */}
      {roles.map((r, idx) => {
        const a = base + (idx / roles.length) * Math.PI * 2;
        const x = Math.cos(a) * radius;
        const y = Math.sin(a) * radius * 0.35;
        const z = Math.sin(a);
        const isFr = z > 0.6;
        const cardScale = interpolate(z, [-1, 1], [0.7, 1.1]);
        const cardOp = interpolate(z, [-1, 1], [0.25, 1]) * fade(f, idx * 6, 20);

        return (
          <div key={idx} style={{
            position: "absolute",
            left: `calc(50% + ${x}px - 42px)`,
            top: `calc(580px + ${y}px - 42px)`,
            width: 84, height: 84, borderRadius: 22,
            backgroundColor: isFr ? `${r.c}12` : C.surface,
            border: `1.5px solid ${isFr ? `${r.c}40` : C.border}`,
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 3,
            transform: `scale(${cardScale})`,
            opacity: cardOp,
            zIndex: Math.round(z * 10) + 10,
            boxShadow: isFr ? `0 6px 25px ${r.c}18` : "none",
          }}>
            <div style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: r.c, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 14, fontFamily: FONT, fontWeight: 800, color: "#FFF" }}>{r.i}</div>
            <span style={{ fontSize: 11, fontFamily: FONT, fontWeight: 700, color: isFr ? r.c : C.muted }}>{r.n}</span>
          </div>
        );
      })}

      {/* Capabilities — slide in alternating from left/right */}
      <div style={{ position: "absolute", top: 870, left: 0, right: 0, padding: "0 80px" }}>
        {caps.map((c, i) => {
          const d = 80 + i * 18;
          const dir = i % 2 === 0 ? -40 : 40;
          const s = sp(f, fps, d, SNAPPY);
          return (
            <div key={i} style={{
              opacity: fade(f, d, 22),
              transform: `translateX(${interpolate(s, [0, 1], [dir, 0])}px)`,
              fontSize: 21, fontFamily: FONT, fontWeight: 600, color: C.text, padding: "12px 0",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ color: C.green, fontSize: 15 }}>✓</span>{c}
            </div>
          );
        })}
      </div>

      {/* Tagline — scale bounce */}
      <div style={{ position: "absolute", bottom: 210, left: 0, right: 0, textAlign: "center" }}>
        {tag.map((w, i) => {
          const d = 200 + i * 10;
          const s = sp(f, fps, d, BOUNCY);
          return <span key={i} style={{ display: "inline-block", fontSize: 42, fontFamily: FONT, fontWeight: 800, color: C.text, opacity: fade(f, d, 15), transform: `scale(${interpolate(s, [0, 1], [0.5, 1])})`, margin: "0 7px", letterSpacing: "-1px" }}>{w}</span>;
        })}
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5 — PIPELINE (5s / 300 frames)
// Energy ball travels down, nodes light up
// ══════════════════════════════════════════════════════════

const ScenePipeline: React.FC = () => {
  const f = useCurrentFrame();
  const steps = [
    { l: "Brief rein", a: "Du", c: C.muted, i: "📝" },
    { l: "Content-Plan", a: "Aura · CMO", c: C.cyan, i: "📋" },
    { l: "Texte schreiben", a: "Creator", c: C.pink, i: "✍️" },
    { l: "Landing Page", a: "Max · CTO", c: C.primary, i: "🖥️" },
    { l: "ROI tracken", a: "CFO", c: C.green, i: "📊" },
  ];

  const ball = interpolate(f, [45, 270], [0, steps.length - 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cur = Math.floor(ball);

  // Calculate positions for energy dot
  const stepHeight = 82; // approx height per step + gap
  const pipelineTop = 350;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg, overflow: "hidden" }}>
      {/* Title */}
      <div style={{ position: "absolute", top: 130, textAlign: "center", width: "100%", opacity: fade(f, 0, 25) }}>
        <div style={{ fontSize: 42, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-1px" }}>So arbeitet dein Kader</div>
        <div style={{ fontSize: 17, fontFamily: FONT, color: C.muted, marginTop: 10 }}>Agents koordinieren sich autonom</div>
      </div>

      {/* Energy dot traveling down */}
      {ball > 0 && ball < steps.length && (
        <div style={{
          position: "absolute",
          left: "50%",
          top: pipelineTop + ball * stepHeight,
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: steps[cur]?.c || C.primary,
          transform: "translate(-50%, -50%)",
          boxShadow: `0 0 20px ${steps[cur]?.c || C.primary}60, 0 0 40px ${steps[cur]?.c || C.primary}30`,
          zIndex: 50,
        }} />
      )}

      {/* Pipeline steps */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, marginTop: 50 }}>
        {steps.map((s, i) => {
          const d = 25 + i * 25;
          const pass = ball >= i + 0.9;
          const act = cur === i;

          // Card entrance: each from alternating sides
          const enterDir = i % 2 === 0 ? -60 : 60;
          const enterX = interpolate(f, [d, d + 25], [enterDir, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <React.Fragment key={i}>
              <div style={{
                opacity: fade(f, d, 22),
                transform: `translateX(${enterX}px)`,
                display: "flex", alignItems: "center", gap: 18, padding: "20px 28px", width: 580, borderRadius: 16,
                backgroundColor: act ? `${s.c}08` : C.surface,
                border: `1.5px solid ${act ? `${s.c}30` : C.border}`,
                position: "relative",
                boxShadow: act ? `0 4px 25px ${s.c}12` : "none",
              }}>
                {act && <div style={{ position: "absolute", left: 0, top: "15%", bottom: "15%", width: 3, borderRadius: 2, backgroundColor: s.c, boxShadow: `0 0 10px ${s.c}50` }} />}
                <span style={{ fontSize: 24 }}>{pass ? "✅" : s.i}</span>
                <div>
                  <div style={{ fontSize: 19, fontFamily: FONT, fontWeight: act ? 700 : 500, color: pass ? C.green : act ? s.c : C.text }}>{s.l}</div>
                  <div style={{ fontSize: 13, fontFamily: FONT, color: C.muted }}>{s.a}</div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  width: 2, height: 18,
                  background: pass ? `linear-gradient(to bottom, ${s.c}60, ${steps[i + 1].c}40)` : C.border,
                  opacity: fade(f, d + 14, 12),
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {ball >= steps.length - 1 && (
        <div style={{ marginTop: 24, opacity: fade(f, 275, 20), fontSize: 20, fontFamily: FONT, fontWeight: 700, color: C.green }}>
          ✅ Pipeline complete
        </div>
      )}
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 6 — PRICING TIERS (5s / 300 frames)
// Cards rise like towers, counters tick up
// ══════════════════════════════════════════════════════════

const ScenePricing: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tiers = [
    { name: "Free", price: 0, features: ["1 Agent", "Basis-Tasks", "Community"], hl: false },
    { name: "Starter", price: 49, features: ["2 Agents", "Alle Tools", "E-Mail Support"], hl: true },
    { name: "Pro", price: 149, features: ["4 Agents", "Priority", "Konnektoren"], hl: false },
    { name: "Enterprise", price: 349, features: ["Unlimited", "Dedicated", "SLA 99.9%"], hl: false },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg, overflow: "hidden" }}>
      {/* Title */}
      <div style={{ position: "absolute", top: 130, textAlign: "center", width: "100%", opacity: fade(f, 0, 25) }}>
        <div style={{ fontSize: 42, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-1.5px" }}>Was es kostet. Ohne Kleingedrucktes.</div>
        <div style={{ fontSize: 17, fontFamily: FONT, color: C.muted, marginTop: 10 }}>Alle Pläne monatlich kündbar</div>
      </div>

      {/* Cards rise from bottom like towers */}
      <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
        {tiers.map((tier, i) => {
          const d = 40 + i * 18;
          // Rise from below — each card at different speed
          const riseSpring = sp(f, fps, d, { ...HEAVY, stiffness: 40 + i * 10 });
          const riseY = interpolate(riseSpring, [0, 1], [400, 0]);
          const op = interpolate(riseSpring, [0, 0.3, 1], [0, 0.5, 1]);

          // Counter
          const counterVal = Math.round(interpolate(
            Math.max(0, f - d - 20),
            [0, 50],
            [0, tier.price],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ));

          return (
            <div key={i} style={{
              width: 210, padding: "28px 20px", borderRadius: 20,
              backgroundColor: tier.hl ? `${C.primary}06` : C.bg,
              border: `${tier.hl ? 2 : 1}px solid ${tier.hl ? C.primary + "30" : C.border}`,
              opacity: op,
              transform: `translateY(${riseY}px)`,
              textAlign: "center",
              boxShadow: tier.hl ? `0 8px 30px ${C.primary}10` : "0 2px 12px rgba(0,0,0,0.03)",
              position: "relative",
            }}>
              {tier.hl && <div style={{ position: "absolute", top: 12, right: 12, fontSize: 10, fontFamily: FONT, fontWeight: 700, color: C.primary, backgroundColor: `${C.primary}10`, padding: "3px 8px", borderRadius: 6, textTransform: "uppercase" as const, letterSpacing: 1, opacity: fade(f, d + 30, 15) }}>Beliebt</div>}

              <div style={{ fontSize: 14, fontFamily: FONT, fontWeight: 700, color: tier.hl ? C.primary : C.muted, marginBottom: 16, textTransform: "uppercase" as const, letterSpacing: 1.5 }}>{tier.name}</div>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 44, fontFamily: FONT, fontWeight: 800, color: tier.hl ? C.primary : C.text, fontVariantNumeric: "tabular-nums" }}>{counterVal}</span>
                <span style={{ fontSize: 16, fontFamily: FONT, fontWeight: 500, color: C.muted, marginLeft: 2 }}>/Mt.</span>
              </div>
              {tier.features.map((feat, fi) => (
                <div key={fi} style={{ opacity: fade(f, d + 35 + fi * 12, 15), fontSize: 13, fontFamily: FONT, fontWeight: 500, color: C.muted, padding: "6px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <span style={{ color: C.green, fontSize: 11 }}>✓</span>{feat}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 36, textAlign: "center", opacity: fade(f, 200, 30) }}>
        <span style={{ fontSize: 20, fontFamily: FONT, fontWeight: 600, color: C.muted }}>🇨🇭 Swiss Made · Alle Preise in CHF</span>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 7 — SWISS TRUST (5s / 300 frames)
// Dramatic reveals per beat
// ══════════════════════════════════════════════════════════

const SceneSwissTrust: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ph = f < 100 ? 0 : f < 200 ? 1 : 2;
  const pf = f < 100 ? f : f < 200 ? f - 100 : f - 200;
  const phOp = (d: number) => Math.min(fade(pf, 0, 20), fadeOut(pf, d - 20, 20));

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg }}>
      {/* Beat 1: Swiss flag — scale from huge */}
      {ph === 0 && (
        <div style={{ textAlign: "center", opacity: phOp(100) }}>
          <div style={{
            fontSize: 140,
            transform: `scale(${interpolate(sp(pf, fps, 0, HEAVY), [0, 1], [3, 1])})`,
            opacity: interpolate(sp(pf, fps, 0, HEAVY), [0, 0.3, 1], [0, 0.5, 1]),
          }}>
            🇨🇭
          </div>
          <div style={{ fontSize: 50, fontFamily: FONT, fontWeight: 800, color: C.text, marginTop: 20, opacity: fade(pf, 25, 20), letterSpacing: "-1px" }}>Swiss Made</div>
          <div style={{ fontSize: 20, fontFamily: FONT, fontWeight: 500, color: C.muted, marginTop: 12, opacity: fade(pf, 40, 20) }}>Gebaut in der Schweiz. Für die Schweiz.</div>
        </div>
      )}

      {/* Beat 2: Words slam in from sides */}
      {ph === 1 && (
        <div style={{ textAlign: "center", opacity: phOp(100) }}>
          {["Lokal.", "Autonom.", "nDSG-konform."].map((w, i) => {
            const d = i * 15;
            const dir = i % 2 === 0 ? -200 : 200;
            const s = sp(pf, fps, d, SNAPPY);
            const x = interpolate(s, [0, 1], [dir, 0]);
            return <div key={i} style={{ fontSize: 52, fontFamily: FONT, fontWeight: 800, color: C.text, opacity: fade(pf, d, 15), transform: `translateX(${x}px)`, letterSpacing: "-1px", marginBottom: 8 }}>{w}</div>;
          })}
          <div style={{ fontSize: 17, fontFamily: MONO, color: C.muted, marginTop: 28, opacity: fade(pf, 55, 20), lineHeight: 1.8 }}>
            Keine Cloud. Keine Drittanbieter.<br />Deine Daten.
          </div>
        </div>
      )}

      {/* Beat 3: Logo with expanding ring */}
      {ph === 2 && (
        <div style={{ textAlign: "center", opacity: phOp(100), position: "relative" }}>
          {/* Expanding ring */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: 40,
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: `2px solid ${C.primary}`,
            transform: `translate(-50%, 0) scale(${interpolate(pf, [0, 60], [1, 4], { extrapolateRight: "clamp" })})`,
            opacity: interpolate(pf, [0, 60], [0.4, 0], { extrapolateRight: "clamp" }),
          }} />

          <div style={{
            width: 80, height: 80, borderRadius: 20, backgroundColor: C.primary,
            display: "flex", justifyContent: "center", alignItems: "center",
            margin: "0 auto 28px",
            transform: `scale(${interpolate(sp(pf, fps, 0, BOUNCY), [0, 1], [0, 1])})`,
            boxShadow: "0 10px 30px rgba(0,0,136,0.20)",
          }}>
            <span style={{ color: "#FFF", fontSize: 36, fontFamily: FONT, fontWeight: 800 }}>K</span>
          </div>
          <div style={{ fontSize: 42, fontFamily: FONT, fontWeight: 800, color: C.text, opacity: fade(pf, 12, 20) }}>100% Open Source</div>
          <div style={{ fontSize: 19, fontFamily: FONT, fontWeight: 500, color: C.muted, marginTop: 12, opacity: fade(pf, 25, 20) }}>Community Driven · Transparent · Frei</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 8 — CTA GRAND FINALE (6s / 360 frames)
// Elements converge, logo impacts, border trace
// ══════════════════════════════════════════════════════════

const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo: bounces in with impact
  const logoSpring = sp(f, fps, 0, { mass: 0.5, stiffness: 150, damping: 10 });
  const logoScale = interpolate(logoSpring, [0, 0.5, 0.8, 1], [0, 1.2, 0.95, 1]);
  const logoOp = interpolate(logoSpring, [0, 0.2, 1], [0, 1, 1]);

  // Domain types out
  const domain = "kaderos.io";
  const domainStart = 50;
  const domainChars = Math.min(Math.floor(Math.max(0, f - domainStart) / 5), domain.length);
  const domainDone = domainChars >= domain.length;

  // CTA
  const ctaOp = fade(f, 100, 25);
  const trace = (f / 90) * 360;

  // Badges
  const badgeOp = fade(f, 130, 25);

  // Quote
  const quoteOp = fade(f, 180, 30);
  const quoteY = interpolate(f, [180, 210], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Loop: fade to white
  const loopOp = fadeOut(f, 310, 40);

  // Ambient glow pulse
  const glowR = 1 + 0.015 * Math.sin(f / 50);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <AbsoluteFill style={{ opacity: loopOp, justifyContent: "center", alignItems: "center" }}>
        {/* Pulsing ambient glow */}
        <div style={{
          position: "absolute",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${C.primary}0C 0%, transparent 70%)`,
          transform: `scale(${glowR})`,
          pointerEvents: "none",
        }} />

        <div style={{ textAlign: "center", position: "relative" }}>
          {/* Logo with bounce impact */}
          <div style={{
            width: 96, height: 96, borderRadius: 24, backgroundColor: C.primary,
            display: "flex", justifyContent: "center", alignItems: "center",
            margin: "0 auto 36px",
            transform: `scale(${logoScale})`,
            opacity: logoOp,
            boxShadow: "0 12px 40px rgba(0,0,136,0.25)",
          }}>
            <span style={{ color: "#FFF", fontSize: 44, fontFamily: FONT, fontWeight: 800 }}>K</span>
          </div>

          {/* Domain — typewriter */}
          <div style={{ fontSize: 58, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-2px", height: 70 }}>
            {domain.slice(0, domainChars)}
            {!domainDone && f > domainStart && (
              <span style={{ display: "inline-block", width: 3, height: 46, backgroundColor: C.primary, marginLeft: 3, verticalAlign: "middle", opacity: f % 30 < 15 ? 1 : 0.2 }} />
            )}
          </div>

          {/* CTA with border trace */}
          <div style={{ marginTop: 28, opacity: ctaOp, display: "inline-block", position: "relative" }}>
            <div style={{ padding: "16px 52px", borderRadius: 16, backgroundColor: `${C.primary}0C`, border: `2px solid ${C.primary}25`, position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", inset: -2, borderRadius: 16,
                background: `conic-gradient(from ${trace}deg, transparent 0%, ${C.primary}80 6%, transparent 12%)`,
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude", WebkitMaskComposite: "xor",
                padding: 2, opacity: 0.6,
              }} />
              <span style={{ fontSize: 26, fontFamily: FONT, fontWeight: 700, color: C.primary, position: "relative", zIndex: 1 }}>Platz sichern</span>
            </div>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", gap: 18, justifyContent: "center", marginTop: 28, opacity: badgeOp, fontSize: 16, fontFamily: FONT, fontWeight: 500, color: C.muted }}>
            <span>🇨🇭 Swiss Made</span><span style={{ color: C.dim }}>·</span><span>Open Source</span><span style={{ color: C.dim }}>·</span><span>Ab CHF 49/Mt.</span>
          </div>

          {/* Closing quote from landing page */}
          <div style={{
            opacity: quoteOp,
            transform: `translateY(${quoteY}px)`,
            maxWidth: 600,
            marginTop: 44,
          }}>
            <div style={{ fontSize: 22, fontFamily: FONT, fontWeight: 700, color: C.text, fontStyle: "italic", lineHeight: 1.5 }}>
              "Die Frage ist nicht ob.
              <br />
              <span style={{ color: C.primary }}>Sondern wann du anfängst."</span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN — 9 Scenes, ~45s @ 60fps
// ══════════════════════════════════════════════════════════

export const HeroVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Sequence from={0} durationInFrames={300}><SceneClaim /></Sequence>
    <Sequence from={280} durationInFrames={300}><SceneTerminal /></Sequence>
    <Sequence from={560} durationInFrames={360}><SceneDashboard /></Sequence>
    <Sequence from={900} durationInFrames={300}><SceneCTODeepDive /></Sequence>
    <Sequence from={1180} durationInFrames={300}><SceneRoles /></Sequence>
    <Sequence from={1460} durationInFrames={300}><ScenePipeline /></Sequence>
    <Sequence from={1740} durationInFrames={300}><ScenePricing /></Sequence>
    <Sequence from={2020} durationInFrames={300}><SceneSwissTrust /></Sequence>
    <Sequence from={2300} durationInFrames={360}><SceneCTA /></Sequence>
  </AbsoluteFill>
);
