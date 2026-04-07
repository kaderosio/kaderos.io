import Link from "next/link";

export const metadata = {
  title: "KaderOS vs LangChain — Ehrlicher Vergleich 2026",
  description:
    "LangChain und KaderOS im direkten Vergleich: LLM-Framework vs AI-Team-Orchestrierung. Pricing, Features, Schweiz-Tauglichkeit und mehr.",
};

const rows = [
  { feature: "Pricing", kaderos: "Free Tier + ab CHF 79/Mt.", competitor: "Open Source + LangSmith ab $39/Mt." },
  { feature: "Open Source", kaderos: "Ja (MIT)", competitor: "Ja (MIT)" },
  { feature: "Swiss/DACH-Fokus", kaderos: "Ja — gebaut für die Schweiz", competitor: "Nein — US-fokussiert" },
  { feature: "Memory System", kaderos: "3-Layer Memory (Short/Long/Entity)", competitor: "Conversation Memory + Vector Store" },
  { feature: "Agent Roles", kaderos: "Vordefinierte Rollen + Custom", competitor: "Keine Rollen — generische Agents" },
  { feature: "Budget Tracking", kaderos: "Eingebaut (CHF/EUR/USD)", competitor: "Token-Tracking via LangSmith" },
  { feature: "CHF Support", kaderos: "Native CHF-Unterstützung", competitor: "Nein" },
  { feature: "nDSG-Konformität", kaderos: "Ja — by Design", competitor: "Eigenverantwortung" },
  { feature: "Heartbeat Engine", kaderos: "Ja — Agents melden Status", competitor: "LangSmith Tracing" },
  { feature: "Knowledge Graph", kaderos: "Ja (Graphiti/ZEP)", competitor: "Via Integrationen möglich" },
  { feature: "Dream Cycle", kaderos: "Ja — Agents lernen im Schlaf", competitor: "Nein" },
  { feature: "Templates", kaderos: "Branchenspezifisch (CH)", competitor: "LangChain Hub Templates" },
  { feature: "Ansatz", kaderos: "Fertige AI-Team Plattform", competitor: "Developer Framework / Toolkit" },
  { feature: "Lernkurve", kaderos: "30 Minuten", competitor: "Steil — umfangreiche API" },
];

export default function CompareLangChain() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Vergleich
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          KaderOS vs LangChain
        </h1>
        <p className="text-[#6E6E73] text-[16px] leading-relaxed">
          LangChain ist das populärste Framework für LLM-basierte Anwendungen. KaderOS ist eine
          Workforce Orchestration Engine für Schweizer KMU. LangChain gibt dir Bausteine —
          KaderOS gibt dir ein fertiges System.
        </p>
      </div>

      <div className="overflow-x-auto mb-12">
        <table className="w-full text-[14px] border-collapse">
          <thead>
            <tr className="border-b-2 border-[#000088]/20">
              <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">Feature</th>
              <th className="text-left py-3 px-4 font-semibold text-[#000088]">KaderOS</th>
              <th className="text-left py-3 pl-4 font-semibold text-[#6E6E73]">LangChain</th>
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
        <h2>Für wen ist LangChain besser?</h2>
        <ul className="space-y-2 mb-8 list-disc pl-5">
          <li>Du bist Entwickler und willst eine massgeschneiderte LLM-Anwendung bauen — RAG, Chatbots, Custom Agents.</li>
          <li>Du brauchst maximale Flexibilität und willst jede Komponente selbst zusammenstecken.</li>
          <li>Du hast ein Engineering-Team, das die Komplexität des Frameworks managen kann.</li>
        </ul>

        <h2>Für wen ist KaderOS besser?</h2>
        <ul className="space-y-2 mb-8 list-disc pl-5">
          <li>Du willst ein AI-Team einsetzen, nicht ein Framework lernen. Business-first, nicht Code-first.</li>
          <li>Du brauchst Schweizer Kontext: nDSG, CHF, lokale Geschäftskultur — out of the box.</li>
          <li>Du willst in 30 Minuten produktiv sein, statt Wochen in Framework-Architektur zu investieren.</li>
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
