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
import { Audio } from "@remotion/media";

// ══════════════════════════════════════════════════════════
// TIKTOK VIDEO 5 — "Du bist kein CEO. Du bist ein Prompter."
// Problem → Solution — 28.9s @ 60fps = 1734 frames
// Format: 1080×1920 (vertical / TikTok)
// ══════════════════════════════════════════════════════════

const C = {
  primary: "#3739C1",
  red: "#EF4444",
  green: "#059669",
  cyan: "#0891B2",
  text: "#F0EDE8",
  muted: "#9B9B9B",
  bg: "#1E1E2A",
};

const FONT = "Outfit, -apple-system, sans-serif";
const MONO = "JetBrains Mono, SF Mono, Menlo, monospace";

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

const CinematicFootage: React.FC<{
  src: string; darkness?: number; blur?: number; saturation?: number;
}> = ({ src, darkness = 0.6, blur = 0, saturation = 1 }) => {
  const f = useCurrentFrame();
  const kenBurns = 1 + (f / 600) * 0.03;
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(src)}
        style={{
          width: "115%", height: "115%", objectFit: "cover",
          marginLeft: "-7.5%", marginTop: "-7.5%",
          filter: `${blur > 0 ? `blur(${blur}px) ` : ""}saturate(${saturation})`,
          transform: `scale(${kenBurns})`,
        }}
        volume={0}
      />
      <AbsoluteFill style={{ backgroundColor: C.bg, opacity: darkness }} />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 1 — HOOK (0-180 frames / 3s)
// "Du bist kein CEO. Du bist ein Prompter."
// ──────────────────────────────────────────────────────────

const SceneHook: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Du bist kein CEO." — fades in gently
  const line1Op = fade(f, 10, 20);

  // "Du bist ein Prompter." — SLAMS in with shake
  const line2Spring = sp(f, fps, 60, { mass: 0.4, stiffness: 200, damping: 10 });
  const line2Scale = interpolate(line2Spring, [0, 1], [2.5, 1]);
  const line2Op = interpolate(line2Spring, [0, 1], [0, 1]);

  // Shake effect
  const shakeFrame = f - 60;
  const shakeX = shakeFrame > 0 && shakeFrame < 12
    ? Math.sin(shakeFrame * 4) * (8 - shakeFrame * 0.6)
    : 0;

  const exitOp = fadeOut(f, 150, 20);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", opacity: exitOp }}>
        <div style={{
          fontSize: 52, fontFamily: FONT, fontWeight: 600, color: C.text,
          opacity: line1Op,
        }}>
          Du bist kein CEO.
        </div>
        <div style={{
          fontSize: 60, fontFamily: FONT, fontWeight: 900, color: C.red,
          marginTop: 20, letterSpacing: "-2px",
          transform: `scale(${line2Scale}) translateX(${shakeX}px)`,
          opacity: line2Op,
          textShadow: `0 0 40px ${C.red}30`,
        }}>
          Du bist ein Prompter.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 2 — THE TRUTH (180-720 frames / 9s)
// "Prompten... Copy-Pasten... Formatieren... Repeat."
// Desaturated, monotone — footage of typing
// ──────────────────────────────────────────────────────────

const StampWord: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = f - delay;
  if (localFrame < 0) return null;

  const stampSpring = sp(f, fps, delay, { mass: 0.4, stiffness: 300, damping: 12 });
  const scale = interpolate(stampSpring, [0, 1], [2.5, 1]);
  const op = interpolate(stampSpring, [0, 1], [0, 0.85]);

  return (
    <div style={{
      color: C.muted, fontSize: 48, fontFamily: MONO, fontWeight: 700,
      transform: `scale(${scale})`, opacity: op,
      textTransform: "uppercase", letterSpacing: "3px",
    }}>
      {text}
    </div>
  );
};

const SceneTruth: React.FC = () => {
  const f = useCurrentFrame();

  // Loop arrow
  const loopOp = fade(f, 360, 30);
  const loopRotate = f > 360 ? (f - 360) * 0.5 : 0;

  const exitOp = fadeOut(f, 490, 30);

  return (
    <AbsoluteFill>
      <CinematicFootage src="footage/typing-keyboard.mp4" darkness={0.4} saturation={0.35} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 28,
          opacity: exitOp,
        }}>
          <StampWord text="Prompten..." delay={30} />
          <StampWord text="Copy-Pasten..." delay={100} />
          <StampWord text="Formatieren..." delay={170} />
          <StampWord text="Repeat." delay={240} />

          <div style={{
            marginTop: 24, opacity: loopOp,
            transform: `rotate(${loopRotate}deg)`,
          }}>
            <span style={{ color: C.muted, fontSize: 56 }}>↻</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 3 — THE BREAK (720-900 frames / 3s)
// Black screen. Silence. Then "Ausser..." fades in.
// ──────────────────────────────────────────────────────────

const SceneBreak: React.FC = () => {
  const f = useCurrentFrame();

  const textOp = fade(f, 60, 40);

  return (
    <AbsoluteFill style={{ backgroundColor: "#151520", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        fontSize: 56, fontFamily: FONT, fontWeight: 600, color: C.text,
        fontStyle: "italic", opacity: textOp,
      }}>
        Ausser...
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 4 — THE SOLUTION (900-1380 frames / 8s)
// "Rollen. Budgets. Kontrolle. Dein AI-Team."
// Warm transition
// ──────────────────────────────────────────────────────────

const SpringWord: React.FC<{
  text: string; delay: number; color?: string; size?: number;
}> = ({ text, delay, color = C.text, size = 56 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = f - delay;
  if (localFrame < 0) return null;

  const wordSpring = sp(f, fps, delay, BOUNCY);
  const scale = interpolate(wordSpring, [0, 1], [0.4, 1]);
  const y = interpolate(wordSpring, [0, 1], [30, 0]);
  const op = interpolate(wordSpring, [0, 1], [0, 1]);

  return (
    <div style={{
      color, fontSize: size, fontFamily: FONT, fontWeight: 800,
      transform: `scale(${scale}) translateY(${y}px)`, opacity: op,
      textAlign: "center",
    }}>
      {text}
    </div>
  );
};

const SceneSolution: React.FC = () => {
  const f = useCurrentFrame();
  const warmth = interpolate(f, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(180deg, ${C.primary}${Math.round(warmth * 18).toString(16).padStart(2, "0")} 0%, ${C.bg} 100%)`,
      justifyContent: "center", alignItems: "center",
    }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
      }}>
        <SpringWord text="Rollen." delay={20} color={C.primary} />
        <SpringWord text="Budgets." delay={70} color={C.green} />
        <SpringWord text="Kontrolle." delay={120} />
        <div style={{ marginTop: 24 }}>
          <SpringWord text="Dein AI-Team." delay={190} size={48} color={C.muted} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 5 — CTA (1380-1734 frames / 5.9s)
// "Werde CEO deines AI-Teams." + kaderos.io
// ──────────────────────────────────────────────────────────

const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typewriter effect
  const fullText = "Werde CEO deines AI-Teams.";
  const charsToShow = Math.min(Math.floor(f * 0.5), fullText.length);
  const displayText = fullText.slice(0, charsToShow);
  const showCursor = f % 16 < 10 && charsToShow < fullText.length;

  // kaderos.io
  const urlSpring = sp(f, fps, 80, SNAPPY);
  const urlOp = interpolate(urlSpring, [0, 1], [0, 1]);
  const urlScale = interpolate(urlSpring, [0, 1], [0.8, 1]);

  // Link in Bio
  const linkOp = fade(f, 110, 20);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.primary}10 0%, transparent 70%)`,
        left: "50%", top: "45%", transform: "translate(-50%, -50%)",
      }} />

      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: 44, fontFamily: FONT, fontWeight: 700, color: C.text,
          lineHeight: 1.3, minHeight: 120,
        }}>
          {displayText}
          {showCursor && <span style={{ color: C.primary }}>|</span>}
        </div>

        <div style={{
          fontSize: 64, fontFamily: FONT, fontWeight: 900, color: C.text,
          letterSpacing: "-3px", marginTop: 40,
          opacity: urlOp, transform: `scale(${urlScale})`,
        }}>
          kaderos.io
        </div>

        <div style={{
          fontSize: 22, fontFamily: FONT, fontWeight: 500, color: C.muted,
          marginTop: 16, opacity: linkOp,
        }}>
          Link in Bio
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ══════════════════════════════════════════════════════════

export const TikTok05_Prompter: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio src={staticFile("voiceover/v3-prompter.mp3")} volume={1} />

      {/* Scene 1: Hook — "Du bist ein Prompter." (0-3s) */}
      <Sequence from={0} durationInFrames={180} premountFor={10}>
        <SceneHook />
      </Sequence>

      {/* Scene 2: Truth — Prompten, Copy-Pasten... (3-12s) */}
      <Sequence from={180} durationInFrames={540} premountFor={20}>
        <SceneTruth />
      </Sequence>

      {/* Scene 3: Break — "Ausser..." (12-15s) */}
      <Sequence from={720} durationInFrames={180} premountFor={10}>
        <SceneBreak />
      </Sequence>

      {/* Scene 4: Solution — Rollen, Budgets, Kontrolle (15-23s) */}
      <Sequence from={900} durationInFrames={480} premountFor={20}>
        <SceneSolution />
      </Sequence>

      {/* Scene 5: CTA — kaderos.io (23-28.9s) */}
      <Sequence from={1380} durationInFrames={354} premountFor={20}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
