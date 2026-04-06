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
// SCRIPT RENDERER — Renders videos from JSON scripts
// Reads props: hook, punchNumber, counterHook, counterNumber, etc.
// Style: kaderos.io — white bg, #000088, V2 quality
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
  bg: "#FFFFFF",
  surface: "#F4F4F8",
  border: "#E5E7EB",
  glow: "rgba(0,0,136,0.06)",
};

const FONT = "Outfit, -apple-system, system-ui, sans-serif";
const MONO = "JetBrains Mono, SF Mono, Menlo, monospace";

const sz = (w: number, pct: number, min: number) =>
  Math.max(min, Math.round(w * pct));

const safeZone = (w: number, h: number) => ({
  top: h * 0.12,
  bottom: h * 0.15,
  sides: w * 0.06,
});

// ── PROPS ────────────────────────────────────────────────

export type ScriptProps = {
  hook: string;
  punchNumber: string;
  punchColor: string;
  counterHook: string;
  counterNumber: string;
  counterColor: string;
  suffix: string;
  badge: string;
};

const defaults: ScriptProps = {
  hook: "Was kostet ein 4-Personen C-Level Team?",
  punchNumber: "CHF 588'000",
  punchColor: "#DC2626",
  counterHook: "Was kostet das gleiche bei KaderOS?",
  counterNumber: "CHF 49",
  counterColor: "#059669",
  suffix: "/Monat",
  badge: "999× günstiger",
};

// ── SCENE 1: HOOK QUESTION (0-90 / 3s) ──────────────────

const SceneQuestion: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const safe = safeZone(width, height);

  // Word-by-word reveal
  const words = text.split(" ");
  const WORD_DELAY = 6;

  const gradX = Math.sin(frame / 40) * 25;
  const gradY = Math.cos(frame / 50) * 15;

  const exitOp = interpolate(frame, [75, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitY = interpolate(frame, [75, 90], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.glow} 0%, transparent 70%)`,
          left: "50%",
          top: "45%",
          transform: `translate(calc(-50% + ${gradX}px), calc(-50% + ${gradY}px))`,
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: `${safe.top}px ${safe.sides}px ${safe.bottom}px`,
          transform: `translateY(${exitY}px)`,
          opacity: exitOp,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
            maxWidth: 850,
          }}
        >
          {words.map((word, i) => {
            const delay = 8 + i * WORD_DELAY;
            const s = spring({
              frame: frame - delay,
              fps,
              config: { damping: 14, stiffness: 180 },
            });
            const blur = interpolate(s, [0, 0.5], [6, 0], {
              extrapolateRight: "clamp",
            });
            return (
              <span
                key={i}
                style={{
                  fontSize: sz(width, 0.065, 38),
                  fontFamily: FONT,
                  fontWeight: 700,
                  color: C.muted,
                  letterSpacing: -1,
                  opacity: s,
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

// ── SCENE 2: NUMBER SLAM (90-195 / 3.5s) ────────────────

const SceneSlam: React.FC<{
  number: string;
  color: string;
  questionAbove: string;
}> = ({ number, color, questionAbove }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const safe = safeZone(width, height);

  // Question stays small on top
  const qSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  // Number SLAMS in
  const slamDelay = 25;
  const slamSpring = spring({
    frame: frame - slamDelay,
    fps,
    config: { damping: 10, stiffness: 80, mass: 3 },
  });
  const numberScale = interpolate(slamSpring, [0, 1], [3.5, 1]);
  const numberOp = slamSpring;

  // Shockwave
  const ringProgress = interpolate(frame, [slamDelay, slamDelay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringScale = interpolate(ringProgress, [0, 1], [0.3, 2.8]);
  const ringOp = interpolate(ringProgress, [0, 1], [0.5, 0]);

  // Screen shake
  const shakeActive = frame >= slamDelay && frame < slamDelay + 8;
  const shakeX = shakeActive
    ? Math.sin(frame * 17.3) * 4
    : 0;
  const shakeY = shakeActive
    ? Math.cos(frame * 13.7) * 3
    : 0;

  // Exit
  const exitOp = interpolate(frame, [90, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: `${safe.top}px ${safe.sides}px ${safe.bottom}px`,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        opacity: exitOp,
      }}
    >
      {/* Question above */}
      <div
        style={{
          fontSize: sz(width, 0.035, 20),
          fontFamily: FONT,
          fontWeight: 500,
          color: C.muted,
          marginBottom: 30,
          opacity: qSpring,
          textAlign: "center",
        }}
      >
        {questionAbove}
      </div>

      {/* Number */}
      <div style={{ position: "relative" }}>
        {/* Shockwave ring */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: `3px solid ${color}`,
            transform: `translate(-50%, -50%) scale(${ringScale})`,
            opacity: ringOp,
          }}
        />
        <div
          style={{
            fontSize: sz(width, 0.16, 90),
            fontFamily: FONT,
            fontWeight: 900,
            color,
            letterSpacing: -4,
            transform: `scale(${numberScale})`,
            opacity: numberOp,
            textShadow: `0 6px 30px ${color}20`,
            textAlign: "center",
          }}
        >
          {number}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 3: COMPARISON (195-330 / 4.5s) ────────────────

const SceneCompare: React.FC<{
  topNumber: string;
  topColor: string;
  bottomNumber: string;
  bottomColor: string;
  suffix: string;
  badge: string;
}> = ({ topNumber, topColor, bottomNumber, bottomColor, suffix, badge }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const safe = safeZone(width, height);

  // Top number (crossed out)
  const topSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  // Strikethrough animation
  const strikeWidth = interpolate(frame, [20, 40], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom number slams in
  const bottomDelay = 30;
  const bottomSpring = spring({
    frame: frame - bottomDelay,
    fps,
    config: { damping: 10, stiffness: 80, mass: 3 },
  });
  const bottomScale = interpolate(bottomSpring, [0, 1], [2.5, 1]);

  // Suffix
  const suffixSpring = spring({
    frame: frame - bottomDelay - 15,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  // Badge
  const badgeDelay = 75;
  const badgeSpring = spring({
    frame: frame - badgeDelay,
    fps,
    config: { damping: 8, stiffness: 150 },
  });

  // Exit
  const exitOp = interpolate(frame, [120, 135], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: `${safe.top}px ${safe.sides}px ${safe.bottom}px`,
        opacity: exitOp,
      }}
    >
      {/* Top: old price with strikethrough */}
      <div
        style={{
          position: "relative",
          marginBottom: 20,
          opacity: topSpring,
        }}
      >
        <span
          style={{
            fontSize: sz(width, 0.07, 42),
            fontFamily: FONT,
            fontWeight: 700,
            color: `${topColor}80`,
          }}
        >
          {topNumber}
        </span>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            height: 4,
            width: `${strikeWidth}%`,
            backgroundColor: topColor,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Bottom: new price */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: sz(width, 0.18, 100),
            fontFamily: FONT,
            fontWeight: 900,
            color: bottomColor,
            letterSpacing: -5,
            transform: `scale(${bottomScale})`,
            opacity: bottomSpring,
            textShadow: `0 8px 40px ${bottomColor}20`,
          }}
        >
          {bottomNumber}
        </div>
        {suffix && (
          <div
            style={{
              fontSize: sz(width, 0.04, 24),
              fontFamily: FONT,
              fontWeight: 500,
              color: C.muted,
              marginTop: -5,
              opacity: suffixSpring,
            }}
          >
            {suffix}
          </div>
        )}
      </div>

      {/* Badge */}
      <div
        style={{
          marginTop: 40,
          opacity: badgeSpring,
          transform: `scale(${interpolate(badgeSpring, [0, 1], [0.5, 1])})`,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "12px 30px",
            borderRadius: 50,
            backgroundColor: `${bottomColor}10`,
            border: `2px solid ${bottomColor}30`,
            fontSize: sz(width, 0.04, 22),
            fontFamily: FONT,
            fontWeight: 700,
            color: bottomColor,
          }}
        >
          {badge}
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 4: CTA (330-420 / 3s) ─────────────────────────

const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const safe = safeZone(width, height);

  const logoDrop = spring({
    frame: frame - 5,
    fps,
    config: { damping: 15, stiffness: 80, mass: 2 },
  });
  const logoY = interpolate(logoDrop, [0, 1], [-40, 0]);

  const nameSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const tagSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 22, stiffness: 140 },
  });

  const btnSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 14, stiffness: 180 },
  });
  const pulse = Math.sin(frame * 0.1) * 0.02 + 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: `${safe.top}px ${safe.sides}px ${safe.bottom}px`,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.glow} 0%, transparent 60%)`,
          left: "50%",
          top: "42%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            backgroundColor: C.primary,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 24px",
            opacity: logoDrop,
            transform: `translateY(${logoY}px)`,
            boxShadow: `0 10px 36px ${C.primary}25`,
          }}
        >
          <span style={{ color: "#FFF", fontSize: 30, fontFamily: FONT, fontWeight: 800 }}>K</span>
        </div>

        <div
          style={{
            fontSize: sz(width, 0.09, 50),
            fontFamily: FONT,
            fontWeight: 900,
            color: C.text,
            letterSpacing: -3,
            opacity: nameSpring,
          }}
        >
          KaderOS
        </div>

        <div
          style={{
            fontSize: sz(width, 0.035, 21),
            fontFamily: FONT,
            fontWeight: 500,
            color: C.muted,
            marginTop: 10,
            opacity: tagSpring,
            transform: `translateY(${interpolate(tagSpring, [0, 1], [12, 0])}px)`,
          }}
        >
          Dein nächster Mitarbeiter ist kein Mensch.
        </div>

        <div
          style={{
            marginTop: 36,
            display: "inline-block",
            opacity: btnSpring,
            transform: `scale(${pulse * interpolate(btnSpring, [0, 1], [0.8, 1])})`,
          }}
        >
          <div
            style={{
              padding: "16px 46px",
              backgroundColor: C.primary,
              borderRadius: 14,
              boxShadow: `0 8px 28px ${C.primary}30`,
            }}
          >
            <span style={{ color: "#FFF", fontSize: sz(width, 0.04, 24), fontFamily: FONT, fontWeight: 700 }}>
              kaderos.io
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN — 14s @ 30fps = 420 frames
// ══════════════════════════════════════════════════════════

export const ScriptRenderer: React.FC<Partial<ScriptProps>> = (inputProps) => {
  const props = { ...defaults, ...inputProps };

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Sequence from={0} durationInFrames={90}>
        <SceneQuestion text={props.hook} />
      </Sequence>
      <Sequence from={90} durationInFrames={105}>
        <SceneSlam
          number={props.punchNumber}
          color={props.punchColor}
          questionAbove={props.hook}
        />
      </Sequence>
      <Sequence from={195} durationInFrames={135}>
        <SceneCompare
          topNumber={props.punchNumber}
          topColor={props.punchColor}
          bottomNumber={props.counterNumber}
          bottomColor={props.counterColor}
          suffix={props.suffix}
          badge={props.badge}
        />
      </Sequence>
      <Sequence from={330} durationInFrames={90}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
