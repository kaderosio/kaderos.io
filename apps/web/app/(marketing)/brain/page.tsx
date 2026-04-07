import Link from "next/link";

export const metadata = {
  title: "Agent Brain — KI-Gedächtnis für CHF 5/Monat | KaderOS",
  description:
    "7-Schichten Memory-System für KI-Agenten. Perception Gate, Knowledge Graph, Dream Cycle. Für Schweizer KMU. Kein LLM, kein Code nötig. Ab CHF 5/Monat.",
  other: {
    "script:ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Was ist der Agent Brain?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Der Agent Brain ist ein 7-Schichten Gedächtnis-Layer für AI Agents. Er speichert, verbindet und erinnert — damit jeder Agent ein permanentes Gedächtnis hat. Kein LLM. Reine Mathematik: pgvector, spaCy NER, Graph Traversal.",
            },
          },
          {
            "@type": "Question",
            name: "Welche 7 Schichten hat der Agent Brain?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "1. Perception Gate (bewertet Emotion, Neuheit, Dringlichkeit), 2. Working Memory (7-Item Buffer), 3. Episodisches Gedächtnis (mit Reconsolidation), 4. Knowledge Graph (Entitäten + Beziehungen), 5. Prozedurales Gedächtnis (Muster ab 3x Wiederholung), 6. Predictive Engine (proaktive Alerts alle 60 Min), 7. Dream Cycle (Nacht-Job um 02:00 — vergessen, verdichten, kreativ verbinden).",
            },
          },
          {
            "@type": "Question",
            name: "Braucht das GPT-4 oder OpenAI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nein. Der Agent Brain braucht kein Sprachmodell. Alles ist reine Datenbankarbeit und Mathematik — sentence-transformers für Embeddings, spaCy für Entity Extraction, PostgreSQL/pgvector für Vektor-Suche. Kein API-Call nach aussen.",
            },
          },
          {
            "@type": "Question",
            name: "Was passiert mit meinen Daten?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Swiss Hosting. Alle Daten bleiben in der Schweiz. Kein API-Call nach aussen. Kein OpenAI, kein Anthropic, kein Drittanbieter. Volle Kontrolle über deine Daten.",
            },
          },
          {
            "@type": "Question",
            name: "Wie schnell lernt der Agent?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "3x Wiederholung = Regel. Das prozedurale Gedächtnis erkennt Muster automatisch. Nach 30 Tagen hat dein Agent 500+ Verbindungen im Knowledge Graph aufgebaut.",
            },
          },
          {
            "@type": "Question",
            name: "Was ist der Dream Cycle?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Um 02:00 nachts laufen drei Prozesse: Unwichtiges vergessen (Ebbinghaus Decay), Ähnliches verdichten (Consolidation), und kreative Verbindungen zwischen unverbundenen Entitäten entdecken. Das Äquivalent des menschlichen REM-Schlafs.",
            },
          },
          {
            "@type": "Question",
            name: "Was ist der Unterschied zu ChatGPT Memory?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ChatGPT speichert Notizen — flache Liste, kein Kontext. Der Agent Brain baut ein lebendes Wissensnetz: Entities, Beziehungen, Muster, Vorhersagen. 7 Schichten statt einer Textdatei.",
            },
          },
          {
            "@type": "Question",
            name: "Was kostet der Agent Brain?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CHF 5 pro Monat. Zum Vergleich: Mem0 Pro kostet $249/Monat, Zep Pro $50/Monat. KaderOS Brain ist das günstigste produktionsreife AI-Gedächtnis auf dem Markt.",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "KaderOS Agent Brain",
        description: "7-Schichten Memory-System für KI-Agenten",
        offers: {
          "@type": "Offer",
          price: "5",
          priceCurrency: "CHF",
          availability: "https://schema.org/InStock",
        },
      },
    ]),
  },
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

const COST_COMPARISON = [
  { name: "KaderOS Brain", price: "CHF 5", period: "/Monat", note: "Alles inklusive. Swiss Hosting.", highlight: true },
  { name: "Mem0 Pro", price: "$249", period: "/Monat", note: "US-Hosting. Vendor Lock-in.", highlight: false },
  { name: "Zep Pro", price: "$50", period: "/Monat", note: "Nur episodisches Memory.", highlight: false },
  { name: "MemGPT", price: "$100+", period: "/Monat", note: "Eigene Infra nötig. GPU-Kosten.", highlight: false },
];

const FAQS = [
  {
    q: "Braucht das GPT-4 oder OpenAI?",
    a: "Nein. Reine Datenbankarbeit und Mathematik. sentence-transformers für Embeddings, spaCy für Entity Extraction, PostgreSQL für alles andere. Kein API-Call nach aussen.",
  },
  {
    q: "Was passiert mit meinen Daten?",
    a: "Swiss Hosting. Kein API-Call nach aussen. Keine Daten bei OpenAI, Anthropic oder sonstigen Drittanbietern. Du hast volle Kontrolle.",
  },
  {
    q: "Wie schnell lernt der Agent?",
    a: "3x Wiederholung = Regel. Das prozedurale Gedächtnis erkennt Muster automatisch. Nach 30 Tagen: 500+ Verbindungen im Knowledge Graph.",
  },
  {
    q: "Was ist der Dream Cycle?",
    a: "Um 02:00 nachts: vergessen, verdichten, kreative Verbindungen entdecken. Ebbinghaus Decay räumt Unwichtiges ab. Consolidation führt Ähnliches zusammen. Und die kreative Suche findet Verbindungen zwischen Dingen, die noch nie zusammen aufgetaucht sind.",
  },
  {
    q: "Was ist der Unterschied zu ChatGPT Memory?",
    a: "ChatGPT speichert Notizen — eine flache Liste ohne Kontext. Der Agent Brain baut ein lebendes Wissensnetz mit Entities, Beziehungen, Mustern und Vorhersagen. 7 Schichten statt einer Textdatei.",
  },
];

export default function BrainPage() {
  return (
    <div className="py-20 px-6">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-4">
          Agent Brain
        </div>
        <h1 className="text-[48px] sm:text-[64px] font-extrabold tracking-tight mb-6" style={{ color: "#1D1D1F" }}>
          Dein AI-Agent vergisst nichts.
          <br />
          <span className="text-[#6E6E73]">Aber er weiss, was wichtig ist.</span>
        </h1>
        <p className="text-[18px] text-[#6E6E73] max-w-2xl mx-auto mb-4">
          7 Schichten Gedächtnis. CHF 5 im Monat. Null OpenAI.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/signup"
            className="px-8 py-3 bg-[#000088] text-white rounded-xl font-semibold text-[14px] hover:bg-[#000088]/90 transition"
          >
            Gratis starten
          </Link>
          <Link
            href="#layers"
            className="px-8 py-3 border border-[#E5E5EA] text-[#1D1D1F] rounded-xl font-semibold text-[14px] hover:border-[#000088]/30 transition"
          >
            Wie es funktioniert
          </Link>
        </div>
      </div>

      {/* 7 Layers */}
      <div id="layers" className="max-w-4xl mx-auto mb-24">
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

      {/* Cost Comparison */}
      <div className="max-w-4xl mx-auto mb-24">
        <h2 className="text-[32px] font-bold text-center mb-4" style={{ color: "#1D1D1F" }}>
          Was AI-Gedächtnis wirklich kostet.
        </h2>
        <p className="text-[16px] text-[#6E6E73] text-center mb-10 max-w-2xl mx-auto">
          Die meisten AI-Memory-Lösungen kosten ein Vermögen — oder du brauchst eigene Infrastruktur. Der Agent Brain nicht.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COST_COMPARISON.map((item) => (
            <div
              key={item.name}
              className={`p-6 rounded-2xl border-2 transition-all ${
                item.highlight
                  ? "border-[#000088] bg-[#000088]/5 shadow-lg"
                  : "border-[#E5E5EA] bg-white"
              }`}
            >
              {item.highlight && (
                <div className="text-[11px] font-semibold text-[#000088] uppercase tracking-widest mb-3">
                  Empfohlen
                </div>
              )}
              <div className="text-[14px] text-[#6E6E73] mb-2">{item.name}</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className={`text-[36px] font-extrabold ${item.highlight ? "text-[#000088]" : "text-[#1D1D1F]"}`}>
                  {item.price}
                </span>
                <span className="text-[14px] text-[#86868B]">{item.period}</span>
              </div>
              <p className="text-[13px] text-[#6E6E73]">{item.note}</p>
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
            { label: "Hosting", tech: "Swiss (Railway)" },
            { label: "Kosten", tech: "CHF 5/Monat" },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-xl border border-[#E5E5EA]">
              <div className="text-[#86868B] mb-1">{item.label}</div>
              <div className="font-semibold">{item.tech}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto mb-24">
        <h2 className="text-[32px] font-bold text-center mb-10">
          Häufige Fragen
        </h2>
        <div className="space-y-6">
          {FAQS.map((faq) => (
            <div key={faq.q} className="p-6 rounded-2xl border border-[#E5E5EA]">
              <h3 className="text-[16px] font-bold mb-2" style={{ color: "#1D1D1F" }}>
                {faq.q}
              </h3>
              <p className="text-[15px] text-[#6E6E73] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-[#000088] to-[#3333aa] rounded-3xl p-12 text-white">
          <h2 className="text-[32px] font-bold mb-4">
            Gib deinem AI-Agent ein Gehirn.
          </h2>
          <p className="text-[18px] text-white/70 mb-8">
            Starte gratis. 7 Schichten Gedächtnis. CHF 5 im Monat.
            <br />
            Swiss Hosting. Kein OpenAI nötig.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-3 bg-white text-[#000088] rounded-xl font-semibold text-[14px] hover:bg-white/90 transition"
            >
              Gratis starten
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
