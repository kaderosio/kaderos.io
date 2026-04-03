import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Easing,
} from "remotion";

// ── GLOBAL DESIGN TOKENS ──
const C = {
  primary: "#3739C1",
  primaryLight: "#5B5CE6",
  purple: "#7C3AED",
  cyan: "#0891B2",
  green: "#059669",
  red: "#DC2626",
  text: "#FAFAFA",
  muted: "#A1A1AA",
  dim: "#71717A",
  dark: "#0A0A0F",
  surface: "#13131A",
  surfaceLight: "#1C1C26",
  glass: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.10)",
  glassStrong: "rgba(255,255,255,0.12)",
};

const FONT = "Outfit, -apple-system, sans-serif";
const MONO = "JetBrains Mono, SF Mono, Menlo, monospace";

// ── SPRING CONFIG ──
const SPRING_CFG = { mass: 0.5, stiffness: 120, damping: 14 };
const SPRING_SOFT = { mass: 0.8, stiffness: 80, damping: 18 };

// ── HELPERS ──
const sp = (frame: number, fps: number, delay = 0, config = SPRING_CFG) =>
  spring({ frame: Math.max(0, frame - delay), fps, config });

const fade = (frame: number, start = 0, dur = 15) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const fadeOut = (frame: number, start: number, dur = 10) =>
  interpolate(frame, [start, start + dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const blur = (frame: number, start = 0, dur = 12) =>
  interpolate(frame, [start, start + dur], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// Pseudo-random for particles (deterministic)
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// ── SHARED COMPONENTS ──

const GlowParticle: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  blur?: number;
}> = ({ x, y, size, color, opacity, blur: b = 8 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: color,
      opacity,
      filter: `blur(${b}px)`,
      pointerEvents: "none",
    }}
  />
);

const PulseRing: React.FC<{
  frame: number;
  x: number;
  y: number;
  color: string;
  delay?: number;
}> = ({ frame, x, y, color, delay = 0 }) => {
  const f = Math.max(0, frame - delay);
  const cycle = f % 60;
  const scale = interpolate(cycle, [0, 60], [0.5, 2.5]);
  const opacity = interpolate(cycle, [0, 60], [0.6, 0]);
  return (
    <div
      style={{
        position: "absolute",
        left: x - 15,
        top: y - 15,
        width: 30,
        height: 30,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        transform: `scale(${scale})`,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 1 — THE NEURAL TERMINAL (0-4s / 0-240 frames)
// ══════════════════════════════════════════════════════════
const SceneNeuralTerminal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient: black → indigo
  const bgProgress = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });

  // Terminal pop-in: scale 0.8 → 1.05 → 1.0
  const termSpring = sp(frame, fps, 10);
  const termScale = interpolate(termSpring, [0, 0.7, 1], [0.8, 1.05, 1.0]);
  const termOpacity = fade(frame, 5, 20);

  // Command typing
  const command = "npx kaderos onboard";
  const typingStart = 40;
  const charsVisible = Math.min(
    Math.floor(Math.max(0, frame - typingStart) / 3),
    command.length
  );
  const typingDone = charsVisible >= command.length;
  const typingEndFrame = typingStart + command.length * 3;

  // Scanline after enter
  const scanlineProgress = typingDone
    ? interpolate(frame, [typingEndFrame + 5, typingEndFrame + 25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Output lines
  const outputLines = [
    { text: '✓ Kader erkannt: "Agentur Zürich"', color: C.green },
    { text: "✓ 4 Agents bereit (CEO · CTO · CMO · Strategy)", color: C.green },
    { text: "✓ Budget: CHF 62/Monat", color: C.green },
    { text: "✓ nDSG-konform · Lokal · Autonom", color: C.green },
    { text: "🚀 Dein AI-Kader ist einsatzbereit.", color: C.text, chroma: true },
  ];
  const firstLineFrame = typingEndFrame + 30;
  const lineDelay = 15;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(160deg, ${C.dark} ${(1 - bgProgress) * 100}%, #0D0D2B ${bgProgress * 100}%)`,
        overflow: "hidden",
      }}
    >
      {/* Floating glow particles behind terminal */}
      {Array.from({ length: 12 }).map((_, i) => {
        const px = pseudoRandom(i) * 1080;
        const py = pseudoRandom(i + 50) * 1920;
        const drift = Math.sin((frame + i * 40) / 80) * 20;
        return (
          <GlowParticle
            key={i}
            x={px + drift}
            y={py + Math.cos((frame + i * 30) / 60) * 15}
            size={pseudoRandom(i + 100) * 6 + 2}
            color={i % 3 === 0 ? C.primary : i % 3 === 1 ? C.purple : C.cyan}
            opacity={0.15 + pseudoRandom(i + 200) * 0.15}
            blur={12}
          />
        );
      })}

      {/* Terminal Window */}
      <div
        style={{
          width: 920,
          borderRadius: 24,
          overflow: "hidden",
          border: `1px solid ${C.glassBorder}`,
          backgroundColor: C.glass,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: `0 30px 80px rgba(55,57,193,0.25), 0 0 0 1px ${C.glassBorder}`,
          transform: `scale(${termScale})`,
          opacity: termOpacity,
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "16px 22px",
            borderBottom: `1px solid ${C.glassBorder}`,
            backgroundColor: "rgba(255,255,255,0.03)",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FEBC2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28C840" }} />
          <span style={{ marginLeft: 12, fontSize: 13, color: C.dim, fontFamily: MONO }}>
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
            minHeight: 340,
            position: "relative",
          }}
        >
          {/* Scanline */}
          {scanlineProgress > 0 && scanlineProgress < 1 && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${scanlineProgress * 100}%`,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${C.primary}, ${C.cyan}, transparent)`,
                boxShadow: `0 0 20px ${C.primary}, 0 0 40px ${C.cyan}`,
                opacity: 0.8,
              }}
            />
          )}

          {/* Command line with glow particles */}
          <div style={{ color: C.text, position: "relative" }}>
            <span style={{ color: C.primary, fontWeight: 600 }}>$ </span>
            {command.split("").map((char, i) => {
              if (i >= charsVisible) return null;
              const charAge = frame - (typingStart + i * 3);
              const glowOpacity = interpolate(charAge, [0, 20], [0.8, 0], {
                extrapolateRight: "clamp",
              });
              return (
                <span key={i} style={{ position: "relative" }}>
                  {char}
                  {glowOpacity > 0.05 && (
                    <span
                      style={{
                        position: "absolute",
                        top: -4,
                        left: "50%",
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        backgroundColor: C.primaryLight,
                        filter: "blur(3px)",
                        opacity: glowOpacity,
                        transform: `translateX(-50%) translateY(${-glowOpacity * 8}px)`,
                      }}
                    />
                  )}
                </span>
              );
            })}
            {!typingDone && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: 18,
                  backgroundColor: C.primary,
                  marginLeft: 2,
                  verticalAlign: "middle",
                  opacity: frame % 30 < 15 ? 1 : 0,
                  boxShadow: `0 0 8px ${C.primary}`,
                }}
              />
            )}
          </div>

          {/* Output lines with blur-in */}
          {typingDone &&
            outputLines.map((line, i) => {
              const lineFrame = frame - (firstLineFrame + i * lineDelay);
              if (lineFrame < 0) return null;
              const opacity = fade(lineFrame, 0, 12);
              const blurVal = blur(lineFrame, 0, 12);
              const ty = interpolate(lineFrame, [0, 12], [8, 0], { extrapolateRight: "clamp" });

              // Chroma shift for last line
              const isChroma = "chroma" in line && line.chroma;
              const chromaShift = isChroma ? Math.sin(lineFrame / 8) * 1.5 : 0;

              return (
                <div
                  key={i}
                  style={{
                    color: line.color,
                    opacity,
                    filter: `blur(${blurVal}px)`,
                    transform: `translateY(${ty}px)`,
                    fontWeight: isChroma ? 700 : 400,
                    textShadow: isChroma
                      ? `${chromaShift}px 0 ${C.primary}, ${-chromaShift}px 0 ${C.cyan}, 0 0 20px ${C.primary}40`
                      : "none",
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

// ══════════════════════════════════════════════════════════
// SCENE 2 — 3D DASHBOARD REVEAL (4-9s / 240-540 frames)
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

  // Dashboard 3D perspective zoom-out
  const zoomSpring = sp(frame, fps, 0, SPRING_SOFT);
  const rotateY = interpolate(zoomSpring, [0, 1], [15, 0]);
  const perspective = 1200;
  const dashScale = interpolate(zoomSpring, [0, 1], [1.1, 1]);

  // Title
  const titleOpacity = fade(frame, 0, 25);
  const titleY = interpolate(frame, [0, 25], [30, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: `radial-gradient(ellipse at 50% 30%, #12123A 0%, ${C.dark} 70%)`,
        overflow: "hidden",
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${C.glassBorder} 1px, transparent 1px), linear-gradient(90deg, ${C.glassBorder} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.15,
          transform: `perspective(800px) rotateX(60deg)`,
          transformOrigin: "50% 100%",
        }}
      />

      <div
        style={{
          transform: `perspective(${perspective}px) rotateY(${rotateY}deg) scale(${dashScale})`,
          width: 940,
        }}
      >
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 16,
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

        <div
          style={{
            textAlign: "center",
            marginBottom: 50,
            opacity: fade(frame, 15, 20),
            fontSize: 22,
            fontFamily: FONT,
            fontWeight: 500,
            color: C.muted,
          }}
        >
          4 Agents · Active · CHF 62/Mt.
        </div>

        {/* Agent Cards 2x2 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
          {agents.map((agent, i) => {
            const delay = 40 + i * 6;
            const s = sp(frame, fps, delay);
            const cardScale = interpolate(s, [0, 1], [0.92, 1]);
            const cardOpacity = fade(frame, delay, 15);

            // Glint effect — diagonal light sweep
            const glintPos = interpolate(frame, [delay + 20, delay + 60], [-100, 200], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            // Pulse ring on status dot
            const dotX = 36;
            const dotY = 92;

            return (
              <div
                key={i}
                style={{
                  width: 440,
                  padding: "28px 24px",
                  borderRadius: 20,
                  border: `1px solid ${C.glassBorder}`,
                  backgroundColor: C.glass,
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  opacity: cardOpacity,
                  transform: `scale(${cardScale})`,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 ${C.glassBorder}`,
                }}
              >
                {/* Glint sweep */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, transparent ${glintPos - 20}%, rgba(255,255,255,0.06) ${glintPos}%, transparent ${glintPos + 20}%)`,
                    pointerEvents: "none",
                  }}
                />

                {/* Pulse rings */}
                <PulseRing frame={frame} x={dotX} y={dotY} color={C.green} delay={delay + 30} />
                <PulseRing frame={frame} x={dotX} y={dotY} color={C.green} delay={delay + 45} />

                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      backgroundColor: agent.color + "20",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 22,
                      border: `1px solid ${agent.color}30`,
                    }}
                  >
                    {agent.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 22, fontFamily: FONT, fontWeight: 700, color: C.text }}>
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
                      boxShadow: `0 0 8px ${C.green}`,
                    }}
                  />
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
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 3 — CTO DEEP-DIVE (9-14s / 540-840 frames)
// ══════════════════════════════════════════════════════════
const SceneCTODeepDive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hard zoom effect
  const zoomSpring = sp(frame, fps, 0, { mass: 0.6, stiffness: 100, damping: 16 });
  const zoom = interpolate(zoomSpring, [0, 1], [0.85, 1]);

  const commits = [
    { msg: "fix: rate limiting for /api/auth", time: "03:12", color: C.cyan },
    { msg: "feat: add input validation layer", time: "03:14", color: C.purple },
    { msg: "test: security audit — all passed", time: "03:15", color: C.green },
    { msg: "chore: create PR #47 → main", time: "03:16", color: C.primary },
  ];

  const steps = [
    { label: "Reading codebase", icon: "📖" },
    { label: "Security analysis", icon: "🔒" },
    { label: "Applying fixes", icon: "🔧" },
    { label: "Creating PR", icon: "🚀" },
  ];

  const tools = [
    { name: "filesystem.read", color: C.primary },
    { name: "bash.exec", color: C.purple },
    { name: "github.create_pr", color: C.green },
  ];

  // Liquid fill progress per step
  const stepDelay = 40;
  const commitDelay = 25;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        background: `radial-gradient(ellipse at 50% 20%, #0D0D2B 0%, ${C.dark} 80%)`,
        padding: "50px 40px",
        overflow: "hidden",
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
          opacity: fade(frame, 0, 20),
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            backgroundColor: C.purple + "25",
            border: `1px solid ${C.purple}40`,
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
          <div style={{ fontSize: 16, fontFamily: FONT, color: C.dim }}>
            Arbeitet autonom · 03:14
          </div>
        </div>
      </div>

      {/* Code streaming with neon glow */}
      <div
        style={{
          width: 940,
          borderRadius: 18,
          border: `1px solid ${C.glassBorder}`,
          backgroundColor: C.glass,
          backdropFilter: "blur(16px)",
          padding: "24px 28px",
          marginBottom: 24,
          fontFamily: MONO,
          fontSize: 15,
          lineHeight: 2.4,
        }}
      >
        {commits.map((c, i) => {
          const lineFrame = frame - (20 + i * commitDelay);
          if (lineFrame < 0) return null;
          const opacity = fade(lineFrame, 0, 12);
          const blurVal = blur(lineFrame, 0, 12);
          const ty = interpolate(lineFrame, [0, 12], [8, 0], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                opacity,
                filter: `blur(${blurVal}px)`,
                transform: `translateY(${ty}px)`,
                color: C.text,
                textShadow: `0 0 12px ${c.color}40`,
              }}
            >
              <span style={{ color: C.green }}>✓ </span>
              <span style={{ color: C.dim }}>{c.time}</span>{"  "}
              <span style={{ color: c.color }}>{c.msg}</span>
            </div>
          );
        })}
      </div>

      {/* Progress steps with liquid-fill checkmarks */}
      <div
        style={{
          width: 940,
          borderRadius: 18,
          border: `1px solid ${C.glassBorder}`,
          backgroundColor: C.glass,
          backdropFilter: "blur(16px)",
          padding: "24px 28px",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontFamily: FONT,
            fontWeight: 700,
            color: C.dim,
            marginBottom: 18,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
          }}
        >
          Progress
        </div>
        {steps.map((step, i) => {
          const sFrame = frame - (30 + i * stepDelay);
          const isDone = sFrame > stepDelay;
          const isActive = sFrame > 0 && !isDone;
          const opacity = fade(frame, 30 + i * stepDelay, 12);

          // Liquid fill: green fills from 0% to 100%
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
                fontWeight: isActive ? 700 : 500,
                color: isDone ? C.green : isActive ? C.text : C.dim,
              }}
            >
              {/* Liquid-fill circle */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: `2px solid ${isDone ? C.green : isActive ? C.primary : C.dim}`,
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
                    transition: "none",
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
                      color: C.dark,
                      fontSize: 14,
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

      {/* Floating 3D tool pills */}
      <div style={{ display: "flex", gap: 14, width: 940 }}>
        {tools.map((tool, i) => {
          const delay = 140 + i * 15;
          const s = sp(frame, fps, delay);
          const pillScale = interpolate(s, [0, 1], [0.8, 1]);
          const opacity = fade(frame, delay, 12);
          const isActive = frame > delay + 20;

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `scale(${pillScale}) translateZ(0)`,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 18px",
                borderRadius: 14,
                backgroundColor: isActive ? tool.color + "18" : C.glass,
                border: `1px solid ${isActive ? tool.color + "50" : C.glassBorder}`,
                fontFamily: MONO,
                fontSize: 14,
                color: isActive ? tool.color : C.dim,
                boxShadow: isActive ? `0 0 20px ${tool.color}20, 0 4px 16px rgba(0,0,0,0.3)` : "0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: isActive ? C.green : C.dim,
                  boxShadow: isActive ? `0 0 6px ${C.green}` : "none",
                }}
              />
              {tool.name}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 4 — THE CAPABILITY RING (14-19s / 840-1140 frames)
// ══════════════════════════════════════════════════════════
const SceneCapabilityRing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const roles = [
    { name: "CEO", color: C.primary, icon: "👤" },
    { name: "CTO", color: C.purple, icon: "⚙️" },
    { name: "CMO", color: C.cyan, icon: "📣" },
    { name: "CFO", color: C.green, icon: "📊" },
    { name: "PM", color: "#E67E22", icon: "📋" },
    { name: "Creator", color: "#EC4899", icon: "✍️" },
  ];

  const capabilities = [
    "Autonome Agents · 24/7",
    "Lokal · Deine Daten",
    "nDSG-konform · Swiss Made",
    "Ab CHF 49/Mt.",
  ];

  // Carousel rotation
  const rotationSpeed = 0.012;
  const baseAngle = frame * rotationSpeed;
  const radius = 280;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: `radial-gradient(ellipse at 50% 50%, #12123A 0%, ${C.dark} 80%)`,
        overflow: "hidden",
      }}
    >
      {/* Center KaderOS logo */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 620,
          transform: "translate(-50%, -50%)",
          width: 80,
          height: 80,
          borderRadius: 20,
          backgroundColor: C.primary,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: `0 0 40px ${C.primary}40, 0 0 80px ${C.primary}20`,
          opacity: fade(frame, 0, 20),
          zIndex: 10,
        }}
      >
        <span style={{ color: C.text, fontSize: 36, fontFamily: FONT, fontWeight: 800 }}>K</span>
      </div>

      {/* Rotating role icons */}
      {roles.map((role, i) => {
        const angle = baseAngle + (i / roles.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.4; // elliptical
        const z = Math.sin(angle); // depth
        const scale = interpolate(z, [-1, 1], [0.7, 1.1]);
        const opacity = interpolate(z, [-1, 1], [0.3, 1]);
        const isFront = z > 0.7;

        const enterOpacity = fade(frame, i * 5, 15);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50% + ${x}px - 40px)`,
              top: `calc(620px + ${y}px - 40px)`,
              width: 80,
              height: 80,
              borderRadius: 20,
              backgroundColor: isFront ? role.color + "25" : C.glass,
              border: `1.5px solid ${isFront ? role.color + "60" : C.glassBorder}`,
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              transform: `scale(${scale})`,
              opacity: opacity * enterOpacity,
              boxShadow: isFront ? `0 0 30px ${role.color}30` : "none",
              zIndex: Math.round(z * 10) + 10,
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

      {/* Capabilities text — right side */}
      <div
        style={{
          position: "absolute",
          top: 950,
          left: 0,
          right: 0,
          padding: "0 80px",
        }}
      >
        {capabilities.map((cap, i) => {
          const delay = 60 + i * 12;
          const s = sp(frame, fps, delay, { mass: 0.4, stiffness: 100, damping: 12 });
          const slideX = interpolate(s, [0, 1], [60, 0]);
          const opacity = fade(frame, delay, 15);
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
                padding: "12px 0",
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

      {/* Tagline with scale-bounce */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {["Dein", "Kader.", "Deine", "Regeln."].map((word, i) => {
          const delay = 140 + i * 8;
          const s = sp(frame, fps, delay, { mass: 0.3, stiffness: 150, damping: 10 });
          const wordScale = interpolate(s, [0, 0.5, 1], [0.6, 1.15, 1]);
          const opacity = fade(frame, delay, 10);
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
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5 — AUTONOMOUS PIPELINE (19-24s / 1140-1440 frames)
// ══════════════════════════════════════════════════════════
const ScenePipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { label: "Brief rein", agent: "Du", color: C.muted, icon: "📝" },
    { label: "Content-Plan", agent: "CMO", color: C.cyan, icon: "📋" },
    { label: "Texte schreiben", agent: "Creator", color: "#EC4899", icon: "✍️" },
    { label: "Landing Page", agent: "CTO", color: C.purple, icon: "🖥️" },
    { label: "ROI tracken", agent: "CFO", color: C.green, icon: "📊" },
  ];

  // Energy ball position
  const ballProgress = interpolate(frame, [30, 250], [0, steps.length - 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentStep = Math.floor(ballProgress);
  const stepFraction = ballProgress - currentStep;

  // Final "Done" flash
  const isDone = frame > 260;
  const flashOpacity = isDone
    ? interpolate(frame, [260, 268, 280], [0, 0.3, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: `radial-gradient(ellipse at 50% 40%, #0D0D2B 0%, ${C.dark} 80%)`,
        overflow: "hidden",
      }}
    >
      {/* White flash overlay */}
      {flashOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: C.text,
            opacity: flashOpacity,
            zIndex: 100,
          }}
        />
      )}

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 120,
          textAlign: "center",
          width: "100%",
          opacity: fade(frame, 0, 20),
        }}
      >
        <div style={{ fontSize: 44, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-1px" }}>
          So arbeitet dein Kader
        </div>
        <div style={{ fontSize: 18, fontFamily: FONT, color: C.dim, marginTop: 10 }}>
          Agents koordinieren sich autonom
        </div>
      </div>

      {/* Vertical pipeline */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, marginTop: 40 }}>
        {steps.map((step, i) => {
          const delay = 15 + i * 20;
          const opacity = fade(frame, delay, 15);
          const isReached = ballProgress >= i;
          const isPassed = ballProgress >= i + 0.8;
          const isActiveNow = currentStep === i;

          // Data wave particles when ball passes
          const showParticles = isPassed && frame < delay + 80;

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  opacity,
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "22px 32px",
                  width: 620,
                  borderRadius: 18,
                  backgroundColor: isActiveNow ? step.color + "12" : C.glass,
                  border: `1.5px solid ${isActiveNow ? step.color + "50" : C.glassBorder}`,
                  backdropFilter: "blur(12px)",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: isActiveNow ? `0 0 30px ${step.color}20` : "none",
                }}
              >
                {/* Energy ball glow when active */}
                {isActiveNow && (
                  <div
                    style={{
                      position: "absolute",
                      left: 20,
                      top: "50%",
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: step.color,
                      transform: "translateY(-50%)",
                      boxShadow: `0 0 20px ${step.color}, 0 0 40px ${step.color}80`,
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
                      fontWeight: isActiveNow ? 700 : 500,
                      color: isPassed ? C.green : isActiveNow ? step.color : C.text,
                    }}
                  >
                    {step.label}
                  </div>
                  <div style={{ fontSize: 14, fontFamily: FONT, color: C.dim }}>
                    {step.agent}
                  </div>
                </div>

                {/* Data wave particles */}
                {showParticles &&
                  Array.from({ length: 4 }).map((_, pi) => {
                    const age = frame - (delay + 40);
                    const px = 60 + age * (3 + pi * 2) * (pi % 2 === 0 ? 1 : -1);
                    const py = -age * 0.5;
                    return (
                      <div
                        key={pi}
                        style={{
                          position: "absolute",
                          left: `calc(50% + ${px}px)`,
                          top: `calc(50% + ${py}px)`,
                          fontFamily: MONO,
                          fontSize: 10,
                          color: step.color,
                          opacity: Math.max(0, 0.6 - age * 0.02),
                        }}
                      >
                        {pi % 2 === 0 ? "01" : "10"}
                      </div>
                    );
                  })}
              </div>

              {/* Connection line */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    width: 2,
                    height: 24,
                    backgroundColor: isPassed ? step.color + "60" : C.glassBorder,
                    opacity: fade(frame, delay + 10, 10),
                    boxShadow: isPassed ? `0 0 8px ${step.color}40` : "none",
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Done checkmark */}
      {isDone && (
        <div
          style={{
            marginTop: 30,
            opacity: fade(frame, 265, 15),
            transform: `scale(${interpolate(sp(frame, fps, 265), [0, 1], [0.5, 1])})`,
            fontSize: 24,
            fontFamily: FONT,
            fontWeight: 700,
            color: C.green,
            textShadow: `0 0 20px ${C.green}60`,
          }}
        >
          ✅ Pipeline complete
        </div>
      )}
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 6 — THE DISRUPTOR SPLIT (24-29s / 1440-1740 frames)
// ══════════════════════════════════════════════════════════
const SceneDisruptor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split screen reveal
  const splitProgress = fade(frame, 0, 30);

  // Price fracture: "CHF 15'000" characters fall
  const fractureStart = 80;
  const fractured = frame > fractureStart;

  const humanPrice = "CHF 15'000";
  const kaderPrice = "CHF 62";

  // "241x günstiger" heartbeat
  const highlightDelay = 140;
  const heartbeat = frame > highlightDelay
    ? 1 + 0.04 * Math.sin((frame - highlightDelay) / 8 * Math.PI * 2)
    : 0;
  const highlightOpacity = fade(frame, highlightDelay, 20);
  const highlightScale = interpolate(
    sp(frame, fps, highlightDelay),
    [0, 1],
    [0.6, 1]
  ) * heartbeat;

  // Comparison rows
  const rows = [
    { label: "Verfügbar", human: "8h/Tag", kader: "24/7" },
    { label: "Setup", human: "3 Monate", kader: "30 Sekunden" },
    { label: "Ferien", human: "5 Wochen", kader: "0" },
  ];

  // Kader price shimmer
  const shimmerPos = interpolate(frame, [60, 200], [-100, 300], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: C.dark,
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 140,
          textAlign: "center",
          width: "100%",
          opacity: fade(frame, 0, 20),
        }}
      >
        <div style={{ fontSize: 48, fontFamily: FONT, fontWeight: 800, color: C.text, letterSpacing: "-1.5px" }}>
          Mensch vs. Kader
        </div>
      </div>

      {/* Split comparison */}
      <div style={{ display: "flex", width: 900, gap: 20, marginTop: 20 }}>
        {/* Left: Human — gray/static */}
        <div
          style={{
            flex: 1,
            padding: "40px 30px",
            borderRadius: 24,
            backgroundColor: "rgba(255,255,255,0.03)",
            border: `1px solid ${C.glassBorder}`,
            opacity: splitProgress,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 14, fontFamily: FONT, fontWeight: 700, color: C.dim, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 24 }}>
            Mensch
          </div>

          {/* Fracturing price */}
          <div style={{ fontSize: 48, fontFamily: FONT, fontWeight: 800, marginBottom: 30, height: 60, position: "relative" }}>
            {humanPrice.split("").map((char, ci) => {
              const fallDelay = fractureStart + ci * 2;
              const fallen = frame > fallDelay;
              const fallProgress = fallen
                ? interpolate(frame, [fallDelay, fallDelay + 30], [0, 1], { extrapolateRight: "clamp" })
                : 0;
              const charY = fallProgress * (200 + pseudoRandom(ci) * 100);
              const charRotate = fallProgress * (pseudoRandom(ci + 10) * 360 - 180);
              const charOpacity = 1 - fallProgress;

              return (
                <span
                  key={ci}
                  style={{
                    display: "inline-block",
                    color: C.dim,
                    transform: `translateY(${charY}px) rotate(${charRotate}deg)`,
                    opacity: charOpacity,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                opacity: fade(frame, 30 + i * 15, 12),
                padding: "14px 0",
                borderTop: i > 0 ? `1px solid ${C.glassBorder}` : "none",
              }}
            >
              <div style={{ fontSize: 13, fontFamily: FONT, color: C.dim, marginBottom: 4 }}>
                {row.label}
              </div>
              <div style={{ fontSize: 22, fontFamily: FONT, fontWeight: 600, color: C.dim }}>
                {row.human}
              </div>
            </div>
          ))}
        </div>

        {/* Right: KaderOS — dynamic indigo */}
        <div
          style={{
            flex: 1,
            padding: "40px 30px",
            borderRadius: 24,
            backgroundColor: C.primary + "12",
            border: `1px solid ${C.primary}30`,
            opacity: splitProgress,
            textAlign: "center",
            boxShadow: `0 0 60px ${C.primary}15`,
          }}
        >
          <div style={{ fontSize: 14, fontFamily: FONT, fontWeight: 700, color: C.primary, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 24 }}>
            KaderOS
          </div>

          {/* Rising price with shimmer */}
          <div
            style={{
              fontSize: 56,
              fontFamily: FONT,
              fontWeight: 800,
              marginBottom: 30,
              height: 60,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                background: `linear-gradient(135deg, ${C.primary} 0%, ${C.purple} 50%, ${C.cyan} 100%)`,
                backgroundSize: "200% auto",
                backgroundPosition: `${shimmerPos}% center`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transform: `scale(${interpolate(sp(frame, fps, 50), [0, 1], [0.5, 1])})`,
              }}
            >
              {kaderPrice}
            </span>
          </div>

          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                opacity: fade(frame, 30 + i * 15, 12),
                padding: "14px 0",
                borderTop: i > 0 ? `1px solid ${C.primary}20` : "none",
              }}
            >
              <div style={{ fontSize: 13, fontFamily: FONT, color: C.muted, marginBottom: 4 }}>
                {row.label}
              </div>
              <div style={{ fontSize: 22, fontFamily: FONT, fontWeight: 700, color: C.text }}>
                {row.kader}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "241x günstiger" heartbeat highlight */}
      <div
        style={{
          marginTop: 50,
          textAlign: "center",
          opacity: highlightOpacity,
          transform: `scale(${highlightScale || 0.01})`,
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontFamily: FONT,
            fontWeight: 800,
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.purple} 50%, ${C.cyan} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
          }}
        >
          241× günstiger
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 7 — SWISS TRUST MORPH (29-34s / 1740-2040 frames)
// ══════════════════════════════════════════════════════════
const SceneSwissTrust: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Three phases: Flag (0-100), Text (100-200), Logo (200-300)
  const phase = frame < 100 ? 0 : frame < 200 ? 1 : 2;
  const phaseFrame = frame < 100 ? frame : frame < 200 ? frame - 100 : frame - 200;

  // Flag → Logo morph
  const morphProgress = phase === 0
    ? interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  // Grid rotation
  const gridRotateY = frame * 0.15;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: `radial-gradient(ellipse at 50% 50%, #0D0D2B 0%, ${C.dark} 80%)`,
        overflow: "hidden",
      }}
    >
      {/* Rotating grid background */}
      <div
        style={{
          position: "absolute",
          inset: -200,
          backgroundImage: `linear-gradient(${C.glassBorder} 1px, transparent 1px), linear-gradient(90deg, ${C.glassBorder} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.08,
          transform: `perspective(600px) rotateX(50deg) rotateZ(${gridRotateY}deg)`,
          transformOrigin: "50% 50%",
        }}
      />

      {/* Phase 0: Swiss Flag morphing to KaderOS logo */}
      {phase === 0 && (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: interpolate(morphProgress, [0, 1], [160, 90]),
              height: interpolate(morphProgress, [0, 1], [160, 90]),
              borderRadius: interpolate(morphProgress, [0, 1], [8, 22]),
              backgroundColor: interpolate(morphProgress, [0, 0.5, 1], [0, 0, 1]) > 0.5
                ? C.primary
                : "#DC2626",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
              transform: `scale(${interpolate(sp(phaseFrame, fps, 0, SPRING_SOFT), [0, 1], [0.3, 1])})`,
              boxShadow: morphProgress > 0.5
                ? `0 0 60px ${C.primary}40`
                : "0 0 40px rgba(220,38,38,0.3)",
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontSize: interpolate(morphProgress, [0, 1], [80, 42]),
                fontFamily: FONT,
                fontWeight: 800,
              }}
            >
              {morphProgress < 0.5 ? "+" : "K"}
            </span>
          </div>
          <div
            style={{
              fontSize: 28,
              fontFamily: FONT,
              fontWeight: 700,
              color: C.text,
              marginTop: 30,
              opacity: fade(phaseFrame, 15, 15),
            }}
          >
            Swiss Made
          </div>
        </div>
      )}

      {/* Phase 1: Kinetic typography */}
      {phase === 1 && (
        <div style={{ textAlign: "center", padding: 60 }}>
          {["Lokal.", "Autonom.", "nDSG-konform."].map((word, i) => {
            const delay = i * 15;
            // Wave motion
            const wave = Math.sin((phaseFrame - delay) / 15) * 6;
            const opacity = fade(phaseFrame, delay, 12);
            const s = sp(phaseFrame, fps, delay, { mass: 0.3, stiffness: 140, damping: 12 });
            const wordScale = interpolate(s, [0, 0.5, 1], [0.7, 1.1, 1]);

            return (
              <div
                key={i}
                style={{
                  fontSize: 56,
                  fontFamily: FONT,
                  fontWeight: 800,
                  color: C.text,
                  opacity,
                  transform: `scale(${wordScale}) translateY(${wave}px)`,
                  letterSpacing: "-1px",
                  marginBottom: 12,
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
              color: C.dim,
              marginTop: 30,
              opacity: fade(phaseFrame, 50, 15),
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
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: 22,
              backgroundColor: C.primary,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 30px",
              transform: `scale(${interpolate(sp(phaseFrame, fps, 0), [0, 1], [0.4, 1])})`,
              boxShadow: `0 0 50px ${C.primary}50, 0 0 100px ${C.primary}20`,
            }}
          >
            <span style={{ color: "#FFFFFF", fontSize: 40, fontFamily: FONT, fontWeight: 800 }}>K</span>
          </div>
          <div
            style={{
              fontSize: 44,
              fontFamily: FONT,
              fontWeight: 800,
              color: C.text,
              opacity: fade(phaseFrame, 10, 15),
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
              opacity: fade(phaseFrame, 20, 15),
            }}
          >
            Community Driven · Transparent · Frei
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 8 — GRAND FINALE / CTA (34-42s / 2040-2520 frames)
// ══════════════════════════════════════════════════════════
const SceneGrandFinale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Impact: all elements converge → screen shake
  const impactFrame = 60;
  const preImpact = frame < impactFrame;

  // Converging elements
  const convergeProgress = preImpact
    ? interpolate(frame, [0, impactFrame], [1, 0], { extrapolateRight: "clamp" })
    : 0;

  // Screen shake after impact
  const shakeIntensity = !preImpact
    ? interpolate(frame, [impactFrame, impactFrame + 20], [8, 0], { extrapolateRight: "clamp" })
    : 0;
  const shakeX = shakeIntensity * Math.sin(frame * 2.5);
  const shakeY = shakeIntensity * Math.cos(frame * 3.1);

  // Logo
  const logoDelay = impactFrame;
  const logoSpring = sp(frame, fps, logoDelay, { mass: 0.4, stiffness: 160, damping: 12 });
  const logoScale = interpolate(logoSpring, [0, 0.5, 1], [0.3, 1.15, 1]);

  // Text reveals
  const domainOpacity = fade(frame, impactFrame + 30, 20);
  const ctaOpacity = fade(frame, impactFrame + 50, 20);
  const badgeOpacity = fade(frame, impactFrame + 70, 20);

  // Border trace animation for CTA button
  const traceAngle = ((frame - impactFrame - 50) / 60) * 360;

  // Cursor blink for URL
  const cursorVisible = frame % 40 < 20 && frame > impactFrame + 30;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: `radial-gradient(ellipse at 50% 50%, #12123A 0%, ${C.dark} 80%)`,
        overflow: "hidden",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Pre-impact: converging fragments */}
      {preImpact && (
        <>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const dist = convergeProgress * 600;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;
            const items = ["⚙️", "📊", "62", "</>" , "📣", "🔒", "✓", "🚀"];
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  fontSize: 28,
                  opacity: convergeProgress,
                  transform: `rotate(${frame * 2}deg)`,
                }}
              >
                {items[i]}
              </div>
            );
          })}
        </>
      )}

      {/* Floating particles */}
      {!preImpact &&
        Array.from({ length: 16 }).map((_, i) => {
          const px = pseudoRandom(i + 300) * 1080;
          const py = pseudoRandom(i + 400) * 1920;
          const drift = Math.sin((frame + i * 30) / 60) * 15;
          return (
            <GlowParticle
              key={i}
              x={px + drift}
              y={py}
              size={3 + pseudoRandom(i + 500) * 4}
              color={i % 2 === 0 ? C.primary : C.purple}
              opacity={0.12}
              blur={6}
            />
          );
        })}

      {/* KaderOS Logo with impact */}
      {!preImpact && (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 26,
              backgroundColor: C.primary,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 40px",
              transform: `scale(${logoScale})`,
              boxShadow: `0 0 60px ${C.primary}60, 0 0 120px ${C.primary}30, 0 20px 60px rgba(0,0,0,0.4)`,
            }}
          >
            <span style={{ color: "#FFFFFF", fontSize: 48, fontFamily: FONT, fontWeight: 800 }}>K</span>
          </div>

          {/* Domain with cursor */}
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
                  height: 50,
                  backgroundColor: C.primary,
                  marginLeft: 4,
                  verticalAlign: "middle",
                  boxShadow: `0 0 10px ${C.primary}`,
                }}
              />
            )}
          </div>

          {/* CTA Button with border trace */}
          <div
            style={{
              marginTop: 30,
              opacity: ctaOpacity,
              position: "relative",
              display: "inline-block",
            }}
          >
            <div
              style={{
                padding: "18px 60px",
                borderRadius: 16,
                backgroundColor: C.primary + "18",
                border: `2px solid ${C.primary}50`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Border trace glow */}
              <div
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: 16,
                  background: `conic-gradient(from ${traceAngle}deg, transparent 0%, ${C.primary} 10%, transparent 20%)`,
                  opacity: 0.6,
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: 2,
                }}
              />
              <span
                style={{
                  fontSize: 28,
                  fontFamily: FONT,
                  fontWeight: 700,
                  color: C.primary,
                  position: "relative",
                  zIndex: 1,
                }}
              >
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
      )}
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN COMPOSITION — 42s @ 60fps = 2520 frames
// ══════════════════════════════════════════════════════════
export const HeroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.dark }}>
      {/* Scene 1: Neural Terminal (0-4s) */}
      <Sequence from={0} durationInFrames={240}>
        <SceneNeuralTerminal />
      </Sequence>

      {/* Scene 2: 3D Dashboard (4-9s) */}
      <Sequence from={240} durationInFrames={300}>
        <SceneDashboard />
      </Sequence>

      {/* Scene 3: CTO Deep-Dive (9-14s) */}
      <Sequence from={540} durationInFrames={300}>
        <SceneCTODeepDive />
      </Sequence>

      {/* Scene 4: Capability Ring (14-19s) */}
      <Sequence from={840} durationInFrames={300}>
        <SceneCapabilityRing />
      </Sequence>

      {/* Scene 5: Autonomous Pipeline (19-24s) */}
      <Sequence from={1140} durationInFrames={300}>
        <ScenePipeline />
      </Sequence>

      {/* Scene 6: Disruptor Split (24-29s) */}
      <Sequence from={1440} durationInFrames={300}>
        <SceneDisruptor />
      </Sequence>

      {/* Scene 7: Swiss Trust Morph (29-34s) */}
      <Sequence from={1740} durationInFrames={300}>
        <SceneSwissTrust />
      </Sequence>

      {/* Scene 8: Grand Finale (34-42s) */}
      <Sequence from={2040} durationInFrames={480}>
        <SceneGrandFinale />
      </Sequence>
    </AbsoluteFill>
  );
};
