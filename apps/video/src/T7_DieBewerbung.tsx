import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Sequence,
  OffthreadVideo,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";

// ─── CONSTANTS ───────────────────────────────────────────────

const C = {
  bg: "#FAFAFA",
  dark: "#1A1A1A",
  muted: "#777777",
  primary: "#000088",
  cyan: "#0891B2",
  emerald: "#059669",
  orange: "#E67E22",
  purple: "#6C3AC8",
  white: "#FFFFFF",
  accent: "#000088",
};

const FONT = "Outfit, -apple-system, system-ui, sans-serif";
const MONO = "JetBrains Mono, SF Mono, Menlo, monospace";
const FPS = 60;
const TOTAL_FRAMES = 2640; // 44s (voice=41.3s + buffer)

const S = {
  hook:     { start: 0,    end: 210 },    // 0-3.5s
  resume1:  { start: 210,  end: 570 },    // 3.5-9.5s
  resume2:  { start: 570,  end: 930 },    // 9.5-15.5s
  dashboard:{ start: 930,  end: 1260 },   // 15.5-21s
  convince: { start: 1260, end: 1560 },   // 21-26s
  agents:   { start: 1560, end: 1920 },   // 26-32s
  scarcity: { start: 1920, end: 2220 },   // 32-37s
  closer:   { start: 2220, end: 2640 },   // 37-44s
} as const;

// ─── HELPERS ─────────────────────────────────────────────────

const hardOut = (t: number) => 1 - Math.pow(1 - t, 3);
const SAFE = { top: 216, bottom: 288, side: 65 };

const pseudoRandom = (seed: number): number => {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// ─── FOOTAGE LAYER (BRIGHT) ─────────────────────────────────

const BrightFootage: React.FC<{
  src: string;
  brightness?: number;
  blur?: number;
  overlay?: number;
}> = ({ src, brightness = 1.1, blur = 0, overlay = 0.15 }) => {
  const frame = useCurrentFrame();
  const scale = 1 + frame * 0.00008;
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(src)}
        style={{
          width: "110%", height: "110%", objectFit: "cover",
          marginLeft: "-5%", marginTop: "-5%",
          filter: `brightness(${brightness})${blur > 0 ? ` blur(${blur}px)` : ""}`,
          transform: `scale(${scale})`,
        }}
        volume={0}
      />
      <AbsoluteFill style={{ backgroundColor: C.white, opacity: overlay }} />
    </AbsoluteFill>
  );
};

// ─── SUBTLE GRAIN ────────────────────────────────────────────

const SubtleGrain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame * 1.5) % 100;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.03 }}>
      <svg width="100%" height="100%">
        <filter id="sg">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed={seed} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sg)" />
      </svg>
    </AbsoluteFill>
  );
};

// ─── PARTICLES (BRIGHT) ─────────────────────────────────────

const BrightParticles: React.FC<{ count?: number }> = ({ count = 15 }) => {
  const frame = useCurrentFrame();
  const particles = React.useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      x: pseudoRandom(i * 31) * 1080,
      y: pseudoRandom(i * 47) * 1920,
      size: 3 + pseudoRandom(i * 59) * 5,
      speed: 0.2 + pseudoRandom(i * 73) * 0.5,
      opacity: 0.08 + pseudoRandom(i * 89) * 0.15,
    })),
    [count],
  );
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: p.x + Math.sin(frame * 0.015 + i) * 20,
          top: ((p.y - frame * p.speed) % 1920 + 1920) % 1920,
          width: p.size, height: p.size, borderRadius: "50%",
          backgroundColor: C.primary, opacity: p.opacity,
        }} />
      ))}
    </AbsoluteFill>
  );
};

// ─── RESUME LINE COMPONENT ───────────────────────────────────

const ResumeLine: React.FC<{
  label: string;
  value: string;
  frame: number;
  delay: number;
  valueColor?: string;
}> = ({ label, value, frame, delay, valueColor = C.dark }) => {
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const slideX = interpolate(frame, [delay, delay + 15], [30, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut,
  });
  return (
    <div style={{
      opacity, transform: `translateX(${slideX}px)`,
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      padding: "16px 0", borderBottom: `1px solid ${C.dark}10`,
    }}>
      <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: 28, color: C.muted }}>
        {label}
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 32, color: valueColor }}>
        {value}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENES
// ═══════════════════════════════════════════════════════════════

const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const textOp = interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textSlide = interpolate(frame, [20, 35], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <BrightFootage src="footage/resume-desk.mp4" brightness={1.15} blur={2} overlay={0.2} />
      <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 68, color: C.dark,
          textAlign: "center", opacity: textOp, transform: `translateY(${textSlide}px)`,
          padding: `0 ${SAFE.side + 30}px`,
          textShadow: "0 2px 20px rgba(255,255,255,0.8)",
        }}>
          Stell dir vor, du kriegst eine Bewerbung.
        </div>
      </AbsoluteFill>
      <SubtleGrain />
    </AbsoluteFill>
  );
};

const SceneResume1: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <BrightFootage src="footage/coffee-shop-laptop.mp4" brightness={1.1} blur={6} overlay={0.4} />
      <AbsoluteFill style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        padding: `0 ${SAFE.side + 40}px`,
      }}>
        <div style={{
          backgroundColor: `${C.white}E0`, borderRadius: 24, padding: "40px 48px",
          width: "100%", backdropFilter: "blur(20px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
        }}>
          <div style={{
            fontFamily: MONO, fontSize: 16, color: C.muted, marginBottom: 24,
            textTransform: "uppercase", letterSpacing: "0.2em",
          }}>
            Bewerbung
          </div>
          <ResumeLine label="Berufserfahrung" value="∞" frame={frame} delay={15} valueColor={C.primary} />
          <ResumeLine label="Krankheitstage" value="0" frame={frame} delay={40} valueColor={C.emerald} />
          <ResumeLine label="Gehaltsvorstellung" value="CHF 49" frame={frame} delay={65} valueColor={C.primary} />
        </div>
      </AbsoluteFill>
      <SubtleGrain />
    </AbsoluteFill>
  );
};

const SceneResume2: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <BrightFootage src="footage/coffee-shop-laptop.mp4" brightness={1.1} blur={6} overlay={0.4} />
      <AbsoluteFill style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        padding: `0 ${SAFE.side + 40}px`,
      }}>
        <div style={{
          backgroundColor: `${C.white}E0`, borderRadius: 24, padding: "40px 48px",
          width: "100%", backdropFilter: "blur(20px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
        }}>
          <div style={{
            fontFamily: MONO, fontSize: 16, color: C.muted, marginBottom: 24,
            textTransform: "uppercase", letterSpacing: "0.2em",
          }}>
            Bewerbung
          </div>
          <ResumeLine label="Verfügbarkeit" value="24/7" frame={frame} delay={10} valueColor={C.primary} />
          <ResumeLine label="Sprachen" value="Alle" frame={frame} delay={35} valueColor={C.cyan} />
          <ResumeLine label="Kündigung" value="Unmöglich" frame={frame} delay={60} valueColor={C.emerald} />
          <ResumeLine label="Urlaub" value="Nicht nötig" frame={frame} delay={85} valueColor={C.orange} />
        </div>
      </AbsoluteFill>
      <SubtleGrain />
    </AbsoluteFill>
  );
};

const SceneDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const AGENTS = [
    { name: "Max", role: "CTO", color: C.cyan, emoji: "🧠" },
    { name: "Aura", role: "CMO", color: C.emerald, emoji: "📢" },
    { name: "Vega", role: "CFO", color: C.orange, emoji: "📊" },
    { name: "Orion", role: "CEO", color: C.purple, emoji: "🎯" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <BrightFootage src="footage/person-smiling-laptop.mp4" brightness={1.1} blur={8} overlay={0.5} />
      <AbsoluteFill style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        padding: `${SAFE.top}px ${SAFE.side + 20}px ${SAFE.bottom}px`,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, width: "100%" }}>
          {AGENTS.map((a, i) => {
            const delay = 15 + i * 25;
            const op = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const slide = interpolate(frame, [delay, delay + 12], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut });
            const pulse = 0.5 + Math.sin(frame * 0.1 + i * 1.5) * 0.5;
            return (
              <div key={i} style={{
                backgroundColor: C.white, borderRadius: 16, padding: 22,
                opacity: op, transform: `translateY(${slide}px)`,
                borderLeft: `4px solid ${a.color}`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{a.emoji}</span>
                  <div>
                    <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 20, color: C.dark }}>{a.name}</div>
                    <div style={{ fontFamily: FONT, fontSize: 14, color: C.muted }}>{a.role}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: a.color, opacity: pulse }} />
                  <div style={{ fontFamily: MONO, fontSize: 12, color: a.color }}>ONLINE</div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <SubtleGrain />
    </AbsoluteFill>
  );
};

const SceneConvince: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <BrightFootage src="footage/person-smiling-laptop.mp4" brightness={1.15} blur={3} overlay={0.15} />
      <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          fontFamily: FONT, fontWeight: 600, fontSize: 52, color: C.dark,
          textAlign: "center", opacity: op, padding: `0 ${SAFE.side + 40}px`,
          lineHeight: 1.4, textShadow: "0 2px 15px rgba(255,255,255,0.9)",
        }}>
          Du würdest sofort zusagen.
        </div>
      </AbsoluteFill>
      <SubtleGrain />
    </AbsoluteFill>
  );
};

const SceneAgents: React.FC = () => {
  const frame = useCurrentFrame();
  const priceOp = interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const priceScale = interpolate(frame, [20, 35], [1.3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <BrightFootage src="footage/city-walking-sun.mp4" brightness={1.15} blur={4} overlay={0.25} />
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 24,
      }}>
        <div style={{
          fontFamily: FONT, fontWeight: 400, fontSize: 30, color: C.muted,
          opacity: priceOp, textShadow: "0 2px 10px rgba(255,255,255,0.8)",
        }}>
          CEO · CTO · CMO · CFO
        </div>
        <div style={{
          fontFamily: FONT, fontWeight: 900, fontSize: 120, color: C.primary,
          opacity: priceOp, transform: `scale(${priceScale})`,
          textShadow: `0 0 60px ${C.primary}22`,
        }}>
          CHF 49
        </div>
        <div style={{
          fontFamily: FONT, fontWeight: 500, fontSize: 28, color: C.muted,
          opacity: priceOp,
        }}>
          /Monat
        </div>
      </AbsoluteFill>
      <SubtleGrain />
    </AbsoluteFill>
  );
};

const SceneScarcity: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulseScale = 1 + Math.sin(frame * 0.08) * 0.015;
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <BrightFootage src="footage/city-walking-sun.mp4" brightness={1.1} blur={5} overlay={0.3} />
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20,
      }}>
        <div style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 56, color: C.dark,
          opacity: op, textAlign: "center", textShadow: "0 2px 15px rgba(255,255,255,0.9)",
        }}>
          200 Plätze.
        </div>
        <div style={{
          fontFamily: FONT, fontWeight: 600, fontSize: 36, color: C.orange,
          opacity: op, transform: `scale(${pulseScale})`,
        }}>
          Die Hälfte ist schon weg.
        </div>
      </AbsoluteFill>
      <SubtleGrain />
    </AbsoluteFill>
  );
};

const SceneCloser: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOp = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const nameOp = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagOp = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const urlOp = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [260, 300], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      <AbsoluteFill style={{
        background: `radial-gradient(circle at 50% 40%, ${C.primary}08 0%, transparent 50%)`,
      }} />
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", gap: 18, opacity: fadeOut,
      }}>
        <div style={{
          width: 100, height: 100, borderRadius: 24, backgroundColor: C.primary,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: logoOp, boxShadow: `0 8px 40px ${C.primary}20`,
        }}>
          <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 54, color: C.white }}>K</div>
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 52, color: C.dark, opacity: nameOp }}>
          KaderOS
        </div>
        <div style={{
          fontFamily: FONT, fontWeight: 400, fontSize: 26, color: C.muted,
          opacity: tagOp, textAlign: "center", padding: `0 ${SAFE.side + 40}px`,
        }}>
          Dein nächster Mitarbeiter ist kein Mensch.
        </div>
        <div style={{
          fontFamily: FONT, fontWeight: 600, fontSize: 30, color: C.primary,
          opacity: urlOp, marginTop: 20,
        }}>
          kaderos.io
        </div>
      </AbsoluteFill>
      <BrightParticles count={12} />
      <SubtleGrain />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// AUDIO
// ═══════════════════════════════════════════════════════════════

const AudioLayer: React.FC = () => (
  <>
    <Audio src={staticFile("audio/voiceover/voiceover-bewerbung.mp3")} volume={0.9} />
    <Audio
      src={staticFile("audio/bg-music-bewerbung.mp3")}
      volume={(f) => {
        const fadeIn = interpolate(f, [0, 120], [0, 0.25], { extrapolateRight: "clamp" });
        const fadeOut = interpolate(f, [TOTAL_FRAMES - 180, TOTAL_FRAMES], [0.25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return Math.min(fadeIn, fadeOut);
      }}
    />
  </>
);

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

export const T7_DieBewerbung: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Sequence from={S.hook.start} durationInFrames={S.hook.end - S.hook.start}><SceneHook /></Sequence>
    <Sequence from={S.resume1.start} durationInFrames={S.resume1.end - S.resume1.start}><SceneResume1 /></Sequence>
    <Sequence from={S.resume2.start} durationInFrames={S.resume2.end - S.resume2.start}><SceneResume2 /></Sequence>
    <Sequence from={S.dashboard.start} durationInFrames={S.dashboard.end - S.dashboard.start}><SceneDashboard /></Sequence>
    <Sequence from={S.convince.start} durationInFrames={S.convince.end - S.convince.start}><SceneConvince /></Sequence>
    <Sequence from={S.agents.start} durationInFrames={S.agents.end - S.agents.start}><SceneAgents /></Sequence>
    <Sequence from={S.scarcity.start} durationInFrames={S.scarcity.end - S.scarcity.start}><SceneScarcity /></Sequence>
    <Sequence from={S.closer.start} durationInFrames={S.closer.end - S.closer.start}><SceneCloser /></Sequence>
    <AudioLayer />
  </AbsoluteFill>
);
