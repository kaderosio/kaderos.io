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
  bg: "#0A0A0A",
  red1: "#FF4444",
  red2: "#FF2D2D",
  red3: "#DC0000",
  red4: "#AA0000",
  green: "#00FF88",
  white: "#FFFFFF",
  muted: "#888888",
  label: "#666666",
  primary: "#000088",
  cyan: "#0891B2",
  emerald: "#059669",
  orange: "#E67E22",
  purple: "#6C3AC8",
  card: "#111111",
};

const FONT = "Outfit, -apple-system, system-ui, sans-serif";
const MONO = "JetBrains Mono, SF Mono, Menlo, monospace";
const FPS = 60;

// ─── SCENE TIMINGS (38s @ 60fps = 2280 frames) ──────────────
// Synced to ElevenLabs voiceover timing

const S = {
  coldOpen:  { start: 0,    end: 120 },    // 0-2s
  rechnung:  { start: 120,  end: 1140 },   // 2-19s
  overload:  { start: 1140, end: 1320 },   // 19-22s
  blackout:  { start: 1320, end: 1470 },   // 22-24.5s
  command:   { start: 1470, end: 1920 },   // 24.5-32s
  explosion: { start: 1920, end: 2160 },   // 32-36s
  price:     { start: 2160, end: 2640 },   // 36-44s
  closer:    { start: 2640, end: 3180 },   // 44-53s
} as const;

const TOTAL_FRAMES = 3180; // 53s @ 60fps

// ─── COST DATA (synced to voiceover) ─────────────────────────

const COSTS = [
  { role: "CEO",   cost: "CHF 220'000", startSec: 2.0,  endSec: 5.0,  size: 110, red: C.red1, footage: "footage/money-stress.mp4" },
  { role: "CTO",   cost: "CHF 180'000", startSec: 5.0,  endSec: 9.5,  size: 120, red: C.red1, footage: "footage/laptop-dark.mp4" },
  { role: "CMO",   cost: "CHF 150'000", startSec: 10.6, endSec: 13.4, size: 130, red: C.red2, footage: "footage/contracts.mp4" },
  { role: "CFO",   cost: "CHF 140'000", startSec: 14.5, endSec: 17.0, size: 140, red: C.red3, footage: "footage/calculator.mp4" },
  { role: "TOTAL", cost: "CHF 588'000", startSec: 17.0, endSec: 19.0, size: 160, red: C.red4, footage: "footage/clock-pressure.mp4",
    suffix: "/Jahr" },
];

// ─── AGENTS ──────────────────────────────────────────────────

const AGENTS = [
  { name: "Max", role: "CTO", color: C.cyan, emoji: "🧠" },
  { name: "Aura", role: "CMO", color: C.emerald, emoji: "📢" },
  { name: "Vega", role: "CFO", color: C.orange, emoji: "📊" },
  { name: "Orion", role: "CEO", color: C.purple, emoji: "🎯" },
];

// ─── HELPERS ─────────────────────────────────────────────────

const pseudoRandom = (seed: number): number => {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const hardOut = (t: number) => 1 - Math.pow(1 - t, 3);

const shake = (
  frame: number, startFrame: number, amplitude: number, decayFrames: number,
): { x: number; y: number } => {
  const elapsed = frame - startFrame;
  if (elapsed < 0 || elapsed > decayFrames) return { x: 0, y: 0 };
  const decay = 1 - elapsed / decayFrames;
  return {
    x: (pseudoRandom(elapsed * 13) * 2 - 1) * amplitude * decay,
    y: (pseudoRandom(elapsed * 17 + 5) * 2 - 1) * amplitude * decay,
  };
};

const secToFrame = (sec: number) => Math.round(sec * FPS);

// ─── SAFE ZONES ──────────────────────────────────────────────

const SAFE = { top: 216, bottom: 288, side: 65 };

// ─── FILM GRAIN ──────────────────────────────────────────────

const FilmGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.1 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame * 1.5) % 100;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay" }}>
      <svg width="100%" height="100%" style={{ position: "absolute" }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" opacity={opacity} />
      </svg>
    </AbsoluteFill>
  );
};

// ─── VIGNETTE ────────────────────────────────────────────────

const Vignette: React.FC<{ intensity?: number; color?: string }> = ({
  intensity = 0.6, color = "black",
}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at center, transparent 40%, ${color} 100%)`,
      opacity: intensity,
      pointerEvents: "none",
    }}
  />
);

// ─── CINEMATIC FOOTAGE LAYER ─────────────────────────────────

const CinematicFootage: React.FC<{
  src: string;
  blur?: number;
  darkness?: number;
  scale?: number;
  panX?: number;
}> = ({ src, blur = 0, darkness = 0.5, scale = 1.05, panX = 0 }) => {
  const frame = useCurrentFrame();
  // Slow Ken Burns pan
  const kenBurns = 1 + (scale - 1) * (frame / 300);
  const panOffset = panX * (frame / 300);

  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(src)}
        style={{
          width: "110%",
          height: "110%",
          objectFit: "cover",
          marginLeft: "-5%",
          marginTop: "-5%",
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
          transform: `scale(${kenBurns}) translateX(${panOffset}px)`,
        }}
        volume={0}
      />
      <AbsoluteFill style={{ backgroundColor: C.bg, opacity: darkness }} />
    </AbsoluteFill>
  );
};

// ─── GLITCH FLASH ────────────────────────────────────────────

const GlitchFlash: React.FC<{ triggerFrame: number }> = ({ triggerFrame }) => {
  const frame = useCurrentFrame();
  const elapsed = frame - triggerFrame;
  if (elapsed < 0 || elapsed > 3) return null;
  const opacity = elapsed === 1 ? 0.7 : 0.2;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.white,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

// ─── CHROMATIC TEXT ───────────────────────────────────────────

const ChromaticText: React.FC<{
  children: string;
  style: React.CSSProperties;
  offset?: number;
}> = ({ children, style, offset = 2 }) => (
  <div style={{ position: "relative" }}>
    <div style={{ ...style, color: "#FF0000", position: "absolute", transform: `translate(${-offset}px, 0)`, opacity: 0.7, mixBlendMode: "screen" as const }}>{children}</div>
    <div style={{ ...style, color: "#0000FF", position: "absolute", transform: `translate(${offset}px, 0)`, opacity: 0.7, mixBlendMode: "screen" as const }}>{children}</div>
    <div style={{ ...style, position: "relative" }}>{children}</div>
  </div>
);

// ─── PARTICLES ───────────────────────────────────────────────

const Particles: React.FC<{ count?: number; color?: string }> = ({
  count = 25, color = C.primary,
}) => {
  const frame = useCurrentFrame();
  const particles = React.useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      x: pseudoRandom(i * 31) * 1080,
      y: pseudoRandom(i * 47) * 1920,
      size: 2 + pseudoRandom(i * 59) * 4,
      speed: 0.3 + pseudoRandom(i * 73) * 0.7,
      opacity: 0.15 + pseudoRandom(i * 89) * 0.45,
    })),
    [count],
  );
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {particles.map((p, i) => {
        const y = (p.y - frame * p.speed * 0.8) % 1920;
        const x = p.x + Math.sin(frame * 0.02 + i) * 15;
        return (
          <div key={i} style={{
            position: "absolute", left: x, top: y < 0 ? y + 1920 : y,
            width: p.size, height: p.size, borderRadius: "50%",
            backgroundColor: color, opacity: p.opacity,
          }} />
        );
      })}
    </AbsoluteFill>
  );
};

// ─── SHOCKWAVE ───────────────────────────────────────────────

const ShockwaveRing: React.FC<{
  triggerFrame: number; duration?: number; maxScale?: number; color?: string;
}> = ({ triggerFrame, duration = 30, maxScale = 3, color = C.white }) => {
  const frame = useCurrentFrame();
  const progress = (frame - triggerFrame) / duration;
  if (progress < 0 || progress > 1) return null;
  const scale = interpolate(progress, [0, 1], [0.5, maxScale]);
  const opacity = interpolate(progress, [0, 0.3, 1], [0.6, 0.4, 0]);
  return (
    <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center", pointerEvents: "none" }}>
      <div style={{ width: 200, height: 200, borderRadius: "50%", border: `3px solid ${color}`, transform: `scale(${scale})`, opacity }} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 1: COLD OPEN (0-2s = 120 frames)
// ═══════════════════════════════════════════════════════════════

const SceneColdOpen: React.FC = () => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [15, 22], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut,
  });
  const flashOpacity = interpolate(frame, [15, 17, 22], [0, 0.7, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <CinematicFootage src="footage/founder-alone.mp4" darkness={0.25} scale={1.08} />
      <Vignette intensity={0.3} />

      <AbsoluteFill style={{ backgroundColor: C.white, opacity: flashOpacity, pointerEvents: "none" }} />

      <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 76, color: C.white,
          textTransform: "uppercase", letterSpacing: "0.12em", opacity: textOpacity,
          textAlign: "center", padding: `0 ${SAFE.side + 30}px`,
          textShadow: "0 0 60px rgba(255,255,255,0.2), 0 4px 30px rgba(0,0,0,0.8)",
        }}>
          Du willst gründen.
        </div>
      </AbsoluteFill>

      <FilmGrain opacity={0.03} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2: DIE RECHNUNG (2-15s = 780 frames)
// ═══════════════════════════════════════════════════════════════

const SceneRechnung: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneLength = S.rechnung.end - S.rechnung.start;

  // Continuous zoom
  const zoom = interpolate(frame, [0, sceneLength], [1.0, 1.15], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <div style={{ transform: `scale(${zoom})`, width: "100%", height: "100%" }}>
        {COSTS.map((item, i) => {
          const localStart = secToFrame(item.startSec) - S.rechnung.start;
          const localEnd = secToFrame(item.endSec) - S.rechnung.start;
          const isActive = frame >= localStart;
          if (!isActive) return null;

          const entryProgress = interpolate(frame, [localStart, localStart + 10], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut,
          });
          const scale = interpolate(frame, [localStart, localStart + 10], [1.4, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut,
          });

          // Fade previous items
          const nextStart = i < COSTS.length - 1
            ? secToFrame(COSTS[i + 1].startSec) - S.rechnung.start
            : sceneLength;
          const fadeToBack = interpolate(frame, [nextStart - 15, nextStart], [1, 0.1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });

          const s = shake(frame, localStart, 8, 12);

          return (
            <AbsoluteFill key={i}>
              {/* Footage background per cost */}
              <CinematicFootage src={item.footage} darkness={0.35} blur={2} scale={1.03} panX={i % 2 === 0 ? 10 : -10} />

              <AbsoluteFill style={{
                display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "center",
                opacity: entryProgress * fadeToBack,
                transform: `scale(${scale}) translate(${s.x}px, ${s.y}px)`,
              }}>
                {/* Role label */}
                <div style={{
                  fontFamily: FONT, fontWeight: 400, fontSize: 36, color: C.label,
                  marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.25em",
                  textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                }}>
                  {item.role}
                </div>
                {/* Cost number */}
                <div style={{
                  fontFamily: FONT, fontWeight: 900, fontSize: item.size,
                  color: item.red,
                  textShadow: `0 0 80px ${item.red}55, 0 4px 30px rgba(0,0,0,0.6)`,
                }}>
                  {item.cost}
                  {item.suffix && (
                    <span style={{ fontSize: item.size * 0.4, color: C.muted, marginLeft: 8 }}>
                      {item.suffix}
                    </span>
                  )}
                </div>
              </AbsoluteFill>
            </AbsoluteFill>
          );
        })}

        {/* Glitch flashes between numbers */}
        {COSTS.slice(1).map((item, i) => (
          <GlitchFlash key={`g-${i}`} triggerFrame={secToFrame(item.startSec) - S.rechnung.start - 2} />
        ))}
      </div>

      <Vignette intensity={0.25} />
      <FilmGrain opacity={0.03} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 3: OVERLOAD (15-16.5s = 90 frames)
// ═══════════════════════════════════════════════════════════════

const SceneOverload: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneLen = 90;

  const zoom = interpolate(frame, [0, sceneLen], [1.15, 1.25], { extrapolateRight: "clamp" });
  const grainOpacity = interpolate(frame, [0, sceneLen], [0.1, 0.2], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <CinematicFootage src="footage/chaos.mp4" darkness={0.3} blur={1} />

      <div style={{ transform: `scale(${zoom})`, width: "100%", height: "100%", position: "relative" }}>
        {COSTS.map((item, i) => {
          const jitterX = (pseudoRandom(frame * 13 + i * 7) * 2 - 1) * 10;
          const jitterY = (pseudoRandom(frame * 17 + i * 11) * 2 - 1) * 10;
          const flicker = 0.3 + pseudoRandom(frame * 23 + i * 3) * 0.7;

          return (
            <AbsoluteFill key={i} style={{
              display: "flex", justifyContent: "center", alignItems: "center",
              transform: `translate(${jitterX}px, ${jitterY + (i - 2) * 70}px)`,
              opacity: flicker,
            }}>
              <ChromaticText
                style={{
                  fontFamily: FONT, fontWeight: 900, fontSize: item.size * 0.65,
                  color: item.red, textShadow: `0 0 40px ${item.red}66`,
                }}
                offset={2 + Math.sin(frame * 0.3 + i)}
              >
                {item.cost}
              </ChromaticText>
            </AbsoluteFill>
          );
        })}

        {frame % 6 < 1 && (
          <AbsoluteFill style={{
            backgroundColor: C.white,
            opacity: 0.12 + pseudoRandom(frame * 31) * 0.15,
            pointerEvents: "none",
          }} />
        )}
      </div>

      <Vignette intensity={0.3} />
      <FilmGrain opacity={0.04} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4: BLACKOUT (16.5-18s = 90 frames)
// ═══════════════════════════════════════════════════════════════

const SceneBlackout: React.FC = () => {
  const frame = useCurrentFrame();
  const cursorVisible = frame > 30 && Math.floor((frame - 30) / 15) % 2 === 0;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          fontFamily: MONO, fontSize: 36, color: C.green,
          opacity: cursorVisible ? 1 : 0,
          textShadow: `0 0 20px ${C.green}44`,
        }}>
          █
        </div>
      </AbsoluteFill>
      <FilmGrain opacity={0.03} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 5: THE COMMAND (18-23.5s = 330 frames)
// ═══════════════════════════════════════════════════════════════

const SceneCommand: React.FC = () => {
  const frame = useCurrentFrame();

  const TERMINAL_CMD = "npx kaderos onboard";
  const OUTPUT = [
    { text: "✓ Agent Max (CTO) online", color: C.cyan },
    { text: "✓ Agent Aura (CMO) online", color: C.emerald },
    { text: "✓ Agent Vega (CFO) online", color: C.orange },
    { text: "✓ Agent Orion (CEO) online", color: C.purple },
    { text: "🚀 Dein AI-Kader ist einsatzbereit.", color: C.green },
  ];

  // "Oder..." text appears first (voiceover: 18-18.9s = frames 0-54 local)
  const oderOpacity = interpolate(frame, [5, 15], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const oderFade = interpolate(frame, [50, 70], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Terminal appears at ~frame 70 (after "Oder" fades)
  const terminalOpacity = interpolate(frame, [70, 85], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const terminalScale = interpolate(frame, [70, 90], [0.95, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut,
  });

  // Typing starts at frame 90
  const typingStart = 90;
  const charsTyped = Math.min(Math.floor(Math.max(0, frame - typingStart) / 3), TERMINAL_CMD.length);
  const typedText = TERMINAL_CMD.slice(0, charsTyped);
  const isTyping = charsTyped < TERMINAL_CMD.length;
  const cursorVisible = isTyping || Math.floor(frame / 15) % 2 === 0;

  // Output lines
  const typingDone = typingStart + TERMINAL_CMD.length * 3;
  const outputLines = OUTPUT.map((line, i) => {
    const lineStart = typingDone + 15 + i * 18;
    const lineOpacity = interpolate(frame, [lineStart, lineStart + 10], [0, 1], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut,
    });
    const lineSlide = interpolate(frame, [lineStart, lineStart + 10], [15, 0], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut,
    });
    return { ...line, opacity: lineOpacity, slideX: lineSlide };
  });

  const driftX = Math.sin(frame * 0.012) * 2;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <CinematicFootage src="footage/coding-screen.mp4" darkness={0.45} blur={4} />

      {/* "Oder... ein einziger Befehl." */}
      <AbsoluteFill style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        opacity: oderOpacity * oderFade,
      }}>
        <div style={{
          fontFamily: FONT, fontWeight: 600, fontSize: 52, color: C.white,
          textAlign: "center", textShadow: "0 0 40px rgba(255,255,255,0.15)",
        }}>
          Oder... ein einziger Befehl.
        </div>
      </AbsoluteFill>

      {/* Terminal */}
      <AbsoluteFill style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        opacity: terminalOpacity, transform: `scale(${terminalScale}) translateX(${driftX}px)`,
      }}>
        <div style={{
          width: 920, background: "#0D0D0D", borderRadius: 16,
          border: `1px solid ${C.green}15`,
          boxShadow: `0 0 100px ${C.green}08, 0 30px 80px rgba(0,0,0,0.6)`,
          overflow: "hidden",
        }}>
          {/* Title bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "14px 18px", backgroundColor: "#151515", borderBottom: "1px solid #222",
          }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28C840" }} />
            <div style={{ flex: 1, textAlign: "center", fontFamily: MONO, fontSize: 13, color: "#555" }}>
              Terminal — kaderos
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "24px 28px", minHeight: 300 }}>
            <div style={{ display: "flex", fontFamily: MONO, fontSize: 26 }}>
              <span style={{ color: C.green, marginRight: 12 }}>$</span>
              <span style={{ color: C.green }}>
                {typedText}
                <span style={{ opacity: cursorVisible ? 1 : 0, color: C.green, marginLeft: 2 }}>█</span>
              </span>
            </div>

            {outputLines.map((line, i) => (
              <div key={i} style={{
                fontFamily: MONO, fontSize: 22, color: line.color,
                marginTop: i === 0 ? 24 : 12, opacity: line.opacity,
                transform: `translateX(${line.slideX}px)`,
                textShadow: `0 0 12px ${line.color}33`,
              }}>
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>

      <FilmGrain opacity={0.03} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 6: EXPLOSION (23.5-26s = 150 frames)
// ═══════════════════════════════════════════════════════════════

const SceneExplosion: React.FC = () => {
  const frame = useCurrentFrame();

  const flashOpacity = interpolate(frame, [0, 2, 8], [0, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const dashScale = interpolate(frame, [10, 45], [0.85, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad),
  });
  const dashOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const zoom = interpolate(frame, [0, 150], [1.15, 1.0], {
    extrapolateRight: "clamp", easing: Easing.out(Easing.quad),
  });
  const glowOpacity = interpolate(frame, [4, 35, 100, 150], [0, 0.35, 0.2, 0.1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <CinematicFootage src="footage/city-lights.mp4" darkness={0.4} blur={3} />

      <div style={{ transform: `scale(${zoom})`, width: "100%", height: "100%" }}>
        <AbsoluteFill style={{
          background: `radial-gradient(circle at 50% 45%, ${C.primary}50 0%, transparent 60%)`,
          opacity: glowOpacity * 2,
        }} />

        <AbsoluteFill style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          opacity: dashOpacity, transform: `scale(${dashScale})`,
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
            padding: `${SAFE.top + 40}px ${SAFE.side + 20}px ${SAFE.bottom + 40}px`,
            width: "100%",
          }}>
            {AGENTS.map((agent, i) => {
              const cardDelay = 25 + i * 25;
              const cardOpacity = interpolate(frame, [cardDelay, cardDelay + 15], [0, 1], {
                extrapolateLeft: "clamp", extrapolateRight: "clamp",
              });
              const cardSlide = interpolate(frame, [cardDelay, cardDelay + 15], [25, 0], {
                extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut,
              });
              const pulse = 0.5 + Math.sin(frame * 0.12 + i * 1.5) * 0.5;
              const barFill = interpolate(frame, [cardDelay + 20, cardDelay + 90],
                [0, 60 + pseudoRandom(i * 37) * 35],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );

              return (
                <div key={i} style={{
                  backgroundColor: C.card, borderRadius: 16, padding: 24,
                  opacity: cardOpacity, transform: `translateY(${cardSlide}px)`,
                  borderTop: `3px solid ${agent.color}`,
                  boxShadow: `0 0 30px ${agent.color}15`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      backgroundColor: `${agent.color}20`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                    }}>
                      {agent.emoji}
                    </div>
                    <div>
                      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 22, color: C.white }}>{agent.name}</div>
                      <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: 16, color: C.muted }}>{agent.role}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      backgroundColor: agent.color, opacity: pulse,
                      boxShadow: `0 0 8px ${agent.color}`,
                    }} />
                    <div style={{ fontFamily: MONO, fontSize: 13, color: agent.color }}>ONLINE</div>
                  </div>
                  <div style={{ height: 6, backgroundColor: "#222", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${barFill}%`,
                      backgroundColor: agent.color, borderRadius: 3,
                      boxShadow: `0 0 8px ${agent.color}44`,
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>

        <Particles count={25} color={C.primary} />
      </div>

      <AbsoluteFill style={{ backgroundColor: C.white, opacity: flashOpacity, pointerEvents: "none" }} />

      <AbsoluteFill style={{
        background: `radial-gradient(ellipse at 30% 40%, #FFAA4422 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 60%, #FF664411 0%, transparent 40%)`,
        opacity: glowOpacity, pointerEvents: "none",
      }} />

      <FilmGrain opacity={0.03} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 7: THE PRICE (26-31.5s = 330 frames)
// ═══════════════════════════════════════════════════════════════

const ScenePrice: React.FC = () => {
  const frame = useCurrentFrame();

  const priceScale = interpolate(frame, [0, 15], [2.2, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut,
  });
  const priceOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const monatOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const oldPriceOpacity = interpolate(frame, [80, 95], [0, 0.5], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const strikethroughWidth = interpolate(frame, [95, 115], [0, 100], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut,
  });

  // "999× günstiger" synced to voiceover ~frame 150
  const badgeY = interpolate(frame, [140, 165], [50, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut,
  });
  const badgeOpacity = interpolate(frame, [140, 160], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const s = shake(frame, 0, 8, 14);
  const breathe = 1 + Math.sin(frame * 0.03) * 0.015;
  const bgGlow = interpolate(frame, [0, 40], [0, 0.15], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <CinematicFootage src="footage/success.mp4" darkness={0.45} blur={5} />

      <AbsoluteFill style={{
        background: `radial-gradient(circle at 50% 50%, ${C.primary} 0%, transparent 50%)`,
        opacity: bgGlow,
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        transform: `scale(${breathe}) translate(${s.x}px, ${s.y}px)`,
      }}>
        {/* Old price */}
        <div style={{
          position: "relative", fontFamily: FONT, fontWeight: 600, fontSize: 48,
          color: C.red3, opacity: oldPriceOpacity, marginBottom: 24,
        }}>
          CHF 588'000/Jahr
          <div style={{
            position: "absolute", top: "50%", left: 0, height: 3,
            width: `${strikethroughWidth}%`, backgroundColor: C.red3,
            transform: "translateY(-50%)",
          }} />
        </div>

        {/* Main price */}
        <div style={{
          display: "flex", alignItems: "baseline", gap: 8,
          opacity: priceOpacity, transform: `scale(${priceScale})`,
        }}>
          <div style={{
            fontFamily: FONT, fontWeight: 900, fontSize: 180, color: C.white,
            textShadow: `0 0 100px ${C.primary}66, 0 4px 40px rgba(0,0,0,0.5)`,
            lineHeight: 1,
          }}>
            CHF 49
          </div>
          <div style={{
            fontFamily: FONT, fontWeight: 500, fontSize: 48, color: C.muted,
            opacity: monatOpacity,
          }}>
            /Monat
          </div>
        </div>

        {/* Badge */}
        <div style={{
          marginTop: 44, padding: "16px 40px", borderRadius: 100,
          backgroundColor: `${C.emerald}20`, border: `2px solid ${C.emerald}`,
          fontFamily: FONT, fontWeight: 700, fontSize: 30, color: C.emerald,
          opacity: badgeOpacity, transform: `translateY(${badgeY}px)`,
        }}>
          999× günstiger
        </div>
      </AbsoluteFill>

      <ShockwaveRing triggerFrame={8} duration={40} maxScale={3.5} />
      <FilmGrain opacity={0.03} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 8: CLOSER (31.5-38s = 390 frames)
// ═══════════════════════════════════════════════════════════════

const SceneCloser: React.FC = () => {
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const nameOpacity = interpolate(frame, [90, 115], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const nameSlide = interpolate(frame, [90, 115], [20, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: hardOut,
  });
  // "Dein nächster Mitarbeiter... ist kein Mensch." starts at ~frame 0 local (31.5s)
  // Voiceover handles the text, we just show the brand
  const taglineOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const urlOpacity = interpolate(frame, [220, 250], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Fade out at very end
  const fadeOut = interpolate(frame, [480, 540], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const glowPulse = 0.12 + Math.sin(frame * 0.05) * 0.04;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <CinematicFootage src="footage/future.mp4" darkness={0.4} blur={5} />

      <AbsoluteFill style={{
        background: `radial-gradient(circle at 50% 40%, ${C.primary} 0%, transparent 40%)`,
        opacity: glowPulse,
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", gap: 20,
        opacity: fadeOut,
      }}>
        {/* K Logo */}
        <div style={{
          width: 110, height: 110, borderRadius: 28, backgroundColor: C.primary,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: logoOpacity, boxShadow: `0 0 80px ${C.primary}44`,
        }}>
          <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 60, color: C.white }}>K</div>
        </div>

        <div style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 60, color: C.white,
          opacity: nameOpacity, transform: `translateY(${nameSlide}px)`,
          letterSpacing: "0.05em",
        }}>
          KaderOS
        </div>

        <div style={{
          fontFamily: FONT, fontWeight: 400, fontSize: 30, color: C.muted,
          opacity: taglineOpacity, textAlign: "center",
          padding: `0 ${SAFE.side + 40}px`,
        }}>
          Dein nächster Mitarbeiter ist kein Mensch.
        </div>

        <div style={{
          fontFamily: FONT, fontWeight: 600, fontSize: 34, color: C.primary,
          opacity: urlOpacity, marginTop: 28,
          textShadow: `0 0 30px ${C.primary}44`,
        }}>
          kaderos.io
        </div>
      </AbsoluteFill>

      <Particles count={20} color={C.primary} />
      <Vignette intensity={0.2} />
      <FilmGrain opacity={0.03} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// AUDIO LAYER
// ═══════════════════════════════════════════════════════════════

const AudioLayer: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <>
      {/* ── VOICEOVER (full track, synced) ── */}
      <Audio
        src={staticFile("audio/voiceover/voiceover-full.mp3")}
        volume={0.9}
      />

      {/* ── Dark ambient drone: Scenes 1-3, fades out before blackout ── */}
      <Sequence from={0} durationInFrames={S.blackout.start}>
        <Audio
          src={staticFile("audio/dark-ambient.mp3")}
          volume={(f) => {
            const fadeIn = interpolate(f, [0, fps * 2], [0, 0.45], { extrapolateRight: "clamp" });
            const fadeOut = interpolate(f, [S.overload.start, S.blackout.start], [0.45, 0], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });
            return Math.min(fadeIn, fadeOut + 0.45);
          }}
        />
      </Sequence>

      {/* ── Impact hits on each cost number ── */}
      {COSTS.map((item, i) => (
        <Sequence key={`hit-${i}`} from={secToFrame(item.startSec)} durationInFrames={30}>
          <Audio src={staticFile("audio/impact-hit.mp3")} volume={0.6 + i * 0.1} />
        </Sequence>
      ))}

      {/* ── Glitch between costs ── */}
      {COSTS.slice(1).map((item, i) => (
        <Sequence key={`glitch-${i}`} from={secToFrame(item.startSec) - 3} durationInFrames={20}>
          <Audio src={staticFile("audio/glitch.mp3")} volume={0.4} />
        </Sequence>
      ))}

      {/* ── Typing during terminal ── */}
      <Sequence from={S.command.start + 90} durationInFrames={60}>
        <Audio src={staticFile("audio/typing.mp3")} volume={0.5} />
      </Sequence>

      {/* ── BOOM at explosion ── */}
      <Sequence from={S.explosion.start} durationInFrames={120}>
        <Audio src={staticFile("audio/boom-drop.mp3")} volume={1.0} />
      </Sequence>
      <Sequence from={S.explosion.start} durationInFrames={120}>
        <Audio src={staticFile("audio/boom-sub.mp3")} volume={0.8} />
      </Sequence>

      {/* ── Whoosh on cards ── */}
      {AGENTS.map((_, i) => (
        <Sequence key={`w-${i}`} from={S.explosion.start + 25 + i * 25} durationInFrames={50}>
          <Audio src={staticFile("audio/whoosh.mp3")} volume={0.4} />
        </Sequence>
      ))}

      {/* ── Price slam ── */}
      <Sequence from={S.price.start} durationInFrames={30}>
        <Audio src={staticFile("audio/impact-hit.mp3")} volume={0.9} />
      </Sequence>

      {/* ── Ambient outro ── */}
      <Sequence from={S.closer.start} durationInFrames={540}>
        <Audio
          src={staticFile("audio/dark-ambient.mp3")}
          volume={(f) => {
            const fadeIn = interpolate(f, [0, 60], [0, 0.15], { extrapolateRight: "clamp" });
            const fadeOut = interpolate(f, [440, 540], [0.15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return Math.min(fadeIn, fadeOut);
          }}
        />
      </Sequence>

      {/* ── BACKGROUND MUSIC (full duration, under voiceover) ── */}
      <Audio
        src={staticFile("audio/background-music.mp3")}
        volume={(f) => {
          const fadeIn = interpolate(f, [0, 120], [0, 0.35], { extrapolateRight: "clamp" });
          const fadeOut = interpolate(f, [TOTAL_FRAMES - 180, TOTAL_FRAMES], [0.35, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          return Math.min(fadeIn, fadeOut);
        }}
      />
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════════════

export const T6_DieRechnung: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Sequence from={S.coldOpen.start} durationInFrames={S.coldOpen.end - S.coldOpen.start}>
        <SceneColdOpen />
      </Sequence>

      <Sequence from={S.rechnung.start} durationInFrames={S.rechnung.end - S.rechnung.start}>
        <SceneRechnung />
      </Sequence>

      <Sequence from={S.overload.start} durationInFrames={S.overload.end - S.overload.start}>
        <SceneOverload />
      </Sequence>

      <Sequence from={S.blackout.start} durationInFrames={S.blackout.end - S.blackout.start}>
        <SceneBlackout />
      </Sequence>

      <Sequence from={S.command.start} durationInFrames={S.command.end - S.command.start}>
        <SceneCommand />
      </Sequence>

      <Sequence from={S.explosion.start} durationInFrames={S.explosion.end - S.explosion.start}>
        <SceneExplosion />
      </Sequence>

      <Sequence from={S.price.start} durationInFrames={S.price.end - S.price.start}>
        <ScenePrice />
      </Sequence>

      <Sequence from={S.closer.start} durationInFrames={S.closer.end - S.closer.start}>
        <SceneCloser />
      </Sequence>

      <AudioLayer />
    </AbsoluteFill>
  );
};
