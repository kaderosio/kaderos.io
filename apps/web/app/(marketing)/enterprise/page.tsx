"use client";

import { ArrowRight, Users, FileCode, Plug, Mail } from "lucide-react";
import Link from "next/link";

export default function EnterprisePage() {
  return (
    <div className="py-20 px-6">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-4">Enterprise</div>
        <h1 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight mb-5">
          AI-Teams fuer groessere<br /><span className="gradient-text">Unternehmen.</span>
        </h1>
        <p className="text-[17px] text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
          Persoenliche Einrichtung. Massgeschneiderte Templates. Schweizer Support.
        </p>
      </div>

      {/* Service Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
        {[
          {
            icon: Users,
            title: "Onboarding",
            desc: "Wir richten dein AI-Team ein. Du lehnst dich zurueck. Analyse deiner Prozesse, Agent-Konfiguration, Go-Live Begleitung.",
            price: "CHF 3'000",
            color: "#000088",
          },
          {
            icon: FileCode,
            title: "Custom Templates",
            desc: "Agent-Teams fuer deine Branche. Massgeschneiderte Rollen, Prompts und Workflows -- genau auf dein Business zugeschnitten.",
            price: "CHF 5'000 - 15'000",
            color: "#059669",
          },
          {
            icon: Plug,
            title: "Full Integration",
            desc: "API-Anbindung an deine bestehenden Systeme. Bexio, ERP, CRM, interne Tools -- wir verbinden alles.",
            price: "CHF 15'000 - 50'000",
            color: "#0891B2",
          },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border border-[#E5E5EA] bg-white p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: s.color + "10" }}>
              <s.icon size={24} style={{ color: s.color }} />
            </div>
            <h3 className="text-[20px] font-bold mb-3">{s.title}</h3>
            <p className="text-[14px] text-[#6E6E73] leading-relaxed mb-6">{s.desc}</p>
            <div className="text-[18px] font-extrabold text-[#1D1D1F]">{s.price}</div>
            <div className="text-[11px] text-[#86868B] mt-1">einmalig</div>
          </div>
        ))}
      </div>

      {/* What's Included */}
      <div className="max-w-3xl mx-auto mb-20">
        <h2 className="text-[24px] font-bold text-center mb-10">Was du bekommst</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Persoenlicher Ansprechpartner in der Schweiz",
            "Analyse deiner bestehenden Prozesse",
            "Agent-Konfiguration nach deinen Anforderungen",
            "Go-Live Begleitung und Schulung",
            "30 Tage Support nach Einrichtung",
            "Dokumentation auf Deutsch",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#FAFAFA] border border-[#F5F5F7]">
              <div className="w-6 h-6 rounded-full bg-[#059669]/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[#059669] text-[12px] font-bold">{i + 1}</span>
              </div>
              <span className="text-[14px] text-[#1D1D1F]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-[28px] font-bold mb-4">Lass uns reden.</h2>
        <p className="text-[15px] text-[#6E6E73] mb-8">
          Schreib uns -- wir melden uns innert 24 Stunden.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:hello@kaderos.io"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#000088] text-white text-[14px] font-semibold rounded-xl hover:shadow-lg hover:bg-[#000066] transition-all">
            <Mail size={16} /> Kontakt aufnehmen
          </a>
          <Link href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#000088] text-[14px] font-semibold rounded-xl border-2 border-[#000088] hover:bg-[#000088]/5 transition-all">
            Self-Service Plaene ansehen <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
