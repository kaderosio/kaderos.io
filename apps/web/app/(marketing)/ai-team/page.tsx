import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { cityPages, branchenPages } from "@/components/related-links";

export const metadata = {
  title: "AI Team für Schweizer Unternehmen — KaderOS",
  description:
    "KaderOS baut dir ein AI-Team aus spezialisierten Agents. Für KMUs in Zürich, Bern, Basel und der ganzen Schweiz. Swiss Made, nDSG-konform, Open Source.",
};

export default function AITeamIndexPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "AI Team" },
        ]}
      />

      <div className="mb-14">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          AI Team
        </div>
        <h1 className="text-[32px] sm:text-[48px] font-bold tracking-tight mb-4">
          Dein AI-Team für die Schweiz
        </h1>
        <p className="text-[#6E6E73] text-[17px] leading-relaxed max-w-2xl">
          KaderOS gibt dir ein ganzes Team aus AI-Agents — zugeschnitten auf deine Branche und
          deinen Standort. Ob Treuhand in Zürich, Startup in Zug oder E-Commerce in Basel:
          Dein AI-Kader ist in 5 Minuten einsatzbereit.
        </p>
      </div>

      {/* Stadt-Seiten */}
      <section className="mb-14">
        <h2 className="text-[24px] font-bold mb-2">Nach Stadt</h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          Finde heraus, wie KaderOS Unternehmen in deiner Region unterstützt.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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

      {/* Branchen-Seiten */}
      <section className="mb-14">
        <h2 className="text-[24px] font-bold mb-2">Nach Branche & Rolle</h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          AI-Agents, spezialisiert auf deine Branche.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {branchenPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#E5E5EA] hover:border-[#000088]/30 hover:bg-[#000088]/5 transition-all text-[14px] text-[#1D1D1F] font-medium"
            >
              <span className="text-[#000088]">&rsaquo;</span>
              {page.label}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-[#000088]/20 bg-[#000088]/5 p-8 text-center">
        <h2 className="text-[22px] font-bold mb-2">Dein AI-Team wartet</h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          Starte kostenlos. Swiss Made. nDSG-konform ab Tag 1.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-3 bg-[#000088] text-white text-[14px] font-semibold rounded-xl hover:bg-[#000066] transition-colors"
        >
          Kostenlos starten
        </Link>
      </div>
    </article>
  );
}
