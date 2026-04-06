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
// TIKTOK VIDEO 3 — "5 AI-Tools. 0 System."
// Problem-Awareness — 41.4s @ 60fps = 2484 frames
// Format: 1080×1920 (vertical / TikTok)
// Voiceover: KonradKlar (ElevenLabs)
// ══════════════════════════════════════════════════════════

const C = {
  primary: "#3739C1",
  red: "#EF4444",
  green: "#059669",
  cyan: "#0891B2",
  text: "#F0EDE8",
  muted: "#9B9B9B",
  bg: "#1E1E2A",
  card: "#262636",
  border: "#35354A",
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

// ── SHARED COMPONENTS ────────────────────────────────────

const CinematicFootage: React.FC<{
  src: string; darkness?: number; blur?: number;
}> = ({ src, darkness = 0.6, blur = 0 }) => {
  const f = useCurrentFrame();
  const kenBurns = 1 + (f / 600) * 0.03;
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(src)}
        style={{
          width: "115%", height: "115%", objectFit: "cover",
          marginLeft: "-7.5%", marginTop: "-7.5%",
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
          transform: `scale(${kenBurns})`,
        }}
        volume={0}
      />
      <AbsoluteFill style={{ backgroundColor: C.bg, opacity: darkness }} />
    </AbsoluteFill>
  );
};

const SwissFlag: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ borderRadius: size * 0.22 }}>
    <rect width="32" height="32" rx="4" fill="#FF0000" />
    <rect x="6" y="13" width="20" height="6" rx="1" fill="#FFFFFF" />
    <rect x="13" y="6" width="6" height="20" rx="1" fill="#FFFFFF" />
  </svg>
);

// ──────────────────────────────────────────────────────────
// SCENE 1 — HOOK (0-180 frames / 3s)
// "5 AI-Tools. 0 System." — big, centered, hard
// ──────────────────────────────────────────────────────────

const SceneHook: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Spring = sp(f, fps, 10, SNAPPY);
  const line1Scale = interpolate(line1Spring, [0, 1], [0.7, 1]);
  const line1Op = interpolate(line1Spring, [0, 1], [0, 1]);

  const line2Spring = sp(f, fps, 40, BOUNCY);
  const line2Scale = interpolate(line2Spring, [0, 1], [2, 1]);
  const line2Op = interpolate(line2Spring, [0, 1], [0, 1]);

  const exitOp = fadeOut(f, 140, 30);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", opacity: exitOp }}>
        <div style={{
          fontSize: 68, fontFamily: FONT, fontWeight: 800, color: C.text,
          letterSpacing: "-2px", transform: `scale(${line1Scale})`, opacity: line1Op,
        }}>
          5 AI-Tools.
        </div>
        <div style={{
          fontSize: 72, fontFamily: FONT, fontWeight: 900, color: C.red,
          letterSpacing: "-2px", marginTop: 16,
          transform: `scale(${line2Scale})`, opacity: line2Op,
        }}>
          0 System.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 2 — TOOL CHAOS (180-720 frames / 9s)
// Tool tabs stack up — ChatGPT, Claude, Notion AI, etc.
// ──────────────────────────────────────────────────────────

const ToolTab: React.FC<{ name: string; delay: number; index: number }> = ({ name, delay, index }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tabSpring = sp(f, fps, delay, BOUNCY);
  const scale = interpolate(tabSpring, [0, 1], [1.6, 1]);
  const opacity = interpolate(tabSpring, [0, 1], [0, 1]);
  const rotate = interpolate(tabSpring, [0, 1], [-5 + index * 2, 0]);

  return (
    <div style={{
      backgroundColor: `${C.text}08`,
      border: `1px solid ${C.text}15`,
      borderRadius: 16,
      padding: "18px 36px",
      transform: `scale(${scale}) rotate(${rotate}deg)`,
      opacity,
    }}>
      <span style={{
        color: C.text, fontSize: 40, fontFamily: FONT, fontWeight: 700,
      }}>
        {name}
      </span>
    </div>
  );
};

const SceneChaos: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tools = ["ChatGPT", "Claude", "Notion AI", "Midjourney", "DeepL"];
  const STAGGER = 50;

  const forgotSpring = sp(f, fps, tools.length * STAGGER + 40, SMOOTH);
  const forgotOp = interpolate(forgotSpring, [0, 1], [0, 1]);
  const forgotY = interpolate(forgotSpring, [0, 1], [20, 0]);

  const exitOp = fadeOut(f, 490, 30);

  return (
    <AbsoluteFill>
      <CinematicFootage src="footage/stressed-laptop.mp4" darkness={0.4} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
          opacity: exitOp,
        }}>
          {tools.map((tool, i) => (
            <ToolTab key={i} name={tool} delay={i * STAGGER + 10} index={i} />
          ))}
          <div style={{
            fontSize: 28, fontFamily: FONT, fontWeight: 500, color: C.muted,
            marginTop: 12, opacity: forgotOp, transform: `translateY(${forgotY}px)`,
            fontStyle: "italic",
          }}>
            ...und zwei, die du vergessen hast.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 3 — THE PAIN (720-1320 frames / 10s)
// "Ende Monat: Was hab ich ausgegeben?" + "CHF ???"
// ──────────────────────────────────────────────────────────

const ScenePain: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Op = fade(f, 10, 20);
  const line1Y = interpolate(sp(f, fps, 10, SMOOTH), [0, 1], [20, 0]);

  const line2Op = fade(f, 60, 20);
  const line2Y = interpolate(sp(f, fps, 60, SMOOTH), [0, 1], [20, 0]);

  // Big red number pulses
  const numSpring = sp(f, fps, 140, HEAVY);
  const numScale = interpolate(numSpring, [0, 1], [3, 1]);
  const numOp = interpolate(numSpring, [0, 1], [0, 1]);
  const pulse = f > 180 ? 1 + Math.sin((f - 180) / 8) * 0.04 : 1;

  // Shockwave ring
  const ringProgress = interpolate(f, [140, 190], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringScale = interpolate(ringProgress, [0, 1], [0.5, 3]);
  const ringOp = interpolate(ringProgress, [0, 1], [0.5, 0]);

  const exitOp = fadeOut(f, 540, 40);

  return (
    <AbsoluteFill>
      <CinematicFootage src="footage/money-stress.mp4" darkness={0.45} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", opacity: exitOp }}>
          <div style={{
            fontSize: 44, fontFamily: FONT, fontWeight: 600, color: C.text,
            opacity: line1Op, transform: `translateY(${line1Y}px)`,
          }}>
            Ende Monat:
          </div>
          <div style={{
            fontSize: 36, fontFamily: FONT, fontWeight: 500, color: C.muted,
            marginTop: 12, opacity: line2Op, transform: `translateY(${line2Y}px)`,
          }}>
            Was hab ich ausgegeben?
          </div>

          {/* Big red CHF ??? */}
          <div style={{ position: "relative", marginTop: 60, display: "inline-block" }}>
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              width: 200, height: 200, borderRadius: "50%",
              border: `3px solid ${C.red}`,
              transform: `translate(-50%, -50%) scale(${ringScale})`,
              opacity: ringOp,
            }} />
            <div style={{
              fontSize: 120, fontFamily: FONT, fontWeight: 900, color: C.red,
              letterSpacing: "-4px",
              transform: `scale(${numScale * pulse})`, opacity: numOp,
              textShadow: `0 0 60px ${C.red}40`,
            }}>
              CHF ???
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 4 — THE TWIST (1320-1560 frames / 4s)
// "Das ist kein Workflow. Das ist Chaos."
// ──────────────────────────────────────────────────────────

const SceneTwist: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Spring = sp(f, fps, 10, SMOOTH);
  const line1Op = interpolate(line1Spring, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Spring, [0, 1], [15, 0]);

  const line2Spring = sp(f, fps, 70, BOUNCY);
  const line2Scale = interpolate(line2Spring, [0, 1], [1.8, 1]);
  const line2Op = interpolate(line2Spring, [0, 1], [0, 1]);

  const exitOp = fadeOut(f, 200, 30);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", opacity: exitOp }}>
        <div style={{
          fontSize: 48, fontFamily: FONT, fontWeight: 600, color: C.text,
          opacity: line1Op, transform: `translateY(${line1Y}px)`,
        }}>
          Das ist kein Workflow.
        </div>
        <div style={{
          fontSize: 56, fontFamily: FONT, fontWeight: 900, color: C.red,
          marginTop: 20, transform: `scale(${line2Scale})`, opacity: line2Op,
          letterSpacing: "-1.5px",
          textShadow: `0 0 40px ${C.red}30`,
        }}>
          Das ist Chaos.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 5 — THE SOLUTION (1560-2100 frames / 9s)
// Dashboard with Rollen, Budgets, Dashboard
// Dark → warm transition
// ──────────────────────────────────────────────────────────

const SceneSolution: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const warmth = interpolate(f, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const features = [
    { label: "Rollen", desc: "CTO · CMO · Sales", delay: 30 },
    { label: "Budgets", desc: "Pro Rolle. In CHF.", delay: 80 },
    { label: "Dashboard", desc: "1 Ort. Volle Kontrolle.", delay: 130 },
  ];

  const headlineOp = fade(f, 10, 20);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(180deg, ${C.primary}${Math.round(warmth * 20).toString(16).padStart(2, "0")} 0%, ${C.bg} 100%)`,
      justifyContent: "center", alignItems: "center",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: 36, fontFamily: FONT, fontWeight: 600, color: C.muted,
          opacity: headlineOp, marginBottom: 40,
        }}>
          Was wäre wenn du ein System hättest?
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
          {features.map((feat, i) => {
            const cardSpring = sp(f, fps, feat.delay, SNAPPY);
            const cardX = interpolate(cardSpring, [0, 1], [i % 2 === 0 ? -300 : 300, 0]);
            const cardOp = interpolate(cardSpring, [0, 1], [0, 1]);

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 20,
                padding: "22px 32px",
                backgroundColor: `${C.text}06`,
                border: `1px solid ${C.primary}30`,
                borderRadius: 16, width: 700,
                transform: `translateX(${cardX}px)`, opacity: cardOp,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  backgroundColor: `${C.primary}20`,
                  display: "flex", justifyContent: "center", alignItems: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 24, fontFamily: FONT, fontWeight: 800, color: C.primary }}>
                    {i + 1}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: 34, fontFamily: FONT, fontWeight: 700, color: C.text }}>
                    {feat.label}
                  </div>
                  <div style={{ fontSize: 22, fontFamily: FONT, fontWeight: 400, color: C.muted, marginTop: 2 }}>
                    {feat.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* "1 Team. 1 Dashboard. Volle Kontrolle." */}
        <div style={{
          fontSize: 32, fontFamily: FONT, fontWeight: 700, color: C.text,
          marginTop: 40, opacity: fade(f, 200, 25),
          transform: `translateY(${interpolate(sp(f, fps, 200, SMOOTH), [0, 1], [15, 0])}px)`,
        }}>
          1 Team. 1 Dashboard. Volle Kontrolle.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 6 — CTA (2100-2484 frames / 6.4s)
// Swiss flag + kaderos.io + "200 Beta-Plätze"
// ──────────────────────────────────────────────────────────

const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Swiss flag drops in
  const flagDrop = sp(f, fps, 10, HEAVY);
  const flagY = interpolate(flagDrop, [0, 1], [-80, 0]);
  const flagOp = interpolate(flagDrop, [0, 1], [0, 1]);
  const flagScale = interpolate(flagDrop, [0, 1], [0.5, 1]);

  // Brand name
  const nameSpring = sp(f, fps, 35, SNAPPY);
  const nameOp = interpolate(nameSpring, [0, 1], [0, 1]);
  const nameScale = interpolate(nameSpring, [0, 1], [0.8, 1]);

  // Beta badge
  const badgeSpring = sp(f, fps, 70, BOUNCY);
  const badgeOp = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeY = interpolate(badgeSpring, [0, 1], [20, 0]);

  // Pulse
  const pulse = f > 80 ? 1 + Math.sin((f - 80) / 10) * 0.025 : 1;

  // Link in Bio
  const linkOp = fade(f, 100, 20);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.primary}12 0%, transparent 70%)`,
        left: "50%", top: "45%", transform: "translate(-50%, -50%)",
      }} />

      <div style={{ textAlign: "center" }}>
        {/* Swiss Flag */}
        <div style={{
          margin: "0 auto 28px",
          opacity: flagOp, transform: `translateY(${flagY}px) scale(${flagScale})`,
          filter: "drop-shadow(0 12px 40px rgba(255,0,0,0.25))",
        }}>
          <SwissFlag size={80} />
        </div>

        {/* kaderos.io */}
        <div style={{
          fontSize: 64, fontFamily: FONT, fontWeight: 900, color: C.text,
          letterSpacing: "-3px",
          opacity: nameOp, transform: `scale(${nameScale})`,
        }}>
          kaderos.io
        </div>

        {/* Beta badge */}
        <div style={{
          marginTop: 30, display: "inline-block",
          opacity: badgeOp, transform: `translateY(${badgeY}px) scale(${pulse})`,
        }}>
          <div style={{
            padding: "16px 48px",
            backgroundColor: C.primary,
            borderRadius: 50,
            boxShadow: `0 8px 32px ${C.primary}40`,
          }}>
            <span style={{ color: "#FFF", fontSize: 26, fontFamily: FONT, fontWeight: 700 }}>
              200 Beta-Plätze
            </span>
          </div>
        </div>

        {/* Link in Bio */}
        <div style={{
          fontSize: 22, fontFamily: FONT, fontWeight: 500, color: C.muted,
          marginTop: 20, opacity: linkOp,
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

export const TikTok03_FuenfAiTools: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Voiceover */}
      <Audio src={staticFile("voiceover/v1-5-ai-tools.mp3")} volume={1} />

      {/* Scene 1: Hook — "5 AI-Tools. 0 System." (0-3s) */}
      <Sequence from={0} durationInFrames={180} premountFor={10}>
        <SceneHook />
      </Sequence>

      {/* Scene 2: Tool Chaos — tabs stacking (3-12s) */}
      <Sequence from={180} durationInFrames={540} premountFor={20}>
        <SceneChaos />
      </Sequence>

      {/* Scene 3: The Pain — "CHF ???" (12-22s) */}
      <Sequence from={720} durationInFrames={600} premountFor={20}>
        <ScenePain />
      </Sequence>

      {/* Scene 4: The Twist — "Das ist Chaos." (22-26s) */}
      <Sequence from={1320} durationInFrames={240} premountFor={20}>
        <SceneTwist />
      </Sequence>

      {/* Scene 5: Solution — Rollen, Budgets, Dashboard (26-35s) */}
      <Sequence from={1560} durationInFrames={540} premountFor={20}>
        <SceneSolution />
      </Sequence>

      {/* Scene 6: CTA — kaderos.io (35-41.4s) */}
      <Sequence from={2100} durationInFrames={384} premountFor={20}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
