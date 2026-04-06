"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwörter stimmen nicht überein.");
      return;
    }

    if (password.length < 6) {
      setError("Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/login?message=password-reset");
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
          Neues Passwort setzen
        </h1>
        <p style={{ fontSize: 16, color: "#6E6E73", marginBottom: 32 }}>
          Wähle ein neues Passwort für deinen Account.
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
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <input
                type="password"
                placeholder="Neues Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
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
            <div style={{ marginBottom: 20 }}>
              <input
                type="password"
                placeholder="Passwort bestätigen"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
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
              {loading ? "..." : "Passwort speichern"}
            </button>
          </form>
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
