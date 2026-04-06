import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Sequence,
  OffthreadVideo,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";

const C = {
  bg: "#FAFAFA",
  dark: "#1A1A1A",
  muted: "#777777",
  primary: "#000088",
  emerald: "#059669",
  orange: "#E67E22",
  white: "#FFFFFF",
  red: "#DC2626",
};

const FONT = "Outfit, -apple-system, system-ui, sans-serif";
const MONO = "JetBrains Mono, SF Mono, Menlo, monospace";
const TOTAL_FRAMES = 2340; // 39s (voice=35.2s + buffer)
const hardOut = (t: number) => 1 - Math.pow(1 - t, 3);
const SAFE = { top: 216, bottom: 288, side: 65 };

const S = {
  hook:     { start: 0,    end: 180 },    // 0-3s
  one:      { start: 180,  end: 480 },    // 3-8s
  extras:   { start: 480,  end: 780 },    // 8-13s
  total1:   { start: 780,  end: 1020 },   // 13-17s
  times4:   { start: 1020, end: 1260 },   // 17-21s
  or:       { start: 1260, end: 1500 },   // 21-25s
  split:    { start: 1500, end: 1740 },   // 25-29s
  scarcity: { start: 1740, end: 2040 },   // 29-34s
  closer:   { start: 2040, end: 2340 },   // 34-39s
} as const;

// ─── SHARED COMPONENTS ───────────────────────────────────────

const Footage: React.FC<{
  src: string; brightness?: number; blur?: number; overlay?: number;
}> = ({ src, brightness = 1.1, blur = 0, overlay = 0.15 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile(src)} style={{
        width: "110%", height: "110%", objectFit: "cover",
        marginLeft: "-5%", marginTop: "-5%",
        filter: `brightness(${brightness})${blur ? ` blur(${blur}px)` : ""}`,
        transform: `scale(${1 + frame * 0.0001})`,
      }} volume={0} />
      <AbsoluteFill style={{ backgroundColor: C.white, opacity: overlay }} />
    </AbsoluteFill>
  );
};

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.03 }}>
      <svg width="100%" height="100%">
        <filter id="g9"><feTurbulence type="fractalNoise" baseFrequency="0.9" seed={frame % 80} /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#g9)" />
      </svg>
    </AbsoluteFill>
  );
};

// ─── ANIMATED NUMBER ─────────────────────────────────────────

const AnimNumber: React.FC<{
  value: string; fontSize: number; color: string; delay?: number; sub?: string;
}> = ({ value, fontSize, color, delay = 10, sub }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(frame, [delay, delay + 15], [1.3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut });
  return (
    <div style={{ textAlign: "center", opacity: op, transform: `scale(${scale})` }}>
      <div style={{
        fontFamily: FONT, fontWeight: 900, fontSize, color,
        textShadow: color === C.white ? `0 0 40px ${C.primary}33` : "none",
      }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: fontSize * 0.3, color: C.muted, marginTop: 8 }}>
          {sub}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENES
// ═══════════════════════════════════════════════════════════════

const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 72, color: C.dark,
          opacity: op, letterSpacing: "-0.02em",
        }}>
          Kurze Rechnung.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const SceneOne: React.FC = () => {
  const frame = useCurrentFrame();
  const line1Op = interpolate(frame, [10, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line1Slide = interpolate(frame, [10, 25], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut });
  const numOp = interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const numScale = interpolate(frame, [50, 65], [1.4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut });

  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", gap: 30, padding: `0 ${SAFE.side + 40}px`,
      }}>
        <div style={{
          fontFamily: FONT, fontWeight: 500, fontSize: 34, color: C.muted,
          opacity: line1Op, transform: `translateY(${line1Slide}px)`,
        }}>
          Ein Mitarbeiter. Minimum.
        </div>
        <div style={{
          fontFamily: FONT, fontWeight: 900, fontSize: 120, color: C.dark,
          opacity: numOp, transform: `scale(${numScale})`,
        }}>
          CHF 60'000
        </div>
        <div style={{
          fontFamily: FONT, fontWeight: 400, fontSize: 26, color: C.muted,
          opacity: numOp,
        }}>
          /Jahr
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

const SceneExtras: React.FC = () => {
  const frame = useCurrentFrame();
  const items = ["Sozialabgaben", "Büro", "Laptop", "Software"];

  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", gap: 16, padding: `0 ${SAFE.side + 40}px`,
      }}>
        <div style={{
          fontFamily: FONT, fontWeight: 500, fontSize: 28, color: C.muted,
          marginBottom: 20,
        }}>
          Plus:
        </div>
        {items.map((item, i) => {
          const op = interpolate(frame, [15 + i * 20, 30 + i * 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              fontFamily: FONT, fontWeight: 600, fontSize: 36, color: C.dark,
              opacity: op,
            }}>
              + {item}
            </div>
          );
        })}
        <div style={{
          fontFamily: FONT, fontWeight: 900, fontSize: 56, color: C.orange,
          marginTop: 24,
          opacity: interpolate(frame, [100, 115], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          + CHF 20'000
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

const SceneTotal1: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.white }}>
    <AbsoluteFill style={{
      display: "flex", flexDirection: "column", justifyContent: "center",
      alignItems: "center", gap: 16,
    }}>
      <AnimNumber value="CHF 80'000" fontSize={100} color={C.red} sub="Für eine Person." />
    </AbsoluteFill>
    <Grain />
  </AbsoluteFill>
);

const SceneTimes4: React.FC = () => {
  const frame = useCurrentFrame();
  const multOp = interpolate(frame, [10, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const totalOp = interpolate(frame, [60, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const totalScale = interpolate(frame, [60, 75], [1.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut });

  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      <Footage src="footage/office-meeting-bright.mp4" brightness={1.15} blur={5} overlay={0.4} />
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", gap: 24,
      }}>
        <div style={{
          fontFamily: FONT, fontWeight: 500, fontSize: 36, color: C.muted,
          opacity: multOp, textShadow: "0 2px 10px rgba(255,255,255,0.8)",
        }}>
          × 4 Mitarbeiter
        </div>
        <div style={{
          fontFamily: FONT, fontWeight: 900, fontSize: 110, color: C.red,
          opacity: totalOp, transform: `scale(${totalScale})`,
          textShadow: "0 2px 20px rgba(255,255,255,0.8)",
        }}>
          CHF 320'000
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

const SceneOr: React.FC = () => {
  const frame = useCurrentFrame();
  const orOp = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const priceOp = interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const priceScale = interpolate(frame, [50, 65], [1.4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut });

  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", gap: 28,
      }}>
        <div style={{
          fontFamily: FONT, fontWeight: 500, fontSize: 42, color: C.muted,
          opacity: orOp,
        }}>
          Oder.
        </div>
        <div style={{
          fontFamily: FONT, fontWeight: 900, fontSize: 140, color: C.primary,
          opacity: priceOp, transform: `scale(${priceScale})`,
        }}>
          CHF 49
        </div>
        <div style={{
          fontFamily: FONT, fontWeight: 500, fontSize: 30, color: C.muted,
          opacity: priceOp,
        }}>
          /Monat · 4 AI Agents
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

const SceneSplit: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeOp = interpolate(frame, [80, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Footage src="footage/laptop-cafe-window.mp4" brightness={1.15} blur={2} overlay={0.15} />
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", gap: 20, opacity: op,
      }}>
        <div style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 48, color: C.dark,
          textAlign: "center", textShadow: "0 2px 15px rgba(255,255,255,0.9)",
        }}>
          Gleiche Arbeit.
        </div>
        <div style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 48, color: C.primary,
          textShadow: "0 2px 15px rgba(255,255,255,0.9)",
        }}>
          1% der Kosten.
        </div>
        <div style={{
          marginTop: 20, padding: "14px 32px", borderRadius: 100,
          backgroundColor: `${C.emerald}15`, border: `2px solid ${C.emerald}`,
          fontFamily: FONT, fontWeight: 700, fontSize: 26, color: C.emerald,
          opacity: badgeOp,
        }}>
          6'500× günstiger
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

const SceneScarcity: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Footage src="footage/person-relaxed-work.mp4" brightness={1.15} blur={3} overlay={0.2} />
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", gap: 16, opacity: op,
      }}>
        <div style={{
          fontFamily: FONT, fontWeight: 600, fontSize: 42, color: C.dark,
          textAlign: "center", textShadow: "0 2px 15px rgba(255,255,255,0.9)",
        }}>
          200 Gründer testen es gerade.
        </div>
        <div style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 34, color: C.orange,
          marginTop: 8,
        }}>
          Plätze gehen schnell.
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

const SceneCloser: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOp = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const urlOp = interpolate(frame, [45, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", gap: 18,
      }}>
        <div style={{
          width: 90, height: 90, borderRadius: 22, backgroundColor: C.primary,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: logoOp, boxShadow: `0 8px 40px ${C.primary}20`,
        }}>
          <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 48, color: C.white }}>K</div>
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 48, color: C.dark, opacity: logoOp }}>KaderOS</div>
        <div style={{
          fontFamily: FONT, fontWeight: 600, fontSize: 30, color: C.primary,
          opacity: urlOp, marginTop: 8,
        }}>
          kaderos.io — Platz sichern.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

export const T9_EhrlicheRechnung: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.white }}>
    <Sequence from={S.hook.start} durationInFrames={S.hook.end - S.hook.start}><SceneHook /></Sequence>
    <Sequence from={S.one.start} durationInFrames={S.one.end - S.one.start}><SceneOne /></Sequence>
    <Sequence from={S.extras.start} durationInFrames={S.extras.end - S.extras.start}><SceneExtras /></Sequence>
    <Sequence from={S.total1.start} durationInFrames={S.total1.end - S.total1.start}><SceneTotal1 /></Sequence>
    <Sequence from={S.times4.start} durationInFrames={S.times4.end - S.times4.start}><SceneTimes4 /></Sequence>
    <Sequence from={S.or.start} durationInFrames={S.or.end - S.or.start}><SceneOr /></Sequence>
    <Sequence from={S.split.start} durationInFrames={S.split.end - S.split.start}><SceneSplit /></Sequence>
    <Sequence from={S.scarcity.start} durationInFrames={S.scarcity.end - S.scarcity.start}><SceneScarcity /></Sequence>
    <Sequence from={S.closer.start} durationInFrames={S.closer.end - S.closer.start}><SceneCloser /></Sequence>
    <Audio src={staticFile("audio/voiceover/voiceover-rechnung.mp3")} volume={0.9} />
    <Audio
      src={staticFile("audio/bg-music-rechnung.mp3")}
      volume={(f) => {
        const fadeIn = interpolate(f, [0, 120], [0, 0.25], { extrapolateRight: "clamp" });
        const fadeOut = interpolate(f, [TOTAL_FRAMES - 120, TOTAL_FRAMES], [0.25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return Math.min(fadeIn, fadeOut);
      }}
    />
  </AbsoluteFill>
);
