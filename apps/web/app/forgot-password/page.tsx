"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://kaderos.io/reset-password",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F5F7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "Outfit, -apple-system, system-ui, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420, textAlign: "center" }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#000088",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 24px",
              boxShadow: "0 8px 24px rgba(0,0,136,0.15)",
            }}
          >
            <span style={{ color: "#FFF", fontSize: 26, fontWeight: 800 }}>K</span>
          </div>
        </Link>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#1D1D1F",
            marginBottom: 8,
            letterSpacing: -0.5,
          }}
        >
          Passwort vergessen?
        </h1>
        <p style={{ fontSize: 16, color: "#6E6E73", marginBottom: 32 }}>
          Gib deine E-Mail ein und wir senden dir einen Reset-Link.
        </p>

        {/* Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            padding: 32,
            border: "1px solid #E5E7EB",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {sent ? (
            <div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: "#ECFDF5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: 24,
                }}
              >
                ✓
              </div>
              <p style={{ fontSize: 15, color: "#1D1D1F", fontWeight: 600, marginBottom: 8 }}>
                Link gesendet
              </p>
              <p style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.5 }}>
                Wir haben dir einen Link gesendet. Prüfe dein Postfach.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <input
                  type="email"
                  placeholder="E-Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    fontSize: 15,
                    fontFamily: "inherit",
                    outline: "none",
                    backgroundColor: "#FAFAFA",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {error && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    backgroundColor: "#FEF2F2",
                    border: "1px solid #FECACA",
                    color: "#DC2626",
                    fontSize: 14,
                    marginBottom: 16,
                    textAlign: "left",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  borderRadius: 12,
                  border: "none",
                  backgroundColor: "#000088",
                  color: "#FFF",
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "inherit",
                  cursor: loading ? "wait" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  boxShadow: "0 4px 16px rgba(0,0,136,0.2)",
                }}
              >
                {loading ? "..." : "Link senden"}
              </button>
            </form>
          )}
        </div>

        {/* Back to login */}
        <p style={{ marginTop: 20, fontSize: 14, color: "#6E6E73" }}>
          <Link
            href="/login"
            style={{ color: "#000088", fontWeight: 600, textDecoration: "none" }}
          >
            Zurück zum Login
          </Link>
        </p>
      </div>
    </div>
  );
}
