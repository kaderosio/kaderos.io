import Link from "next/link";

export const metadata = {
  title: "AI-Team Use Cases — KaderOS für jede Branche | KaderOS",
  description:
    "Entdecke, wie KaderOS Startups, Agenturen, Treuhändern, Freelancern und E-Commerce-Unternehmen hilft. Branchenspezifische AI-Teams für Schweizer KMU.",
};

const useCases = [
  {
    slug: "startup",
    name: "Startups",
    tagline: "Skaliere mit AI statt mit Headcount",
    savings: "CHF 8'000+/Mt.",
  },
  {
    slug: "agentur",
    name: "Agenturen",
    tagline: "Mehr Kunden betreuen ohne mehr Mitarbeiter",
    savings: "CHF 12'000+/Mt.",
  },
  {
    slug: "treuhand",
    name: "Treuhänder",
    tagline: "Buchhaltung und Compliance automatisieren",
    savings: "CHF 6'000+/Mt.",
  },
  {
    slug: "freelancer",
    name: "Freelancer",
    tagline: "Ein ganzes Team — ohne ein einziges Gehalt",
    savings: "CHF 4'000+/Mt.",
  },
  {
    slug: "ecommerce",
    name: "E-Commerce",
    tagline: "Produkttexte, Support und Analytics auf Autopilot",
    savings: "CHF 10'000+/Mt.",
  },
];

export default function UseCasesPage() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Use Cases
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          AI-Team für jede Branche
        </h1>
        <p className="text-[#6E6E73] text-[16px] leading-relaxed max-w-2xl">
          Jede Branche hat andere Herausforderungen. KaderOS liefert massgeschneiderte
          AI-Teams mit vordefinierten Templates — bereit in 30 Minuten.
        </p>
      </div>

      <div className="grid gap-4">
        {useCases.map((uc) => (
          <Link
            key={uc.slug}
            href={`/use-cases/${uc.slug}`}
            className="group block border border-[#E5E5EA] rounded-2xl p-6 hover:border-[#000088]/30 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-semibold group-hover:text-[#000088] transition-colors">
                  AI-Team für {uc.name}
                </h2>
                <p className="text-[14px] text-[#86868B] mt-1">{uc.tagline}</p>
              </div>
              <div className="text-right">
                <span className="text-[14px] font-semibold text-[#000088]">
                  {uc.savings}
                </span>
                <p className="text-[11px] text-[#86868B]">Ersparnis</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-[#000088]/20 bg-[#000088]/5 p-6 text-center">
        <p className="text-[14px] text-[#6E6E73] mb-4">
          Berechne dein persönliches Sparpotenzial mit unserem Kalkulator.
        </p>
        <Link
          href="/tools/ai-team-calculator"
          className="inline-block px-6 py-2.5 border border-[#000088] text-[#000088] text-[13px] font-semibold rounded-xl hover:bg-[#000088] hover:text-white transition-colors"
        >
          AI-Team Kalkulator öffnen
        </Link>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/pricing"
          className="text-[13px] text-[#86868B] hover:text-[#000088] transition-colors"
        >
          &larr; Zurück zu Preise
        </Link>
      </div>
    </section>
  );
}
