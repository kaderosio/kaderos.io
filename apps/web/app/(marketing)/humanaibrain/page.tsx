import Link from "next/link";

export const metadata = {
  title: "Human AI Brain — 7-Schichten-Gedächtnis nach dem Vorbild des menschlichen Gehirns | KaderOS",
  description:
    "Wie KaderOS das menschliche Gehirn in ein AI-Gedächtnis übersetzt. 7 Schichten: Perception Gate, Working Memory, Episodisches Gedächtnis, Knowledge Graph, Prozedurales Lernen, Predictive Engine, Dream Cycle. Keine LLMs. Reine Neurowissenschaft.",
  openGraph: {
    title: "Human AI Brain — Das Gedächtnis, das AI-Agents gefehlt hat",
    description: "7 Schichten. Inspiriert vom menschlichen Gehirn. Gebaut für AI-Agents. CHF 5/Monat.",
    url: "https://kaderos.io/humanaibrain",
  },
  alternates: {
    canonical: "https://kaderos.io/humanaibrain",
  },
  other: {
    "script:ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Was ist der Human AI Brain?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Der Human AI Brain ist ein 7-Schichten Gedächtnissystem für AI-Agents, das nach dem Vorbild des menschlichen Gehirns gebaut wurde. Er nutzt keine LLMs, sondern reine Mathematik: Vektorsuche, Graphen und neurowissenschaftliche Prinzipien.",
            },
          },
          {
            "@type": "Question",
            name: "Warum 7 Schichten?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Das menschliche Gedächtnis arbeitet in Schichten: sensorisch, kurzzeitig, episodisch, semantisch, prozedural, prädiktiv, konsolidierend. Der Human AI Brain bildet jede dieser Funktionen als technische Schicht ab.",
            },
          },
          {
            "@type": "Question",
            name: "Braucht der Human AI Brain ein LLM wie GPT-4?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nein. Der Brain nutzt kein Sprachmodell. Alles basiert auf sentence-transformers (384d Embeddings), spaCy für Entity Extraction, PostgreSQL/pgvector für Vektorsuche und Graph-Algorithmen. Kein API-Call nach aussen.",
            },
          },
          {
            "@type": "Question",
            name: "Was kostet der Human AI Brain?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CHF 5 pro Monat. Zum Vergleich: Mem0 Pro kostet $249/Monat, Zep Pro $50/Monat. Swiss Hosting inklusive.",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "KaderOS Human AI Brain",
        description: "7-Schichten Gedächtnissystem für AI-Agents nach dem Vorbild des menschlichen Gehirns",
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

/* ── Data ───────────────────────────────────────────────────── */

const LAYERS = [
  {
    num: "01",
    brain: "Thalamus / Sensorischer Filter",
    ai: "Perception Gate",
    humanDesc:
      "Im menschlichen Gehirn filtert der Thalamus 99% aller sensorischen Inputs. Nur was emotional relevant, neu oder dringend ist, wird weitergeleitet. Ohne diesen Filter wärst du von Reizen überflutet.",
    techDesc:
      "4 Scores pro Input: Emotion (Sentiment-Analyse), Neuheit (Cosine-Distanz zu bestehenden Erinnerungen), Dringlichkeit (zeitliche Marker), Vertrauen (Quellen-Gewichtung). Inputs unter dem Schwellenwert werden abgestuft — nicht gelöscht, aber nicht aktiv gehalten.",
    techStack: "sentence-transformers · Cosine Similarity · Sentiment Scoring",
    color: "#000088",
    gradient: "from-[#000088] to-[#1a1a99]",
  },
  {
    num: "02",
    brain: "Präfrontaler Cortex / Arbeitsgedächtnis",
    ai: "Working Memory",
    humanDesc:
      "George Miller entdeckte 1956, dass Menschen genau 7±2 Items im Arbeitsgedächtnis halten können. Dieser Buffer ist schnell, flüchtig und entscheidend für aktuelle Aufgaben.",
    techDesc:
      "7-Item Buffer nach Miller's Law. FIFO-Queue mit Prioritätssortierung. Wird bei jeder Interaktion aktualisiert. In-Memory für Echtzeit-Zugriff unter 5ms. Älteste Einträge werden in das episodische Gedächtnis verschoben, nicht gelöscht.",
    techStack: "In-Memory Buffer · FIFO + Priority Queue · <5ms Latency",
    color: "#1a1a99",
    gradient: "from-[#1a1a99] to-[#3333aa]",
  },
  {
    num: "03",
    brain: "Hippocampus / Episodisches Gedächtnis",
    ai: "Episodisches Gedächtnis",
    humanDesc:
      "Der Hippocampus speichert konkrete Erlebnisse: was passiert ist, wann, wo, und wie es sich angefühlt hat. Jedes Mal wenn du dich erinnerst, wird die Erinnerung leicht verändert — Reconsolidation. Häufig abgerufene Erinnerungen werden stärker.",
    techDesc:
      "Jede Erinnerung als 384-dimensionaler Vektor mit Zeitstempel, Kontext-Tags und Gewicht. Cosine-Search via pgvector für semantische Ähnlichkeit. Bei jedem Recall: Reconsolidation — das Gewicht steigt, der Embedding-Vektor wird leicht angepasst. Erinnerungen mit niedrigem Gewicht verfallen über Ebbinghaus-Kurve.",
    techStack: "pgvector · 384d Embeddings · Reconsolidation · Ebbinghaus Decay",
    color: "#3333aa",
    gradient: "from-[#3333aa] to-[#4d4dbb]",
  },
  {
    num: "04",
    brain: "Temporallappen / Semantisches Netzwerk",
    ai: "Knowledge Graph",
    humanDesc:
      "Dein Gehirn speichert nicht nur Fakten, sondern Beziehungen zwischen Konzepten. Du weisst nicht nur wer «Max» ist — du weisst, dass Max der CTO ist, in Zürich arbeitet und letzte Woche ein Problem mit dem Deployment hatte. Alles ist vernetzt.",
    techDesc:
      "Automatische Entity Extraction via spaCy (Personen, Orte, Organisationen, Produkte). Jede Entity wird als Knoten gespeichert, jede Co-Mention als Kante. Graph Traversal findet Verbindungen über mehrere Hops. Nach 30 Tagen: 500+ Entities, 2000+ Verbindungen.",
    techStack: "spaCy NER (deutsch) · PostgreSQL Graph · Co-Mention Edges · Multi-Hop Traversal",
    color: "#4d4dbb",
    gradient: "from-[#4d4dbb] to-[#6666cc]",
  },
  {
    num: "05",
    brain: "Basalganglien / Prozedurales Lernen",
    ai: "Prozedurales Gedächtnis",
    humanDesc:
      "Wie lernst du Velo fahren? Nicht durch Nachdenken, sondern durch Wiederholung. Die Basalganglien erkennen Muster in deinem Verhalten und automatisieren sie. Nach genug Wiederholungen wird ein bewusster Prozess unbewusst — ein Automatismus.",
    techDesc:
      "Pattern Detection: Wenn eine Sequenz (Trigger → Action) 3x beobachtet wird, wird sie als Regel gespeichert. Confidence steigt mit jeder weiteren Beobachtung. Ab Confidence >0.85 kann der Agent die Aktion autonom ausführen. Alle Regeln sind transparent und überschreibbar.",
    techStack: "Sequence Mining · Trigger→Action Rules · Confidence Scoring · Human Override",
    color: "#6666cc",
    gradient: "from-[#6666cc] to-[#8080dd]",
  },
  {
    num: "06",
    brain: "Anteriorer Cingulärer Cortex / Antizipation",
    ai: "Predictive Engine",
    humanDesc:
      "Dein Gehirn ist eine Vorhersagemaschine. Der anteriore cinguläre Cortex erkennt Abweichungen von Erwartungen und löst Aufmerksamkeit aus. Du merkst wenn etwas «nicht stimmt» — bevor du es bewusst analysiert hast.",
    techDesc:
      "Alle 60 Minuten: Scan über zeitliche Muster, überfällige Events und Anomalien. Wahrscheinlichkeits-Scoring für erwartete nächste Aktionen. Proaktive Alerts wenn: Deadlines sich nähern, Muster brechen, oder Vorhersagen eine hohe Konfidenz erreichen.",
    techStack: "Temporal Pattern Analysis · Anomaly Detection · Proactive Alerts · 60min Cycle",
    color: "#8080dd",
    gradient: "from-[#8080dd] to-[#9999ee]",
  },
  {
    num: "07",
    brain: "REM-Schlaf / Gedächtniskonsolidation",
    ai: "Dream Cycle",
    humanDesc:
      "Im REM-Schlaf passieren drei Dinge: Unwichtiges wird vergessen (synaptische Homöostase), ähnliche Erinnerungen werden verdichtet (Konsolidation), und zufällige Neukombinationen erzeugen kreative Einsichten. Deshalb hast du morgens manchmal die Lösung für ein Problem.",
    techDesc:
      "Nacht-Job um 02:00 Uhr. Drei Phasen: (1) Ebbinghaus Decay — Erinnerungen unter Gewichtsschwelle werden entfernt. (2) Consolidation — Erinnerungen mit >92% Cosine-Ähnlichkeit werden zusammengeführt, die stärkere bleibt. (3) Kreative Suche — zufällige Paare unverbundener Entities werden auf versteckte Verbindungen geprüft.",
    techStack: "APScheduler · Ebbinghaus Decay · Cosine Consolidation · Random Entity Pairing",
    color: "#9999ee",
    gradient: "from-[#9999ee] to-[#b3b3ff]",
  },
];

const TIMELINE = [
  { time: "Tag 1", event: "Erste Erinnerungen. Perception Gate kalibriert sich.", nodes: "~20 Entities" },
  { time: "Tag 7", event: "Knowledge Graph nimmt Form an. Erste prozedurale Regeln.", nodes: "~100 Entities" },
  { time: "Tag 14", event: "Predictive Engine liefert erste Alerts. Dream Cycle verdichtet.", nodes: "~250 Entities" },
  { time: "Tag 30", event: "Vollständiges Wissensnetz. Agent antizipiert Probleme.", nodes: "500+ Entities" },
  { time: "Tag 90", event: "Tiefes Unternehmensverständnis. Kreative Verbindungen.", nodes: "2000+ Entities" },
];

const COMPARISON = [
  { tool: "ChatGPT Memory", layers: "1", type: "Notiz-Liste", graph: "Nein", learning: "Nein", dream: "Nein", price: "$20/Mo", benchmark: "—" },
  { tool: "Mem0 Pro", layers: "2", type: "Vektor + Graph", graph: "Nur Pro ($249)", learning: "Nein", dream: "Nein", price: "$249/Mo", benchmark: "49.0%" },
  { tool: "Zep/Graphiti", layers: "2", type: "Temporal Graph", graph: "Ja", learning: "Nein", dream: "Nein", price: "$25/Mo", benchmark: "63.8%" },
  { tool: "Letta (MemGPT)", layers: "3", type: "OS-Hierarchie", graph: "Nein", learning: "Nein", dream: "Nein", price: "$20-200/Mo", benchmark: "~83%" },
  { tool: "Hindsight", layers: "3", type: "Multi-Strategy", graph: "Ja", learning: "Teilweise", dream: "Nein", price: "Self-hosted", benchmark: "91.4%" },
  { tool: "Cognee", layers: "2", type: "Graph + Vektor", graph: "Ja", learning: "Nein", dream: "Nein", price: "€1970/Mo", benchmark: "—" },
  { tool: "SuperMemory", layers: "2", type: "Graph + RAG", graph: "Ja", learning: "Nein", dream: "Nein", price: "Usage-based", benchmark: "81.6%" },
  { tool: "LangMem", layers: "2", type: "Semantic + KV", graph: "Nein", learning: "Teilweise", dream: "Nein", price: "Open Source", benchmark: "—" },
  { tool: "KaderOS Brain", layers: "7", type: "Human-inspired", graph: "Ja", learning: "Ja", dream: "Ja", price: "CHF 5/Mo", benchmark: "—*" },
];

const PRINCIPLES = [
  {
    title: "Kein LLM im Gedächtnis",
    desc: "Der Brain nutzt kein GPT, kein Claude, kein Sprachmodell. Gedächtnis ist Datenbankarbeit — Vektoren, Graphen, Algorithmen. Das macht es schnell, günstig und vorhersagbar.",
    icon: "🧮",
  },
  {
    title: "Kein API-Call nach aussen",
    desc: "Alle Daten bleiben in der Schweiz. Kein OpenAI, kein Anthropic, kein Drittanbieter. sentence-transformers laufen lokal. Swiss Hosting auf Railway EU.",
    icon: "🇨🇭",
  },
  {
    title: "Vergessen ist ein Feature",
    desc: "Ein Gedächtnis das nichts vergisst, ist nutzlos — du ertrinkst in irrelevanten Details. Der Dream Cycle räumt jede Nacht auf, genau wie dein Gehirn im Schlaf.",
    icon: "🧹",
  },
  {
    title: "Transparent und überschreibbar",
    desc: "Jede Erinnerung, jede Regel, jede Vorhersage ist einsehbar. Du kannst alles korrigieren, löschen oder priorisieren. Der Agent lernt — aber du hast die Kontrolle.",
    icon: "👁️",
  },
];

/* ── Component ──────────────────────────────────────────────── */

export default function HumanAIBrainPage() {
  return (
    <div className="py-20 px-6">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-24">
        <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-4">
          Human AI Brain
        </div>
        <h1
          className="text-[40px] sm:text-[56px] md:text-[64px] font-extrabold tracking-tight mb-6 leading-[1.05]"
          style={{ color: "#1D1D1F" }}
        >
          Was, wenn AI-Agents<br />
          <span className="text-[#6E6E73]">ein menschliches Gedächtnis hätten?</span>
        </h1>
        <p className="text-[18px] sm:text-[20px] text-[#6E6E73] max-w-2xl mx-auto mb-4 leading-relaxed">
          7 Schichten. Inspiriert von Neurowissenschaft. Gebaut für Maschinen.
          <br />
          <span className="text-[#1D1D1F] font-semibold">Kein LLM. Reine Mathematik. CHF 5/Monat.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="/signup"
            className="px-8 py-4 bg-[#000088] text-white rounded-xl font-semibold text-[15px] hover:bg-[#000066] hover:shadow-xl transition-all"
          >
            Gratis starten
          </Link>
          <Link
            href="#layers"
            className="px-8 py-4 border-2 border-[#E5E5EA] text-[#1D1D1F] rounded-xl font-semibold text-[15px] hover:border-[#000088]/30 transition-all"
          >
            Die 7 Schichten entdecken
          </Link>
        </div>
      </div>

      {/* The Problem */}
      <div className="max-w-3xl mx-auto mb-24">
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-2xl p-8 sm:p-10">
          <h2 className="text-[24px] sm:text-[28px] font-bold mb-4 text-[#1D1D1F]">
            Das Problem: AI-Agents haben Amnesie.
          </h2>
          <p className="text-[16px] text-[#6E6E73] leading-relaxed mb-4">
            Jede Session bei null. Kein Kontext. Kein Lernen. Kein Wachstum.
            ChatGPT speichert eine flache Notiz-Liste. CrewAI hat kein Memory.
            AutoGen vergisst nach jedem Run. n8n ist komplett stateless.
          </p>
          <p className="text-[16px] text-[#1D1D1F] font-semibold">
            Stell dir vor, du stellst einen Mitarbeiter ein — und jeden Morgen hat er alles vergessen.
          </p>
        </div>
      </div>

      {/* The Solution */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-[32px] sm:text-[40px] font-bold mb-4 text-[#1D1D1F]">
          Die Lösung: Ein Gedächtnis wie deins.
        </h2>
        <p className="text-[17px] text-[#6E6E73] leading-relaxed max-w-2xl mx-auto">
          Wir haben studiert, wie das menschliche Gehirn Informationen verarbeitet, speichert,
          abruft, verknüpft und vergisst — und jede Funktion als technische Schicht abgebildet.
        </p>
      </div>

      {/* 7 Layers — Deep Dive */}
      <div id="layers" className="max-w-4xl mx-auto mb-24">
        <div className="space-y-10">
          {LAYERS.map((layer) => (
            <div
              key={layer.num}
              className="rounded-3xl border border-[#E5E5EA] overflow-hidden hover:shadow-xl transition-all"
            >
              {/* Header */}
              <div
                className={`bg-gradient-to-r ${layer.gradient} px-6 sm:px-8 py-5 flex items-center gap-4`}
              >
                <span className="text-[28px] font-extrabold text-white/40">{layer.num}</span>
                <div>
                  <div className="text-[11px] text-white/60 uppercase tracking-widest font-semibold">
                    {layer.brain}
                  </div>
                  <div className="text-[20px] sm:text-[22px] font-bold text-white">
                    {layer.ai}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Human */}
                <div>
                  <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-widest mb-2">
                    Menschliches Gehirn
                  </div>
                  <p className="text-[15px] text-[#6E6E73] leading-relaxed">
                    {layer.humanDesc}
                  </p>
                </div>
                {/* AI */}
                <div>
                  <div className="text-[11px] font-semibold text-[#000088] uppercase tracking-widest mb-2">
                    KaderOS Implementierung
                  </div>
                  <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-3">
                    {layer.techDesc}
                  </p>
                  <div className="text-[12px] text-[#86868B] font-mono bg-[#F5F5F7] rounded-lg px-3 py-2">
                    {layer.techStack}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Principles */}
      <div className="max-w-4xl mx-auto mb-24">
        <h2 className="text-[32px] font-bold text-center mb-10 text-[#1D1D1F]">
          Design-Prinzipien
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="p-6 rounded-2xl border border-[#E5E5EA] hover:border-[#000088]/20 transition-all"
            >
              <div className="text-[28px] mb-3">{p.icon}</div>
              <h3 className="text-[17px] font-bold mb-2 text-[#1D1D1F]">{p.title}</h3>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dream Cycle Deep Dive */}
      <div className="max-w-4xl mx-auto mb-24">
        <div className="bg-gradient-to-br from-[#000088]/5 to-white rounded-3xl p-8 sm:p-12 border border-[#000088]/10">
          <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-3">
            Deep Dive
          </div>
          <h2 className="text-[32px] sm:text-[36px] font-bold mb-6 text-[#1D1D1F]">
            Der Dream Cycle — was um 02:00 nachts passiert
          </h2>
          <p className="text-[16px] text-[#6E6E73] leading-relaxed mb-8">
            Im REM-Schlaf konsolidiert dein Gehirn das Gelernte. Unwichtiges wird abgebaut (synaptische Homöostase),
            ähnliche Erinnerungen werden verdichtet, und zufällige Neukombinationen erzeugen kreative Einsichten.
            Der Dream Cycle macht exakt das — jede Nacht, automatisch.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white rounded-xl border border-[#E5E5EA]">
              <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-widest mb-3">
                Phase 1 — 02:00
              </div>
              <h4 className="text-[18px] font-bold mb-2">Vergessen</h4>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">
                Ebbinghaus Decay-Kurve. Erinnerungen die selten abgerufen werden, verlieren Gewicht.
                Unter dem Schwellenwert: entfernt. Genau wie synaptische Verbindungen die im Schlaf abgebaut werden.
              </p>
              <div className="text-[12px] text-[#86868B] font-mono mt-3">
                R(t) = e^(-t/S) · w
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl border border-[#E5E5EA]">
              <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-widest mb-3">
                Phase 2 — 02:15
              </div>
              <h4 className="text-[18px] font-bold mb-2">Verdichten</h4>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">
                Erinnerungen mit &gt;92% Cosine-Ähnlichkeit werden zusammengeführt.
                Die stärkere bleibt, die schwächere wird absorbiert.
                Das Gedächtnis wird kompakter, aber nicht ärmer.
              </p>
              <div className="text-[12px] text-[#86868B] font-mono mt-3">
                cos(a,b) &gt; 0.92 → merge
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl border border-[#E5E5EA]">
              <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-widest mb-3">
                Phase 3 — 02:30
              </div>
              <h4 className="text-[18px] font-bold mb-2">Entdecken</h4>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">
                Zufällige Paare unverbundener Entities werden auf versteckte Verbindungen geprüft.
                «Max hat dasselbe Problem wie das Projekt vor 3 Monaten» — diese Einsichten entstehen hier.
              </p>
              <div className="text-[12px] text-[#86868B] font-mono mt-3">
                random_pairs(unconnected) → check
              </div>
            </div>
          </div>

          <p className="text-[14px] text-[#86868B] text-center">
            Morgens um 06:00 hat dein Agent ein saubereres, kompakteres und kreativeres Gedächtnis als am Vorabend.
          </p>
        </div>
      </div>

      {/* Growth Timeline */}
      <div className="max-w-3xl mx-auto mb-24">
        <h2 className="text-[32px] font-bold text-center mb-10 text-[#1D1D1F]">
          Wie der Brain wächst
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#000088] to-[#9999ee]" />

          <div className="space-y-8">
            {TIMELINE.map((t, i) => (
              <div key={t.time} className="flex gap-6 relative">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-[11px] font-bold z-10"
                  style={{ background: LAYERS[Math.min(i, 6)].color }}
                >
                  {t.time.split(" ")[1]}
                </div>
                <div className="pt-1">
                  <div className="text-[14px] font-bold text-[#1D1D1F] mb-1">{t.time}</div>
                  <p className="text-[14px] text-[#6E6E73] leading-relaxed">{t.event}</p>
                  <span className="text-[12px] text-[#86868B] font-mono">{t.nodes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-5xl mx-auto mb-24">
        <h2 className="text-[32px] font-bold text-center mb-4 text-[#1D1D1F]">
          Wie der Human AI Brain sich unterscheidet
        </h2>
        <p className="text-[16px] text-[#6E6E73] text-center mb-10 max-w-2xl mx-auto">
          Kein anderes Tool auf dem Markt hat 7 Schichten, einen Knowledge Graph,
          prozedurales Lernen und einen Dream Cycle — für CHF 5/Monat.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b-2 border-[#000088]">
                <th className="text-left py-3 px-4 font-semibold">Tool</th>
                <th className="text-left py-3 px-4 font-semibold">Schichten</th>
                <th className="text-left py-3 px-4 font-semibold">Typ</th>
                <th className="text-left py-3 px-4 font-semibold">Graph</th>
                <th className="text-left py-3 px-4 font-semibold">Lernen</th>
                <th className="text-left py-3 px-4 font-semibold">Dream</th>
                <th className="text-left py-3 px-4 font-semibold">Benchmark</th>
                <th className="text-left py-3 px-4 font-semibold">Preis</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr
                  key={row.tool}
                  className={`border-b border-[#E5E5EA] ${
                    row.tool === "KaderOS Brain"
                      ? "bg-[#000088]/5 font-semibold"
                      : ""
                  }`}
                >
                  <td className="py-3 px-4">{row.tool}</td>
                  <td className="py-3 px-4">{row.layers}</td>
                  <td className="py-3 px-4">{row.type}</td>
                  <td className="py-3 px-4">{row.graph}</td>
                  <td className="py-3 px-4">{row.learning}</td>
                  <td className="py-3 px-4">{row.dream}</td>
                  <td className="py-3 px-4">{row.benchmark}</td>
                  <td className="py-3 px-4">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-[#86868B] mt-4 text-center">
          * KaderOS Brain wird derzeit nicht auf LongMemEval benchmarked — unser Fokus liegt auf realem Business-Impact, nicht akademischen Metriken.
          Benchmark-Quellen: <a href="https://vectorize.io/articles/best-ai-agent-memory-systems" className="underline hover:text-[#000088]" target="_blank" rel="noopener noreferrer">Vectorize.io 2026</a>, <a href="https://dev.to/varun_pratapbhardwaj_b13/5-ai-agent-memory-systems-compared-mem0-zep-letta-supermemory-superlocalmemory-2026-benchmark-59p3" className="underline hover:text-[#000088]" target="_blank" rel="noopener noreferrer">DEV.to Benchmark</a>.
        </p>
      </div>

      {/* Warum nicht die Anderen? */}
      <div className="max-w-4xl mx-auto mb-24">
        <h2 className="text-[32px] font-bold text-center mb-4 text-[#1D1D1F]">
          Warum nicht die Anderen?
        </h2>
        <p className="text-[16px] text-[#6E6E73] text-center mb-10 max-w-2xl mx-auto">
          Jedes Tool löst einen Teil. Keines löst das ganze Problem.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: "Mem0",
              stars: "48K GitHub Stars",
              problem: "Graph nur im $249/Mo Pro-Tier. 49% LongMemEval — schlechtester Benchmark aller getesteten Systeme. Kein Vergessen, keine Konsolidierung, kein prozedurales Lernen.",
              vs: "KaderOS Brain hat Graph, Dream Cycle und Procedural Memory ab CHF 5/Mo.",
            },
            {
              name: "Zep / Graphiti",
              stars: "Temporal Knowledge Graph",
              problem: "Self-Hosting wurde eingestellt. Credit-basiertes Pricing schwer kalkulierbar. Kein prozedurales Lernen, kein Dream Cycle, keine Predictive Engine.",
              vs: "KaderOS Brain ist Open Source, self-hostbar, und hat 4 Schichten mehr.",
            },
            {
              name: "Letta (MemGPT)",
              stars: "$10M Funding",
              problem: "LLM entscheidet was erinnert wird — teuer, langsam, unvorhersehbar. Kein Graph, kein temporales Tracking. Du kaufst ein Agent-Runtime, nicht nur Memory.",
              vs: "KaderOS Brain nutzt kein LLM für Memory. Reine Mathematik = 50x günstiger.",
            },
            {
              name: "Hindsight",
              stars: "91.4% LongMemEval",
              problem: "Bester Benchmark-Score — aber: kein Dream Cycle, kein prozedurales Lernen, keine Predictive Engine. Synthese-Schritt braucht Cloud-LLM. Neueres Projekt mit kleiner Community (~4K Stars).",
              vs: "KaderOS Brain ist das einzige System das lernt, vergisst UND vorhersagt.",
            },
            {
              name: "Cognee",
              stars: "€7.5M Funding",
              problem: "On-prem kostet €1'970/Monat. Kein Dream Cycle, keine Predictive Engine, kein prozedurales Lernen. Python-only. Kleinere Community.",
              vs: "KaderOS Brain: CHF 5/Mo. 7 Schichten. Swiss Hosting. Open Source.",
            },
            {
              name: "SuperMemory",
              stars: "Closed Source",
              problem: "Nicht Open Source. Self-Hosting braucht Enterprise Agreement. Kein prozedurales Lernen, kein Dream Cycle. Usage-based Pricing = unberechenbare Kosten.",
              vs: "KaderOS Brain ist AGPLv3 Open Source. Fixpreis. Volle Transparenz.",
            },
          ].map((c) => (
            <div key={c.name} className="bg-[#F5F5F7] rounded-2xl p-6 border border-[#E5E5EA]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[17px] font-bold text-[#1D1D1F]">{c.name}</h3>
                <span className="text-[11px] text-[#86868B] bg-white px-2 py-1 rounded-full">{c.stars}</span>
              </div>
              <p className="text-[13px] text-[#6E6E73] leading-relaxed mb-3">{c.problem}</p>
              <p className="text-[13px] text-[#000088] font-semibold leading-relaxed">→ {c.vs}</p>
            </div>
          ))}
        </div>

        {/* USP Summary */}
        <div className="mt-12 bg-gradient-to-r from-[#000088]/5 to-[#3739C1]/5 rounded-2xl p-8 border border-[#000088]/10">
          <h3 className="text-[20px] font-bold text-[#1D1D1F] text-center mb-6">
            Was nur der KaderOS Brain kann:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: "🧠", label: "7 Schichten", sub: "Statt 1-3" },
              { icon: "🌙", label: "Dream Cycle", sub: "Vergessen + Verdichten" },
              { icon: "⚡", label: "Prozedurales Lernen", sub: "Automatische Regeln" },
              { icon: "🔮", label: "Predictive Engine", sub: "Proaktive Alerts" },
            ].map((u) => (
              <div key={u.label} className="bg-white rounded-xl p-4 border border-[#E5E5EA]">
                <div className="text-2xl mb-2">{u.icon}</div>
                <div className="text-[14px] font-bold text-[#1D1D1F]">{u.label}</div>
                <div className="text-[12px] text-[#86868B]">{u.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-[#6E6E73] text-center mt-6">
            Kein anderes System auf dem Markt kombiniert Knowledge Graph + Prozedurales Lernen + Dream Cycle + Predictive Engine.
            <br />Und keines macht es für <span className="font-bold text-[#000088]">CHF 5 pro Monat</span>.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="max-w-4xl mx-auto mb-24">
        <h2 className="text-[32px] font-bold text-center mb-4 text-[#1D1D1F]">
          Tech Stack — keine Black Box
        </h2>
        <p className="text-[16px] text-[#6E6E73] text-center mb-10 max-w-2xl mx-auto">
          Jede Komponente ist auditierbar, erklärbar und austauschbar.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Vektor-Datenbank", tech: "pgvector (PostgreSQL)", detail: "Cosine, L2, Inner Product" },
            { label: "Embeddings", tech: "sentence-transformers", detail: "384d multilingual, lokal" },
            { label: "Entity Extraction", tech: "spaCy de_core_news_lg", detail: "PER, ORG, LOC, MISC" },
            { label: "Knowledge Graph", tech: "PostgreSQL + Graph Queries", detail: "Entities → Edges → Traversal" },
            { label: "Scheduling", tech: "APScheduler", detail: "Dream Cycle, Predictive Scan" },
            { label: "API", tech: "FastAPI", detail: "REST + WebSocket" },
            { label: "Hosting", tech: "Railway EU (Schweiz)", detail: "Swiss Data Residency" },
            { label: "Monitoring", tech: "Audit Trail", detail: "Jede Änderung geloggt" },
          ].map((item) => (
            <div key={item.label} className="p-5 rounded-xl border border-[#E5E5EA] hover:border-[#000088]/20 transition-all">
              <div className="text-[11px] text-[#86868B] uppercase tracking-wider font-semibold mb-1.5">
                {item.label}
              </div>
              <div className="text-[14px] font-bold text-[#1D1D1F] mb-1">{item.tech}</div>
              <div className="text-[12px] text-[#86868B]">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto mb-24">
        <h2 className="text-[32px] font-bold text-center mb-10 text-[#1D1D1F]">
          Häufige Fragen
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "Warum 7 Schichten und nicht 3 oder 10?",
              a: "Weil das menschliche Gedächtnis in 7 funktionalen Ebenen arbeitet: sensorischer Filter, Arbeitsgedächtnis, episodisches Gedächtnis, semantisches Netzwerk, prozedurales Lernen, Antizipation und Schlaf-Konsolidation. Wir haben jede Funktion 1:1 als technische Schicht abgebildet — nicht mehr, nicht weniger.",
            },
            {
              q: "Braucht der Brain ein LLM wie GPT-4 oder Claude?",
              a: "Nein. Der Brain nutzt kein Sprachmodell für die Gedächtnisarbeit. Embeddings kommen von sentence-transformers (lokal), Entity Extraction von spaCy (lokal), Vektorsuche von pgvector (PostgreSQL). Kein API-Call nach aussen. Das macht den Brain 50x günstiger als LLM-basierte Memory-Lösungen.",
            },
            {
              q: "Wo liegen meine Daten?",
              a: "Swiss Hosting auf Railway EU. Alle Daten bleiben in der Schweiz. Kein OpenAI, kein Anthropic, kein US-Cloud-Provider im Speicherpfad. nDSG-konform.",
            },
            {
              q: "Wie schnell lernt der Agent?",
              a: "Tag 1: Erste Erinnerungen. Tag 7: Knowledge Graph mit ~100 Entities. Tag 14: Erste Vorhersagen. Tag 30: 500+ Entities, prozedurale Regeln, proaktive Alerts. Tag 90: Tiefes Unternehmensverständnis mit kreativen Verbindungen.",
            },
            {
              q: "Kann ich Erinnerungen korrigieren oder löschen?",
              a: "Ja. Jede Erinnerung, jede Entity, jede Regel ist transparent und manuell überschreibbar. Du hast volle Kontrolle. Der Agent lernt — aber du bestimmst was er behalten darf.",
            },
            {
              q: "Was kostet das?",
              a: "CHF 5 pro Monat. Alles inklusive. Zum Vergleich: Mem0 Pro kostet $249/Monat (Graph erst ab Pro), Zep/Graphiti ab $25/Monat (kein Self-Hosting mehr), Letta $20-200/Monat (LLM-abhängig), Cognee On-Prem €1'970/Monat. Der KaderOS Brain ist das einzige 7-Schichten-System — und das günstigste produktionsreife AI-Gedächtnis auf dem Markt.",
            },
            {
              q: "Ist der Code Open Source?",
              a: "Ja. KaderOS ist Open Source unter AGPLv3. Du kannst den gesamten Brain-Code auf GitHub einsehen, auditieren und selbst hosten.",
            },
          ].map((faq) => (
            <div key={faq.q} className="p-6 rounded-2xl border border-[#E5E5EA]">
              <h3 className="text-[16px] font-bold mb-2 text-[#1D1D1F]">{faq.q}</h3>
              <p className="text-[15px] text-[#6E6E73] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-[#000088] to-[#3333aa] rounded-3xl p-10 sm:p-12 text-white">
          <h2 className="text-[28px] sm:text-[36px] font-bold mb-4">
            Gib deinen AI-Agents ein Gehirn.
          </h2>
          <p className="text-[17px] text-white/70 mb-8 max-w-lg mx-auto">
            7 Schichten Gedächtnis. Inspiriert vom menschlichen Gehirn.
            <br />
            CHF 5/Monat. Swiss Hosting. Open Source.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-white text-[#000088] rounded-xl font-semibold text-[15px] hover:bg-white/90 transition"
            >
              Gratis starten
            </Link>
            <Link
              href="/brain"
              className="px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-[15px] hover:bg-white/10 transition"
            >
              Kurzversion ansehen
            </Link>
            <Link
              href="https://github.com/kaderosio/kaderos.io"
              className="px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-[15px] hover:bg-white/10 transition"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
