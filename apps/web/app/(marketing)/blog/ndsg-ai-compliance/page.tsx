import Link from "next/link";

export const metadata = {
  title: "nDSG und AI: Was du wissen musst",
  description:
    "Das Schweizer Datenschutzgesetz gilt auch für AI Agents. So stellst du sicher, dass dein AI-Team compliant ist.",
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Blog
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          nDSG und AI: Was du wissen musst
        </h1>
        <div className="text-[14px] text-[#86868B]">
          5. April 2026 · 7 min Lesezeit
        </div>
      </div>
      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <p>
          Seit dem 1. September 2023 gilt das revidierte Schweizer Datenschutzgesetz (nDSG). Es betrifft jedes Unternehmen, das Personendaten verarbeitet — auch wenn AI Agents die Verarbeitung übernehmen. Gerade dann.
        </p>
        <p>
          Viele Unternehmen setzen AI ein, ohne sich bewusst zu sein, dass ihre Agents Personendaten verarbeiten. Ein Agent, der E-Mails beantwortet, verarbeitet Namen und Adressen. Ein Agent, der Rechnungen erstellt, verarbeitet Kundendaten. Ein Agent, der Bewerbungen screent, verarbeitet besonders schützenswerte Daten.
        </p>

        <h2>Was das nDSG von dir verlangt</h2>
        <h3>Informationspflicht</h3>
        <p>
          Du musst betroffene Personen informieren, wenn ihre Daten verarbeitet werden — auch durch AI Agents. Das bedeutet: Wenn dein Support-Agent eine Kundenanfrage bearbeitet, muss der Kunde wissen, dass AI im Spiel ist. Transparenz ist nicht optional.
        </p>

        <h3>Zweckbindung</h3>
        <p>
          Daten dürfen nur für den Zweck verwendet werden, für den sie erhoben wurden. Wenn ein Kunde dir seine E-Mail für eine Bestellung gibt, darf dein Marketing-Agent sie nicht automatisch in den Newsletter aufnehmen. Ohne explizite Einwilligung.
        </p>

        <h3>Datensicherheit</h3>
        <p>
          Du bist verantwortlich für die Sicherheit der Daten — auch wenn ein AI Agent sie verarbeitet. Das heisst: Verschlüsselung, Zugriffskontrollen, Audit Logs. Nicht irgendwann. Ab Tag 1.
        </p>

        <h3>Recht auf Auskunft und Löschung</h3>
        <p>
          Jede Person kann verlangen zu erfahren, welche Daten über sie gespeichert sind. Und sie kann deren Löschung verlangen. Dein AI-System muss das ermöglichen. Automatisch und nachvollziehbar.
        </p>

        <h2>Warum die meisten AI-Plattformen durchfallen</h2>
        <p>
          Die Mehrheit der AI-Tools auf dem Markt wurde in den USA entwickelt. GDPR-Compliance? Vielleicht. nDSG-Compliance? Fehlanzeige. Die Unterschiede sind subtil, aber relevant:
        </p>
        <p>
          <strong>Datenexport:</strong> Viele Plattformen speichern Daten auf US-Servern. Das nDSG stellt strenge Anforderungen an die Übermittlung ins Ausland. Ohne angemessenes Datenschutzniveau im Zielland brauchst du Standardvertragsklauseln oder eine explizite Einwilligung.
        </p>
        <p>
          <strong>Profiling:</strong> Das nDSG reguliert automatisierte Einzelentscheidungen strenger als die GDPR. Wenn dein Agent Bonitätseinschätzungen oder Risikobeurteilungen macht, brauchst du spezifische Schutzmassnahmen.
        </p>

        <h2>Wie KaderOS Compliance einbaut</h2>
        <p>
          <strong>Lokale Datenhaltung:</strong> Deine Daten verlassen nie deine Maschine. Kein US-Cloud-Provider. Kein Datenexport.
        </p>
        <p>
          <strong>Automatische Dokumentation:</strong> Jeder Agent protokolliert, welche Daten er verarbeitet. Du hast jederzeit ein aktuelles Verarbeitungsverzeichnis.
        </p>
        <p>
          <strong>Confidence Gates:</strong> Bei sensiblen Daten eskaliert der Agent automatisch. Keine autonome Verarbeitung von besonders schützenswerten Daten ohne deine Freigabe.
        </p>
        <p>
          <strong>Lösch-Workflows:</strong> Auf Knopfdruck werden alle Daten einer Person aus dem System entfernt. Über alle Agents hinweg.
        </p>

        <h2>Praktische Checkliste</h2>
        <p>
          <strong>1.</strong> Erstelle ein Verarbeitungsverzeichnis für jeden Agent. Welche Daten? Welcher Zweck? Wie lange gespeichert?
        </p>
        <p>
          <strong>2.</strong> Informiere Kunden und Partner, dass AI-Agents eingesetzt werden. Am besten in deiner Datenschutzerklärung.
        </p>
        <p>
          <strong>3.</strong> Implementiere Lösch-Workflows. Ein Kunde verlangt Löschung? In 30 Tagen muss alles weg sein.
        </p>
        <p>
          <strong>4.</strong> Prüfe regelmässig, ob deine Agents nur die Daten verarbeiten, die sie brauchen. Datenminimierung ist Pflicht.
        </p>
        <p>
          <strong>5.</strong> Nutze lokale Datenhaltung. Je weniger Daten das Haus verlassen, desto weniger Risiko.
        </p>

        <h2>Fazit</h2>
        <p>
          Das nDSG ist kein Hindernis für AI. Es ist ein Qualitätsmerkmal. Unternehmen, die AI datenschutzkonform einsetzen, bauen Vertrauen auf. Bei Kunden, Partnern und dem EDÖB. Und mit KaderOS ist Compliance kein Aufwand, sondern ein Feature.
        </p>


        <div className="mt-12 p-6 rounded-2xl bg-[#F5F5F7]">
          <h3 className="text-[16px] font-bold mb-3">Weiterlesen</h3>
          <ul className="space-y-2">
            <li><Link href="/blog/ndsg-ai-konform" className="text-[14px] text-[#000088] hover:underline">nDSG und AI: So setzt du KI datenschutzkonform ein</Link></li>
            <li><Link href="/blog/ndsg-ai-schweiz" className="text-[14px] text-[#000088] hover:underline">nDSG und AI: Was Schweizer Firmen wissen müssen</Link></li>
            <li><Link href="/blog/ai-governance-kmu" className="text-[14px] text-[#000088] hover:underline">AI Governance für KMU: Regeln ohne Bürokratie</Link></li>
          </ul>
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#000088]/5 to-white border border-[#000088]/10">
          <h3 className="text-[20px] font-bold text-[#1D1D1F] mb-3">
            nDSG-konforme AI Agents
          </h3>
          <p className="text-[15px] text-[#6E6E73] mb-5">
            KaderOS: Lokal. Dokumentiert. Compliant. Ab CHF 0.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#000088] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#2D2F9E] transition-colors"
          >
            Auf die Waitlist
          </Link>
        </div>
      </div>
    </article>
  );
}
