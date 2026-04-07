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
  { label: "CTO für Treuhand", href: "/ai-team/cto-fuer-treuhand" },
  { label: "CTO für Startup", href: "/ai-team/cto-fuer-startup" },
  { label: "CTO für Agentur", href: "/ai-team/cto-fuer-agentur" },
  { label: "CTO für E-Commerce", href: "/ai-team/cto-fuer-ecommerce" },
  { label: "CTO für Immobilien", href: "/ai-team/cto-fuer-immobilien" },
  { label: "Marketing für KMU", href: "/ai-team/marketing-fuer-kmu" },
  { label: "HR für KMU", href: "/ai-team/hr-fuer-kmu" },
  { label: "Buchhaltung für Treuhand", href: "/ai-team/buchhaltung-fuer-treuhand" },
  { label: "Support für E-Commerce", href: "/ai-team/support-fuer-ecommerce" },
  { label: "Operations für Agentur", href: "/ai-team/operations-fuer-agentur" },
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
