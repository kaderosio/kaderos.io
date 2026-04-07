import Link from "next/link";
import { generateArticleSchema } from "@/lib/schema";

const articleSchema = generateArticleSchema({
  title:
    "Warum dein KI-Assistent alles vergisst — und was du dagegen tun kannst",
  description:
    "Jeder kennt es: Du erklärst ChatGPT zum fünften Mal dasselbe. Warum AI vergisst und was du dagegen tun kannst.",
  slug: "warum-ki-assistent-alles-vergisst",
  datePublished: "2026-04-07",
  readingTimeMinutes: 8,
});

export const metadata = {
  title:
    "Warum dein KI-Assistent alles vergisst — und was du dagegen tun kannst | KaderOS",
  description:
    "Jeder kennt es: Du erklärst ChatGPT zum fünften Mal dasselbe. Warum AI vergisst, wie Context Windows funktionieren und was du dagegen tun kannst.",
  keywords: [
    "warum vergisst ChatGPT",
    "KI Kontext verloren",
    "AI vergisst alles",
    "KI Assistent mit Langzeitgedächtnis",
    "AI Memory",
    "Agent Brain",
    "KaderOS",
  ],
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Blog
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          Warum dein KI-Assistent alles vergisst — und was du dagegen tun kannst
        </h1>
        <div className="text-[14px] text-[#86868B]">
          7. April 2026 · 8 min Lesezeit
        </div>
      </div>
      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        {/* ====== 1. Das Problem ====== */}
        <h2>Du erklärst ChatGPT zum fünften Mal dasselbe</h2>
        <p>
          Du öffnest einen neuen Chat. &quot;Ich bin Gründer einer Agentur in Zürich, wir machen
          Branding für SaaS-Startups, unser Team hat 6 Leute, wir nutzen Figma und
          Webflow, unsere Zielgruppe sind B2B-Founders im DACH-Raum…&quot;
        </p>
        <p>
          Stop. Das hast du gestern schon gesagt. Und vorgestern. Und letzte Woche.
          Dreimal am Montag und zweimal am Dienstag. Dein KI-Assistent hat es jedes
          Mal vergessen. Komplett. Als hättet ihr euch nie gesprochen.
        </p>
        <p>
          Du bist nicht allein. Millionen von Nutzern erleben das täglich. Du gibst
          ChatGPT, Claude oder Gemini Kontext — und beim nächsten Chat ist alles weg.
          Kein Gedächtnis. Kein Lerneffekt. Jedes Gespräch beginnt bei null.
        </p>
        <p>
          Das Ergebnis: Du verbringst mehr Zeit damit, deinem Assistenten zu erklären,
          wer du bist, als tatsächlich produktiv zu arbeiten. Der Assistent, der dir
          Zeit sparen soll, frisst deine Zeit mit Wiederholungen. Das ist nicht nur
          nervig — das ist ein fundamentales Designproblem.
        </p>
        <p>
          Und es wird schlimmer. Je komplexer dein Business wird, desto mehr Kontext
          braucht dein Assistent. Deine Kunden, deine Prozesse, deine Entscheidungen
          der letzten Monate. Alles, was ein menschlicher Mitarbeiter über Wochen
          lernt und behält, vergisst dein KI-Assistent in dem Moment, wo du den
          Tab schliesst.
        </p>
        <p>
          Die Frage ist nicht, ob dein Assistent vergisst. Die Frage ist: Warum?
          Und vor allem: Was kannst du dagegen tun?
        </p>

        {/* ====== 2. Warum AI vergisst ====== */}
        <h2>Warum dein KI-Assistent vergisst: Context Windows erklärt</h2>
        <p>
          Um zu verstehen, warum AI alles vergisst, musst du ein Konzept kennen:
          das <strong>Context Window</strong>. Das ist der Arbeitsspeicher deines
          KI-Assistenten. Nicht seine Festplatte — sein RAM.
        </p>
        <p>
          Wenn du mit ChatGPT chattest, wird jede Nachricht — deine und die Antwort —
          in dieses Fenster geschoben. Das Fenster hat eine feste Grösse, gemessen in
          Tokens (grob: 1 Token ≈ 0.75 Wörter). GPT-4o hat etwa 128&apos;000 Tokens.
          Claude kann bis zu 200&apos;000. Klingt viel. Ist es nicht.
        </p>
        <p>
          128&apos;000 Tokens entsprechen ungefähr 96&apos;000 Wörtern. Das klingt nach einem
          Buch. Aber in der Praxis? Dein System-Prompt frisst schon 2&apos;000-5&apos;000
          Tokens. Jede Nachricht im Verlauf addiert sich. Bei einem intensiven
          Arbeitstag mit 50 Nachrichten hin und her bist du schnell bei
          40&apos;000-60&apos;000 Tokens. Und dann passiert etwas Entscheidendes.
        </p>
        <p>
          <strong>Das Fenster rutscht.</strong> Alte Nachrichten fallen raus. Nicht
          weil die AI sie aktiv vergisst, sondern weil sie physisch nicht mehr
          reinpassen. Es ist, als würdest du einem Mitarbeiter erlauben, nur die
          letzten 20 Seiten eines Gesprächsprotokolls zu lesen — alles davor
          existiert für ihn nicht mehr.
        </p>
        <p>
          Und hier kommt der zweite Punkt: <strong>Jede Session ist isoliert.</strong>{" "}
          Wenn du einen neuen Chat startest, beginnt das Context Window leer. Die AI
          weiss nichts von gestern. Nichts von letzter Woche. Nichts von deinem
          Unternehmen, deinen Kunden, deinen Präferenzen. Du fängst jedes Mal bei null an.
        </p>
        <p>
          Ja, ChatGPT hat inzwischen ein &quot;Memory&quot;-Feature. Aber das speichert nur
          einzelne Fakten — nicht den Kontext, die Zusammenhänge, die Geschichte
          deiner Entscheidungen. Es ist wie ein Notizzettel vs. ein echtes Gehirn.
          Besser als nichts, aber weit entfernt von dem, was ein Mitarbeiter kann.
        </p>
        <p>
          Das fundamentale Problem: <strong>LLMs haben kein Langzeitgedächtnis.</strong>{" "}
          Sie wurden trainiert, nicht erinnert. Sie generieren Antworten basierend auf
          Mustern — aber sie speichern nichts aus deinen Gesprächen. Jede Antwort ist
          eine Momentaufnahme, kein kumulativer Lernprozess.
        </p>

        {/* ====== 3. Die 3 Ansätze ====== */}
        <h2>Die 3 Ansätze: RAG, Fine-Tuning, Memory Systems</h2>
        <p>
          Die AI-Industrie kennt das Problem. Und es gibt drei grundlegende Ansätze,
          die es lösen sollen. Jeder hat Stärken und Schwächen.
        </p>

        <h3>1. RAG — Retrieval-Augmented Generation</h3>
        <p>
          Die Idee: Du speicherst dein Wissen in einer Datenbank (meistens eine
          Vektor-Datenbank). Wenn du eine Frage stellst, sucht das System zuerst
          die relevanten Dokumente und gibt sie der AI als Kontext mit.
        </p>
        <p>
          <strong>Vorteil:</strong> Du kannst riesige Wissensmengen durchsuchbar
          machen. PDFs, E-Mails, CRM-Daten — alles wird indexiert.
          <strong> Nachteil:</strong> RAG gibt dir Fakten, aber kein Gedächtnis. Es
          weiss nicht, was du gestern besprochen hast. Es hat keine Erinnerung an
          Entscheidungen, keine Chronologie, keinen Lerneffekt. Es ist eine
          Suchmaschine, kein Gehirn.
        </p>

        <h3>2. Fine-Tuning</h3>
        <p>
          Die Idee: Du trainierst das Modell mit deinen eigenen Daten nach. So
          &quot;lernt&quot; es deinen Stil, dein Vokabular, dein Wissen.
        </p>
        <p>
          <strong>Vorteil:</strong> Dauerhaft. Das Wissen ist im Modell selbst.
          <strong> Nachteil:</strong> Teuer (CHF 500-50&apos;000 pro Training), langsam
          (Stunden bis Tage), veraltet schnell, und du verlierst die Kontrolle
          darüber, was das Modell &quot;gelernt&quot; hat. Für die meisten KMUs ist
          Fine-Tuning weder praktikabel noch sinnvoll.
        </p>

        <h3>3. Memory Systems</h3>
        <p>
          Die Idee: Eine separate Schicht zwischen dir und dem LLM, die sich
          erinnert. Nicht das Modell lernt — das System drumherum speichert
          Konversationen, extrahiert Fakten, baut Wissensgrafen auf und stellt
          den richtigen Kontext zur richtigen Zeit bereit.
        </p>
        <p>
          <strong>Vorteil:</strong> Echtes Langzeitgedächtnis. Chronologie.
          Lerneffekt. Das System wird besser, je länger du es nutzt.
          <strong> Nachteil:</strong> Komplex zu bauen. Die meisten Anbieter
          kratzen nur an der Oberfläche.
        </p>
        <p>
          Die Realität: Für echtes KI-Gedächtnis brauchst du eine Kombination. RAG
          für Faktenwissen. Memory Systems für Kontext und Geschichte. Fine-Tuning
          höchstens für spezialisierte Anwendungsfälle. Und genau hier wird es
          interessant.
        </p>

        {/* ====== 4. 7 Anforderungen ====== */}
        <h2>Was ein echtes KI-Gedächtnis können muss</h2>
        <p>
          Nicht jedes &quot;Memory Feature&quot; ist gleich. Die meisten sind Notizzettel.
          Ein echtes KI-Gedächtnis muss 7 Dinge können:
        </p>
        <ol>
          <li>
            <strong>Episodisch erinnern.</strong> Nicht nur Fakten, sondern ganze
            Konversationen. Was wurde am 15. März besprochen? Welche Argumente gab
            es? Was war der Konsens? Ein echtes Gedächtnis speichert Episoden, nicht
            nur Datenpunkte.
          </li>
          <li>
            <strong>Semantisch verknüpfen.</strong> &quot;Müller AG&quot; ist nicht nur ein
            Kundenname — es ist verknüpft mit 12 Interaktionen, 3 offenen Angeboten,
            der Präferenz für 30-Tage-Zahlungsziel und dem Fakt, dass der
            Entscheider immer montags erreichbar ist. Wissen muss vernetzt sein.
          </li>
          <li>
            <strong>Priorisieren.</strong> Nicht alles ist gleich wichtig. Was du
            gestern besprochen hast, ist relevanter als das Meeting vor 3 Monaten.
            Ein gutes Gedächtnis gewichtet Informationen nach Aktualität,
            Häufigkeit und Relevanz.
          </li>
          <li>
            <strong>Vergessen können.</strong> Klingt paradox, ist aber kritisch.
            Veraltete Informationen müssen abklingen. Wenn ein Kunde seine Adresse
            ändert, darf das alte Wissen nicht gleichwertig neben dem neuen stehen.
            Kontrolliertes Vergessen ist genauso wichtig wie Erinnern.
          </li>
          <li>
            <strong>Kontext-sensitiv abrufen.</strong> Wenn du über Marketing
            sprichst, brauchst du andere Erinnerungen als wenn du über Finanzen
            sprichst — auch wenn es um denselben Kunden geht. Das Gedächtnis muss
            verstehen, was gerade relevant ist.
          </li>
          <li>
            <strong>Über Agents hinweg funktionieren.</strong> In einem echten
            AI-System hast du mehrere Agents. Dein Marketing-Agent muss wissen,
            was dein Sales-Agent gelernt hat. Gedächtnis darf nicht in Silos
            eingesperrt sein.
          </li>
          <li>
            <strong>Transparent sein.</strong> Du musst sehen können, was dein
            System sich gemerkt hat. Und du musst es korrigieren können. Kein
            Black-Box-Gedächtnis, sondern volle Kontrolle.
          </li>
        </ol>

        {/* ====== 5. KaderOS Agent Brain ====== */}
        <h2>Wie der KaderOS Agent Brain das löst</h2>
        <p>
          Der{" "}
          <Link href="/brain" className="text-[#000088] hover:underline">
            KaderOS Agent Brain
          </Link>{" "}
          ist ein 7-Schichten-Gedächtnissystem, das für genau diese Anforderungen
          gebaut wurde. Kein Notizzettel. Ein echtes Gehirn für dein AI-Team.
        </p>

        <h3>Schicht 1: Episodischer Speicher</h3>
        <p>
          Jede Konversation, jede Entscheidung, jedes Ergebnis wird als Episode
          gespeichert — mit Zeitstempel, Kontext und Outcome. Dein Agent weiss
          nicht nur, was Müller AG will. Er weiss, wann du das letzte Mal mit
          ihnen gesprochen hast und was das Ergebnis war.
        </p>

        <h3>Schicht 2: Semantischer Wissensgraf</h3>
        <p>
          Fakten werden nicht isoliert gespeichert, sondern als Knoten in einem
          Graphen. Müller AG → Kontaktperson: Hans Müller → Branche: Pharma →
          letzte Offerte: CHF 45&apos;000 → Status: ausstehend. Alles verknüpft.
          Alles durchsuchbar. Die Beziehungen sind genauso wichtig wie die Daten
          selbst.
        </p>

        <h3>Schicht 3: Working Memory</h3>
        <p>
          Das Kurzzeitgedächtnis deines Agents. Was ist gerade relevant? Welche
          Aufgabe wird bearbeitet? Welcher Kontext ist aktiv? Working Memory sorgt
          dafür, dass dein Agent den Faden nicht verliert — auch mitten in
          komplexen, mehrstufigen Aufgaben.
        </p>

        <h3>Schicht 4: Prozedurales Gedächtnis</h3>
        <p>
          Dein Agent merkt sich nicht nur was, sondern auch wie. Wie du Offerten
          schreibst. Wie du Kunden ansprichst. Welche Schritte in welcher
          Reihenfolge kommen. Mit der Zeit wird dein Agent schneller und präziser,
          weil er Abläufe internalisiert.
        </p>

        <h3>Schicht 5: Shared Memory</h3>
        <p>
          Das Gedächtnis, das über einzelne Agents hinweg funktioniert. Dein
          Marketing-Kader weiss, was dein Sales-Kader gelernt hat. Dein
          Finanz-Kader kennt die aktuellen Kampagnenkosten. Keine Silos. Wie in
          einem echten Team, das miteinander redet.
        </p>

        <h3>Schicht 6: Reflection Layer</h3>
        <p>
          Hier wird es spannend. Der Reflection Layer analysiert vergangene
          Entscheidungen und Ergebnisse. Was hat funktioniert? Was nicht? Welche
          Muster wiederholen sich? Dein Agent entwickelt über Zeit ein
          Meta-Verständnis deines Business.
        </p>

        <h3>Schicht 7: Governance Memory</h3>
        <p>
          Alles, was dein Agent sich merkt, ist auditierbar. Du siehst, was
          gespeichert wurde, wann, warum. Du kannst korrigieren. Du kannst
          löschen. Volle Transparenz. Das ist nicht nur gut für dich — das ist
          Pflicht unter dem{" "}
          <Link
            href="/blog/ndsg-ai-schweiz"
            className="text-[#000088] hover:underline"
          >
            nDSG
          </Link>
          .
        </p>

        {/* ====== 6. Dream Cycle ====== */}
        <h2>Der Dream Cycle — warum dein Agent nachts schlauer wird</h2>
        <p>
          Hier ist das Feature, das den grössten Unterschied macht. Und ja, es
          heisst wirklich &quot;Dream Cycle&quot;.
        </p>
        <p>
          Das Konzept ist inspiriert vom menschlichen Schlaf. Wenn du schläfst,
          konsolidiert dein Gehirn die Erlebnisse des Tages. Es sortiert, verknüpft,
          priorisiert. Wichtiges wird verstärkt. Unwichtiges verblasst.
        </p>
        <p>
          Der KaderOS Dream Cycle macht genau das — für deine Agents. Jede Nacht
          (oder in einem von dir definierten Intervall) passiert folgendes:
        </p>
        <ul>
          <li>
            <strong>Konsolidierung:</strong> Neue Episoden werden mit bestehendem
            Wissen verknüpft. Der Wissensgraf wird aktualisiert. Redundanzen werden
            entfernt.
          </li>
          <li>
            <strong>Reflexion:</strong> Der Agent analysiert, welche Entscheidungen
            zu welchen Ergebnissen geführt haben. Muster werden erkannt.
          </li>
          <li>
            <strong>Priorisierung:</strong> Relevantes Wissen wird höher gewichtet.
            Veraltetes klingt ab. Der Wissensgraf bleibt frisch und akkurat.
          </li>
          <li>
            <strong>Cross-Agent-Sync:</strong> Erkenntnisse eines Agents werden an
            andere weitergegeben. Wenn dein Sales-Agent gelernt hat, dass ein
            bestimmter Pitch bei Pharma-Kunden funktioniert, weiss dein
            Marketing-Agent das am nächsten Morgen auch.
          </li>
        </ul>
        <p>
          Das Ergebnis: Dein Agent ist morgens schlauer als gestern Abend. Nicht
          weil er neue Daten bekommen hat — sondern weil er die bestehenden besser
          verarbeitet hat. Genau wie du nach einer guten Nacht Schlaf plötzlich die
          Lösung für ein Problem siehst, an dem du gestern noch gehangen bist.
        </p>
        <p>
          Und das Beste: Du merkst es. Nach einer Woche sind die Antworten
          relevanter. Nach einem Monat versteht dein Agent dein Business besser als
          mancher Mitarbeiter. Nach drei Monaten hast du einen Wissensschatz, den
          kein neuer Angestellter in dieser Zeit aufbauen könnte.
        </p>

        {/* ====== 7. Was es kostet ====== */}
        <h2>Was das kostet: CHF 5/Mo vs. Mem0 $249/Mo vs. Zep $50/Mo</h2>
        <p>
          Memory-Systeme für AI Agents gibt es inzwischen einige. Die Preise?
          Überraschend unterschiedlich.
        </p>

        <div className="overflow-x-auto my-8">
          <table className="w-full text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5EA]">
                <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">
                  Anbieter
                </th>
                <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">
                  Preis/Monat
                </th>
                <th className="text-left py-3 pr-4 font-semibold text-[#1D1D1F]">
                  Was du bekommst
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#F5F5F7]">
                <td className="py-3 pr-4 text-[#6E6E73]">
                  <strong className="text-[#1D1D1F]">KaderOS Agent Brain</strong>
                </td>
                <td className="py-3 pr-4 text-[#1D1D1F] font-semibold">
                  ab CHF 5
                </td>
                <td className="py-3 pr-4 text-[#6E6E73]">
                  7-Schichten-Memory, Dream Cycle, Cross-Agent-Sync, Governance,
                  lokal oder Cloud, CHF-Abrechnung
                </td>
              </tr>
              <tr className="border-b border-[#F5F5F7]">
                <td className="py-3 pr-4 text-[#6E6E73]">
                  <strong className="text-[#1D1D1F]">Mem0</strong>
                </td>
                <td className="py-3 pr-4 text-[#1D1D1F] font-semibold">
                  ab $249
                </td>
                <td className="py-3 pr-4 text-[#6E6E73]">
                  Key-Value Memory, API-basiert, US-hosted, Dollar-Abrechnung
                </td>
              </tr>
              <tr className="border-b border-[#F5F5F7]">
                <td className="py-3 pr-4 text-[#6E6E73]">
                  <strong className="text-[#1D1D1F]">Zep</strong>
                </td>
                <td className="py-3 pr-4 text-[#1D1D1F] font-semibold">
                  ab $50
                </td>
                <td className="py-3 pr-4 text-[#6E6E73]">
                  Konversations-Memory, Graph-basiert, US-hosted, Dollar-Abrechnung
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Die Preisdifferenz ist massiv. Mem0 Pro kostet $249/Monat — für ein
          System, das primär Key-Value-Paare speichert. Zep startet bei $50/Monat
          mit einem solideren Ansatz (Graph-basiert), ist aber auf US-Server
          beschränkt und bietet keine Schweiz-spezifischen Features.
        </p>
        <p>
          KaderOS Agent Brain startet bei CHF 5/Monat im Starter-Plan. Dafür
          bekommst du das volle 7-Schichten-System inklusive Dream Cycle. In CHF
          abgerechnet. nDSG-konform. Optional lokal deploybar.
        </p>
        <p>
          Die ehrliche Frage: Warum der Preisunterschied? Weil KaderOS den Agent
          Brain als Teil des Gesamtsystems anbietet — nicht als Standalone-API.
          Memory ist bei uns kein Upsell, sondern Kernfunktion. Wie RAM in einem
          Computer: Es gehört dazu. Details findest du auf der{" "}
          <Link href="/pricing" className="text-[#000088] hover:underline">
            Pricing-Seite
          </Link>
          .
        </p>

        {/* ====== 8. Was du jetzt tun kannst ====== */}
        <h2>Was du jetzt tun kannst</h2>
        <p>
          Du hast drei Optionen:
        </p>
        <ol>
          <li>
            <strong>Weitermachen wie bisher.</strong> Jeden Morgen deinem Assistenten
            erklären, wer du bist. Kontext kopieren, einfügen, hoffen. Das
            funktioniert — bis dein Business zu komplex wird für Copy-Paste.
          </li>
          <li>
            <strong>Selber bauen.</strong> RAG-Pipeline aufsetzen, Vektor-Datenbank
            konfigurieren, Memory-Layer implementieren. Wenn du ein technisches
            Team hast und 3-6 Monate Zeit, ist das eine Option. Unsere{" "}
            <Link
              href="/compare/crewai"
              className="text-[#000088] hover:underline"
            >
              Framework-Vergleiche
            </Link>{" "}
            helfen dir bei der Tool-Wahl.
          </li>
          <li>
            <strong>Ein System nutzen, das Gedächtnis eingebaut hat.</strong>{" "}
            KaderOS wurde genau dafür gebaut. Nicht als Chat-Tool mit
            Memory-Feature. Als AI-Betriebssystem, bei dem Gedächtnis ab Tag eins
            funktioniert.
          </li>
        </ol>
        <p>
          Das Context-Window-Problem wird nicht von allein verschwinden. Ja, die
          Fenster werden grösser — aber dein Business wächst auch. Und selbst mit
          einem 1-Million-Token-Window bleibt das Grundproblem: Ohne echtes
          Gedächtnis ist jede Session isoliert. Ohne Chronologie, ohne
          Verknüpfungen, ohne Lerneffekt.
        </p>
        <p>
          Die AI-Assistenten der Zukunft werden nicht an ihren Antworten gemessen.
          Sie werden daran gemessen, wie gut sie sich erinnern. Wie gut sie
          Zusammenhänge verstehen. Wie gut sie aus der Vergangenheit lernen.
        </p>
        <p>
          Dein KI-Assistent vergisst alles? Das muss nicht so bleiben.
        </p>

        {/* ====== Weiterlesen ====== */}
        <div className="mt-12 p-6 rounded-2xl bg-[#F5F5F7]">
          <h3 className="text-[16px] font-bold mb-3">Weiterlesen</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/blog/agent-memory"
                className="text-[14px] text-[#000088] hover:underline"
              >
                Agent Memory: Warum dein AI-Team ein Gehirn braucht
              </Link>
            </li>
            <li>
              <Link
                href="/blog/pgvector-vs-pinecone"
                className="text-[14px] text-[#000088] hover:underline"
              >
                pgvector vs. Pinecone für Agent Memory
              </Link>
            </li>
            <li>
              <Link
                href="/features"
                className="text-[14px] text-[#000088] hover:underline"
              >
                Alle KaderOS Features im Überblick
              </Link>
            </li>
          </ul>
        </div>

        {/* ====== CTA ====== */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#000088]/5 to-white border border-[#000088]/10">
          <h3 className="text-[20px] font-bold text-[#1D1D1F] mb-3">
            Teste KaderOS gratis
          </h3>
          <p className="text-[15px] text-[#6E6E73] mb-5">
            Ab CHF 5/Monat. 7 Schichten Gedächtnis. Dream Cycle inklusive.
            Dein Agent vergisst nie wieder.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-[#000088] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#2D2F9E] transition-colors"
          >
            Kostenlos starten
          </Link>
        </div>
      </div>
    </article>
  );
}
