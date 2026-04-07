import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  RelatedLinks,
  getRelatedCityLinks,
  getRelatedBranchenLinks,
} from "@/components/related-links";

export const metadata = {
  title: "AI Team für Unternehmen in St. Gallen — KaderOS",
  description:
    "KaderOS baut AI-Teams für St. Galler KMUs. Textil, Gewerbe, HSG-Startups — dein AI-Kader versteht die Ostschweiz. Swiss Made, nDSG-konform.",
};

const faqs = [
  {
    q: "Wie hilft KaderOS Ostschweizer Unternehmen?",
    a: "KaderOS stellt dir ein AI-Team zusammen, das Routinearbeit automatisiert — von Buchhaltung über Kundenkommunikation bis Reporting. Ideal für die pragmatischen KMUs der Ostschweiz, die Effizienz schätzen.",
  },
  {
    q: "Ist KaderOS für produzierende Unternehmen in St. Gallen geeignet?",
    a: "Ja. Für Produktionsunternehmen automatisiert KaderOS Auftragsverarbeitung, Lieferantenmanagement und Qualitätsdokumentation. Dein AI-Team übernimmt die Administration, damit du dich auf die Fertigung konzentrieren kannst.",
  },
  {
    q: "Kann ich KaderOS als HSG-Startup nutzen?",
    a: "Absolut. KaderOS ist wie ein ganzes Team für Solo-Founder und kleine Startups. Dein AI-CTO, Marketing-Agent und Operations-Agent arbeiten zusammen — ohne Burn Rate für Vollzeitstellen.",
  },
];

export default function StGallenPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const relatedLinks = [
    ...getRelatedCityLinks("st-gallen"),
    ...getRelatedBranchenLinks("st-gallen"),
  ];

  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "AI Team", href: "/ai-team" },
          { label: "St. Gallen" },
        ]}
      />

      <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
        Standort
      </div>
      <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
        AI Team für Unternehmen in St. Gallen
      </h1>
      <p className="text-[#6E6E73] text-[16px] leading-relaxed mb-10 max-w-2xl">
        St. Gallen ist das wirtschaftliche Zentrum der Ostschweiz. Von der Textilindustrie
        bis zur HSG-Startup-Szene — KaderOS hilft lokalen Unternehmen, mit AI schneller
        zu wachsen.
      </p>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">St. Gallens Wirtschaft: Tradition trifft HSG-Innovation</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          St. Gallen blickt auf eine reiche industrielle Geschichte zurück. Die Textilindustrie
          hat die Stadt geprägt und lebt in modernisierter Form weiter — als High-Tech-Textilien,
          technische Gewebe und Spezialprodukte. Diese Innovationskultur im produzierenden
          Gewerbe ist tief in der DNA der Region verwurzelt.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Die Universität St. Gallen (HSG) bringt jedes Jahr hunderte hochqualifizierte
          Absolventen hervor und hat ein lebendiges Startup-Ökosystem geschaffen. Der
          Startfeld-Inkubator und die HSG-Entrepreneurship-Programme ziehen Gründer aus
          der ganzen Schweiz an.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Gleichzeitig ist St. Gallen ein starker KMU-Standort mit einem breiten Branchenmix:
          Maschinenbau, Lebensmittelproduktion, Finanzdienstleistungen und ein dichtes Netz
          aus Treuhand- und Beratungsunternehmen, die das Rückgrat der Ostschweizer Wirtschaft
          bilden.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Herausforderungen für St. Galler KMUs</h2>
        <div className="grid gap-4">
          {[
            {
              title: "Strukturwandel in der Produktion",
              desc: "Die traditionelle Industrie transformiert sich. Unternehmen müssen Digitalisierung vorantreiben, um wettbewerbsfähig zu bleiben — aber die Ressourcen für grosse IT-Projekte fehlen oft.",
            },
            {
              title: "Brain Drain Richtung Zürich",
              desc: "Viele HSG-Absolventen und Fachkräfte wandern nach Zürich ab, wo Grosskonzerne und höhere Löhne locken. St. Galler KMUs müssen kreativer werden, um Talente zu halten.",
            },
            {
              title: "Export-Abhängigkeit und Komplexität",
              desc: "Viele Ostschweizer Unternehmen exportieren stark — insbesondere in den EU-Raum. Zollabwicklung, internationale Korrespondenz und Compliance sind zeitintensiv und fehleranfällig.",
            },
          ].map((p) => (
            <div key={p.title} className="border border-[#E5E5EA] rounded-2xl p-6">
              <h3 className="text-[16px] font-semibold mb-2">{p.title}</h3>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Wie KaderOS St. Galler Unternehmen hilft</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          KaderOS gibt dir ein AI-Team, das die Lücke zwischen Ambitionen und Ressourcen
          schliesst. Statt auf teure Neueinstellungen zu warten, setzt du sofort produktive
          AI-Agents ein.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Für produzierende Unternehmen automatisieren Agents Auftragsverarbeitung,
          Lieferantenkommunikation und Qualitätsdokumentation. Für <Link href="/ai-team/cto-fuer-startup" className="text-[#000088] font-medium hover:underline">HSG-Startups</Link> übernimmt
          dein AI-CTO Code Reviews und Sprint-Planung, während der Marketing-Agent
          Content und Outreach managt.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Das Confidence-Gate-System ist gerade für exportorientierte Unternehmen wertvoll:
          Dein AI-Team arbeitet autonom bei Standardprozessen und holt sich bei komplexen
          Entscheidungen — wie Zollklassifizierungen oder Compliance-Fragen — dein OK.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-6">Häufige Fragen — St. Gallen</h2>
        <div className="grid gap-4">
          {faqs.map((f) => (
            <div key={f.q} className="border border-[#E5E5EA] rounded-2xl p-6">
              <h3 className="text-[16px] font-semibold mb-2">{f.q}</h3>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-2xl border border-[#000088]/20 bg-[#000088]/5 p-8 text-center">
        <h2 className="text-[22px] font-bold mb-2">
          AI Team für dein Unternehmen in St. Gallen aufsetzen
        </h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          Kostenlos starten. nDSG-konform ab Tag 1. Swiss Made.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-3 bg-[#000088] text-white text-[14px] font-semibold rounded-xl hover:bg-[#000066] transition-colors"
        >
          Jetzt AI Team aufsetzen
        </Link>
      </div>

      <RelatedLinks links={relatedLinks} />
    </article>
  );
}
