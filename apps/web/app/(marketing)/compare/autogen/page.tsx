import Link from "next/link";

export const metadata = {
  title: "KaderOS vs AutoGen — Ehrlicher Vergleich 2026",
  description:
    "AutoGen von Microsoft und KaderOS im direkten Vergleich: Pricing, Features, Schweiz-Tauglichkeit, Memory System und mehr.",
};

const rows = [
  { feature: "Pricing", kaderos: "Free Tier + ab CHF 49/Mt.", competitor: "Open Source (kostenlos)" },
  { feature: "Open Source", kaderos: "Ja (MIT)", competitor: "Ja (MIT)" },
  { feature: "Swiss/DACH-Fokus", kaderos: "Ja — gebaut für die Schweiz", competitor: "Nein — Microsoft/US-Ökosystem" },
  { feature: "Memory System", kaderos: "3-Layer Memory (Short/Long/Entity)", competitor: "Teachable Agents (begrenzt)" },
  { feature: "Agent Roles", kaderos: "Vordefinierte Rollen + Custom", competitor: "Frei definierbar via Code" },
  { feature: "Budget Tracking", kaderos: "Eingebaut (CHF/EUR/USD)", competitor: "Nicht vorhanden" },
  { feature: "CHF Support", kaderos: "Native CHF-Unterstützung", competitor: "Nein" },
  { feature: "nDSG-Konformität", kaderos: "Ja — by Design", competitor: "Eigenverantwortung" },
  { feature: "Heartbeat Engine", kaderos: "Ja — Agents melden Status", competitor: "Nein" },
  { feature: "Knowledge Graph", kaderos: "Ja (Graphiti/ZEP)", competitor: "Nein" },
  { feature: "Dream Cycle", kaderos: "Ja — Agents lernen im Schlaf", competitor: "Nein" },
  { feature: "Templates", kaderos: "Ja — branchenspezifisch", competitor: "Notebook-Beispiele" },
  { feature: "No-Code Setup", kaderos: "Ja — kein Code nötig", competitor: "Nein — Python erforderlich" },
  { feature: "Human-in-the-Loop", kaderos: "Confidence Gates", competitor: "Ja — eingebaut" },
];

export default function CompareAutoGen() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Vergleich
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          KaderOS vs AutoGen
        </h1>
        <p className="text-[#6E6E73] text-[16px] leading-relaxed">
          AutoGen ist Microsofts Open-Source-Framework für Multi-Agent-Konversationen. KaderOS ist eine
          Workforce Orchestration Engine für den Schweizer Markt. Beide setzen auf AI Agents —
          aber für sehr unterschiedliche Nutzer.
        </p>
      </div>

      <div className="overflow-x-auto mb-12">
        <table className="w-full text-[14px] border-collapse">
          <thead>
            <tr className="border-b-2 border-[#000088]/20">
              <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">Feature</th>
              <th className="text-left py-3 px-4 font-semibold text-[#000088]">KaderOS</th>
              <th className="text-left py-3 pl-4 font-semibold text-[#6E6E73]">AutoGen</th>
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
        <h2>Für wen ist AutoGen besser?</h2>
        <ul className="space-y-2 mb-8 list-disc pl-5">
          <li>Du bist im Microsoft-Ökosystem unterwegs und willst Azure-native Agents bauen.</li>
          <li>Du brauchst komplexe Multi-Agent-Konversationen mit Code-Execution.</li>
          <li>Du hast ein Entwicklerteam, das Python-basierte Agent-Systeme betreuen kann.</li>
        </ul>

        <h2>Für wen ist KaderOS besser?</h2>
        <ul className="space-y-2 mb-8 list-disc pl-5">
          <li>Du willst AI Agents produktiv einsetzen, ohne selbst zu programmieren.</li>
          <li>Du brauchst Schweizer Datenschutz (nDSG), CHF-Budgets und lokalen Kontext.</li>
          <li>Du willst ein fertiges System mit Heartbeat Engine, Dream Cycle und Budget Tracking statt ein Research-Framework.</li>
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
