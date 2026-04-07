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
