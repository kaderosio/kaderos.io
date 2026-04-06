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
// TIKTOK VIDEO 5 — "Terminal Animation"
// Dev-aesthetic deploy animation — 12 seconds @ 60fps = 720 frames
// Format: 1080x1920 (vertical / TikTok)
// ══════════════════════════════════════════════════════════

const C = {
  primary: "#000088",
  cyan: "#0891B2",
  green: "#059669",
  orange: "#E67E22",
  purple: "#6C3AC8",
  termBg: "#0A0A0F",
  termBorder: "#1a1a2e",
  white: "#FFFFFF",
  muted: "#6B7280",
};

const FONT = "Outfit, -apple-system, sans-serif";
const MONO = "JetBrains Mono, SF Mono, Menlo, monospace";

const SNAPPY = { mass: 0.6, stiffness: 120, damping: 18 };
const SMOOTH = { mass: 1, stiffness: 60, damping: 26 };
const HEAVY = { mass: 2, stiffness: 50, damping: 30 };

const sp = (f: number, fps: number, d = 0, c = SMOOTH) =>
  spring({ frame: Math.max(0, f - d), fps, config: c });

const fadeOut = (f: number, s: number, d = 20) =>
  interpolate(f, [s, s + d], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// ──────────────────────────────────────────────────────────
// SCENE 1 — HOOK (frames 0-60 / 1s)
// "One command. Full team." — spring scale
// ──────────────────────────────────────────────────────────

const SceneHook: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = sp(f, fps, 5, SNAPPY);
  const scale = interpolate(textSpring, [0, 1], [0.6, 1]);
  const opacity = interpolate(textSpring, [0, 1], [0, 1]);

  const exitOp = fadeOut(f, 50, 10);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.termBg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontFamily: FONT,
          fontWeight: 800,
          color: C.white,
          textAlign: "center",
          transform: `scale(${scale})`,
          opacity: opacity * exitOp,
          letterSpacing: "-1.5px",
          lineHeight: 1.3,
          padding: "0 60px",
        }}
      >
        One command.
        <br />
        Full team.
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 2-5 — TERMINAL (frames 60-720)
// Terminal window with typing + output + CTA
// ──────────────────────────────────────────────────────────

const SceneTerminal: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Terminal entrance (local frames 0-90 = global 60-150) ---
  const enterSpring = sp(f, fps, 0, HEAVY);
  const termY = interpolate(enterSpring, [0, 1], [400, 0]);
  const termOp = interpolate(enterSpring, [0, 1], [0, 1]);
  const termRotX = interpolate(enterSpring, [0, 1], [12, 0]);

  // --- Command typing (local frames 90-240 = global 150-300) ---
  const COMMAND = "npx kaderos onboard";
  const typingStart = 90;
  const charsTyped = Math.floor(
    interpolate(f, [typingStart, typingStart + COMMAND.length * 4], [0, COMMAND.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const typedText = COMMAND.slice(0, charsTyped);
  const typingDone = charsTyped >= COMMAND.length;
  const typingEndFrame = typingStart + COMMAND.length * 4;

  // Cursor blink (toggles every 15 frames = 30fps blink rate)
  const cursorVisible = Math.floor(f / 15) % 2 === 0;

  // After typing done, blink twice then hide
  const cursorBlinkAfterTyping = f - typingEndFrame;
  const showCursor =
    !typingDone ||
    (cursorBlinkAfterTyping >= 0 && cursorBlinkAfterTyping < 60 && cursorVisible);

  // --- Output lines (local frames 240-540 = global 300-600) ---
  const outputStart = 240;
  const LINE_DELAY = 40;

  const outputLines = [
    { text: "\u2713 Kader erkannt: \"Agentur Zuerich\"", color: C.green },
    { text: "\u2713 Max (CTO) -- deployed", color: C.cyan },
    { text: "\u2713 Aura (CMO) -- deployed", color: C.green },
    { text: "\u2713 Vega (CFO) -- deployed", color: C.orange },
    { text: "\u2713 Orion (CEO) -- deployed", color: C.purple },
  ];

  // --- Final line (local frames 540-600 = global 600-660) ---
  const finalLineStart = outputStart + outputLines.length * LINE_DELAY + 20;
  const finalSpring = sp(f, fps, finalLineStart, SNAPPY);
  const finalOp = interpolate(finalSpring, [0, 1], [0, 1]);
  const finalX = interpolate(finalSpring, [0, 1], [-20, 0]);

  // Final line glow pulse
  const finalGlowPhase = interpolate(
    f,
    [finalLineStart + 30, finalLineStart + 120],
    [0, Math.PI * 3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const finalGlow = 0.15 + Math.sin(finalGlowPhase) * 0.1;

  // --- CTA overlay (local frames 600-660 = global 660-720) ---
  const ctaStart = 600;
  const termDim = interpolate(f, [ctaStart, ctaStart + 30], [1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoSpring = sp(f, fps, ctaStart + 10, HEAVY);
  const logoOp = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoY = interpolate(logoSpring, [0, 1], [-40, 0]);

  const urlSpring = sp(f, fps, ctaStart + 30, SNAPPY);
  const urlOp = interpolate(urlSpring, [0, 1], [0, 1]);

  // Pulse for CTA
  const ctaPulse = interpolate(
    f,
    [ctaStart + 40, ctaStart + 60],
    [0, Math.PI * 2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const ctaScale = 1 + Math.sin(ctaPulse) * 0.03;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.termBg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Subtle ambient glow behind terminal */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.primary}12 0%, transparent 70%)`,
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Terminal window */}
      <div
        style={{
          width: 920,
          borderRadius: 20,
          overflow: "hidden",
          border: `1px solid ${C.termBorder}`,
          boxShadow: `0 30px 80px rgba(0, 0, 136, 0.15)`,
          transform: `translateY(${termY}px) perspective(1200px) rotateX(${termRotX}deg)`,
          opacity: termOp * termDim,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 18px",
            backgroundColor: "#141420",
            borderBottom: `1px solid ${C.termBorder}`,
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#FF5F57",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#FEBC2E",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#28C840",
              }}
            />
          </div>

          {/* Title */}
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 14,
              fontFamily: MONO,
              fontWeight: 500,
              color: C.muted,
              marginRight: 36,
            }}
          >
            kaderos — terminal
          </div>
        </div>

        {/* Terminal body */}
        <div
          style={{
            backgroundColor: C.termBg,
            padding: "28px 28px 36px",
            minHeight: 480,
          }}
        >
          {/* Command prompt line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 20,
              fontFamily: MONO,
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: C.green, marginRight: 8 }}>$</span>
            <span style={{ color: C.white }}>{typedText}</span>
            {showCursor && (
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 22,
                  backgroundColor: C.white,
                  marginLeft: 2,
                  verticalAlign: "middle",
                }}
              />
            )}
          </div>

          {/* Output lines */}
          {typingDone &&
            outputLines.map((line, i) => {
              const lineStart = outputStart + i * LINE_DELAY;
              const lineSpring = sp(f, fps, lineStart, SNAPPY);
              const lineOp = interpolate(lineSpring, [0, 1], [0, 1]);
              const lineX = interpolate(lineSpring, [0, 1], [-20, 0]);

              // Checkmark flash: brief brightness boost on appear
              const flashProgress = interpolate(
                f,
                [lineStart, lineStart + 12],
                [1.5, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              );

              return (
                <div
                  key={i}
                  style={{
                    fontSize: 20,
                    fontFamily: MONO,
                    lineHeight: 2,
                    color: line.color,
                    opacity: lineOp,
                    transform: `translateX(${lineX}px)`,
                    filter: `brightness(${flashProgress})`,
                  }}
                >
                  {line.text}
                </div>
              );
            })}

          {/* Final status line */}
          {typingDone && (
            <div
              style={{
                fontSize: 22,
                fontFamily: MONO,
                fontWeight: 600,
                lineHeight: 2.2,
                color: C.primary,
                opacity: finalOp,
                transform: `translateX(${finalX}px)`,
                textShadow: `0 0 20px rgba(0, 0, 136, ${finalGlow})`,
                marginTop: 8,
              }}
            >
              {"\uD83D\uDE80"} Dein AI-Kader ist einsatzbereit.
            </div>
          )}
        </div>
      </div>

      {/* CTA Overlay */}
      {f >= ctaStart && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 22,
              backgroundColor: C.primary,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: logoOp,
              transform: `translateY(${logoY}px) scale(${ctaScale})`,
              boxShadow: `0 12px 40px ${C.primary}30`,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                color: C.white,
                fontSize: 38,
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
              fontSize: 36,
              fontFamily: FONT,
              fontWeight: 700,
              color: C.white,
              opacity: urlOp,
              letterSpacing: "-0.5px",
            }}
          >
            kaderos.io
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ══════════════════════════════════════════════════════════

export const T5_Terminal: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.termBg }}>
      <Sequence from={0} durationInFrames={60}>
        <SceneHook />
      </Sequence>
      <Sequence from={60} durationInFrames={660}>
        <SceneTerminal />
      </Sequence>
    </AbsoluteFill>
  );
};
