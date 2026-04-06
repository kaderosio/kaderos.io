import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KaderOS — Dein AI-Team. Für dein Unternehmen.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #000088 0%, #0A0A2E 60%, #000000 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo Area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 800,
              color: "#000088",
            }}
          >
            K
          </div>
          <span style={{ color: "white", fontSize: "28px", fontWeight: 700, letterSpacing: "-0.5px" }}>
            KaderOS
          </span>
          <span style={{ color: "#6E6E73", fontSize: "16px", marginLeft: "8px" }}>
            Swiss Made
          </span>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            color: "white",
            fontSize: "64px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            margin: "0 0 20px 0",
          }}
        >
          Dein AI-Team.
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #60A5FA, #0891B2)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Für dein Unternehmen.
          </span>
        </h1>

        {/* Subline */}
        <p
          style={{
            color: "#A1A1AA",
            fontSize: "24px",
            textAlign: "center",
            margin: "0 0 40px 0",
            fontWeight: 500,
          }}
        >
          4 Kader-Mitglieder. CHF 49/Monat. Arbeiten während du schläfst.
        </p>

        {/* Badges */}
        <div style={{ display: "flex", gap: "16px" }}>
          {["Open Source", "Swiss Made", "nDSG-konform", "7-Schichten Brain"].map((badge) => (
            <div
              key={badge}
              style={{
                padding: "8px 20px",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
