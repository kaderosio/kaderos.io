import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  RelatedLinks,
  getRelatedCityLinks,
  getRelatedBranchenLinks,
} from "@/components/related-links";

export const metadata = {
  title: "AI Team für Unternehmen in Lausanne — KaderOS",
  description:
    "KaderOS baut AI-Teams für Unternehmen in Lausanne und der Romandie. EPFL, Tech-Startups, Olympisches Komitee — dein AI-Kader versteht die Waadtländer Wirtschaft.",
};

const faqs = [
  {
    q: "Funktioniert KaderOS auch auf Französisch für die Romandie?",
    a: "KaderOS ist für die ganze Schweiz gebaut — auch für die Romandie. Die AI-Agents kommunizieren in der Sprache, die du brauchst: Deutsch, Französisch oder Englisch. Das Interface und Support sind aktuell primär auf Deutsch, die Romandie-Expansion ist in Planung.",
  },
  {
    q: "Wie unterstützt KaderOS Lausanner Tech-Startups?",
    a: "Startups aus dem EPFL-Ökosystem nutzen KaderOS als AI-Team: CTO-Agent für Code Reviews und Infrastruktur, Marketing-Agent für Content und Outreach, Operations-Agent für Admin und Reporting. Alles ohne zusätzliche Vollzeitstellen.",
  },
  {
    q: "Ist KaderOS nDSG-konform für Schweizer Unternehmen in der Romandie?",
    a: "Ja. KaderOS ist Swiss Made Software und von Grund auf nDSG-konform. Das gilt für Unternehmen in allen Sprachregionen der Schweiz — auch in Lausanne und der gesamten Romandie.",
  },
];

export default function LausannePage() {
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
    ...getRelatedCityLinks("lausanne"),
    ...getRelatedBranchenLinks("lausanne"),
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
          { label: "Lausanne" },
        ]}
      />

      <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
        Standort
      </div>
      <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
        AI Team für Unternehmen in Lausanne
      </h1>
      <p className="text-[#6E6E73] text-[16px] leading-relaxed mb-10 max-w-2xl">
        Lausanne ist das Tech-Herz der Romandie. Von der EPFL bis zum Olympischen Komitee —
        KaderOS hilft Waadtländer Unternehmen, mit AI-Agents effizienter und wettbewerbsfähiger
        zu werden. Auch für die Romandie verfügbar.
      </p>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Lausannes Wirtschaft: Tech-Hub am Genfersee</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Lausanne hat sich in den letzten Jahren zu einem der wichtigsten Tech-Standorte
          Europas entwickelt. Die EPFL (Eidgenössische Technische Hochschule Lausanne) ist
          eine Top-Universität, die hunderte Startups hervorgebracht hat — darunter
          Unicorns und erfolgreiche Scale-ups in Robotik, AI, Biotech und CleanTech.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Rund um den EPFL Innovation Park hat sich ein dichtes Ökosystem aus Startups,
          VCs und Technologieunternehmen gebildet. Logitech, Nestlé (Vevey) und das
          Internationale Olympische Komitee (IOC) sind nur einige der Ankerorganisationen
          in der Region.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Gleichzeitig ist Lausanne die Hauptstadt des Kantons Waadt und ein wichtiges
          Dienstleistungszentrum der Romandie. Beratungsunternehmen, Kanzleien, Treuhand-
          gesellschaften und Gesundheitseinrichtungen bilden einen starken Sekundärsektor
          neben der Tech-Industrie.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Herausforderungen für Unternehmen in Lausanne</h2>
        <div className="grid gap-4">
          {[
            {
              title: "Tech-Talent-Wettbewerb",
              desc: "Die EPFL produziert Top-Talente — aber die Konkurrenz um Entwickler und Engineers ist enorm. Startups kämpfen gegen Google (das ein Büro in Zürich hat), Logitech und internationale Scale-ups um die besten Köpfe.",
            },
            {
              title: "Sprachregion als Marktgrenze",
              desc: "Viele Romandie-Unternehmen fokussieren sich auf den französischsprachigen Markt und verschenken Potenzial in der Deutschschweiz. Die Sprachbarriere wird oft zur Wachstumsbremse.",
            },
            {
              title: "Skalierung von EPFL-Startups",
              desc: "Den Sprung vom EPFL-Spin-off zum profitablen Unternehmen schaffen nicht alle. Es fehlt an operativer Kapazität — Gründer sind oft technisch brillant, aber mit Admin, Marketing und Operations überfordert.",
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
        <h2 className="text-[24px] font-bold mb-4">Wie KaderOS Lausanner Unternehmen hilft</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          KaderOS gibt dir ein AI-Team, das die Lücke zwischen technischer Brillanz und
          operativer Kapazität schliesst. Gerade für EPFL-Startups ist das Gold wert: Dein
          AI-CTO übernimmt Code Reviews und Infrastruktur, während du dich auf Produkt
          und Kunden konzentrierst.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Für Dienstleistungsunternehmen in der Romandie automatisiert KaderOS Buchhaltung,
          Kundenkommunikation und Reporting. Die <Link href="/ai-team/cto-fuer-startup" className="text-[#000088] font-medium hover:underline">Startup-Templates</Link> sind
          besonders beliebt bei Gründern aus dem EPFL-Ökosystem.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          KaderOS ist auch für die Romandie verfügbar. Die AI-Agents arbeiten sprachunabhängig
          und können Aufgaben auf Französisch, Deutsch und Englisch erledigen — ideal für
          Unternehmen, die beide Sprachregionen bedienen wollen.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Als Open-Source- und Swiss-Made-Lösung bietet KaderOS volle Transparenz und
          nDSG-Konformität — Werte, die in der innovationsgetriebenen Lausanner Tech-Szene
          geschätzt werden.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-6">Häufige Fragen — Lausanne</h2>
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
          AI Team für dein Unternehmen in Lausanne aufsetzen
        </h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          Kostenlos starten. nDSG-konform ab Tag 1. Swiss Made — auch für die Romandie.
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
