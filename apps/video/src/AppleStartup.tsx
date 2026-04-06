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

// ══════════════════════════════════════════════════════════
// APPLE × STARTUP — Kling-optimized cinematic ad
// 40s @ 60fps = 2400 frames | 1080×1920 (vertical)
// ══════════════════════════════════════════════════════════

const C = {
  bg: "#000000",
  bgWarm: "#0A0A08",
  white: "#FFFFFF",
  text: "#F5F5F7",
  muted: "#86868B",
  dim: "#48484A",
  primary: "#000088",
  accent: "#0A84FF",
  green: "#30D158",
  cyan: "#64D2FF",
  orange: "#FF9F0A",
  purple: "#BF5AF2",
  surface: "rgba(255,255,255,0.06)",
  surfaceLight: "rgba(255,255,255,0.10)",
  glow: "rgba(10,132,255,0.15)",
};

const FONT = "Outfit, SF Pro Display, -apple-system, sans-serif";
const MONO = "SF Mono, JetBrains Mono, Menlo, monospace";

// Spring presets — Apple-like: smooth, no bounce
const SILK = { damping: 200 };
const GENTLE = { damping: 200, stiffness: 80, mass: 1.2 };
const SOFT = { damping: 200, stiffness: 60 };

const sp = (f: number, fps: number, delay = 0, config = SILK) =>
  spring({ frame: Math.max(0, f - delay), fps, config });

const clamp = (f: number, start: number, end: number, from: number, to: number) =>
  interpolate(f, [start, end], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const ease = (f: number, start: number, dur: number, from: number, to: number) =>
  interpolate(f, [start, start + dur], [from, to], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// ══════════════════════════════════════════════════════════
// SCENE 1 — SOLITUDE (0:00–0:06 = frames 0–360)
// Close-up: Gründer alone, cool MacBook glow, notifications
// ══════════════════════════════════════════════════════════

const SceneSolitude: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle ambient glow pulsing
  const glowPulse = Math.sin(f * 0.03) * 0.15 + 0.85;
  const glowSize = interpolate(Math.sin(f * 0.02), [-1, 1], [200, 280]);

  // Screen glow — cool blue, centered low
  const screenGlow = clamp(f, 0, 40, 0, 1);

  // Notification counter
  const notifAppear = sp(f, fps, 60, SILK);
  const notifCount = Math.min(47, Math.floor(clamp(f, 80, 200, 0, 47)));

  // Voiceover text: "Du startest nicht mit Kontrolle."
  const voTextOp = ease(f, 180, 30, 0, 1);
  const voTextY = ease(f, 180, 40, 30, 0);

  // Scene fade out
  const fadeOut = clamp(f, 330, 360, 1, 0);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        opacity: fadeOut,
      }}
    >
      {/* Ambient screen glow */}
      <div
        style={{
          position: "absolute",
          bottom: "35%",
          left: "50%",
          transform: "translateX(-50%)",
          width: glowSize,
          height: glowSize * 0.6,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(120,160,255,${0.25 * screenGlow * glowPulse}) 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* MacBook silhouette */}
      <div
        style={{
          position: "absolute",
          bottom: "32%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 420,
          height: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: screenGlow,
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: 340,
            height: 220,
            borderRadius: 12,
            border: `1px solid ${C.dim}`,
            background: `linear-gradient(180deg, rgba(30,30,40,0.9) 0%, rgba(15,15,20,0.95) 100%)`,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Notification badge */}
          <div
            style={{
              position: "absolute",
              top: 24,
              left: "50%",
              transform: `translateX(-50%) scale(${notifAppear})`,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 24px",
              borderRadius: 14,
              background: C.surface,
              backdropFilter: "blur(20px)",
              border: `1px solid rgba(255,255,255,0.08)`,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#FF3B30",
              }}
            />
            <span
              style={{
                fontFamily: FONT,
                fontSize: 16,
                color: C.muted,
                letterSpacing: -0.3,
              }}
            >
              {notifCount} ungelesene Nachrichten
            </span>
          </div>

          {/* Subtle UI lines — fake interface elements */}
          {[0.4, 0.52, 0.64, 0.76].map((top, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${top * 100}%`,
                left: 24,
                right: 24 + i * 30,
                height: 1,
                backgroundColor: `rgba(255,255,255,${0.04 + i * 0.01})`,
                opacity: clamp(f, 40 + i * 15, 60 + i * 15, 0, 1),
              }}
            />
          ))}
        </div>

        {/* Keyboard base */}
        <div
          style={{
            width: 380,
            height: 12,
            borderRadius: "0 0 8px 8px",
            background: `linear-gradient(180deg, ${C.dim} 0%, rgba(40,40,40,0.6) 100%)`,
            marginTop: -1,
          }}
        />
      </div>

      {/* Face silhouette — subtle gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 200,
          height: 260,
          borderRadius: "50% 50% 45% 45%",
          background: `radial-gradient(ellipse, rgba(80,100,140,${0.08 * screenGlow}) 0%, transparent 70%)`,
          opacity: clamp(f, 20, 60, 0, 1),
        }}
      />

      {/* Voiceover text */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: voTextOp,
          transform: `translateY(${voTextY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: 38,
            fontWeight: 300,
            color: C.text,
            letterSpacing: -0.8,
            lineHeight: 1.3,
          }}
        >
          Du startest nicht mit Kontrolle.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 2 — COMPLEXITY (0:06–0:12 = frames 360–720)
// Precise cuts: trackpad, tabs, tired eyes
// ══════════════════════════════════════════════════════════

const SceneComplexity: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Three panels cycling — Apple-style precise cuts
  const panelIndex = f < 100 ? 0 : f < 200 ? 1 : 2;

  const panels = [
    { label: "Trackpad", icon: "⬜", desc: "12 Tabs offen" },
    { label: "Browser", icon: "⬜", desc: "Slack · Mail · Docs · CRM" },
    { label: "Focus", icon: "⬜", desc: "Müde Augen, Mitternacht" },
  ];

  const panel = panels[panelIndex]!;

  // Smooth crossfade between panels
  const panelOp = (() => {
    if (f < 100) return clamp(f, 0, 25, 0, 1) * clamp(f, 80, 100, 1, 0);
    if (f < 200) return clamp(f, 100, 125, 0, 1) * clamp(f, 180, 200, 1, 0);
    return clamp(f, 200, 225, 0, 1);
  })();

  // Floating detail indicator
  const detailScale = sp(f, fps, panelIndex * 100 + 40, SILK);

  // Voiceover text
  const voOp = ease(f, 140, 30, 0, 1);
  const voY = ease(f, 140, 40, 25, 0);

  // Scene fade out
  const fadeOut = clamp(f, 330, 360, 1, 0);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, opacity: fadeOut }}>
      {/* Panel visual area */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: 60,
          right: 60,
          bottom: "35%",
          borderRadius: 24,
          background: C.surface,
          border: `1px solid rgba(255,255,255,0.06)`,
          opacity: panelOp,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {/* Minimal UI representation */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${C.surface} 0%, rgba(255,255,255,0.03) 100%)`,
            border: `1px solid rgba(255,255,255,0.08)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              backgroundColor: `rgba(255,255,255,0.1)`,
            }}
          />
        </div>

        <span
          style={{
            fontFamily: FONT,
            fontSize: 22,
            fontWeight: 500,
            color: C.text,
            letterSpacing: -0.3,
          }}
        >
          {panel.label}
        </span>

        {/* Detail pill */}
        <div
          style={{
            transform: `scale(${detailScale})`,
            padding: "8px 20px",
            borderRadius: 100,
            background: C.surface,
            border: `1px solid rgba(255,255,255,0.06)`,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 14,
              color: C.muted,
              letterSpacing: 0.5,
            }}
          >
            {panel.desc}
          </span>
        </div>

        {/* Horizontal scan lines — subtle movement */}
        {[0.3, 0.5, 0.7].map((pos, i) => {
          const lineX = ease(f, i * 30, 360, -100, 100);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${pos * 100}%`,
                left: 30,
                right: 30,
                height: 1,
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.04) ${50 + lineX * 0.3}%, transparent)`,
              }}
            />
          );
        })}
      </div>

      {/* Voiceover text */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: voOp,
          transform: `translateY(${voY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: 38,
            fontWeight: 300,
            color: C.text,
            letterSpacing: -0.8,
          }}
        >
          Du startest mit Komplexität.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 3 — TRANSFORMATION (0:12–0:18 = frames 720–1080)
// Apple-like morph into futuristic AI dashboard
// ══════════════════════════════════════════════════════════

const SceneTransformation: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dashboard morph-in
  const morphProgress = ease(f, 0, 60, 0, 1);

  // Agent nodes appearing
  const agents = [
    { name: "Orion", role: "CEO", color: C.purple, x: 0.3, y: 0.3 },
    { name: "Aura", role: "CMO", color: C.green, x: 0.7, y: 0.3 },
    { name: "Max", role: "CTO", color: C.cyan, x: 0.3, y: 0.6 },
    { name: "Vega", role: "CFO", color: C.orange, x: 0.7, y: 0.6 },
  ];

  // Connection lines
  const lineProgress = ease(f, 60, 80, 0, 1);

  // Voiceover
  const voOp = ease(f, 180, 30, 0, 1);
  const voY = ease(f, 180, 40, 25, 0);

  // Scene fade out
  const fadeOut = clamp(f, 330, 360, 1, 0);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, opacity: fadeOut }}>
      {/* Dashboard container — morphs in with scale + blur */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: 40,
          right: 40,
          bottom: "30%",
          borderRadius: 28,
          background: `linear-gradient(180deg, rgba(10,10,20,0.9) 0%, rgba(5,5,12,0.95) 100%)`,
          border: `1px solid rgba(255,255,255,${0.06 * morphProgress})`,
          transform: `scale(${interpolate(morphProgress, [0, 1], [0.92, 1])})`,
          opacity: morphProgress,
          overflow: "hidden",
        }}
      >
        {/* Ambient glow inside dashboard */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${C.glow} 0%, transparent 70%)`,
            opacity: morphProgress * 0.6,
          }}
        />

        {/* Connection lines between agents */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {agents.map((a, i) =>
            agents.slice(i + 1).map((b, j) => {
              const strokeDash = lineProgress * 1000;
              return (
                <line
                  key={`${i}-${j}`}
                  x1={`${a.x * 100}%`}
                  y1={`${a.y * 100}%`}
                  x2={`${b.x * 100}%`}
                  y2={`${b.y * 100}%`}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth={1}
                  strokeDasharray="1000"
                  strokeDashoffset={1000 - strokeDash}
                />
              );
            }),
          )}
        </svg>

        {/* Agent nodes */}
        {agents.map((agent, i) => {
          const nodeAppear = sp(f, fps, 30 + i * 25, GENTLE);
          const pulse = Math.sin((f - i * 15) * 0.06) * 0.15 + 0.85;
          return (
            <div
              key={agent.name}
              style={{
                position: "absolute",
                top: `${agent.y * 100}%`,
                left: `${agent.x * 100}%`,
                transform: `translate(-50%, -50%) scale(${nodeAppear})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              {/* Node circle */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: C.surface,
                  border: `2px solid ${agent.color}`,
                  boxShadow: `0 0 ${20 * pulse}px ${agent.color}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Status dot */}
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: agent.color,
                    opacity: pulse,
                  }}
                />
              </div>
              {/* Label */}
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 500,
                  color: C.text,
                  letterSpacing: -0.2,
                }}
              >
                {agent.name}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: C.muted,
                  letterSpacing: 0.5,
                }}
              >
                {agent.role}
              </span>
            </div>
          );
        })}

        {/* Auto-moving task pill */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: `translateX(${ease(f, 120, 120, -80, 80)}px)`,
            padding: "8px 18px",
            borderRadius: 100,
            background: C.surfaceLight,
            border: `1px solid rgba(255,255,255,0.08)`,
            opacity: clamp(f, 100, 130, 0, 1),
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 12,
              color: C.green,
              letterSpacing: 0.3,
            }}
          >
            ✓ Task auto-assigned
          </span>
        </div>
      </div>

      {/* Voiceover */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 40,
          right: 40,
          textAlign: "center",
          opacity: voOp,
          transform: `translateY(${voY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 300,
            color: C.text,
            letterSpacing: -0.8,
            lineHeight: 1.4,
          }}
        >
          Und dann… wird es einfacher.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 4 — AUTONOMY (0:18–0:28 = frames 1080–1680)
// Slow dolly-out, light shift cold→warm, dashboard runs alone
// ══════════════════════════════════════════════════════════

const SceneAutonomy: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Light temperature shift: cold → warm
  const warmth = ease(f, 0, 300, 0, 1);
  const bgColor = `rgb(${Math.round(warmth * 15)}, ${Math.round(warmth * 12)}, ${Math.round(warmth * 5)})`;

  // Slow zoom out (dolly-out)
  const zoom = interpolate(f, [0, 600], [1.08, 1], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dashboard status changes
  const statusItems = [
    { label: "Revenue Report", status: "Completed", delay: 60 },
    { label: "Social Campaign", status: "Running", delay: 120 },
    { label: "Investor Deck", status: "Auto-sent", delay: 200 },
    { label: "Support Tickets", status: "Resolved", delay: 280 },
    { label: "SEO Audit", status: "Scheduled", delay: 350 },
  ];

  // Voiceover
  const voOp = ease(f, 300, 30, 0, 1);
  const voY = ease(f, 300, 40, 25, 0);

  // Scene fade out
  const fadeOut = clamp(f, 560, 600, 1, 0);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        opacity: fadeOut,
        transform: `scale(${zoom})`,
      }}
    >
      {/* Warm ambient glow (appears as light shifts) */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,180,80,${0.06 * warmth}) 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Mini dashboard — top area */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: 50,
          right: 50,
          borderRadius: 20,
          background: C.surface,
          border: `1px solid rgba(255,255,255,0.05)`,
          padding: 24,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: 16,
              fontWeight: 600,
              color: C.text,
              letterSpacing: -0.3,
            }}
          >
            KaderOS Dashboard
          </span>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: C.green,
              boxShadow: `0 0 8px ${C.green}66`,
            }}
          />
        </div>

        {/* Status items — appearing one by one */}
        {statusItems.map((item, i) => {
          const itemOp = sp(f, fps, item.delay, SILK);
          const isActive = f > item.delay + 30;
          return (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderTop: i > 0 ? `1px solid rgba(255,255,255,0.04)` : "none",
                opacity: itemOp,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 14,
                  color: C.text,
                  fontWeight: 400,
                  letterSpacing: -0.2,
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: isActive ? C.green : C.muted,
                  letterSpacing: 0.3,
                  transition: "none", // Remotion: no CSS transitions
                }}
              >
                {isActive ? item.status : "Pending"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Person leaning back — abstract silhouette */}
      <div
        style={{
          position: "absolute",
          bottom: "28%",
          left: "50%",
          transform: `translateX(-50%) rotate(${ease(f, 0, 300, 0, -8)}deg)`,
          width: 120,
          height: 200,
          borderRadius: "40% 40% 30% 30%",
          background: `linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 80%)`,
          opacity: 0.4,
        }}
      />

      {/* Voiceover */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 40,
          right: 40,
          textAlign: "center",
          opacity: voOp,
          transform: `translateY(${voY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: 34,
            fontWeight: 300,
            color: C.text,
            letterSpacing: -0.6,
            lineHeight: 1.5,
          }}
        >
          Wenn Systeme beginnen,{"\n"}selbst zu denken.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5 — CLAIM (0:28–0:36 = frames 1680–2160)
// Push-in, direct camera look, confident statement
// ══════════════════════════════════════════════════════════

const SceneClaim: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow push-in
  const pushIn = interpolate(f, [0, 480], [1, 1.06], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 1: "Dann arbeitest du nicht mehr im System."
  const line1Op = ease(f, 60, 30, 0, 1);
  const line1Y = ease(f, 60, 40, 30, 0);

  // Pause, then line 2: "Das System arbeitet für dich."
  const line2Op = ease(f, 240, 30, 0, 1);
  const line2Y = ease(f, 240, 40, 30, 0);

  // Subtle underline draw on line 2
  const underline = ease(f, 300, 60, 0, 100);

  // Scene fade out
  const fadeOut = clamp(f, 450, 480, 1, 0);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        transform: `scale(${pushIn})`,
        opacity: fadeOut,
      }}
    >
      {/* Minimal background — just a subtle gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.02) 0%, transparent 60%)`,
        }}
      />

      {/* Text container — centered */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
          gap: 50,
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            opacity: line1Op,
            transform: `translateY(${line1Y}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: 42,
              fontWeight: 300,
              color: C.text,
              letterSpacing: -1,
              lineHeight: 1.3,
              textAlign: "center",
              display: "block",
            }}
          >
            Dann arbeitest du{"\n"}nicht mehr im System.
          </span>
        </div>

        {/* Line 2 — the power statement */}
        <div
          style={{
            opacity: line2Op,
            transform: `translateY(${line2Y}px)`,
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: 46,
              fontWeight: 600,
              color: C.white,
              letterSpacing: -1.2,
              textAlign: "center",
              display: "block",
            }}
          >
            Das System arbeitet{"\n"}für dich.
          </span>
          {/* Underline */}
          <div
            style={{
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: "translateX(-50%)",
              width: `${underline}%`,
              maxWidth: 300,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`,
              borderRadius: 1,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 6 — LOGO (0:36–0:40 = frames 2160–2400)
// Clean fade, logo, chime moment
// ══════════════════════════════════════════════════════════

const SceneLogo: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in from black/white
  const fadeIn = ease(f, 0, 40, 0, 1);

  // Logo scale — gentle pop
  const logoScale = sp(f, fps, 30, GENTLE);
  const logoS = interpolate(logoScale, [0, 1], [0.9, 1]);

  // Tagline
  const tagOp = ease(f, 80, 30, 0, 1);
  const tagY = ease(f, 80, 40, 20, 0);

  // URL
  const urlOp = ease(f, 120, 30, 0, 1);

  // Subtle glow behind logo
  const glowPulse = Math.sin(f * 0.04) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        opacity: fadeIn,
      }}
    >
      {/* Centered content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {/* Logo glow */}
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${C.glow} 0%, transparent 70%)`,
            opacity: glowPulse * 0.5,
            filter: "blur(40px)",
          }}
        />

        {/* Logo text */}
        <div style={{ transform: `scale(${logoS})` }}>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 64,
              fontWeight: 700,
              color: C.white,
              letterSpacing: -2,
            }}
          >
            Kader
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 64,
              fontWeight: 700,
              color: C.accent,
              letterSpacing: -2,
            }}
          >
            OS
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: tagOp,
            transform: `translateY(${tagY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 300,
              color: C.muted,
              letterSpacing: 0.5,
            }}
          >
            Dein nächster Mitarbeiter ist kein Mensch.
          </span>
        </div>

        {/* URL */}
        <div style={{ opacity: urlOp }}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 18,
              color: C.dim,
              letterSpacing: 1,
            }}
          >
            kaderos.io
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN COMPOSITION — 40s @ 60fps = 2400 frames
// ══════════════════════════════════════════════════════════

export const AppleStartup: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Scene 1: Solitude (0:00–0:06) */}
      <Sequence from={0} durationInFrames={360} premountFor={60}>
        <SceneSolitude />
      </Sequence>

      {/* Scene 2: Complexity (0:06–0:12) */}
      <Sequence from={360} durationInFrames={360} premountFor={60}>
        <SceneComplexity />
      </Sequence>

      {/* Scene 3: Transformation (0:12–0:18) */}
      <Sequence from={720} durationInFrames={360} premountFor={60}>
        <SceneTransformation />
      </Sequence>

      {/* Scene 4: Autonomy (0:18–0:28) */}
      <Sequence from={1080} durationInFrames={600} premountFor={60}>
        <SceneAutonomy />
      </Sequence>

      {/* Scene 5: Claim (0:28–0:36) */}
      <Sequence from={1680} durationInFrames={480} premountFor={60}>
        <SceneClaim />
      </Sequence>

      {/* Scene 6: Logo (0:36–0:40) */}
      <Sequence from={2160} durationInFrames={240} premountFor={60}>
        <SceneLogo />
      </Sequence>
    </AbsoluteFill>
  );
};
