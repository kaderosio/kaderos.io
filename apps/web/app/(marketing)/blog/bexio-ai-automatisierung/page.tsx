import Link from "next/link";

export const metadata = {
  title: "Bexio + AI: Buchhaltung automatisieren",
  description:
    "80'000 Schweizer KMUs nutzen Bexio. Fast keines nutzt AI dafür. So automatisierst du Rechnungen, Mahnwesen und Cashflow mit KaderOS.",
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="text-[12px] text-[#000088] font-semibold uppercase tracking-widest mb-3">
          Blog
        </div>
        <h1 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-4">
          Bexio + AI: Buchhaltung automatisieren
        </h1>
        <div className="text-[14px] text-[#86868B]">
          6. April 2026 · 4 min Lesezeit
        </div>
      </div>
      <div className="prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#6E6E73] [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[#6E6E73] [&_strong]:text-[#1D1D1F]">
        <p>
          80&apos;000 Schweizer KMUs nutzen Bexio. Für Rechnungen, Buchhaltung, Kontakte. Jeden Tag.
        </p>
        <p>
          Und fast keines davon nutzt AI dafür.
        </p>
        <p>
          Das ist kein Vorwurf. Bexio funktioniert. Es macht, was es soll. Aber es macht nur das, was du ihm sagst. Kein Bexio der Welt ruft dich an und sagt: &quot;Hey, dein Cashflow wird in drei Wochen eng.&quot; Kein Bexio schickt proaktiv eine Mahnung, priorisiert nach Zahlungshistorie und schreibt den Ton passend zum Kunden.
        </p>
        <p>
          Das ändert sich. Nicht irgendwann. Jetzt.
        </p>

        <h2>Was Bexio kann — und wo es aufhört</h2>
        <p>
          Bexio ist gut. Für das, was es ist. Eine Buchhaltungssoftware.
        </p>
        <p>
          Du erstellst Rechnungen. Du verbuchst Ausgaben. Du verwaltest Kontakte. Du exportierst für den Treuhänder. Das läuft. Seit Jahren.
        </p>
        <p>
          Aber Bexio ist reaktiv. Du gibst Befehle. Bexio führt aus. Ende.
        </p>
        <p>Was Bexio nicht macht:</p>
        <ul>
          <li><strong>Keine Analyse.</strong> Bexio zeigt dir Zahlen. Aber es sagt dir nicht, was sie bedeuten.</li>
          <li><strong>Keine Vorhersagen.</strong> Du siehst den Kontostand von heute. Nicht den von nächstem Monat.</li>
          <li><strong>Keine Automatisierung.</strong> Jede Rechnung, jede Mahnung, jedes Follow-up — manuell.</li>
          <li><strong>Kein Kontext.</strong> Bexio weiss nicht, dass Kunde X immer 14 Tage zu spät zahlt. Oder dass Projekt Y über Budget läuft.</li>
        </ul>
        <p>
          Für ein Einzelunternehmen reicht das. Für ein wachsendes KMU mit 5, 10, 20 Kunden wird es zum Flaschenhals.
        </p>

        <h2>Was AI drauflegen kann</h2>
        <p>
          Stell dir vor, dein Buchhaltungssystem denkt mit. Nicht in fünf Jahren. Heute.
        </p>

        <h3>Automatische Rechnungserstellung</h3>
        <p>
          Dein Projekt ist abgeschlossen. Die Stunden sind erfasst. AI erkennt das, erstellt die Rechnung basierend auf Projektdaten, passt den Betrag an und legt sie dir zur Freigabe vor. Du klickst einmal. Fertig.
        </p>
        <p>
          Keine vergessenen Rechnungen mehr. Keine manuellen Berechnungen. Kein Copy-Paste aus der Zeiterfassung.
        </p>

        <h3>Mahnwesen mit intelligenter Priorisierung</h3>
        <p>
          Nicht jede offene Rechnung ist gleich dringend. AI kennt die Zahlungshistorie jedes Kunden. Kunde A zahlt immer pünktlich — die offene Rechnung von gestern ist kein Problem. Kunde B hat drei offene Rechnungen und zahlt im Schnitt 23 Tage zu spät. Der kriegt die Mahnung sofort.
        </p>
        <p>
          Der Ton? Angepasst. Automatisch. Freundlich beim ersten Mal, bestimmt beim dritten.
        </p>

        <h3>Cashflow-Vorhersagen</h3>
        <p>
          &quot;Können wir uns diesen neuen Mitarbeiter leisten?&quot; — Die Frage, die jedes KMU beschäftigt. AI rechnet nicht nur mit dem heutigen Kontostand. Sondern mit erwarteten Zahlungseingängen, wiederkehrenden Kosten, saisonalen Schwankungen und offenen Offerten.
        </p>
        <p>
          Du bekommst nicht eine Zahl. Du bekommst drei Szenarien: Best Case, Worst Case, wahrscheinlich.
        </p>

        <h3>Kontaktpflege mit automatischen Follow-ups</h3>
        <p>
          Kunde hat vor 6 Monaten angefragt, aber nie bestellt? AI erinnert sich. Und schlägt dir ein Follow-up vor. Mit Kontext: Was wurde besprochen? Was war der letzte Kontaktpunkt? Was könnte relevant sein?
        </p>
        <p>
          Kein Kontakt geht verloren. Ohne dass du eine Excel-Liste pflegen musst.
        </p>

        <h2>KaderOS + Bexio: Die Vision</h2>
        <p>
          Jetzt wird es konkret. Und ehrlich.
        </p>
        <p>
          <strong>Die Bexio-Integration ist noch nicht live.</strong> Sie kommt. Aber sie ist noch nicht da. Das hier ist kein Fake-Launch. Das ist ein Teaser für das, was wir bauen.
        </p>
        <p>So wird es funktionieren:</p>
        <p>
          Dein <strong>Finanz-Kader</strong> in KaderOS verbindet sich mit deiner Bexio-Instanz. Über die offizielle Bexio API. Lokal. Deine Daten bleiben bei dir.
        </p>
        <p>Was dein Finanz-Kader dann kann:</p>
        <ul>
          <li><strong>Bexio-Daten lesen.</strong> Offene Rechnungen, Kontakte, Kontostand, Ausgaben.</li>
          <li><strong>Reports erstellen.</strong> Wöchentlicher Finanzbericht, automatisch, in deinem Slack oder per Mail.</li>
          <li><strong>Warnen bei Budgetüberschreitung.</strong> Projekt läuft über 80% des Budgets? Dein Kader meldet sich. Sofort. Ohne dass du nachschauen musst.</li>
          <li><strong>Mahnungen vorbereiten.</strong> Priorisiert, mit Kontext, zur Freigabe bereit.</li>
          <li><strong>Cashflow modellieren.</strong> Basierend auf echten Bexio-Daten. Nicht auf Bauchgefühl.</li>
        </ul>
        <p>
          Das Kader arbeitet autonom. Es fragt nicht jeden Tag nach. Es handelt nach deinen Regeln. Und es meldet sich nur, wenn es wichtig ist.
        </p>
        <p>
          <strong>Swiss Made.</strong> Deine Daten bleiben in der Schweiz. nDSG-konform. Kein US-Cloud-Anbieter in der Mitte.
        </p>

        <h2>Was du heute schon machen kannst</h2>
        <p>
          Die direkte Bexio-API-Anbindung kommt. Bis dahin gibt es einen Workaround. Nicht elegant. Aber funktional.
        </p>

        <h3>Der manuelle Weg:</h3>
        <ol className="list-decimal pl-6 space-y-4">
          <li><strong>Export aus Bexio.</strong> Offene Rechnungen, Kundenliste, Kontobewegungen — als CSV oder Excel.</li>
          <li><strong>Upload in die KaderOS Knowledge Base.</strong> Dein Kader hat jetzt Zugriff auf die Daten.</li>
          <li><strong>Fragen stellen.</strong> &quot;Welche Rechnungen sind seit mehr als 30 Tagen offen?&quot; — &quot;Wie sieht mein Cashflow für die nächsten 8 Wochen aus?&quot; — &quot;Welcher Kunde hat das höchste unbezahlte Volumen?&quot;</li>
          <li><strong>Handeln.</strong> Basierend auf den Antworten deines Kaders.</li>
        </ol>
        <p>
          Ja, der Export ist manuell. Ja, die Daten sind nicht in Echtzeit. Aber du bekommst trotzdem Analysen, die du von Bexio allein nie kriegst. In Sekunden statt Stunden.
        </p>
        <p>
          Und sobald die API-Integration steht, fällt Schritt 1 und 2 weg. Dann läuft alles autonom.
        </p>

        <h2>Warum das für dein KMU relevant ist</h2>
        <p>
          Schweizer KMUs verbrennen im Schnitt 8-12 Stunden pro Monat mit Buchhaltungs-Admin. Rechnungen schreiben, Mahnungen verschicken, Reports zusammenbauen, dem Treuhänder Daten liefern.
        </p>
        <p>
          Das sind 100+ Stunden pro Jahr. Für Arbeit, die kein Geld bringt. Die niemand gerne macht. Und die trotzdem kritisch ist.
        </p>
        <p>
          AI ersetzt nicht deine Buchhaltung. AI ersetzt die Handarbeit drum herum. Den Kontext. Die Analyse. Die Erinnerung. Die Priorisierung.
        </p>
        <p>
          Du machst immer noch die Entscheidungen. Aber du hast ein Kader, das dir die Arbeit abnimmt, die davor kommt.
        </p>

        <h2>Die Zukunft gehört dem autonomen Finanzteam</h2>
        <p>
          Bexio bleibt dein System of Record. Das ändert sich nicht. Aber KaderOS wird die Schicht darüber. Die Schicht, die denkt.
        </p>
        <p>
          Nicht weil Bexio schlecht ist. Sondern weil Bexio ein Tool ist. Und ein Tool braucht jemanden, der es bedient. Dein Kader bedient es für dich.
        </p>
        <p>
          Autonom. Lokal. In CHF.
        </p>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#000088]/5 to-white border border-[#000088]/10">
          <h3 className="text-[20px] font-bold text-[#1D1D1F] mb-3">
            Willst du dabei sein, wenn die Bexio-Integration live geht?
          </h3>
          <p className="text-[15px] text-[#6E6E73] mb-5">
            Sicher dir deinen Platz. Die Warteliste ist offen.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#000088] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#2D2F9E] transition-colors"
          >
            Platz sichern
          </Link>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-[#E5E5E7]">
        <Link href="/blog" className="text-[#000088] text-[14px] font-medium hover:underline">
          ← Alle Artikel
        </Link>
      </div>
    </article>
  );
}
