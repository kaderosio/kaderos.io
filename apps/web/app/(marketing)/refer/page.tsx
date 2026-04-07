"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check, Users, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function ReferPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pos, setPos] = useState(0);
  const [refCode, setRefCode] = useState("");
  const [referrerName, setReferrerName] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    // Referral Code aus URL lesen
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || "";
    setReferredBy(ref);

    // Referrer-Info laden
    if (ref) {
      fetch(`/api/referral?code=${ref}`)
        .then((r) => r.json())
        .then((d) => {
          if (!d.error) {
            setReferrerName(ref); // Wir nutzen den Code als Identifier
          }
        })
        .catch(() => {});
    }

    // Waitlist Count laden
    fetch("/api/waitlist")
      .then((r) => r.json())
      .then((d) => {
        if (d.count) setWaitlistCount(d.count);
      })
      .catch(() => {});
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "referral",
          referred_by: referredBy || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPos(data.position);
        setRefCode(data.referral_code);
        setDone(true);

        // Referral Count beim Referrer erhöhen
        if (referredBy && !data.already_registered) {
          fetch("/api/referral", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ referred_by: referredBy }),
          }).catch(() => {});
        }
      } else {
        setError(
          data.error === "Already registered"
            ? "Du bist bereits auf der Waitlist!"
            : "Etwas ist schiefgelaufen."
        );
      }
    } catch {
      setError("Verbindungsfehler. Bitte nochmal versuchen.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F]">
      {/* Hero */}
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F7]/50 via-white to-white" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(ellipse, #00008808, transparent 70%)" }} />

        <div className="relative max-w-2xl mx-auto text-center">
          {/* Referral Badge */}
          {referredBy && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#000088]/5 border border-[#000088]/10 rounded-full mb-8">
              <Users size={14} className="text-[#000088]" />
              <span className="text-[13px] font-medium text-[#000088]">
                Du wurdest eingeladen
              </span>
            </div>
          )}

          <h1 className="text-[32px] sm:text-[52px] leading-[1.08] font-extrabold tracking-tight mb-6">
            Dein AI-Team<br />
            <span style={{
              background: "linear-gradient(135deg, #000088 0%, #000088 50%, #0891B2 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              wartet auf dich.
            </span>
          </h1>

          <p className="text-[17px] sm:text-[20px] text-[#6E6E73] max-w-lg mx-auto mb-4 leading-snug">
            KaderOS bringt AI-Agenten in Schweizer KMUs. 4 Agents. CHF 79/Monat. Arbeiten während du schläfst.
          </p>

          {/* Social Proof */}
          {waitlistCount > 0 && (
            <p className="text-[14px] text-[#86868B] mb-10">
              <span className="font-semibold text-[#1D1D1F]">{waitlistCount.toLocaleString("de-CH")}</span> Gründer warten bereits
            </p>
          )}

          {/* Signup Form */}
          {!done ? (
            <div className="max-w-md mx-auto">
              <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="deine@email.ch"
                    className="w-full px-5 py-3.5 bg-white border border-[#D2D2D7] rounded-xl text-[14px] text-[#1D1D1F] placeholder:text-[#C7C7CC] outline-none focus:border-[#000088] focus:shadow-[0_0_0_3px_#00008810] transition-all"
                  />
                  {error && (
                    <div className="text-[11px] text-[#DC2626] mt-1 ml-1">{error}</div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-7 py-3.5 bg-[#000088] text-white text-[14px] font-semibold rounded-xl flex items-center gap-2 transition-all shrink-0 ${
                    loading
                      ? "opacity-60"
                      : "hover:bg-[#000066] hover:shadow-lg active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Wird gesendet
                    </>
                  ) : (
                    <>
                      Platz sichern <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              <p className="text-[11px] text-[#C7C7CC] mt-3">
                Kein Spam. Keine Kreditkarte. Jederzeit abmeldbar.
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#059669]/10 border border-[#059669]/20 rounded-full">
                <Check size={16} className="text-[#059669]" />
                <span className="text-[14px] font-medium text-[#059669]">
                  Du bist #{pos} auf der Waitlist
                </span>
              </div>

              <p className="text-[14px] text-[#6E6E73]">
                Wir melden uns, sobald dein Platz frei wird.
              </p>

              <Link
                href={`/?ref=${refCode}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#000088] text-white text-[14px] font-semibold rounded-xl hover:bg-[#000066] transition-all"
              >
                Freunde einladen und vorspringen <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 px-4 sm:px-6 bg-[#FAFAFA] border-y border-[#F5F5F7]">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Swiss Made",
                desc: "Entwickelt in Zürich. nDSG-konform. Daten in der Schweiz.",
              },
              {
                icon: Zap,
                title: "4 AI-Agents",
                desc: "Marketing, Sales, Operations, Support — arbeiten 24/7 für dein KMU.",
              },
              {
                icon: Users,
                title: "Open Source",
                desc: "AGPLv3. Kein Vendor Lock-in. Alles auf GitHub prüfbar.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#000088]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={22} className="text-[#000088]" />
                </div>
                <h3 className="text-[15px] font-semibold mb-2">{item.title}</h3>
                <p className="text-[13px] text-[#6E6E73] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Homepage CTA */}
      <section className="py-16 px-4 sm:px-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[14px] text-[#000088] font-semibold hover:underline"
        >
          Mehr über KaderOS erfahren <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
