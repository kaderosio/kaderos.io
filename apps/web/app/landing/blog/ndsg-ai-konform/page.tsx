import Link from "next/link";

export const metadata = {
  title: "nDSG und AI: So setzt du KI datenschutzkonform ein | KaderOS",
  description:
    "Das neue Schweizer Datenschutzgesetz gilt auch für AI Agents. Hier erfährst du, worauf du achten musst — konkret und ohne Juristendeutsch.",
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Blog
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          nDSG und AI: So setzt du KI datenschutzkonform ein
        </h1>
        <div className="text-[14px] text-[#86868B]">
          5. April 2026 · 8 min Lesezeit
        </div>
      </div>
      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <p>
          Seit dem 1. September 2023 gilt das neue Datenschutzgesetz in der Schweiz. Das nDSG. Und es betrifft jedes Unternehmen, das Personendaten verarbeitet. Also auch dich, wenn du AI Agents einsetzt.
        </p>
        <p>
          Das Problem: Die meisten AI-Tools wurden nicht für die Schweiz gebaut. Sie sitzen in den USA. Sie speichern Daten auf US-Servern. Sie haben keine Ahnung, was das nDSG ist. Und du bist trotzdem verantwortlich.
        </p>
        <p>
          Hier ist, was du wissen musst. Ohne Juristendeutsch. Aber mit konkreten Handlungsempfehlungen.
        </p>

        <h2>Was das nDSG für AI bedeutet</h2>
        <p>
          Das nDSG regelt den Umgang mit Personendaten. Also alle Daten, die sich auf eine bestimmte oder bestimmbare Person beziehen. Namen, E-Mail-Adressen, Telefonnummern, aber auch IP-Adressen, Kaufhistorien und Verhaltensdaten.
        </p>
        <p>
          Wenn dein AI Agent mit solchen Daten arbeitet — und das tut er fast immer — dann gelten die Regeln des nDSG. Das heisst:
        </p>
        <ul>
          <li><strong>Transparenz:</strong> Du musst offenlegen, dass du AI einsetzt und welche Daten verarbeitet werden.</li>
          <li><strong>Zweckbindung:</strong> Daten dürfen nur für den Zweck verwendet werden, für den sie erhoben wurden.</li>
          <li><strong>Datensparsamkeit:</strong> Nur die Daten erheben, die wirklich nötig sind.</li>
          <li><strong>Sicherheit:</strong> Angemessene technische und organisatorische Massnahmen zum Schutz der Daten.</li>
          <li><strong>Auskunftsrecht:</strong> Betroffene Personen können jederzeit Auskunft verlangen, welche Daten über sie gespeichert sind.</li>
        </ul>

        <h2>Die grössten Risiken beim AI-Einsatz</h2>

        <h3>1. Datenabfluss an US-Server</h3>
        <p>
          Wenn du ChatGPT, Claude oder ein anderes AI-Modell über die Standard-API nutzt, fliessen deine Daten in die USA. Das ist unter dem nDSG problematisch. Die USA gelten nicht als Land mit angemessenem Datenschutzniveau.
        </p>
        <p>
          Du brauchst entweder eine vertragliche Grundlage (Standardvertragsklauseln) oder du stellst sicher, dass keine Personendaten an die API gesendet werden. In der Praxis ist Letzteres oft schwierig.
        </p>

        <h3>2. Training auf deinen Daten</h3>
        <p>
          Einige AI-Anbieter nutzen die Daten, die du ihnen sendest, um ihre Modelle zu trainieren. Das heisst: Die Kundendaten deines KMU landen im Trainingsset eines globalen Modells. Das ist nicht nur ein Datenschutzproblem, sondern auch ein Geschäftsgeheimnis-Problem.
        </p>
        <p>
          Prüfe bei jedem Anbieter die Data Processing Terms. Opt-out-Möglichkeiten sind nicht immer Standard.
        </p>

        <h3>3. Automatisierte Einzelentscheidungen</h3>
        <p>
          Wenn dein AI Agent Entscheidungen trifft, die eine Person betreffen — zum Beispiel ein Kreditantrag wird abgelehnt oder eine Bewerbung aussortiert — dann greift Artikel 21 des nDSG. Die betroffene Person hat das Recht, eine menschliche Überprüfung zu verlangen.
        </p>
        <p>
          In der Praxis bedeutet das: Du brauchst einen Human-in-the-Loop für sensible Entscheidungen. Kein Agent darf über Menschen entscheiden, ohne dass ein Mensch die Möglichkeit hat einzugreifen.
        </p>

        <h3>4. Fehlende Dokumentation</h3>
        <p>
          Das nDSG verlangt ein Verzeichnis der Bearbeitungstätigkeiten. Deine AI Agents müssen darin aufgeführt sein. Welche Daten verarbeiten sie? Wozu? Wie lange werden die Daten gespeichert? Wer hat Zugang?
        </p>
        <p>
          Die meisten KMU haben das nicht dokumentiert. Und das ist ein Compliance-Risiko, das bei einer Prüfung teuer werden kann.
        </p>

        <h2>So setzt du AI nDSG-konform ein: 7 konkrete Massnahmen</h2>

        <h3>1. Datenkategorien definieren</h3>
        <p>
          Bevor du einen Agent einsetzt, definiere klar: Welche Daten sieht er? Teile Daten in Kategorien ein: öffentlich, intern, vertraulich, Personendaten. Agents sollten nur Zugang zu den Kategorien haben, die sie für ihre Aufgabe brauchen.
        </p>

        <h3>2. Lokale Verarbeitung bevorzugen</h3>
        <p>
          Wenn möglich, nutze AI-Modelle, die lokal laufen oder auf europäischen Servern gehostet werden. Für viele Aufgaben reichen Open-Source-Modelle, die du selbst hosten kannst. Für komplexere Aufgaben gibt es mittlerweile Anbieter mit Hosting in der EU oder der Schweiz.
        </p>

        <h3>3. Anonymisierung und Pseudonymisierung</h3>
        <p>
          Bevor Daten an einen AI Agent gehen, entferne oder ersetze Personendaten. Statt &quot;Hans Müller, hans@example.com&quot; wird &quot;Kunde A, ID 12345&quot;. Das reduziert das Risiko massiv und ist oft technisch mit wenig Aufwand umsetzbar.
        </p>

        <h3>4. Verträge mit Auftragsbearbeitern</h3>
        <p>
          Wenn du einen AI-Dienst nutzt, der Daten in deinem Auftrag verarbeitet, brauchst du einen Auftragsbearbeitungsvertrag (ABV). Das ist Pflicht unter dem nDSG. Prüfe, ob dein Anbieter einen solchen Vertrag anbietet.
        </p>

        <h3>5. Transparenz gegenüber Betroffenen</h3>
        <p>
          Informiere deine Kunden und Mitarbeiter, dass du AI einsetzt. Das muss nicht kompliziert sein. Ein Abschnitt in deiner Datenschutzerklärung reicht oft. Aber er muss da sein.
        </p>

        <h3>6. Logging und Audit Trail</h3>
        <p>
          Dokumentiere, was deine Agents tun. Welche Daten sie verarbeiten. Welche Entscheidungen sie treffen. Das ist nicht nur für Compliance wichtig, sondern auch für dich — damit du verstehst, was in deinem AI-Team passiert.
        </p>

        <h3>7. Regelmässige Überprüfung</h3>
        <p>
          Datenschutz ist kein Einmal-Projekt. Überprüfe vierteljährlich: Welche Agents laufen? Welche Daten verarbeiten sie? Gibt es neue Risiken? Hat sich die Rechtslage geändert?
        </p>

        <h2>DSGVO vs. nDSG: Was ist der Unterschied?</h2>
        <p>
          Wenn du auch Kunden in der EU hast, musst du zusätzlich die DSGVO beachten. Die gute Nachricht: Das nDSG ist stark an die DSGVO angelehnt. Wer nDSG-konform ist, hat die DSGVO-Konformität fast geschafft.
        </p>
        <p>
          Die wichtigsten Unterschiede: Das nDSG hat keine Pflicht zur Benennung eines Datenschutzbeauftragten für KMU. Die Bussgelder sind anders strukturiert (bis CHF 250&apos;000, persönlich). Und die Meldepflicht bei Datenpannen ist etwas anders geregelt.
        </p>

        <h2>Was KaderOS anders macht</h2>
        <p>
          Wir bauen KaderOS mit Datenschutz als Grundprinzip. Nicht als Feature, das man nachträglich draufklebt.
        </p>
        <ul>
          <li><strong>Datenklassifikation:</strong> Jeder Agent weiss, welche Datenkategorien er verarbeiten darf.</li>
          <li><strong>Audit Log:</strong> Jede Aktion wird dokumentiert. Für dich und für den Regulator.</li>
          <li><strong>Confidence Gates:</strong> Sensible Entscheidungen werden automatisch eskaliert.</li>
          <li><strong>Schweizer Kontext:</strong> Unsere Agents kennen das nDSG und handeln danach.</li>
        </ul>

        <h2>Fazit</h2>
        <p>
          AI und Datenschutz schliessen sich nicht aus. Aber du musst wissen, worauf du achten musst. Das nDSG ist streng, aber fair. Es verlangt Transparenz, Kontrolle und Dokumentation. Genau das, was du bei AI Agents sowieso haben solltest.
        </p>
        <p>
          Wer jetzt sauber aufsetzt, hat später keine Probleme. Wer es ignoriert, riskiert Bussen und Vertrauensverlust. Die Wahl ist klar.
        </p>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#000088]/5 to-white border border-[#000088]/10">
          <h3 className="text-[20px] font-bold text-[#1D1D1F] mb-3">
            AI Agents, die das nDSG verstehen
          </h3>
          <p className="text-[15px] text-[#6E6E73] mb-5">
            KaderOS baut Datenschutz in jede Agent-Interaktion ein. Audit Logs,
            Confidence Gates und Schweizer Rechtskontext — von Anfang an.
          </p>
          <Link
            href="/landing"
            className="inline-flex items-center gap-2 bg-[#000088] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#2D2F9E] transition-colors"
          >
            Auf die Waitlist
          </Link>
        </div>
      </div>
    </article>
  );
}
