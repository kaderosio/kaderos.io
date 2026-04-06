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
// V2 KADER PUNCH — "Ich hab 4 Mitarbeiter. Keiner ist ein Mensch."
// 15 seconds @ 30fps = 450 frames
// 1080×1920 vertical — TikTok optimized
// Style: kaderos.io — white bg, #000088, Outfit, Apple-clean
// ══════════════════════════════════════════════════════════

const C = {
  primary: "#000088",
  cyan: "#0891B2",
  green: "#059669",
  orange: "#E67E22",
  purple: "#6C3AC8",
  red: "#DC2626",
  text: "#0A0A0F",
  muted: "#6B7280",
  dim: "#9CA3AF",
  bg: "#FFFFFF",
  surface: "#F4F4F8",
  border: "#E5E7EB",
  glow: "rgba(0,0,136,0.06)",
};

const FONT = "Outfit, -apple-system, system-ui, sans-serif";
const MONO = "JetBrains Mono, SF Mono, Menlo, monospace";

// Social media safe zones
const safeZone = (w: number, h: number) => ({
  top: h * 0.12,
  bottom: h * 0.15,
  sides: w * 0.06,
});

// Responsive text
const sz = (w: number, pct: number, min: number) =>
  Math.max(min, Math.round(w * pct));

// ──────────────────────────────────────────────────────────
// SCENE 1: HOOK (0-90 frames / 3s)
// Word-by-word stamp: "Ich hab 4 Mitarbeiter."
// ──────────────────────────────────────────────────────────

const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const safe = safeZone(width, height);

  const words = ["Ich", "hab", "4", "Mitarbeiter."];
  const STAMP_INTERVAL = 8;

  // Ambient floating gradient
  const gradX = Math.sin(frame / 40) * 30;
  const gradY = Math.cos(frame / 50) * 20;

  // Exit
  const exitProgress = interpolate(frame, [75, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitY = exitProgress * -60;
  const exitOp = 1 - exitProgress;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.glow} 0%, transparent 70%)`,
          left: "50%",
          top: "40%",
          transform: `translate(calc(-50% + ${gradX}px), calc(-50% + ${gradY}px))`,
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: safe.sides,
          paddingRight: safe.sides,
          transform: `translateY(${exitY}px)`,
          opacity: exitOp,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 14,
            maxWidth: 900,
          }}
        >
          {words.map((word, i) => {
            const delay = 5 + i * STAMP_INTERVAL;
            const s = spring({
              frame: frame - delay,
              fps,
              config: { damping: 12, stiffness: 200 },
            });
            const scale = interpolate(s, [0, 1], [1.6, 1]);
            const opacity = s;
            const blur = interpolate(s, [0, 0.5], [8, 0], {
              extrapolateRight: "clamp",
            });

            const isNumber = word === "4";
            return (
              <span
                key={i}
                style={{
                  fontSize: isNumber ? sz(width, 0.14, 80) : sz(width, 0.09, 52),
                  fontFamily: FONT,
                  fontWeight: isNumber ? 900 : 800,
                  color: isNumber ? C.primary : C.text,
                  letterSpacing: -2,
                  lineHeight: 1.0,
                  transform: `scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  display: "inline-block",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 2: REVEAL (90-180 frames / 3s)
// Typewriter: "Keiner davon ist ein Mensch."
// + highlight on "Mensch"
// ──────────────────────────────────────────────────────────

const SceneReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const safe = safeZone(width, height);

  const FULL_TEXT = "Keiner davon ist ein Mensch.";
  const HIGHLIGHT_WORD = "Mensch";
  const CHAR_FRAMES = 2;
  const CURSOR_BLINK_FRAMES = 16;

  const fontSize = sz(width, 0.075, 48);

  // Entrance
  const entrance = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140 },
  });
  const containerOp = interpolate(entrance, [0, 1], [0, 1]);
  const containerX = interpolate(entrance, [0, 1], [20, 0]);

  // Typewriter
  const typedChars = Math.min(
    FULL_TEXT.length,
    Math.floor(frame / CHAR_FRAMES)
  );
  const typedText = FULL_TEXT.slice(0, typedChars);
  const typingDone = typedChars >= FULL_TEXT.length;

  // Cursor blink
  const caretOpacity = interpolate(
    frame % CURSOR_BLINK_FRAMES,
    [0, CURSOR_BLINK_FRAMES / 2, CURSOR_BLINK_FRAMES],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Highlight
  const typeEndFrame = FULL_TEXT.length * CHAR_FRAMES;
  const highlightStart = typeEndFrame + 8;
  const hlIdx = FULL_TEXT.indexOf(HIGHLIGHT_WORD);
  const preText = FULL_TEXT.slice(0, hlIdx);
  const postText = FULL_TEXT.slice(hlIdx + HIGHLIGHT_WORD.length);

  const hlProgress = spring({
    frame: frame - highlightStart,
    fps,
    config: { damping: 22, stiffness: 180 },
  });
  const hlScaleX = interpolate(hlProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showFinal = frame >= highlightStart;

  // Exit
  const exitOp = interpolate(frame, [78, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: safe.sides,
        paddingRight: safe.sides,
      }}
    >
      <div
        style={{
          position: "relative",
          opacity: containerOp * exitOp,
          transform: `translateX(${containerX}px)`,
          textAlign: "center",
        }}
      >
        {/* Typewriter layer */}
        <div
          style={{
            fontSize,
            fontFamily: FONT,
            fontWeight: 800,
            color: C.text,
            letterSpacing: -1,
            lineHeight: 1.2,
            whiteSpace: "pre-wrap",
            opacity: showFinal ? 0 : 1,
          }}
        >
          <span>{typedText}</span>
          {!typingDone && (
            <span
              style={{
                opacity: caretOpacity,
                color: C.primary,
              }}
            >
              {"\u258C"}
            </span>
          )}
        </div>

        {/* Highlighted layer */}
        {showFinal && (
          <div
            style={{
              fontSize,
              fontFamily: FONT,
              fontWeight: 800,
              color: C.text,
              letterSpacing: -1,
              lineHeight: 1.2,
              whiteSpace: "pre-wrap",
            }}
          >
            <span>{preText}</span>
            <span style={{ position: "relative", display: "inline-block" }}>
              <span
                style={{
                  position: "absolute",
                  left: "-0.12em",
                  right: "-0.12em",
                  top: "50%",
                  height: "1.1em",
                  transform: `translateY(-50%) scaleX(${hlScaleX})`,
                  transformOrigin: "left center",
                  backgroundColor: `${C.primary}15`,
                  borderRadius: 8,
                  border: `2px solid ${C.primary}40`,
                }}
              />
              <span
                style={{
                  position: "relative",
                  color: C.primary,
                }}
              >
                {HIGHLIGHT_WORD}
              </span>
            </span>
            <span>{postText}</span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 3: AGENTS (180-330 frames / 5s)
// 4 Agent cards slide in staggered
// ──────────────────────────────────────────────────────────

const SceneAgents: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const safe = safeZone(width, height);

  const agents = [
    { name: "Max", role: "CTO", color: C.cyan, status: "3 Commits gepusht", icon: "M" },
    { name: "Aura", role: "CMO", color: C.green, status: "Campaign live", icon: "A" },
    { name: "Vega", role: "CFO", color: C.orange, status: "Budget: CHF 42/50", icon: "V" },
    { name: "Orion", role: "CEO", color: C.purple, status: "Strategie updated", icon: "O" },
  ];

  // Title
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  // Price reveal at end
  const priceDelay = 110;
  const priceSpring = spring({
    frame: frame - priceDelay,
    fps,
    config: { damping: 10, stiffness: 150 },
  });
  const priceScale = interpolate(priceSpring, [0, 1], [2, 1]);
  const priceOp = priceSpring;

  // Exit
  const exitOp = interpolate(frame, [135, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        paddingTop: safe.top,
        paddingBottom: safe.bottom,
        paddingLeft: safe.sides,
        paddingRight: safe.sides,
        opacity: exitOp,
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
        }}
      >
        <span
          style={{
            fontSize: sz(width, 0.04, 24),
            fontFamily: FONT,
            fontWeight: 600,
            color: C.muted,
            textTransform: "uppercase" as const,
            letterSpacing: 3,
          }}
        >
          Dein AI-Kader
        </span>
      </div>

      {/* Agent cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {agents.map((agent, i) => {
          const delay = 15 + i * 18;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 180 },
          });
          const cardOp = cardSpring;
          const cardX = interpolate(cardSpring, [0, 1], [60, 0]);

          // Status dot pulse
          const pulse = 0.4 + Math.sin((frame + i * 20) * 0.12) * 0.6;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "22px 28px",
                backgroundColor: C.surface,
                borderRadius: 20,
                border: `1px solid ${C.border}`,
                opacity: cardOp,
                transform: `translateX(${cardX}px)`,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  backgroundColor: agent.color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    color: "#FFF",
                    fontSize: 22,
                    fontFamily: FONT,
                    fontWeight: 800,
                  }}
                >
                  {agent.icon}
                </span>
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: sz(width, 0.04, 22),
                      fontFamily: FONT,
                      fontWeight: 700,
                      color: C.text,
                    }}
                  >
                    {agent.name}
                  </span>
                  <span
                    style={{
                      fontSize: sz(width, 0.028, 16),
                      fontFamily: MONO,
                      fontWeight: 500,
                      color: agent.color,
                    }}
                  >
                    {agent.role}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      backgroundColor: C.green,
                      opacity: pulse,
                    }}
                  />
                  <span
                    style={{
                      fontSize: sz(width, 0.025, 15),
                      fontFamily: MONO,
                      color: C.muted,
                    }}
                  >
                    {agent.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price tag */}
      <div
        style={{
          textAlign: "center",
          marginTop: 40,
          opacity: priceOp,
          transform: `scale(${priceScale})`,
        }}
      >
        <span
          style={{
            fontSize: sz(width, 0.12, 64),
            fontFamily: FONT,
            fontWeight: 900,
            color: C.primary,
            letterSpacing: -3,
          }}
        >
          CHF 49
        </span>
        <span
          style={{
            fontSize: sz(width, 0.035, 20),
            fontFamily: FONT,
            fontWeight: 500,
            color: C.muted,
            marginLeft: 8,
          }}
        >
          /Monat
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 4: CTA (330-450 frames / 4s)
// KaderOS logo + kaderos.io + tagline
// ──────────────────────────────────────────────────────────

const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const safe = safeZone(width, height);

  // Logo
  const logoDrop = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 80, mass: 2 },
  });
  const logoY = interpolate(logoDrop, [0, 1], [-50, 0]);

  // Name
  const nameSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  // Tagline
  const tagSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 22, stiffness: 140 },
  });
  const tagY = interpolate(tagSpring, [0, 1], [15, 0]);

  // Button
  const btnSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 14, stiffness: 180 },
  });
  const pulse = Math.sin(frame * 0.08) * 0.02 + 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: safe.sides,
        paddingRight: safe.sides,
      }}
    >
      {/* Subtle gradient orb */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.glow} 0%, transparent 60%)`,
          left: "50%",
          top: "42%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div style={{ textAlign: "center" }}>
        {/* Logo */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            backgroundColor: C.primary,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 28px",
            opacity: logoDrop,
            transform: `translateY(${logoY}px)`,
            boxShadow: `0 12px 40px ${C.primary}25`,
          }}
        >
          <span
            style={{
              color: "#FFF",
              fontSize: 34,
              fontFamily: FONT,
              fontWeight: 800,
            }}
          >
            K
          </span>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: sz(width, 0.1, 56),
            fontFamily: FONT,
            fontWeight: 900,
            color: C.text,
            letterSpacing: -3,
            opacity: nameSpring,
            transform: `scale(${interpolate(nameSpring, [0, 1], [0.9, 1])})`,
          }}
        >
          KaderOS
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: sz(width, 0.04, 24),
            fontFamily: FONT,
            fontWeight: 500,
            color: C.muted,
            marginTop: 12,
            lineHeight: 1.4,
            opacity: tagSpring,
            transform: `translateY(${tagY}px)`,
          }}
        >
          Dein nächster Mitarbeiter ist kein Mensch.
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 44,
            display: "inline-block",
            opacity: btnSpring,
            transform: `scale(${pulse * interpolate(btnSpring, [0, 1], [0.8, 1])})`,
          }}
        >
          <div
            style={{
              padding: "18px 52px",
              backgroundColor: C.primary,
              borderRadius: 14,
              boxShadow: `0 8px 32px ${C.primary}30`,
            }}
          >
            <span
              style={{
                color: "#FFF",
                fontSize: sz(width, 0.045, 26),
                fontFamily: FONT,
                fontWeight: 700,
              }}
            >
              kaderos.io
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN COMPOSITION — 15s @ 30fps = 450 frames
// ══════════════════════════════════════════════════════════

export const V2_KaderPunch: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Sequence from={0} durationInFrames={90}>
        <SceneHook />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <SceneReveal />
      </Sequence>
      <Sequence from={180} durationInFrames={150}>
        <SceneAgents />
      </Sequence>
      <Sequence from={330} durationInFrames={120}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
