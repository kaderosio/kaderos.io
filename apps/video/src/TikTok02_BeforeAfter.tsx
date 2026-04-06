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
// TIKTOK VIDEO 2 — "Vorher / Nachher"
// Before/After Split — Traditional Team vs KaderOS
// 22 seconds @ 60fps = 1320 frames
// Format: 1080×1920 (vertical / TikTok)
// ══════════════════════════════════════════════════════════

const C = {
  primary: "#000088",
  cyan: "#0891B2",
  green: "#059669",
  orange: "#E67E22",
  purple: "#6C3AC8",
  red: "#DC2626",
  text: "#1D1D1F",
  muted: "#86868B",
  dim: "#A1A1AA",
  bg: "#FFFFFF",
  surface: "#F8F8FA",
  border: "#E8E8EC",
  darkBg: "#0A0A0F",
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
// SCENE 1 — HOOK (0-150 frames / 2.5s)
// "Dein Startup. Zwei Wege."
// ──────────────────────────────────────────────────────────

const SceneHook: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Spring = sp(f, fps, 10, SNAPPY);
  const line1Op = interpolate(line1Spring, [0, 1], [0, 1]);
  const line1Scale = interpolate(line1Spring, [0, 1], [0.8, 1]);

  const line2Spring = sp(f, fps, 45, SMOOTH);
  const line2Op = interpolate(line2Spring, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Spring, [0, 1], [30, 0]);

  const exitOp = fadeOut(f, 115, 30);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", opacity: exitOp }}>
        <div style={{
          fontSize: 56, fontFamily: FONT, fontWeight: 800, color: C.text,
          letterSpacing: "-2px",
          opacity: line1Op, transform: `scale(${line1Scale})`,
        }}>
          Dein Startup.
        </div>
        <div style={{
          fontSize: 56, fontFamily: FONT, fontWeight: 800, color: C.primary,
          letterSpacing: "-2px", marginTop: 10,
          opacity: line2Op, transform: `translateY(${line2Y}px)`,
        }}>
          Zwei Wege.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 2 — TRADITIONAL WAY (150-540 frames / 6.5s)
// Red-tinted, showing costs & pain
// ──────────────────────────────────────────────────────────

const SceneTraditional: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = sp(f, fps, 5, SNAPPY);
  const headerOp = interpolate(headerSpring, [0, 1], [0, 1]);

  const costs = [
    { role: "CEO einstellen", cost: "CHF 180'000/Jahr", icon: "👔" },
    { role: "CTO einstellen", cost: "CHF 160'000/Jahr", icon: "💻" },
    { role: "CMO einstellen", cost: "CHF 140'000/Jahr", icon: "📢" },
    { role: "Office mieten", cost: "CHF 36'000/Jahr", icon: "🏢" },
    { role: "Sozialabgaben", cost: "CHF 72'000/Jahr", icon: "📋" },
  ];

  const totalSpring = sp(f, fps, 300, HEAVY);
  const totalOp = interpolate(totalSpring, [0, 1], [0, 1]);
  const totalScale = interpolate(totalSpring, [0, 1], [1.5, 1]);

  const exitOp = fadeOut(f, 350, 35);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      {/* Red warning tint */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, ${C.red}04 0%, ${C.red}08 100%)`,
      }} />

      <div style={{ padding: "0 60px", width: "100%", opacity: exitOp }}>
        {/* Header */}
        <div style={{
          fontSize: 32, fontFamily: FONT, fontWeight: 700, color: C.red,
          textAlign: "center", marginBottom: 50, opacity: headerOp,
          textTransform: "uppercase" as const, letterSpacing: "3px",
        }}>
          ❌ Der klassische Weg
        </div>

        {/* Cost items */}
        {costs.map((item, i) => {
          const delay = 40 + i * 45;
          const itemSpring = sp(f, fps, delay, SNAPPY);
          const itemOp = interpolate(itemSpring, [0, 1], [0, 1]);
          const itemX = interpolate(itemSpring, [0, 1], [-40, 0]);

          return (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "18px 24px", marginBottom: 12,
              backgroundColor: C.surface, borderRadius: 14,
              border: `1px solid ${C.border}`,
              opacity: itemOp, transform: `translateX(${itemX}px)`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <span style={{ fontSize: 22, fontFamily: FONT, fontWeight: 600, color: C.text }}>
                  {item.role}
                </span>
              </div>
              <span style={{
                fontSize: 20, fontFamily: MONO, fontWeight: 700, color: C.red,
              }}>
                {item.cost}
              </span>
            </div>
          );
        })}

        {/* Total */}
        <div style={{
          marginTop: 30, textAlign: "center",
          opacity: totalOp, transform: `scale(${totalScale})`,
        }}>
          <div style={{ fontSize: 24, fontFamily: FONT, fontWeight: 500, color: C.muted, marginBottom: 8 }}>
            Total pro Jahr
          </div>
          <div style={{
            fontSize: 64, fontFamily: FONT, fontWeight: 900, color: C.red,
            letterSpacing: "-2px",
          }}>
            CHF 588'000
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 3 — TRANSITION "ODER..." (540-660 frames / 2s)
// ──────────────────────────────────────────────────────────

const SceneTransition: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = sp(f, fps, 15, BOUNCY);
  const scale = interpolate(textSpring, [0, 1], [0.5, 1]);
  const opacity = interpolate(textSpring, [0, 1], [0, 1]);
  const rotate = interpolate(textSpring, [0, 1], [-10, 0]);

  const exitOp = fadeOut(f, 90, 25);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        fontSize: 80, fontFamily: FONT, fontWeight: 900, color: C.primary,
        transform: `scale(${scale}) rotate(${rotate}deg)`, opacity: opacity * exitOp,
        letterSpacing: "-3px",
      }}>
        Oder...
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 4 — KADEROS WAY (660-1020 frames / 6s)
// Green-tinted, showing KaderOS benefits
// ──────────────────────────────────────────────────────────

const SceneKaderOS: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = sp(f, fps, 5, SNAPPY);
  const headerOp = interpolate(headerSpring, [0, 1], [0, 1]);

  const agents = [
    { name: "Max", role: "CTO Agent", color: C.cyan, status: "Deployed ✓" },
    { name: "Aura", role: "CMO Agent", color: C.green, status: "Deployed ✓" },
    { name: "Vega", role: "CFO Agent", color: C.orange, status: "Deployed ✓" },
    { name: "Orion", role: "CEO Agent", color: C.purple, status: "Deployed ✓" },
  ];

  const priceSpring = sp(f, fps, 250, HEAVY);
  const priceOp = interpolate(priceSpring, [0, 1], [0, 1]);
  const priceScale = interpolate(priceSpring, [0, 1], [2, 1]);

  // Savings badge
  const badgeSpring = sp(f, fps, 300, BOUNCY);
  const badgeOp = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.5, 1]);

  const exitOp = fadeOut(f, 330, 25);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
      {/* Green success tint */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, ${C.green}04 0%, ${C.green}08 100%)`,
      }} />

      <div style={{ padding: "0 60px", width: "100%", opacity: exitOp }}>
        {/* Header */}
        <div style={{
          fontSize: 32, fontFamily: FONT, fontWeight: 700, color: C.green,
          textAlign: "center", marginBottom: 50, opacity: headerOp,
          textTransform: "uppercase" as const, letterSpacing: "3px",
        }}>
          ✓ Der KaderOS Weg
        </div>

        {/* Agent cards */}
        {agents.map((agent, i) => {
          const delay = 30 + i * 40;
          const cardSpring = sp(f, fps, delay, SNAPPY);
          const cardOp = interpolate(cardSpring, [0, 1], [0, 1]);
          const cardX = interpolate(cardSpring, [0, 1], [40, 0]);

          return (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "18px 24px", marginBottom: 12,
              backgroundColor: C.surface, borderRadius: 14,
              border: `1px solid ${agent.color}30`,
              opacity: cardOp, transform: `translateX(${cardX}px)`,
              boxShadow: `0 2px 12px ${agent.color}10`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  backgroundColor: agent.color, display: "flex",
                  justifyContent: "center", alignItems: "center",
                }}>
                  <span style={{ color: "#FFF", fontSize: 18, fontFamily: FONT, fontWeight: 800 }}>
                    {agent.name[0]}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: 22, fontFamily: FONT, fontWeight: 700, color: C.text }}>
                    {agent.name}
                  </div>
                  <div style={{ fontSize: 16, fontFamily: FONT, fontWeight: 400, color: C.muted }}>
                    {agent.role}
                  </div>
                </div>
              </div>
              <span style={{
                fontSize: 16, fontFamily: MONO, fontWeight: 600, color: C.green,
              }}>
                {agent.status}
              </span>
            </div>
          );
        })}

        {/* Price */}
        <div style={{
          marginTop: 30, textAlign: "center",
          opacity: priceOp, transform: `scale(${priceScale})`,
        }}>
          <div style={{ fontSize: 24, fontFamily: FONT, fontWeight: 500, color: C.muted, marginBottom: 8 }}>
            Total pro Monat
          </div>
          <div style={{
            fontSize: 72, fontFamily: FONT, fontWeight: 900, color: C.green,
            letterSpacing: "-3px",
          }}>
            CHF 49
          </div>
        </div>

        {/* Savings badge */}
        <div style={{
          textAlign: "center", marginTop: 16,
          opacity: badgeOp, transform: `scale(${badgeScale})`,
        }}>
          <span style={{
            display: "inline-block",
            padding: "10px 28px", borderRadius: 50,
            backgroundColor: `${C.green}12`,
            border: `1px solid ${C.green}30`,
            fontSize: 20, fontFamily: FONT, fontWeight: 700, color: C.green,
          }}>
            999× günstiger als ein echtes Team
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────
// SCENE 5 — CTA (1020-1320 frames / 5s)
// Logo + kaderos.io + Link in Bio
// ──────────────────────────────────────────────────────────

const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoDrop = sp(f, fps, 15, HEAVY);
  const logoY = interpolate(logoDrop, [0, 1], [-60, 0]);
  const logoOp = interpolate(logoDrop, [0, 1], [0, 1]);

  const nameSpring = sp(f, fps, 40, SNAPPY);
  const nameOp = interpolate(nameSpring, [0, 1], [0, 1]);

  const tagSpring = sp(f, fps, 70, SMOOTH);
  const tagOp = interpolate(tagSpring, [0, 1], [0, 1]);
  const tagY = interpolate(tagSpring, [0, 1], [20, 0]);

  const btnSpring = sp(f, fps, 110, SNAPPY);
  const btnOp = interpolate(btnSpring, [0, 1], [0, 1]);
  const pulse = interpolate(f, [150, 300], [0, Math.PI * 4], { extrapolateRight: "clamp" });
  const btnScale = 1 + Math.sin(pulse) * 0.03;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
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

        <div style={{
          fontSize: 72, fontFamily: FONT, fontWeight: 900, color: C.text,
          letterSpacing: "-3px", opacity: nameOp,
        }}>
          KaderOS
        </div>

        <div style={{
          fontSize: 26, fontFamily: FONT, fontWeight: 500, color: C.muted,
          marginTop: 16, opacity: tagOp, transform: `translateY(${tagY}px)`,
        }}>
          Dein nächster Mitarbeiter ist kein Mensch.
        </div>

        <div style={{
          marginTop: 50, display: "inline-block",
          opacity: btnOp, transform: `scale(${btnScale})`,
        }}>
          <div style={{
            padding: "20px 60px", backgroundColor: C.primary,
            borderRadius: 16, boxShadow: `0 8px 30px ${C.primary}40`,
          }}>
            <span style={{ color: "#FFF", fontSize: 28, fontFamily: FONT, fontWeight: 700 }}>
              kaderos.io
            </span>
          </div>
        </div>

        <div style={{
          fontSize: 20, fontFamily: FONT, fontWeight: 500, color: C.dim,
          marginTop: 24, opacity: btnOp,
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

export const TikTok02_BeforeAfter: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Sequence from={0} durationInFrames={150}>
        <SceneHook />
      </Sequence>
      <Sequence from={150} durationInFrames={390}>
        <SceneTraditional />
      </Sequence>
      <Sequence from={540} durationInFrames={120}>
        <SceneTransition />
      </Sequence>
      <Sequence from={660} durationInFrames={360}>
        <SceneKaderOS />
      </Sequence>
      <Sequence from={1020} durationInFrames={300}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
