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
  cyan: "#0891B2",
  emerald: "#059669",
  orange: "#E67E22",
  purple: "#6C3AC8",
  white: "#FFFFFF",
};

const FONT = "Outfit, -apple-system, system-ui, sans-serif";
const MONO = "JetBrains Mono, SF Mono, Menlo, monospace";
const TOTAL_FRAMES = 2340; // 39s (voice=35.6s + buffer)
const hardOut = (t: number) => 1 - Math.pow(1 - t, 3);
const SAFE = { top: 216, bottom: 288, side: 65 };

const pseudoRandom = (seed: number): number => {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const S = {
  sleep:    { start: 0,    end: 210 },    // 0-3.5s
  cto:      { start: 210,  end: 420 },    // 3.5-7s
  cmo:      { start: 420,  end: 630 },    // 7-10.5s
  cfo:      { start: 630,  end: 840 },    // 10.5-14s
  ceo:      { start: 840,  end: 1050 },   // 14-17.5s
  wakeUp:   { start: 1050, end: 1290 },   // 17.5-21.5s
  allDone:  { start: 1290, end: 1560 },   // 21.5-26s
  noMeeting:{ start: 1560, end: 1800 },   // 26-30s
  cta:      { start: 1800, end: 2040 },   // 30-34s
  closer:   { start: 2040, end: 2340 },   // 34-39s
} as const;

// ─── FOOTAGE ─────────────────────────────────────────────────

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
        <filter id="g8"><feTurbulence type="fractalNoise" baseFrequency="0.9" seed={frame % 80} /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#g8)" />
      </svg>
    </AbsoluteFill>
  );
};

// ─── TIME DISPLAY ────────────────────────────────────────────

const TimeDisplay: React.FC<{ time: string; dark?: boolean }> = ({ time, dark = false }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [10, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", top: SAFE.top + 40, left: 0, right: 0,
      display: "flex", justifyContent: "center", opacity: op,
    }}>
      <div style={{
        fontFamily: MONO, fontWeight: 700, fontSize: 72, color: dark ? C.dark : C.white,
        letterSpacing: "0.1em", textShadow: dark ? "none" : "0 2px 20px rgba(0,0,0,0.3)",
      }}>
        {time}
      </div>
    </div>
  );
};

// ─── AGENT CARD ──────────────────────────────────────────────

const AgentAction: React.FC<{
  emoji: string; name: string; role: string; action: string; color: string;
}> = ({ emoji, name, role, action, color }) => {
  const frame = useCurrentFrame();
  const cardOp = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardSlide = interpolate(frame, [30, 50], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut });
  const actionOp = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      padding: `0 ${SAFE.side + 30}px`,
    }}>
      <div style={{
        backgroundColor: `${C.white}F0`, borderRadius: 20, padding: "36px 40px",
        width: "100%", opacity: cardOp, transform: `translateY(${cardSlide}px)`,
        borderLeft: `5px solid ${color}`, boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
        backdropFilter: "blur(16px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 36 }}>{emoji}</span>
          <div>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 28, color: C.dark }}>{name}</div>
            <div style={{ fontFamily: FONT, fontSize: 18, color: C.muted }}>{role}</div>
          </div>
          <div style={{
            marginLeft: "auto", fontFamily: MONO, fontSize: 13, color: color,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
            ACTIVE
          </div>
        </div>
        <div style={{
          fontFamily: FONT, fontWeight: 500, fontSize: 24, color: C.dark,
          opacity: actionOp, lineHeight: 1.5,
        }}>
          {action}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENES
// ═══════════════════════════════════════════════════════════════

const SceneSleep: React.FC = () => {
  const frame = useCurrentFrame();
  const textOp = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <Footage src="footage/bedroom-night.mp4" brightness={0.7} overlay={0.1} />
      <TimeDisplay time="03:00" />
      <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          fontFamily: FONT, fontWeight: 600, fontSize: 56, color: C.white,
          opacity: textOp, textShadow: "0 2px 30px rgba(0,0,0,0.5)",
        }}>
          Du schläfst.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const SceneCTO: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Footage src="footage/coding-screen.mp4" brightness={1.0} blur={4} overlay={0.3} />
    <AgentAction emoji="🧠" name="Max" role="CTO" action="3 Bugs gefixt. Update deployed. Tests grün." color={C.cyan} />
    <Grain />
  </AbsoluteFill>
);

const SceneCMO: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Footage src="footage/coffee-shop-laptop.mp4" brightness={1.15} blur={4} overlay={0.3} />
    <AgentAction emoji="📢" name="Aura" role="CMO" action="5 Posts geplant. Kampagne optimiert. Analytics steigen." color={C.emerald} />
    <Grain />
  </AbsoluteFill>
);

const SceneCFO: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Footage src="footage/laptop-cafe-window.mp4" brightness={1.1} blur={4} overlay={0.3} />
    <AgentAction emoji="📊" name="Vega" role="CFO" action="Buchhaltung erledigt. Alle Rechnungen raus." color={C.orange} />
    <Grain />
  </AbsoluteFill>
);

const SceneCEO: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Footage src="footage/person-relaxed-work.mp4" brightness={1.1} blur={4} overlay={0.3} />
    <AgentAction emoji="🎯" name="Orion" role="CEO" action="Plan für morgen steht. KPIs alle grün." color={C.purple} />
    <Grain />
  </AbsoluteFill>
);

const SceneWakeUp: React.FC = () => {
  const frame = useCurrentFrame();
  const textOp = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Footage src="footage/sunrise-city.mp4" brightness={1.2} overlay={0.1} />
      <TimeDisplay time="06:00" dark />
      <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          fontFamily: FONT, fontWeight: 600, fontSize: 52, color: C.dark,
          opacity: textOp, textShadow: "0 2px 20px rgba(255,255,255,0.8)",
        }}>
          Du wachst auf.
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

const SceneAllDone: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const notifications = [
    { text: "Max: Update deployed ✓", color: C.cyan },
    { text: "Aura: 5 Posts live ✓", color: C.emerald },
    { text: "Vega: Rechnungen bezahlt ✓", color: C.orange },
    { text: "Orion: Tagesplan steht ✓", color: C.purple },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Footage src="footage/person-waking-up.mp4" brightness={1.2} blur={5} overlay={0.35} />
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", gap: 14, padding: `0 ${SAFE.side + 40}px`,
      }}>
        <div style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 44, color: C.dark,
          marginBottom: 20, opacity: op, textShadow: "0 2px 15px rgba(255,255,255,0.9)",
        }}>
          Alles erledigt.
        </div>
        {notifications.map((n, i) => {
          const nOp = interpolate(frame, [40 + i * 20, 55 + i * 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const nSlide = interpolate(frame, [40 + i * 20, 55 + i * 20], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut });
          return (
            <div key={i} style={{
              backgroundColor: `${C.white}E0`, borderRadius: 12, padding: "14px 24px",
              width: "100%", opacity: nOp, transform: `translateX(${nSlide}px)`,
              borderLeft: `3px solid ${n.color}`, backdropFilter: "blur(10px)",
            }}>
              <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 22, color: C.dark }}>
                {n.text}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

const SceneNoMeeting: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Footage src="footage/morning-coffee-laptop.mp4" brightness={1.15} blur={2} overlay={0.15} />
      <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          fontFamily: FONT, fontWeight: 600, fontSize: 46, color: C.dark,
          textAlign: "center", opacity: op, lineHeight: 1.5,
          padding: `0 ${SAFE.side + 40}px`,
          textShadow: "0 2px 15px rgba(255,255,255,0.9)",
        }}>
          Kein Team-Meeting.{"\n"}Keine E-Mails.{"\n"}Keine Überraschungen.
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [10, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(frame, [10, 25], [1.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Footage src="footage/sunrise-city.mp4" brightness={1.2} blur={6} overlay={0.3} />
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", gap: 16,
      }}>
        <div style={{
          fontFamily: FONT, fontWeight: 900, fontSize: 100, color: C.primary,
          opacity: op, transform: `scale(${scale})`,
        }}>
          CHF 49
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 28, color: C.muted, opacity: op }}>
          /Monat · 200 Plätze
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

const SceneCloser: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOp = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const nameOp = interpolate(frame, [40, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const urlOp = interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
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
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 48, color: C.dark, opacity: nameOp }}>KaderOS</div>
        <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 28, color: C.primary, opacity: urlOp }}>kaderos.io</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

export const T8_DreiUhrMorgens: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Sequence from={S.sleep.start} durationInFrames={S.sleep.end - S.sleep.start}><SceneSleep /></Sequence>
    <Sequence from={S.cto.start} durationInFrames={S.cto.end - S.cto.start}><SceneCTO /></Sequence>
    <Sequence from={S.cmo.start} durationInFrames={S.cmo.end - S.cmo.start}><SceneCMO /></Sequence>
    <Sequence from={S.cfo.start} durationInFrames={S.cfo.end - S.cfo.start}><SceneCFO /></Sequence>
    <Sequence from={S.ceo.start} durationInFrames={S.ceo.end - S.ceo.start}><SceneCEO /></Sequence>
    <Sequence from={S.wakeUp.start} durationInFrames={S.wakeUp.end - S.wakeUp.start}><SceneWakeUp /></Sequence>
    <Sequence from={S.allDone.start} durationInFrames={S.allDone.end - S.allDone.start}><SceneAllDone /></Sequence>
    <Sequence from={S.noMeeting.start} durationInFrames={S.noMeeting.end - S.noMeeting.start}><SceneNoMeeting /></Sequence>
    <Sequence from={S.cta.start} durationInFrames={S.cta.end - S.cta.start}><SceneCTA /></Sequence>
    <Sequence from={S.closer.start} durationInFrames={S.closer.end - S.closer.start}><SceneCloser /></Sequence>
    <Audio src={staticFile("audio/voiceover/voiceover-morgens.mp3")} volume={0.9} />
    <Audio
      src={staticFile("audio/bg-music-morgens.mp3")}
      volume={(f) => {
        const fadeIn = interpolate(f, [0, 180], [0, 0.25], { extrapolateRight: "clamp" });
        const fadeOut = interpolate(f, [TOTAL_FRAMES - 180, TOTAL_FRAMES], [0.25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return Math.min(fadeIn, fadeOut);
      }}
    />
  </AbsoluteFill>
);
