import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// ================================================================
// T2 — "Zahlen-Punch"
// Ultra-dramatic number reveal — price comparison shock content
// 10 seconds @ 60fps = 600 frames
// Format: 1080x1920 (vertical / TikTok)
// ================================================================

const C = {
  primary: "#000088",
  cyan: "#0891B2",
  green: "#059669",
  red: "#DC2626",
  text: "#1D1D1F",
  muted: "#86868B",
  bg: "#FFFFFF",
};

const FONT = "Outfit, -apple-system, sans-serif";

const SNAPPY = { mass: 0.6, stiffness: 120, damping: 18 };
const SMOOTH = { mass: 1, stiffness: 60, damping: 26 };
const HEAVY = { mass: 2, stiffness: 50, damping: 30 };
const BOUNCY = { mass: 0.8, stiffness: 100, damping: 12 };
const SLAM = { mass: 3, stiffness: 80, damping: 22 };

const sp = (f: number, fps: number, d = 0, c = SMOOTH) =>
  spring({ frame: Math.max(0, f - d), fps, config: c });

const fade = (f: number, s = 0, d = 25) =>
  interpolate(f, [s, s + d], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const fadeOut = (f: number, s: number, d = 20) =>
  interpolate(f, [s, s + d], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// ----------------------------------------------------------------
// TYPES & DEFAULTS
// ----------------------------------------------------------------

export type T2Props = {
  hook: string;
  punchNumber: string;
  punchColor: string;
  counterHook: string;
  counterNumber: string;
  counterColor: string;
  suffix: string;
  badge: string;
};

const defaultProps: T2Props = {
  hook: "Was kostet ein 4-Personen C-Level Team?",
  punchNumber: "CHF 588'000",
  punchColor: "#DC2626",
  counterHook: "Was kostet das gleiche bei KaderOS?",
  counterNumber: "CHF 49",
  counterColor: "#059669",
  suffix: "/Monat",
  badge: "999\u00D7 g\u00FCnstiger",
};

// ----------------------------------------------------------------
// SCREEN SHAKE — deterministic pseudo-random offset
// ----------------------------------------------------------------

const shake = (frame: number, startFrame: number, duration: number, intensity: number) => {
  if (frame < startFrame || frame > startFrame + duration) return { x: 0, y: 0 };
  const progress = (frame - startFrame) / duration;
  const decay = 1 - progress;
  const seed = frame * 7919;
  const x = (((seed % 100) / 100) * 2 - 1) * intensity * decay;
  const y = ((((seed * 13) % 100) / 100) * 2 - 1) * intensity * decay;
  return { x, y };
};

// ----------------------------------------------------------------
// SCENE 1 — QUESTION (frames 0-90)
// Hook text fades in from below, centered, muted gray
// ----------------------------------------------------------------

const SceneQuestion: React.FC<{ hook: string }> = ({ hook }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = sp(f, fps, 10, SMOOTH);
  const opacity = interpolate(textSpring, [0, 1], [0, 1]);
  const y = interpolate(textSpring, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
      }}
    >
      <div
        style={{
          fontSize: 36,
          fontFamily: FONT,
          fontWeight: 600,
          color: C.muted,
          textAlign: "center",
          lineHeight: 1.4,
          opacity,
          transform: `translateY(${y}px)`,
        }}
      >
        {hook}
      </div>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------
// SCENE 2 — RED NUMBER SLAM (frames 90-180)
// Big number slams in from scale 3->1 with shockwave + shake
// ----------------------------------------------------------------

const SceneRedSlam: React.FC<{
  hook: string;
  punchNumber: string;
  punchColor: string;
}> = ({ hook, punchNumber, punchColor }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Question text moves up and shrinks
  const questionY = interpolate(f, [0, 20], [0, -220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const questionScale = interpolate(f, [0, 20], [1, 0.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const questionOp = interpolate(f, [0, 20], [1, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Number SLAM
  const slamSpring = sp(f, fps, 15, SLAM);
  const slamScale = interpolate(slamSpring, [0, 1], [3, 1]);
  const slamOp = interpolate(slamSpring, [0, 1], [0, 1]);

  // Shockwave ring
  const ringProgress = interpolate(f, [15, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringScale = interpolate(ringProgress, [0, 1], [0.5, 2.5]);
  const ringOp = interpolate(ringProgress, [0, 1], [0.6, 0]);

  // Screen shake
  const { x: shakeX, y: shakeY } = shake(f, 15, 8, 4);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Question text — moved up */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          fontSize: 36,
          fontFamily: FONT,
          fontWeight: 600,
          color: C.muted,
          textAlign: "center",
          lineHeight: 1.4,
          padding: "0 60px",
          opacity: questionOp,
          transform: `translateY(${questionY}px) scale(${questionScale})`,
        }}
      >
        {hook}
      </div>

      {/* Number + Shockwave */}
      <div style={{ position: "relative", textAlign: "center" }}>
        {/* Shockwave ring */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 250,
            height: 250,
            borderRadius: "50%",
            border: `3px solid ${punchColor}`,
            transform: `translate(-50%, -50%) scale(${ringScale})`,
            opacity: ringOp,
            pointerEvents: "none",
          }}
        />

        {/* The number */}
        <div
          style={{
            fontSize: 120,
            fontFamily: FONT,
            fontWeight: 900,
            color: punchColor,
            letterSpacing: "-4px",
            transform: `scale(${slamScale})`,
            opacity: slamOp,
            textShadow: `0 8px 40px ${punchColor}30`,
            whiteSpace: "nowrap",
          }}
        >
          {punchNumber}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------
// SCENE 3 — COUNTER QUESTION (frames 180-270)
// Red number stays faded, counter question appears below
// ----------------------------------------------------------------

const SceneCounterQuestion: React.FC<{
  hook: string;
  punchNumber: string;
  punchColor: string;
  counterHook: string;
}> = ({ hook, punchNumber, punchColor, counterHook }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Red number stays, slightly faded
  const redOp = interpolate(f, [0, 15], [1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const redY = interpolate(f, [0, 20], [0, -80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Counter question fades in
  const counterSpring = sp(f, fps, 20, SMOOTH);
  const counterOp = interpolate(counterSpring, [0, 1], [0, 1]);
  const counterY = interpolate(counterSpring, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* First question — small, up top */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          fontSize: 27,
          fontFamily: FONT,
          fontWeight: 600,
          color: C.muted,
          textAlign: "center",
          opacity: 0.3,
          padding: "0 60px",
          lineHeight: 1.4,
        }}
      >
        {hook}
      </div>

      {/* Red number — faded, moved up */}
      <div
        style={{
          position: "absolute",
          top: "32%",
          fontSize: 90,
          fontFamily: FONT,
          fontWeight: 900,
          color: punchColor,
          letterSpacing: "-3px",
          opacity: redOp,
          transform: `translateY(${redY}px)`,
          textShadow: `0 4px 20px ${punchColor}20`,
          whiteSpace: "nowrap",
        }}
      >
        {punchNumber}
      </div>

      {/* Counter question */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          fontSize: 36,
          fontFamily: FONT,
          fontWeight: 600,
          color: C.muted,
          textAlign: "center",
          lineHeight: 1.4,
          padding: "0 60px",
          opacity: counterOp,
          transform: `translateY(${counterY}px)`,
        }}
      >
        {counterHook}
      </div>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------
// SCENE 4 — GREEN NUMBER SLAM (frames 270-390)
// Counter number slams in green, red number crossed out
// ----------------------------------------------------------------

const SceneGreenSlam: React.FC<{
  hook: string;
  punchNumber: string;
  punchColor: string;
  counterNumber: string;
  counterColor: string;
  suffix: string;
}> = ({ hook, punchNumber, punchColor, counterNumber, counterColor, suffix }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Green number SLAM
  const slamSpring = sp(f, fps, 10, SLAM);
  const slamScale = interpolate(slamSpring, [0, 1], [3, 1]);
  const slamOp = interpolate(slamSpring, [0, 1], [0, 1]);

  // Green shockwave
  const ringProgress = interpolate(f, [10, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringScale = interpolate(ringProgress, [0, 1], [0.5, 2.5]);
  const ringOp = interpolate(ringProgress, [0, 1], [0.6, 0]);

  // Screen shake
  const { x: shakeX, y: shakeY } = shake(f, 10, 8, 4);

  // Strikethrough on red number
  const strikeWidth = interpolate(f, [25, 50], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Suffix appears
  const suffixSpring = sp(f, fps, 30, SNAPPY);
  const suffixOp = interpolate(suffixSpring, [0, 1], [0, 1]);
  const suffixY = interpolate(suffixSpring, [0, 1], [15, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* First question — tiny, faded */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          fontSize: 22,
          fontFamily: FONT,
          fontWeight: 600,
          color: C.muted,
          textAlign: "center",
          opacity: 0.2,
          padding: "0 60px",
          lineHeight: 1.4,
        }}
      >
        {hook}
      </div>

      {/* Red number — crossed out */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          textAlign: "center",
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <span
            style={{
              fontSize: 72,
              fontFamily: FONT,
              fontWeight: 900,
              color: punchColor,
              letterSpacing: "-2px",
              opacity: 0.35,
              whiteSpace: "nowrap",
            }}
          >
            {punchNumber}
          </span>
          {/* Strikethrough line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              height: 4,
              width: `${strikeWidth}%`,
              backgroundColor: punchColor,
              transform: "translateY(-50%)",
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      {/* Green number + shockwave */}
      <div style={{ position: "relative", textAlign: "center", marginTop: 40 }}>
        {/* Green shockwave ring */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 250,
            height: 250,
            borderRadius: "50%",
            border: `3px solid ${counterColor}`,
            transform: `translate(-50%, -50%) scale(${ringScale})`,
            opacity: ringOp,
            pointerEvents: "none",
          }}
        />

        {/* The green number */}
        <div
          style={{
            fontSize: 130,
            fontFamily: FONT,
            fontWeight: 900,
            color: counterColor,
            letterSpacing: "-5px",
            transform: `scale(${slamScale})`,
            opacity: slamOp,
            textShadow: `0 8px 40px ${counterColor}30`,
            whiteSpace: "nowrap",
          }}
        >
          {counterNumber}
        </div>

        {/* Suffix */}
        <div
          style={{
            fontSize: 36,
            fontFamily: FONT,
            fontWeight: 600,
            color: counterColor,
            opacity: suffixOp,
            transform: `translateY(${suffixY}px)`,
            marginTop: 4,
          }}
        >
          {suffix}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------
// SCENE 5 — BADGE (frames 390-480)
// Pill badge bounces in below the numbers
// ----------------------------------------------------------------

const SceneBadge: React.FC<{
  hook: string;
  punchNumber: string;
  punchColor: string;
  counterNumber: string;
  counterColor: string;
  suffix: string;
  badge: string;
}> = ({ hook, punchNumber, punchColor, counterNumber, counterColor, suffix, badge }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge bounce in
  const badgeSpring = sp(f, fps, 15, BOUNCY);
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeOp = interpolate(badgeSpring, [0, 1], [0, 1]);

  // Badge gentle pulse after landing
  const pulse = f > 45 ? Math.sin((f - 45) * 0.08) * 0.03 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* First question — tiny, faded */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          fontSize: 22,
          fontFamily: FONT,
          fontWeight: 600,
          color: C.muted,
          textAlign: "center",
          opacity: 0.2,
          padding: "0 60px",
          lineHeight: 1.4,
        }}
      >
        {hook}
      </div>

      {/* Red number — crossed out */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          textAlign: "center",
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <span
            style={{
              fontSize: 72,
              fontFamily: FONT,
              fontWeight: 900,
              color: punchColor,
              letterSpacing: "-2px",
              opacity: 0.35,
              whiteSpace: "nowrap",
            }}
          >
            {punchNumber}
          </span>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              height: 4,
              width: "100%",
              backgroundColor: punchColor,
              transform: "translateY(-50%)",
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      {/* Green number */}
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <div
          style={{
            fontSize: 130,
            fontFamily: FONT,
            fontWeight: 900,
            color: counterColor,
            letterSpacing: "-5px",
            textShadow: `0 8px 40px ${counterColor}30`,
            whiteSpace: "nowrap",
          }}
        >
          {counterNumber}
        </div>
        <div
          style={{
            fontSize: 36,
            fontFamily: FONT,
            fontWeight: 600,
            color: counterColor,
            marginTop: 4,
          }}
        >
          {suffix}
        </div>
      </div>

      {/* Badge pill */}
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "50%",
          transform: `translateX(-50%) scale(${badgeScale + pulse})`,
          opacity: badgeOp,
        }}
      >
        <div
          style={{
            padding: "16px 40px",
            borderRadius: 50,
            backgroundColor: `${counterColor}12`,
            border: `2px solid ${counterColor}`,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontFamily: FONT,
              fontWeight: 800,
              color: counterColor,
              whiteSpace: "nowrap",
            }}
          >
            {badge}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------
// SCENE 6 — CTA (frames 480-600)
// Everything eases up, KaderOS logo + kaderos.io
// ----------------------------------------------------------------

const SceneCTA: React.FC<{
  counterColor: string;
  badge: string;
}> = ({ counterColor, badge }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Content eases up
  const liftY = interpolate(f, [0, 30], [0, -30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contentOp = interpolate(f, [0, 20], [1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo drops in
  const logoDrop = sp(f, fps, 15, HEAVY);
  const logoY = interpolate(logoDrop, [0, 1], [-60, 0]);
  const logoOp = interpolate(logoDrop, [0, 1], [0, 1]);

  // Brand URL
  const urlSpring = sp(f, fps, 45, SNAPPY);
  const urlOp = interpolate(urlSpring, [0, 1], [0, 1]);
  const urlScale = interpolate(urlSpring, [0, 1], [0.8, 1]);

  // Gentle pulse on logo
  const pulse = f > 60 ? 1 + Math.sin((f - 60) * 0.06) * 0.025 : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.primary}0A 0%, transparent 70%)`,
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Faded context from previous scenes */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          textAlign: "center",
          opacity: contentOp,
          transform: `translateY(${liftY}px)`,
        }}
      >
        {/* Badge stays visible */}
        <div
          style={{
            display: "inline-block",
            padding: "10px 28px",
            borderRadius: 50,
            backgroundColor: `${counterColor}12`,
            border: `2px solid ${counterColor}`,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontFamily: FONT,
              fontWeight: 800,
              color: counterColor,
            }}
          >
            {badge}
          </span>
        </div>
      </div>

      {/* Logo + CTA */}
      <div style={{ textAlign: "center" }}>
        {/* K Logo */}
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: 24,
            backgroundColor: C.primary,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 28px",
            opacity: logoOp,
            transform: `translateY(${logoY}px) scale(${pulse})`,
            boxShadow: `0 12px 40px ${C.primary}30`,
          }}
        >
          <span
            style={{
              color: "#FFF",
              fontSize: 42,
              fontFamily: FONT,
              fontWeight: 800,
            }}
          >
            K
          </span>
        </div>

        {/* kaderos.io */}
        <div
          style={{
            fontSize: 48,
            fontFamily: FONT,
            fontWeight: 800,
            color: C.text,
            letterSpacing: "-2px",
            opacity: urlOp,
            transform: `scale(${urlScale})`,
          }}
        >
          kaderos.io
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ================================================================
// MAIN COMPOSITION
// ================================================================

export const T2_ZahlenPunch: React.FC<Partial<T2Props>> = (partialProps) => {
  const props = { ...defaultProps, ...partialProps };

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Scene 1: Question (0-90) */}
      <Sequence from={0} durationInFrames={90}>
        <SceneQuestion hook={props.hook} />
      </Sequence>

      {/* Scene 2: Red Number Slam (90-180) */}
      <Sequence from={90} durationInFrames={90}>
        <SceneRedSlam
          hook={props.hook}
          punchNumber={props.punchNumber}
          punchColor={props.punchColor}
        />
      </Sequence>

      {/* Scene 3: Counter Question (180-270) */}
      <Sequence from={180} durationInFrames={90}>
        <SceneCounterQuestion
          hook={props.hook}
          punchNumber={props.punchNumber}
          punchColor={props.punchColor}
          counterHook={props.counterHook}
        />
      </Sequence>

      {/* Scene 4: Green Number Slam (270-390) */}
      <Sequence from={270} durationInFrames={120}>
        <SceneGreenSlam
          hook={props.hook}
          punchNumber={props.punchNumber}
          punchColor={props.punchColor}
          counterNumber={props.counterNumber}
          counterColor={props.counterColor}
          suffix={props.suffix}
        />
      </Sequence>

      {/* Scene 5: Badge (390-480) */}
      <Sequence from={390} durationInFrames={90}>
        <SceneBadge
          hook={props.hook}
          punchNumber={props.punchNumber}
          punchColor={props.punchColor}
          counterNumber={props.counterNumber}
          counterColor={props.counterColor}
          suffix={props.suffix}
          badge={props.badge}
        />
      </Sequence>

      {/* Scene 6: CTA (480-600) */}
      <Sequence from={480} durationInFrames={120}>
        <SceneCTA counterColor={props.counterColor} badge={props.badge} />
      </Sequence>
    </AbsoluteFill>
  );
};
