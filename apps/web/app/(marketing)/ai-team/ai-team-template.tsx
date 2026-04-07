import Link from "next/link";
import type { AITeamPage } from "./data";
import { allPages, rollen, branchen } from "./all-pages";

function Breadcrumb({ rolle, branche }: { rolle: string; branche: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-[12px] text-[#86868B]">
        <li>
          <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link
            href="/ai-team"
            className="hover:text-[#1D1D1F] transition-colors"
          >
            AI Team
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-[#1D1D1F] font-medium">
          {rolle} für {branche}
        </li>
      </ol>
    </nav>
  );
}

function FAQSchema({ faqs }: { faqs: AITeamPage["faqs"] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbSchema({
  rolle,
  branche,
  slug,
}: {
  rolle: string;
  branche: string;
  slug: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://kaderos.io",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Team",
        item: "https://kaderos.io/ai-team",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${rolle} für ${branche}`,
        item: `https://kaderos.io/ai-team/${slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function InternalLinks({ page }: { page: AITeamPage }) {
  const relatedRollenPages = page.relatedRollen
    .map((slug) => allPages.find((p) => p.slug === slug))
    .filter(Boolean) as AITeamPage[];

  const relatedBranchenPages = page.relatedBranchen
    .map((slug) => allPages.find((p) => p.slug === slug))
    .filter(Boolean) as AITeamPage[];

  return (
    <div className="mb-12">
      <h2 className="text-[20px] font-bold mb-6">Weitere AI-Rollen und Branchen</h2>

      {relatedRollenPages.length > 0 && (
        <div className="mb-6">
          <h3 className="text-[14px] font-semibold text-[#6E6E73] mb-3">
            Weitere AI-Rollen für {page.brancheLabel}
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedRollenPages.map((rp) => (
              <Link
                key={rp.slug}
                href={`/ai-team/${rp.slug}`}
                className="px-3 py-1.5 border border-[#E5E5EA] rounded-lg text-[13px] text-[#6E6E73] hover:border-[#000088] hover:text-[#000088] transition-colors"
              >
                AI {rp.rolleLabel}
              </Link>
            ))}
          </div>
        </div>
      )}

      {relatedBranchenPages.length > 0 && (
        <div>
          <h3 className="text-[14px] font-semibold text-[#6E6E73] mb-3">
            AI {page.rolleLabel} für andere Branchen
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedBranchenPages.map((rp) => (
              <Link
                key={rp.slug}
                href={`/ai-team/${rp.slug}`}
                className="px-3 py-1.5 border border-[#E5E5EA] rounded-lg text-[13px] text-[#6E6E73] hover:border-[#000088] hover:text-[#000088] transition-colors"
              >
                {rp.brancheLabel}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AITeamPageTemplate({ page }: { page: AITeamPage }) {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <FAQSchema faqs={page.faqs} />
      <BreadcrumbSchema
        rolle={page.rolleLabel}
        branche={page.brancheLabel}
        slug={page.slug}
      />

      <Breadcrumb rolle={page.rolleLabel} branche={page.brancheLabel} />

      {/* Header */}
      <div className="mb-12">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          AI Team
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          {page.h1}
        </h1>
        <p className="text-[#6E6E73] text-[16px] leading-relaxed max-w-2xl">
          {page.intro}
        </p>
      </div>

      {/* Challenges */}
      <div className="mb-12">
        <h2 className="text-[24px] font-bold mb-6">
          Die Herausforderungen in der {page.brancheLabel}-Branche
        </h2>
        <div className="grid gap-4">
          {page.challenges.map((c) => (
            <div
              key={c.title}
              className="border border-[#E5E5EA] rounded-2xl p-6"
            >
              <h3 className="text-[16px] font-semibold mb-2">{c.title}</h3>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions */}
      <div className="mb-12">
        <h2 className="text-[24px] font-bold mb-6">
          So löst dein AI {page.rolleLabel} diese Probleme
        </h2>
        <div className="grid gap-4">
          {page.solutions.map((s) => (
            <div
              key={s.title}
              className="border border-[#000088]/10 bg-[#000088]/[0.02] rounded-2xl p-6"
            >
              <h3 className="text-[16px] font-semibold mb-2 text-[#000088]">
                {s.title}
              </h3>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-12">
        <h2 className="text-[24px] font-bold mb-6">
          Konkrete Use Cases
        </h2>
        <div className="grid gap-4">
          {page.useCases.map((uc) => (
            <div key={uc.title} className="border-l-4 border-[#000088] pl-6 py-2">
              <h3 className="text-[16px] font-semibold mb-2">{uc.title}</h3>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">
                {uc.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why KaderOS */}
      <div className="mb-12">
        <h2 className="text-[24px] font-bold mb-4">
          Warum KaderOS
        </h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          {page.whyKaderOS}
        </p>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="text-[24px] font-bold mb-6">
          Häufige Fragen
        </h2>
        <div className="grid gap-4">
          {page.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border border-[#E5E5EA] rounded-2xl"
            >
              <summary className="px-6 py-4 cursor-pointer text-[15px] font-semibold list-none flex items-center justify-between">
                {faq.question}
                <span className="text-[#86868B] group-open:rotate-45 transition-transform text-[20px]">
                  +
                </span>
              </summary>
              <div className="px-6 pb-4">
                <p className="text-[14px] text-[#6E6E73] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Internal Links */}
      <InternalLinks page={page} />

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#000088] to-[#000066] rounded-3xl p-8 sm:p-12 text-center">
        <h2 className="text-[24px] sm:text-[32px] font-bold text-white mb-4">
          Bereit loszulegen?
        </h2>
        <p className="text-white/70 text-[15px] mb-6 max-w-md mx-auto">
          Setze deinen AI {page.rolleLabel} für dein {page.brancheLabel}-Unternehmen
          in wenigen Minuten auf.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-3.5 bg-white text-[#000088] font-semibold rounded-xl text-[15px] hover:shadow-lg transition-all"
        >
          {page.ctaText}
        </Link>
      </div>
    </article>
  );
}
