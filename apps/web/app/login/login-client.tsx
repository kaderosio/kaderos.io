"use client";

import { Suspense, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPageClient() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const message = searchParams.get("message");
  const expired = searchParams.get("expired");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message === "Invalid login credentials"
        ? "E-Mail oder Passwort falsch."
        : error.message
      );
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  const handleGithubLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
      },
    });
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
          Willkommen zurück
        </h1>
        <p style={{ fontSize: 16, color: "#6E6E73", marginBottom: 32 }}>
          Melde dich an, um dein Kader zu verwalten.
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
          {expired === "true" && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                backgroundColor: "#FFFBEB",
                border: "1px solid #FDE68A",
                color: "#B45309",
                fontSize: 14,
                marginBottom: 16,
                textAlign: "left",
              }}
            >
              Deine Session ist abgelaufen. Bitte melde dich erneut an.
            </div>
          )}

          {message === "password-reset" && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                backgroundColor: "#ECFDF5",
                border: "1px solid #A7F3D0",
                color: "#059669",
                fontSize: 14,
                marginBottom: 16,
                textAlign: "left",
              }}
            >
              Passwort erfolgreich geändert. Melde dich jetzt an.
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <input
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "..." : "Anmelden"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
            <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}>oder</span>
            <div style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
          </div>

          {/* OAuth */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              type="button"
              onClick={handleGithubLogin}
              style={{
                width: "100%",
                padding: "12px 20px",
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFF",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                color: "#1D1D1F",
                transition: "background-color 0.15s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FFF")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1D1D1F"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              Mit GitHub anmelden
            </button>
          </div>
        </div>

        {/* Forgot password + Signup links */}
        <p style={{ marginTop: 20, fontSize: 14, color: "#6E6E73" }}>
          <Link
            href="/forgot-password"
            style={{ color: "#6E6E73", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            Passwort vergessen?
          </Link>
        </p>
        <p style={{ marginTop: 10, fontSize: 14, color: "#6E6E73" }}>
          Noch kein Account?{" "}
          <Link
            href="/signup"
            style={{ color: "#000088", fontWeight: 600, textDecoration: "none" }}
          >
            Registrieren
          </Link>
        </p>
      </div>
    </div>
  );
}
