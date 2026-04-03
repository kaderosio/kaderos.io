"use client";

import { ArrowRight, Clock, ArrowUpRight } from "lucide-react";

const POSTS = [
  {
    slug: "warum-kaderos",
    title: "Warum wir KaderOS bauen",
    excerpt: "46% der Schweizer Firmen nutzen AI. Aber niemand hat ein System, das AI Agents wie ein echtes Team orchestriert. Das ändern wir.",
    date: "2. April 2026",
    readTime: "5 min",
    tag: "Manifesto",
    tagColor: "#000088",
    featured: true,
  },
  {
    slug: "paperclip-vs-kaderos",
    title: "KaderOS vs Paperclip: Was ist der Unterschied?",
    excerpt: "Paperclip ist grossartig. Aber es wurde nicht für die Schweiz gebaut. Kein nDSG, kein CHF, keine Mehrsprachigkeit. Hier ist, warum das wichtig ist.",
    date: "3. April 2026",
    readTime: "4 min",
    tag: "Vergleich",
    tagColor: "#000088",
    featured: false,
  },
  {
    slug: "ai-agents-schweiz-2026",
    title: "AI Agents in der Schweiz: Von Copilots zu Kader",
    excerpt: "2026 ist das Jahr, in dem Schweizer KMU von AI-Assistenten zu AI-Teams wechseln. Was das für dein Business bedeutet.",
    date: "4. April 2026",
    readTime: "6 min",
    tag: "Trend",
    tagColor: "#059669",
    featured: false,
  },
  {
    slug: "ndsg-ai-compliance",
    title: "nDSG und AI: Was du wissen musst",
    excerpt: "Das Schweizer Datenschutzgesetz gilt auch für AI Agents. So stellst du sicher, dass dein AI-Team compliant ist.",
    date: "5. April 2026",
    readTime: "7 min",
    tag: "Compliance",
    tagColor: "#DC2626",
    featured: false,
  },
  {
    slug: "solo-founder-ai-team",
    title: "Als Solo-Founder ein 4-köpfiges AI-Team aufbauen",
    excerpt: "CEO, CTO, CMO und Strategy Partner — wie du als Einzelperson ein komplettes Unternehmen führst. Schritt für Schritt.",
    date: "7. April 2026",
    readTime: "8 min",
    tag: "Tutorial",
    tagColor: "#D97706",
    featured: false,
  },
  {
    slug: "confidence-gate-erklaert",
    title: "Confidence Gate: Wann dein Agent autonom handelt",
    excerpt: "Über 90%: auto-execute. 70–89%: inform. Unter 70%: eskalieren. Wie du die richtige Balance zwischen Autonomie und Kontrolle findest.",
    date: "8. April 2026",
    readTime: "5 min",
    tag: "Feature Deep Dive",
    tagColor: "#0891B2",
    featured: false,
  },
  {
    slug: "ai-agents-schweiz",
    title: "AI Agents für Schweizer KMU: Was sie können und was nicht",
    excerpt: "AI Agents versprechen viel. Aber was leisten sie wirklich für Schweizer KMU? Ein ehrlicher Überblick über Möglichkeiten, Grenzen und den richtigen Einsatz.",
    date: "3. April 2026",
    readTime: "7 min",
    tag: "Guide",
    tagColor: "#059669",
    featured: false,
  },
  {
    slug: "ai-team-aufbauen",
    title: "Wie du ein AI-Team aufbaust — ohne ein einziges Bewerbungsgespräch",
    excerpt: "AI Mitarbeiter brauchen kein Vorstellungsgespräch. So baust du dein digitales Team auf — Schritt für Schritt, von der Rolle bis zum ersten Sprint.",
    date: "4. April 2026",
    readTime: "8 min",
    tag: "Tutorial",
    tagColor: "#D97706",
    featured: false,
  },
  {
    slug: "ndsg-ai-konform",
    title: "nDSG und AI: So setzt du KI datenschutzkonform ein",
    excerpt: "Das Schweizer Datenschutzgesetz gilt auch für AI Agents. Worauf du achten musst — konkret und ohne Juristendeutsch.",
    date: "5. April 2026",
    readTime: "8 min",
    tag: "Compliance",
    tagColor: "#DC2626",
    featured: false,
  },
  {
    slug: "ai-kosten-kmu",
    title: "Was kostet AI wirklich? Ein ehrlicher Vergleich für KMU",
    excerpt: "AI-Kosten für Schweizer KMU transparent aufgeschlüsselt. Von API-Kosten bis TCO — mit konkreten CHF-Zahlen und ehrlichem ROI-Vergleich.",
    date: "6. April 2026",
    readTime: "7 min",
    tag: "Analyse",
    tagColor: "#000088",
    featured: false,
  },
  {
    slug: "crewai-vs-kaderos",
    title: "CrewAI vs KaderOS: Welches AI-Framework passt zu dir?",
    excerpt: "CrewAI und KaderOS im direkten Vergleich. Features, Zielgruppe, Preise und Schweiz-Tauglichkeit — ehrlich und ohne Marketing-Blabla.",
    date: "7. April 2026",
    readTime: "7 min",
    tag: "Vergleich",
    tagColor: "#000088",
    featured: false,
  },
  {
    slug: "ai-automatisierung-agentur",
    title: "AI Automatisierung für Agenturen: 5 Workflows die sofort funktionieren",
    excerpt: "5 konkrete AI-Workflows für Agenturen — von Client Reporting bis Content-Produktion. Mit Zeitersparnis pro Workflow.",
    date: "8. April 2026",
    readTime: "8 min",
    tag: "Praxis",
    tagColor: "#059669",
    featured: false,
  },
  {
    slug: "zukunft-arbeit-schweiz",
    title: "Die Zukunft der Arbeit in der Schweiz: AI Agents statt Headcount",
    excerpt: "Der Schweizer Arbeitsmarkt verändert sich. AI Agents ersetzen nicht Menschen — sie verändern, wie Teams skalieren.",
    date: "9. April 2026",
    readTime: "8 min",
    tag: "Trend",
    tagColor: "#059669",
    featured: false,
  },
  {
    slug: "open-source-ai-tools",
    title: "Die besten Open Source AI Tools 2026 für Schweizer Unternehmen",
    excerpt: "Open Source AI Tools für Schweizer KMU — von Sprachmodellen bis Agent-Frameworks. Was taugt, was nicht, und worauf du achten musst.",
    date: "10. April 2026",
    readTime: "9 min",
    tag: "Toolbox",
    tagColor: "#0891B2",
    featured: false,
  },
  {
    slug: "ai-onboarding-guide",
    title: "AI Onboarding: So machst du dein Team in 7 Tagen AI-ready",
    excerpt: "Schritt-für-Schritt Anleitung für AI Onboarding in Schweizer KMU. In 7 Tagen vom Kickoff bis zum produktiven AI-Team — ohne Chaos und Widerstand.",
    date: "11. April 2026",
    readTime: "8 min",
    tag: "Guide",
    tagColor: "#059669",
    featured: false,
  },
  {
    slug: "kmu-digitalisierung-2026",
    title: "KMU Digitalisierung 2026: Was sich wirklich lohnt",
    excerpt: "Digitalisierung für Schweizer KMU 2026: Was funktioniert, was Geldverschwendung ist und wo du als erstes investieren solltest.",
    date: "12. April 2026",
    readTime: "7 min",
    tag: "Strategie",
    tagColor: "#000088",
    featured: false,
  },
  {
    slug: "ai-budget-planen",
    title: "AI Budget planen: So kalkulierst du realistisch",
    excerpt: "AI Budget für Schweizer KMU realistisch planen. Von API-Kosten über Personalaufwand bis ROI — mit konkreten CHF-Zahlen und Rechenbeispielen.",
    date: "13. April 2026",
    readTime: "7 min",
    tag: "Analyse",
    tagColor: "#000088",
    featured: false,
  },
  {
    slug: "ai-governance-kmu",
    title: "AI Governance für KMU: Regeln ohne Bürokratie",
    excerpt: "AI Governance muss nicht kompliziert sein. Praktische Regeln für Schweizer KMU — ohne 50-seitiges Dokument, aber mit klaren Leitplanken.",
    date: "14. April 2026",
    readTime: "8 min",
    tag: "Compliance",
    tagColor: "#DC2626",
    featured: false,
  },
  {
    slug: "solo-founder-ai-stack",
    title: "Der perfekte AI Stack für Solo-Founders 2026",
    excerpt: "AI Stack für Solo-Founders: Welche Tools du wirklich brauchst, was überflüssig ist und wie du als Einzelperson ein ganzes Unternehmen führst.",
    date: "15. April 2026",
    readTime: "9 min",
    tag: "Toolbox",
    tagColor: "#0891B2",
    featured: false,
  },
  {
    slug: "ai-agent-vs-chatbot",
    title: "AI Agent vs Chatbot: Was ist der Unterschied?",
    excerpt: "AI Agent und Chatbot werden oft verwechselt. Hier erfährst du den Unterschied — und warum er für dein Business entscheidend ist.",
    date: "16. April 2026",
    readTime: "6 min",
    tag: "Wissen",
    tagColor: "#D97706",
    featured: false,
  },
  {
    slug: "schweizer-startups-ai",
    title: "Wie Schweizer Startups AI nutzen — 5 echte Beispiele",
    excerpt: "5 echte Beispiele, wie Schweizer Startups AI im Alltag einsetzen. Von Zürich bis Lausanne — konkrete Use Cases mit messbaren Ergebnissen.",
    date: "17. April 2026",
    readTime: "8 min",
    tag: "Praxis",
    tagColor: "#059669",
    featured: false,
  },
  {
    slug: "ai-risiken-kmu",
    title: "AI Risiken für KMU: Was schiefgehen kann und wie du dich schützt",
    excerpt: "AI Risiken für Schweizer KMU ehrlich aufgezeigt. Halluzinationen, Datenschutz, Abhängigkeiten — und konkrete Massnahmen dagegen.",
    date: "18. April 2026",
    readTime: "8 min",
    tag: "Compliance",
    tagColor: "#DC2626",
    featured: false,
  },
  {
    slug: "produktivitaet-ai-tools",
    title: "Produktivität mit AI: 10 Tools die wirklich Zeit sparen",
    excerpt: "10 AI Tools für mehr Produktivität — getestet, bewertet und mit ehrlicher Einschätzung. Für Schweizer KMU und Founders.",
    date: "19. April 2026",
    readTime: "9 min",
    tag: "Toolbox",
    tagColor: "#0891B2",
    featured: false,
  },
  {
    slug: "ai-mitarbeiter-zukunft",
    title: "AI Mitarbeiter: Hype oder die Zukunft deines Teams?",
    excerpt: "AI Mitarbeiter — Marketing-Buzzword oder echte Zukunft? Was AI Agents heute können, wo die Grenzen sind und wie du sie sinnvoll einsetzt.",
    date: "20. April 2026",
    readTime: "8 min",
    tag: "Trend",
    tagColor: "#059669",
    featured: false,
  },
];

export default function BlogPage() {
  const featured = POSTS.find(p => p.featured);
  const rest = POSTS.filter(p => !p.featured);

  return (
    <div className="py-20 px-6">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="text-[12px] font-semibold text-[#000088] uppercase tracking-widest mb-4">Blog</div>
        <h1 className="text-[48px] font-extrabold tracking-tight mb-4">
          Denken. Bauen. Teilen.
        </h1>
        <p className="text-[16px] text-[#6E6E73]">Insights zu AI Agents, Swiss Tech und dem Aufbau von KaderOS.</p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Featured Post */}
        {featured && (
          <a href={`/blog/${featured.slug}`} className="block mb-12 group cursor-pointer">
            <div className="p-10 rounded-2xl border border-[#E5E5EA] bg-gradient-to-br from-[#000088]/[0.03] to-white hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold" style={{ background: featured.tagColor + "10", color: featured.tagColor }}>{featured.tag}</span>
                <span className="text-[12px] text-[#86868B] flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
                <span className="text-[12px] text-[#86868B]">{featured.date}</span>
              </div>
              <h2 className="text-[28px] font-bold mb-3 group-hover:text-[#000088] transition-colors">{featured.title}</h2>
              <p className="text-[15px] text-[#6E6E73] leading-relaxed max-w-3xl mb-5">{featured.excerpt}</p>
              <span className="text-[13px] text-[#000088] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Weiterlesen <ArrowRight size={14} />
              </span>
            </div>
          </a>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {rest.map(post => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="group cursor-pointer rounded-2xl border border-[#E5E5EA] bg-white p-6 hover:shadow-lg hover:border-[#000088]/20 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: post.tagColor + "10", color: post.tagColor }}>{post.tag}</span>
                <span className="text-[10px] text-[#C7C7CC]">{post.readTime}</span>
              </div>
              <h3 className="text-[15px] font-semibold mb-2 group-hover:text-[#000088] transition-colors leading-snug">{post.title}</h3>
              <p className="text-[12px] text-[#86868B] leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#C7C7CC]">{post.date}</span>
                <ArrowUpRight size={14} className="text-[#C7C7CC] group-hover:text-[#000088] transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
