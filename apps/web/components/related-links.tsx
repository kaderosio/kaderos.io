import Link from "next/link";

interface RelatedLink {
  label: string;
  href: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
}

// Data for hub & spoke linking
export const cityPages: RelatedLink[] = [
  { label: "AI Team Zürich", href: "/ai-team/zuerich" },
  { label: "AI Team Bern", href: "/ai-team/bern" },
  { label: "AI Team Basel", href: "/ai-team/basel" },
  { label: "AI Team Luzern", href: "/ai-team/luzern" },
  { label: "AI Team St. Gallen", href: "/ai-team/st-gallen" },
  { label: "AI Team Winterthur", href: "/ai-team/winterthur" },
  { label: "AI Team Lausanne", href: "/ai-team/lausanne" },
  { label: "AI Team Genf", href: "/ai-team/genf" },
  { label: "AI Team Lugano", href: "/ai-team/lugano" },
  { label: "AI Team Zug", href: "/ai-team/zug" },
];

export const branchenPages: RelatedLink[] = [
  // CTO highlights
  { label: "AI CTO für Treuhand", href: "/ai-team/cto-fuer-treuhand" },
  { label: "AI CTO für Immobilien", href: "/ai-team/cto-fuer-immobilien" },
  { label: "AI CTO für IT", href: "/ai-team/cto-fuer-it" },
  // CMO highlights
  { label: "AI CMO für Handel", href: "/ai-team/cmo-fuer-handel" },
  { label: "AI CMO für Gastronomie", href: "/ai-team/cmo-fuer-gastronomie" },
  // CFO highlights
  { label: "AI CFO für Handwerk", href: "/ai-team/cfo-fuer-handwerk" },
  { label: "AI CFO für Pharma", href: "/ai-team/cfo-fuer-pharma" },
  // Sales Lead highlights
  { label: "AI Sales Lead für Beratung", href: "/ai-team/sales-lead-fuer-beratung" },
  { label: "AI Sales Lead für Logistik", href: "/ai-team/sales-lead-fuer-logistik" },
  // Content Lead highlights
  { label: "AI Content Lead für Bildung", href: "/ai-team/content-lead-fuer-bildung" },
];

export function getRelatedCityLinks(currentSlug: string): RelatedLink[] {
  return cityPages.filter((p) => !p.href.endsWith(currentSlug)).slice(0, 5);
}

export function getRelatedBranchenLinks(currentSlug: string): RelatedLink[] {
  return branchenPages.filter((p) => !p.href.endsWith(currentSlug)).slice(0, 5);
}

export function RelatedLinks({ title = "Verwandte Seiten", links }: RelatedLinksProps) {
  if (!links.length) return null;

  return (
    <section className="mt-16 pt-10 border-t border-[#E5E5EA]">
      <h2 className="text-[18px] font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#E5E5EA] hover:border-[#000088]/30 hover:bg-[#000088]/5 transition-all text-[14px] text-[#1D1D1F] font-medium"
          >
            <span className="text-[#000088]">&rsaquo;</span>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          href="/ai-team"
          className="text-[13px] text-[#000088] font-semibold hover:underline"
        >
          Alle AI-Team Lösungen ansehen &rarr;
        </Link>
      </div>
    </section>
  );
}
