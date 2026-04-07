import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  RelatedLinks,
  getRelatedCityLinks,
  getRelatedBranchenLinks,
} from "@/components/related-links";

export const metadata = {
  title: "AI Team für Unternehmen in Zürich — KaderOS",
  description:
    "KaderOS baut AI-Teams für Zürcher KMUs. Finanzplatz, Tech-Startups, Treuhand — dein AI-Kader versteht die lokale Wirtschaft. Swiss Made, nDSG-konform.",
};

const faqs = [
  {
    q: "Wie hilft KaderOS Zürcher KMUs konkret?",
    a: "KaderOS stellt dir ein AI-Team zusammen, das auf deine Branche zugeschnitten ist. Ob Treuhand am Paradeplatz, Tech-Startup im Kreis 5 oder Handelsunternehmen in Oerlikon — die Agents übernehmen Routinearbeit wie Buchhaltung, Kundenkommunikation und Reporting.",
  },
  {
    q: "Ist KaderOS nDSG-konform für Schweizer Unternehmen?",
    a: "Ja. KaderOS ist Swiss Made Software, wird in der Schweiz entwickelt und ist von Grund auf nDSG-konform. Deine Daten bleiben unter Schweizer Recht — gerade für den regulierten Finanzplatz Zürich entscheidend.",
  },
  {
    q: "Was kostet ein AI-Team für ein Zürcher Unternehmen?",
    a: "KaderOS startet kostenlos. Für professionelle Teams gibt es Pläne ab CHF 49/Monat. Im Vergleich zu einer zusätzlichen Vollzeitstelle in Zürich (Median CHF 8'500/Mt.) eine massive Ersparnis.",
  },
];

export default function ZuerichPage() {
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
    ...getRelatedCityLinks("zuerich"),
    ...getRelatedBranchenLinks("zuerich"),
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
          { label: "Zürich" },
        ]}
      />

      <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
        Standort
      </div>
      <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
        AI Team für Unternehmen in Zürich
      </h1>
      <p className="text-[#6E6E73] text-[16px] leading-relaxed mb-10 max-w-2xl">
        Zürich ist das wirtschaftliche Herz der Schweiz. KaderOS hilft lokalen Unternehmen,
        mit AI-Agents effizienter zu arbeiten — nDSG-konform und Swiss Made.
      </p>

      {/* Wirtschaftsstruktur */}
      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Zürichs Wirtschaft: Vielfalt als Stärke</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Zürich ist weit mehr als Banken und Versicherungen. Die Stadt beherbergt über 40&apos;000 KMUs,
          die zusammen das Rückgrat der regionalen Wirtschaft bilden. Der Grossraum Zürich generiert
          rund einen Fünftel des Schweizer BIP und ist Heimat von Unternehmen aus praktisch jeder
          Branche: Finanzdienstleistungen, Technologie, Life Sciences, Beratung, Treuhand, Handel
          und Kreativwirtschaft.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Die ETH und die Universität Zürich treiben Innovation an und machen die Stadt zu einem
          der dynamischsten Tech-Hubs Europas. Gleichzeitig sind Traditionsbranchen wie Treuhand
          und Rechtsberatung stark verankert — mit über 3&apos;000 Treuhandbüros allein im Kanton Zürich.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Diese Mischung aus Innovation und Tradition macht Zürich zum idealen Markt für KaderOS:
          Unternehmen, die ihre Prozesse modernisieren wollen, ohne dabei Compliance und Datenschutz
          zu vernachlässigen.
        </p>
      </section>

      {/* KMU Challenges */}
      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Herausforderungen für Zürcher KMUs</h2>
        <div className="grid gap-4">
          {[
            {
              title: "Hohe Lohnkosten und Fachkräftemangel",
              desc: "Zürich hat die höchsten Löhne der Schweiz. Qualifizierte Mitarbeitende zu finden und zu halten ist teuer und zeitaufwändig. Gerade für KMUs wird die Konkurrenz um Talente mit den Grosskonzernen am Paradeplatz immer härter.",
            },
            {
              title: "Regulierungsdichte im Finanzplatz",
              desc: "Ob FINMA-Anforderungen, nDSG-Compliance oder MWST-Vorschriften — Zürcher Unternehmen müssen einem dichten Regulierungsrahmen gerecht werden. Compliance frisst Zeit, die für Wachstum fehlt.",
            },
            {
              title: "Skalierung ohne proportionale Kostensteigerung",
              desc: "Mehr Mandanten betreuen, ohne proportional mehr Leute einstellen? Das ist die zentrale Frage für wachsende Zürcher KMUs — von der Treuhandgesellschaft bis zum SaaS-Startup.",
            },
          ].map((p) => (
            <div key={p.title} className="border border-[#E5E5EA] rounded-2xl p-6">
              <h3 className="text-[16px] font-semibold mb-2">{p.title}</h3>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wie KaderOS hilft */}
      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-4">Wie KaderOS Zürcher Unternehmen hilft</h2>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          KaderOS gibt dir ein komplettes AI-Team — zusammengestellt aus spezialisierten Agents,
          die deine Branche verstehen. Statt einer teuren Neueinstellung bekommst du einen ganzen
          Kader an digitalen Mitarbeitenden, die sofort produktiv sind.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Für <Link href="/ai-team/cto-fuer-treuhand" className="text-[#000088] font-medium hover:underline">Treuhandbüros</Link> automatisiert
          KaderOS die Belegverarbeitung, MWST-Prüfung und Mandanten-Reporting. Für
          Tech-Startups übernimmt dein AI-CTO Code Reviews, Infrastruktur-Monitoring und
          Sprint-Planung.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-4">
          Das Confidence-Gate-System stellt sicher, dass kritische Entscheidungen immer von einem
          Menschen abgesegnet werden. Dein AI-Team arbeitet autonom bei Routineaufgaben und
          eskaliert bei Unsicherheiten — genau wie ein gut eingespieltes menschliches Team.
        </p>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed">
          Und weil KaderOS Open Source und Swiss Made ist, erfüllt es die hohen Ansprüche des
          Zürcher Finanzplatzes an Transparenz und Datenschutz. Keine Black Box, keine
          US-Cloud-Abhängigkeit.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-[24px] font-bold mb-6">Häufige Fragen — Zürich</h2>
        <div className="grid gap-4">
          {faqs.map((f) => (
            <div key={f.q} className="border border-[#E5E5EA] rounded-2xl p-6">
              <h3 className="text-[16px] font-semibold mb-2">{f.q}</h3>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-[#000088]/20 bg-[#000088]/5 p-8 text-center">
        <h2 className="text-[22px] font-bold mb-2">
          AI Team für dein Unternehmen in Zürich aufsetzen
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
