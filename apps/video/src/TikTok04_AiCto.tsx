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
// TIKTOK VIDEO 4 — "Mein AI-CTO kostet CHF 3 pro Monat."
// Build in Public — 44.3s @ 60fps = 2658 frames
// Format: 1080×1920 (vertical / TikTok)
// ══════════════════════════════════════════════════════════

const C = {
  primary: "#3739C1",
  red: "#EF4444",
  green: "#059669",
  greenBright: "#22D98A",
  cyan: "#0891B2",
  orange: "#E67E22",
  purple: "#6C3AC8",
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
  src: string; darkness?: number;
}> = ({ src, darkness = 0.4 }) => {
  const f = useCurrentFrame();
  const kenBurns = 1 + (f / 600) * 0.03;
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(src)}
        style={{
          width: "115%", height: "115%", objectFit: "cover",
          marginLeft: "-7.5%", marginTop: "-7.5%",
          transform: `scale(${kenBurns})`,
        }}
        volume={0}
      />
      <AbsoluteFill style={{ backgroundColor: C.bg, opacity: darkness }} />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 1 — HOOK (0-240 frames / 4s)
// "Mein AI-CTO kostet CHF 3/Mt."
// ──────────────────────────────────────────────────────────

const SceneHook: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOp = fade(f, 10, 20);

  // CHF 3 counter animation
  const numSpring = sp(f, fps, 50, HEAVY);
  const numScale = interpolate(numSpring, [0, 1], [3, 1]);
  const numOp = interpolate(numSpring, [0, 1], [0, 1]);

  // Shockwave
  const ringProgress = interpolate(f, [50, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringScale = interpolate(ringProgress, [0, 1], [0.5, 2.5]);
  const ringOp = interpolate(ringProgress, [0, 1], [0.6, 0]);

  const exitOp = fadeOut(f, 200, 30);

  return (
    <AbsoluteFill>
      <CinematicFootage src="footage/coffee-shop-laptop.mp4" darkness={0.45} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", opacity: exitOp }}>
        <div style={{
          fontSize: 42, fontFamily: FONT, fontWeight: 600, color: C.text,
          opacity: labelOp, textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}>
          Mein AI-CTO kostet
        </div>

        <div style={{ position: "relative", marginTop: 24, display: "inline-block" }}>
          <div style={{
            position: "absolute", left: "50%", top: "50%",
            width: 200, height: 200, borderRadius: "50%",
            border: `3px solid ${C.greenBright}`,
            transform: `translate(-50%, -50%) scale(${ringScale})`,
            opacity: ringOp,
          }} />

          <div style={{
            fontSize: 120, fontFamily: FONT, fontWeight: 900, color: C.greenBright,
            letterSpacing: "-4px",
            transform: `scale(${numScale})`, opacity: numOp,
            textShadow: `0 0 60px ${C.greenBright}40`,
          }}>
            CHF 3/Mt.
          </div>
        </div>
      </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 2 — WHAT HE CAN DO (240-780 frames / 9s)
// Checklist with slide-in items
// ──────────────────────────────────────────────────────────

const CheckItem: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideSpring = sp(f, fps, delay, SNAPPY);
  const x = interpolate(slideSpring, [0, 1], [-250, 0]);
  const op = interpolate(slideSpring, [0, 1], [0, 1]);

  const checkSpring = sp(f, fps, delay + 15, BOUNCY);
  const checkScale = interpolate(checkSpring, [0, 1], [2, 1]);

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 18,
      transform: `translateX(${x}px)`, opacity: op,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        backgroundColor: C.green,
        display: "flex", justifyContent: "center", alignItems: "center",
        transform: `scale(${checkScale})`,
        boxShadow: `0 4px 16px ${C.green}40`,
      }}>
        <span style={{ color: "#FFF", fontSize: 26, fontWeight: 900 }}>✓</span>
      </div>
      <span style={{
        color: C.text, fontSize: 38, fontFamily: FONT, fontWeight: 600,
      }}>
        {text}
      </span>
    </div>
  );
};

const SceneAbilities: React.FC = () => {
  const f = useCurrentFrame();
  const exitOp = fadeOut(f, 490, 30);

  return (
    <AbsoluteFill>
      <CinematicFootage src="footage/coding-screen.mp4" darkness={0.5} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{
          display: "flex", flexDirection: "column", gap: 24, opacity: exitOp,
          padding: "0 80px",
        }}>
          <CheckItem text="Code Review" delay={20} />
          <CheckItem text="Dokumentation" delay={70} />
          <CheckItem text="Sprint Planning" delay={120} />
          <CheckItem text="0 Meeting-Beschwerden" delay={170} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 3 — THE TEAM (780-1320 frames / 9s)
// Agent cards with role + cost
// ──────────────────────────────────────────────────────────

const RoleCard: React.FC<{
  role: string; cost: string; color: string; delay: number; highlight?: boolean;
}> = ({ role, cost, color, delay, highlight = false }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = sp(f, fps, delay, SNAPPY);
  const scale = interpolate(cardSpring, [0, 1], [0.8, 1]);
  const op = interpolate(cardSpring, [0, 1], [0, 1]);

  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "20px 30px",
      backgroundColor: highlight ? `${C.primary}15` : `${C.text}05`,
      border: highlight ? `2px solid ${C.primary}` : `1px solid ${C.text}10`,
      borderRadius: 16, width: 700,
      transform: `scale(${scale})`, opacity: op,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 12, height: 12, borderRadius: "50%",
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}60`,
        }} />
        <span style={{ fontSize: 36, fontFamily: FONT, fontWeight: 700, color: C.text }}>
          {role}
        </span>
      </div>
      <span style={{
        fontSize: 36, fontFamily: MONO, fontWeight: 900, color: C.greenBright,
      }}>
        {cost}
      </span>
    </div>
  );
};

const SceneTeam: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOp = fade(f, 5, 20);
  const exitOp = fadeOut(f, 490, 30);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", opacity: exitOp }}>
        <div style={{
          fontSize: 26, fontFamily: FONT, fontWeight: 500, color: C.muted,
          marginBottom: 12, opacity: headerOp,
        }}>
          Mein AI-Team:
        </div>

        <RoleCard role="CTO" cost="CHF 3/Mt" color={C.cyan} delay={20} />
        <RoleCard role="CMO" cost="CHF 5/Mt" color={C.green} delay={60} />
        <RoleCard role="Sales" cost="CHF 2/Mt" color={C.orange} delay={100} />

        {/* Total — highlighted */}
        <div style={{ marginTop: 12 }}>
          <RoleCard role="TOTAL" cost="CHF 10/Mt" color={C.primary} delay={160} highlight />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 4 — BUDGET CONTROL (1320-1680 frames / 6s)
// Budget bar fills up → turns red → Auto-Stopp
// ──────────────────────────────────────────────────────────

const SceneBudget: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOp = fade(f, 10, 20);

  // Bar fills
  const fillProgress = interpolate(f, [30, 200], [0, 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const isOverBudget = fillProgress > 0.85;
  const barColor = isOverBudget ? C.red : C.greenBright;

  // Stop badge
  const showStop = f > 210;
  const stopSpring = showStop ? sp(f, fps, 210, BOUNCY) : 0;
  const stopScale = typeof stopSpring === "number" ? 0 : interpolate(stopSpring, [0, 1], [2.5, 1]);
  const stopOp = showStop ? fade(f, 210, 10) : 0;

  const exitOp = fadeOut(f, 320, 30);

  return (
    <AbsoluteFill>
      <CinematicFootage src="footage/calculator.mp4" darkness={0.5} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 800, textAlign: "center", opacity: exitOp }}>
        <div style={{
          fontSize: 42, fontFamily: FONT, fontWeight: 700, color: C.text,
          opacity: headerOp, marginBottom: 40,
          textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}>
          Zu viel ausgegeben?
        </div>

        {/* Budget bar */}
        <div style={{
          width: "100%", height: 48,
          backgroundColor: `${C.text}10`,
          borderRadius: 24, overflow: "hidden",
        }}>
          <div style={{
            width: `${fillProgress * 100}%`, height: "100%",
            backgroundColor: barColor,
            borderRadius: 24,
            boxShadow: isOverBudget ? `0 0 20px ${C.red}60` : undefined,
          }} />
        </div>

        {/* Auto-Stopp badge */}
        {showStop && (
          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            gap: 14, marginTop: 30,
            transform: `scale(${stopScale})`, opacity: stopOp,
          }}>
            <div style={{
              width: 44, height: 44, backgroundColor: C.red,
              borderRadius: 12, display: "flex", justifyContent: "center", alignItems: "center",
            }}>
              <span style={{ color: "#FFF", fontSize: 24, fontWeight: 900 }}>■</span>
            </div>
            <span style={{
              color: C.red, fontSize: 38, fontFamily: FONT, fontWeight: 800,
            }}>
              Auto-Stopp!
            </span>
          </div>
        )}
      </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 5 — BRANDING BADGES (1680-1980 frames / 5s)
// Open Source · Swiss Made · Ab CHF 0
// ──────────────────────────────────────────────────────────

const Badge: React.FC<{ icon: string; text: string; delay: number }> = ({ icon, text, delay }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = sp(f, fps, delay, BOUNCY);
  const scale = interpolate(badgeSpring, [0, 1], [0.5, 1]);
  const op = interpolate(badgeSpring, [0, 1], [0, 1]);

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "16px 28px",
      backgroundColor: `${C.text}06`,
      border: `1px solid ${C.text}12`,
      borderRadius: 50,
      transform: `scale(${scale})`, opacity: op,
    }}>
      <span style={{ fontSize: 30 }}>{icon}</span>
      <span style={{ color: C.text, fontSize: 30, fontFamily: FONT, fontWeight: 600 }}>
        {text}
      </span>
    </div>
  );
};

const SceneBranding: React.FC = () => {
  const f = useCurrentFrame();
  const exitOp = fadeOut(f, 260, 30);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 18,
        opacity: exitOp,
      }}>
        <Badge icon="📖" text="Open Source" delay={10} />
        <Badge icon="🇨🇭" text="Swiss Made" delay={40} />
        <Badge icon="💰" text="Ab CHF 0" delay={70} />
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 6 — CTA (1980-2658 frames / 11.3s)
// kaderos.io + "200 Beta-Plätze"
// ──────────────────────────────────────────────────────────

const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = sp(f, fps, 10, HEAVY);
  const logoY = interpolate(logoSpring, [0, 1], [-60, 0]);
  const logoOp = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);

  const nameSpring = sp(f, fps, 40, SNAPPY);
  const nameOp = interpolate(nameSpring, [0, 1], [0, 1]);

  const badgeSpring = sp(f, fps, 80, BOUNCY);
  const badgeOp = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeY = interpolate(badgeSpring, [0, 1], [20, 0]);

  const pulse = f > 100 ? 1 + Math.sin((f - 100) / 10) * 0.025 : 1;

  const subOp = fade(f, 110, 20);

  return (
    <AbsoluteFill>
      <CinematicFootage src="footage/person-smiling-laptop.mp4" darkness={0.5} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>

      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 80, height: 80, borderRadius: 22,
          backgroundColor: C.primary,
          display: "flex", justifyContent: "center", alignItems: "center",
          margin: "0 auto 24px",
          opacity: logoOp, transform: `translateY(${logoY}px) scale(${logoScale})`,
          boxShadow: `0 12px 40px ${C.primary}35`,
        }}>
          <span style={{ color: "#FFF", fontSize: 38, fontFamily: FONT, fontWeight: 800 }}>K</span>
        </div>

        <div style={{
          fontSize: 64, fontFamily: FONT, fontWeight: 900, color: C.text,
          letterSpacing: "-3px", opacity: nameOp,
        }}>
          kaderos.io
        </div>

        <div style={{
          marginTop: 30, display: "inline-block",
          opacity: badgeOp, transform: `translateY(${badgeY}px) scale(${pulse})`,
        }}>
          <div style={{
            padding: "16px 48px", backgroundColor: C.primary,
            borderRadius: 50, boxShadow: `0 8px 32px ${C.primary}40`,
          }}>
            <span style={{ color: "#FFF", fontSize: 26, fontFamily: FONT, fontWeight: 700 }}>
              200 Beta-Plätze
            </span>
          </div>
        </div>

        <div style={{
          fontSize: 24, fontFamily: FONT, fontWeight: 500, color: C.muted,
          marginTop: 20, opacity: subOp,
        }}>
          Dein Name fehlt noch.
        </div>
      </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ══════════════════════════════════════════════════════════

export const TikTok04_AiCto: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio src={staticFile("voiceover/v2-ai-cto.mp3")} volume={1} />

      {/* Scene 1: Hook — "CHF 3/Mt." (0-4s) */}
      <Sequence from={0} durationInFrames={240} premountFor={10}>
        <SceneHook />
      </Sequence>

      {/* Scene 2: Abilities — checklist (4-13s) */}
      <Sequence from={240} durationInFrames={540} premountFor={20}>
        <SceneAbilities />
      </Sequence>

      {/* Scene 3: Team — role cards (13-22s) */}
      <Sequence from={780} durationInFrames={540} premountFor={20}>
        <SceneTeam />
      </Sequence>

      {/* Scene 4: Budget — bar + auto-stopp (22-28s) */}
      <Sequence from={1320} durationInFrames={360} premountFor={20}>
        <SceneBudget />
      </Sequence>

      {/* Scene 5: Branding — badges (28-33s) */}
      <Sequence from={1680} durationInFrames={300} premountFor={20}>
        <SceneBranding />
      </Sequence>

      {/* Scene 6: CTA — kaderos.io (33-44.3s) */}
      <Sequence from={1980} durationInFrames={678} premountFor={20}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
