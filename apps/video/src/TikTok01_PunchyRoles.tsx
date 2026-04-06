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
// TIKTOK VIDEO 1 — "CEO. CTO. CMO. CHF 0."
// Punchy text motion — 20 seconds @ 60fps = 1200 frames
// Format: 1080×1920 (vertical / TikTok)
// ══════════════════════════════════════════════════════════

const C = {
  primary: "#000088",
  cyan: "#0891B2",
  green: "#059669",
  orange: "#E67E22",
  purple: "#6C3AC8",
  pink: "#DB2777",
  text: "#1D1D1F",
  muted: "#86868B",
  bg: "#FFFFFF",
  surface: "#F8F8FA",
  border: "#E8E8EC",
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

// ──────────────────────────────────────────────────────────
// SCENE 1 — HOOK (0-180 frames / 3s)
// "Du willst gründen?" — big, centered, fast appear
// ──────────────────────────────────────────────────────────

const SceneHook: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = sp(f, fps, 15, SNAPPY);
  const scale = interpolate(textSpring, [0, 1], [0.7, 1]);
  const opacity = interpolate(textSpring, [0, 1], [0, 1]);
  const blur = interpolate(f, [15, 40], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const sub = "Aber kein Team?";
  const subSpring = sp(f, fps, 60, SMOOTH);
  const subOp = interpolate(subSpring, [0, 1], [0, 1]);
  const subY = interpolate(subSpring, [0, 1], [30, 0]);

  const exitOp = fadeOut(f, 140, 30);
  const exitY = interpolate(f, [140, 170], [0, -40], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      {/* Subtle radial pulse */}
      <div style={{
        position: "absolute",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.primary}06 0%, transparent 70%)`,
        left: "50%", top: "50%",
        transform: `translate(-50%, -50%) scale(${1 + Math.sin(f / 30) * 0.05})`,
      }} />

      <div style={{ textAlign: "center", transform: `translateY(${exitY}px)`, opacity: exitOp }}>
        <div style={{
          fontSize: 64, fontFamily: FONT, fontWeight: 800, color: C.text,
          letterSpacing: "-2px", lineHeight: 1.1,
          transform: `scale(${scale})`, opacity, filter: `blur(${blur}px)`,
        }}>
          Du willst gründen?
        </div>

        <div style={{
          fontSize: 48, fontFamily: FONT, fontWeight: 700, color: C.primary,
          marginTop: 20, opacity: subOp, transform: `translateY(${subY}px)`,
          letterSpacing: "-1px",
        }}>
          {sub}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 2 — ROLE STAMPS (180-600 frames / 7s)
// CEO. CTO. CMO. CFO. — each stamps in with weight
// ──────────────────────────────────────────────────────────

const SceneRoles: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const roles = [
    { title: "CEO", color: C.primary, desc: "Strategie & Vision" },
    { title: "CTO", color: C.cyan, desc: "Architektur & Code" },
    { title: "CMO", color: C.green, desc: "Marketing & Growth" },
    { title: "CFO", color: C.orange, desc: "Finanzen & Budget" },
  ];

  const exitStart = 370;
  const exitOp = fadeOut(f, exitStart, 30);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center", opacity: exitOp }}>
        {roles.map((role, i) => {
          const delay = i * 55;
          const stampSpring = sp(f, fps, delay + 10, BOUNCY);
          const scale = interpolate(stampSpring, [0, 1], [2, 1]);
          const opacity = interpolate(stampSpring, [0, 1], [0, 1]);
          const rotate = interpolate(stampSpring, [0, 1], [-8, 0]);

          const descSpring = sp(f, fps, delay + 40, SNAPPY);
          const descOp = interpolate(descSpring, [0, 1], [0, 1]);
          const descX = interpolate(descSpring, [0, 1], [-30, 0]);

          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{
                fontSize: 80, fontFamily: FONT, fontWeight: 900, color: role.color,
                letterSpacing: "-3px",
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                opacity,
                textShadow: `0 4px 20px ${role.color}30`,
              }}>
                {role.title}
              </div>
              <div style={{
                fontSize: 24, fontFamily: FONT, fontWeight: 500, color: C.muted,
                opacity: descOp, transform: `translateX(${descX}px)`,
              }}>
                {role.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 3 — PRICE REVEAL (600-900 frames / 5s)
// "Kostenpunkt:" ... dramatic pause ... "CHF 0."
// ──────────────────────────────────────────────────────────

const ScenePriceReveal: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelSpring = sp(f, fps, 10, SMOOTH);
  const labelOp = interpolate(labelSpring, [0, 1], [0, 1]);

  // Price slams in at frame 80
  const priceSpring = sp(f, fps, 80, HEAVY);
  const priceScale = interpolate(priceSpring, [0, 1], [3, 1]);
  const priceOp = interpolate(priceSpring, [0, 1], [0, 1]);

  // Shockwave ring on price reveal
  const ringProgress = interpolate(f, [80, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringScale = interpolate(ringProgress, [0, 1], [0.5, 2.5]);
  const ringOp = interpolate(ringProgress, [0, 1], [0.6, 0]);

  // Sub-text
  const subSpring = sp(f, fps, 140, SNAPPY);
  const subOp = interpolate(subSpring, [0, 1], [0, 1]);
  const subY = interpolate(subSpring, [0, 1], [20, 0]);

  const exitOp = fadeOut(f, 260, 30);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", opacity: exitOp }}>
        {/* Label */}
        <div style={{
          fontSize: 36, fontFamily: FONT, fontWeight: 600, color: C.muted,
          marginBottom: 30, opacity: labelOp,
        }}>
          Kostenpunkt:
        </div>

        {/* Price */}
        <div style={{ position: "relative", display: "inline-block" }}>
          {/* Shockwave */}
          <div style={{
            position: "absolute", left: "50%", top: "50%",
            width: 200, height: 200, borderRadius: "50%",
            border: `3px solid ${C.primary}`,
            transform: `translate(-50%, -50%) scale(${ringScale})`,
            opacity: ringOp,
          }} />

          <div style={{
            fontSize: 140, fontFamily: FONT, fontWeight: 900, color: C.primary,
            letterSpacing: "-5px",
            transform: `scale(${priceScale})`, opacity: priceOp,
            textShadow: `0 8px 40px ${C.primary}25`,
          }}>
            CHF 0.
          </div>
        </div>

        {/* Sub */}
        <div style={{
          fontSize: 28, fontFamily: FONT, fontWeight: 500, color: C.muted,
          marginTop: 20, opacity: subOp, transform: `translateY(${subY}px)`,
        }}>
          Keine Löhne. Keine Sozialabgaben. Kein HR.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 4 — CTA (900-1200 frames / 5s)
// KaderOS logo + tagline + kaderos.io
// ──────────────────────────────────────────────────────────

const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo drops in
  const logoDrop = sp(f, fps, 15, HEAVY);
  const logoY = interpolate(logoDrop, [0, 1], [-60, 0]);
  const logoOp = interpolate(logoDrop, [0, 1], [0, 1]);

  // Brand name
  const nameSpring = sp(f, fps, 40, SNAPPY);
  const nameOp = interpolate(nameSpring, [0, 1], [0, 1]);
  const nameScale = interpolate(nameSpring, [0, 1], [0.8, 1]);

  // Tagline
  const tagSpring = sp(f, fps, 80, SMOOTH);
  const tagOp = interpolate(tagSpring, [0, 1], [0, 1]);
  const tagY = interpolate(tagSpring, [0, 1], [20, 0]);

  // URL
  const urlSpring = sp(f, fps, 120, SNAPPY);
  const urlOp = interpolate(urlSpring, [0, 1], [0, 1]);

  // Button pulse
  const pulse = interpolate(f, [160, 300], [0, Math.PI * 4], { extrapolateRight: "clamp" });
  const btnScale = 1 + Math.sin(pulse) * 0.03;

  // Border trace around button
  const traceLen = interpolate(f, [140, 200], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.primary}0A 0%, transparent 70%)`,
        left: "50%", top: "45%", transform: "translate(-50%, -50%)",
      }} />

      <div style={{ textAlign: "center" }}>
        {/* Logo */}
        <div style={{
          width: 80, height: 80, borderRadius: 22,
          backgroundColor: C.primary,
          display: "flex", justifyContent: "center", alignItems: "center",
          margin: "0 auto 30px",
          opacity: logoOp, transform: `translateY(${logoY}px)`,
          boxShadow: `0 12px 40px ${C.primary}30`,
        }}>
          <span style={{ color: "#FFF", fontSize: 38, fontFamily: FONT, fontWeight: 800 }}>K</span>
        </div>

        {/* Brand */}
        <div style={{
          fontSize: 72, fontFamily: FONT, fontWeight: 900, color: C.text,
          letterSpacing: "-3px",
          opacity: nameOp, transform: `scale(${nameScale})`,
        }}>
          KaderOS
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 28, fontFamily: FONT, fontWeight: 500, color: C.muted,
          marginTop: 16, opacity: tagOp, transform: `translateY(${tagY}px)`,
          maxWidth: 600, lineHeight: 1.4,
        }}>
          Dein nächster Mitarbeiter ist kein Mensch.
        </div>

        {/* CTA Button */}
        <div style={{
          marginTop: 50, display: "inline-block", position: "relative",
          opacity: urlOp, transform: `scale(${btnScale})`,
        }}>
          <div style={{
            padding: "20px 60px",
            backgroundColor: C.primary,
            borderRadius: 16,
            boxShadow: `0 8px 30px ${C.primary}40`,
          }}>
            <span style={{ color: "#FFF", fontSize: 28, fontFamily: FONT, fontWeight: 700 }}>
              kaderos.io
            </span>
          </div>

          {/* Border trace */}
          <svg style={{ position: "absolute", inset: -2, width: "calc(100% + 4px)", height: "calc(100% + 4px)" }}>
            <rect
              x={1} y={1}
              width="calc(100% - 2px)" height="calc(100% - 2px)"
              rx={17} ry={17}
              fill="none" stroke={C.cyan} strokeWidth={2}
              strokeDasharray={`${traceLen} ${400 - traceLen}`}
              opacity={0.6}
            />
          </svg>
        </div>

        {/* Link in Bio hint */}
        <div style={{
          fontSize: 20, fontFamily: FONT, fontWeight: 500, color: C.dim,
          marginTop: 24, opacity: urlOp,
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

export const TikTok01_PunchyRoles: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Sequence from={0} durationInFrames={180}>
        <SceneHook />
      </Sequence>
      <Sequence from={180} durationInFrames={420}>
        <SceneRoles />
      </Sequence>
      <Sequence from={600} durationInFrames={300}>
        <ScenePriceReveal />
      </Sequence>
      <Sequence from={900} durationInFrames={300}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
