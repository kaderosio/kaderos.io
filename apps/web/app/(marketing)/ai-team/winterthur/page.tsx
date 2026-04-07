import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  RelatedLinks,
  getRelatedCityLinks,
  getRelatedBranchenLinks,
} from "@/components/related-links";

export const metadata = {
  title: "AI Team für Unternehmen in Winterthur — KaderOS",
  description:
    "KaderOS baut AI-Teams für Winterthurer KMUs. Industrie, Gewerbe, Technopark — dein AI-Kader versteht die sechstgrösste Stadt der Schweiz. Swiss Made.",
};

const faqs = [
  {
    q: "Wie hilft KaderOS Winterthurer Industrieunternehmen?",
    a: "KaderOS automatisiert Auftragsverarbeitung, Qualitätsdokumentation und Lieferantenmanagement. Dein AI-Team übernimmt die zeitfressende Administration, während sich dein Team auf Produktion und Innovation konzentriert.",
  },
  {
    q: "Ist KaderOS für Winterthurer Startups geeignet?",
    a: "Ja. Der Technopark und die ZHAW bringen laufend neue Startups hervor. KaderOS gibt Solo-Foundern und kleinen Teams ein ganzes AI-Team — vom CTO über Marketing bis Operations.",
  },
  {
    q: "Was unterscheidet KaderOS von anderen AI-Tools?",
    a: "KaderOS gibt dir nicht ein einzelnes Tool, sondern ein ganzes Team aus spezialisierten AI-Agents, die zusammenarbeiten. Mit Confidence Gates für kritische Entscheidungen und nDSG-Konformität ab Tag 1.",
  },
];

export default function WinterthurPage() {
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
    ...getRelatedCityLinks("winterthur"),
    ...getRelatedBranchenLinks("winterthur"),
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
          { label: "Winterthur" },
        ]}
      />

      <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
        Standort
      </div>
      <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
        AI Team für Unternehmen in Winterthur
      </h1>
      <p className="text-[#6E6E73] text-[16px] leading-relaxed mb-10 max-w-2xl">
        Winterthur ist Industriestadt mit Startup-Mentalität. KaderOS hilft
        Unternehmen in der sechstgrössten Stadt der Schweiz, mit AI-Agents
        effizienter zu arbeiten und schneller zu wachsen.
      </p>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Winterthurs Wirtschaft: Industriekultur im Wandel</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Winterthur war einst eine der grossen Industriestädte der Schweiz — Heimat von
          Sulzer, Rieter und der SLM. Diese industrielle DNA lebt weiter: Maschinenbau,
          Präzisionsindustrie und technische Dienstleistungen sind nach wie vor stark vertreten.
          Doch Winterthur hat sich weiterentwickelt.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Der Technopark Winterthur und die ZHAW (Zürcher Hochschule für Angewandte
          Wissenschaften) haben ein lebhaftes Innovations-Ökosystem geschaffen. Startups
          aus den Bereichen CleanTech, Engineering und Software finden hier ein ideales
          Umfeld — mit tieferen Mieten als in Zürich und dennoch erstklassiger Anbindung.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Dazu kommt ein starkes KMU-Gewerbe: Handwerksbetriebe, Bauunternehmen, Detailhändler
          und ein breites Netz an Dienstleistern. Winterthur ist pragmatisch — hier zählen
          Resultate, nicht Hypes.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Herausforderungen für Winterthurer KMUs</h2>
        <div className="grid gap-4">
          {[
            {
              title: "Im Schatten von Zürich",
              desc: "Winterthur liegt nur 25 Minuten von Zürich entfernt. Das ist Segen und Fluch zugleich: Gute Anbindung, aber auch ständiger Talentverlust an den grösseren Nachbarn.",
            },
            {
              title: "Industrietransformation braucht digitale Tools",
              desc: "Die Transformation vom klassischen Industriestandort zum Tech-Hub erfordert Digitalisierung. Aber viele Winterthurer KMUs haben weder Budget noch Expertise für grosse IT-Projekte.",
            },
            {
              title: "Effizienz als Überlebensfaktor",
              desc: "Bei tieferen Margen als in Zürich müssen Winterthurer Unternehmen jeden Franken effizient einsetzen. Automatisierung ist kein Nice-to-have, sondern Überlebensnotwendigkeit.",
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
        <h2 className="text-[24px] font-bold mb-4">Wie KaderOS Winterthurer Unternehmen hilft</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          KaderOS passt perfekt zur Winterthurer Mentalität: pragmatisch, effizient, ohne
          Schnickschnack. Du bekommst ein AI-Team, das sofort produktiv ist — kein
          monatelanges Implementierungsprojekt, keine teuren Berater.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Für Industrieunternehmen automatisieren AI-Agents Auftragsverarbeitung, Qualitäts-
          dokumentation und Lieferantenmanagement. Für <Link href="/ai-team/cto-fuer-agentur" className="text-[#000088] font-medium hover:underline">Agenturen</Link> und
          Dienstleister übernimmt dein AI-Team Projektmanagement und Kundenkommunikation.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Mit dem kostenlosen Einstieg und Plänen ab CHF 49/Monat ist KaderOS auch für
          bootstrapped Startups aus dem Technopark erschwinglich. Dein AI-CTO kostet
          einen Bruchteil einer Vollzeitstelle — und ist ab Minute eins einsatzbereit.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-6">Häufige Fragen — Winterthur</h2>
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
          AI Team für dein Unternehmen in Winterthur aufsetzen
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
