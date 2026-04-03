import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KaderOS — Dein nächster Mitarbeiter ist kein Mensch.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle gradient accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #000088, #000088, #0891B2)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#000088",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 12px rgba(55,57,193,0.3)",
            }}
          >
            <span style={{ color: "white", fontSize: 28, fontWeight: 800 }}>K</span>
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#1D1D1F" }}>KaderOS</span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#1D1D1F",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            marginBottom: 8,
          }}
        >
          Dein nächster Mitarbeiter
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            background: "linear-gradient(135deg, #000088, #000088, #0891B2)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          ist kein Mensch.
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: 20,
            color: "#86868B",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          AI Workforce Orchestration · Open Source · Swiss Made 🇨🇭
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            display: "flex",
            gap: 32,
            fontSize: 15,
            color: "#C7C7CC",
          }}
        >
          <span>kaderos.io</span>
          <span>·</span>
          <span>CHF 0 – 349/Monat</span>
          <span>·</span>
          <span>AGPLv3</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
