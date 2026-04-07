"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */

const LAYER_COLORS = [
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#A855F7",
  "#C084FC",
  "#D946EF",
  "#EC4899",
];

const LAYERS = [
  {
    num: "01",
    brain: "Thalamus",
    ai: "Perception Gate",
    humanDesc:
      "Dein Gehirn filtert 99% aller Eindrücke, bevor du sie bewusst wahrnimmst. Nur was wichtig, neu oder dringend ist, kommt durch. Ohne diesen Filter wärst du handlungsunfähig.",
    techDesc:
      "Jeder Input bekommt 4 Scores: Wichtigkeit, Neuheit, Dringlichkeit, Vertrauenswürdigkeit. Eine WhatsApp vom Kunden hat ein anderes Gewicht als eine automatische Notification. Dein Agent lernt was zählt — und ignoriert den Rest.",
    techStack: "sentence-transformers  ·  Cosine Similarity  ·  Sentiment Scoring",
    color: LAYER_COLORS[0],
  },
  {
    num: "02",
    brain: "Präfrontaler Cortex",
    ai: "Working Memory",
    humanDesc:
      "Du kannst 7 Sachen gleichzeitig im Kopf behalten. Nicht 70. Miller's Law, 1956. Dein Arbeitsgedächtnis ist schnell und begrenzt — das ist keine Schwäche, das ist Fokus.",
    techDesc:
      "Maximal 9 aktive Items. Antwort in unter 5 Millisekunden. Was nicht mehr relevant ist, wandert ins Langzeitgedächtnis. Dein Agent hält genau das im Kopf, was er gerade braucht — nicht alles was er je gehört hat.",
    techStack: "In-Memory Buffer  ·  FIFO + Priority Queue  ·  <5ms Latency",
    color: LAYER_COLORS[1],
  },
  {
    num: "03",
    brain: "Hippocampus",
    ai: "Episodisches Gedächtnis",
    humanDesc:
      "Nicht \"Kunde hat reklamiert\" — sondern \"Am 14. März hat Frau Keller reklamiert, weil die Lieferung zu spät kam. Sie war frustriert.\" Kontext. Details. Emotion. So erinnern sich Menschen.",
    techDesc:
      "Jede Erinnerung verändert sich beim Abruf — Reconsolidation. Wenn der Agent die Keller-Reklamation abruft während er über Lieferzeiten nachdenkt, wird diese Verbindung stärker. Unwichtiges verblasst automatisch. Wichtiges wird schärfer.",
    techStack: "pgvector  ·  384d Embeddings  ·  Reconsolidation  ·  Ebbinghaus Decay",
    color: LAYER_COLORS[2],
  },
  {
    num: "04",
    brain: "Temporallappen",
    ai: "Knowledge Graph",
    humanDesc:
      "Du weisst nicht nur wer Müller ist. Du weisst: Müller ist CTO, sitzt in Zürich, hatte letzte Woche Deployment-Probleme, und wird nervös wenn der CEO involviert wird. Alles vernetzt.",
    techDesc:
      "Das Herzstück. Der Brain erkennt automatisch Personen, Firmen, Orte, Themen — und zieht Verbindungen. Nach 30 Tagen: 500+ Entities, 2'000+ Verbindungen. Dein Agent versteht Zusammenhänge, nicht nur Fakten.",
    techStack: "spaCy NER  ·  PostgreSQL Graph  ·  Multi-Hop Traversal",
    color: LAYER_COLORS[3],
  },
  {
    num: "05",
    brain: "Basalganglien",
    ai: "Prozedurales Gedächtnis",
    humanDesc:
      "Wie lernst du Velo fahren? Nicht durch Nachdenken — durch Wiederholung. Nach 10 Jahren im Job denkst du bei Standardfällen nicht mehr nach. Du handelst aus Erfahrung.",
    techDesc:
      "Wenn der Brain ein Muster 3 Mal sieht, wird es zur Regel. \"Nach einer Heizungsmeldung → zuerst Hauswart kontaktieren\" — das muss beim 4. Mal niemand mehr sagen. Ab 85% Confidence handelt der Agent selbständig. Jede Regel ist sichtbar und überschreibbar.",
    techStack: "Sequence Mining  ·  Trigger→Action Rules  ·  Confidence Scoring",
    color: LAYER_COLORS[4],
  },
  {
    num: "06",
    brain: "Anteriorer Cingulärer Cortex",
    ai: "Predictive Engine",
    humanDesc:
      "Dein Bauchgefühl sagt dir \"Da stimmt was nicht\" — bevor du weisst warum. Das ist keine Magie. Das ist dein Gehirn das Muster erkennt und Abweichungen flaggt.",
    techDesc:
      "Der Brain analysiert Muster im Hintergrund. Mieter Keller hatte im Oktober 2024 und 2025 Heizungsprobleme. Es ist September 2026. Der Brain meldet: 87% Wahrscheinlichkeit für eine Meldung in den nächsten 6 Wochen. Proaktiv. Ohne dass du fragst.",
    techStack: "Temporal Pattern Analysis  ·  Anomaly Detection  ·  Proactive Alerts",
    color: LAYER_COLORS[5],
  },
  {
    num: "07",
    brain: "REM-Schlaf",
    ai: "Dream Cycle",
    humanDesc:
      "Im Schlaf räumt dein Gehirn auf. Unwichtiges wird vergessen. Ähnliches wird verdichtet. Und manchmal wachst du auf mit einer Lösung, die du gestern nicht hattest.",
    techDesc:
      "Jede Nacht um 02:00: Vergessen (was nicht abgerufen wird, verliert Gewicht), Verdichten (Erinnerungen die sich zu 92% überlappen werden zusammengeführt), Entdecken (der Brain prüft zufällige Paare auf versteckte Verbindungen). Morgens ist das Gedächtnis sauberer und dichter als am Vorabend.",
    techStack: "Cron 02:00  ·  Ebbinghaus Decay  ·  Cosine Consolidation  ·  Entity Pairing",
    color: LAYER_COLORS[6],
  },
];

const TIMELINE = [
  {
    time: "Tag 1",
    text: "Leeres Gedächtnis. Perception Gate kalibriert sich. Working Memory füllt sich mit den ersten Interaktionen.",
  },
  {
    time: "Woche 1",
    text: "~100 Entities im Knowledge Graph. Agent erkennt Stammkunden und ihre Präferenzen.",
  },
  {
    time: "Monat 1",
    text: "500+ Verbindungen. Erste prozedurale Regeln. Erste proaktive Alerts der Predictive Engine.",
  },
  {
    time: "Monat 3",
    text: "2'000+ Verbindungen. Predictive Engine trifft bei 70%+ korrekte Vorhersagen. Dream Cycle liefert kreative Verbindungen.",
  },
  {
    time: "Jahr 1",
    text: "Institutionelles Wissen das kein Mitarbeiter hat. Vergessen nach Ebbinghaus aktiv. Der Agent ist unersetzbar geworden.",
  },
];

const COMPARISON = [
  {
    tool: "KaderOS Brain",
    layers: "7",
    graph: true,
    predictive: true,
    dream: true,
    procedural: true,
    llmFree: true,
    price: "CHF 5",
    swiss: true,
    ndsg: true,
    openSource: true,
  },
  {
    tool: "Mem0",
    layers: "1",
    graph: false,
    predictive: false,
    dream: false,
    procedural: false,
    llmFree: false,
    price: "$249",
    swiss: false,
    ndsg: false,
    openSource: false,
  },
  {
    tool: "Zep",
    layers: "2",
    graph: false,
    predictive: false,
    dream: false,
    procedural: false,
    llmFree: false,
    price: "$50",
    swiss: false,
    ndsg: false,
    openSource: false,
  },
  {
    tool: "Cognee",
    layers: "2",
    graph: true,
    predictive: false,
    dream: false,
    procedural: false,
    llmFree: false,
    price: "\u20AC1\u2019970",
    swiss: false,
    ndsg: false,
    openSource: true,
  },
  {
    tool: "Letta",
    layers: "3",
    graph: false,
    predictive: false,
    dream: false,
    procedural: false,
    llmFree: false,
    price: "$200",
    swiss: false,
    ndsg: false,
    openSource: false,
  },
];

const COMPARISON_COLS = [
  { key: "layers", label: "Schichten" },
  { key: "graph", label: "Knowledge Graph" },
  { key: "predictive", label: "Predictive Engine" },
  { key: "dream", label: "Dream Cycle" },
  { key: "procedural", label: "Prozedurales Lernen" },
  { key: "llmFree", label: "Ohne LLM" },
  { key: "price", label: "Preis/Monat" },
  { key: "swiss", label: "Swiss Hosting" },
  { key: "ndsg", label: "nDSG-konform" },
  { key: "openSource", label: "Open Source" },
] as const;

const BATTLECARDS = [
  {
    name: "vs. Mem0",
    line: "Mem0 speichert Key-Value-Paare und Vektoren. Graph erst ab $249/Monat. Kein prozedurales Lernen, kein Dream Cycle, keine Predictive Engine. 49% auf LongMemEval — schlechtester Score aller getesteten Systeme.",
  },
  {
    name: "vs. Zep / Graphiti",
    line: "Zep hat einen soliden temporalen Graph. Aber: Self-Hosting eingestellt. Kein prozedurales Lernen, kein Dream Cycle. Credit-basiertes Pricing schwer kalkulierbar.",
  },
  {
    name: "vs. Cognee",
    line: "Cognee hat einen Knowledge Graph und EU-Compliance. Aber: kein Dream Cycle, keine Predictive Engine. On-Prem kostet €1'970/Monat. Der Agent Brain: CHF 5.",
  },
  {
    name: "Warum CHF 5?",
    line: "Kein LLM im Memory. Andere schicken jede Erinnerung durch GPT-4 — das kostet. Der Brain arbeitet mit pgvector, spaCy und PostgreSQL. Datenbankoperationen statt API-Calls. Das macht uns 50x günstiger.",
  },
];

const PRINCIPLES = [
  {
    title: "Kein LLM im Memory",
    desc: "Der Agent bringt sein Sprachmodell mit. Der Brain liefert das Gedächtnis. Alles was der Brain tut ist Datenbankarbeit — kein API-Call zu OpenAI oder Anthropic.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "Auditierbare Mathematik",
    desc: "pgvector für Vektorsuche. spaCy für Entity Extraction. Ebbinghaus für Vergessen. Kein Black-Box ML — jeder Schritt ist nachvollziehbar und reproduzierbar.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
      </svg>
    ),
  },
  {
    title: "Transparent und überschreibbar",
    desc: "Jede Regel ist sichtbar. Jede Verbindung nachvollziehbar. Jede Vorhersage hat eine Confidence-Zahl. Du korrigierst direkt.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    title: "Swiss Hosted. Punkt.",
    desc: "Schweizer Rechenzentrum. nDSG-konform. sentence-transformers laufen lokal. Kein API-Call verlässt die Schweiz. Kein US-Cloud-Provider im Datenpfad.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

const TECH_STACK = [
  { label: "Vektoren", tech: "pgvector (PostgreSQL)", why: "Keine separate Vektordatenbank nötig." },
  { label: "Entity Extraction", tech: "spaCy NER", why: "Lokal. Schnell. Kein API-Call." },
  { label: "Embeddings", tech: "sentence-transformers", why: "Open Source. Kein OpenAI nötig." },
  { label: "Graph", tech: "PostgreSQL Adjacency", why: "Kein Neo4j nötig. SQL reicht." },
  { label: "Decay", tech: "Ebbinghaus-Formel", why: "Mathematisch bewiesen seit 1885." },
  { label: "Similarity", tech: "Cosine Similarity", why: "Standard. Schnell. Zuverlässig." },
  { label: "Scheduling", tech: "Cron (02:00)", why: "Simpel. Stabil. Keine Overhead." },
  { label: "Hosting", tech: "Schweizer Rechenzentrum", why: "nDSG. Punkt." },
];

const FAQS = [
  {
    q: "Brauche ich Programmierkenntnisse?",
    a: "Nein. Du verbindest deinen Agent per API. Ein Endpoint rein, ein Endpoint raus. Dokumentation ist da, Beispiele sind da.",
  },
  {
    q: "Funktioniert das mit meinem bestehenden Agent?",
    a: "Ja. Der Brain ist agent-agnostisch. Egal ob du GPT-4, Claude, Mistral, Llama oder deinen eigenen Agent nutzt — der Brain liefert das Gedächtnis. Der Agent liefert das Denken.",
  },
  {
    q: "Was passiert, wenn ich kündige?",
    a: "Deine Daten gehören dir. Export jederzeit möglich. Kein Lock-in. Du nimmst dein Gedächtnis mit.",
  },
  {
    q: "Ist das wirklich nDSG-konform?",
    a: "Ja. Swiss Hosting. Keine API-Calls nach aussen. Keine Daten bei US-Anbietern. Kein LLM verarbeitet deine Erinnerungen. Reine Datenbankoperationen in der Schweiz.",
  },
  {
    q: "Wie sicher sind meine Daten?",
    a: "Verschlüsselt at rest und in transit. Keine geteilte Infrastruktur. Dein Brain ist isoliert. Kein anderer Kunde sieht deine Daten.",
  },
  {
    q: "Kann ich den Dream Cycle konfigurieren?",
    a: "Ja. Zeitpunkt, Aggressivität des Vergessens, Schwellenwerte für Verdichtung — alles einstellbar. Du bestimmst, wie dein Agent schläft.",
  },
  {
    q: "Was, wenn der Brain etwas Falsches lernt?",
    a: "Jede Regel, jede Verbindung, jede Vorhersage ist sichtbar und überschreibbar. Du korrigierst es direkt. Der Brain lernt aus der Korrektur.",
  },
];

const USE_CASES = [
  {
    title: "Immobilienverwaltung",
    before: "Jedes Mal überrascht. Feuerwehr-Modus.",
    after: "Probleme gelöst, bevor sie auftreten.",
    story:
      "Du verwaltest 200 Wohnungen. Dein Agent weiss nach 3 Monaten: Mieter Keller beschwert sich immer im Oktober über die Heizung. Die Predictive Engine meldet dir das Problem im September — bevor Keller anruft.",
  },
  {
    title: "Startup mit 3 Leuten",
    before: "Jeder Lead wird gleich behandelt.",
    after: "Personalisierte Ansprache, automatisch.",
    story:
      "Dein Sales-Agent spricht mit 50 Leads pro Woche. Nach 6 Wochen hat der Knowledge Graph 2\u2019000+ Verbindungen. Der Agent weiss: Fintech-Leads konvertieren 3x besser mit dem Compliance-Feature.",
  },
  {
    title: "Treuhand / Buchhaltung",
    before: "Drei Rückfragen. Drei Wartezeiten.",
    after: "Eine Antwort. Alles drin.",
    story:
      "Dein Agent bearbeitet Steuerfragen. Nach 2 Monaten hat das prozedurale Gedächtnis gelernt: Wer nach \"Vorsorge 3a\" fragt, braucht in 80% auch Infos zu \"Säule 3b\" und \"Einkauf BVG\".",
  },
];

/* ══════════════════════════════════════════════════════════════
   HOOKS
   ══════════════════════════════════════════════════════════════ */

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ══════════════════════════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════════════════════════ */

/* ── Neural Network Animation (CSS-only) ─────────────────── */

function NeuralNetwork() {
  const nodes = [
    { x: 15, y: 25, delay: 0 },
    { x: 35, y: 15, delay: 0.4 },
    { x: 55, y: 30, delay: 0.8 },
    { x: 75, y: 12, delay: 1.2 },
    { x: 85, y: 35, delay: 0.2 },
    { x: 25, y: 55, delay: 1.0 },
    { x: 50, y: 55, delay: 0.6 },
    { x: 70, y: 60, delay: 1.4 },
    { x: 10, y: 75, delay: 0.3 },
    { x: 40, y: 78, delay: 0.9 },
    { x: 60, y: 82, delay: 1.1 },
    { x: 82, y: 75, delay: 0.7 },
    { x: 20, y: 42, delay: 1.3 },
    { x: 65, y: 45, delay: 0.5 },
    { x: 90, y: 55, delay: 1.5 },
    { x: 45, y: 42, delay: 0.1 },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 6],
    [2, 7], [5, 6], [6, 7], [5, 8], [6, 9], [7, 10],
    [7, 11], [8, 9], [9, 10], [10, 11], [0, 12], [12, 5],
    [3, 14], [4, 14], [2, 13], [13, 7], [12, 15], [15, 6],
    [15, 13], [1, 15],
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="w-full h-full opacity-[0.08]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {connections.map(([a, b], i) => (
          <line
            key={`c-${i}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="url(#neural-grad)"
            strokeWidth="0.15"
            className="neural-connection"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
        {nodes.map((n, i) => (
          <g key={`n-${i}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r="0.8"
              className="neural-node"
              style={{ animationDelay: `${n.delay}s` }}
            />
            <circle
              cx={n.x}
              cy={n.y}
              r="2"
              className="neural-glow"
              style={{ animationDelay: `${n.delay}s` }}
            />
          </g>
        ))}
        <defs>
          <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <radialGradient id="node-glow">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── Layer Card ────────────────────────────────────────────── */

function LayerCard({
  layer,
  index,
}: {
  layer: (typeof LAYERS)[number];
  index: number;
}) {
  const { ref, visible } = useReveal(0.12);
  const [tab, setTab] = useState<"brain" | "tech">("brain");

  return (
    <div
      ref={ref}
      className="relative transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="glass-card relative rounded-2xl overflow-hidden group hover:border-[#3739C1]/20 transition-all duration-500">
        {/* Left color stripe */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 lg:w-1.5"
          style={{ background: layer.color }}
        />

        {/* Giant ghost number */}
        <div
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-[100px] lg:text-[160px] font-black leading-none select-none pointer-events-none opacity-[0.03]"
          style={{ color: layer.color }}
        >
          {layer.num}
        </div>

        <div className="relative pl-6 lg:pl-8 pr-4 lg:pr-8 py-6 lg:py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-5">
            <div
              className="flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-xl text-white text-sm font-bold shrink-0"
              style={{ background: `linear-gradient(135deg, ${layer.color}, ${layer.color}cc)` }}
            >
              {layer.num}
            </div>
            <div>
              <div className="text-[11px] text-[#94A3B8] uppercase tracking-[0.15em] font-medium">
                {layer.brain}
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-[#0F172A] tracking-tight">
                {layer.ai}
              </h3>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-1 mb-5 bg-black/[0.03] rounded-lg p-1 w-fit border border-[#E2E8F0]">
            <button
              onClick={() => setTab("brain")}
              className={`px-4 py-2 rounded-md text-[13px] font-medium transition-all duration-200 ${
                tab === "brain"
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-[#94A3B8] hover:text-[#334155]"
              }`}
            >
              Gehirn
            </button>
            <button
              onClick={() => setTab("tech")}
              className={`px-4 py-2 rounded-md text-[13px] font-medium transition-all duration-200 ${
                tab === "tech"
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-[#94A3B8] hover:text-[#334155]"
              }`}
            >
              Technik
            </button>
          </div>

          {/* Content */}
          <div className="min-h-[80px]">
            {tab === "brain" ? (
              <p className="text-[15px] text-[#64748B] leading-relaxed max-w-2xl">
                {layer.humanDesc}
              </p>
            ) : (
              <div>
                <p className="text-[15px] text-[#64748B] leading-relaxed mb-4 max-w-2xl">
                  {layer.techDesc}
                </p>
                <div className="inline-block text-[12px] text-[#64748B] font-mono bg-black/[0.02] rounded-lg px-3 py-2 border border-[#E2E8F0]">
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

/* ── FAQ Accordion ─────────────────────────────────────────── */

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:border-[#CBD5E1]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <h3 className="text-[15px] font-semibold text-[#0F172A] pr-4">{question}</h3>
        <span
          className="text-[#94A3B8] text-xl font-light shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: open ? "400px" : "0",
          opacity: open ? 1 : 0,
        }}
      >
        <p className="px-6 pb-6 text-[15px] text-[#64748B] leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════ */

export default function HumanAIBrainPage() {
  const problemReveal = useReveal();
  const solutionReveal = useReveal();
  const dreamReveal = useReveal();
  const useCaseReveal = useReveal();
  const timelineReveal = useReveal();
  const comparisonReveal = useReveal();
  const battleReveal = useReveal();
  const principlesReveal = useReveal();
  const techReveal = useReveal();
  const faqReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <>
      <style>{`
        /* ── Custom Animations ── */
        @keyframes neuralPulse {
          0%, 100% { r: 0.8; opacity: 0.6; }
          50% { r: 1.2; opacity: 1; }
        }
        @keyframes nodeGlow {
          0%, 100% { r: 2; opacity: 0.15; }
          50% { r: 3.5; opacity: 0.35; }
        }
        @keyframes connectionDraw {
          0% { stroke-dashoffset: 100; opacity: 0; }
          50% { opacity: 0.5; }
          100% { stroke-dashoffset: 0; opacity: 0.3; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dreamGlow {
          0%, 100% { box-shadow: 0 2px 12px rgba(99, 102, 241, 0.06); }
          50% { box-shadow: 0 4px 30px rgba(99, 102, 241, 0.12), 0 0 60px rgba(139, 92, 246, 0.04); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes timelinePulse {
          0%, 100% { box-shadow: 0 0 0 0 var(--pulse-color); }
          50% { box-shadow: 0 0 0 8px transparent; }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .neural-node {
          fill: url(#neural-grad);
          animation: neuralPulse 3s ease-in-out infinite;
        }
        .neural-glow {
          fill: url(#node-glow);
          animation: nodeGlow 3s ease-in-out infinite;
        }
        .neural-connection {
          stroke-dasharray: 100;
          animation: connectionDraw 4s ease-out forwards;
        }

        /* ── Glass Card ── */
        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
        }

        /* ── Reveal ── */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Gradient border for comparison table ── */
        .gradient-row {
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(236, 72, 153, 0.04) 100%);
        }
        .gradient-row td {
          border-color: rgba(139, 92, 246, 0.1) !important;
        }
      `}</style>

      <div className="bg-[#FAFBFF] text-[#0F172A] min-h-screen">
        {/* ═══════════════════════════════════════════════════════════
           1. HERO
           ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden min-h-[90vh] flex items-center">
          <NeuralNetwork />

          {/* Radial glow */}
          <div
            className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 lg:py-40 text-center">
            <div
              className="inline-flex items-center gap-2 text-[12px] font-medium text-[#64748B] uppercase tracking-[0.2em] mb-8 px-4 py-2 rounded-full border border-[#E2E8F0] bg-white/80"
              style={{ animation: "heroFadeIn 0.8s ease-out both" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3739C1] animate-pulse" />
              Agent Brain
            </div>

            <h1
              className="text-[36px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-bold tracking-[-0.03em] leading-[1.08] mb-4"
              style={{ animation: "heroFadeIn 0.8s ease-out 0.1s both" }}
            >
              <span className="text-[#0F172A]">Dein AI Agent vergisst alles.</span>
            </h1>
            <p
              className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold tracking-[-0.02em] leading-[1.1] mb-8"
              style={{ animation: "heroFadeIn 0.8s ease-out 0.2s both" }}
            >
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #6366F1 0%, #A855F7 40%, #EC4899 100%)" }}>
                Jedes. Einzelne. Mal.
              </span>
            </p>

            <p
              className="text-lg sm:text-xl text-[#64748B] max-w-2xl mx-auto mb-4 leading-relaxed"
              style={{ animation: "heroFadeIn 0.8s ease-out 0.3s both" }}
            >
              7 Schichten Gedächtnis. Inspiriert von Neurowissenschaft. Gebaut als API.
              Kein LLM im Memory — reine Mathematik. An jeden Agent anschliessbar.
            </p>
            <p
              className="text-base sm:text-lg text-[#0F172A] font-medium mb-12"
              style={{ animation: "heroFadeIn 0.8s ease-out 0.35s both" }}
            >
              CHF 5/Monat. Swiss Hosted. Open Source. Kein Vendor Lock-in.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              style={{ animation: "heroFadeIn 0.8s ease-out 0.4s both" }}
            >
              <Link
                href="/signup"
                className="group relative px-10 py-4 rounded-2xl font-semibold text-[15px] text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20"
                style={{ background: "linear-gradient(135deg, #3739C1 0%, #6366F1 100%)" }}
              >
                <span className="relative z-10">Brain aktivieren</span>
                <div className="absolute inset-0 bg-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="#layers"
                className="px-10 py-4 rounded-2xl font-semibold text-[15px] text-[#334155] border border-[#E2E8F0] hover:border-[#3739C1]/20 hover:bg-black/[0.02] transition-all duration-300"
              >
                Architektur ansehen
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           2. PROBLEM
           ═══════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 sm:py-32">
          <div
            ref={problemReveal.ref}
            className={`max-w-4xl mx-auto reveal ${problemReveal.visible ? "is-visible" : ""}`}
          >
            <div className="text-center mb-12">
              <p className="text-[12px] font-medium text-red-400/80 uppercase tracking-[0.2em] mb-4">
                Das Problem
              </p>
              <h2 className="text-3xl sm:text-[44px] font-bold tracking-tight leading-tight mb-6">
                Dein Agent hat <span className="text-red-400">Alzheimer</span>.
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {[
                { stat: "0", unit: "Kontext", desc: "Kunde hat gestern 3x angerufen. Dein Agent weiss das nicht." },
                { stat: "0", unit: "Muster", desc: "Support-Tickets häufen sich donnerstags. Dein Agent sieht kein Muster." },
                { stat: "0", unit: "Lernen", desc: "Derselbe Fehler zum dritten Mal. Dein Agent hat nichts daraus gelernt." },
              ].map((item) => (
                <div key={item.unit} className="glass-card rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-red-400/70 mb-1">{item.stat}</div>
                  <div className="text-sm font-semibold text-[#334155] mb-3">{item.unit}</div>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-8 sm:p-10 text-center">
              <p className="text-lg sm:text-xl text-[#334155] leading-relaxed mb-4">
                Die meisten AI Memory Systeme bauen eine bessere Festplatte. Sie speichern Texte und geben sie auf Anfrage zurück.
                Das ist kein Gedächtnis. Das ist ein Ordner.
              </p>
              <p className="text-base text-[#64748B]">
                Kein existierendes Produkt kombiniert Knowledge Graph, Ebbinghaus-Vergessen, proaktives Denken und nächtliche Konsolidierung. <span className="text-[#0F172A] font-medium">Das ist die Lücke.</span>
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           3. SOLUTION INTRO
           ═══════════════════════════════════════════════════════════ */}
        <section className="px-6 pb-16">
          <div
            ref={solutionReveal.ref}
            className={`max-w-3xl mx-auto text-center reveal ${solutionReveal.visible ? "is-visible" : ""}`}
          >
            <p className="text-[12px] font-medium text-indigo-400/80 uppercase tracking-[0.2em] mb-4">
              Die Lösung
            </p>
            <h2 className="text-3xl sm:text-[44px] font-bold tracking-tight leading-tight mb-6">
              Ein Gedächtnis wie deins.
            </h2>
            <p className="text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
              Der Agent Brain ist kein Agent. Er ist die Infrastruktur dahinter.
              Er bringt kein LLM mit. Er speichert, vernetzt und konsolidiert — per API.
              Dein Agent bringt das Denken. Der Brain liefert das Gedächtnis. Saubere Trennung.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           4. DIE 7 SCHICHTEN
           ═══════════════════════════════════════════════════════════ */}
        <section id="layers" className="px-6 py-24 sm:py-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[12px] font-medium text-violet-400/80 uppercase tracking-[0.2em] mb-4">
                Architektur
              </p>
              <h2 className="text-3xl sm:text-[44px] font-bold tracking-tight leading-tight mb-4">
                Die 7 Schichten
              </h2>
              <p className="text-base text-[#64748B] max-w-xl mx-auto">
                Jede Schicht hat ein Vorbild im menschlichen Gehirn. Wechsle zwischen Gehirn- und Technik-Ansicht.
              </p>
            </div>

            <div className="space-y-4">
              {LAYERS.map((layer, i) => (
                <LayerCard key={layer.num} layer={layer} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           5. DREAM CYCLE DEEP-DIVE
           ═══════════════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 relative">
          {/* Tinted background */}
          <div className="absolute inset-0 bg-[#F0F2FF]" />
          {/* Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div
            ref={dreamReveal.ref}
            className={`relative px-6 reveal ${dreamReveal.visible ? "is-visible" : ""}`}
          >
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-[12px] font-medium text-violet-400/80 uppercase tracking-[0.2em] mb-4">
                  Deep Dive
                </p>
                <h2 className="text-3xl sm:text-[44px] font-bold tracking-tight leading-tight mb-6">
                  Was um 02:00 nachts passiert
                </h2>
                <p className="text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
                  Jede Nacht um 02:00 Uhr passiert etwas Aussergewöhnliches. Drei Prozesse. Automatisch. Im Hintergrund.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  {
                    phase: "Phase 1",
                    title: "Vergessen",
                    desc: "Ebbinghaus Decay. Alles, was nie wieder abgerufen wurde, verblasst. Nicht gelöscht — heruntergestuft. Was unwichtig war, macht Platz für das, was zählt.",
                    formula: "R(t) = e^(-t/S)",
                    color: LAYER_COLORS[2],
                  },
                  {
                    phase: "Phase 2",
                    title: "Verdichten",
                    desc: "Cosine Similarity über 92%? Dann werden zwei Erinnerungen zu einer einzigen, stärkeren verschmolzen. Das Gedächtnis wird dichter. Präziser. Schneller.",
                    formula: "cos(a,b) > 0.92 \u2192 merge",
                    color: LAYER_COLORS[4],
                  },
                  {
                    phase: "Phase 3",
                    title: "Entdecken",
                    desc: "Zufällige, unverbundene Entitätspaare werden auf versteckte Verbindungen geprüft. \"Dein Kunde Meier hat dreimal Objekte gekauft, die Architekt Brunner geplant hat.\" Kein Mensch hätte das gefunden.",
                    formula: "random_pairs() \u2192 check",
                    color: LAYER_COLORS[6],
                  },
                ].map((phase) => (
                  <div
                    key={phase.title}
                    className="glass-card rounded-2xl p-7 transition-all duration-500 hover:bg-white"
                    style={{ animation: "dreamGlow 5s ease-in-out infinite" }}
                  >
                    <div className="text-[11px] font-medium uppercase tracking-[0.15em] mb-3" style={{ color: phase.color }}>
                      {phase.phase}
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-[#0F172A]">{phase.title}</h4>
                    <p className="text-sm text-[#64748B] leading-relaxed mb-5">{phase.desc}</p>
                    <div className="text-xs font-mono px-3 py-2 rounded-lg inline-block bg-black/[0.02] border border-[#E2E8F0]" style={{ color: phase.color }}>
                      {phase.formula}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-[#94A3B8] text-center">
                Morgens um 06:00 hat dein Agent ein saubereres, kompakteres und kreativeres Gedächtnis als am Vorabend.
                <span className="block mt-1 text-[#64748B] font-medium">Das ist kein Feature. Das ist ein Wettbewerbsvorteil.</span>
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           6. USE CASES
           ═══════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 sm:py-32">
          <div
            ref={useCaseReveal.ref}
            className={`max-w-5xl mx-auto reveal ${useCaseReveal.visible ? "is-visible" : ""}`}
          >
            <div className="text-center mb-16">
              <p className="text-[12px] font-medium text-pink-400/80 uppercase tracking-[0.2em] mb-4">
                Use Cases
              </p>
              <h2 className="text-3xl sm:text-[44px] font-bold tracking-tight leading-tight mb-4">
                So verändert der Brain deinen Alltag
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {USE_CASES.map((uc) => (
                <div key={uc.title} className="glass-card rounded-2xl p-7 group hover:border-[#CBD5E1] transition-all duration-500">
                  <h3 className="text-lg font-bold text-[#0F172A] mb-3">{uc.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed mb-6">{uc.story}</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      </span>
                      <div>
                        <span className="text-[11px] text-red-400/70 uppercase tracking-wider font-medium">Vorher</span>
                        <p className="text-sm text-[#64748B]">{uc.before}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </span>
                      <div>
                        <span className="text-[11px] text-emerald-400/70 uppercase tracking-wider font-medium">Nachher</span>
                        <p className="text-sm text-[#334155] font-medium">{uc.after}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           7. GROWTH TIMELINE
           ═══════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 sm:py-32">
          <div
            ref={timelineReveal.ref}
            className={`max-w-3xl mx-auto reveal ${timelineReveal.visible ? "is-visible" : ""}`}
          >
            <div className="text-center mb-16">
              <p className="text-[12px] font-medium text-blue-400/80 uppercase tracking-[0.2em] mb-4">
                Wachstum
              </p>
              <h2 className="text-3xl sm:text-[44px] font-bold tracking-tight leading-tight">
                Wie der Brain wächst
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-6 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, #3B82F6, #6366F1, #8B5CF6, #A855F7, #EC4899)" }}
                aria-hidden="true"
              />

              <div className="space-y-10">
                {TIMELINE.map((t, i) => (
                  <div key={t.time} className="flex gap-6 relative">
                    <div
                      className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10 border-2"
                      style={{
                        borderColor: LAYER_COLORS[Math.min(i, 6)],
                        background: `${LAYER_COLORS[Math.min(i, 6)]}15`,
                        // @ts-expect-error CSS custom property
                        "--pulse-color": `${LAYER_COLORS[Math.min(i, 6)]}40`,
                        animation: "timelinePulse 3s ease-in-out infinite",
                        animationDelay: `${i * 0.3}s`,
                      }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: LAYER_COLORS[Math.min(i, 6)] }} />
                    </div>
                    <div className="pt-2.5">
                      <div className="text-sm font-bold text-[#0F172A] mb-1">{t.time}</div>
                      <p className="text-sm text-[#64748B] leading-relaxed">{t.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           8. COMPETITOR TABLE
           ═══════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 sm:py-32">
          <div
            ref={comparisonReveal.ref}
            className={`max-w-5xl mx-auto reveal ${comparisonReveal.visible ? "is-visible" : ""}`}
          >
            <div className="text-center mb-16">
              <p className="text-[12px] font-medium text-indigo-400/80 uppercase tracking-[0.2em] mb-4">
                Vergleich
              </p>
              <h2 className="text-3xl sm:text-[44px] font-bold tracking-tight leading-tight mb-4">
                Wie der Brain sich unterscheidet
              </h2>
              <p className="text-base text-[#64748B] max-w-2xl mx-auto">
                Kein anderes Tool hat 7 Schichten, einen Knowledge Graph, prozedurales Lernen und einen Dream Cycle — für CHF 5/Monat.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[#E2E8F0]">
                    <th className="text-left py-4 px-5 font-semibold text-[#64748B] sticky left-0 bg-[#FAFBFF] z-10">
                      Feature
                    </th>
                    {COMPARISON.map((row) => (
                      <th
                        key={row.tool}
                        className={`text-center py-4 px-4 font-semibold whitespace-nowrap ${
                          row.tool === "KaderOS Brain" ? "text-[#0F172A]" : "text-[#64748B]"
                        }`}
                      >
                        {row.tool}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_COLS.map((col) => (
                    <tr key={col.key} className="border-b border-[#E2E8F0] hover:bg-black/[0.01] transition-colors">
                      <td className="py-3.5 px-5 text-[#64748B] font-medium sticky left-0 bg-[#FAFBFF] z-10">
                        {col.label}
                      </td>
                      {COMPARISON.map((row) => {
                        const val = row[col.key as keyof typeof row];
                        const isKaderos = row.tool === "KaderOS Brain";
                        return (
                          <td
                            key={`${row.tool}-${col.key}`}
                            className={`py-3.5 px-4 text-center ${isKaderos ? "gradient-row" : ""}`}
                          >
                            {typeof val === "boolean" ? (
                              val ? (
                                <span className={isKaderos ? "text-emerald-400" : "text-emerald-400/70"}>
                                  <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                                </span>
                              ) : (
                                <span className="text-[#CBD5E1]">—</span>
                              )
                            ) : (
                              <span className={isKaderos ? "text-[#0F172A] font-semibold" : "text-[#64748B]"}>
                                {val}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           9. BATTLECARDS
           ═══════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 sm:py-32">
          <div
            ref={battleReveal.ref}
            className={`max-w-4xl mx-auto reveal ${battleReveal.visible ? "is-visible" : ""}`}
          >
            <div className="text-center mb-16">
              <p className="text-[12px] font-medium text-fuchsia-400/80 uppercase tracking-[0.2em] mb-4">
                Abgrenzung
              </p>
              <h2 className="text-3xl sm:text-[44px] font-bold tracking-tight leading-tight">
                Warum nicht die Anderen?
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {BATTLECARDS.map((card) => (
                <div
                  key={card.name}
                  className="glass-card rounded-2xl p-7 group hover:border-[#CBD5E1] hover:bg-white transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-[#0F172A] mb-3">{card.name}</h3>
                  <p className="text-[14px] text-[#64748B] leading-relaxed">{card.line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           10. DESIGN PRINCIPLES
           ═══════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 sm:py-32">
          <div
            ref={principlesReveal.ref}
            className={`max-w-4xl mx-auto reveal ${principlesReveal.visible ? "is-visible" : ""}`}
          >
            <div className="text-center mb-16">
              <p className="text-[12px] font-medium text-emerald-400/80 uppercase tracking-[0.2em] mb-4">
                Philosophie
              </p>
              <h2 className="text-3xl sm:text-[44px] font-bold tracking-tight leading-tight">
                Design-Prinzipien
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.title}
                  className="glass-card rounded-2xl p-7 group hover:border-[#CBD5E1] hover:bg-white transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-[#E2E8F0] flex items-center justify-center text-indigo-500 mb-4 group-hover:bg-indigo-100 transition-colors duration-300">
                    {p.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">{p.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           11. TECH STACK
           ═══════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 sm:py-32">
          <div
            ref={techReveal.ref}
            className={`max-w-4xl mx-auto reveal ${techReveal.visible ? "is-visible" : ""}`}
          >
            <div className="text-center mb-16">
              <p className="text-[12px] font-medium text-cyan-400/80 uppercase tracking-[0.2em] mb-4">
                Unter der Haube
              </p>
              <h2 className="text-3xl sm:text-[44px] font-bold tracking-tight leading-tight mb-4">
                Tech Stack
              </h2>
              <p className="text-base text-[#64748B] max-w-xl mx-auto">
                Alles Open Source. Alles auditierbar. Kein einziger proprietärer Service.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TECH_STACK.map((item) => (
                <div
                  key={item.label}
                  className="glass-card rounded-xl p-5 group hover:border-[#CBD5E1] hover:bg-white transition-all duration-300"
                >
                  <div className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-medium mb-2">
                    {item.label}
                  </div>
                  <div className="text-sm font-bold text-[#0F172A] font-mono mb-1">{item.tech}</div>
                  <div className="text-xs text-[#94A3B8]">{item.why}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           12. FAQ
           ═══════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 sm:py-32">
          <div
            ref={faqReveal.ref}
            className={`max-w-3xl mx-auto reveal ${faqReveal.visible ? "is-visible" : ""}`}
          >
            <div className="text-center mb-16">
              <p className="text-[12px] font-medium text-[#94A3B8] uppercase tracking-[0.2em] mb-4">
                FAQ
              </p>
              <h2 className="text-3xl sm:text-[44px] font-bold tracking-tight leading-tight">
                Häufige Fragen
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
           13. FINAL CTA
           ═══════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 sm:py-32">
          <div
            ref={ctaReveal.ref}
            className={`max-w-4xl mx-auto reveal ${ctaReveal.visible ? "is-visible" : ""}`}
          >
            <div
              className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center"
              style={{
                background: "linear-gradient(135deg, #0f0f1a 0%, #1a1035 40%, #15102a 100%)",
              }}
            >
              {/* Subtle grid */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
                aria-hidden="true"
              />

              {/* Glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(99, 102, 241, 0.12) 0%, transparent 70%)" }}
                aria-hidden="true"
              />

              <div className="relative">
                <h2 className="text-3xl sm:text-[48px] font-bold tracking-tight leading-tight mb-5">
                  Dein Agent verdient ein Gedächtnis.
                </h2>
                <p className="text-lg text-zinc-300 mb-4 max-w-lg mx-auto leading-relaxed">
                  Jeden Tag verliert dein Agent Wissen. Jeden Tag fängt er von vorne an.
                  Jeden Tag zahlst du für Intelligenz, die sich an nichts erinnert.
                </p>
                <p className="text-base text-zinc-300 font-medium mb-10">
                  7 Schichten. CHF 5 im Monat. Gebaut wie ein echtes Gehirn.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/signup"
                    className="group relative px-10 py-4 rounded-2xl font-semibold text-[15px] text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20"
                    style={{
                      background: "linear-gradient(135deg, #3739C1 0%, #6366F1 100%)",
                      animation: "float 4s ease-in-out infinite",
                    }}
                  >
                    <span className="relative z-10">Brain aktivieren — CHF 5/Monat</span>
                    <div className="absolute inset-0 bg-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                  <Link
                    href="https://github.com/kaderosio/kaderos.io"
                    className="px-8 py-4 rounded-2xl font-semibold text-[15px] text-zinc-300 border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.03] transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Link>
                </div>

                <p className="text-sm text-[#CBD5E1] mt-8">
                  Open Source. Swiss Hosted. Kein LLM. Kein Lock-in.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
