import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// ── COLORS ──
const C = {
  primary: "#3739C1",
  purple: "#7C3AED",
  cyan: "#0891B2",
  green: "#059669",
  text: "#1D1D1F",
  gray: "#86868B",
  light: "#F5F5F7",
  border: "#E5E5EA",
};

// ── SCENE 1: HOOK ──
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontFamily: "Outfit, -apple-system, sans-serif",
          fontWeight: 800,
          color: C.text,
          textAlign: "center",
          transform: `scale(${interpolate(scale, [0, 1], [0.95, 1])})`,
          opacity,
          letterSpacing: "-2px",
        }}
      >
        Dein nächster Mitarbeiter
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 2: REVEAL ──
const SceneReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Opacity = 1;
  const line2Spring = spring({ frame, fps, config: { damping: 200 } });
  const line2Opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Shimmer offset
  const shimmerPos = interpolate(frame, [0, 90], [-200, 200], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 80,
            fontFamily: "Outfit, -apple-system, sans-serif",
            fontWeight: 800,
            color: C.text,
            opacity: line1Opacity,
            letterSpacing: "-2px",
          }}
        >
          Dein nächster Mitarbeiter
        </div>
        <div
          style={{
            fontSize: 80,
            fontFamily: "Outfit, -apple-system, sans-serif",
            fontWeight: 800,
            letterSpacing: "-2px",
            opacity: line2Opacity,
            transform: `scale(${interpolate(line2Spring, [0, 1], [0.95, 1])})`,
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.purple} 50%, ${C.cyan} 100%)`,
            backgroundSize: "200% auto",
            backgroundPosition: `${shimmerPos}% center`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ist kein Mensch.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 3: TERMINAL ──
const SceneTerminal: React.FC = () => {
  const frame = useCurrentFrame();

  const lines = [
    { text: "$ npx kaderos onboard", color: C.text, prefix: "", charDelay: 2 },
    { text: "✓ 4 Agents bereit (CEO · CTO · CMO · Strategy)", color: C.green, prefix: "", charDelay: 0 },
    { text: "✓ Budget gesetzt: CHF 62/Monat", color: C.green, prefix: "", charDelay: 0 },
    { text: "🚀 Dein AI-Kader ist einsatzbereit.", color: C.text, prefix: "", charDelay: 0 },
  ];

  const lineTimings = [0, 40, 60, 80]; // frames when each line appears

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        style={{
          width: 900,
          borderRadius: 20,
          overflow: "hidden",
          border: `1px solid ${C.border}`,
          boxShadow: "0 25px 50px rgba(0,0,0,0.08)",
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 20px",
            borderBottom: `1px solid ${C.border}`,
            backgroundColor: "#FAFAFA",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FEBC2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28C840" }} />
          <span
            style={{
              marginLeft: 10,
              fontSize: 12,
              color: C.gray,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            kaderos — terminal
          </span>
        </div>

        {/* Terminal Body */}
        <div
          style={{
            padding: 30,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 18,
            lineHeight: 2.2,
            backgroundColor: "#FFFFFF",
            minHeight: 220,
          }}
        >
          {lines.map((line, i) => {
            const lineFrame = frame - lineTimings[i];
            if (lineFrame < 0) return null;

            // First line: typing effect
            if (i === 0 && line.charDelay > 0) {
              const charsVisible = Math.min(
                Math.floor(lineFrame / line.charDelay),
                line.text.length
              );
              const showCursor = charsVisible < line.text.length;
              return (
                <div key={i} style={{ color: line.color }}>
                  <span style={{ color: C.primary }}>$ </span>
                  {line.text.slice(2, 2 + charsVisible)}
                  {showCursor && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: 18,
                        backgroundColor: C.primary,
                        marginLeft: 2,
                        verticalAlign: "middle",
                        opacity: frame % 20 < 10 ? 1 : 0,
                      }}
                    />
                  )}
                </div>
              );
            }

            // Other lines: fade in
            const opacity = interpolate(lineFrame, [0, 8], [0, 1], {
              extrapolateRight: "clamp",
            });
            const translateY = interpolate(lineFrame, [0, 8], [8, 0], {
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  color: line.color,
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  fontWeight: i === 3 ? 600 : 400,
                }}
              >
                {line.text}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 4: STATS ──
const SceneStats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: 4, suffix: "", label: "Agents", color: C.primary },
    { value: 30, suffix: "s", label: "Setup", color: C.purple },
    { value: 62, suffix: "", label: "CHF/Monat", color: C.green },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div style={{ display: "flex", gap: 50 }}>
        {stats.map((stat, i) => {
          const delay = i * 8;
          const s = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 200 } });
          const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const count = Math.round(interpolate(s, [0, 1], [0, stat.value]));

          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                opacity,
                padding: "40px 50px",
                borderRadius: 20,
                border: `1px solid ${C.border}`,
                backgroundColor: "#FAFAFA",
              }}
            >
              <div
                style={{
                  fontSize: 72,
                  fontFamily: "Outfit, -apple-system, sans-serif",
                  fontWeight: 800,
                  color: stat.color,
                }}
              >
                {count}
                {stat.suffix}
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: C.gray,
                  fontFamily: "Outfit, -apple-system, sans-serif",
                  fontWeight: 500,
                  marginTop: 8,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 5: CTA ──
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 200 } });
  const textOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" });
  const badgeOpacity = interpolate(frame, [25, 40], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* Logo */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            backgroundColor: C.primary,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 30px",
            transform: `scale(${interpolate(logoSpring, [0, 1], [0.5, 1])})`,
            boxShadow: "0 10px 30px rgba(55,57,193,0.3)",
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 36,
              fontFamily: "Outfit, -apple-system, sans-serif",
              fontWeight: 800,
            }}
          >
            K
          </span>
        </div>

        {/* Domain */}
        <div
          style={{
            fontSize: 56,
            fontFamily: "Outfit, -apple-system, sans-serif",
            fontWeight: 800,
            color: C.text,
            opacity: textOpacity,
            letterSpacing: "-1px",
          }}
        >
          kaderos.io
        </div>

        {/* CTA */}
        <div
          style={{
            fontSize: 28,
            fontFamily: "Outfit, -apple-system, sans-serif",
            fontWeight: 600,
            color: C.primary,
            opacity: textOpacity,
            marginTop: 10,
          }}
        >
          Platz sichern.
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            marginTop: 30,
            opacity: badgeOpacity,
            fontSize: 16,
            fontFamily: "Outfit, -apple-system, sans-serif",
            fontWeight: 500,
            color: C.gray,
          }}
        >
          <span>🇨🇭 Swiss Made</span>
          <span>·</span>
          <span>Open Source</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── MAIN COMPOSITION ──
export const HeroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      {/* Scene 1: Hook (0-2s = frames 0-60) */}
      <Sequence from={0} durationInFrames={60}>
        <SceneHook />
      </Sequence>

      {/* Scene 2: Reveal (2-4s = frames 60-120) */}
      <Sequence from={60} durationInFrames={60}>
        <SceneReveal />
      </Sequence>

      {/* Scene 3: Terminal (4-8s = frames 120-240) */}
      <Sequence from={120} durationInFrames={120}>
        <SceneTerminal />
      </Sequence>

      {/* Scene 4: Stats (8-10s = frames 240-300) */}
      <Sequence from={240} durationInFrames={60}>
        <SceneStats />
      </Sequence>

      {/* Scene 5: CTA (10-12s = frames 300-360) */}
      <Sequence from={300} durationInFrames={60}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
