import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KaderOS Blog";
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
          background: "#FAFAFA",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Top accent */}
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

        {/* Tag */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#000088",
            textTransform: "uppercase",
            letterSpacing: 3,
            marginBottom: 20,
          }}
        >
          Blog
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#1D1D1F",
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: "-1px",
            maxWidth: 900,
          }}
        >
          Denken. Bauen. Teilen.
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: 20,
            color: "#86868B",
            marginTop: 20,
          }}
        >
          AI Agents · Swiss Tech · KaderOS Insights
        </div>

        {/* Bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "#000088",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ color: "white", fontSize: 16, fontWeight: 800 }}>K</span>
          </div>
          <span style={{ fontSize: 15, color: "#86868B" }}>kaderos.io/blog</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
