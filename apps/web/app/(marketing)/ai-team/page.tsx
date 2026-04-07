import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { cityPages } from "@/components/related-links";
import { allPages, rollen, branchen } from "./all-pages";

export const metadata = {
  title: "AI Team für Schweizer Unternehmen — Alle Rollen & Branchen | KaderOS",
  description:
    "50+ AI-Teammitglieder für Schweizer KMU: CTO, CMO, CFO, Sales Lead und Content Lead für Treuhand, Immobilien, Gastronomie, Handel und mehr. Swiss Made.",
};

const rolleDescriptions: Record<string, string> = {
  cto: "Technische Strategie, Systemarchitektur und Digitalisierung",
  cmo: "Marketing-Strategie, Lead-Generierung und Markenaufbau",
  cfo: "Finanzsteuerung, Controlling und Profitabilitätsanalyse",
  "sales-lead": "Vertriebsprozesse, Pipeline-Management und Abschlüsse",
  "content-lead": "Content-Strategie, Fachbeiträge und Sichtbarkeit",
};

const rolleColors: Record<string, string> = {
  cto: "bg-blue-50 border-blue-200 text-blue-800",
  cmo: "bg-purple-50 border-purple-200 text-purple-800",
  cfo: "bg-emerald-50 border-emerald-200 text-emerald-800",
  "sales-lead": "bg-orange-50 border-orange-200 text-orange-800",
  "content-lead": "bg-rose-50 border-rose-200 text-rose-800",
};

export default function AITeamIndexPage() {
  return (
    <article className="max-w-5xl mx-auto py-16 px-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "AI Team" },
        ]}
      />

      <div className="mb-14 text-center">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          AI Team
        </div>
        <h1 className="text-[32px] sm:text-[48px] font-bold tracking-tight mb-4">
          AI-Teammitglieder für jede Branche
        </h1>
        <p className="text-[#6E6E73] text-[17px] leading-relaxed max-w-2xl mx-auto">
          50 spezialisierte AI-Rollen für 10 Schweizer Branchen. Finde die perfekte
          Kombination für dein Unternehmen — von CTO bis Content Lead, von Treuhand bis Bildung.
        </p>
      </div>

      {/* Rollen x Branchen Grid */}
      {rollen.map((rolle) => (
        <section key={rolle.key} className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-[12px] font-semibold border ${rolleColors[rolle.key] || "bg-gray-50 border-gray-200 text-gray-800"}`}
            >
              AI {rolle.label}
            </span>
          </div>
          <p className="text-[14px] text-[#6E6E73] mb-6">
            {rolleDescriptions[rolle.key]}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {branchen.map((branche) => {
              const page = allPages.find(
                (p) => p.rolle === rolle.key && p.branche === branche.key,
              );
              if (!page) return null;

              return (
                <Link
                  key={page.slug}
                  href={`/ai-team/${page.slug}`}
                  className="group border border-[#E5E5EA] rounded-xl p-4 hover:border-[#000088] hover:shadow-sm transition-all"
                >
                  <div className="text-[15px] font-semibold group-hover:text-[#000088] transition-colors">
                    AI {rolle.label} für {branche.label}
                  </div>
                  <p className="text-[12px] text-[#86868B] mt-1 line-clamp-2">
                    {page.metaDescription}
                  </p>
                  <div className="mt-3 text-[12px] text-[#000088] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Mehr erfahren &rarr;
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      {/* Stadt-Seiten */}
      <section className="mb-14">
        <h2 className="text-[24px] font-bold mb-2">Nach Stadt</h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          Finde heraus, wie KaderOS Unternehmen in deiner Region unterstützt.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {cityPages.map((city) => (
            <Link
              key={city.href}
              href={city.href}
              className="px-4 py-3 rounded-xl border border-[#E5E5EA] hover:border-[#000088]/30 hover:bg-[#000088]/5 transition-all text-[14px] text-[#1D1D1F] font-medium text-center"
            >
              {city.label.replace("AI Team ", "")}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#000088] to-[#000066] rounded-3xl p-8 sm:p-12 text-center">
        <h2 className="text-[24px] sm:text-[32px] font-bold text-white mb-4">
          Dein AI-Team wartet
        </h2>
        <p className="text-white/70 text-[15px] mb-6 max-w-md mx-auto">
          Starte mit einem AI-Teammitglied und erweitere dein Team Schritt für Schritt.
          Kostenlos testen, keine Kreditkarte nötig.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-3.5 bg-white text-[#000088] font-semibold rounded-xl text-[15px] hover:shadow-lg transition-all"
        >
          Kostenlos starten
        </Link>
      </div>
    </article>
  );
}
