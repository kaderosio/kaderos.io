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
// TIKTOK VIDEO 6 — "Swiss Made ist kein Marketing."
// Swiss Pride + Demo — 51.5s @ 60fps = 3090 frames
// Format: 1080×1920 (vertical / TikTok)
// ══════════════════════════════════════════════════════════

const C = {
  primary: "#3739C1",
  red: "#FF0000",
  green: "#059669",
  greenBright: "#22D98A",
  cyan: "#0891B2",
  text: "#F0EDE8",
  muted: "#9B9B9B",
  bg: "#1E1E2A",
  card: "#262636",
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
// SCENE 1 — HOOK (0-240 frames / 4s)
// Swiss flag + "Swiss Made. Bei Software?" over alps
// ──────────────────────────────────────────────────────────

const SceneHook: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flagSpring = sp(f, fps, 15, HEAVY);
  const flagY = interpolate(flagSpring, [0, 1], [-60, 0]);
  const flagOp = interpolate(flagSpring, [0, 1], [0, 1]);

  const line1Op = fade(f, 40, 20);
  const line2Op = fade(f, 90, 20);
  const line2Y = interpolate(sp(f, fps, 90, SMOOTH), [0, 1], [15, 0]);

  const exitOp = fadeOut(f, 200, 30);

  return (
    <AbsoluteFill>
      <CinematicFootage src="footage/swiss-alps.mp4" darkness={0.35} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", opacity: exitOp }}>
          <div style={{
            margin: "0 auto 30px",
            opacity: flagOp, transform: `translateY(${flagY}px)`,
            filter: "drop-shadow(0 8px 24px rgba(255,0,0,0.3))",
          }}>
            <SwissFlag size={90} />
          </div>

          <div style={{
            fontSize: 68, fontFamily: FONT, fontWeight: 900, color: C.text,
            letterSpacing: "-2px", opacity: line1Op,
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}>
            Swiss Made.
          </div>
          <div style={{
            fontSize: 38, fontFamily: FONT, fontWeight: 500, color: C.muted,
            marginTop: 12, opacity: line2Op, transform: `translateY(${line2Y}px)`,
          }}>
            Bei Software?
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 2 — THE OTHERS (240-480 frames / 4s)
// "Die meisten kleben eine Flagge drauf." — slap animation
// ──────────────────────────────────────────────────────────

const SceneOthers: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fake website mockup
  const mockupOp = fade(f, 5, 20);

  // Flag slaps down
  const slapSpring = sp(f, fps, 50, { mass: 0.5, stiffness: 200, damping: 8 });
  const slapY = interpolate(slapSpring, [0, 1], [-400, 0]);
  const slapRotate = interpolate(slapSpring, [0, 1], [25, -3]);
  const slapOp = interpolate(slapSpring, [0, 1], [0, 1]);

  const textOp = fade(f, 90, 20);
  const exitOp = fadeOut(f, 200, 30);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", opacity: exitOp }}>
        {/* Fake website */}
        <div style={{
          width: 700, height: 380, borderRadius: 16,
          backgroundColor: "#151515", border: "1px solid #333",
          display: "flex", justifyContent: "center", alignItems: "center",
          position: "relative", overflow: "visible", opacity: mockupOp,
          margin: "0 auto",
        }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "#444", fontSize: 26, fontFamily: MONO }}>
              generic-saas.io
            </span>
            <div style={{ marginTop: 14, color: "#333", fontSize: 18, fontFamily: FONT }}>
              "We are the best AI platform..."
            </div>
          </div>

          {/* Flag slapped on */}
          <div style={{
            position: "absolute", top: "25%", right: "8%",
            transform: `translateY(${slapY}px) rotate(${slapRotate}deg)`,
            opacity: slapOp,
            filter: "drop-shadow(0 8px 20px rgba(255,0,0,0.4))",
          }}>
            <SwissFlag size={90} />
          </div>
        </div>

        <div style={{
          fontSize: 30, fontFamily: FONT, fontWeight: 600, color: C.muted,
          marginTop: 28, opacity: textOp,
        }}>
          Die meisten kleben eine Flagge drauf.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 3 — WHAT SWISS MADE MEANS (480-1500 frames / 17s)
// Feature cards sliding in — BYOK, CHF, Audit Trail, etc.
// ──────────────────────────────────────────────────────────

const FeatureCard: React.FC<{
  icon: string; title: string; subtitle: string; delay: number;
}> = ({ icon, title, subtitle, delay }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideSpring = sp(f, fps, delay, SNAPPY);
  const x = interpolate(slideSpring, [0, 1], [400, 0]);
  const op = interpolate(slideSpring, [0, 1], [0, 1]);

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 20,
      padding: "20px 28px",
      backgroundColor: `${C.text}06`,
      border: `1px solid ${C.primary}25`,
      borderRadius: 16, width: 800,
      transform: `translateX(${x}px)`, opacity: op,
    }}>
      <div style={{
        width: 50, height: 50, borderRadius: 12,
        backgroundColor: `${C.primary}18`,
        display: "flex", justifyContent: "center", alignItems: "center",
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 28 }}>{icon}</span>
      </div>
      <div>
        <div style={{ fontSize: 32, fontFamily: FONT, fontWeight: 700, color: C.text }}>
          {title}
        </div>
        <div style={{ fontSize: 20, fontFamily: FONT, fontWeight: 400, color: C.muted, marginTop: 2 }}>
          {subtitle}
        </div>
      </div>
    </div>
  );
};

const SceneFeatures: React.FC = () => {
  const f = useCurrentFrame();

  const headerOp = fade(f, 10, 20);
  const warmth = interpolate(f, [0, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(180deg, ${C.primary}${Math.round(warmth * 12).toString(16).padStart(2, "0")} 0%, ${C.bg} 100%)`,
      justifyContent: "center", alignItems: "center",
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
        <div style={{
          fontSize: 26, fontFamily: FONT, fontWeight: 500, color: C.muted,
          marginBottom: 16, opacity: headerOp,
        }}>
          Bei KaderOS heisst Swiss Made:
        </div>

        <FeatureCard icon="🔑" title="BYOK — Deine Keys" subtitle="Du bringst deinen eigenen API-Key" delay={30} />
        <FeatureCard icon="💰" title="Budget in CHF" subtitle="Nicht Dollar. Franken." delay={120} />
        <FeatureCard icon="📋" title="Audit Trail" subtitle="Jede Aktion protokolliert" delay={210} />
        <FeatureCard icon="📖" title="Open Source" subtitle="AGPLv3 auf GitHub" delay={300} />
        <FeatureCard icon="🛡️" title="nDSG-konform" subtitle="Schweizer Datenschutz by Design" delay={390} />
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 4 — THE PROMISE (1500-1800 frames / 5s)
// "Kein Blabla. Lies den Code." — code rain
// ──────────────────────────────────────────────────────────

const ScenePromise: React.FC = () => {
  const f = useCurrentFrame();

  const codeLines = [
    "export const auditTrail = async (action) => {",
    "  const log = await db.insert(audit_logs).values({",
    "    action, timestamp: new Date(),",
    "    agent_id: ctx.agentId,",
    "  });",
    "  return log;",
    "};",
    "",
    "// BYOK: Keys encrypted with AES-256",
    "export const encryptKey = (apiKey: string) => {",
    "  return encrypt(apiKey, process.env.MASTER_KEY);",
    "};",
  ];

  const scrollY = f * 1.2;
  const line1Op = fade(f, 10, 20);
  const line2Op = fade(f, 50, 20);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      {/* Code rain background */}
      <AbsoluteFill style={{ opacity: 0.12, overflow: "hidden" }}>
        <div style={{ transform: `translateY(${-scrollY}px)`, padding: 40 }}>
          {[...codeLines, ...codeLines, ...codeLines, ...codeLines].map((line, i) => (
            <div key={i} style={{
              color: C.greenBright, fontSize: 16, fontFamily: MONO,
              lineHeight: 2.2, whiteSpace: "nowrap",
            }}>
              {line}
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <div style={{
          fontSize: 52, fontFamily: FONT, fontWeight: 800, color: C.text,
          opacity: line1Op,
        }}>
          Kein Blabla.
        </div>
        <div style={{
          fontSize: 46, fontFamily: FONT, fontWeight: 700, color: C.greenBright,
          marginTop: 16, opacity: line2Op,
          textShadow: `0 0 30px ${C.greenBright}30`,
        }}>
          Lies den Code.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 5 — CTA (1800-3090 frames / 21.5s)
// Swiss alps + kaderos.io + "Made in Switzerland"
// ──────────────────────────────────────────────────────────

const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flagSpring = sp(f, fps, 10, HEAVY);
  const flagY = interpolate(flagSpring, [0, 1], [-60, 0]);
  const flagOp = interpolate(flagSpring, [0, 1], [0, 1]);

  const nameSpring = sp(f, fps, 40, SNAPPY);
  const nameOp = interpolate(nameSpring, [0, 1], [0, 1]);

  const tagOp = fade(f, 70, 20);
  const tagY = interpolate(sp(f, fps, 70, SMOOTH), [0, 1], [15, 0]);

  const badgeSpring = sp(f, fps, 100, BOUNCY);
  const badgeOp = interpolate(badgeSpring, [0, 1], [0, 1]);
  const pulse = f > 120 ? 1 + Math.sin((f - 120) / 10) * 0.025 : 1;

  return (
    <AbsoluteFill>
      <CinematicFootage src="footage/swiss-alps.mp4" darkness={0.4} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            margin: "0 auto 24px",
            opacity: flagOp, transform: `translateY(${flagY}px)`,
            filter: "drop-shadow(0 8px 24px rgba(255,0,0,0.3))",
          }}>
            <SwissFlag size={80} />
          </div>

          <div style={{
            fontSize: 68, fontFamily: FONT, fontWeight: 900, color: C.text,
            letterSpacing: "-3px", opacity: nameOp,
            textShadow: "0 4px 24px rgba(0,0,0,0.6)",
          }}>
            kaderos.io
          </div>

          <div style={{
            fontSize: 28, fontFamily: FONT, fontWeight: 500, color: C.muted,
            marginTop: 14, opacity: tagOp, transform: `translateY(${tagY}px)`,
          }}>
            Dein AI-Team. Made in Switzerland.
          </div>

          <div style={{
            marginTop: 30, display: "inline-block",
            opacity: badgeOp, transform: `scale(${pulse})`,
          }}>
            <div style={{
              padding: "16px 48px", backgroundColor: C.red,
              borderRadius: 50, boxShadow: "0 8px 32px rgba(255,0,0,0.35)",
            }}>
              <span style={{ color: "#FFF", fontSize: 26, fontFamily: FONT, fontWeight: 700 }}>
                200 Beta-Plätze
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ══════════════════════════════════════════════════════════

export const TikTok06_SwissMade: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio src={staticFile("voiceover/v4-swiss-made.mp3")} volume={1} />

      {/* Scene 1: Hook — Swiss Alps + "Swiss Made" (0-4s) */}
      <Sequence from={0} durationInFrames={240} premountFor={10}>
        <SceneHook />
      </Sequence>

      {/* Scene 2: Others — Flag slap (4-8s) */}
      <Sequence from={240} durationInFrames={240} premountFor={20}>
        <SceneOthers />
      </Sequence>

      {/* Scene 3: Features — BYOK, CHF, Audit, etc. (8-25s) */}
      <Sequence from={480} durationInFrames={1020} premountFor={20}>
        <SceneFeatures />
      </Sequence>

      {/* Scene 4: Promise — "Lies den Code." (25-30s) */}
      <Sequence from={1500} durationInFrames={300} premountFor={20}>
        <ScenePromise />
      </Sequence>

      {/* Scene 5: CTA — kaderos.io over alps (30-51.5s) */}
      <Sequence from={1800} durationInFrames={1290} premountFor={20}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
