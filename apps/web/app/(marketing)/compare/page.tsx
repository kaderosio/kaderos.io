import Link from "next/link";

export const metadata = {
  title: "KaderOS vs Alternativen — Ehrliche Vergleiche 2026 | KaderOS",
  description:
    "KaderOS im direkten Vergleich mit CrewAI, AutoGen, n8n, Relevance AI und LangChain. Ehrliche Feature-Vergleiche für Schweizer KMU.",
};

const competitors = [
  {
    slug: "crewai",
    name: "CrewAI",
    tagline: "Multi-Agent Framework aus den USA",
  },
  {
    slug: "autogen",
    name: "AutoGen",
    tagline: "Microsofts Agent-Framework",
  },
  {
    slug: "n8n",
    name: "n8n",
    tagline: "Workflow-Automatisierung aus Berlin",
  },
  {
    slug: "relevance-ai",
    name: "Relevance AI",
    tagline: "No-Code AI Agents aus Australien",
  },
  {
    slug: "langchain",
    name: "LangChain",
    tagline: "Das populärste LLM-Framework",
  },
];

export default function ComparePage() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Vergleiche
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          KaderOS vs Alternativen
        </h1>
        <p className="text-[#6E6E73] text-[16px] leading-relaxed max-w-2xl">
          Kein Tool ist perfekt für jeden. Deshalb vergleichen wir KaderOS ehrlich mit den
          bekanntesten Alternativen — damit du die richtige Entscheidung für dein Business triffst.
        </p>
      </div>

      <div className="grid gap-4">
        {competitors.map((c) => (
          <Link
            key={c.slug}
            href={`/compare/${c.slug}`}
            className="group block border border-[#E5E5EA] rounded-2xl p-6 hover:border-[#000088]/30 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-semibold group-hover:text-[#000088] transition-colors">
                  KaderOS vs {c.name}
                </h2>
                <p className="text-[14px] text-[#86868B] mt-1">{c.tagline}</p>
              </div>
              <span className="text-[#86868B] group-hover:text-[#000088] transition-colors text-[20px]">
                &rarr;
              </span>
            </div>
          </Link>
        ))}
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
