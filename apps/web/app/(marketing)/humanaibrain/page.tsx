"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

/* ── Scroll Reveal Hook ───────────────────────────────────── */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

/* ── Layer Card Component ─────────────────────────────────── */

function LayerCard({ layer, index }: { layer: typeof LAYERS[number]; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [tab, setTab] = useState<"brain" | "tech">("brain");

  return (
    <div
      ref={ref}
      className="relative transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "perspective(800px) rotateX(0deg) translateY(0)"
          : "perspective(800px) rotateX(3deg) translateY(40px)",
        transitionDelay: `${index * 80}ms`,
        marginTop: index > 0 ? "-12px" : "0",
        zIndex: index + 1,
      }}
    >
      <div
        className="relative rounded-2xl lg:rounded-3xl bg-white border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
        style={{
          transform: "perspective(800px) rotateX(1deg)",
        }}
      >
        {/* Left color stripe */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5 lg:w-2"
          style={{ background: `linear-gradient(to bottom, ${layer.color}, ${layer.color}88)` }}
        />

        {/* Giant background layer number */}
        <div
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-[80px] sm:text-[100px] lg:text-[140px] font-black leading-none select-none pointer-events-none"
          style={{ color: `${layer.color}08` }}
        >
          {layer.num}
        </div>

        <div className="relative pl-6 lg:pl-8 pr-4 lg:pr-8 py-6 lg:py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-5">
            <div
              className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl text-white text-sm lg:text-base font-extrabold shrink-0"
              style={{ backgroundColor: layer.color }}
            >
              {layer.num}
            </div>
            <div>
              <div className="text-[11px] text-gray-400 uppercase tracking-[0.15em] font-semibold">
                {layer.brain}
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
                {layer.ai}
              </h3>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-1 mb-5 bg-gray-100 rounded-lg p-1 w-fit">
            <button
              onClick={() => setTab("brain")}
              className={`px-4 py-2 rounded-md text-[13px] font-semibold transition-all duration-200 ${
                tab === "brain"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🧠 Gehirn
            </button>
            <button
              onClick={() => setTab("tech")}
              className={`px-4 py-2 rounded-md text-[13px] font-semibold transition-all duration-200 ${
                tab === "tech"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              ⚙️ Technik
            </button>
          </div>

          {/* Content */}
          <div className="min-h-[100px]">
            {tab === "brain" ? (
              <p className="text-[15px] lg:text-base text-gray-600 leading-relaxed max-w-2xl">
                {layer.humanDesc}
              </p>
            ) : (
              <div>
                <p className="text-[15px] lg:text-base text-gray-600 leading-relaxed mb-4 max-w-2xl">
                  {layer.techDesc}
                </p>
                <div className="inline-block text-[12px] text-gray-500 font-mono bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                  {layer.techStack}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page Component ──────────────────────────────────── */

export default function HumanAIBrainPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const problemReveal = useReveal<HTMLDivElement>();
  const solutionReveal = useReveal<HTMLDivElement>();
  const dreamReveal = useReveal<HTMLDivElement>();
  const timelineReveal = useReveal<HTMLDivElement>();
  const comparisonReveal = useReveal<HTMLDivElement>();
  const battleReveal = useReveal<HTMLDivElement>();
  const principlesReveal = useReveal<HTMLDivElement>();
  const techReveal = useReveal<HTMLDivElement>();
  const faqReveal = useReveal<HTMLDivElement>();
  const ctaReveal = useReveal<HTMLDivElement>();

  return (
    <>
      <style>{`
        @keyframes brainPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 0.15; }
        }
        @keyframes brainPulse2 {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.25); opacity: 0.08; }
        }
        @keyframes brainPulse3 {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.35); opacity: 0.04; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes dreamGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(153, 153, 238, 0.15); }
          50% { box-shadow: 0 0 40px rgba(153, 153, 238, 0.3); }
        }
        .reveal-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="bg-white">
        {/* ─── HERO ─── */}
        <section ref={heroRef} className="relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 pt-24 sm:pt-32 lg:pt-40 pb-24 sm:pb-32 lg:pb-40 text-center">
            {/* Brain pulse rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <div
                className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full border-2 border-indigo-200"
                style={{ animation: "brainPulse 4s ease-in-out infinite" }}
              />
              <div
                className="absolute w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] lg:w-[680px] lg:h-[680px] rounded-full border border-indigo-100"
                style={{ animation: "brainPulse2 4s ease-in-out infinite 0.5s" }}
              />
              <div
                className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] lg:w-[860px] lg:h-[860px] rounded-full border border-indigo-50"
                style={{ animation: "brainPulse3 4s ease-in-out infinite 1s" }}
              />
            </div>

            <div className="relative">
              <div className="text-[11px] sm:text-[12px] font-semibold text-indigo-600 uppercase tracking-[0.2em] mb-6">
                Human AI Brain
              </div>
              <h1 className="text-[36px] sm:text-[56px] md:text-[68px] lg:text-[80px] font-extrabold tracking-tight leading-[1.05] mb-8">
                <span className="text-gray-900">Was, wenn AI-Agents</span>
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #4338ca 0%, #6366f1 40%, #818cf8 100%)",
                  }}
                >
                  ein menschliches Gedächtnis
                </span>
                <br />
                <span className="text-gray-900">hätten?</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-4 leading-relaxed">
                7 Schichten. Inspiriert von Neurowissenschaft. Gebaut für Maschinen.
              </p>
              <p className="text-base sm:text-lg text-gray-900 font-semibold mb-12">
                Kein LLM. Reine Mathematik. CHF 5/Monat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="px-10 py-4 bg-[#000088] text-white rounded-2xl font-semibold text-[15px] hover:bg-[#000066] hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300"
                >
                  Gratis starten
                </Link>
                <Link
                  href="#layers"
                  className="px-10 py-4 border-2 border-gray-200 text-gray-900 rounded-2xl font-semibold text-[15px] hover:border-indigo-300 hover:bg-gray-50 transition-all duration-300"
                >
                  Die 7 Schichten entdecken
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PROBLEM ─── */}
        <section className="px-6 mb-32 sm:mb-40">
          <div
            ref={problemReveal.ref}
            className={`max-w-4xl mx-auto reveal-up ${problemReveal.visible ? "is-visible" : ""}`}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start bg-red-50/60 border border-red-100 rounded-3xl p-8 sm:p-12">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-100 flex items-center justify-center">
                  <span className="text-red-500 text-4xl sm:text-5xl font-black">!</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 tracking-tight">
                  Das Problem: AI-Agents haben Amnesie.
                </h2>
                <p className="text-base text-gray-500 leading-relaxed mb-4">
                  Jede Session bei null. Kein Kontext. Kein Lernen. Kein Wachstum.
                  ChatGPT speichert eine flache Notiz-Liste. CrewAI hat kein Memory.
                  AutoGen vergisst nach jedem Run. n8n ist komplett stateless.
                </p>
                <p className="text-base text-gray-900 font-semibold">
                  Stell dir vor, du stellst einen Mitarbeiter ein — und jeden Morgen hat er alles vergessen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SOLUTION ─── */}
        <section className="px-6 mb-16 sm:mb-20">
          <div
            ref={solutionReveal.ref}
            className={`max-w-3xl mx-auto text-center reveal-up ${solutionReveal.visible ? "is-visible" : ""}`}
          >
            <h2 className="text-3xl sm:text-[44px] font-bold mb-5 text-gray-900 tracking-tight leading-tight">
              Die Lösung: Ein Gedächtnis wie deins.
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Wir haben studiert, wie das menschliche Gehirn Informationen verarbeitet, speichert,
              abruft, verknüpft und vergisst — und jede Funktion als technische Schicht abgebildet.
            </p>
          </div>
        </section>

        {/* ─── 7 LAYERS ─── */}
        <section id="layers" className="px-6 mb-32 sm:mb-40">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-0">
              {LAYERS.map((layer, i) => (
                <LayerCard key={layer.num} layer={layer} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRINCIPLES ─── */}
        <section className="px-6 mb-32 sm:mb-40">
          <div
            ref={principlesReveal.ref}
            className={`max-w-4xl mx-auto reveal-up ${principlesReveal.visible ? "is-visible" : ""}`}
          >
            <h2 className="text-3xl sm:text-[40px] font-bold text-center mb-12 text-gray-900 tracking-tight">
              Design-Prinzipien
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.title}
                  className="group p-7 rounded-2xl border border-gray-100 bg-white hover:border-indigo-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DREAM CYCLE ─── */}
        <section className="mb-32 sm:mb-40">
          <div
            ref={dreamReveal.ref}
            className={`reveal-up ${dreamReveal.visible ? "is-visible" : ""}`}
          >
            <div className="bg-[#0a0a1a] py-20 sm:py-28 px-6">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-14">
                  <div className="text-[11px] font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-4">
                    Deep Dive
                  </div>
                  <h2 className="text-3xl sm:text-[40px] font-bold mb-6 text-white tracking-tight leading-tight">
                    Der Dream Cycle — was um 02:00 nachts passiert
                  </h2>
                  <p className="text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
                    Im REM-Schlaf konsolidiert dein Gehirn das Gelernte. Unwichtiges wird abgebaut (synaptische Homöostase),
                    ähnliche Erinnerungen werden verdichtet, und zufällige Neukombinationen erzeugen kreative Einsichten.
                    Der Dream Cycle macht exakt das — jede Nacht, automatisch.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {[
                    {
                      phase: "Phase 1 — 02:00",
                      title: "Vergessen",
                      desc: "Ebbinghaus Decay-Kurve. Erinnerungen die selten abgerufen werden, verlieren Gewicht. Unter dem Schwellenwert: entfernt. Genau wie synaptische Verbindungen die im Schlaf abgebaut werden.",
                      formula: "R(t) = e^(-t/S) · w",
                    },
                    {
                      phase: "Phase 2 — 02:15",
                      title: "Verdichten",
                      desc: "Erinnerungen mit >92% Cosine-Ähnlichkeit werden zusammengeführt. Die stärkere bleibt, die schwächere wird absorbiert. Das Gedächtnis wird kompakter, aber nicht ärmer.",
                      formula: "cos(a,b) > 0.92 → merge",
                    },
                    {
                      phase: "Phase 3 — 02:30",
                      title: "Entdecken",
                      desc: "Zufällige Paare unverbundener Entities werden auf versteckte Verbindungen geprüft. «Max hat dasselbe Problem wie das Projekt vor 3 Monaten» — diese Einsichten entstehen hier.",
                      formula: "random_pairs(unconnected) → check",
                    },
                  ].map((phase) => (
                    <div
                      key={phase.title}
                      className="relative rounded-2xl bg-white/[0.04] border border-white/[0.08] p-7 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-500"
                      style={{ animation: "dreamGlow 4s ease-in-out infinite" }}
                    >
                      <div className="text-[11px] font-semibold text-indigo-400/70 uppercase tracking-[0.15em] mb-3">
                        {phase.phase}
                      </div>
                      <h4 className="text-xl font-bold mb-3 text-white">{phase.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                        {phase.desc}
                      </p>
                      <div className="text-xs text-indigo-300/60 font-mono bg-white/[0.04] rounded-lg px-3 py-2 inline-block">
                        {phase.formula}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-500 text-center">
                  Morgens um 06:00 hat dein Agent ein saubereres, kompakteres und kreativeres Gedächtnis als am Vorabend.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── GROWTH TIMELINE ─── */}
        <section className="px-6 mb-32 sm:mb-40">
          <div
            ref={timelineReveal.ref}
            className={`max-w-3xl mx-auto reveal-up ${timelineReveal.visible ? "is-visible" : ""}`}
          >
            <h2 className="text-3xl sm:text-[40px] font-bold text-center mb-14 text-gray-900 tracking-tight">
              Wie der Brain wächst
            </h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#000088] to-[#b3b3ff]" aria-hidden="true" />
              <div className="space-y-10">
                {TIMELINE.map((t, i) => (
                  <div key={t.time} className="flex gap-6 relative">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-[11px] font-bold z-10 shadow-lg"
                      style={{ background: LAYERS[Math.min(i, 6)].color }}
                    >
                      {t.time.split(" ")[1]}
                    </div>
                    <div className="pt-1">
                      <div className="text-sm font-bold text-gray-900 mb-1">{t.time}</div>
                      <p className="text-sm text-gray-500 leading-relaxed">{t.event}</p>
                      <span className="text-xs text-gray-400 font-mono">{t.nodes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── COMPARISON TABLE ─── */}
        <section className="px-6 mb-32 sm:mb-40">
          <div
            ref={comparisonReveal.ref}
            className={`max-w-5xl mx-auto reveal-up ${comparisonReveal.visible ? "is-visible" : ""}`}
          >
            <h2 className="text-3xl sm:text-[40px] font-bold text-center mb-4 text-gray-900 tracking-tight">
              Wie der Human AI Brain sich unterscheidet
            </h2>
            <p className="text-base text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Kein anderes Tool auf dem Markt hat 7 Schichten, einen Knowledge Graph,
              prozedurales Lernen und einen Dream Cycle — für CHF 5/Monat.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200">
                    <th className="text-left py-4 px-5 font-semibold text-gray-900 sticky left-0 bg-gray-50/80 z-10">Tool</th>
                    <th className="text-left py-4 px-5 font-semibold text-gray-900">Schichten</th>
                    <th className="text-left py-4 px-5 font-semibold text-gray-900">Typ</th>
                    <th className="text-left py-4 px-5 font-semibold text-gray-900">Graph</th>
                    <th className="text-left py-4 px-5 font-semibold text-gray-900">Lernen</th>
                    <th className="text-left py-4 px-5 font-semibold text-gray-900">Dream</th>
                    <th className="text-left py-4 px-5 font-semibold text-gray-900">Benchmark</th>
                    <th className="text-left py-4 px-5 font-semibold text-gray-900">Preis</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => {
                    const isKaderos = row.tool === "KaderOS Brain";
                    return (
                      <tr
                        key={row.tool}
                        className={`border-b border-gray-100 transition-colors duration-200 ${
                          isKaderos
                            ? "bg-gradient-to-r from-indigo-50 to-purple-50/50 font-semibold"
                            : "hover:bg-gray-50/50"
                        }`}
                      >
                        <td className={`py-3.5 px-5 sticky left-0 z-10 ${isKaderos ? "bg-gradient-to-r from-indigo-50 to-purple-50/50 text-[#000088]" : "bg-white"}`}>
                          {row.tool}
                        </td>
                        <td className="py-3.5 px-5">{row.layers}</td>
                        <td className="py-3.5 px-5">{row.type}</td>
                        <td className="py-3.5 px-5">{row.graph}</td>
                        <td className="py-3.5 px-5">{row.learning}</td>
                        <td className="py-3.5 px-5">{row.dream}</td>
                        <td className="py-3.5 px-5">{row.benchmark}</td>
                        <td className="py-3.5 px-5">{row.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-gray-400 mt-4 text-center">
              * KaderOS Brain wird derzeit nicht auf LongMemEval benchmarked — unser Fokus liegt auf realem Business-Impact, nicht akademischen Metriken.
              Benchmark-Quellen: <a href="https://vectorize.io/articles/best-ai-agent-memory-systems" className="underline hover:text-[#000088] transition-colors" target="_blank" rel="noopener noreferrer">Vectorize.io 2026</a>, <a href="https://dev.to/varun_pratapbhardwaj_b13/5-ai-agent-memory-systems-compared-mem0-zep-letta-supermemory-superlocalmemory-2026-benchmark-59p3" className="underline hover:text-[#000088] transition-colors" target="_blank" rel="noopener noreferrer">DEV.to Benchmark</a>.
            </p>
          </div>
        </section>

        {/* ─── BATTLECARDS ─── */}
        <section className="px-6 mb-32 sm:mb-40">
          <div
            ref={battleReveal.ref}
            className={`max-w-4xl mx-auto reveal-up ${battleReveal.visible ? "is-visible" : ""}`}
          >
            <h2 className="text-3xl sm:text-[40px] font-bold text-center mb-4 text-gray-900 tracking-tight">
              Warum nicht die Anderen?
            </h2>
            <p className="text-base text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Jedes Tool löst einen Teil. Keines löst das ganze Problem.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
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
                <div
                  key={c.name}
                  className="group bg-gray-50/50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
                    <span className="text-[11px] text-gray-400 bg-white px-2.5 py-1 rounded-full border border-gray-100">
                      {c.stars}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-3">{c.problem}</p>
                  <p className="text-[13px] text-[#000088] font-semibold leading-relaxed">→ {c.vs}</p>
                </div>
              ))}
            </div>

            {/* USP Summary */}
            <div className="mt-14 bg-gradient-to-br from-indigo-50/80 to-purple-50/40 rounded-3xl p-8 sm:p-10 border border-indigo-100/50">
              <h3 className="text-xl font-bold text-gray-900 text-center mb-8">
                Was nur der KaderOS Brain kann:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { icon: "🧠", label: "7 Schichten", sub: "Statt 1-3" },
                  { icon: "🌙", label: "Dream Cycle", sub: "Vergessen + Verdichten" },
                  { icon: "⚡", label: "Prozedurales Lernen", sub: "Automatische Regeln" },
                  { icon: "🔮", label: "Predictive Engine", sub: "Proaktive Alerts" },
                ].map((u) => (
                  <div key={u.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="text-2xl mb-2">{u.icon}</div>
                    <div className="text-sm font-bold text-gray-900">{u.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{u.sub}</div>
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-gray-500 text-center mt-8">
                Kein anderes System auf dem Markt kombiniert Knowledge Graph + Prozedurales Lernen + Dream Cycle + Predictive Engine.
                <br />Und keines macht es für <span className="font-bold text-[#000088]">CHF 5 pro Monat</span>.
              </p>
            </div>
          </div>
        </section>

        {/* ─── TECH STACK ─── */}
        <section className="px-6 mb-32 sm:mb-40">
          <div
            ref={techReveal.ref}
            className={`max-w-4xl mx-auto reveal-up ${techReveal.visible ? "is-visible" : ""}`}
          >
            <h2 className="text-3xl sm:text-[40px] font-bold text-center mb-4 text-gray-900 tracking-tight">
              Tech Stack — keine Black Box
            </h2>
            <p className="text-base text-gray-500 text-center mb-12 max-w-2xl mx-auto">
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
                <div
                  key={item.label}
                  className="group p-5 rounded-xl border border-gray-100 bg-white hover:border-indigo-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-1.5">
                    {item.label}
                  </div>
                  <div className="text-sm font-bold text-gray-900 mb-1">{item.tech}</div>
                  <div className="text-xs text-gray-400">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="px-6 mb-32 sm:mb-40">
          <div
            ref={faqReveal.ref}
            className={`max-w-3xl mx-auto reveal-up ${faqReveal.visible ? "is-visible" : ""}`}
          >
            <h2 className="text-3xl sm:text-[40px] font-bold text-center mb-12 text-gray-900 tracking-tight">
              Häufige Fragen
            </h2>
            <div className="space-y-4">
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
                <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="px-6 mb-20 sm:mb-28">
          <div
            ref={ctaReveal.ref}
            className={`max-w-4xl mx-auto reveal-up ${ctaReveal.visible ? "is-visible" : ""}`}
          >
            <div
              className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center"
              style={{
                background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #3730a3 100%)",
              }}
            >
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
                aria-hidden="true"
              />

              <div className="relative">
                <h2 className="text-3xl sm:text-[44px] font-bold mb-5 text-white tracking-tight leading-tight">
                  Gib deinen AI-Agents ein Gehirn.
                </h2>
                <p className="text-lg text-indigo-200/70 mb-10 max-w-lg mx-auto leading-relaxed">
                  7 Schichten Gedächtnis. Inspiriert vom menschlichen Gehirn.
                  <br />
                  CHF 5/Monat. Swiss Hosting. Open Source.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/signup"
                    className="px-10 py-4 bg-white text-[#000088] rounded-2xl font-semibold text-[15px] hover:bg-white/90 hover:shadow-2xl hover:shadow-white/10 transition-all duration-300"
                    style={{ animation: "float 3s ease-in-out infinite" }}
                  >
                    Gratis starten
                  </Link>
                  <Link
                    href="/brain"
                    className="px-10 py-4 border border-white/20 text-white rounded-2xl font-semibold text-[15px] hover:bg-white/10 transition-all duration-300"
                  >
                    Kurzversion ansehen
                  </Link>
                  <Link
                    href="https://github.com/kaderosio/kaderos.io"
                    className="px-10 py-4 border border-white/20 text-white rounded-2xl font-semibold text-[15px] hover:bg-white/10 transition-all duration-300"
                  >
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/* ── FAQ Accordion Item ───────────────────────────────────── */

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <h3 className="text-base font-bold text-gray-900 pr-4">{question}</h3>
        <span
          className="text-gray-400 text-xl font-light shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "300px" : "0",
          opacity: open ? 1 : 0,
        }}
      >
        <p className="px-6 pb-6 text-[15px] text-gray-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
