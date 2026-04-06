import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  staticFile,
  OffthreadVideo,
} from "remotion";

// ══════════════════════════════════════════════════════════
// TIKTOK VIDEO 7 — "CHF 588'000. Oder CHF 10."
// Zahlen-Punch — 15s @ 60fps = 900 frames
// AI-Generated Footage (MiniMax via fal.ai)
// No voiceover — text + music only (add on TikTok)
// ══════════════════════════════════════════════════════════

const C = {
  primary: "#3739C1",
  red: "#EF4444",
  green: "#059669",
  greenBright: "#22D98A",
  text: "#F0EDE8",
  muted: "#9B9B9B",
  bg: "#1E1E2A",
};

const FONT = "Outfit, -apple-system, sans-serif";

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

const AIFootage: React.FC<{ src: string; darkness?: number }> = ({ src, darkness = 0.35 }) => {
  const f = useCurrentFrame();
  const kenBurns = 1 + (f / 400) * 0.04;
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(src)}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: `scale(${kenBurns})`,
        }}
        volume={0}
      />
      <AbsoluteFill style={{ backgroundColor: C.bg, opacity: darkness }} />
    </AbsoluteFill>
  );
};

const SwissFlag: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ borderRadius: size * 0.22 }}>
    <rect width="32" height="32" rx="4" fill="#FF0000" />
    <rect x="6" y="13" width="20" height="6" rx="1" fill="#FFFFFF" />
    <rect x="13" y="6" width="6" height="20" rx="1" fill="#FFFFFF" />
  </svg>
);

// ──────────────────────────────────────────────────────────
// SCENE 1 — QUESTION (0-180 frames / 3s)
// "Was kostet ein 4-Personen C-Level Team?" over money
// ──────────────────────────────────────────────────────────

const SceneQuestion: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Op = fade(f, 10, 15);
  const line1Y = interpolate(sp(f, fps, 10, SMOOTH), [0, 1], [20, 0]);

  const line2Op = fade(f, 50, 15);
  const line2Y = interpolate(sp(f, fps, 50, SMOOTH), [0, 1], [20, 0]);

  const exitOp = fadeOut(f, 150, 25);

  return (
    <AbsoluteFill>
      <AIFootage src="footage/ai-gen/money.mp4" darkness={0.4} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", opacity: exitOp, padding: "0 60px" }}>
          <div style={{
            fontSize: 42, fontFamily: FONT, fontWeight: 600, color: C.muted,
            opacity: line1Op, transform: `translateY(${line1Y}px)`,
            textShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}>
            Was kostet ein
          </div>
          <div style={{
            fontSize: 52, fontFamily: FONT, fontWeight: 800, color: C.text,
            opacity: line2Op, transform: `translateY(${line2Y}px)`,
            marginTop: 8, letterSpacing: "-1.5px",
            textShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}>
            4-Personen C-Level Team?
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 2 — BIG RED NUMBER (180-480 frames / 5s)
// "CHF 588'000" SLAMS in huge over money
// ──────────────────────────────────────────────────────────

const SceneExpensive: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Number slams in
  const numSpring = sp(f, fps, 15, HEAVY);
  const numScale = interpolate(numSpring, [0, 1], [4, 1]);
  const numOp = interpolate(numSpring, [0, 1], [0, 1]);

  // Shockwave
  const ringProgress = interpolate(f, [15, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringScale = interpolate(ringProgress, [0, 1], [0.3, 3]);
  const ringOp = interpolate(ringProgress, [0, 1], [0.7, 0]);

  // Subtitle
  const subOp = fade(f, 60, 20);

  const exitOp = fadeOut(f, 260, 30);

  return (
    <AbsoluteFill>
      <AIFootage src="footage/ai-gen/money.mp4" darkness={0.5} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", opacity: exitOp }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            {/* Shockwave ring */}
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              width: 250, height: 250, borderRadius: "50%",
              border: `3px solid ${C.red}`,
              transform: `translate(-50%, -50%) scale(${ringScale})`,
              opacity: ringOp,
            }} />

            <div style={{
              fontSize: 110, fontFamily: FONT, fontWeight: 900, color: C.red,
              letterSpacing: "-4px",
              transform: `scale(${numScale})`, opacity: numOp,
              textShadow: `0 0 80px ${C.red}50, 0 4px 20px rgba(0,0,0,0.6)`,
            }}>
              CHF 588'000
            </div>
          </div>

          <div style={{
            fontSize: 30, fontFamily: FONT, fontWeight: 500, color: C.muted,
            marginTop: 16, opacity: subOp,
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}>
            pro Jahr. Löhne + Sozialabgaben + HR.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 3 — THE TWIST (480-660 frames / 3s)
// "Oder..." → "CHF 10." in green over dashboard
// ──────────────────────────────────────────────────────────

const SceneTwist: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Oder..." fades in
  const oderOp = fade(f, 10, 15);

  // CHF 10 slams in
  const numSpring = sp(f, fps, 60, { mass: 0.5, stiffness: 200, damping: 10 });
  const numScale = interpolate(numSpring, [0, 1], [3.5, 1]);
  const numOp = interpolate(numSpring, [0, 1], [0, 1]);

  // Shake
  const shakeFrame = f - 60;
  const shakeX = shakeFrame > 0 && shakeFrame < 10
    ? Math.sin(shakeFrame * 5) * (6 - shakeFrame * 0.5)
    : 0;

  // Shockwave green
  const ringProgress = interpolate(f, [60, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringScale = interpolate(ringProgress, [0, 1], [0.3, 2.5]);
  const ringOp = interpolate(ringProgress, [0, 1], [0.7, 0]);

  const exitOp = fadeOut(f, 150, 25);

  return (
    <AbsoluteFill>
      <AIFootage src="footage/ai-gen/dashboard.mp4" darkness={0.4} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", opacity: exitOp }}>
          <div style={{
            fontSize: 44, fontFamily: FONT, fontWeight: 600, color: C.muted,
            opacity: oderOp, fontStyle: "italic",
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}>
            Oder...
          </div>

          <div style={{ position: "relative", marginTop: 20, display: "inline-block" }}>
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              width: 200, height: 200, borderRadius: "50%",
              border: `3px solid ${C.greenBright}`,
              transform: `translate(-50%, -50%) scale(${ringScale})`,
              opacity: ringOp,
            }} />

            <div style={{
              fontSize: 130, fontFamily: FONT, fontWeight: 900, color: C.greenBright,
              letterSpacing: "-5px",
              transform: `scale(${numScale}) translateX(${shakeX}px)`,
              opacity: numOp,
              textShadow: `0 0 80px ${C.greenBright}50, 0 4px 20px rgba(0,0,0,0.6)`,
            }}>
              CHF 10.
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 4 — CTA (660-900 frames / 4s)
// kaderos.io over confident founder
// ──────────────────────────────────────────────────────────

const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flagSpring = sp(f, fps, 10, HEAVY);
  const flagY = interpolate(flagSpring, [0, 1], [-50, 0]);
  const flagOp = interpolate(flagSpring, [0, 1], [0, 1]);

  const nameSpring = sp(f, fps, 30, SNAPPY);
  const nameOp = interpolate(nameSpring, [0, 1], [0, 1]);
  const nameScale = interpolate(nameSpring, [0, 1], [0.8, 1]);

  const tagOp = fade(f, 55, 15);

  const badgeSpring = sp(f, fps, 75, BOUNCY);
  const badgeOp = interpolate(badgeSpring, [0, 1], [0, 1]);
  const pulse = f > 90 ? 1 + Math.sin((f - 90) / 10) * 0.03 : 1;

  return (
    <AbsoluteFill>
      <AIFootage src="footage/ai-gen/founder.mp4" darkness={0.45} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            margin: "0 auto 20px",
            opacity: flagOp, transform: `translateY(${flagY}px)`,
            filter: "drop-shadow(0 8px 20px rgba(255,0,0,0.3))",
          }}>
            <SwissFlag size={70} />
          </div>

          <div style={{
            fontSize: 64, fontFamily: FONT, fontWeight: 900, color: C.text,
            letterSpacing: "-3px",
            opacity: nameOp, transform: `scale(${nameScale})`,
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}>
            kaderos.io
          </div>

          <div style={{
            fontSize: 26, fontFamily: FONT, fontWeight: 500, color: C.muted,
            marginTop: 10, opacity: tagOp,
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}>
            Dein AI-Team. Ab CHF 0.
          </div>

          <div style={{
            marginTop: 24, display: "inline-block",
            opacity: badgeOp, transform: `scale(${pulse})`,
          }}>
            <div style={{
              padding: "14px 40px", backgroundColor: C.primary,
              borderRadius: 50, boxShadow: `0 8px 32px ${C.primary}50`,
            }}>
              <span style={{ color: "#FFF", fontSize: 24, fontFamily: FONT, fontWeight: 700 }}>
                Link in Bio
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN COMPOSITION — 15s = 900 frames @ 60fps
// ══════════════════════════════════════════════════════════

export const TikTok07_ZahlenPunch: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* No voiceover — text + music only (add trending sound on TikTok) */}

      {/* Scene 1: Question (0-3s) */}
      <Sequence from={0} durationInFrames={180} premountFor={10}>
        <SceneQuestion />
      </Sequence>

      {/* Scene 2: CHF 588'000 (3-8s) */}
      <Sequence from={180} durationInFrames={300} premountFor={20}>
        <SceneExpensive />
      </Sequence>

      {/* Scene 3: Oder... CHF 10. (8-11s) */}
      <Sequence from={480} durationInFrames={180} premountFor={20}>
        <SceneTwist />
      </Sequence>

      {/* Scene 4: CTA (11-15s) */}
      <Sequence from={660} durationInFrames={240} premountFor={20}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
