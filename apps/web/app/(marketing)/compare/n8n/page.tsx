import Link from "next/link";

export const metadata = {
  title: "KaderOS vs n8n — Ehrlicher Vergleich 2026",
  description:
    "n8n und KaderOS im direkten Vergleich: Workflow-Automatisierung vs AI-Team-Orchestrierung. Pricing, Features und Schweiz-Tauglichkeit.",
};

const rows = [
  { feature: "Pricing", kaderos: "Free Tier + ab CHF 49/Mt.", competitor: "Free (Self-Host) + Cloud ab EUR 24/Mt." },
  { feature: "Open Source", kaderos: "Ja (MIT)", competitor: "Ja (Sustainable Use License)" },
  { feature: "Swiss/DACH-Fokus", kaderos: "Ja — gebaut für die Schweiz", competitor: "Teilweise — Firma in Berlin" },
  { feature: "Memory System", kaderos: "3-Layer Memory (Short/Long/Entity)", competitor: "Kein Agent Memory" },
  { feature: "Agent Roles", kaderos: "Vordefinierte Rollen + Custom", competitor: "Keine echten Agent Roles" },
  { feature: "Budget Tracking", kaderos: "Eingebaut (CHF/EUR/USD)", competitor: "Execution-basiert, kein AI-Budget" },
  { feature: "CHF Support", kaderos: "Native CHF-Unterstützung", competitor: "EUR-basiert" },
  { feature: "nDSG-Konformität", kaderos: "Ja — by Design", competitor: "Self-Host möglich, aber Eigenverantwortung" },
  { feature: "Heartbeat Engine", kaderos: "Ja — Agents melden Status", competitor: "Workflow-Monitoring" },
  { feature: "Knowledge Graph", kaderos: "Ja (Graphiti/ZEP)", competitor: "Nein" },
  { feature: "Dream Cycle", kaderos: "Ja — Agents lernen im Schlaf", competitor: "Nein" },
  { feature: "Templates", kaderos: "AI-Team Templates", competitor: "1000+ Workflow Templates" },
  { feature: "Ansatz", kaderos: "AI-Team Orchestrierung", competitor: "Workflow-Automatisierung" },
  { feature: "Integrationen", kaderos: "Fokus auf AI-Tools", competitor: "400+ App-Integrationen" },
];

export default function CompareN8N() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Vergleich
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          KaderOS vs n8n
        </h1>
        <p className="text-[#6E6E73] text-[16px] leading-relaxed">
          n8n ist eine beliebte Open-Source-Plattform für Workflow-Automatisierung aus Berlin. KaderOS
          orchestriert AI-Teams. Beide automatisieren Arbeit — aber auf grundlegend verschiedene Art.
        </p>
      </div>

      <div className="overflow-x-auto mb-12">
        <table className="w-full text-[14px] border-collapse">
          <thead>
            <tr className="border-b-2 border-[#000088]/20">
              <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">Feature</th>
              <th className="text-left py-3 px-4 font-semibold text-[#000088]">KaderOS</th>
              <th className="text-left py-3 pl-4 font-semibold text-[#6E6E73]">n8n</th>
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
        <h2>Für wen ist n8n besser?</h2>
        <ul className="space-y-2 mb-8 list-disc pl-5">
          <li>Du brauchst klassische Workflow-Automatisierung mit 400+ App-Integrationen (Slack, Google, CRM).</li>
          <li>Du willst deterministische Workflows, nicht autonome AI Agents.</li>
          <li>Du bist technisch versiert und willst deine Automationen selbst hosten.</li>
        </ul>

        <h2>Für wen ist KaderOS besser?</h2>
        <ul className="space-y-2 mb-8 list-disc pl-5">
          <li>Du willst AI Agents, die selbständig denken, lernen und zusammenarbeiten — nicht nur Wenn-Dann-Workflows.</li>
          <li>Du brauchst ein AI-Team mit Memory, Budget Tracking und Schweizer Compliance.</li>
          <li>Du willst Agents mit Rollen, Confidence Gates und einem Heartbeat — nicht nur automatisierte Abläufe.</li>
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
