import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// ── COLORS ──
const C = {
  primary: "#3739C1",
  purple: "#7C3AED",
  cyan: "#0891B2",
  green: "#059669",
  red: "#DC2626",
  text: "#1D1D1F",
  gray: "#86868B",
  dim: "#A1A1AA",
  light: "#F5F5F7",
  surface: "#FAFAFA",
  border: "#E5E5EA",
  white: "#FFFFFF",
};

const FONT = "Outfit, -apple-system, sans-serif";
const MONO = "JetBrains Mono, SF Mono, Menlo, monospace";

// ── HELPERS ──
const fadeIn = (frame: number, start = 0, dur = 15) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, start = 0, dur = 15, dist = 20) =>
  interpolate(frame, [start, start + dur], [dist, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// ── SCENE 1: TERMINAL ONBOARD (120 frames / 4s) ──
const SceneTerminal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const command = "npx kaderos onboard";
  const charsVisible = Math.min(Math.floor(frame / 2), command.length);
  const typingDone = charsVisible >= command.length;
  const typingEndFrame = command.length * 2;

  const outputLines = [
    { text: '✓ Kader erkannt: "Agentur Zürich"', color: C.green },
    { text: "✓ 4 Agents bereit (CEO · CTO · CMO · Strategy)", color: C.green },
    { text: "✓ Budget: CHF 62/Monat", color: C.green },
    { text: "✓ nDSG-konform · Lokal · Autonom", color: C.green },
    { text: "🚀 Dein AI-Kader ist einsatzbereit.", color: C.text, bold: true },
  ] as const;

  const lineDelay = 12;
  const firstLineFrame = typingEndFrame + 10;

  // Terminal slide-in
  const enterSpring = spring({ frame, fps, config: { damping: 100, mass: 0.8 } });
  const terminalY = interpolate(enterSpring, [0, 1], [400, 0]);
  const terminalRotateX = interpolate(enterSpring, [0, 1], [20, 0]);
  const terminalScale = interpolate(enterSpring, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: C.white,
        padding: 40,
      }}
    >
      <div
        style={{
          width: 940,
          borderRadius: 20,
          overflow: "hidden",
          border: `1px solid ${C.border}`,
          boxShadow: "0 25px 60px rgba(0,0,0,0.10)",
          transform: `translateY(${terminalY}px) perspective(800px) rotateX(${terminalRotateX}deg) scale(${terminalScale})`,
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 20px",
            borderBottom: `1px solid ${C.border}`,
            backgroundColor: C.light,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FEBC2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28C840" }} />
          <span style={{ marginLeft: 10, fontSize: 13, color: C.gray, fontFamily: MONO }}>
            kaderos — terminal
          </span>
        </div>

        {/* Terminal Body */}
        <div
          style={{
            padding: "28px 30px",
            fontFamily: MONO,
            fontSize: 17,
            lineHeight: 2.4,
            backgroundColor: C.white,
            minHeight: 320,
          }}
        >
          {/* Command line */}
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
                  opacity: frame % 20 < 10 ? 1 : 0,
                }}
              />
            )}
          </div>

          {/* Output lines */}
          {typingDone &&
            outputLines.map((line, i) => {
              const lineFrame = frame - (firstLineFrame + i * lineDelay);
              if (lineFrame < 0) return null;

              const opacity = interpolate(lineFrame, [0, 8], [0, 1], {
                extrapolateRight: "clamp",
              });
              const translateY = interpolate(lineFrame, [0, 8], [8, 0], {
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={i}
                  style={{
                    color: line.color,
                    opacity,
                    transform: `translateY(${translateY}px)`,
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
  );
};

// ── SCENE 2: DASHBOARD OVERVIEW (150 frames / 5s) ──
const SceneDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const agents = [
    { name: "Lena", role: "CEO", action: "3 Entscheide heute", color: C.primary, icon: "👤" },
    { name: "Max", role: "CTO", action: "3 PRs shipped heute", color: C.purple, icon: "⚙️" },
    { name: "Sara", role: "CMO", action: "5 Posts geplant", color: C.cyan, icon: "📣" },
    { name: "Noah", role: "Strategy", action: "Report erstellt", color: C.green, icon: "📊" },
  ];

  // Title animation
  const titleOpacity = fadeIn(frame, 0, 20);
  const titleY = slideUp(frame, 0, 20);

  // Subtitle
  const subOpacity = fadeIn(frame, 15, 15);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: C.white,
        padding: 50,
      }}
    >
      <div style={{ width: "100%", maxWidth: 940 }}>
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 12,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontFamily: FONT,
              fontWeight: 800,
              color: C.text,
              letterSpacing: "-2px",
            }}
          >
            Dein Kader
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            opacity: subOpacity,
            fontSize: 22,
            fontFamily: FONT,
            fontWeight: 500,
            color: C.gray,
          }}
        >
          4 Agents · Active · CHF 62/Mt.
        </div>

        {/* Agent Cards — 2x2 Grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center",
          }}
        >
          {agents.map((agent, i) => {
            const delay = 30 + i * 8;
            const s = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 200 },
            });
            const cardOpacity = fadeIn(frame, delay, 12);
            const cardScale = interpolate(s, [0, 1], [0.95, 1]);

            return (
              <div
                key={i}
                style={{
                  width: 430,
                  padding: "32px 28px",
                  borderRadius: 20,
                  border: `1px solid ${C.border}`,
                  backgroundColor: C.surface,
                  opacity: cardOpacity,
                  transform: `scale(${cardScale})`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      backgroundColor: agent.color + "14",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 22,
                    }}
                  >
                    {agent.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 22,
                        fontFamily: FONT,
                        fontWeight: 700,
                        color: C.text,
                      }}
                    >
                      {agent.name}{" "}
                      <span style={{ color: agent.color, fontWeight: 600 }}>· {agent.role}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: C.green,
                    }}
                  />
                  <span style={{ fontSize: 15, fontFamily: FONT, color: C.gray, fontWeight: 500 }}>
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
  );
};

// ── SCENE 3: AGENT BEI DER ARBEIT (160 frames / 5.3s) ──
const SceneAgentWork: React.FC = () => {
  const frame = useCurrentFrame();

  const commits = [
    { msg: "fix: rate limiting for /api/auth", time: "03:12" },
    { msg: "feat: add input validation", time: "03:14" },
    { msg: "test: security audit passed", time: "03:15" },
    { msg: "chore: create PR #47", time: "03:16" },
  ];

  const steps = [
    { label: "Reading codebase", icon: "📖" },
    { label: "Security audit", icon: "🔒" },
    { label: "Applying fixes", icon: "🔧" },
    { label: "Creating PR", icon: "🚀" },
  ];

  const tools = [
    { name: "filesystem.read", color: C.primary },
    { name: "bash.exec", color: C.purple },
    { name: "github.create_pr", color: C.green },
  ];

  const stepDelay = 25;
  const commitDelay = 20;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: C.white,
        padding: "60px 40px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 40,
          opacity: fadeIn(frame, 0, 15),
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            backgroundColor: C.purple + "18",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 22,
          }}
        >
          ⚙️
        </div>
        <div>
          <div style={{ fontSize: 28, fontFamily: FONT, fontWeight: 700, color: C.text }}>
            Max · CTO
          </div>
          <div style={{ fontSize: 16, fontFamily: FONT, color: C.gray }}>
            Arbeitet autonom · 03:14
          </div>
        </div>
      </div>

      {/* Commits */}
      <div
        style={{
          width: 940,
          borderRadius: 16,
          border: `1px solid ${C.border}`,
          backgroundColor: C.surface,
          padding: "24px 28px",
          marginBottom: 28,
          fontFamily: MONO,
          fontSize: 15,
          lineHeight: 2.2,
        }}
      >
        {commits.map((c, i) => {
          const lineFrame = frame - (15 + i * commitDelay);
          if (lineFrame < 0) return null;
          const opacity = interpolate(lineFrame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
          const ty = interpolate(lineFrame, [0, 10], [6, 0], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{ opacity, transform: `translateY(${ty}px)`, color: C.text }}
            >
              <span style={{ color: C.green }}>✓ </span>
              <span style={{ color: C.dim }}>{c.time}</span>{"  "}
              {c.msg}
            </div>
          );
        })}
      </div>

      {/* Progress Steps */}
      <div
        style={{
          width: 940,
          borderRadius: 16,
          border: `1px solid ${C.border}`,
          backgroundColor: C.surface,
          padding: "24px 28px",
          marginBottom: 28,
        }}
      >
        <div style={{ fontSize: 14, fontFamily: FONT, fontWeight: 600, color: C.gray, marginBottom: 16, textTransform: "uppercase" as const, letterSpacing: 1 }}>
          Progress
        </div>
        {steps.map((step, i) => {
          const stepFrame = frame - (20 + i * stepDelay);
          const isDone = stepFrame > stepDelay;
          const isActive = stepFrame > 0 && !isDone;
          const opacity = fadeIn(frame, 20 + i * stepDelay, 10);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
                opacity,
                fontSize: 17,
                fontFamily: FONT,
                fontWeight: isActive ? 600 : 400,
                color: isDone ? C.green : isActive ? C.primary : C.dim,
              }}
            >
              <span style={{ fontSize: 14 }}>
                {isDone ? "✅" : isActive ? "⏳" : "○"}
              </span>
              {step.label}
            </div>
          );
        })}
      </div>

      {/* Tool Calls */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", width: 940 }}>
        {tools.map((tool, i) => {
          const opacity = fadeIn(frame, 80 + i * 12, 10);
          return (
            <div
              key={i}
              style={{
                opacity,
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 10,
                backgroundColor: tool.color + "10",
                border: `1px solid ${tool.color}30`,
                fontFamily: MONO,
                fontSize: 14,
                color: tool.color,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.green }} />
              {tool.name}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 4: KADER-ROLLEN (130 frames / 4.3s) ──
const SceneRoles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const roles = [
    { name: "CEO", desc: "Strategie & Entscheide", color: C.primary },
    { name: "CTO", desc: "Code & Architektur", color: C.purple },
    { name: "CMO", desc: "Marketing & Content", color: C.cyan },
    { name: "CFO", desc: "Zahlen & Reports", color: C.green },
    { name: "PM", desc: "Projekte & Deadlines", color: "#E67E22" },
    { name: "Creator", desc: "Blog & Social", color: "#EC4899" },
  ];

  const features = [
    "Autonome Agents · 24/7",
    "Lokal · Deine Daten bleiben bei dir",
    "nDSG-konform · Swiss Made",
    "CHF 49–149/Mt. · Keine versteckten Kosten",
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: C.white,
        padding: 50,
      }}
    >
      <div style={{ width: 940 }}>
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 50,
            opacity: fadeIn(frame, 0, 15),
            transform: `translateY(${slideUp(frame, 0, 15)}px)`,
          }}
        >
          <div style={{ fontSize: 52, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-1.5px" }}>
            Wähle dein Kader
          </div>
        </div>

        {/* Roles Grid — 2x3 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 40, justifyContent: "center" }}>
          {roles.map((role, i) => {
            const delay = 12 + i * 6;
            const s = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 200 } });
            const opacity = fadeIn(frame, delay, 10);
            const scale = interpolate(s, [0, 1], [0.95, 1]);

            return (
              <div
                key={i}
                style={{
                  width: 290,
                  padding: "22px 20px",
                  borderRadius: 16,
                  border: `1px solid ${C.border}`,
                  backgroundColor: C.surface,
                  opacity,
                  transform: `scale(${scale})`,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: role.color,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: 20, fontFamily: FONT, fontWeight: 700, color: C.text }}>
                    {role.name}
                  </div>
                  <div style={{ fontSize: 14, fontFamily: FONT, color: C.gray, fontWeight: 400 }}>
                    {role.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Capabilities */}
        <div
          style={{
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            backgroundColor: C.surface,
            padding: "24px 28px",
          }}
        >
          {features.map((f, i) => {
            const opacity = fadeIn(frame, 60 + i * 8, 10);
            return (
              <div
                key={i}
                style={{
                  opacity,
                  fontSize: 17,
                  fontFamily: FONT,
                  fontWeight: 500,
                  color: C.text,
                  padding: "8px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ color: C.green }}>✓</span>
                {f}
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        <div
          style={{
            textAlign: "center",
            marginTop: 30,
            opacity: fadeIn(frame, 100, 15),
            fontSize: 20,
            fontFamily: FONT,
            fontWeight: 600,
            color: C.gray,
          }}
        >
          Dein Kader. Deine Regeln. 🇨🇭
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 5: WORKFLOW-VISUALISIERUNG (140 frames / 4.7s) ──
const SceneWorkflow: React.FC = () => {
  const frame = useCurrentFrame();

  const steps = [
    { label: "Brief rein (du)", color: C.gray, icon: "📝" },
    { label: "CMO erstellt Content-Plan", color: C.cyan, icon: "📋" },
    { label: "Content Creator schreibt", color: "#EC4899", icon: "✍️" },
    { label: "CTO baut Landing Page", color: C.purple, icon: "🖥️" },
    { label: "CFO trackt ROI", color: C.green, icon: "📊" },
  ];

  const stepDelay = 20;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: C.white,
        padding: 50,
      }}
    >
      <div style={{ width: 940 }}>
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 16,
            opacity: fadeIn(frame, 0, 15),
          }}
        >
          <div style={{ fontSize: 44, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-1px" }}>
            So arbeitet dein Kader
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            marginBottom: 50,
            opacity: fadeIn(frame, 8, 12),
            fontSize: 18,
            fontFamily: FONT,
            color: C.gray,
          }}
        >
          Agents koordinieren sich autonom
        </div>

        {/* Workflow Pipeline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          {steps.map((step, i) => {
            const delay = 15 + i * stepDelay;
            const opacity = fadeIn(frame, delay, 12);
            const ty = slideUp(frame, delay, 12, 15);
            const isDone = frame > delay + stepDelay + 10;
            const isActive = frame > delay && !isDone;

            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    opacity,
                    transform: `translateY(${ty}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "20px 32px",
                    width: 600,
                    borderRadius: 16,
                    backgroundColor: isActive ? step.color + "08" : C.surface,
                    border: `1.5px solid ${isActive ? step.color + "40" : C.border}`,
                  }}
                >
                  <span style={{ fontSize: 24 }}>
                    {isDone ? "✅" : step.icon}
                  </span>
                  <div
                    style={{
                      fontSize: 20,
                      fontFamily: FONT,
                      fontWeight: isActive ? 700 : 500,
                      color: isDone ? C.green : isActive ? step.color : C.text,
                    }}
                  >
                    {step.label}
                  </div>
                </div>
                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div
                    style={{
                      opacity: fadeIn(frame, delay + 10, 8),
                      fontSize: 20,
                      color: C.dim,
                      padding: "4px 0",
                    }}
                  >
                    ↓
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 6: PRICING VERGLEICH (120 frames / 4s) ──
const ScenePricing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rows = [
    { label: "Kosten", human: "CHF 15'000/Mt.", kader: "CHF 62/Mt." },
    { label: "Verfügbar", human: "8h/Tag", kader: "24/7" },
    { label: "Setup", human: "3 Monate", kader: "30 Sekunden" },
    { label: "Ferien", human: "5 Wochen", kader: "0" },
  ];

  // Title
  const titleOpacity = fadeIn(frame, 0, 15);

  // Highlight "241x günstiger"
  const highlightDelay = 70;
  const highlightSpring = spring({
    frame: Math.max(0, frame - highlightDelay),
    fps,
    config: { damping: 100, mass: 0.6 },
  });
  const highlightScale = interpolate(highlightSpring, [0, 1], [0.8, 1]);
  const highlightOpacity = fadeIn(frame, highlightDelay, 15);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: C.white,
        padding: 50,
      }}
    >
      <div style={{ width: 940 }}>
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 50,
            opacity: titleOpacity,
          }}
        >
          <div style={{ fontSize: 48, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-1.5px" }}>
            Mensch vs. Kader
          </div>
        </div>

        {/* Table Header */}
        <div
          style={{
            display: "flex",
            padding: "16px 28px",
            marginBottom: 8,
            opacity: fadeIn(frame, 8, 10),
          }}
        >
          <div style={{ flex: 1, fontSize: 14, fontFamily: FONT, fontWeight: 600, color: C.dim, textTransform: "uppercase" as const, letterSpacing: 1 }} />
          <div style={{ width: 260, fontSize: 14, fontFamily: FONT, fontWeight: 600, color: C.gray, textTransform: "uppercase" as const, letterSpacing: 1, textAlign: "center" }}>
            Mensch
          </div>
          <div style={{ width: 260, fontSize: 14, fontFamily: FONT, fontWeight: 700, color: C.primary, textTransform: "uppercase" as const, letterSpacing: 1, textAlign: "center" }}>
            KaderOS
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => {
          const delay = 15 + i * 12;
          const opacity = fadeIn(frame, delay, 10);
          const ty = slideUp(frame, delay, 10, 10);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "18px 28px",
                borderRadius: 14,
                backgroundColor: i % 2 === 0 ? C.surface : C.white,
                opacity,
                transform: `translateY(${ty}px)`,
                marginBottom: 4,
              }}
            >
              <div style={{ flex: 1, fontSize: 18, fontFamily: FONT, fontWeight: 600, color: C.text }}>
                {row.label}
              </div>
              <div style={{ width: 260, fontSize: 18, fontFamily: FONT, fontWeight: 500, color: C.gray, textAlign: "center" }}>
                {row.human}
              </div>
              <div style={{ width: 260, fontSize: 18, fontFamily: FONT, fontWeight: 700, color: C.primary, textAlign: "center" }}>
                {row.kader}
              </div>
            </div>
          );
        })}

        {/* Highlight */}
        <div
          style={{
            textAlign: "center",
            marginTop: 40,
            opacity: highlightOpacity,
            transform: `scale(${highlightScale})`,
          }}
        >
          <span
            style={{
              fontSize: 42,
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
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 7: TRUST SIGNALS (150 frames / 5s) ──
const SceneTrust: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sub-scene timing: 0-50 Swiss, 50-100 Compliance, 100-150 Open Source
  const subScene = frame < 50 ? 0 : frame < 100 ? 1 : 2;
  const subFrame = frame < 50 ? frame : frame < 100 ? frame - 50 : frame - 100;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: C.white }}>
      {/* Sub-scene A: Swiss Made */}
      {subScene === 0 && (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 120,
              opacity: fadeIn(subFrame, 0, 15),
              transform: `scale(${interpolate(
                spring({ frame: subFrame, fps, config: { damping: 100 } }),
                [0, 1],
                [0.5, 1]
              )})`,
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
              marginTop: 24,
              opacity: fadeIn(subFrame, 12, 15),
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
              color: C.gray,
              marginTop: 12,
              opacity: fadeIn(subFrame, 20, 15),
            }}
          >
            Gebaut in der Schweiz. Für die Schweiz.
          </div>
        </div>
      )}

      {/* Sub-scene B: Compliance */}
      {subScene === 1 && (
        <div style={{ textAlign: "center", padding: 60 }}>
          {["Lokal", "Autonom", "nDSG-konform"].map((word, i) => (
            <span
              key={i}
              style={{
                fontSize: 56,
                fontFamily: FONT,
                fontWeight: 800,
                color: C.text,
                opacity: fadeIn(subFrame, i * 8, 10),
                letterSpacing: "-1px",
              }}
            >
              {word}
              {i < 2 && (
                <span style={{ color: C.dim, margin: "0 16px", fontWeight: 300 }}>·</span>
              )}
            </span>
          ))}
          <div
            style={{
              fontSize: 18,
              fontFamily: MONO,
              color: C.gray,
              marginTop: 30,
              opacity: fadeIn(subFrame, 30, 12),
              lineHeight: 1.8,
            }}
          >
            Keine Cloud. Keine Drittanbieter.
            <br />
            Deine Daten.
          </div>
        </div>
      )}

      {/* Sub-scene C: Open Source */}
      {subScene === 2 && (
        <div style={{ textAlign: "center" }}>
          {/* KaderOS Logo */}
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
              transform: `scale(${interpolate(
                spring({ frame: subFrame, fps, config: { damping: 200 } }),
                [0, 1],
                [0.5, 1]
              )})`,
              boxShadow: "0 10px 30px rgba(55,57,193,0.3)",
            }}
          >
            <span style={{ color: C.white, fontSize: 36, fontFamily: FONT, fontWeight: 800 }}>K</span>
          </div>
          <div
            style={{
              fontSize: 40,
              fontFamily: FONT,
              fontWeight: 800,
              color: C.text,
              opacity: fadeIn(subFrame, 10, 12),
            }}
          >
            100% Open Source
          </div>
          <div
            style={{
              fontSize: 20,
              fontFamily: FONT,
              fontWeight: 500,
              color: C.gray,
              marginTop: 12,
              opacity: fadeIn(subFrame, 18, 12),
            }}
          >
            Community Driven · Transparent · Frei
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ── SCENE 8: CTA / WAITLIST (120 frames / 4s) ──
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 200 } });
  const textOpacity = fadeIn(frame, 12, 15);
  const badgeOpacity = fadeIn(frame, 30, 15);

  // Subtle pulsing glow
  const pulseScale = 1 + 0.015 * Math.sin((frame / 30) * Math.PI * 2);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: C.white,
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* Logo */}
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: 22,
            backgroundColor: C.primary,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 36px",
            transform: `scale(${interpolate(logoSpring, [0, 1], [0.5, 1]) * pulseScale})`,
            boxShadow: `0 12px 40px rgba(55,57,193,0.35)`,
          }}
        >
          <span style={{ color: C.white, fontSize: 40, fontFamily: FONT, fontWeight: 800 }}>K</span>
        </div>

        {/* Domain */}
        <div
          style={{
            fontSize: 60,
            fontFamily: FONT,
            fontWeight: 800,
            color: C.text,
            opacity: textOpacity,
            letterSpacing: "-2px",
          }}
        >
          kaderos.io
        </div>

        {/* CTA */}
        <div
          style={{
            fontSize: 30,
            fontFamily: FONT,
            fontWeight: 600,
            color: C.primary,
            opacity: textOpacity,
            marginTop: 12,
          }}
        >
          Platz sichern.
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
            color: C.gray,
          }}
        >
          <span>🇨🇭 Swiss Made</span>
          <span>·</span>
          <span>Open Source</span>
          <span>·</span>
          <span>Ab CHF 49/Mt.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── MAIN COMPOSITION ──
// Total: 120 + 150 + 160 + 130 + 140 + 120 + 150 + 120 = 1090 frames (~36.3s)
export const HeroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      {/* Scene 1: Terminal Onboard (0-4s) */}
      <Sequence from={0} durationInFrames={120}>
        <SceneTerminal />
      </Sequence>

      {/* Scene 2: Dashboard Overview (4-9s) */}
      <Sequence from={120} durationInFrames={150}>
        <SceneDashboard />
      </Sequence>

      {/* Scene 3: Agent bei der Arbeit (9-14.3s) */}
      <Sequence from={270} durationInFrames={160}>
        <SceneAgentWork />
      </Sequence>

      {/* Scene 4: Kader-Rollen (14.3-18.6s) */}
      <Sequence from={430} durationInFrames={130}>
        <SceneRoles />
      </Sequence>

      {/* Scene 5: Workflow (18.6-23.3s) */}
      <Sequence from={560} durationInFrames={140}>
        <SceneWorkflow />
      </Sequence>

      {/* Scene 6: Pricing Vergleich (23.3-27.3s) */}
      <Sequence from={700} durationInFrames={120}>
        <ScenePricing />
      </Sequence>

      {/* Scene 7: Trust Signals (27.3-32.3s) */}
      <Sequence from={820} durationInFrames={150}>
        <SceneTrust />
      </Sequence>

      {/* Scene 8: CTA (32.3-36.3s) */}
      <Sequence from={970} durationInFrames={120}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
