import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// ============================================================
// T1_DASHBOARD — "Dashboard Showcase"
// 8 seconds @ 60fps = 480 frames | 1080x1920 vertical (TikTok)
// Style: @fraxbit — clean, minimal, one smooth animation
// ============================================================

const C = {
  primary: "#000088",
  cyan: "#0891B2",
  green: "#059669",
  orange: "#E67E22",
  purple: "#6C3AC8",
  text: "#1D1D1F",
  muted: "#86868B",
  bg: "#FFFFFF",
  dark: "#0A0A0F",
  border: "#E8E8EC",
  surface: "#F8F8FA",
};

const FONT = "Outfit, -apple-system, sans-serif";
const MONO = "JetBrains Mono, SF Mono, Menlo, monospace";

const SNAPPY = { mass: 0.6, stiffness: 120, damping: 18 };
const SMOOTH = { mass: 1, stiffness: 60, damping: 26 };
const BOUNCY = { mass: 0.8, stiffness: 100, damping: 12 };

const sp = (f: number, fps: number, d = 0, c = SMOOTH) =>
  spring({ frame: Math.max(0, f - d), fps, config: c });

// ────────────────────────────────────────────────────────────
// SCENE 1 — HOOK TEXT (frames 0-60)
// Word-by-word stamp on black
// ────────────────────────────────────────────────────────────

const SceneHook: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ["4 Agents.", "1 Dashboard.", "0 Employees."];
  const WORD_GAP = 14;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.dark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        {words.map((word, i) => {
          const delay = i * WORD_GAP;
          const wordSpring = sp(f, fps, delay + 5, BOUNCY);
          const scale = interpolate(wordSpring, [0, 1], [1.8, 1]);
          const opacity = interpolate(wordSpring, [0, 1], [0, 1]);
          const blur = interpolate(
            f,
            [delay + 5, delay + 15],
            [6, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                fontSize: 52,
                fontFamily: FONT,
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-1.5px",
                lineHeight: 1.3,
                transform: `scale(${scale})`,
                opacity,
                filter: `blur(${blur}px)`,
                textAlign: "center",
              }}
            >
              {word}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ────────────────────────────────────────────────────────────
// SCENE 2 — DASHBOARD REVEAL (frames 60-300)
// Black fades to white, 2x2 agent card grid with 3D entrance
// ────────────────────────────────────────────────────────────

interface AgentCard {
  name: string;
  role: string;
  color: string;
  status: string;
}

const agents: AgentCard[] = [
  { name: "Max", role: "CTO", color: C.cyan, status: "3 commits pushed" },
  { name: "Aura", role: "CMO", color: C.green, status: "Campaign live" },
  { name: "Vega", role: "CFO", color: C.orange, status: "Budget: CHF 42/50" },
  { name: "Orion", role: "CEO", color: C.purple, status: "Strategy updated" },
];

const SceneDashboard: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background transition: dark to white
  const bgFade = interpolate(f, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Grid container 3D perspective entrance
  const gridSpring = sp(f, fps, 20, SMOOTH);
  const gridRotateX = interpolate(gridSpring, [0, 1], [25, 0]);
  const gridY = interpolate(gridSpring, [0, 1], [200, 0]);
  const gridOpacity = interpolate(gridSpring, [0, 1], [0, 1]);

  const CARD_W = 420;
  const CARD_H = 200;
  const GAP = 24;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `rgb(${interpolate(bgFade, [0, 1], [10, 255])}, ${interpolate(bgFade, [0, 1], [10, 255])}, ${interpolate(bgFade, [0, 1], [15, 255])})`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Dashboard header */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(f, [30, 55], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${interpolate(
            sp(f, fps, 30, SMOOTH),
            [0, 1],
            [20, 0]
          )}px)`,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontFamily: MONO,
            fontWeight: 500,
            color: C.muted,
            letterSpacing: "3px",
            textTransform: "uppercase" as const,
          }}
        >
          KaderOS Dashboard
        </div>
        <div
          style={{
            fontSize: 40,
            fontFamily: FONT,
            fontWeight: 800,
            color: C.text,
            marginTop: 12,
            letterSpacing: "-1.5px",
          }}
        >
          Your AI Workforce
        </div>
      </div>

      {/* Card grid with perspective */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: CARD_W * 2 + GAP,
          gap: GAP,
          justifyContent: "center",
          marginTop: 120,
          perspective: "1200px",
          transform: `perspective(1200px) rotateX(${gridRotateX}deg) translateY(${gridY}px)`,
          opacity: gridOpacity,
        }}
      >
        {agents.map((agent, i) => {
          const STAGGER = 40;
          const cardDelay = 40 + i * STAGGER;
          const cardSpring = sp(f, fps, cardDelay, SNAPPY);
          const cardY = interpolate(cardSpring, [0, 1], [80, 0]);
          const cardOp = interpolate(cardSpring, [0, 1], [0, 1]);
          const cardScale = interpolate(cardSpring, [0, 1], [0.9, 1]);

          // Pulsing status dot
          const pulse =
            0.4 + Math.sin((f + i * 20) / 15) * 0.3;

          return (
            <div
              key={i}
              style={{
                width: CARD_W,
                height: CARD_H,
                backgroundColor: C.bg,
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                padding: 24,
                boxShadow: `0 2px 16px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)`,
                transform: `translateY(${cardY}px) scale(${cardScale})`,
                opacity: cardOp,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Accent line at top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: agent.color,
                  borderRadius: "16px 16px 0 0",
                }}
              />

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Status dot */}
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: agent.color,
                    boxShadow: `0 0 ${8 + pulse * 6}px ${agent.color}${Math.round(pulse * 99)
                      .toString()
                      .padStart(2, "0")}`,
                  }}
                />
                <div
                  style={{
                    fontSize: 22,
                    fontFamily: FONT,
                    fontWeight: 700,
                    color: C.text,
                  }}
                >
                  {agent.name}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontFamily: MONO,
                    fontWeight: 500,
                    color: agent.color,
                    backgroundColor: `${agent.color}10`,
                    padding: "3px 10px",
                    borderRadius: 8,
                  }}
                >
                  {agent.role}
                </div>
              </div>

              <div
                style={{
                  fontSize: 16,
                  fontFamily: MONO,
                  fontWeight: 400,
                  color: C.muted,
                  marginTop: 8,
                }}
              >
                {agent.status}
              </div>

              {/* Activity bar */}
              <div
                style={{
                  height: 4,
                  backgroundColor: `${agent.color}15`,
                  borderRadius: 2,
                  overflow: "hidden",
                  marginTop: 12,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${interpolate(
                      sp(f, fps, cardDelay + 30, SMOOTH),
                      [0, 1],
                      [0, 60 + i * 10]
                    )}%`,
                    backgroundColor: agent.color,
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ────────────────────────────────────────────────────────────
// SCENE 3 — ZOOM HIGHLIGHT (frames 300-400)
// Smooth zoom into grid, glow behind cards
// ────────────────────────────────────────────────────────────

const SceneZoom: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoomSpring = sp(f, fps, 0, { mass: 1.2, stiffness: 40, damping: 30 });
  const scale = interpolate(zoomSpring, [0, 1], [1, 1.08]);

  // Glow intensity builds
  const glowOp = interpolate(f, [0, 60], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const CARD_W = 420;
  const CARD_H = 200;
  const GAP = 24;

  // Status text cycling animation
  const statusCycle = Math.floor(f / 30);

  const agentUpdates: AgentCard[] = [
    {
      name: "Max",
      role: "CTO",
      color: C.cyan,
      status: statusCycle % 2 === 0 ? "3 commits pushed" : "4 commits pushed",
    },
    {
      name: "Aura",
      role: "CMO",
      color: C.green,
      status: statusCycle % 2 === 0 ? "Campaign live" : "2.4k impressions",
    },
    {
      name: "Vega",
      role: "CFO",
      color: C.orange,
      status: statusCycle % 2 === 0 ? "Budget: CHF 42/50" : "Budget: CHF 43/50",
    },
    {
      name: "Orion",
      role: "CEO",
      color: C.purple,
      status:
        statusCycle % 2 === 0 ? "Strategy updated" : "Q2 plan reviewed",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${scale})`,
      }}
    >
      {/* Glow behind cards */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 500,
          borderRadius: 40,
          background: `radial-gradient(ellipse, ${C.primary}${Math.round(glowOp * 255)
            .toString(16)
            .padStart(2, "0")} 0%, transparent 70%)`,
          left: "50%",
          top: "55%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Dashboard header */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontFamily: MONO,
            fontWeight: 500,
            color: C.muted,
            letterSpacing: "3px",
            textTransform: "uppercase" as const,
          }}
        >
          KaderOS Dashboard
        </div>
        <div
          style={{
            fontSize: 40,
            fontFamily: FONT,
            fontWeight: 800,
            color: C.text,
            marginTop: 12,
            letterSpacing: "-1.5px",
          }}
        >
          Your AI Workforce
        </div>
      </div>

      {/* Card grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: CARD_W * 2 + GAP,
          gap: GAP,
          justifyContent: "center",
          marginTop: 120,
        }}
      >
        {agentUpdates.map((agent, i) => {
          const pulse = 0.4 + Math.sin((f + i * 20) / 15) * 0.3;

          return (
            <div
              key={i}
              style={{
                width: CARD_W,
                height: CARD_H,
                backgroundColor: C.bg,
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                padding: 24,
                boxShadow: `0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: agent.color,
                  borderRadius: "16px 16px 0 0",
                }}
              />

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: agent.color,
                    boxShadow: `0 0 ${8 + pulse * 6}px ${agent.color}${Math.round(pulse * 99)
                      .toString()
                      .padStart(2, "0")}`,
                  }}
                />
                <div
                  style={{
                    fontSize: 22,
                    fontFamily: FONT,
                    fontWeight: 700,
                    color: C.text,
                  }}
                >
                  {agent.name}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontFamily: MONO,
                    fontWeight: 500,
                    color: agent.color,
                    backgroundColor: `${agent.color}10`,
                    padding: "3px 10px",
                    borderRadius: 8,
                  }}
                >
                  {agent.role}
                </div>
              </div>

              <div
                style={{
                  fontSize: 16,
                  fontFamily: MONO,
                  fontWeight: 400,
                  color: C.muted,
                  marginTop: 8,
                }}
              >
                {agent.status}
              </div>

              {/* Activity bar */}
              <div
                style={{
                  height: 4,
                  backgroundColor: `${agent.color}15`,
                  borderRadius: 2,
                  overflow: "hidden",
                  marginTop: 12,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${65 + i * 8 + Math.sin(f / 20 + i) * 3}%`,
                    backgroundColor: agent.color,
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ────────────────────────────────────────────────────────────
// SCENE 4 — CTA (frames 400-480)
// Logo drop + kaderos.io + subtle pulse
// ────────────────────────────────────────────────────────────

const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade scene in
  const sceneIn = interpolate(f, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dashboard fades back
  const dashOp = interpolate(f, [0, 25], [1, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo drops in
  const logoDrop = sp(f, fps, 8, { mass: 1.5, stiffness: 80, damping: 22 });
  const logoY = interpolate(logoDrop, [0, 1], [-80, 0]);
  const logoOp = interpolate(logoDrop, [0, 1], [0, 1]);
  const logoScale = interpolate(logoDrop, [0, 1], [0.6, 1]);

  // URL
  const urlSpring = sp(f, fps, 25, SNAPPY);
  const urlOp = interpolate(urlSpring, [0, 1], [0, 1]);
  const urlY = interpolate(urlSpring, [0, 1], [15, 0]);

  // Pulse on logo
  const pulse = f > 30 ? 1 + Math.sin((f - 30) / 10) * 0.025 : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Faded dashboard ghost behind */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: dashOp,
          filter: "blur(3px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 864,
            height: 424,
            marginTop: 120,
            borderRadius: 20,
            backgroundColor: C.surface,
            border: `1px solid ${C.border}`,
          }}
        />
      </div>

      {/* Center content */}
      <div
        style={{
          textAlign: "center",
          opacity: sceneIn,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            backgroundColor: C.primary,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: logoOp,
            transform: `translateY(${logoY}px) scale(${logoScale * pulse})`,
            boxShadow: `0 16px 48px ${C.primary}35`,
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 42,
              fontFamily: FONT,
              fontWeight: 800,
            }}
          >
            K
          </span>
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 32,
            fontFamily: FONT,
            fontWeight: 700,
            color: C.text,
            marginTop: 28,
            opacity: urlOp,
            transform: `translateY(${urlY}px)`,
            letterSpacing: "-0.5px",
          }}
        >
          kaderos.io
        </div>

        {/* Subtle tagline */}
        <div
          style={{
            fontSize: 18,
            fontFamily: FONT,
            fontWeight: 500,
            color: C.muted,
            marginTop: 10,
            opacity: urlOp * 0.7,
            transform: `translateY(${urlY}px)`,
          }}
        >
          Dein nächster Mitarbeiter ist kein Mensch.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// MAIN COMPOSITION
// ============================================================

export const T1_Dashboard: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Sequence from={0} durationInFrames={60} premountFor={10}>
        <SceneHook />
      </Sequence>
      <Sequence from={60} durationInFrames={240} premountFor={20}>
        <SceneDashboard />
      </Sequence>
      <Sequence from={300} durationInFrames={100} premountFor={20}>
        <SceneZoom />
      </Sequence>
      <Sequence from={400} durationInFrames={80} premountFor={20}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
