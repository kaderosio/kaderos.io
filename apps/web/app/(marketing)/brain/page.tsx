import Link from "next/link";

export const metadata = {
  title: "Agent Brain — 7-Schichten Gedächtnis | KaderOS",
  description:
    "Kein LLM. Reine Mathematik. 7 Schichten Gedächtnis für AI Agents die sich erinnern, vernetzen, lernen und vorhersagen. Der Kern von KaderOS.",
};

const LAYERS = [
  {
    num: "01",
    name: "Perception Gate",
    desc: "Bewertet jede Information: Emotion, Neuheit, Dringlichkeit, Vertrauen. Unwichtiges wird sofort abgestuft.",
    detail: "4 Scores pro Input. Gewichtet nach Quelle. Kein Bias.",
    color: "#000088",
  },
  {
    num: "02",
    name: "Working Memory",
    desc: "7-Item Buffer — wie beim Menschen. Die wichtigsten 7 Punkte sind immer griffbereit.",
    detail: "Miller's Law. FIFO + Priorität. In-Memory für Echtzeit.",
    color: "#1a1a99",
  },
  {
    num: "03",
    name: "Episodisches Gedächtnis",
    desc: "Konkrete Erinnerungen mit Zeitstempel, Kontext und Gewicht. Wird bei jedem Abruf stärker.",
    detail: "pgvector Cosine Search. Reconsolidation bei Recall. 384d Embeddings.",
    color: "#3333aa",
  },
  {
    num: "04",
    name: "Knowledge Graph",
    desc: "Personen, Orte, Konzepte — automatisch erkannt und vernetzt. Dein Kader weiss wer mit wem verbunden ist.",
    detail: "spaCy NER → Entities + Relationships. Co-Mention Edges. Graph Traversal.",
    color: "#4d4dbb",
  },
  {
    num: "05",
    name: "Prozedurales Gedächtnis",
    desc: "Nach 3 Wiederholungen wird ein Muster erkannt. Dein Kader lernt Abläufe — automatisch.",
    detail: "Pattern Detection. Trigger → Action. Confidence steigt mit jeder Beobachtung.",
    color: "#6666cc",
  },
  {
    num: "06",
    name: "Predictive Engine",
    desc: "Proaktive Alerts alle 60 Minuten. Dein Kader warnt dich bevor Probleme eskalieren.",
    detail: "Zeitliche Muster. Überfällige Events. Wahrscheinlichkeits-Scoring.",
    color: "#8080dd",
  },
  {
    num: "07",
    name: "Dream Cycle",
    desc: "Jede Nacht um 02:00: Unwichtiges vergessen. Wichtiges verdichten. Kreative Verbindungen entdecken.",
    detail: "Ebbinghaus Decay. Consolidation. Kreative Suche zwischen unverbundenen Entities.",
    color: "#9999ee",
  },
];

const COMPARISONS = [
  { tool: "ChatGPT", memory: "Keine", sessions: "Jede Session bei null", graph: "Nein", learning: "Nein", prediction: "Nein" },
  { tool: "CrewAI", memory: "Optional (extern)", sessions: "Kein Standard", graph: "Nein", learning: "Nein", prediction: "Nein" },
  { tool: "AutoGen", memory: "Basis", sessions: "Manuell", graph: "Nein", learning: "Nein", prediction: "Nein" },
  { tool: "n8n", memory: "Keine", sessions: "Stateless", graph: "Nein", learning: "Nein", prediction: "Nein" },
  { tool: "KaderOS", memory: "7 Schichten", sessions: "Permanent", graph: "Ja", learning: "Ja (ab 3x)", prediction: "Ja (60min)" },
];

export default function BrainPage() {
  return (
    <div className="py-20 px-6">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-4">
          Agent Brain
        </div>
        <h1 className="text-[48px] sm:text-[64px] font-extrabold tracking-tight mb-6">
          Dein Kader vergisst nichts.
        </h1>
        <p className="text-[18px] text-[#6E6E73] max-w-2xl mx-auto mb-4">
          7 Schichten Gedächtnis. Kein LLM. Reine Mathematik.
          Deine Agents erinnern sich, vernetzen Wissen, lernen Muster und sagen voraus.
        </p>
        <p className="text-[14px] text-[#86868B]">
          CHF 5/Monat Betriebskosten. Kein GPU nötig. Open Source.
        </p>
      </div>

      {/* 7 Layers */}
      <div className="max-w-4xl mx-auto mb-24">
        <div className="space-y-6">
          {LAYERS.map((layer) => (
            <div
              key={layer.num}
              className="flex gap-6 p-6 rounded-2xl border border-[#E5E5EA] hover:border-[#000088]/30 hover:shadow-lg transition-all"
            >
              <div
                className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white font-extrabold text-[18px]"
                style={{ background: layer.color }}
              >
                {layer.num}
              </div>
              <div>
                <h3 className="text-[18px] font-bold mb-1">{layer.name}</h3>
                <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-2">
                  {layer.desc}
                </p>
                <p className="text-[12px] text-[#86868B] font-mono">
                  {layer.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dream Cycle Highlight */}
      <div className="max-w-4xl mx-auto mb-24">
        <div className="bg-gradient-to-br from-[#000088]/5 to-white rounded-3xl p-10 border border-[#000088]/10">
          <h2 className="text-[32px] font-bold mb-4">
            Was passiert um 02:00 nachts?
          </h2>
          <p className="text-[16px] text-[#6E6E73] leading-relaxed mb-6">
            Dein Kader schläft nicht. Aber es träumt. Jede Nacht laufen drei Prozesse:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white rounded-xl border border-[#E5E5EA]">
              <div className="text-[24px] mb-2">🧹</div>
              <h4 className="font-bold mb-1">Vergessen</h4>
              <p className="text-[13px] text-[#6E6E73]">
                Ebbinghaus Decay. Unwichtige Erinnerungen verlieren Gewicht. Wie beim Menschen.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-[#E5E5EA]">
              <div className="text-[24px] mb-2">🔗</div>
              <h4 className="font-bold mb-1">Verdichten</h4>
              <p className="text-[13px] text-[#6E6E73]">
                Ähnliche Erinnerungen (92%+) werden zusammengeführt. Stärkere bleiben.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-[#E5E5EA]">
              <div className="text-[24px] mb-2">💡</div>
              <h4 className="font-bold mb-1">Entdecken</h4>
              <p className="text-[13px] text-[#6E6E73]">
                Kreative Verbindungssuche zwischen unverbundenen Entities. Neue Muster entstehen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-5xl mx-auto mb-24">
        <h2 className="text-[32px] font-bold text-center mb-8">
          Kein anderes Tool hat das.
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b-2 border-[#000088]">
                <th className="text-left py-3 px-4 font-semibold">Tool</th>
                <th className="text-left py-3 px-4 font-semibold">Memory</th>
                <th className="text-left py-3 px-4 font-semibold">Sessions</th>
                <th className="text-left py-3 px-4 font-semibold">Knowledge Graph</th>
                <th className="text-left py-3 px-4 font-semibold">Lernen</th>
                <th className="text-left py-3 px-4 font-semibold">Vorhersagen</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISONS.map((row) => (
                <tr
                  key={row.tool}
                  className={`border-b border-[#E5E5EA] ${row.tool === "KaderOS" ? "bg-[#000088]/5 font-semibold" : ""}`}
                >
                  <td className="py-3 px-4">{row.tool}</td>
                  <td className="py-3 px-4">{row.memory}</td>
                  <td className="py-3 px-4">{row.sessions}</td>
                  <td className="py-3 px-4">{row.graph}</td>
                  <td className="py-3 px-4">{row.learning}</td>
                  <td className="py-3 px-4">{row.prediction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="max-w-3xl mx-auto mb-24 text-center">
        <h2 className="text-[32px] font-bold mb-4">
          Kein LLM. Reine Mathematik.
        </h2>
        <p className="text-[16px] text-[#6E6E73] mb-8">
          Der Agent Brain nutzt kein Sprachmodell für die Gedächtnisarbeit.
          Alles basiert auf Embeddings, Graphen und Algorithmen.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[13px]">
          {[
            { label: "Vektor-Suche", tech: "pgvector" },
            { label: "Embeddings", tech: "384d multilingual" },
            { label: "Entity Extraction", tech: "spaCy (deutsch)" },
            { label: "Knowledge Graph", tech: "PostgreSQL" },
            { label: "Scheduling", tech: "APScheduler" },
            { label: "API", tech: "FastAPI" },
            { label: "Hosting", tech: "Railway" },
            { label: "Kosten", tech: "CHF 5/Monat" },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-xl border border-[#E5E5EA]">
              <div className="text-[#86868B] mb-1">{item.label}</div>
              <div className="font-semibold">{item.tech}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-[#000088] to-[#3333aa] rounded-3xl p-12 text-white">
          <h2 className="text-[32px] font-bold mb-4">
            Dein Kader wartet.
          </h2>
          <p className="text-[16px] text-white/70 mb-8">
            4 Agents. 7 Schichten Gedächtnis. CHF 49 pro Monat.
            <br />
            Swiss Made. Open Source.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-3 bg-white text-[#000088] rounded-xl font-semibold text-[14px] hover:bg-white/90 transition"
            >
              Platz sichern
            </Link>
            <Link
              href="https://github.com/kaderosio/kaderos.io"
              className="px-8 py-3 border border-white/30 text-white rounded-xl font-semibold text-[14px] hover:bg-white/10 transition"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
