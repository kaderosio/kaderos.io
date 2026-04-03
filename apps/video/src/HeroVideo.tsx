import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// ── DESIGN TOKENS ──
const C = {
  primary: "#3739C1",
  primarySoft: "#3739C118",
  primaryMid: "#3739C130",
  purple: "#7C3AED",
  cyan: "#0891B2",
  green: "#059669",
  greenSoft: "#05966918",
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

// Calm, smooth spring — no jitter
const SMOOTH = { mass: 1, stiffness: 60, damping: 26 };
const GENTLE = { mass: 1.2, stiffness: 40, damping: 30 };

// ── HELPERS ──
const sp = (frame: number, fps: number, delay = 0, config = SMOOTH) =>
  spring({ frame: Math.max(0, frame - delay), fps, config });

const fade = (frame: number, start = 0, dur = 25) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, start = 0, dur = 30, dist = 30) =>
  interpolate(frame, [start, start + dur], [dist, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// ── SCENE WRAPPER: handles fade-in/out for clean transitions ──
const SceneWrap: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  fadeInDur?: number;
  fadeOutDur?: number;
}> = ({ children, durationInFrames, fadeInDur = 20, fadeOutDur = 20 }) => {
  const frame = useCurrentFrame();
  const opacity = Math.min(
    fade(frame, 0, fadeInDur),
    interpolate(frame, [durationInFrames - fadeOutDur, durationInFrames], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  return (
    <AbsoluteFill style={{ opacity }}>
      {children}
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 1 — TERMINAL ONBOARD (0–5s / 300 frames)
// ══════════════════════════════════════════════════════════
const SceneTerminal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth slide-up entrance
  const enterProgress = sp(frame, fps, 0, GENTLE);
  const termY = interpolate(enterProgress, [0, 1], [80, 0]);
  const termOpacity = interpolate(enterProgress, [0, 1], [0, 1]);

  // Typing — slower: 4 frames per char
  const command = "npx kaderos onboard";
  const typingStart = 50;
  const charsVisible = Math.min(
    Math.floor(Math.max(0, frame - typingStart) / 4),
    command.length
  );
  const typingDone = charsVisible >= command.length;
  const typingEndFrame = typingStart + command.length * 4;

  // Output lines
  const outputLines = [
    { text: '✓ Kader erkannt: "Agentur Zürich"', color: C.green },
    { text: "✓ 4 Agents bereit (CEO · CTO · CMO · Strategy)", color: C.green },
    { text: "✓ Budget: CHF 62/Monat", color: C.green },
    { text: "✓ nDSG-konform · Lokal · Autonom", color: C.green },
    { text: "🚀 Dein AI-Kader ist einsatzbereit.", color: C.primary, bold: true },
  ] as const;

  const firstLineFrame = typingEndFrame + 20;
  const lineDelay = 18;

  return (
    <SceneWrap durationInFrames={300}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: C.bg,
          padding: 50,
        }}
      >
        <div
          style={{
            width: 920,
            borderRadius: 24,
            overflow: "hidden",
            border: `1px solid ${C.border}`,
            backgroundColor: C.bg,
            boxShadow: "0 20px 60px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
            transform: `translateY(${termY}px)`,
            opacity: termOpacity,
          }}
        >
          {/* Title Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "15px 22px",
              borderBottom: `1px solid ${C.border}`,
              backgroundColor: C.surface,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FEBC2E" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28C840" }} />
            <span style={{ marginLeft: 12, fontSize: 13, color: C.muted, fontFamily: MONO }}>
              kaderos — terminal
            </span>
          </div>

          {/* Body */}
          <div
            style={{
              padding: "30px 32px",
              fontFamily: MONO,
              fontSize: 17,
              lineHeight: 2.4,
              minHeight: 340,
            }}
          >
            {/* Command */}
            <div style={{ color: C.text }}>
              <span style={{ color: C.primary, fontWeight: 600 }}>$ </span>
              {command.slice(0, charsVisible)}
              {!typingDone && (
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: 18,
                    backgroundColor: C.primary,
                    marginLeft: 2,
                    verticalAlign: "middle",
                    opacity: frame % 40 < 20 ? 1 : 0.2,
                  }}
                />
              )}
            </div>

            {/* Output */}
            {typingDone &&
              outputLines.map((line, i) => {
                const lineStart = firstLineFrame + i * lineDelay;
                const opacity = fade(frame, lineStart, 20);
                const y = slideUp(frame, lineStart, 20, 12);
                return (
                  <div
                    key={i}
                    style={{
                      color: line.color,
                      opacity,
                      transform: `translateY(${y}px)`,
                      fontWeight: "bold" in line && line.bold ? 700 : 400,
                    }}
                  >
                    {line.text}
                  </div>
                );
              })}
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 2 — DASHBOARD OVERVIEW (5–11s / 360 frames)
// ══════════════════════════════════════════════════════════
const SceneDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const agents = [
    { name: "Lena", role: "CEO", action: "3 Entscheide heute", color: C.primary, icon: "👤" },
    { name: "Max", role: "CTO", action: "3 PRs shipped", color: C.purple, icon: "⚙️" },
    { name: "Sara", role: "CMO", action: "5 Posts geplant", color: C.cyan, icon: "📣" },
    { name: "Noah", role: "Strategy", action: "Report erstellt", color: C.green, icon: "📊" },
  ];

  // Soft 3D tilt — very subtle
  const tiltProgress = sp(frame, fps, 0, GENTLE);
  const rotateY = interpolate(tiltProgress, [0, 1], [6, 0]);

  return (
    <SceneWrap durationInFrames={360}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: C.bg,
          padding: 50,
        }}
      >
        <div
          style={{
            transform: `perspective(1400px) rotateY(${rotateY}deg)`,
            width: 940,
          }}
        >
          {/* Title */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 14,
              opacity: fade(frame, 0, 30),
              transform: `translateY(${slideUp(frame, 0, 30)}px)`,
            }}
          >
            <div style={{ fontSize: 64, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-2px" }}>
              Dein Kader
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              marginBottom: 50,
              opacity: fade(frame, 15, 25),
              fontSize: 22,
              fontFamily: FONT,
              fontWeight: 500,
              color: C.muted,
            }}
          >
            4 Agents · Active · CHF 62/Mt.
          </div>

          {/* Agent Cards */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
            {agents.map((agent, i) => {
              const delay = 50 + i * 12;
              const s = sp(frame, fps, delay);
              const cardScale = interpolate(s, [0, 1], [0.96, 1]);
              const cardOpacity = fade(frame, delay, 25);
              const cardY = slideUp(frame, delay, 30, 20);

              return (
                <div
                  key={i}
                  style={{
                    width: 440,
                    padding: "28px 24px",
                    borderRadius: 20,
                    border: `1px solid ${C.border}`,
                    backgroundColor: C.surface,
                    opacity: cardOpacity,
                    transform: `scale(${cardScale}) translateY(${cardY}px)`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        backgroundColor: agent.color + "12",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 22,
                      }}
                    >
                      {agent.icon}
                    </div>
                    <div style={{ fontSize: 22, fontFamily: FONT, fontWeight: 700, color: C.text }}>
                      {agent.name}{" "}
                      <span style={{ color: agent.color, fontWeight: 600 }}>· {agent.role}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: C.green }} />
                    <span style={{ fontSize: 15, fontFamily: FONT, color: C.muted, fontWeight: 500 }}>
                      Active
                    </span>
                    <span style={{ fontSize: 15, fontFamily: FONT, color: C.dim, marginLeft: 8 }}>
                      {agent.action}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 3 — CTO DEEP-DIVE (11–17s / 360 frames)
// ══════════════════════════════════════════════════════════
const SceneCTODeepDive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const commits = [
    { msg: "fix: rate limiting for /api/auth", time: "03:12", color: C.cyan },
    { msg: "feat: add input validation layer", time: "03:14", color: C.purple },
    { msg: "test: security audit — all passed", time: "03:15", color: C.green },
    { msg: "chore: create PR #47 → main", time: "03:16", color: C.primary },
  ];

  const steps = [
    { label: "Reading codebase" },
    { label: "Security analysis" },
    { label: "Applying fixes" },
    { label: "Creating PR" },
  ];

  const tools = [
    { name: "filesystem.read", color: C.primary },
    { name: "bash.exec", color: C.purple },
    { name: "github.create_pr", color: C.green },
  ];

  const commitDelay = 35;
  const stepDelay = 50;

  // Gentle zoom
  const zoom = interpolate(sp(frame, fps, 0, GENTLE), [0, 1], [0.97, 1]);

  return (
    <SceneWrap durationInFrames={360}>
      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: C.bg,
          padding: "55px 45px",
          transform: `scale(${zoom})`,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 36,
            opacity: fade(frame, 0, 25),
            transform: `translateY(${slideUp(frame, 0, 25)}px)`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: C.purple + "14",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 26,
            }}
          >
            ⚙️
          </div>
          <div>
            <div style={{ fontSize: 32, fontFamily: FONT, fontWeight: 800, color: C.text }}>
              Max · CTO
            </div>
            <div style={{ fontSize: 16, fontFamily: FONT, color: C.muted }}>
              Arbeitet autonom · 03:14
            </div>
          </div>
        </div>

        {/* Code output */}
        <div
          style={{
            width: 920,
            borderRadius: 18,
            border: `1px solid ${C.border}`,
            backgroundColor: C.surface,
            padding: "24px 28px",
            marginBottom: 24,
            fontFamily: MONO,
            fontSize: 15,
            lineHeight: 2.4,
          }}
        >
          {commits.map((c, i) => {
            const start = 25 + i * commitDelay;
            const opacity = fade(frame, start, 22);
            const y = slideUp(frame, start, 22, 10);
            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  color: C.text,
                }}
              >
                <span style={{ color: C.green }}>✓ </span>
                <span style={{ color: C.dim }}>{c.time}</span>{"  "}
                <span style={{ color: c.color }}>{c.msg}</span>
              </div>
            );
          })}
        </div>

        {/* Progress steps with fill bar */}
        <div
          style={{
            width: 920,
            borderRadius: 18,
            border: `1px solid ${C.border}`,
            backgroundColor: C.surface,
            padding: "24px 28px",
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 12, fontFamily: FONT, fontWeight: 700, color: C.dim, marginBottom: 18, textTransform: "uppercase" as const, letterSpacing: 2 }}>
            Progress
          </div>
          {steps.map((step, i) => {
            const sStart = 40 + i * stepDelay;
            const sFrame = Math.max(0, frame - sStart);
            const isDone = sFrame > stepDelay;
            const isActive = sFrame > 0 && !isDone;
            const opacity = fade(frame, sStart, 20);

            // Smooth fill
            const fillPercent = isDone
              ? 100
              : isActive
              ? interpolate(sFrame, [0, stepDelay], [0, 100], { extrapolateRight: "clamp" })
              : 0;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 14,
                  opacity,
                  fontSize: 18,
                  fontFamily: FONT,
                  fontWeight: isActive ? 600 : 500,
                  color: isDone ? C.green : isActive ? C.primary : C.dim,
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    border: `2px solid ${isDone ? C.green : isActive ? C.primary : C.border}`,
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: `${fillPercent}%`,
                      backgroundColor: isDone ? C.green : C.primary,
                    }}
                  />
                  {isDone && (
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: C.bg,
                        fontSize: 13,
                        fontWeight: 800,
                      }}
                    >
                      ✓
                    </span>
                  )}
                </div>
                {step.label}
              </div>
            );
          })}
        </div>

        {/* Tool pills */}
        <div style={{ display: "flex", gap: 14, width: 920 }}>
          {tools.map((tool, i) => {
            const delay = 200 + i * 18;
            const opacity = fade(frame, delay, 20);
            const y = slideUp(frame, delay, 20, 10);
            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 18px",
                  borderRadius: 12,
                  backgroundColor: tool.color + "0A",
                  border: `1px solid ${tool.color}20`,
                  fontFamily: MONO,
                  fontSize: 14,
                  color: tool.color,
                }}
              >
                <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: C.green }} />
                {tool.name}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 4 — CAPABILITY RING (17–23s / 360 frames)
// ══════════════════════════════════════════════════════════
const SceneCapabilityRing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const roles = [
    { name: "CEO", color: C.primary, icon: "👤" },
    { name: "CTO", color: C.purple, icon: "⚙️" },
    { name: "CMO", color: C.cyan, icon: "📣" },
    { name: "CFO", color: C.green, icon: "📊" },
    { name: "PM", color: "#D97706", icon: "📋" },
    { name: "Creator", color: "#DB2777", icon: "✍️" },
  ];

  const capabilities = [
    "Autonome Agents · 24/7",
    "Lokal · Deine Daten",
    "nDSG-konform · Swiss Made",
    "Ab CHF 49/Mt.",
  ];

  // Slow, smooth carousel
  const rotationSpeed = 0.005;
  const baseAngle = frame * rotationSpeed;
  const radius = 240;

  return (
    <SceneWrap durationInFrames={360}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: C.bg,
          overflow: "hidden",
        }}
      >
        {/* Subtle radial gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 40%, ${C.primary}06 0%, transparent 60%)`,
          }}
        />

        {/* Center logo */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 600,
            transform: "translate(-50%, -50%)",
            width: 72,
            height: 72,
            borderRadius: 18,
            backgroundColor: C.primary,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 8px 30px rgba(55,57,193,0.20)",
            opacity: fade(frame, 0, 30),
            zIndex: 10,
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: 32, fontFamily: FONT, fontWeight: 800 }}>K</span>
        </div>

        {/* Orbiting role cards */}
        {roles.map((role, i) => {
          const angle = baseAngle + (i / roles.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.35;
          const z = Math.sin(angle);
          const scale = interpolate(z, [-1, 1], [0.75, 1.05]);
          const itemOpacity = interpolate(z, [-1, 1], [0.35, 1]);
          const enterOpacity = fade(frame, i * 8, 25);
          const isFront = z > 0.6;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `calc(50% + ${x}px - 42px)`,
                top: `calc(600px + ${y}px - 42px)`,
                width: 84,
                height: 84,
                borderRadius: 20,
                backgroundColor: isFront ? role.color + "10" : C.surface,
                border: `1.5px solid ${isFront ? role.color + "30" : C.border}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                transform: `scale(${scale})`,
                opacity: itemOpacity * enterOpacity,
                zIndex: Math.round(z * 10) + 10,
                boxShadow: isFront ? `0 4px 20px ${role.color}12` : "none",
              }}
            >
              <span style={{ fontSize: 24 }}>{role.icon}</span>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: FONT,
                  fontWeight: 700,
                  color: isFront ? role.color : C.muted,
                }}
              >
                {role.name}
              </span>
            </div>
          );
        })}

        {/* Capabilities list */}
        <div style={{ position: "absolute", top: 920, left: 0, right: 0, padding: "0 80px" }}>
          {capabilities.map((cap, i) => {
            const delay = 80 + i * 18;
            const s = sp(frame, fps, delay, GENTLE);
            const slideX = interpolate(s, [0, 1], [40, 0]);
            const opacity = fade(frame, delay, 25);
            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateX(${slideX}px)`,
                  fontSize: 22,
                  fontFamily: FONT,
                  fontWeight: 600,
                  color: C.text,
                  padding: "13px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ color: C.green, fontSize: 16 }}>✓</span>
                {cap}
              </div>
            );
          })}
        </div>

        {/* Tagline — smooth word-by-word */}
        <div style={{ position: "absolute", bottom: 220, left: 0, right: 0, textAlign: "center" }}>
          {["Dein", "Kader.", "Deine", "Regeln."].map((word, i) => {
            const delay = 200 + i * 12;
            const s = sp(frame, fps, delay, SMOOTH);
            const wordScale = interpolate(s, [0, 1], [0.9, 1]);
            const opacity = fade(frame, delay, 20);
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  fontSize: 44,
                  fontFamily: FONT,
                  fontWeight: 800,
                  color: C.text,
                  opacity,
                  transform: `scale(${wordScale})`,
                  margin: "0 8px",
                  letterSpacing: "-1px",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5 — AUTONOMOUS PIPELINE (23–29s / 360 frames)
// ══════════════════════════════════════════════════════════
const ScenePipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { label: "Brief rein", agent: "Du", color: C.muted, icon: "📝" },
    { label: "Content-Plan", agent: "CMO", color: C.cyan, icon: "📋" },
    { label: "Texte schreiben", agent: "Creator", color: "#DB2777", icon: "✍️" },
    { label: "Landing Page", agent: "CTO", color: C.purple, icon: "🖥️" },
    { label: "ROI tracken", agent: "CFO", color: C.green, icon: "📊" },
  ];

  // Smooth energy ball progress
  const ballProgress = interpolate(frame, [50, 300], [0, steps.length - 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentStep = Math.floor(ballProgress);

  return (
    <SceneWrap durationInFrames={360}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: C.bg,
          overflow: "hidden",
        }}
      >
        {/* Subtle background accent */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 30%, ${C.primary}04 0%, transparent 50%)`,
          }}
        />

        {/* Title */}
        <div
          style={{
            position: "absolute",
            top: 130,
            textAlign: "center",
            width: "100%",
            opacity: fade(frame, 0, 25),
            transform: `translateY(${slideUp(frame, 0, 25)}px)`,
          }}
        >
          <div style={{ fontSize: 44, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-1px" }}>
            So arbeitet dein Kader
          </div>
          <div style={{ fontSize: 18, fontFamily: FONT, color: C.muted, marginTop: 10 }}>
            Agents koordinieren sich autonom
          </div>
        </div>

        {/* Pipeline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, marginTop: 50 }}>
          {steps.map((step, i) => {
            const delay = 30 + i * 28;
            const opacity = fade(frame, delay, 25);
            const y = slideUp(frame, delay, 25, 15);
            const isReached = ballProgress >= i;
            const isPassed = ballProgress >= i + 0.9;
            const isActive = currentStep === i;

            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    opacity,
                    transform: `translateY(${y}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    padding: "22px 32px",
                    width: 600,
                    borderRadius: 18,
                    backgroundColor: isActive ? step.color + "08" : C.surface,
                    border: `1.5px solid ${isActive ? step.color + "25" : C.borderLight}`,
                    position: "relative",
                    boxShadow: isActive ? `0 4px 20px ${step.color}08` : "none",
                  }}
                >
                  {/* Subtle active indicator */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "20%",
                        bottom: "20%",
                        width: 3,
                        borderRadius: 2,
                        backgroundColor: step.color,
                      }}
                    />
                  )}

                  <span style={{ fontSize: 26, zIndex: 1 }}>
                    {isPassed ? "✅" : step.icon}
                  </span>
                  <div style={{ zIndex: 1 }}>
                    <div
                      style={{
                        fontSize: 20,
                        fontFamily: FONT,
                        fontWeight: isActive ? 700 : 500,
                        color: isPassed ? C.green : isActive ? step.color : C.text,
                      }}
                    >
                      {step.label}
                    </div>
                    <div style={{ fontSize: 14, fontFamily: FONT, color: C.muted }}>{step.agent}</div>
                  </div>
                </div>

                {/* Connector */}
                {i < steps.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      height: 20,
                      backgroundColor: isPassed ? step.color + "40" : C.border,
                      opacity: fade(frame, delay + 14, 15),
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Done label */}
        {ballProgress >= steps.length - 1 && (
          <div
            style={{
              marginTop: 30,
              opacity: fade(frame, 300, 25),
              fontSize: 22,
              fontFamily: FONT,
              fontWeight: 700,
              color: C.green,
            }}
          >
            ✅ Pipeline complete
          </div>
        )}
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 6 — PRICING SPLIT (29–35s / 360 frames)
// ══════════════════════════════════════════════════════════
const ScenePricing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rows = [
    { label: "Verfügbar", human: "8h/Tag", kader: "24/7" },
    { label: "Setup", human: "3 Monate", kader: "30 Sekunden" },
    { label: "Ferien", human: "5 Wochen", kader: "0" },
  ];

  // Smooth shimmer on kader price
  const shimmerPos = interpolate(frame, [80, 280], [-100, 300], { extrapolateRight: "clamp" });

  // Highlight
  const highlightDelay = 220;
  const highlightOpacity = fade(frame, highlightDelay, 30);
  const highlightScale = interpolate(sp(frame, fps, highlightDelay, GENTLE), [0, 1], [0.9, 1]);

  return (
    <SceneWrap durationInFrames={360}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: C.bg,
          overflow: "hidden",
        }}
      >
        {/* Title */}
        <div
          style={{
            position: "absolute",
            top: 150,
            textAlign: "center",
            width: "100%",
            opacity: fade(frame, 0, 25),
            transform: `translateY(${slideUp(frame, 0, 25)}px)`,
          }}
        >
          <div style={{ fontSize: 48, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-1.5px" }}>
            Mensch vs. Kader
          </div>
        </div>

        {/* Split cards */}
        <div style={{ display: "flex", width: 900, gap: 20, marginTop: 30 }}>
          {/* Human */}
          <div
            style={{
              flex: 1,
              padding: "36px 28px",
              borderRadius: 24,
              backgroundColor: C.surface,
              border: `1px solid ${C.border}`,
              opacity: fade(frame, 20, 30),
              transform: `translateY(${slideUp(frame, 20, 30)}px)`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 13, fontFamily: FONT, fontWeight: 700, color: C.dim, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 24 }}>
              Mensch
            </div>
            <div
              style={{
                fontSize: 48,
                fontFamily: FONT,
                fontWeight: 800,
                color: C.dim,
                marginBottom: 28,
                opacity: fade(frame, 40, 25),
              }}
            >
              CHF 15'000
            </div>
            {rows.map((row, i) => (
              <div
                key={i}
                style={{
                  opacity: fade(frame, 60 + i * 20, 20),
                  padding: "14px 0",
                  borderTop: i > 0 ? `1px solid ${C.borderLight}` : "none",
                }}
              >
                <div style={{ fontSize: 13, fontFamily: FONT, color: C.dim, marginBottom: 4 }}>{row.label}</div>
                <div style={{ fontSize: 22, fontFamily: FONT, fontWeight: 600, color: C.dim }}>{row.human}</div>
              </div>
            ))}
          </div>

          {/* KaderOS */}
          <div
            style={{
              flex: 1,
              padding: "36px 28px",
              borderRadius: 24,
              backgroundColor: C.primarySoft,
              border: `1px solid ${C.primaryMid}`,
              opacity: fade(frame, 30, 30),
              transform: `translateY(${slideUp(frame, 30, 30)}px)`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 13, fontFamily: FONT, fontWeight: 700, color: C.primary, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 24 }}>
              KaderOS
            </div>
            <div
              style={{
                fontSize: 56,
                fontFamily: FONT,
                fontWeight: 800,
                marginBottom: 28,
                opacity: fade(frame, 50, 25),
              }}
            >
              <span
                style={{
                  background: `linear-gradient(135deg, ${C.primary} 0%, ${C.purple} 50%, ${C.cyan} 100%)`,
                  backgroundSize: "200% auto",
                  backgroundPosition: `${shimmerPos}% center`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                CHF 62
              </span>
            </div>
            {rows.map((row, i) => (
              <div
                key={i}
                style={{
                  opacity: fade(frame, 70 + i * 20, 20),
                  padding: "14px 0",
                  borderTop: i > 0 ? `1px solid ${C.primaryMid}` : "none",
                }}
              >
                <div style={{ fontSize: 13, fontFamily: FONT, color: C.muted, marginBottom: 4 }}>{row.label}</div>
                <div style={{ fontSize: 22, fontFamily: FONT, fontWeight: 700, color: C.text }}>{row.kader}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight */}
        <div
          style={{
            marginTop: 44,
            textAlign: "center",
            opacity: highlightOpacity,
            transform: `scale(${highlightScale})`,
          }}
        >
          <span
            style={{
              fontSize: 46,
              fontFamily: FONT,
              fontWeight: 800,
              background: `linear-gradient(135deg, ${C.primary} 0%, ${C.purple} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            241× günstiger
          </span>
        </div>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 7 — SWISS TRUST (35–41s / 360 frames)
// ══════════════════════════════════════════════════════════
const SceneSwissTrust: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Three phases: Swiss (0-120), Compliance (120-240), Open Source (240-360)
  const phase = frame < 120 ? 0 : frame < 240 ? 1 : 2;
  const pf = frame < 120 ? frame : frame < 240 ? frame - 120 : frame - 240;

  // Cross-fade between phases
  const phaseOpacity = (phaseFrame: number, dur: number) =>
    Math.min(fade(phaseFrame, 0, 25), interpolate(phaseFrame, [dur - 25, dur], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }));

  return (
    <SceneWrap durationInFrames={360} fadeOutDur={25}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.bg }}>

        {/* Phase 0: Swiss Made */}
        {phase === 0 && (
          <div style={{ textAlign: "center", opacity: phaseOpacity(pf, 120) }}>
            <div
              style={{
                fontSize: 120,
                transform: `scale(${interpolate(sp(pf, fps, 0, GENTLE), [0, 1], [0.7, 1])})`,
              }}
            >
              🇨🇭
            </div>
            <div
              style={{
                fontSize: 48,
                fontFamily: FONT,
                fontWeight: 800,
                color: C.text,
                marginTop: 28,
                opacity: fade(pf, 20, 25),
                letterSpacing: "-1px",
              }}
            >
              Swiss Made
            </div>
            <div
              style={{
                fontSize: 22,
                fontFamily: FONT,
                fontWeight: 500,
                color: C.muted,
                marginTop: 14,
                opacity: fade(pf, 35, 25),
              }}
            >
              Gebaut in der Schweiz. Für die Schweiz.
            </div>
          </div>
        )}

        {/* Phase 1: Compliance */}
        {phase === 1 && (
          <div style={{ textAlign: "center", padding: 60, opacity: phaseOpacity(pf, 120) }}>
            {["Lokal.", "Autonom.", "nDSG-konform."].map((word, i) => {
              const delay = i * 18;
              const s = sp(pf, fps, delay, SMOOTH);
              const wordScale = interpolate(s, [0, 1], [0.92, 1]);
              const opacity = fade(pf, delay, 22);
              return (
                <div
                  key={i}
                  style={{
                    fontSize: 56,
                    fontFamily: FONT,
                    fontWeight: 800,
                    color: C.text,
                    opacity,
                    transform: `scale(${wordScale})`,
                    letterSpacing: "-1px",
                    marginBottom: 14,
                  }}
                >
                  {word}
                </div>
              );
            })}
            <div
              style={{
                fontSize: 18,
                fontFamily: MONO,
                color: C.muted,
                marginTop: 30,
                opacity: fade(pf, 60, 25),
                lineHeight: 1.8,
              }}
            >
              Keine Cloud. Keine Drittanbieter.
              <br />
              Deine Daten.
            </div>
          </div>
        )}

        {/* Phase 2: Open Source */}
        {phase === 2 && (
          <div style={{ textAlign: "center", opacity: phaseOpacity(pf, 120) }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                backgroundColor: C.primary,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 30px",
                transform: `scale(${interpolate(sp(pf, fps, 0, SMOOTH), [0, 1], [0.7, 1])})`,
                boxShadow: "0 10px 30px rgba(55,57,193,0.20)",
              }}
            >
              <span style={{ color: "#FFFFFF", fontSize: 36, fontFamily: FONT, fontWeight: 800 }}>K</span>
            </div>
            <div
              style={{
                fontSize: 44,
                fontFamily: FONT,
                fontWeight: 800,
                color: C.text,
                opacity: fade(pf, 12, 25),
              }}
            >
              100% Open Source
            </div>
            <div
              style={{
                fontSize: 20,
                fontFamily: FONT,
                fontWeight: 500,
                color: C.muted,
                marginTop: 14,
                opacity: fade(pf, 25, 25),
              }}
            >
              Community Driven · Transparent · Frei
            </div>
          </div>
        )}
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 8 — CTA / FINALE (41–48s / 420 frames)
// ══════════════════════════════════════════════════════════
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = sp(frame, fps, 0, GENTLE);
  const logoScale = interpolate(logoSpring, [0, 1], [0.7, 1]);
  const domainOpacity = fade(frame, 40, 30);
  const ctaOpacity = fade(frame, 70, 30);
  const badgeOpacity = fade(frame, 100, 30);

  // Gentle border trace on CTA
  const traceAngle = (frame / 120) * 360;

  // Calm cursor blink
  const cursorVisible = frame > 40 && frame % 50 < 25;

  return (
    <SceneWrap durationInFrames={420} fadeInDur={25} fadeOutDur={0}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: C.bg,
        }}
      >
        {/* Subtle gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 45%, ${C.primary}05 0%, transparent 50%)`,
          }}
        />

        <div style={{ textAlign: "center" }}>
          {/* Logo */}
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              backgroundColor: C.primary,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 40px",
              transform: `scale(${logoScale})`,
              boxShadow: "0 12px 40px rgba(55,57,193,0.22)",
            }}
          >
            <span style={{ color: "#FFFFFF", fontSize: 44, fontFamily: FONT, fontWeight: 800 }}>K</span>
          </div>

          {/* Domain */}
          <div
            style={{
              fontSize: 60,
              fontFamily: FONT,
              fontWeight: 800,
              color: C.text,
              opacity: domainOpacity,
              letterSpacing: "-2px",
            }}
          >
            kaderos.io
            {cursorVisible && (
              <span
                style={{
                  display: "inline-block",
                  width: 3,
                  height: 48,
                  backgroundColor: C.primary,
                  marginLeft: 4,
                  verticalAlign: "middle",
                  opacity: 0.6,
                }}
              />
            )}
          </div>

          {/* CTA with border trace */}
          <div
            style={{
              marginTop: 30,
              opacity: ctaOpacity,
              display: "inline-block",
              position: "relative",
            }}
          >
            <div
              style={{
                padding: "18px 56px",
                borderRadius: 16,
                backgroundColor: C.primarySoft,
                border: `2px solid ${C.primaryMid}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Border trace — subtle */}
              <div
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: 16,
                  background: `conic-gradient(from ${traceAngle}deg, transparent 0%, ${C.primary}60 8%, transparent 16%)`,
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: 2,
                  opacity: 0.5,
                }}
              />
              <span style={{ fontSize: 28, fontFamily: FONT, fontWeight: 700, color: C.primary, position: "relative", zIndex: 1 }}>
                Platz sichern
              </span>
            </div>
          </div>

          {/* Badges */}
          <div
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              marginTop: 36,
              opacity: badgeOpacity,
              fontSize: 17,
              fontFamily: FONT,
              fontWeight: 500,
              color: C.muted,
            }}
          >
            <span>🇨🇭 Swiss Made</span>
            <span style={{ color: C.dim }}>·</span>
            <span>Open Source</span>
            <span style={{ color: C.dim }}>·</span>
            <span>Ab CHF 49/Mt.</span>
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN COMPOSITION — 48s @ 60fps = 2880 frames
// Scenes overlap by 20 frames for smooth crossfade
// ══════════════════════════════════════════════════════════
export const HeroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Scene 1: Terminal (0–5s) */}
      <Sequence from={0} durationInFrames={300}>
        <SceneTerminal />
      </Sequence>

      {/* Scene 2: Dashboard (4.7–10.7s) — overlap 20 frames */}
      <Sequence from={280} durationInFrames={360}>
        <SceneDashboard />
      </Sequence>

      {/* Scene 3: CTO Deep-Dive (10.3–16.3s) */}
      <Sequence from={620} durationInFrames={360}>
        <SceneCTODeepDive />
      </Sequence>

      {/* Scene 4: Capability Ring (16–22s) */}
      <Sequence from={960} durationInFrames={360}>
        <SceneCapabilityRing />
      </Sequence>

      {/* Scene 5: Pipeline (21.7–27.7s) */}
      <Sequence from={1300} durationInFrames={360}>
        <ScenePipeline />
      </Sequence>

      {/* Scene 6: Pricing (27.3–33.3s) */}
      <Sequence from={1640} durationInFrames={360}>
        <ScenePricing />
      </Sequence>

      {/* Scene 7: Swiss Trust (33–39s) */}
      <Sequence from={1980} durationInFrames={360}>
        <SceneSwissTrust />
      </Sequence>

      {/* Scene 8: CTA (38.7–45.7s) */}
      <Sequence from={2320} durationInFrames={420}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
