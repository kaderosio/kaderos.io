import Link from "next/link";

export const metadata = {
  title: "KaderOS vs Relevance AI — Ehrlicher Vergleich 2026",
  description:
    "Relevance AI und KaderOS im direkten Vergleich: No-Code AI Agents, Pricing, Schweiz-Tauglichkeit, Memory und mehr.",
};

const rows = [
  { feature: "Pricing", kaderos: "Free Tier + ab CHF 79/Mt.", competitor: "Free Tier + ab $19/Mt." },
  { feature: "Open Source", kaderos: "Ja (MIT)", competitor: "Nein — Closed Source" },
  { feature: "Swiss/DACH-Fokus", kaderos: "Ja — gebaut für die Schweiz", competitor: "Nein — Australien/Global" },
  { feature: "Memory System", kaderos: "3-Layer Memory (Short/Long/Entity)", competitor: "Basic Knowledge Base" },
  { feature: "Agent Roles", kaderos: "Vordefinierte Rollen + Custom", competitor: "Custom Agent Builder" },
  { feature: "Budget Tracking", kaderos: "Eingebaut (CHF/EUR/USD)", competitor: "Credit-basiert" },
  { feature: "CHF Support", kaderos: "Native CHF-Unterstützung", competitor: "Nein — USD" },
  { feature: "nDSG-Konformität", kaderos: "Ja — by Design", competitor: "Nein — australisches Recht" },
  { feature: "Heartbeat Engine", kaderos: "Ja — Agents melden Status", competitor: "Nein" },
  { feature: "Knowledge Graph", kaderos: "Ja (Graphiti/ZEP)", competitor: "Nein" },
  { feature: "Dream Cycle", kaderos: "Ja — Agents lernen im Schlaf", competitor: "Nein" },
  { feature: "Templates", kaderos: "Branchenspezifisch (CH)", competitor: "Generische Templates" },
  { feature: "Self-Hosting", kaderos: "Ja", competitor: "Nein — nur Cloud" },
  { feature: "No-Code", kaderos: "Ja", competitor: "Ja" },
];

export default function CompareRelevanceAI() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Vergleich
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          KaderOS vs Relevance AI
        </h1>
        <p className="text-[#6E6E73] text-[16px] leading-relaxed">
          Relevance AI ist eine No-Code-Plattform für AI Agents aus Australien. KaderOS ist eine
          Workforce Orchestration Engine für den Schweizer Markt. Beide ermöglichen AI Agents ohne
          Code — aber mit unterschiedlichen Prioritäten.
        </p>
      </div>

      <div className="overflow-x-auto mb-12">
        <table className="w-full text-[14px] border-collapse">
          <thead>
            <tr className="border-b-2 border-[#000088]/20">
              <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">Feature</th>
              <th className="text-left py-3 px-4 font-semibold text-[#000088]">KaderOS</th>
              <th className="text-left py-3 pl-4 font-semibold text-[#6E6E73]">Relevance AI</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.feature} className={i % 2 === 0 ? "bg-[#FAFAFA]" : ""}>
                <td className="py-3 pr-4 font-medium text-[#1D1D1F]">{r.feature}</td>
                <td className="py-3 px-4 text-[#1D1D1F]">{r.kaderos}</td>
                <td className="py-3 pl-4 text-[#6E6E73]">{r.competitor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <h2>Für wen ist Relevance AI besser?</h2>
        <ul className="space-y-2 mb-8 list-disc pl-5">
          <li>Du brauchst schnell einen einzelnen AI Agent für Sales oder Support — ohne komplexe Orchestrierung.</li>
          <li>Du bist im englischsprachigen Markt unterwegs und brauchst keinen DACH-Kontext.</li>
          <li>Du willst eine gehostete Lösung ohne Self-Hosting-Option und hast keine Compliance-Anforderungen.</li>
        </ul>

        <h2>Für wen ist KaderOS besser?</h2>
        <ul className="space-y-2 mb-8 list-disc pl-5">
          <li>Du willst ein ganzes AI-Team orchestrieren — nicht nur einzelne Agents.</li>
          <li>Du brauchst Schweizer Datenschutz (nDSG), Open Source und die Möglichkeit zum Self-Hosting.</li>
          <li>Du willst Memory, Heartbeat, Dream Cycle und Budget Tracking — Features, die über einen einfachen Agent Builder hinausgehen.</li>
        </ul>
      </div>

      <div className="mt-12 rounded-2xl border border-[#000088]/20 bg-[#000088]/5 p-8 text-center">
        <h2 className="text-[22px] font-bold mb-2">Teste KaderOS kostenlos</h2>
        <p className="text-[#6E6E73] text-[14px] mb-6">
          Kein Kreditkarte nötig. In 30 Minuten steht dein erstes AI-Team.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-3 bg-[#000088] text-white text-[14px] font-semibold rounded-xl hover:bg-[#000066] transition-colors"
        >
          Kostenlos starten
        </Link>
      </div>

      <div className="mt-8 flex justify-between text-[13px]">
        <Link href="/compare" className="text-[#86868B] hover:text-[#000088] transition-colors">
          &larr; Alle Vergleiche
        </Link>
        <Link href="/pricing" className="text-[#86868B] hover:text-[#000088] transition-colors">
          Preise &rarr;
        </Link>
      </div>
    </article>
  );
}
