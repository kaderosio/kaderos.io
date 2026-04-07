import type { AITeamPage } from "./data";

// ─── CFO Pages ────────────────────────────────────────────────

const cfoTreuhand: AITeamPage = {
  slug: "cfo-fuer-treuhand",
  rolle: "cfo", rolleLabel: "CFO", branche: "treuhand", brancheLabel: "Treuhand",
  metaTitle: "AI CFO für Treuhand — Finanzsteuerung für Treuhandbüros | KaderOS",
  metaDescription: "AI CFO für Treuhandbüros: Mandanten-Profitabilität, Liquiditätsplanung und Pricing-Optimierung. Zahlen, die Entscheidungen treiben.",
  h1: "AI CFO für Treuhand — KaderOS",
  intro: "Treuhänder verwalten die Finanzen ihrer Mandanten — aber wer verwaltet die eigenen? Viele Treuhandbüros haben keinen Überblick über Mandanten-Profitabilität, Auslastung und Pricing. Ein AI CFO von KaderOS bringt die finanzielle Steuerung, die dein Büro für profitables Wachstum braucht.",
  challenges: [
    { title: "Mandanten-Profitabilität ist ein Blindflug", text: "Welcher Mandant bringt Geld, welcher kostet dich? Die meisten Treuhandbüros können diese Frage nicht beantworten. Stundensätze sind historisch gewachsen, Scope Creep ist die Norm, und am Ende des Jahres ist die Marge knapper als gedacht." },
    { title: "Liquiditätsplanung auf Zuruf", text: "MWST-Zahlungen, AHV-Beiträge, Löhne — die Ausgaben sind planbar, aber der Zahlungseingang der Mandanten weniger. Viele Büros fahren auf Sicht statt mit einer soliden Liquiditätsplanung. Das funktioniert — bis es nicht mehr funktioniert." },
    { title: "Pricing bleibt beim Stundensatz", text: "Stundensatz-basierte Abrechnungen bestrafen Effizienz: Je schneller du arbeitest, desto weniger verdienst du. Wertbasierte Pricing-Modelle wären sinnvoller, aber ohne Datengrundlage traut sich niemand an die Umstellung." },
  ],
  solutions: [
    { title: "Mandanten-Profitabilitäts-Dashboard", text: "Dein AI CFO analysiert jeden Mandanten: Umsatz, Zeitaufwand, Sonderwünsche, Zahlungsverhalten. Du siehst auf einen Blick, welche Mandanten profitabel sind und wo nachverhandelt werden muss." },
    { title: "Rolling Forecast statt Jahresbudget", text: "Der AI CFO erstellt einen rollierenden 12-Monats-Forecast, der sich automatisch an aktuelle Daten anpasst. Liquiditätsengpässe erkennst du Monate im Voraus — nicht erst, wenn das Konto leer ist." },
    { title: "Pricing-Analyse und Modellierung", text: "Datenbasierte Analyse deiner Pricing-Struktur: Welche Leistungen sind unterpreist? Wo gibt es Pauschal-Potenzial? Der AI CFO modelliert verschiedene Szenarien und zeigt den Impact auf deine Marge." },
  ],
  useCases: [
    { title: "Mandantensegmentierung nach Profitabilität", text: "Analyse von 120 Mandanten nach Profitabilität. Ergebnis: 15% der Mandanten verursachten 40% des Aufwands bei nur 8% des Umsatzes. Durch Nachverhandlung und selektive Kündigung stieg die Gesamtmarge um 12 Prozentpunkte." },
    { title: "Cash-Flow-Prognose mit Saisonalität", text: "Aufbau einer Liquiditätsplanung, die saisonale Muster berücksichtigt: Jahresabschluss-Rush, MWST-Quartale, Ferienmonate. Kein überraschender Engpass mehr, optimiertes Working Capital." },
    { title: "Umstellung auf Pauschal-Pricing", text: "Schrittweise Umstellung von Stundensatz auf Pauschalen für Standardleistungen. Der AI CFO hat die Kosten pro Leistungsart analysiert, Pauschalen kalkuliert und den Rollout geplant. Umsatz pro Mandant: +18%, bei weniger Zeitaufwand." },
  ],
  whyKaderOS: "Treuhänder beraten ihre Mandanten finanziell — aber für die eigene Firma fehlt oft der Blick von aussen. KaderOS liefert genau diesen Blick: datengetriebene Finanzsteuerung, die auf die Besonderheiten der Treuhandbranche zugeschnitten ist. Saisonalität, Mandantenstruktur, regulatorischer Aufwand — alles fliesst ein.",
  faqs: [
    { question: "Kann der AI CFO auch bei der Unternehmensbewertung helfen?", answer: "Ja. Ob für einen Verkauf, eine Nachfolgeregelung oder eine Partneraufnahme — der AI CFO kann eine indikative Unternehmensbewertung erstellen, basierend auf Umsatz, Mandantenstruktur und Profitabilität." },
    { question: "Integriert sich der AI CFO mit meiner Buchhaltungssoftware?", answer: "KaderOS kann Daten aus Abacus, Bexio, Sage und weiteren Schweizer Buchhaltungslösungen importieren. Der AI CFO analysiert deine echten Zahlen — keine Schätzungen." },
    { question: "Was kostet der AI CFO im Vergleich zu einem Teilzeit-CFO?", answer: "Ein Teilzeit-CFO kostet CHF 2'000-5'000 pro Monat. KaderOS liefert vergleichbare Analysen ab CHF 299/Monat. Und er ist immer verfügbar, nicht nur dienstags." },
  ],
  ctaText: "AI CFO für dein Treuhand-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-treuhand", "cmo-fuer-treuhand", "sales-lead-fuer-treuhand", "content-lead-fuer-treuhand"],
  relatedBranchen: ["cfo-fuer-beratung", "cfo-fuer-handel", "cfo-fuer-immobilien"],
};

const cfoImmobilien: AITeamPage = {
  slug: "cfo-fuer-immobilien",
  rolle: "cfo", rolleLabel: "CFO", branche: "immobilien", brancheLabel: "Immobilien",
  metaTitle: "AI CFO für Immobilien — Rendite-Optimierung und Portfoliosteuerung | KaderOS",
  metaDescription: "AI CFO für Immobilien: Portfolio-Renditeanalyse, Investitionsplanung und Cashflow-Management. Datengetriebene Entscheidungen.",
  h1: "AI CFO für Immobilien — KaderOS",
  intro: "Immobilien sind Kapitalintensiv. Jede Kauf-, Sanierungs- oder Verkaufsentscheidung hat langfristige finanzielle Auswirkungen. Ein AI CFO von KaderOS gibt dir die finanzielle Steuerung, die dein Portfolio verdient — mit Echtzeitdaten statt Bauchgefühl.",
  challenges: [
    { title: "Portfolio-Rendite im Blindflug", text: "Welches Objekt bringt welche Rendite? Brutto, netto, nach Sanierung? Viele Immobilienunternehmen können das nicht objekt-genau beantworten. Entscheidungen basieren auf Erfahrungswerten statt auf Daten." },
    { title: "Investitionsentscheidungen ohne Modell", text: "Kaufen, sanieren oder verkaufen? Diese Fragen brauchen Finanzmodelle — DCF-Analysen, Sensitivitätsrechnungen, Szenarioplanung. Ohne CFO-Kompetenz werden solche Entscheidungen aus dem Bauch getroffen." },
    { title: "Cashflow-Steuerung über viele Objekte", text: "Mieteinnahmen, Hypothekarzinsen, Nebenkosten, Sanierungsrückstellungen — der Cashflow über ein grösseres Portfolio zu steuern, ist komplex. Ohne automatisierte Konsolidierung fehlt der Überblick." },
  ],
  solutions: [
    { title: "Portfolio-Performance-Dashboard", text: "Dein AI CFO liefert Echtzeit-Transparenz über dein gesamtes Portfolio: Rendite pro Objekt, Leerstandskosten, Instandhaltungsquote, Mieterspiegel. Alle Kennzahlen auf einen Blick." },
    { title: "Investitionsrechnung und Szenarioplanung", text: "Für jede Kauf- oder Sanierungsentscheidung erstellt der AI CFO ein Finanzmodell: DCF, IRR, Sensitivitätsanalyse. Du siehst, wie sich verschiedene Szenarien auf deine Rendite auswirken." },
    { title: "Cashflow-Forecasting", text: "Rollierender Cashflow-Forecast über alle Objekte: Mieteinnahmen, Ausgaben, Investitionen, Finanzierung. Liquiditätsengpässe erkennst du Monate im Voraus." },
  ],
  useCases: [
    { title: "Rendite-Analyse eines 30-Objekte-Portfolios", text: "Umfassende Rendite-Analyse pro Objekt: Brutto-/Netto-Rendite, Cashflow-Yield, Wertsteigerungspotenzial. 4 Objekte identifiziert, die unter der Mindestrendite lagen. Nach Optimierung: Portfolio-Rendite +0.8 Prozentpunkte." },
    { title: "Sanierung-vs-Verkauf-Analyse", text: "Finanzmodell für ein Mehrfamilienhaus: Sanierung (CHF 1.2 Mio) vs. Verkauf. DCF-Analyse über 15 Jahre, Berücksichtigung von Steuereffekten und Mietsteigerungspotenzial. Klare Empfehlung auf Basis von Zahlen statt Gefühl." },
    { title: "Hypothekar-Strategie-Optimierung", text: "Analyse der Finanzierungsstruktur über alle Objekte. Refinanzierungsmöglichkeiten identifiziert, SARON vs. Festhypothek modelliert. Zinskosten um CHF 45'000/Jahr gesenkt." },
  ],
  whyKaderOS: "Immobilien-Finanzsteuerung braucht Branchenwissen: Referenzzinssatz, Mietzinsgestaltung, Sanierungsrückstellungen, kantonale Steueroptimierung. Unser AI CFO kennt die Schweizer Immobilien-Spezifika und liefert Analysen, die auf deinem Markt relevant sind.",
  faqs: [
    { question: "Kann der AI CFO auch bei der Immobilienbewertung helfen?", answer: "Der AI CFO erstellt Ertragswert- und DCF-Bewertungen für interne Zwecke. Für offizielle Schätzungen empfehlen wir einen zertifizierten Schätzer — der AI CFO liefert aber die Datengrundlage und Plausibilisierung." },
    { question: "Funktioniert das auch für Stockwerkeigentum?", answer: "Ja. Der AI CFO kann auch STWE-Verwaltungen unterstützen: Erneuerungsfonds-Planung, Nebenkostenoptimierung, Budgetierung der Gemeinschaftskosten." },
    { question: "Wie integriert sich das mit meiner Immobiliensoftware?", answer: "KaderOS importiert Daten aus gängigen Schweizer Immobilien-Tools wie Rimo, Quorum und ImmoTop. Dein AI CFO arbeitet mit deinen echten Zahlen." },
  ],
  ctaText: "AI CFO für dein Immobilien-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-immobilien", "cmo-fuer-immobilien", "sales-lead-fuer-immobilien", "content-lead-fuer-immobilien"],
  relatedBranchen: ["cfo-fuer-treuhand", "cfo-fuer-handel", "cfo-fuer-beratung"],
};

const cfoGastronomie: AITeamPage = {
  slug: "cfo-fuer-gastronomie",
  rolle: "cfo", rolleLabel: "CFO", branche: "gastronomie", brancheLabel: "Gastronomie",
  metaTitle: "AI CFO für Gastronomie — Kostenkontrolle und Marge optimieren | KaderOS",
  metaDescription: "AI CFO für Restaurants: Wareneinsatz senken, Personalkosten steuern und Profitabilität pro Gericht analysieren. Zahlen statt Bauchgefühl.",
  h1: "AI CFO für Gastronomie — KaderOS",
  intro: "In der Gastronomie entscheiden Prozentpunkte über Überleben. Die Marge zwischen Erfolg und Pleite ist hauchdünn: Wareneinsatz, Personalkosten, Miete, Food Waste. Ein AI CFO von KaderOS gibt dir die Kostenkontrolle, die dein Betrieb braucht — ohne dass du Betriebswirtschaft studieren musst.",
  challenges: [
    { title: "Wareneinsatz: Die grösste Unbekannte", text: "Wie hoch ist dein tatsächlicher Wareneinsatz pro Gericht? Die meisten Gastronomen kennen nur den Durchschnitt — wenn überhaupt. Schwankende Einkaufspreise, Portionsgrössen und Food Waste machen die Kalkulation zum Ratespiel." },
    { title: "Personalkosten ausser Kontrolle", text: "Personal ist der grösste Kostenblock. Aber die Planung basiert oft auf Erfahrung statt auf Daten. Überbesetzung am Dienstag, Unterbesetzung am Samstag — beides kostet. Und Überstunden-Tracking? Häufig im Nachhinein rekonstruiert." },
    { title: "Keine Transparenz über Profitabilität", text: "Ist das Mittagsmenü profitabel? Lohnt sich der Sonntagsbrunch? Wäre ein Caterings-Angebot sinnvoll? Ohne Zahlen sind diese Fragen nicht beantwortbar. Und so werden Entscheidungen nach Gefühl getroffen." },
  ],
  solutions: [
    { title: "Gericht-Level-Profitabilität", text: "Dein AI CFO kalkuliert den tatsächlichen Deckungsbeitrag pro Gericht: Einkaufspreise, Portionsgrösse, Zubereitungszeit. Du siehst, welche Gerichte Geld bringen und welche du streichen solltest." },
    { title: "Personalkosten-Optimierung", text: "Der AI CFO analysiert deine Personalkosten in Relation zu Umsatz und Auslastung. Schichtplanung wird datengetrieben: Historische Umsatzdaten, Wochentage, Events — alles fliesst ein." },
    { title: "Echtzeit-P&L für Gastrobetriebe", text: "Täglicher Überblick über Umsatz, Wareneinsatz, Personalkosten und Deckungsbeitrag. Nicht erst am Monatsende, sondern jeden Morgen. So kannst du gegensteuern, bevor der Monat gelaufen ist." },
  ],
  useCases: [
    { title: "Menükarten-Reengineering", text: "Analyse aller 45 Gerichte nach Profitabilität und Beliebtheit. 8 Gerichte gestrichen, 5 Preise angepasst, 3 neue High-Margin-Gerichte eingeführt. Ergebnis: Food Cost von 34% auf 28% gesenkt, Umsatz gehalten." },
    { title: "Break-Even-Analyse pro Service", text: "Berechnung des Break-Even-Points für Mittag, Abend und Brunch separat. Ergebnis: Sonntagsbrunch war defizitär. Nach Preisanpassung und Personaloptimierung: profitabel ab 35 Gästen." },
    { title: "Lieferanten-Vergleich und Einkaufsoptimierung", text: "Systematischer Vergleich von 5 Hauptlieferanten. Preisunterschiede von bis zu 25% bei Standardprodukten identifiziert. Durch Umschichtung und Verhandlung: Wareneinsatz-Einsparung von CHF 1'800/Monat." },
  ],
  whyKaderOS: "Gastronomie-Finanzen sind speziell: tägliche Schwankungen, verderbliche Ware, saisonale Muster, Bar-Einnahmen. KaderOS versteht diese Besonderheiten und liefert Analysen, die für deinen Betrieb relevant sind — nicht generische BWL-Weisheiten.",
  faqs: [
    { question: "Brauche ich eine spezielle Buchhaltungssoftware?", answer: "Nein. Der AI CFO arbeitet mit deinen bestehenden Daten: Kassensystem, Buchhaltung, Einkaufsbelege. Er stellt die Verbindungen her und macht die Zahlen nutzbar." },
    { question: "Wie genau ist die Gericht-Kalkulation?", answer: "So genau wie deine Rezepturen. Der AI CFO rechnet mit deinen tatsächlichen Einkaufspreisen und Portionsgrössen. Jede Preisänderung fliesst automatisch in die Kalkulation ein." },
    { question: "Kann der AI CFO auch bei der Businessplanung für ein neues Restaurant helfen?", answer: "Ja. Der AI CFO erstellt Businesspläne mit realistischen Annahmen: Standort-spezifische Umsatzprognosen, Investitionsbudget, Break-Even-Analyse, Finanzierungsplanung." },
  ],
  ctaText: "AI CFO für deinen Gastro-Betrieb aufsetzen",
  relatedRollen: ["cto-fuer-gastronomie", "cmo-fuer-gastronomie", "sales-lead-fuer-gastronomie", "content-lead-fuer-gastronomie"],
  relatedBranchen: ["cfo-fuer-handel", "cfo-fuer-handwerk", "cfo-fuer-logistik"],
};

const cfoHandel: AITeamPage = {
  slug: "cfo-fuer-handel",
  rolle: "cfo", rolleLabel: "CFO", branche: "handel", brancheLabel: "Handel",
  metaTitle: "AI CFO für Handel — Marge, Lager und Cashflow im Griff | KaderOS",
  metaDescription: "AI CFO für Handelsunternehmen: Margenanalyse, Lageroptimierung und Working-Capital-Management. Profitabler handeln.",
  h1: "AI CFO für Handel — KaderOS",
  intro: "Handel ist Marge. Wer den Überblick über Produktmargen, Lagerkosten und Working Capital verliert, verliert Geld. Ein AI CFO von KaderOS liefert die finanzielle Steuerung, die dein Handelsunternehmen profitabler macht — von der Produktkalkulation bis zur Cashflow-Prognose.",
  challenges: [
    { title: "Margen-Erosion schleichend", text: "Einkaufspreise steigen, Rabatte werden grosszügiger, Retourenquoten wachsen — die Marge erodiert schleichend. Ohne detaillierte Margenanalyse auf Produktebene merkst du es erst, wenn die Jahresrechnung kommt." },
    { title: "Lagerkapital bindet Liquidität", text: "Zu viel Lager bindet Kapital, zu wenig führt zu Lieferengpässen. Die Balance zu finden, ist ohne datengetriebene Steuerung fast unmöglich. Und Saisonware verschärft das Problem." },
    { title: "Multichannel-Profitabilität unklar", text: "Online, stationär, Marktplätze — jeder Kanal hat andere Kostenstrukturen. Aber können sie die True Profitability pro Kanal ausweisen? Die meisten Händler nicht." },
  ],
  solutions: [
    { title: "Produkt-Level-Margenanalyse", text: "Dein AI CFO analysiert die Marge auf Produktebene: Einkaufspreis, Logistikkosten, Retourenquote, Marketingkosten. Du siehst, welche Produkte Geld verdienen und welche nur Umsatz machen." },
    { title: "Working-Capital-Optimierung", text: "Der AI CFO optimiert dein Working Capital: Lagerumschlag, Zahlungsziele, Debitorenmanagement. Mehr Liquidität ohne zusätzliche Finanzierung." },
    { title: "Kanal-Profitabilitätsrechnung", text: "True-Cost-Analyse pro Vertriebskanal: inkl. Fulfillment, Retouren, Plattformgebühren, Marketing. Du siehst, welcher Kanal wirklich profitabel ist — und wo du nur Umsatz machst." },
  ],
  useCases: [
    { title: "SKU-Rationalisierung bei einem Modehändler", text: "Analyse von 3'000 SKUs nach Profitabilität und Umschlagshäufigkeit. 800 SKUs identifiziert, die weniger als 2% Marge brachten. Nach Bereinigung: Lagerwert -30%, Gesamtmarge +4 Prozentpunkte." },
    { title: "Marktplatz-vs-Eigenkanal-Analyse", text: "Vergleich der True Profitability: Galaxus (15% Gebühren, Retouren) vs. eigener Shop (Marketing, Fulfillment). Ergebnis: Eigener Shop profitabler ab 200 Bestellungen/Monat. Strategie entsprechend angepasst." },
    { title: "Saisonale Cashflow-Planung", text: "Rolling Forecast mit Saisonalität: Weihnachtseinkauf September-November (hoher Kapitalbedarf), Abverkauf Januar (Cash-Zufluss). Finanzierungslinie optimiert, Zinskosten -CHF 12'000/Jahr." },
  ],
  whyKaderOS: "Handel braucht granulare Finanzsteuerung — nicht auf Firmenebene, sondern auf Produkt- und Kanalebene. KaderOS liefert diese Granularität und versteht die Besonderheiten des Schweizer Handels: TWINT-Gebühren, Schweizer Zoll bei Importen, kantonale Steueroptimierung.",
  faqs: [
    { question: "Kann der AI CFO auch Preisstrategien modellieren?", answer: "Ja. Der AI CFO modelliert verschiedene Pricing-Szenarien: Preiselastizität, Bundling, Rabattstrategien. Du siehst den Impact auf Umsatz und Marge, bevor du Preise änderst." },
    { question: "Integriert sich das mit meinem ERP?", answer: "KaderOS importiert Daten aus gängigen Handels-ERPs. Echte Zahlen, aktuelle Daten — kein manuelles Zusammentragen von Reports." },
    { question: "Wie schnell sehe ich Ergebnisse?", answer: "Die ersten Analysen liegen innerhalb von 2 Wochen vor. Quick Wins — überflüssige SKUs, unterbewertete Produkte, Lieferanten-Optimierungen — zeigen oft innerhalb von 4-6 Wochen finanzielle Wirkung." },
  ],
  ctaText: "AI CFO für dein Handelsunternehmen aufsetzen",
  relatedRollen: ["cto-fuer-handel", "cmo-fuer-handel", "sales-lead-fuer-handel", "content-lead-fuer-handel"],
  relatedBranchen: ["cfo-fuer-logistik", "cfo-fuer-gastronomie", "cfo-fuer-treuhand"],
};

const cfoHandwerk: AITeamPage = {
  slug: "cfo-fuer-handwerk",
  rolle: "cfo", rolleLabel: "CFO", branche: "handwerk", brancheLabel: "Handwerk",
  metaTitle: "AI CFO für Handwerk — Kalkulation, Marge und Liquidität | KaderOS",
  metaDescription: "AI CFO für Handwerksbetriebe: Auftragskalkulation, Nachkalkulation und Liquiditätssteuerung. Profitabel arbeiten statt nur beschäftigt sein.",
  h1: "AI CFO für Handwerk — KaderOS",
  intro: "Viele Handwerksbetriebe sind voll ausgelastet — aber nicht profitabel. Zwischen zu günstigen Offerten, unkalkulierten Nachträgen und langen Zahlungszielen bleiben die Margen auf der Strecke. Ein AI CFO von KaderOS sorgt dafür, dass sich harte Arbeit auch finanziell lohnt.",
  challenges: [
    { title: "Kalkulation nach Bauchgefühl", text: "Offerten werden mit dem Erfahrungswert kalkuliert. Aber Materialpreise schwanken, Anfahrtswege variieren, und die tatsächliche Arbeitszeit weicht regelmässig vom Angebot ab. Nachkalkulation? Findet selten statt." },
    { title: "Zahlungsmoral der Kunden", text: "Handwerker arbeiten vor, Kunden zahlen nach — oft deutlich nach. 60, 90, manchmal 120 Tage Zahlungsziel. Währenddessen müssen Löhne, Material und Sozialversicherungen bezahlt werden. Liquidität wird zum Dauerproblem." },
    { title: "Kein Überblick über die Gesamtsituation", text: "Der Chef steckt in Aufträgen, nicht in der Buchhaltung. Die wird einmal im Monat vom Treuhänder gemacht — rückblickend. Aktuelle Zahlen? Gibt es nicht. Steuerung? Reaktiv statt proaktiv." },
  ],
  solutions: [
    { title: "Datengetriebene Auftragskalkulation", text: "Dein AI CFO erstellt Kalkulationsmodelle basierend auf deinen realen Kosten: Materialpreise aktuell, Lohnkosten inkl. Nebenkosten, Maschinenkosten, Anfahrt. Jede Offerte wird profitabel — nicht nur beschäftigt." },
    { title: "Nachkalkulation und Lernschleife", text: "Vergleich von Offerte und tatsächlichem Aufwand nach jedem Auftrag. Der AI CFO identifiziert systematische Abweichungen und passt Kalkulationsgrundlagen an. Du wirst mit jedem Auftrag besser." },
    { title: "Cashflow-Steuerung und Mahnwesen", text: "Echtzeit-Überblick über offene Rechnungen, erwartete Zahlungseingänge und anstehende Ausgaben. Automatisierte Zahlungserinnerungen und strukturiertes Mahnwesen verkürzen deine Debitorenlaufzeit." },
  ],
  useCases: [
    { title: "Kalkulations-Optimierung für einen Elektriker", text: "Nachkalkulation von 50 Aufträgen offenbarte: Anfahrtszeit war um 35% unterkalkuliert, Kleinmaterial wurde nie verrechnet. Nach Anpassung der Kalkulationsgrundlagen: Marge pro Auftrag +8 Prozentpunkte." },
    { title: "Debitorenmanagement-System", text: "Automatisierte Zahlungserinnerungen (7, 14, 30 Tage), eskalierendes Mahnwesen, Skonto-Angebot für Schnellzahler. Durchschnittliche Debitorenlaufzeit: von 52 auf 28 Tage gesenkt." },
    { title: "Investitionsrechnung für Maschinenpark", text: "Kauf vs. Leasing einer neuen CNC-Fräse: Vollkostenrechnung, Steuereffekte, Auslastungsszenarien. Der AI CFO hat die Entscheidungsgrundlage geliefert. Ergebnis: Leasing mit Kaufoption optimal." },
  ],
  whyKaderOS: "Handwerker brauchen keine komplizierte Finanzsoftware — sie brauchen klare Zahlen, die Entscheidungen ermöglichen. KaderOS liefert genau das: einfach verständliche Finanzsteuerung, die auf Handwerksbetriebe zugeschnitten ist. Kalkulation, Liquidität, Marge — die drei Zahlen, die zählen.",
  faqs: [
    { question: "Ich bin kein Zahlenmensch — ist das trotzdem nutzbar?", answer: "Genau dafür ist der AI CFO da. Er übersetzt komplexe Finanzzahlen in verständliche Handlungsempfehlungen: 'Dieser Auftrag hat 12% Marge, dein Ziel ist 20% — hier sind die Stellschrauben.' Kein Fachjargon." },
    { question: "Kann der AI CFO auch Subunternehmer-Kosten einbeziehen?", answer: "Ja. Subunternehmer-Kosten fliessen vollständig in die Kalkulation ein. Der AI CFO trackt auch die Profitabilität pro Subunternehmer, damit du weisst, mit wem du profitabel zusammenarbeitest." },
    { question: "Wie viel Zeit spare ich?", answer: "Im Schnitt 4-6 Stunden pro Woche: weniger Kalkulationsaufwand, automatisiertes Mahnwesen, keine manuelle Report-Erstellung. Das ist ein halber Arbeitstag, den du auf der Baustelle verbringen kannst." },
  ],
  ctaText: "AI CFO für deinen Handwerksbetrieb aufsetzen",
  relatedRollen: ["cto-fuer-handwerk", "cmo-fuer-handwerk", "sales-lead-fuer-handwerk", "content-lead-fuer-handwerk"],
  relatedBranchen: ["cfo-fuer-gastronomie", "cfo-fuer-handel", "cfo-fuer-logistik"],
};

const cfoBeratung: AITeamPage = {
  slug: "cfo-fuer-beratung",
  rolle: "cfo", rolleLabel: "CFO", branche: "beratung", brancheLabel: "Beratung",
  metaTitle: "AI CFO für Beratung — Projekt-Profitabilität und Utilization | KaderOS",
  metaDescription: "AI CFO für Beratungsunternehmen: Projekt-P&L, Utilization-Rate und Pricing-Strategie. Profitabel beraten.",
  h1: "AI CFO für Beratung — KaderOS",
  intro: "Beratungsfirmen verkaufen Zeit — und genau das macht die Finanzsteuerung komplex. Utilization, Projekt-Profitabilität, Staffing-Entscheidungen — alles hängt zusammen. Ein AI CFO von KaderOS bringt die finanzielle Disziplin, die profitables Wachstum ermöglicht.",
  challenges: [
    { title: "Utilization-Rate undurchsichtig", text: "Wie hoch ist die tatsächliche Auslastung deiner Berater? Viele Firmen kennen nur den Durchschnitt, nicht die Verteilung. Einige Berater sind überbucht, andere warten auf Staffing. Ohne transparente Utilization-Daten ist Personalplanung ein Ratespiel." },
    { title: "Projekt-Profitabilität nachträglich enttäuschend", text: "Das Proposal sah profitabel aus — aber dann kamen Scope Changes, unbezahlte Überstunden und Reisekosten. Am Ende war der Stundensatz tiefer als geplant. Nachkalkulation zeigt: 30% der Projekte laufen unter Ziel-Marge." },
    { title: "Partner-Vergütung und Profit-Sharing", text: "Wie verteilt sich der Gewinn fair auf die Partner? Ohne transparente Projekt-Profitabilitätsdaten und individuelle Beiträge wird die Diskussion jedes Jahr emotional statt sachlich." },
  ],
  solutions: [
    { title: "Echtzeit-Utilization-Dashboard", text: "Dein AI CFO trackt die Utilization-Rate pro Berater, Team und Firma — in Echtzeit. Frühwarnung bei Unterauslastung, Steuerung von Staffing-Entscheidungen basierend auf Daten." },
    { title: "Projekt-P&L ab Tag 1", text: "Jedes Projekt bekommt ein Echtzeit-P&L: Umsatz, Zeitaufwand, Reisekosten, Scope-Änderungen. Du siehst während des Projekts, ob du auf Kurs bist — nicht erst bei der Nachkalkulation." },
    { title: "Pricing-Optimierung", text: "Der AI CFO analysiert deine Pricing-Struktur: Stundensätze vs. Tagessätze vs. Projektpauschalen vs. Success Fees. Welches Modell maximiert deine Marge bei welchem Projekttyp?" },
  ],
  useCases: [
    { title: "Utilization-Optimierung für eine 20-Personen-Beratung", text: "Transparente Utilization-Daten deckten auf: 4 Berater lagen unter 60% Auslastung. Durch gezielte Staffing-Änderungen und Akquise-Fokus: Gesamt-Utilization von 68% auf 78%. Impact: +CHF 400'000 Jahresumsatz." },
    { title: "Scope-Creep-Tracker", text: "Automatisierte Erfassung von Scope Changes pro Projekt. In 6 Monaten identifiziert: CHF 180'000 an unbezahlten Zusatzleistungen. Davon nachverhandelt: CHF 120'000." },
    { title: "Datenbasiertes Partner-Profit-Sharing", text: "Transparentes Modell für Gewinnverteilung: basierend auf akquiriertem Umsatz, gelieferter Projektmarge und Team-Entwicklung. Erstmals sachliche Diskussion statt Bauchgefühl." },
  ],
  whyKaderOS: "Beratungsunternehmen sind People-Businesses mit komplexer Finanzsteuerung. KaderOS versteht die Mechanik: Utilization mal Rate mal Leverage ergibt Profitabilität. Unser AI CFO spricht die Sprache von Consulting-Firmen und liefert Kennzahlen, die Partner-Meetings auf ein neues Niveau heben.",
  faqs: [
    { question: "Integriert sich der AI CFO mit unserem Zeiterfassungs-Tool?", answer: "Ja. KaderOS importiert Daten aus gängigen Zeiterfassungs-Tools wie Toggl, Clockify, Harvest oder SAP. Dein AI CFO arbeitet mit deinen realen Zeitdaten." },
    { question: "Kann der AI CFO auch bei Akquisitionen beraten?", answer: "Der AI CFO kann Financial Due Diligence für Akquisitions-Targets erstellen: Profitabilitätsanalyse, Kundenbindung, Berater-Retention-Risiko. Eine solide Zahlengrundlage für deine Wachstumsentscheidungen." },
    { question: "Wie geht der AI CFO mit vertraulichen Finanzdaten um?", answer: "KaderOS ist nDSG-konform mit Schweizer Hosting. Finanzdaten sind verschlüsselt und nur für autorisierte Nutzer zugänglich. Mandantenspezifische Daten sind strikt isoliert." },
  ],
  ctaText: "AI CFO für deine Beratungsfirma aufsetzen",
  relatedRollen: ["cto-fuer-beratung", "cmo-fuer-beratung", "sales-lead-fuer-beratung", "content-lead-fuer-beratung"],
  relatedBranchen: ["cfo-fuer-treuhand", "cfo-fuer-it", "cfo-fuer-bildung"],
};

const cfoIT: AITeamPage = {
  slug: "cfo-fuer-it",
  rolle: "cfo", rolleLabel: "CFO", branche: "it", brancheLabel: "IT",
  metaTitle: "AI CFO für IT — Burn Rate, Unit Economics und Fundraising | KaderOS",
  metaDescription: "AI CFO für IT-Unternehmen: SaaS-Metriken, Burn-Rate-Management und Fundraising-Vorbereitung. Finanzen, die Investoren überzeugen.",
  h1: "AI CFO für IT — KaderOS",
  intro: "IT-Unternehmen — besonders SaaS-Firmen — haben eigene Finanz-Logiken: Recurring Revenue, Churn, CAC/LTV, Burn Rate. Klassische Buchhalter verstehen das nicht. Ein AI CFO von KaderOS spricht SaaS-Finanzsprache und liefert die Metriken, die für Wachstumsentscheidungen und Investorengespräche zählen.",
  challenges: [
    { title: "SaaS-Metriken im Nebel", text: "MRR, ARR, Churn, Expansion Revenue, Net Revenue Retention — die Metriken-Landschaft ist komplex. Viele SaaS-Gründer tracken nur Umsatz und Kosten. Die wirklich entscheidenden Kennzahlen fehlen — und damit die Grundlage für strategische Entscheidungen." },
    { title: "Burn Rate und Runway unkontrolliert", text: "Wie lange reicht das Geld? Die Antwort darauf sollte jeder Gründer im Schlaf kennen. Trotzdem wird die Burn Rate oft nur grob geschätzt. Und wenn das Geld knapp wird, ist es für Fundraising zu spät." },
    { title: "Fundraising ohne solide Zahlen", text: "Investoren wollen Metriken sehen: Unit Economics, Cohort-Analysen, Revenue-Forecast. Viele Gründer haben beeindruckende Produkte, aber enttäuschende Financial Models. Das kostet Bewertungspunkte und verzögert Runden." },
  ],
  solutions: [
    { title: "SaaS-Metriken-Dashboard", text: "Dein AI CFO trackt alle relevanten SaaS-KPIs in Echtzeit: MRR, ARR, Net Revenue Retention, Churn, CAC, LTV, Magic Number. Alles auf einem Dashboard, automatisch aktualisiert." },
    { title: "Burn-Rate-Management und Szenarioplanung", text: "Rolling Forecast mit verschiedenen Szenarien: Best Case, Base Case, Worst Case. Runway-Berechnung in Echtzeit. Frühwarnung, wenn der Runway unter 12 Monate fällt." },
    { title: "Investor-Ready Financial Model", text: "Der AI CFO baut ein Financial Model, das Investoren überzeugt: Bottom-Up-Revenue-Forecast, Unit Economics, Cohort-Analysen, Sensitivitätsrechnung. Bereit für den nächsten Pitch." },
  ],
  useCases: [
    { title: "SaaS-Metriken-Aufbau für ein Series-A-Startup", text: "Implementierung eines vollständigen SaaS-Metriken-Frameworks. Erstmals Transparenz über Cohort-Retention, CAC Payback Period und Net Revenue Retention. Die Series A wurde 3 Monate später zu einer 30% höheren Bewertung geschlossen." },
    { title: "Burn-Rate-Optimierung", text: "Analyse aller Ausgaben-Kategorien, Identifikation von 4 Quick Wins ohne Impact auf Wachstum. Burn Rate um 25% gesenkt, Runway von 14 auf 19 Monate verlängert — ohne Fundraising." },
    { title: "Pricing-Experiment mit Revenue Impact", text: "Modellierung eines Pricing-Experiments: Preiserhöhung um 20% für Neukunden. Der AI CFO hat Churn-Szenarien modelliert und den Break-Even-Point berechnet. Ergebnis nach 6 Monaten: +15% ARR, Churn nur +0.3%." },
  ],
  whyKaderOS: "KaderOS wurde von einem Tech-Team gebaut — wir verstehen SaaS-Finanzen aus erster Hand. Unser AI CFO denkt in MRR, nicht in Quartalsberichten. Er kennt die Metriken, die VCs sehen wollen, und die Hebel, die SaaS-Profitabilität treiben. Kein klassischer Buchhalter in AI-Verkleidung.",
  faqs: [
    { question: "Kann der AI CFO auch ein Cap Table verwalten?", answer: "Der AI CFO kann Cap-Table-Modellierungen erstellen: Verwässerung durch neue Runden, ESOP-Pool-Erweiterung, Liquidation Preferences. Für die rechtliche Cap-Table-Verwaltung empfehlen wir spezialisierte Tools wie Ledgy." },
    { question: "Versteht der AI CFO auch Bootstrapped-Unternehmen?", answer: "Ja. Nicht jedes IT-Unternehmen braucht VC-Metriken. Für Bootstrapped-Firmen fokussiert der AI CFO auf Profitabilität, Owner's Compensation, Cash Conversion und nachhaltiges Wachstum." },
    { question: "Wie integriert sich das mit Stripe und Co.?", answer: "KaderOS kann Daten aus Stripe, Chargebee, Paddle und anderen Billing-Systemen importieren. Dein AI CFO arbeitet mit deinen echten Revenue-Daten — automatisch aktualisiert." },
  ],
  ctaText: "AI CFO für dein IT-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-it", "cmo-fuer-it", "sales-lead-fuer-it", "content-lead-fuer-it"],
  relatedBranchen: ["cfo-fuer-beratung", "cfo-fuer-pharma", "cfo-fuer-bildung"],
};

const cfoPharma: AITeamPage = {
  slug: "cfo-fuer-pharma",
  rolle: "cfo", rolleLabel: "CFO", branche: "pharma", brancheLabel: "Pharma",
  metaTitle: "AI CFO für Pharma — F&E-Budgets und Regulatory Costs steuern | KaderOS",
  metaDescription: "AI CFO für Pharmaunternehmen: F&E-Budget-Steuerung, Kostenmodellierung und Compliance-Kosten im Griff. Swiss Made.",
  h1: "AI CFO für Pharma — KaderOS",
  intro: "Pharma ist kapitalintensiv mit langen Entwicklungszyklen und hohen regulatorischen Kosten. Finanzsteuerung in der Pharma heisst: F&E-Budgets managen, Regulatory Costs vorhersagen und Cashflow trotz langem Produktentwicklungszyklus sichern. Ein AI CFO von KaderOS liefert die Transparenz.",
  challenges: [
    { title: "F&E-Budgets schwer planbar", text: "Klinische Studien kosten Millionen und dauern Jahre. Unvorhergesehene Ergebnisse, regulatorische Verzögerungen, zusätzliche Studienarme — das Budget ist ein bewegliches Ziel. Ohne fortlaufendes Monitoring werden die Abweichungen zum Risiko." },
    { title: "Regulatory Costs unterschätzt", text: "Zulassungsdossiers, Post-Marketing-Surveillance, Pharmakovigilanz, GMP-Inspektionen — die regulatorischen Kosten werden bei der Budgetplanung oft unterschätzt. Sie summieren sich und fressen die Marge." },
    { title: "Langer Cash-Conversion-Cycle", text: "Von der ersten Forschung bis zum ersten Umsatz vergehen oft 10+ Jahre. In dieser Zeit muss Kapital beschafft, Burn Rate gemanagt und Meilensteine erreicht werden. Ohne präzise Finanzsteuerung wird das Timing zum Existenzrisiko." },
  ],
  solutions: [
    { title: "F&E-Budget-Tracking in Echtzeit", text: "Dein AI CFO trackt jedes Forschungsprojekt: Budget vs. Actual, Forecast-Anpassungen, Meilenstein-Kosten. Du siehst sofort, wenn ein Projekt vom Budget abweicht — und kannst reagieren." },
    { title: "Total-Cost-of-Compliance-Modell", text: "Vollkostenrechnung für Regulatory Affairs: Zulassungskosten, Pharmacovigilance, Quality, Post-Marketing. Der AI CFO macht die wahren Compliance-Kosten transparent und budgetierbar." },
    { title: "Runway-Management mit Milestone-Planung", text: "Integration von wissenschaftlichen Meilensteinen und Finanzplanung. Der AI CFO zeigt, welche Meilensteine mit dem aktuellen Budget erreichbar sind — und wann die nächste Finanzierungsrunde kommen muss." },
  ],
  useCases: [
    { title: "F&E-Portfolio-Priorisierung", text: "Finanzielle Bewertung von 5 Entwicklungsprojekten: Risk-Adjusted NPV, Erfolgswahrscheinlichkeit, Capital Requirements. 2 Projekte priorisiert, 1 pausiert, 2 zur Partnerschaft empfohlen. Capital Efficiency: +40%." },
    { title: "Regulatory-Cost-Forecast", text: "Aufbau eines Kostenmodells für den gesamten Regulatory Lifecycle: Präklinik → Phase I-III → Zulassung → Post-Marketing. Budgetgenauigkeit von ±30% auf ±10% verbessert." },
    { title: "Fundraising-Modell für ein Biotech", text: "Financial Model für eine Series-B-Runde: Runway bis Phase-II-Daten, Milestone-basierter Capital Plan, Verwässerungsszenarien. Die Runde wurde zu einer 20% höheren Bewertung geschlossen als erwartet." },
  ],
  whyKaderOS: "Pharma-Finanzen sind kein Standard-Buchhaltung. KaderOS versteht die spezifischen Herausforderungen: lange Entwicklungszyklen, hohe Unsicherheit, regulatorische Kosten, Milestone-basierte Finanzierung. Unser AI CFO liefert Pharma-spezifische Finanzanalysen — nicht generische Controllership.",
  faqs: [
    { question: "Versteht der AI CFO Pharma-spezifische Kennzahlen?", answer: "Ja. Risk-Adjusted NPV, Probability of Technical Success, Cost per Patient, Cost per Milestone — der AI CFO kennt die Kennzahlen der Pharma-Finanzwelt und integriert sie in seine Analysen." },
    { question: "Kann der AI CFO auch bei Lizenz-Deals helfen?", answer: "Der AI CFO kann die finanzielle Bewertung von In-Licensing und Out-Licensing vorbereiten: NPV-Analysen, Royalty-Modelle, Milestone-Strukturen, Sensitivitätsrechnungen." },
    { question: "Wie vertraulich sind die Finanzdaten?", answer: "KaderOS arbeitet nDSG-konform mit Schweizer Hosting. Pipeline-Daten und Finanzzahlen sind verschlüsselt und strikt zugangsgesteuert. Für börsennotierte Unternehmen können zusätzliche Insiderhandels-Schutzmassnahmen implementiert werden." },
  ],
  ctaText: "AI CFO für dein Pharma-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-pharma", "cmo-fuer-pharma", "sales-lead-fuer-pharma", "content-lead-fuer-pharma"],
  relatedBranchen: ["cfo-fuer-it", "cfo-fuer-beratung", "cfo-fuer-bildung"],
};

const cfoLogistik: AITeamPage = {
  slug: "cfo-fuer-logistik",
  rolle: "cfo", rolleLabel: "CFO", branche: "logistik", brancheLabel: "Logistik",
  metaTitle: "AI CFO für Logistik — Transportkosten und Marge steuern | KaderOS",
  metaDescription: "AI CFO für Logistik: Sendungs-Profitabilität, Fuhrpark-Kosten und Routenkosten-Analyse. Mehr Marge pro Kilometer.",
  h1: "AI CFO für Logistik — KaderOS",
  intro: "Logistik ist ein Centgeschäft — jeder Kilometer, jede Stunde, jeder Palettplatz muss sich rechnen. Trotzdem steuern viele Logistikunternehmen ihre Finanzen mit Excel und Durchschnittswerten. Ein AI CFO von KaderOS bringt die Granularität, die für profitables Wachstum nötig ist.",
  challenges: [
    { title: "Sendungs-Profitabilität unbekannt", text: "Welche Sendung war profitabel, welche nicht? Die meisten Spediteure können das nicht beantworten. Durchschnittliche Deckungsbeiträge verbergen die Realität: Einige Kunden subventionieren andere, ohne dass es jemand weiss." },
    { title: "Fuhrpark-Kosten explodieren", text: "Diesel, Versicherung, Wartung, LSVA, Reifen, Steuern — die True Costs pro Fahrzeug sind komplex. Ohne vollständige Kostenrechnung werden Transportpreise zu niedrig kalkuliert und Investitionsentscheidungen falsch getroffen." },
    { title: "Volatilität der Inputkosten", text: "Dieselpreise schwanken, Personal wird teurer, Mautgebühren steigen. Langfristige Verträge mit fixen Preisen werden zum Risiko. Ohne dynamische Finanzsteuerung schrumpft die Marge mit jeder Preiserhöhung." },
  ],
  solutions: [
    { title: "Sendungs-Level-Profitabilität", text: "Dein AI CFO kalkuliert den Deckungsbeitrag pro Sendung: Transportkosten, Handling, Lagerung, Administration. Du siehst genau, welche Aufträge Geld verdienen und welche du nachverhandeln musst." },
    { title: "Total Cost of Ownership pro Fahrzeug", text: "Vollständige Kostenrechnung pro Fahrzeug: Anschaffung, Diesel, Wartung, Versicherung, LSVA, Reifen, Opportunitätskosten. Basis für realistische Transportpreise und Ersatz-Entscheidungen." },
    { title: "Dynamische Preisanpassungen", text: "Automatische Berechnung von Preisanpassungen bei Kostensteigerungen: Diesel-Floating, LIK-Anpassungen, Maut-Änderungen. Du verhandelst auf Basis von Fakten, nicht von Behauptungen." },
  ],
  useCases: [
    { title: "Kunden-Profitabilitätsranking", text: "Analyse von 80 Kunden nach Deckungsbeitrag pro Sendung. Ergebnis: 12 Kunden waren unprofitabel. Nach Preisanpassungen und selektivem Exit: Gesamtmarge +6 Prozentpunkte." },
    { title: "Fuhrpark-Erneuerungsstrategie", text: "TCO-Vergleich: bestehende Fahrzeuge weiter betreiben vs. Neuanschaffung vs. Leasing vs. Elektro. Der AI CFO hat Szenarien über 5 Jahre modelliert inkl. CO2-Abgaben-Prognose. Ergebnis: schrittweiser Umstieg auf E-LKW am wirtschaftlichsten." },
    { title: "Diesel-Floating-Modell", text: "Implementation eines Diesel-Floating-Modells in Kundenverträgen: Automatische Preisanpassung basierend auf BFS-Dieselpreisindex. Margenrisiko durch Diesel-Schwankungen: eliminiert." },
  ],
  whyKaderOS: "Logistik-Finanzen sind granular — es geht um Franken pro Palette, pro Kilometer, pro Stunde. KaderOS liefert diese Granularität und versteht die Schweizer Logistik-Kostenstruktur: LSVA-Berechnung, Cross-Border-Zölle, Schweizer Arbeitsrecht für Chauffeure.",
  faqs: [
    { question: "Kann der AI CFO auch Zollkosten kalkulieren?", answer: "Ja. Der AI CFO berechnet Zollkosten für Schweiz-EU-Verkehr: Zolltarife, Ursprungsregeln, Präferenzzölle. So kalkulierst du Cross-Border-Sendungen korrekt." },
    { question: "Funktioniert das auch für Lagerlogistik?", answer: "Ja. Der AI CFO analysiert Lagerkosten: Kosten pro Palettenplatz, Kommissionier-Kosten, Fulfillment-Kosten. Basis für kostendeckende Lagertarife und Effizienzverbesserungen." },
    { question: "Wie integriert sich das mit unserem TMS?", answer: "KaderOS importiert Sendungsdaten aus gängigen Transport-Management-Systemen. Der AI CFO berechnet die Profitabilität automatisch auf Basis deiner realen Transportdaten." },
  ],
  ctaText: "AI CFO für dein Logistik-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-logistik", "cmo-fuer-logistik", "sales-lead-fuer-logistik", "content-lead-fuer-logistik"],
  relatedBranchen: ["cfo-fuer-handel", "cfo-fuer-handwerk", "cfo-fuer-gastronomie"],
};

const cfoBildung: AITeamPage = {
  slug: "cfo-fuer-bildung",
  rolle: "cfo", rolleLabel: "CFO", branche: "bildung", brancheLabel: "Bildung",
  metaTitle: "AI CFO für Bildung — Kursrentabilität und Finanzplanung | KaderOS",
  metaDescription: "AI CFO für Bildungsanbieter: Kurs-Profitabilität, Teilnehmerprognosen und Investitionsplanung. Bildung finanzieren, nicht subventionieren.",
  h1: "AI CFO für Bildung — KaderOS",
  intro: "Bildung ist Mission — aber sie muss finanzierbar sein. Ob privater Anbieter oder öffentliche Institution: Ohne finanzielle Nachhaltigkeit gibt es keine nachhaltige Bildung. Ein AI CFO von KaderOS liefert die Finanzsteuerung, die Bildungsanbieter brauchen, um langfristig zu bestehen.",
  challenges: [
    { title: "Kursrentabilität unklar", text: "Welcher Kurs rechnet sich, welcher wird subventioniert? Ohne Vollkostenrechnung pro Kurs — Dozenten, Raum, Material, Administration, Marketing — ist die Antwort Spekulation." },
    { title: "Teilnehmerprognosen ungenau", text: "Zu wenig Teilnehmer: Kurs defizitär. Zu viele: Qualität leidet. Die Prognose basiert meist auf dem Vorjahr plus Hoffnung. Ohne datenbasierte Prognose schwankt die Auslastung zwischen Überbuchung und Absage." },
    { title: "Investitionen in Infrastruktur und Technologie", text: "LMS, Räumlichkeiten, Equipment, Dozenten-Weiterbildung — Bildungsanbieter müssen laufend investieren. Aber die Finanzierungsentscheidungen werden ohne solide ROI-Berechnung getroffen." },
  ],
  solutions: [
    { title: "Kurs-Level-Profitabilität", text: "Dein AI CFO kalkuliert den Deckungsbeitrag pro Kurs: Direkte Kosten, anteilige Overheads, Marketing-Zuordnung. Du siehst, welche Kurse Geld verdienen und welche überarbeitet werden müssen." },
    { title: "Datenbasierte Teilnehmerprognose", text: "Der AI CFO prognostiziert Teilnehmerzahlen basierend auf historischen Daten, Markttrends und Marketing-Aktivitäten. So planst du Personal und Räume mit Zuversicht statt mit Hoffnung." },
    { title: "Investitions-ROI-Kalkulator", text: "Für jede grössere Investition erstellt der AI CFO eine ROI-Rechnung: Neue LMS-Plattform, zusätzlicher Standort, Online-Kursangebot. Zahlen, die Entscheidungen stützen." },
  ],
  useCases: [
    { title: "Kursportfolio-Optimierung", text: "Profitabilitätsanalyse von 60 Kursen. 15 Kurse unter Break-Even identifiziert. 8 davon nach Preisanpassung profitabel gemacht, 7 durch gefragtere Themen ersetzt. Gesamtrentabilität: +20%." },
    { title: "Online-vs-Präsenz-Kostenvergleich", text: "Vollkostenvergleich: Präsenzkurs (Raum, Catering, Pendler-Pauschale) vs. Online-Kurs (Plattform, Equipment, Produktion). Ergebnis: Hybrid-Modell optimal — 40% Kostenreduktion bei 95% Teilnehmerzufriedenheit." },
    { title: "Stipendien-Budgetierung", text: "Transparentes Stipendienmodell: Wie viele Stipendien kann sich die Institution leisten, ohne die finanzielle Nachhaltigkeit zu gefährden? Der AI CFO hat ein Modell erstellt, das Grosszügigkeit mit Verantwortung verbindet." },
  ],
  whyKaderOS: "Bildungsfinanzierung hat eigene Logiken: Gemeinnützigkeit, öffentliche Förderung, Stipendien, Cross-Subventionierung. KaderOS versteht diese Besonderheiten und liefert Finanzsteuerung, die den Bildungsauftrag unterstützt statt ihn zu untergraben.",
  faqs: [
    { question: "Eignet sich das auch für gemeinnützige Bildungsanbieter?", answer: "Ja. Gemeinnützigkeit bedeutet nicht Planlosigkeit. Der AI CFO hilft, die finanzielle Nachhaltigkeit sicherzustellen — gerade weil kein Gewinnziel die Disziplin erzwingt." },
    { question: "Kann der AI CFO auch Förderanträge unterstützen?", answer: "Der AI CFO liefert die finanziellen Daten und Prognosen, die für Förderanträge benötigt werden: Kostenaufstellungen, Business Cases, Nachhaltigkeitsnachweise. Die Antragstellung selbst unterstützt er mit Strukturierung und Argumentation." },
    { question: "Wie geht der AI CFO mit öffentlicher Finanzierung um?", answer: "Der AI CFO berücksichtigt verschiedene Finanzierungsquellen: Teilnehmergebühren, öffentliche Beiträge, Sponsoring, Spenden. Er modelliert Szenarien für verschiedene Fördermittel-Niveaus." },
  ],
  ctaText: "AI CFO für deine Bildungseinrichtung aufsetzen",
  relatedRollen: ["cto-fuer-bildung", "cmo-fuer-bildung", "sales-lead-fuer-bildung", "content-lead-fuer-bildung"],
  relatedBranchen: ["cfo-fuer-beratung", "cfo-fuer-pharma", "cfo-fuer-treuhand"],
};

// ─── Sales Lead Pages ────────────────────────────────────────

const salesTreuhand: AITeamPage = {
  slug: "sales-lead-fuer-treuhand",
  rolle: "sales-lead", rolleLabel: "Sales Lead", branche: "treuhand", brancheLabel: "Treuhand",
  metaTitle: "AI Sales Lead für Treuhand — Mandantenakquise automatisieren | KaderOS",
  metaDescription: "AI Sales Lead für Treuhandbüros: Mandantenakquise systematisieren, Erstgespräche vorbereiten und Pipeline managen. Mehr Mandate, weniger Aufwand.",
  h1: "AI Sales Lead für Treuhand — KaderOS",
  intro: "Neue Mandanten kommen in der Treuhandbranche selten über klassischen Verkauf. Trotzdem braucht es einen systematischen Prozess: vom Erstkontakt über das Beratungsgespräch bis zur Mandatsvereinbarung. Ein AI Sales Lead von KaderOS macht diesen Prozess wiederholbar und messbar.",
  challenges: [
    { title: "Akquise als Nebenbeschäftigung", text: "Partner führen Kundengespräche zwischen Mandatsarbeit. Es gibt keinen dedizierten Sales-Prozess, kein CRM wird gepflegt, und Follow-ups passieren — oder auch nicht. Die Pipeline ist unsichtbar." },
    { title: "Erstgespräche ohne Vorbereitung", text: "Ein potenzieller Mandant meldet sich. Das Gespräch findet ad hoc statt, ohne strukturierte Bedarfsanalyse, ohne Competitive Intelligence, ohne vorbereitetes Angebot. Jedes Gespräch ist ein Unikat statt ein optimierter Prozess." },
    { title: "Keine Nachverfolgung", text: "Nach einem guten Erstgespräch passiert — nichts. Kein Follow-up, kein Proposal, kein Erinnerungs-Call. Nicht aus Desinteresse, sondern weil die Mandatsarbeit Vorrang hat. Ergebnis: verpasste Mandate." },
  ],
  solutions: [
    { title: "CRM und Pipeline-Management", text: "Dein AI Sales Lead richtet ein schlankes CRM ein und hält es aktuell: Jeder Lead wird erfasst, qualifiziert und durch den Prozess geführt. Du siehst jederzeit, wie viele potenzielle Mandanten in der Pipeline sind." },
    { title: "Strukturierte Erstgespräche", text: "Der AI Sales Lead bereitet jedes Erstgespräch vor: Branche des Interessenten, typische Bedürfnisse, Competitive Positioning. Du gehst vorbereitet in jedes Gespräch und überzeugst mit Kompetenz." },
    { title: "Automatisiertes Follow-up", text: "Nach dem Erstgespräch übernimmt der AI Sales Lead: Dankesmail, Proposal-Erstellung, Erinnerungs-Sequenz. Kein Lead geht mehr verloren, weil du in der Jahresabschluss-Saison steckst." },
  ],
  useCases: [
    { title: "Pipeline-Aufbau von Null", text: "Ein Treuhandbüro hatte keinen Sales-Prozess. Der AI Sales Lead hat CRM, Pipeline-Stufen und Templates eingerichtet. Nach 6 Monaten: 45 Leads in der Pipeline, 12 neue Mandate, durchschnittlicher Mandatswert CHF 4'500/Jahr." },
    { title: "Proposal-Automation", text: "Standardisierte Proposals, die sich automatisch mit Mandanten-Daten füllen: Branche, Unternehmensgrösse, geschätzter Aufwand, Preismodell. Proposal-Erstellungszeit: von 2 Stunden auf 15 Minuten." },
    { title: "Referral-Programm für Bestandsmandanten", text: "Strukturiertes Empfehlungsprogramm: Jeder zufriedene Mandant wird aktiv um Empfehlungen gebeten. Der AI Sales Lead hat den Prozess aufgesetzt. 40% der neuen Mandaten kommen jetzt über Empfehlungen." },
  ],
  whyKaderOS: "Treuhand ist Vertrauensverkauf — kein Hard Selling. KaderOS versteht das. Unser AI Sales Lead berät, statt zu verkaufen. Er bereitet Gespräche vor, statt zu kaltakquirieren. Die Tonalität passt zur Branche: professionell, diskret, kompetent.",
  faqs: [
    { question: "Macht der AI Sales Lead auch Kaltakquise?", answer: "Nein. In der Treuhandbranche ist Kaltakquise kontraproduktiv. Der AI Sales Lead fokussiert auf Inbound-Leads, Empfehlungen und gezielte Ansprache von passenden Interessenten — immer respektvoll und professionell." },
    { question: "Kann der AI Sales Lead auch Cross-Selling bei Bestandsmandanten?", answer: "Ja. Der AI Sales Lead identifiziert Cross-Selling-Potenzial: Mandanten, die nur Buchhaltung nutzen, brauchen vielleicht auch Steuererklärung oder Lohnbuchhaltung. Gezielte, wertvolle Vorschläge — kein Aufdrängen." },
    { question: "Wie stellt KaderOS sicher, dass die Mandantenakquise seriös bleibt?", answer: "Der AI Sales Lead folgt einem Beratungsansatz: Bedürfnisse verstehen, Lösung vorschlagen, Entscheidung respektieren. Keine Drucktaktiken, keine Follow-up-Bombardierung. Qualität vor Quantität." },
  ],
  ctaText: "AI Sales Lead für dein Treuhand-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-treuhand", "cmo-fuer-treuhand", "cfo-fuer-treuhand", "content-lead-fuer-treuhand"],
  relatedBranchen: ["sales-lead-fuer-beratung", "sales-lead-fuer-immobilien", "sales-lead-fuer-handel"],
};

const salesImmobilien: AITeamPage = {
  slug: "sales-lead-fuer-immobilien",
  rolle: "sales-lead", rolleLabel: "Sales Lead", branche: "immobilien", brancheLabel: "Immobilien",
  metaTitle: "AI Sales Lead für Immobilien — Akquise und Abschluss optimieren | KaderOS",
  metaDescription: "AI Sales Lead für Immobilien: Eigentümer-Akquise, Besichtigungs-Management und Deal-Tracking. Mehr Abschlüsse, weniger Leerlauf.",
  h1: "AI Sales Lead für Immobilien — KaderOS",
  intro: "Immobilien ist Sales pur: Objekte akquirieren, Besichtigungen organisieren, Verhandlungen führen, Abschlüsse machen. Ein AI Sales Lead von KaderOS systematisiert deinen gesamten Verkaufsprozess — von der Eigentümeransprache bis zur Vertragsunterschrift.",
  challenges: [
    { title: "Eigentümer-Akquise ohne System", text: "Die wertvollste Fähigkeit im Immobiliengeschäft ist, Verkaufsaufträge zu akquirieren. Aber der Prozess ist meist unsystematisch: Gelegentliche Türöffner-Briefe, zufällige Begegnungen, passive Empfehlungen. Kein skalierbarer Prozess." },
    { title: "Lead-Management im Kopf statt im CRM", text: "30 Interessenten für 5 Objekte — und alles im Kopf des Maklers. Wer hat welches Objekt besichtigt? Wer hat ein Finanzierungsbestätigung? Follow-up fällig? Ohne System gehen Deals verloren." },
    { title: "Besichtigungseffizienz katastrophal", text: "10 Besichtigungen, 2 ernsthafte Interessenten, 8 Besichtigungstouristen. Ohne Vorqualifizierung verschwendest du Stunden mit Leuten, die nie kaufen werden." },
  ],
  solutions: [
    { title: "Systematische Eigentümer-Akquise", text: "Dein AI Sales Lead baut einen Akquise-Prozess auf: Identifikation von Verkaufspotenzial, personalisierte Ansprache, Bewertungsangebot, Follow-up-Sequenz. Skalierbar statt zufällig." },
    { title: "CRM für Immobilien-Sales", text: "Der AI Sales Lead richtet ein Immobilien-CRM ein: Objekte, Eigentümer, Interessenten, Besichtigungen, Angebote — alles verknüpft. Jeder Deal-Status auf einen Blick, kein Lead geht verloren." },
    { title: "Lead-Vorqualifizierung", text: "Automatisierte Vorqualifizierung von Interessenten: Finanzierungsrahmen, Kaufbereitschaft, Zeitrahmen. Nur qualifizierte Leads kommen zur Besichtigung. Deine Zeit ist zu wertvoll für Besichtigungstouristen." },
  ],
  useCases: [
    { title: "Eigentümer-Akquise-Funnel", text: "Bewertungs-Landingpage, automatisierte Follow-up-Mails, CRM-gestütztes Tracking. Der AI Sales Lead hat den Funnel aufgebaut. Ergebnis: 8 neue Verkaufsmandate pro Quartal, Akquisekosten pro Mandat: CHF 450." },
    { title: "Besichtigungs-Optimierung", text: "Vorqualifizierung per Online-Fragebogen, automatisierte Terminbuchung, Pre-Besichtigungs-Info-Paket. Besichtigungen pro Abschluss von 12 auf 5 reduziert. Zeiteinsparung: 15 Stunden pro Objekt." },
    { title: "Verhandlungs-Cockpit", text: "Dashboard für laufende Verhandlungen: Angebote, Gegenangebote, Fristen, Finanzierungsstatus. Der AI Sales Lead erinnert an Deadlines und schlägt nächste Schritte vor. Abschlussrate: +20%." },
  ],
  whyKaderOS: "Immobilien-Sales ist Beziehungsarbeit mit Prozess-Disziplin. KaderOS automatisiert den Prozess, damit du dich auf die Beziehung konzentrieren kannst. Unser AI Sales Lead versteht den Schweizer Immobilienmarkt: Erbpacht, Lex Koller, kantonale Besonderheiten.",
  faqs: [
    { question: "Kann der AI Sales Lead auch Mietobjekte verwalten?", answer: "Ja. Der AI Sales Lead unterstützt auch die Neuvermietung: Interessenten-Management, Besichtigungskoordination, Mieterauswahl. Der Prozess ist analog zum Verkauf, aber mit anderen Qualifizierungskriterien." },
    { question: "Integriert sich das mit ImmoScout und Homegate?", answer: "Der AI Sales Lead kann Anfragen von Portalen automatisch ins CRM übernehmen, qualifizieren und in den Sales-Prozess einspeisen. Keine manuelle Übertragung mehr." },
    { question: "Wie verhindert der AI Sales Lead, dass Leads vergessen werden?", answer: "Automatische Erinnerungen, eskalierendes Follow-up und Pipeline-Reviews. Jeder Lead hat einen nächsten Schritt, jeder Schritt hat eine Deadline. Der AI Sales Lead lässt nichts durchrutschen." },
  ],
  ctaText: "AI Sales Lead für dein Immobilien-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-immobilien", "cmo-fuer-immobilien", "cfo-fuer-immobilien", "content-lead-fuer-immobilien"],
  relatedBranchen: ["sales-lead-fuer-treuhand", "sales-lead-fuer-handel", "sales-lead-fuer-beratung"],
};

const salesGastronomie: AITeamPage = {
  slug: "sales-lead-fuer-gastronomie",
  rolle: "sales-lead", rolleLabel: "Sales Lead", branche: "gastronomie", brancheLabel: "Gastronomie",
  metaTitle: "AI Sales Lead für Gastronomie — Upselling und Catering-Akquise | KaderOS",
  metaDescription: "AI Sales Lead für Gastronomie: Catering-Anfragen, Event-Verkauf und Firmenkunden-Akquise. Mehr Umsatz pro Gast, mehr Aufträge.",
  h1: "AI Sales Lead für Gastronomie — KaderOS",
  intro: "Restaurants verkaufen nicht nur Essen — sie verkaufen Erlebnisse, Catering, Events, Firmenlunches. Dieses Zusatzgeschäft hat oft die besseren Margen als das Tagesgeschäft. Ein AI Sales Lead von KaderOS hilft dir, diese Umsatzquellen zu erschliessen und zu systematisieren.",
  challenges: [
    { title: "Catering-Anfragen ad hoc bearbeitet", text: "Eine Anfrage für ein Firmen-Catering kommt per E-Mail. Sie wird irgendwann beantwortet — wenn zwischen den Services Zeit bleibt. Kein standardisiertes Angebot, keine schnelle Reaktion, kein Follow-up. Aufträge gehen an die Konkurrenz." },
    { title: "Upselling passiert zufällig", text: "Dessert, Weinbegleitung, Aperitif — Upselling-Potenzial ist enorm, wird aber dem Zufall überlassen. Es gibt keine systematische Strategie, um den durchschnittlichen Bon zu steigern." },
    { title: "Firmenkundengeschäft unerschlossen", text: "Regelmässige Teamlunches, Weihnachtsessen, Kundenevents — Firmenkunden sind goldwert. Aber die meisten Restaurants haben keinen Prozess, um sie zu akquirieren und zu binden." },
  ],
  solutions: [
    { title: "Catering-Sales-Prozess", text: "Dein AI Sales Lead richtet einen strukturierten Prozess ein: Anfrage → schnelles Angebot → Follow-up → Auftrag → Nachbearbeitung. Templates, Kalkulation, Timing — alles optimiert auf Schnelligkeit und Professionalität." },
    { title: "Upselling-Strategie", text: "Der AI Sales Lead entwickelt eine Upselling-Strategie: Menükartendesign für höhere Bons, Empfehlungsskripte für das Service-Team, Pairing-Vorschläge. Systematisch statt zufällig." },
    { title: "Firmenkunden-Akquise", text: "Gezielte Ansprache von Unternehmen in deiner Umgebung: Firmenverzeichnis, personalisierte Angebote, Probessen-Einladungen. Der AI Sales Lead baut ein B2B-Segment auf, das regelmässig Umsatz bringt." },
  ],
  useCases: [
    { title: "Catering-Umsatz verdreifacht", text: "Standardisierte Catering-Pakete, Online-Anfrage-Formular, schnelle Angebotslegung. Der AI Sales Lead hat den Prozess aufgebaut. Catering-Umsatz: von CHF 3'000 auf CHF 9'500 pro Monat in 4 Monaten." },
    { title: "Firmenlunch-Abo", text: "Wöchentliches Lunch-Abo für 5 Firmen in der Nachbarschaft. Der AI Sales Lead hat die Akquise gesteuert, Verträge vorbereitet und die Logistik geplant. Planbarer Umsatz: CHF 4'000/Monat." },
    { title: "Bon-Steigerung durch Menü-Optimierung", text: "Analyse des Bestellverhaltens, Neugestaltung der Menükarte nach Upselling-Prinzipien, Training des Service-Teams. Durchschnittlicher Bon: +CHF 12 pro Gast." },
  ],
  whyKaderOS: "In der Gastronomie zählen schnelle Reaktionen und persönliche Beziehungen. KaderOS automatisiert den Prozess, damit du persönlich bleiben kannst: Schnelle Angebote, pünktliche Follow-ups, professionelle Kommunikation — ohne dass du am Schreibtisch sitzen musst.",
  faqs: [
    { question: "Ersetzt der AI Sales Lead mein Service-Team?", answer: "Nein. Der AI Sales Lead unterstützt im Hintergrund: Catering-Anfragen, Firmenkunden-Akquise, Follow-ups. Das Service-Team vor Ort bleibt für den Gästekontakt zuständig — unterstützt durch Upselling-Tipps." },
    { question: "Funktioniert das auch für Take-Away-Betriebe?", answer: "Ja. Für Take-Away gelten andere Hebel: Online-Bestelloptimierung, Stammkunden-Bindung, Lunch-Deals für Büros. Der AI Sales Lead passt seine Strategie an dein Konzept an." },
    { question: "Wie schnell beantwortet der AI Sales Lead Catering-Anfragen?", answer: "Catering-Anfragen werden innerhalb von 2 Stunden mit einem professionellen Angebot beantwortet — auch um 22 Uhr. Der AI Sales Lead nutzt deine Catering-Pakete und Preise, du musst nur noch bestätigen." },
  ],
  ctaText: "AI Sales Lead für deinen Gastro-Betrieb aufsetzen",
  relatedRollen: ["cto-fuer-gastronomie", "cmo-fuer-gastronomie", "cfo-fuer-gastronomie", "content-lead-fuer-gastronomie"],
  relatedBranchen: ["sales-lead-fuer-handel", "sales-lead-fuer-handwerk", "sales-lead-fuer-bildung"],
};

const salesHandel: AITeamPage = {
  slug: "sales-lead-fuer-handel",
  rolle: "sales-lead", rolleLabel: "Sales Lead", branche: "handel", brancheLabel: "Handel",
  metaTitle: "AI Sales Lead für Handel — B2B-Vertrieb und Kundengewinnung | KaderOS",
  metaDescription: "AI Sales Lead für Handel: B2B-Akquise, Kundenreaktivierung und Account Management. Mehr Abschlüsse, höhere Warenkörbe.",
  h1: "AI Sales Lead für Handel — KaderOS",
  intro: "Ob Grosshandel oder Fachhandel mit B2B-Segment: Vertrieb entscheidet über Wachstum. Aber professioneller Vertrieb braucht Struktur: Pipeline, Qualifizierung, Follow-up, Account Management. Ein AI Sales Lead von KaderOS bringt Vertriebsprozesse in dein Handelsunternehmen.",
  challenges: [
    { title: "Vertrieb ohne Pipeline", text: "Kunden kommen — oder nicht. Es gibt keine systematische Neukundenakquise, kein Lead-Scoring, keine Pipeline-Übersicht. Vertrieb ist reaktiv statt proaktiv." },
    { title: "Bestandskunden vernachlässigt", text: "80% des Umsatzes kommt von 20% der Kunden. Trotzdem wird diese Goldgrube selten aktiv bearbeitet: Kein Account Management, kein Cross-Selling-Plan, keine Zufriedenheitsmessung." },
    { title: "Preisverhandlungen ohne Daten", text: "Rabatte werden nach Bauchgefühl gegeben: 'Der Kunde ist wichtig' oder 'Die Konkurrenz bietet günstiger'. Ohne Daten über Kundenwert und Margenbeitrag werden Rabatte zu grosszügig — oder zu knauserig." },
  ],
  solutions: [
    { title: "B2B-Sales-Pipeline aufbauen", text: "Dein AI Sales Lead implementiert einen strukturierten Vertriebsprozess: Lead-Generierung, Qualifizierung, Angebotserstellung, Nachverfolgung, Abschluss. Jeder Schritt messbar, kein Lead vergessen." },
    { title: "Account Management System", text: "Systematische Betreuung der Top-Kunden: Quartalsgespräche, Cross-Selling-Analyse, Zufriedenheitsmessung, Upselling-Potenzial. Der AI Sales Lead macht Bestandskundenmanagement zum Umsatztreiber." },
    { title: "Datenbasierte Preisverhandlung", text: "Der AI Sales Lead liefert für jede Verhandlung: Kundenwert, Bestellhistorie, Margenbeitrag, Vergleich mit ähnlichen Kunden. Du verhandelst aus einer Position des Wissens." },
  ],
  useCases: [
    { title: "B2B-Neukundenakquise für einen Grosshändler", text: "Identifikation von 200 potenziellen Neukunden, automatisierte Erstansprache, Qualifizierung und Terminvereinbarung. Der AI Sales Lead hat die Pipeline aufgebaut. 18 Neukunden in 6 Monaten, Durchschnitts-Erstbestellung: CHF 8'500." },
    { title: "Kundenreaktivierung", text: "Analyse inaktiver Kunden (kein Kauf seit 6+ Monaten), personalisierte Reaktivierungs-Kampagne. 25% der inaktiven Kunden reaktiviert, Umsatzrückgewinnung: CHF 120'000." },
    { title: "Staffelpreis-Optimierung", text: "Analyse von Rabattstrukturen über alle Kunden. Identifikation von 15 Kunden mit überhöhten Rabatten. Schrittweise Anpassung mit dem AI Sales Lead als Verhandlungsunterstützung. Margensteigerung: CHF 45'000/Jahr." },
  ],
  whyKaderOS: "Handelsvertrieb ist Beziehung plus Prozess. KaderOS liefert den Prozess, damit du dich auf die Beziehung konzentrieren kannst. Und weil unser AI Sales Lead den Schweizer Markt kennt, weiss er: Vertrauen aufbauen geht vor hartem Verkauf.",
  faqs: [
    { question: "Kann der AI Sales Lead auch Offerten erstellen?", answer: "Ja. Standardisierte Offerten mit kundenspezifischen Preisen, Rabatten und Konditionen. Der AI Sales Lead füllt die Templates automatisch aus — du musst nur noch prüfen und senden." },
    { question: "Funktioniert das auch für B2C-Handel?", answer: "Für B2C fokussiert der AI Sales Lead auf andere Hebel: Warenkorboptimierung, E-Mail-Marketing, Kundenbindungsprogramme. Die Prinzipien sind ähnlich, die Taktiken anders." },
    { question: "Wie integriert sich das mit meinem ERP?", answer: "KaderOS kann Kundendaten und Bestellhistorie aus deinem ERP importieren. Der AI Sales Lead arbeitet mit deinen echten Daten — keine separate Datenpflege nötig." },
  ],
  ctaText: "AI Sales Lead für dein Handelsunternehmen aufsetzen",
  relatedRollen: ["cto-fuer-handel", "cmo-fuer-handel", "cfo-fuer-handel", "content-lead-fuer-handel"],
  relatedBranchen: ["sales-lead-fuer-logistik", "sales-lead-fuer-immobilien", "sales-lead-fuer-handwerk"],
};

const salesHandwerk: AITeamPage = {
  slug: "sales-lead-fuer-handwerk",
  rolle: "sales-lead", rolleLabel: "Sales Lead", branche: "handwerk", brancheLabel: "Handwerk",
  metaTitle: "AI Sales Lead für Handwerk — Aufträge gewinnen und Offerten optimieren | KaderOS",
  metaDescription: "AI Sales Lead für Handwerker: Anfrage-Management, Offerten-Beschleunigung und Nachverfolgung. Mehr Aufträge, bessere Auslastung.",
  h1: "AI Sales Lead für Handwerk — KaderOS",
  intro: "Im Handwerk ist Verkauf Chefsache — und damit das erste, was liegen bleibt. Anfragen stapeln sich, Offerten gehen verspätet raus, Follow-ups finden nicht statt. Ein AI Sales Lead von KaderOS sorgt dafür, dass keine Anfrage unbeantwortet bleibt und jede Offerte nachverfolgt wird.",
  challenges: [
    { title: "Langsame Offerten kosten Aufträge", text: "Der Kunde fragt bei drei Handwerkern an. Wer zuerst eine solide Offerte schickt, gewinnt meistens. Aber du steckst auf der Baustelle und kommst erst abends zum Bürokram. Bis deine Offerte rausgeht, hat die Konkurrenz schon zugeschlagen." },
    { title: "Kein Überblick über Anfragen", text: "Anfragen kommen per Telefon, E-Mail, WhatsApp, Renovero. Sie landen in verschiedenen Systemen — oder im Kopf. Nichts wird systematisch erfasst, Prioritäten sind unklar, und manche Anfragen werden schlicht vergessen." },
    { title: "Offerten werden nicht nachverfolgt", text: "Du schickst eine Offerte und wartest. Kein Follow-up nach einer Woche, kein zweiter Kontakt. Vielleicht hat der Kunde die Offerte nicht gesehen. Vielleicht hat er eine Frage. Du wirst es nie erfahren." },
  ],
  solutions: [
    { title: "Zentrales Anfrage-Management", text: "Dein AI Sales Lead erfasst alle Anfragen in einem System — egal woher sie kommen. Jede Anfrage wird qualifiziert und priorisiert: Dringlichkeit, Auftragswert, Passung. Du weisst immer, was zuerst dran ist." },
    { title: "Schnelle Offerten-Erstellung", text: "Standardisierte Offerten-Templates, die sich mit Kundenangaben füllen. Materialpreise aktuell, Leistungspositionen vordefiniert, Kalkulationsbasis hinterlegt. Offerte raus in 30 Minuten statt 3 Tagen." },
    { title: "Automatisches Follow-up", text: "Der AI Sales Lead verfolgt jede Offerte automatisch nach: Lesebestätigung, freundliche Erinnerung nach 5 Tagen, Rückfrage nach 14 Tagen. Kein Auftrag geht verloren, weil du den Rückruf vergessen hast." },
  ],
  useCases: [
    { title: "Offerten-Beschleunigung für einen Schreiner", text: "Von durchschnittlich 5 Tagen auf 6 Stunden Offerten-Reaktionszeit. Standardisierte Module für Küchen, Schränke, Türen. Auftragsquote: von 25% auf 40%. Umsatzplus: CHF 80'000 im ersten Jahr." },
    { title: "Renovero-Anfragen-Management", text: "Alle Portal-Anfragen automatisch ins System übernommen, qualifiziert und priorisiert. Nur passende Anfragen werden bearbeitet — mit schneller, professioneller Antwort. Conversion Rate von Renovero-Anfragen: verdoppelt." },
    { title: "Saisonale Auslastungsplanung", text: "In der Hochsaison: selektive Anfrage-Annahme nach Auftragswert und Marge. In der Nebensaison: aktive Akquise und Sonderangebote. Der AI Sales Lead steuert die Auslastung übers ganze Jahr." },
  ],
  whyKaderOS: "Handwerker haben keine Zeit für komplexe Sales-Tools. KaderOS ist einfach: Anfrage rein, Offerte raus, Follow-up automatisch. Alles auf dem Handy nutzbar, zwischen zwei Baustellen. So einfach, wie eine WhatsApp-Nachricht — aber mit der Power eines professionellen Vertriebssystems.",
  faqs: [
    { question: "Muss ich etwas am Computer machen?", answer: "Minimal. Der AI Sales Lead ist mobiloptimiert. Du kannst Anfragen prüfen, Offerten freigeben und Status checken — alles vom Handy. Die schwerste Arbeit erledigt KaderOS im Hintergrund." },
    { question: "Kann der AI Sales Lead auch Absagen professionell formulieren?", answer: "Ja. Wenn du eine Anfrage nicht annehmen kannst: höfliche Absage, optional mit Empfehlung eines Kollegen. So bleibst du auch bei Absagen professionell und im Gespräch." },
    { question: "Wie verhindere ich, dass der AI Sales Lead zu viele Aufträge akquiriert?", answer: "Du definierst deine Kapazität. Der AI Sales Lead berücksichtigt deine aktuelle Auslastung und priorisiert Anfragen nach Wert und Passung. Mehr Aufträge annehmen als du bewältigen kannst, passiert nicht." },
  ],
  ctaText: "AI Sales Lead für deinen Handwerksbetrieb aufsetzen",
  relatedRollen: ["cto-fuer-handwerk", "cmo-fuer-handwerk", "cfo-fuer-handwerk", "content-lead-fuer-handwerk"],
  relatedBranchen: ["sales-lead-fuer-gastronomie", "sales-lead-fuer-handel", "sales-lead-fuer-immobilien"],
};

const salesBeratung: AITeamPage = {
  slug: "sales-lead-fuer-beratung",
  rolle: "sales-lead", rolleLabel: "Sales Lead", branche: "beratung", brancheLabel: "Beratung",
  metaTitle: "AI Sales Lead für Beratung — Pipeline-Management und Proposal-Automation | KaderOS",
  metaDescription: "AI Sales Lead für Beratung: Opportunity-Management, Proposals und Win-Rate-Optimierung. Systematisch akquirieren statt zufällig gewinnen.",
  h1: "AI Sales Lead für Beratung — KaderOS",
  intro: "In Beratungsfirmen ist Akquise Partnersache — und damit unstrukturiert, personenabhängig und schwer skalierbar. Ein AI Sales Lead von KaderOS bringt Vertriebsdisziplin in dein Consulting-Business, ohne den persönlichen Touch zu verlieren.",
  challenges: [
    { title: "Pipeline im Kopf des Partners", text: "Jeder Partner hat 'seine' Opportunities — im Kopf oder in Notizen. Es gibt keine gemeinsame Pipeline, keine Prognose, keine Pipeline-Reviews. Wenn ein Partner ausfällt, sind seine Opportunities unsichtbar." },
    { title: "Proposals dauern zu lange", text: "Ein Proposal für ein grösseres Beratungsmandat braucht Tage: Individuelles Anschreiben, Team-Vorstellung, Methodik, Referenzen, Pricing. Jedes Mal von Null — weil es keine Templates oder Proposal-Library gibt." },
    { title: "Win-Rate stagniert", text: "Von 10 Proposals werden 3 gewonnen. Aber warum genau diese 3? Ohne systematische Analyse von Gewinn- und Verlustgründen fehlt die Lernschleife. Die Win-Rate verbessert sich nicht." },
  ],
  solutions: [
    { title: "Gemeinsame Opportunity-Pipeline", text: "Dein AI Sales Lead etabliert eine firmenweite Pipeline: Alle Opportunities erfasst, qualifiziert, mit Wahrscheinlichkeit gewichtet. Monatliche Pipeline-Reviews werden zur Routine." },
    { title: "Proposal-Engine", text: "Modularisierte Proposals aus wiederverwendbaren Bausteinen: Firmenprofil, Team-Bios, Methodik-Module, Case Studies, Pricing-Templates. Der AI Sales Lead assembliert in Stunden statt Tagen." },
    { title: "Win/Loss-Analyse", text: "Systematische Analyse nach jedem gewonnenen und verlorenen Proposal: Was hat überzeugt? Was war das Problem? Der AI Sales Lead identifiziert Muster und verbessert die Win-Rate kontinuierlich." },
  ],
  useCases: [
    { title: "Pipeline-Aufbau für eine 15-Personen-Beratung", text: "Einführung einer gemeinsamen Pipeline mit Stage-Gates. Erstmals Transparenz über alle Opportunities. Ergebnis: 20% mehr Proposals pro Quartal, weil Opportunities nicht mehr 'vergessen' werden." },
    { title: "Proposal-Automation", text: "Aufbau einer modularen Proposal-Bibliothek: 15 Methodik-Module, 20 Case Studies, 8 Pricing-Templates. Proposal-Erstellungszeit: von 3 Tagen auf 4 Stunden. Qualität: konsistenter und überzeugender." },
    { title: "Win-Rate-Steigerung", text: "Systematische Win/Loss-Analyse über 6 Monate. Hauptgrund für Verluste: zu generische Proposals. Nach Personalisierung: Win-Rate von 30% auf 42%." },
  ],
  whyKaderOS: "Consulting-Sales ist Relationship-driven — aber Prozess-enabled. KaderOS liefert den Prozess: Pipeline-Transparenz, schnelle Proposals, systematisches Lernen. Der Partner bleibt die Beziehungsperson, der AI Sales Lead sorgt für die Maschinerie im Hintergrund.",
  faqs: [
    { question: "Stört das die Partner-Autonomie?", answer: "Nein. Der AI Sales Lead unterstützt Partner, er kontrolliert sie nicht. Die Pipeline ist ein gemeinsames Tool, keine Überwachung. Jeder Partner profitiert von besseren Proposals und strukturiertem Follow-up." },
    { question: "Kann der AI Sales Lead auch RFPs bearbeiten?", answer: "Ja. Der AI Sales Lead hilft bei der Strukturierung von RFP-Antworten: Compliance-Check, Inhalts-Zuordnung zu Proposal-Modulen, Koordination der Beiträge verschiedener Team-Mitglieder." },
    { question: "Wie misst der AI Sales Lead den Vertriebserfolg?", answer: "Pipeline-Wert, Conversion-Rate pro Stage, Win-Rate, durchschnittlicher Deal-Wert, Sales Cycle Length. Alle KPIs transparent im Dashboard — Basis für kontinuierliche Verbesserung." },
  ],
  ctaText: "AI Sales Lead für deine Beratungsfirma aufsetzen",
  relatedRollen: ["cto-fuer-beratung", "cmo-fuer-beratung", "cfo-fuer-beratung", "content-lead-fuer-beratung"],
  relatedBranchen: ["sales-lead-fuer-treuhand", "sales-lead-fuer-it", "sales-lead-fuer-immobilien"],
};

const salesIT: AITeamPage = {
  slug: "sales-lead-fuer-it",
  rolle: "sales-lead", rolleLabel: "Sales Lead", branche: "it", brancheLabel: "IT",
  metaTitle: "AI Sales Lead für IT — SaaS-Sales und B2B-Pipeline | KaderOS",
  metaDescription: "AI Sales Lead für IT: Product-Qualified Leads, Demo-Optimierung und Enterprise-Sales. Mehr MRR durch systematischen Vertrieb.",
  h1: "AI Sales Lead für IT — KaderOS",
  intro: "IT-Vertrieb ist vielschichtig: Self-Serve Signups, PLG-Conversion, Demo-gestützer Sales, Enterprise-Deals. Jeder Kanal braucht einen anderen Ansatz. Ein AI Sales Lead von KaderOS orchestriert deinen gesamten Sales-Funnel — vom Free-Trial bis zum Enterprise-Vertrag.",
  challenges: [
    { title: "PLG-zu-Sales-Handoff funktioniert nicht", text: "Nutzer melden sich an, testen das Produkt — und dann? Der Übergang von Self-Serve zu Sales-Assisted ist der kritischste Moment. Ohne klare Trigger und Prozesse bleiben potenzielle Deals stecken." },
    { title: "Demo-Conversion zu niedrig", text: "Du zeigst eine Demo, der Prospect ist beeindruckt — und meldet sich nie wieder. Kein Follow-up-Prozess, keine Einwand-Behandlung, keine Dringlichkeit. Die Demo-zu-Deal-Conversion blutet." },
    { title: "Enterprise-Sales ohne Playbook", text: "Ein grosser Deal kündigt sich an. Plötzlich brauchst du: Security Questionnaire, SOC2-Nachweis, Multi-Stakeholder-Verkauf, Procurement-Prozess. Ohne Enterprise-Playbook improvisierst du bei jedem Deal von Neuem." },
  ],
  solutions: [
    { title: "PLG-Signals und Sales-Trigger", text: "Dein AI Sales Lead definiert Product-Qualified-Lead-Kriterien: Feature-Nutzung, Teamgrösse, Aktivierungsgrad. Wenn ein Nutzer PQL-Status erreicht, startet automatisch die Sales-Sequenz." },
    { title: "Demo-Optimierung und Follow-up", text: "Strukturierter Demo-Prozess: Discovery Call → Demo → Proposal → Follow-up-Sequenz → Close. Der AI Sales Lead optimiert jeden Schritt und stellt sicher, dass kein Deal im Vakuum stirbt." },
    { title: "Enterprise-Sales-Playbook", text: "Vorgefertigte Prozesse für Enterprise-Deals: Security Review, Legal Review, Multi-Threading, Champion Building, Executive Sponsorship. Der AI Sales Lead führt dich durch den komplexen Enterprise-Verkaufszyklus." },
  ],
  useCases: [
    { title: "PQL-Definition und Sales-Automation", text: "Definition von PQL-Kriterien basierend auf Nutzungsdaten. Automatische Benachrichtigung und personalisierte Outreach-Sequenz bei PQL-Status. PLG-zu-Paid-Conversion: +60%." },
    { title: "Demo-zu-Close-Optimierung", text: "Analyse des Demo-Funnels: Drop-off nach Discovery, nach Demo, nach Proposal. Gezielte Intervention an jedem Punkt. Demo-zu-Deal-Rate: von 15% auf 28%." },
    { title: "Erster Enterprise-Deal", text: "Begleitung eines 6-stelligen Enterprise-Deals: Security Questionnaire beantwortet, Stakeholder-Map erstellt, Executive-Dinner organisiert, Vertragsverhandlung geführt. Deal gewonnen in 4 Monaten." },
  ],
  whyKaderOS: "IT-Sales verändert sich ständig: PLG, Sales-Assisted, Enterprise — die Grenzen verschwimmen. KaderOS versteht alle Modelle und orchestriert den richtigen Ansatz für den richtigen Kunden. Und weil wir selbst eine SaaS-Firma sind, kennen wir die Herausforderungen aus eigener Erfahrung.",
  faqs: [
    { question: "Kann der AI Sales Lead auch bei Pricing-Gesprächen helfen?", answer: "Ja. Der AI Sales Lead bereitet Pricing-Verhandlungen vor: Kundenwert-Analyse, Vergleichbare Deals, Discount-Grenzen, Paketierungs-Optionen. Du gehst vorbereitet in jede Verhandlung." },
    { question: "Integriert sich das mit unserem CRM?", answer: "KaderOS integriert sich mit gängigen CRMs wie HubSpot, Salesforce und Pipedrive. Product-Usage-Daten fliessen automatisch in die Lead-Bewertung ein." },
    { question: "Wie geht der AI Sales Lead mit langen Enterprise-Sales-Cycles um?", answer: "Lange Cycles brauchen Persistenz und Struktur. Der AI Sales Lead hält den Kontakt warm: regelmässige Touchpoints, relevant Content, Stakeholder-Updates. 6-12 Monate Sales Cycle? Kein Problem." },
  ],
  ctaText: "AI Sales Lead für dein IT-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-it", "cmo-fuer-it", "cfo-fuer-it", "content-lead-fuer-it"],
  relatedBranchen: ["sales-lead-fuer-beratung", "sales-lead-fuer-pharma", "sales-lead-fuer-handel"],
};

const salesPharma: AITeamPage = {
  slug: "sales-lead-fuer-pharma",
  rolle: "sales-lead", rolleLabel: "Sales Lead", branche: "pharma", brancheLabel: "Pharma",
  metaTitle: "AI Sales Lead für Pharma — Compliant Sales und KOL-Management | KaderOS",
  metaDescription: "AI Sales Lead für Pharma: HCP-Engagement, Aussendienst-Koordination und compliant Sales-Prozesse. Mehr Reichweite, weniger Risiko.",
  h1: "AI Sales Lead für Pharma — KaderOS",
  intro: "Pharma-Vertrieb ist hochreguliert, beziehungsgetrieben und zunehmend digital. Ärzte werden schwerer erreichbar, Compliance-Anforderungen steigen, und der klassische Aussendienst reicht nicht mehr. Ein AI Sales Lead von KaderOS modernisiert deinen Pharma-Vertrieb — compliant und effektiv.",
  challenges: [
    { title: "Ärzte-Zugang schwindet", text: "Immer mehr Praxen und Kliniken beschränken den Zugang für Aussendienst. Die Kontaktzeit pro Arzt sinkt Jahr für Jahr. Ohne digitale Ergänzung erreichst du deine Zielärzte nicht mehr." },
    { title: "Compliance-Regeln verkomplizieren Sales", text: "Jeder Kontakt, jedes Material, jede Einladung muss dokumentiert und compliant sein. Pharma-Kodex, Sunshine Act, HWG — der Compliance-Aufwand frisst Sales-Zeit." },
    { title: "Omnichannel statt nur Aussendienst", text: "E-Detailing, Webinare, E-Mail, Social Media, Kongresse — HCPs erwarten Omnichannel-Engagement. Aber die meisten Pharma-Vertriebe sind auf Aussendienst trainiert und kämpfen mit der Orchestrierung." },
  ],
  solutions: [
    { title: "Omnichannel HCP-Engagement", text: "Dein AI Sales Lead orchestriert die Kundenansprache über alle Kanäle: Aussendienst-Planung, E-Detailing-Sequenzen, Webinar-Einladungen, Follow-up-Kampagnen. Jeder Arzt bekommt den Kanal, den er bevorzugt." },
    { title: "Compliance-automatisierter Sales-Prozess", text: "Jeder Schritt im Sales-Prozess wird automatisch auf Compliance geprüft: Materialien freigegeben? Einladungsgrenzen eingehalten? Dokumentation vollständig? Der AI Sales Lead verhindert Verstösse, bevor sie passieren." },
    { title: "KOL-Engagement-Tracking", text: "Systematisches Management von Key Opinion Leaders: Kontakthistorie, Engagement-Level, Scientific Exchange, Advisory Boards. Jede Interaktion dokumentiert, jeder nächste Schritt geplant." },
  ],
  useCases: [
    { title: "Omnichannel-Kampagne für einen Produktlaunch", text: "Orchestrierung über Aussendienst, E-Detailing und Webinare für einen Neuprodukt-Launch. Der AI Sales Lead hat die Kanalmix-Strategie definiert und das Timing orchestriert. Awareness bei Zielärzten: 85% in 3 Monaten." },
    { title: "Aussendienst-Routenoptimierung", text: "Optimierung der Besuchsplanung: Priorisierung nach Verschreibungspotenzial, geografische Routenoptimierung, Besuchsfrequenz nach Arztsegment. Kontakte pro Tag: +30%, Fahrzeit: -25%." },
    { title: "Compliance-Dashboard", text: "Echtzeit-Dashboard über alle Sales-Aktivitäten: Material-Nutzung, Einladungen, Samples, Zuwendungen. Automatische Warnung bei Grenzwert-Annäherung. Null Compliance-Verstösse seit Implementierung." },
  ],
  whyKaderOS: "Pharma-Vertrieb ohne Compliance-Verständnis ist ein Risiko. KaderOS bringt beides zusammen: effektiven Sales und eingebaute Compliance. Unser AI Sales Lead kennt die Schweizer Pharma-Regulierung und die Anforderungen von Swissmedic, scienceindustries und den kantonalen Heilmittelgesetzgebungen.",
  faqs: [
    { question: "Kann der AI Sales Lead auch Sample-Management übernehmen?", answer: "Der AI Sales Lead trackt Sample-Verteilung pro Arzt, stellt Compliance mit Sample-Regulierung sicher und dokumentiert alles für die Auditierung. Die physische Verteilung bleibt beim Aussendienst." },
    { question: "Wie integriert sich das mit unserem CRM (Veeva, Salesforce)?", answer: "KaderOS kann sich mit Veeva CRM und Salesforce Health Cloud integrieren. Der AI Sales Lead ergänzt dein bestehendes System, statt es zu ersetzen." },
    { question: "Funktioniert das auch für OTC-Produkte?", answer: "Ja. Für OTC gelten andere Regeln (Apotheken-Akquise, POS-Material, Consumer-Marketing). Der AI Sales Lead passt seinen Ansatz an: B2B-Sales für den Kanal, unterstützt durch Consumer-Pull." },
  ],
  ctaText: "AI Sales Lead für dein Pharma-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-pharma", "cmo-fuer-pharma", "cfo-fuer-pharma", "content-lead-fuer-pharma"],
  relatedBranchen: ["sales-lead-fuer-it", "sales-lead-fuer-beratung", "sales-lead-fuer-handel"],
};

const salesLogistik: AITeamPage = {
  slug: "sales-lead-fuer-logistik",
  rolle: "sales-lead", rolleLabel: "Sales Lead", branche: "logistik", brancheLabel: "Logistik",
  metaTitle: "AI Sales Lead für Logistik — Frachtakquise und Kundenbindung | KaderOS",
  metaDescription: "AI Sales Lead für Logistik: Verlader-Akquise, Ausschreibungs-Management und Kundenbindung. Mehr Frachtvolumen, stabilere Erträge.",
  h1: "AI Sales Lead für Logistik — KaderOS",
  intro: "Logistik-Vertrieb heisst: Verlader überzeugen, Ausschreibungen gewinnen, Bestandskunden halten. In einem preissensitiven Markt gewinnt, wer professionell akquiriert, schnell reagiert und zuverlässig liefert. Ein AI Sales Lead von KaderOS professionalisiert deinen Logistik-Vertrieb.",
  challenges: [
    { title: "Ausschreibungen ohne Struktur", text: "Transport-Ausschreibungen kommen oft kurzfristig und erfordern schnelle, detaillierte Angebote. Ohne Prozess und Templates wird jede Ausschreibung zum Kraftakt — und die Qualität der Angebote leidet." },
    { title: "Preiskampf als Standardsituation", text: "Verlader vergleichen Preise — das ist ihr Job. Aber wenn du nur über den Preis argumentierst, verlierst du immer gegen den Billigsten. Differenzierung über Service, Zuverlässigkeit und Transparenz muss kommuniziert werden." },
    { title: "Kundenverlust ohne Vorwarnung", text: "Ein langjähriger Kunde kündigt den Rahmenvertrag — überraschend. Dabei gab es Anzeichen: sinkende Volumina, unbeantwortete Beschwerden, Preisvergleiche. Ohne Frühwarnsystem bemerkst du die Abwanderung zu spät." },
  ],
  solutions: [
    { title: "Ausschreibungs-Engine", text: "Dein AI Sales Lead strukturiert den Ausschreibungsprozess: Templates, Kalkulationsmodule, Referenzen-Pool, schnelle Angebotslegung. Du beantwortest Ausschreibungen in Stunden statt Tagen." },
    { title: "Value-based Selling", text: "Der AI Sales Lead hilft dir, über Wert statt Preis zu verkaufen: Service-Level-Dokumentation, Zuverlässigkeitsstatistiken, Schadensquoten, Kundenreferenzen. Dein Angebot wird unvergleichbar statt billig." },
    { title: "Churn-Prevention für Bestandskunden", text: "Automatisches Monitoring von Volumina-Entwicklung, Beschwerdehäufigkeit und Zahlungsverhalten. Bei kritischen Signalen: Frühwarnung und Rettungsmassnahmen, bevor der Kunde kündigt." },
  ],
  useCases: [
    { title: "Ausschreibungs-Gewinnrate gesteigert", text: "Standardisierte Ausschreibungs-Antworten mit modularen Bausteinen. Response-Zeit: von 5 Tagen auf 24 Stunden. Gewinnrate bei Ausschreibungen: von 15% auf 25%." },
    { title: "Wert-Argumentation implementiert", text: "Sales-Toolkit mit Service-KPIs: Pünktlichkeitsrate 98.5%, Schadensquote 0.02%, 24h-Support. Prospekte, die über Wert argumentieren statt über Preis. Average Deal Value: +18%." },
    { title: "Kunden-Frühwarnsystem", text: "Monitoring-Dashboard für Top-20-Kunden: Volumina-Trend, Reklamationen, Zahlungsverhalten. 3 Kunden im Risikostatus identifiziert, proaktive Massnahmen ergriffen. Alle 3 Kunden gehalten." },
  ],
  whyKaderOS: "Logistik-Vertrieb ist ein Zahlengeschäft: Volumen, Preise, Laufzeiten, Schadenquoten. KaderOS gibt dir die Daten, die dich in Verhandlungen stark machen. Und den Prozess, der sicherstellt, dass kein Deal durch Unstrukturiertheit verloren geht.",
  faqs: [
    { question: "Kann der AI Sales Lead auch Spottmarkt-Anfragen bearbeiten?", answer: "Ja. Für Spottmarkt-Anfragen optimiert der AI Sales Lead die Reaktionszeit und Preis-Kalkulation: aktuelle Marktpreise, Kapazitätsverfügbarkeit, Zuschlagsempfehlung. Schneller als die Konkurrenz anbieten." },
    { question: "Integriert sich das mit Frachtenbörsen?", answer: "Der AI Sales Lead kann Anfragen von Frachtenbörsen (TIMOCOM, Transporeon) automatisch ins System übernehmen und qualifizieren. Schnelle Angebote, professionelles Follow-up." },
    { question: "Wie funktioniert das mit Rahmenverträgen?", answer: "Der AI Sales Lead managt den gesamten Lifecycle von Rahmenverträgen: Verhandlung, Dokumentation, Performance-Monitoring, Erneuerung. Kein Vertrag läuft mehr unbemerkt aus." },
  ],
  ctaText: "AI Sales Lead für dein Logistik-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-logistik", "cmo-fuer-logistik", "cfo-fuer-logistik", "content-lead-fuer-logistik"],
  relatedBranchen: ["sales-lead-fuer-handel", "sales-lead-fuer-pharma", "sales-lead-fuer-handwerk"],
};

const salesBildung: AITeamPage = {
  slug: "sales-lead-fuer-bildung",
  rolle: "sales-lead", rolleLabel: "Sales Lead", branche: "bildung", brancheLabel: "Bildung",
  metaTitle: "AI Sales Lead für Bildung — Kursbuchungen und B2B-Bildungsverkauf | KaderOS",
  metaDescription: "AI Sales Lead für Bildungsanbieter: Teilnehmer-Conversion, B2B-Bildungsverkauf und Anmeldeoptimierung. Mehr Buchungen, vollere Kurse.",
  h1: "AI Sales Lead für Bildung — KaderOS",
  intro: "Bildungsverkauf ist beratungsintensiv: Interessenten haben Fragen, brauchen Orientierung und wollen oft mehrfach überzeugt werden. Gleichzeitig gibt es B2B-Potenzial: Firmenschulungen, Inhouse-Trainings, Rahmenverträge. Ein AI Sales Lead von KaderOS optimiert beide Verkaufskanäle.",
  challenges: [
    { title: "Interessenten gehen im Beratungsprozess verloren", text: "Ein Interessent ruft an, hat Fragen zum Kurs. Informationen werden mündlich gegeben, kein Follow-up geplant, kein Material gesendet. Drei Wochen später bucht er bei der Konkurrenz — die schneller war." },
    { title: "B2B-Bildungsverkauf unstrukturiert", text: "Firmenschulungen sind lukrativ, aber der Verkaufsprozess ist lang: Bedarfsanalyse, Angebot, Verhandlung, Vertrag. Ohne Sales-Prozess bleiben B2B-Opportunities liegen." },
    { title: "Saisonale Buchungsschwankungen", text: "Kurse im September sind übervoll, im Februar halb leer. Es gibt keine systematische Strategie, um Nebensaison-Buchungen zu steigern oder Wartelisten für beliebte Kurse zu managen." },
  ],
  solutions: [
    { title: "Beratungs-Pipeline für Interessenten", text: "Dein AI Sales Lead richtet einen strukturierten Beratungsprozess ein: Erstanfrage → Info-Material → Beratungsgespräch → Anmeldelink. Jeder Interessent wird begleitet, kein Kontakt geht verloren." },
    { title: "B2B-Sales-Prozess für Firmenkunden", text: "Systematische Akquise von Firmenschulungen: Bedarfsermittlung, massgeschneiderte Angebote, Vertragsverhandlung. Der AI Sales Lead managt die Pipeline und sorgt für professionelles Follow-up." },
    { title: "Buchungsoptimierung und Yield-Management", text: "Frühbucher-Rabatte, Last-Minute-Angebote, Wartelisten-Management. Der AI Sales Lead maximiert die Auslastung über das ganze Jahr." },
  ],
  useCases: [
    { title: "Beratungs-Conversion-Rate verdoppelt", text: "Strukturierter Beratungsprozess mit automatisiertem Follow-up. Jeder Interessent erhält innert 2 Stunden eine personalisierte E-Mail mit Kursinfos. Beratungs-to-Buchung-Rate: von 15% auf 32%." },
    { title: "B2B-Firmenkunden-Programm", text: "Akquise von 8 Firmenkunden für regelmässige Inhouse-Trainings. Der AI Sales Lead hat die Akquise gesteuert, Angebote erstellt und Rahmenverträge koordiniert. B2B-Umsatzanteil: von 5% auf 25%." },
    { title: "Wartelisten-zu-Buchung-Conversion", text: "Automatisierte Kommunikation für Wartelisten-Kandidaten: alternative Termine, neue Kursangebote, Prioritäts-Buchung. 60% der Wartelisten-Interessenten buchen einen alternativen Kurs." },
  ],
  whyKaderOS: "Bildungsverkauf ist Beratung, nicht Verkauf. KaderOS versteht diesen Unterschied. Unser AI Sales Lead berät Interessenten, statt sie zu pushen. Er beantwortet Fragen, liefert Informationen und macht den Anmeldeprozess reibungslos. Und im B2B-Bereich bringt er die Professionalität mit, die Firmenkunden erwarten.",
  faqs: [
    { question: "Kann der AI Sales Lead auch Stipendien-Anfragen bearbeiten?", answer: "Ja. Der AI Sales Lead kann Stipendien-Anfragen strukturiert bearbeiten: Unterlagen sammeln, Kriterien prüfen, Rückmeldung geben. Transparenz und Schnelligkeit im Stipendien-Prozess verbessern das Image." },
    { question: "Funktioniert das auch für Online-Kurse?", answer: "Ja. Für Online-Kurse fokussiert der AI Sales Lead auf andere Hebel: Trial-Access, Webinar-Funnels, automatisierte Onboarding-Sequenzen. Die Prinzipien sind gleich, die Taktiken digital." },
    { question: "Wie misst der AI Sales Lead den Erfolg?", answer: "Anfragen, Beratungsgespräche, Buchungsrate, B2B-Pipeline, Revenue pro Kurs — alle KPIs transparent im Dashboard. Du siehst genau, wo der Funnel optimiert werden kann." },
  ],
  ctaText: "AI Sales Lead für deine Bildungseinrichtung aufsetzen",
  relatedRollen: ["cto-fuer-bildung", "cmo-fuer-bildung", "cfo-fuer-bildung", "content-lead-fuer-bildung"],
  relatedBranchen: ["sales-lead-fuer-beratung", "sales-lead-fuer-pharma", "sales-lead-fuer-gastronomie"],
};

// ─── Content Lead Pages (compact) ─────────────────────────────

const contentTreuhand: AITeamPage = {
  slug: "content-lead-fuer-treuhand",
  rolle: "content-lead", rolleLabel: "Content Lead", branche: "treuhand", brancheLabel: "Treuhand",
  metaTitle: "AI Content Lead für Treuhand — Fachcontent für Mandantengewinnung | KaderOS",
  metaDescription: "AI Content Lead für Treuhand: Steuertipps, Fachbeiträge und Newsletter. Expertise zeigen, Mandanten gewinnen. Swiss Made.",
  h1: "AI Content Lead für Treuhand — KaderOS",
  intro: "Treuhänder sind Experten — aber ihre Expertise bleibt unsichtbar. Fachbeiträge, Steuertipps, Mandanten-Newsletter: Content zeigt Kompetenz und zieht neue Mandanten an. Ein AI Content Lead von KaderOS macht dein Wissen sichtbar und deine Expertise zur Marke.",
  challenges: [
    { title: "Expertise vorhanden, Sichtbarkeit nicht", text: "Du kennst das Steuerrecht in- und auswendig, hast jahrelange Erfahrung mit KMU-Buchhaltung — aber online weiss das niemand. Dein Wissen bleibt in Mandatsgesprächen hängen, statt potenzielle Kunden zu überzeugen." },
    { title: "Keine Zeit für Content", text: "Zwischen Jahresabschlüssen und MWST-Deadlines bleibt null Zeit für Blog-Beiträge oder LinkedIn-Posts. Content-Produktion ist ein Luxus, den sich ein kleines Büro scheinbar nicht leisten kann." },
    { title: "Tonalität: Fachlich korrekt UND verständlich", text: "Steuerinhalte müssen fachlich korrekt sein — sonst Reputationsschaden. Gleichzeitig müssen sie verständlich sein für Nicht-Experten. Diese Balance zu finden, ist zeitintensiv und schwierig." },
  ],
  solutions: [
    { title: "Redaktionsplan für Treuhand-Content", text: "Dein AI Content Lead erstellt einen Jahresplan: Steuertipps zur Steuersaison, MWST-Updates nach Quartal, Jahresabschluss-Guides im Herbst. Jeder Beitrag ist thematisch und zeitlich geplant." },
    { title: "Fachcontent auf zwei Niveaus", text: "Der AI Content Lead erstellt jeden Inhalt in zwei Versionen: eine fachlich detaillierte für Experten-Positionierung, eine vereinfachte für Mandanten-Kommunikation. Du entscheidest, welche wo erscheint." },
    { title: "Mandanten-Newsletter-Automatisierung", text: "Monatlicher Newsletter mit Steuertipps, Fristen und Praxis-Insights. Der AI Content Lead erstellt, segmentiert und versendet. Du gibst 15 Minuten Input — der Rest ist automatisiert." },
  ],
  useCases: [
    { title: "Blog-Aufbau für ein Zürcher Treuhandbüro", text: "12 Fachbeiträge in 3 Monaten: Steuertipps, MWST-Praxis, Gründer-Guide. Der AI Content Lead hat recherchiert, geschrieben und SEO-optimiert. Organische Besucher: +300%, 5 neue Mandatsanfragen über den Blog." },
    { title: "LinkedIn-Content für den Partner", text: "Wöchentliche Fachbeiträge auf LinkedIn, ghostwritten vom AI Content Lead. Themen: aktuelle Steuerpraxis, Fallbeispiele, Branchen-Insights. 800 neue Follower in 4 Monaten, 2 Mandatsanfragen über LinkedIn." },
    { title: "Mandanten-Onboarding-Content", text: "Welcome-Kit für neue Mandanten: Was wir brauchen, wie wir arbeiten, was wann ansteht. Der AI Content Lead hat eine Onboarding-Serie erstellt, die Rückfragen um 60% reduziert." },
  ],
  whyKaderOS: "Treuhand-Content muss fachlich einwandfrei sein — das unterscheidet ihn von generischem Marketing-Content. KaderOS versteht die Materie und liefert Inhalte, die ein Treuhänder unterschreiben kann. Kein Buzzword-Salat, sondern substanzielle Fachkommunikation.",
  faqs: [
    { question: "Wer prüft die fachliche Korrektheit?", answer: "Der AI Content Lead erstellt fachlich fundierte Entwürfe basierend auf aktueller Gesetzgebung und Praxis. Du prüfst in einem kurzen Review — typischerweise 10-15 Minuten pro Beitrag. Die finale Verantwortung bleibt bei dir." },
    { question: "Kann der AI Content Lead auch in Französisch oder Italienisch?", answer: "Ja. Der AI Content Lead erstellt Content in allen Schweizer Landessprachen. Für mehrsprachige Büros werden die Inhalte nicht einfach übersetzt, sondern an die Zielsprache angepasst." },
    { question: "Wie bleibt der Content aktuell bei Gesetzesänderungen?", answer: "Der AI Content Lead verfolgt Änderungen im Schweizer Steuer- und Handelsrecht. Bei relevanten Änderungen wird ein Update-Beitrag vorgeschlagen und bestehende Inhalte auf Aktualität geprüft." },
  ],
  ctaText: "AI Content Lead für dein Treuhand-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-treuhand", "cmo-fuer-treuhand", "cfo-fuer-treuhand", "sales-lead-fuer-treuhand"],
  relatedBranchen: ["content-lead-fuer-beratung", "content-lead-fuer-immobilien", "content-lead-fuer-bildung"],
};

const contentImmobilien: AITeamPage = {
  slug: "content-lead-fuer-immobilien",
  rolle: "content-lead", rolleLabel: "Content Lead", branche: "immobilien", brancheLabel: "Immobilien",
  metaTitle: "AI Content Lead für Immobilien — Inserate, Marktberichte und Expertise | KaderOS",
  metaDescription: "AI Content Lead für Immobilien: Inserat-Texte, Marktanalysen und Quartier-Content. Mehr Sichtbarkeit, bessere Vermarktung.",
  h1: "AI Content Lead für Immobilien — KaderOS",
  intro: "Immobilien-Content ist vielfältig: Objektbeschreibungen, Marktberichte, Quartier-Guides, Eigentümer-Ratgeber. Jedes Stück Content hat einen konkreten Business-Zweck. Ein AI Content Lead von KaderOS produziert all diese Inhalte — konsistent, schnell und überzeugend.",
  challenges: [
    { title: "Inserate, die alle gleich klingen", text: "'Helle, moderne Wohnung in zentraler Lage' — dieses Inserat steht bei jedem Objekt. Ohne Storytelling und Differenzierung geht dein Inserat in der Masse unter. Professionelle Texte machen den Unterschied." },
    { title: "Markt-Know-how nicht kommuniziert", text: "Du kennst den lokalen Markt wie kein anderer. Aber dieses Wissen wird nicht nach aussen kommuniziert. Kein Blog, keine Marktberichte, keine Quartier-Analysen. Potenzielle Kunden sehen nicht, was du weisst." },
    { title: "Content-Produktion skaliert nicht", text: "Bei 20 neuen Inseraten pro Monat, einem Newsletter und Social-Media-Präsenz übersteigt die Content-Menge schnell die Kapazität. Qualität leidet, Deadlines werden verpasst, Konsistenz geht verloren." },
  ],
  solutions: [
    { title: "Premium-Inserat-Texte", text: "Dein AI Content Lead erstellt Inserat-Texte, die verkaufen: Storytelling statt Faktenliste, emotionale Benefits statt technische Details, klare Call-to-Actions. Jedes Objekt bekommt eine einzigartige Geschichte." },
    { title: "Marktberichte als Positionierungs-Tool", text: "Quartalsmässige Marktberichte für deine Region: Preisentwicklung, Trends, Prognosen. Der AI Content Lead recherchiert, analysiert und schreibt. Du positionierst dich als lokaler Marktexperte." },
    { title: "Skalierbare Content-Pipeline", text: "Der AI Content Lead managt die gesamte Content-Produktion: Inserate, Newsletter, Blog, Social Media. Alles nach deinem Brand Voice, mit konsistenter Qualität, egal wie viele Objekte kommen." },
  ],
  useCases: [
    { title: "Inserat-Qualität für ein ganzes Portfolio", text: "Professionelle Texte für 50 Inserate pro Monat: einzigartig, emotional, SEO-optimiert. Der AI Content Lead liefert innerhalb von 4 Stunden nach Objektdaten. Klickrate der Inserate: +35%." },
    { title: "Quartier-Guide-Serie", text: "12 detaillierte Quartier-Guides für Zürich: Lebensgefühl, Infrastruktur, Preislage, Zukunftsaussichten. Als SEO-Content und Verkaufs-Tool gleichzeitig nutzbar. 500+ monatliche organische Besucher pro Guide." },
    { title: "Eigentümer-Ratgeber", text: "Content-Serie 'Immobilie verkaufen in der Schweiz': 8 ausführliche Ratgeber-Artikel. Lead-Magnet für Eigentümer-Akquise. 200+ Downloads, 15 Bewertungsanfragen." },
  ],
  whyKaderOS: "Immobilien-Content muss visuell denken und emotional schreiben. KaderOS versteht das: Inserate, die man sehen kann, Marktberichte, die Vertrauen schaffen, und Guides, die echten Mehrwert bieten. Alles mit lokalem Bezug zum Schweizer Immobilienmarkt.",
  faqs: [
    { question: "Kann der AI Content Lead auch 3D-Rundgang-Texte erstellen?", answer: "Ja. Begleittexte für Matterport-Rundgänge, Room-by-Room-Beschreibungen, Highlight-Texte für einzelne Bereiche. Dein virtueller Rundgang bekommt das narrative Element, das überzeugt." },
    { question: "Wie geht der AI Content Lead mit der Inserat-Sprache um?", answer: "Der AI Content Lead kennt die Konventionen der Schweizer Immobilienbranche: 'Stockwerkeigentum' statt 'Eigentumswohnung', 'Minergie' korrekt erklärt, regionale Begriffe berücksichtigt. Professionell und marktkonform." },
    { question: "Kann der Content auch für mehrere Portale optimiert werden?", answer: "Ja. Der AI Content Lead erstellt Varianten für verschiedene Portale: kurze Version für ImmoScout, ausführliche für die eigene Website, Social-Media-Snippet für Instagram. Ein Objekt, optimale Texte pro Kanal." },
  ],
  ctaText: "AI Content Lead für dein Immobilien-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-immobilien", "cmo-fuer-immobilien", "cfo-fuer-immobilien", "sales-lead-fuer-immobilien"],
  relatedBranchen: ["content-lead-fuer-treuhand", "content-lead-fuer-handel", "content-lead-fuer-beratung"],
};

const contentGastronomie: AITeamPage = {
  slug: "content-lead-fuer-gastronomie",
  rolle: "content-lead", rolleLabel: "Content Lead", branche: "gastronomie", brancheLabel: "Gastronomie",
  metaTitle: "AI Content Lead für Gastronomie — Menütexte, Social und Storytelling | KaderOS",
  metaDescription: "AI Content Lead für Gastronomie: Menübeschreibungen, Social-Media-Content und Event-Kommunikation. Dein Betrieb erzählt Geschichten.",
  h1: "AI Content Lead für Gastronomie — KaderOS",
  intro: "Gastronomie ist Storytelling: das Gericht, die Zutaten, der Koch, die Geschichte. Aber dieses Storytelling findet meistens nicht statt. Die Menükarte ist funktional, Social Media sporadisch, und Events werden schlecht kommuniziert. Ein AI Content Lead von KaderOS erzählt deine Gastro-Geschichte.",
  challenges: [
    { title: "Menükarte verkauft nicht", text: "Die Menükarte ist oft das wichtigste Verkaufsinstrument — und das am meisten vernachlässigte. Langweilige Beschreibungen, keine Storytelling-Elemente, keine Upselling-Psychologie." },
    { title: "Social Media ist ein Zeitfresser", text: "Jeden Tag posten, auf Kommentare reagieren, Stories machen — wer soll das neben dem Tagesgeschäft schaffen? Social Media fühlt sich an wie ein zweiter Vollzeitjob. Das Ergebnis: Inkonsequenz." },
    { title: "Events verschwinden im Nichts", text: "Du planst ein tolles Event — Wein-Tasting, Grill-Abend, Brunch-Special — aber die Kommunikation beschränkt sich auf einen Post und einen Zettel an der Tür." },
  ],
  solutions: [
    { title: "Menükarte als Verkaufs-Tool", text: "Dein AI Content Lead schreibt Menübeschreibungen, die Appetit machen: Herkunft der Zutaten, Zubereitungsmethode, Geschmacksprofil. Upselling durch geschickte Formulierung." },
    { title: "Social-Media-Autopilot", text: "Redaktionsplan, Caption-Texte, Hashtag-Strategie, Story-Vorlagen — alles vorbereitet. Du musst nur noch das Foto machen. Der AI Content Lead kümmert sich um den Rest." },
    { title: "Event-Kommunikations-Kit", text: "Für jedes Event: Ankündigungstext, Social-Media-Posts, E-Mail-Einladung, Erinnerungs-Nachricht, Nachbereitung. Alles vorbereitet, alles zeitlich geplant." },
  ],
  useCases: [
    { title: "Menükarten-Rewrite für ein italienisches Restaurant", text: "Neue Menübeschreibungen mit Herkunftsgeschichten, Zubereitungstipps und Pairing-Empfehlungen. Durchschnittlicher Bon: +CHF 8, Dessert-Bestellungen: +40%." },
    { title: "Instagram-Content-Pipeline für ein Café", text: "30 Posts pro Monat vorbereitet: Tagesspecials, Behind-the-Scenes, Gäste-Highlights, saisonale Themen. Follower: +500 in 3 Monaten. Mittags-Walk-Ins über Instagram: messbar gestiegen." },
    { title: "Weihnachts-Event-Kampagne", text: "Komplett orchestrierte Kommunikation: Save-the-Date (6 Wochen vorher), Detailinfo (3 Wochen), Reminder (1 Woche), Last-Call (3 Tage). Event ausgebucht 2 Wochen vor dem Termin." },
  ],
  whyKaderOS: "Gastro-Content muss schnell, appetitlich und authentisch sein. KaderOS versteht die Branche: keine übertriebenen Adjektive, sondern ehrliches Storytelling. Zutaten statt Buzzwords, Handwerk statt Marketing-Sprech.",
  faqs: [
    { question: "Kann der AI Content Lead auch Rezepte aufbereiten?", answer: "Ja. Rezepte für Blog, Social Media oder Kochkurse — in verschiedenen Formaten und Detailgraden. Von der simplen Zutatenliste bis zur storytelling-angereicherten Rezeptgeschichte." },
    { question: "Was ist, wenn sich die Menükarte oft ändert?", answer: "Kein Problem. Der AI Content Lead passt sich deinem Rhythmus an: tägliche Specials, wöchentliche Menüwechsel, saisonale Umstellungen. Je öfter du wechselst, desto mehr Content-Material entsteht." },
    { question: "Brauche ich professionelle Fotos?", answer: "Gute Smartphone-Fotos reichen für den Anfang. Der AI Content Lead gibt dir Tipps für Food-Fotografie mit dem Handy: Licht, Winkel, Styling. Für wichtige Anlässe empfehlen wir einen professionellen Fototermin." },
  ],
  ctaText: "AI Content Lead für deinen Gastro-Betrieb aufsetzen",
  relatedRollen: ["cto-fuer-gastronomie", "cmo-fuer-gastronomie", "cfo-fuer-gastronomie", "sales-lead-fuer-gastronomie"],
  relatedBranchen: ["content-lead-fuer-handel", "content-lead-fuer-handwerk", "content-lead-fuer-bildung"],
};

const contentHandel: AITeamPage = {
  slug: "content-lead-fuer-handel",
  rolle: "content-lead", rolleLabel: "Content Lead", branche: "handel", brancheLabel: "Handel",
  metaTitle: "AI Content Lead für Handel — Produkttexte, SEO und Kampagnen-Content | KaderOS",
  metaDescription: "AI Content Lead für Handel: Produktbeschreibungen, Kategorie-Content und Kampagnen-Texte. Content, der verkauft. Skalierbar.",
  h1: "AI Content Lead für Handel — KaderOS",
  intro: "Im Handel entscheidet Content über Conversions: Produktbeschreibungen, Kategorie-Texte, Kampagnen-Kommunikation. Bei Hunderten oder Tausenden SKUs ist manuelle Content-Erstellung unmöglich. Ein AI Content Lead von KaderOS skaliert deine Content-Produktion ohne Qualitätsverlust.",
  challenges: [
    { title: "Tausende Produkte, kein Content", text: "Der Onlineshop hat 3'000 SKUs — und 90% davon haben nur eine Herstellerbeschreibung. Kein SEO-Content, keine Unique Descriptions, keine Kaufargumente. Google ignoriert dich, Kunden auch." },
    { title: "Kampagnen-Content braucht Speed", text: "Black Friday, Valentinstag, Sommer-Sale — jede Kampagne braucht Landing Pages, Banner-Texte, E-Mails, Social Posts. In 3 Tagen. Die Content-Produktion wird zum Flaschenhals." },
    { title: "Kein einheitlicher Brand Voice", text: "Produkttexte klingen anders als Newsletter, die klingen anders als Social Posts. Kein Styleguide, keine Templates, keine Qualitätskontrolle. Der Brand Voice ist ein Zufallsprodukt." },
  ],
  solutions: [
    { title: "Skalierte Produkttext-Erstellung", text: "Dein AI Content Lead erstellt unique Produktbeschreibungen für dein gesamtes Sortiment: SEO-optimiert, verkaufsstark, in deinem Brand Voice. Hunderte Texte pro Woche statt Dutzende pro Monat." },
    { title: "Kampagnen-Content-Pakete", text: "Für jede Kampagne liefert der AI Content Lead ein komplettes Paket: Landing Page Copy, E-Mail-Texte, Banner-Headlines, Social-Media-Posts. Alles konsistent, alles pünktlich." },
    { title: "Brand Voice Guidelines und Enforcement", text: "Der AI Content Lead definiert und dokumentiert deinen Brand Voice. Jeder Text wird automatisch auf Konsistenz geprüft. Dein Content klingt immer wie du — egal wer ihn erstellt hat." },
  ],
  useCases: [
    { title: "2'000 Produktbeschreibungen in 4 Wochen", text: "Unique, SEO-optimierte Produkttexte für den gesamten Onlineshop. Der AI Content Lead hat Templates definiert und die Erstellung skaliert. SEO-Traffic auf Produktseiten: +180%." },
    { title: "Black-Friday-Kampagne in 48 Stunden", text: "Komplettes Content-Paket: Landing Page, 5 E-Mails, 12 Social Posts, Banner-Texte. Alles in 48 Stunden produziert und freigegeben. Kampagnen-Umsatz: +40% vs. Vorjahr." },
    { title: "Buying-Guide-Serie", text: "8 ausführliche Kaufratgeber für die wichtigsten Produktkategorien. SEO-optimiert, hilfreich, nicht verkäuferisch. Organischer Traffic: +5'000 Besucher/Monat, Conversion Rate der Ratgeber-Leser: 3x höher." },
  ],
  whyKaderOS: "Handels-Content muss skalieren ohne an Qualität zu verlieren. KaderOS liefert beides: Masse und Klasse. Jeder Produkttext ist einzigartig, jede Kampagne on-brand, jeder Ratgeber hilfreich. Und alles SEO-optimiert für den Schweizer Markt.",
  faqs: [
    { question: "Kann der AI Content Lead auch mehrsprachige Texte?", answer: "Ja. Deutsch, Französisch, Italienisch und Englisch — für den Schweizer Markt optimiert. Keine maschinelle Übersetzung, sondern marktgerechte Texte in jeder Sprache." },
    { question: "Wie stellt ihr die SEO-Qualität sicher?", answer: "Der AI Content Lead integriert SEO von Anfang an: Keyword-Recherche, natürliche Integration, Meta-Tags, interne Verlinkung. Kein nachträgliches SEO-Tuning, sondern SEO by Design." },
    { question: "Was ist mit Produktbildern?", answer: "Der AI Content Lead fokussiert auf Text-Content. Für Bildbearbeitung, Freisteller und Lifestyle-Fotografie empfehlen wir spezialisierte Tools oder Fotografen — der AI Content Lead kann aber Alt-Texte und Bildunterschriften erstellen." },
  ],
  ctaText: "AI Content Lead für dein Handelsunternehmen aufsetzen",
  relatedRollen: ["cto-fuer-handel", "cmo-fuer-handel", "cfo-fuer-handel", "sales-lead-fuer-handel"],
  relatedBranchen: ["content-lead-fuer-gastronomie", "content-lead-fuer-immobilien", "content-lead-fuer-it"],
};

const contentHandwerk: AITeamPage = {
  slug: "content-lead-fuer-handwerk",
  rolle: "content-lead", rolleLabel: "Content Lead", branche: "handwerk", brancheLabel: "Handwerk",
  metaTitle: "AI Content Lead für Handwerk — Projekt-Showcases und lokaler Content | KaderOS",
  metaDescription: "AI Content Lead für Handwerk: Projekt-Dokumentation, Google-Content und Referenz-Seiten. Deine Arbeit spricht für sich — sichtbar.",
  h1: "AI Content Lead für Handwerk — KaderOS",
  intro: "Die beste Werbung für einen Handwerker ist seine Arbeit. Aber diese Arbeit muss sichtbar sein: Projekt-Fotos, Referenz-Beschreibungen, Fachwissen-Content. Ein AI Content Lead von KaderOS macht deine handwerkliche Qualität online sichtbar — dort, wo Kunden suchen.",
  challenges: [
    { title: "Tolle Arbeit, niemand sieht sie", text: "Du machst grossartige Projekte — aber online ist davon nichts zu sehen. Keine Projektfotos auf der Website, keine Vorher-Nachher-Dokumentation, keine Referenz-Texte." },
    { title: "Website-Content seit Jahren unverändert", text: "Die Leistungen auf der Website sind generisch, die Texte aus dem Baukasten, der Blog existiert nicht. Google hat keinen Grund, dich anzuzeigen." },
    { title: "Social Media: Kein Plan, kein Content", text: "Du weisst, dass du online präsent sein solltest. Aber was posten? Wie oft? Wo? Ohne Content-Strategie ist Social Media ein Energiefresser ohne Ergebnis." },
  ],
  solutions: [
    { title: "Projekt-Showcase-System", text: "Dein AI Content Lead erstellt aus jedem abgeschlossenen Projekt ein Showcase: Aufgabe, Lösung, Ergebnis, Fotos. Automatisiert, mit minimalem Aufwand von dir. Deine Website wird zur Referenz-Galerie." },
    { title: "Lokaler SEO-Content", text: "Fachbeiträge zu häufigen Kundenfragen: 'Was kostet eine Badsanierung in Zürich?', 'Wie oft muss die Fassade gestrichen werden?'. Lokaler Content, der Google-Rankings bringt." },
    { title: "Einfacher Social-Media-Plan", text: "Wöchentlicher Post mit Projekt-Foto und kurzem Text. Der AI Content Lead bereitet alles vor — du musst nur das Foto von der Baustelle senden." },
  ],
  useCases: [
    { title: "Referenz-Galerie für einen Gartenbauer", text: "25 Projekt-Showcases mit Vorher-Nachher-Fotos und Beschreibungen. Der AI Content Lead hat die Texte erstellt, SEO optimiert und verlinkt. 80% der Anfragen erwähnen jetzt die Website als Entscheidungsgrund." },
    { title: "FAQ-Content für einen Elektriker", text: "10 ausführliche Antworten auf häufige Kundenfragen: Kosten, Dauer, Vorschriften. Top-3-Rankings für 'Elektriker [Stadt]' bei 6 von 10 Artikeln. 12 Anfragen pro Monat über organische Suche." },
    { title: "Instagram für einen Schreiner", text: "Wöchentliche Posts mit Werkstatt-Einblicken und fertigen Projekten. Der AI Content Lead liefert Texte und Hashtags. 300 lokale Follower in 3 Monaten, 4 Direktanfragen über Instagram." },
  ],
  whyKaderOS: "Handwerk-Content muss echt sein — keine Stock-Fotos, kein Marketing-Sprech. KaderOS versteht das: Deine echten Projekte, deine echte Arbeit, authentisch beschrieben. Content, der Handwerksqualität zeigt statt Versprechungen zu machen.",
  faqs: [
    { question: "Ich habe keine guten Fotos — was nun?", answer: "Der AI Content Lead gibt dir einfache Tipps für Baustellenfotos mit dem Smartphone: Winkel, Beleuchtung, Vorher-Nachher-Shots. Du brauchst kein Profi-Equipment — Authentizität schlägt Perfektion." },
    { question: "Wie viel muss ich selbst machen?", answer: "Minimal: Ein Foto pro Projekt senden und kurze Stichpunkte (Was, Wo, Besonderheit). Der AI Content Lead macht daraus vollständigen Content: Website-Text, Social Post, Google-Update." },
    { question: "Lohnt sich das für einen Einpersonenbetrieb?", answer: "Gerade für Einzelunternehmer: Deine online-Sichtbarkeit entscheidet, ob du Aufträge über Portale (mit Provision) oder direkt (ohne Provision) bekommst. Der AI Content Lead amortisiert sich mit 1-2 Direktaufträgen pro Monat." },
  ],
  ctaText: "AI Content Lead für deinen Handwerksbetrieb aufsetzen",
  relatedRollen: ["cto-fuer-handwerk", "cmo-fuer-handwerk", "cfo-fuer-handwerk", "sales-lead-fuer-handwerk"],
  relatedBranchen: ["content-lead-fuer-gastronomie", "content-lead-fuer-immobilien", "content-lead-fuer-handel"],
};

const contentBeratung: AITeamPage = {
  slug: "content-lead-fuer-beratung",
  rolle: "content-lead", rolleLabel: "Content Lead", branche: "beratung", brancheLabel: "Beratung",
  metaTitle: "AI Content Lead für Beratung — Thought Leadership Content produzieren | KaderOS",
  metaDescription: "AI Content Lead für Beratung: Fachpublikationen, Whitepapers und LinkedIn-Content. Expertise sichtbar machen, Mandate gewinnen.",
  h1: "AI Content Lead für Beratung — KaderOS",
  intro: "In der Beratung ist Content die Währung: Wer publiziert, wird als Experte wahrgenommen. Wer nicht publiziert, ist unsichtbar. Ein AI Content Lead von KaderOS verwandelt dein internes Know-how in externe Sichtbarkeit — systematisch, professionell und consistent.",
  challenges: [
    { title: "Wissen im Kopf, nicht auf Papier", text: "Deine Berater haben enormes Wissen — aber es existiert nur in ihren Köpfen und Projektordnern. Nichts wird publiziert, nichts wird geteilt, nichts wird als Content wiederverwendet." },
    { title: "Ghostwriting ist teuer und langsam", text: "Eine Agentur für Thought-Leadership-Content kostet CHF 2'000-5'000 pro Beitrag. Und die Ergebnisse sind oft zu oberflächlich — die Agentur versteht die Materie nicht tief genug." },
    { title: "LinkedIn-Content erfordert Konsistenz", text: "Einmal posten reicht nicht. Thought Leadership auf LinkedIn braucht 2-3 Beiträge pro Woche, über Monate. Diese Konsistenz ist für vielbeschäftigte Berater fast unmöglich aufrechtzuerhalten." },
  ],
  solutions: [
    { title: "Knowledge-to-Content-Pipeline", text: "Dein AI Content Lead extrahiert Wissen aus internen Quellen: Projektberichte, Präsentationen, Meeting-Notizen. Daraus entstehen Fachbeiträge, Whitepapers und Blog Posts." },
    { title: "Ghostwriting für Partner und Berater", text: "30 Minuten Interview → fertig formulierter Fachbeitrag. Der AI Content Lead schreibt im Stil des jeweiligen Partners — authentisch, nicht generisch." },
    { title: "LinkedIn-Content-Engine", text: "2-3 LinkedIn-Posts pro Woche, pro Partner. Der AI Content Lead erstellt, plant und koordiniert. Jeder Post ist substanziell und passt zur persönlichen Marke." },
  ],
  useCases: [
    { title: "Whitepaper-Produktion für eine IT-Beratung", text: "4 Whitepapers in 3 Monaten: basierend auf Projekt-Erfahrungen und Interviews mit Beratern. 1'200+ Downloads, 40 qualifizierte Leads, 6 Erstgespräche." },
    { title: "Partner-LinkedIn-Programm", text: "3 Partner mit je 3 Posts/Woche auf LinkedIn. Der AI Content Lead hat Themen recherchiert, Texte geschrieben und Engagement-Strategien definiert. Durchschnitt: 5'000 Impressionen pro Post." },
    { title: "Case-Study-Library aufgebaut", text: "15 detaillierte Case Studies aus abgeschlossenen Projekten. Anonymisiert wo nötig, konkret wo möglich. Die Case Studies verkürzen den Sales Cycle um durchschnittlich 2 Wochen." },
  ],
  whyKaderOS: "Beratungs-Content muss substanziell sein — nicht oberflächlich. KaderOS liefert Inhalte, die von Entscheidern gelesen werden: fundiert, praxisnah, mit klarem Takeaway. Kein Content-Marketing-Einheitsbrei, sondern echte Thought Leadership.",
  faqs: [
    { question: "Wie stellt ihr sicher, dass vertrauliche Projektinformationen geschützt bleiben?", answer: "Der AI Content Lead anonymisiert Kundeninformationen automatisch und erstellt nur Inhalte, die für die Veröffentlichung freigegeben sind. Du behältst die volle Kontrolle darüber, was publiziert wird." },
    { question: "Kann der AI Content Lead auch Studien und Research Reports erstellen?", answer: "Ja. Der AI Content Lead kann Umfragen strukturieren, Ergebnisse analysieren und daraus professionelle Research Reports erstellen — inklusive Infografiken und Executive Summaries." },
    { question: "Wie messen wir den Impact von Content?", answer: "KaderOS trackt: Downloads, Leads aus Content, LinkedIn-Engagement, SEO-Rankings, Pipeline-Attribution. Du siehst genau, welcher Content Mandate bringt und welcher nur Eitelkeit befriedigt." },
  ],
  ctaText: "AI Content Lead für deine Beratungsfirma aufsetzen",
  relatedRollen: ["cto-fuer-beratung", "cmo-fuer-beratung", "cfo-fuer-beratung", "sales-lead-fuer-beratung"],
  relatedBranchen: ["content-lead-fuer-treuhand", "content-lead-fuer-it", "content-lead-fuer-bildung"],
};

const contentIT: AITeamPage = {
  slug: "content-lead-fuer-it",
  rolle: "content-lead", rolleLabel: "Content Lead", branche: "it", brancheLabel: "IT",
  metaTitle: "AI Content Lead für IT — Technical Content und Developer Documentation | KaderOS",
  metaDescription: "AI Content Lead für IT: Technische Blog Posts, API-Docs und Developer-Content. Content, den Entwickler tatsächlich lesen.",
  h1: "AI Content Lead für IT — KaderOS",
  intro: "IT-Content ist anders: technisch präzise, keine Marketingfloskeln, codebasiert. Entwickler haben einen eingebauten Bullshit-Detektor. Ein AI Content Lead von KaderOS erstellt technische Inhalte, die deine Zielgruppe respektiert — und die gleichzeitig SEO-Traffic bringen.",
  challenges: [
    { title: "Engineers wollen nicht schreiben", text: "Deine Entwickler könnten grossartige Blog Posts schreiben — wenn sie wollten. Aber Code schreiben ist spannender als Prosa. Content-Produktion bleibt liegen, der Blog verwaist." },
    { title: "Docs sind veraltet", text: "Die Dokumentation war bei Launch aktuell. Seitdem hat sich das Produkt weiterentwickelt, die Docs nicht. Veraltete Docs frustrieren Nutzer und erhöhen Support-Tickets." },
    { title: "SEO und Technical Depth schliessen sich scheinbar aus", text: "SEO-Texte sind oft oberflächlich. Technische Deep-Dives ranken nicht. Die Balance zwischen Suchmaschinen-Freundlichkeit und technischer Substanz zu finden, ist eine Kunst." },
  ],
  solutions: [
    { title: "Technical Blog Machine", text: "Dein AI Content Lead produziert 2-4 technische Blog Posts pro Woche: Tutorials, Architektur-Vergleiche, Benchmark-Analysen. Technisch korrekt, SEO-optimiert, in deinem Engineering-Voice." },
    { title: "Living Documentation", text: "Der AI Content Lead hält deine Docs aktuell: Changelog-basierte Updates, API-Referenz-Synchronisation, Tutorial-Aktualisierung bei Feature-Changes. Docs, die mit dem Produkt wachsen." },
    { title: "SEO + Depth: Beides gleichzeitig", text: "Der AI Content Lead schreibt Inhalte, die oben ranken UND unten substance haben: klare Einleitung für SEO, technischer Deep-Dive für die Zielgruppe, Code-Beispiele für die Praxis." },
  ],
  useCases: [
    { title: "Technical Blog für ein SaaS-Startup", text: "50 Blog Posts in 6 Monaten: Tutorials, Vergleiche, Best Practices. Der AI Content Lead hat Keyword-Recherche, Schreiben und Publishing übernommen. Organischer Traffic: von 2'000 auf 18'000/Monat." },
    { title: "Developer Documentation Overhaul", text: "Komplette Überarbeitung der API-Dokumentation: 80 Endpunkte, Code-Beispiele in 3 Sprachen, Getting-Started-Guide. Support-Tickets zu Docs-Fragen: -65%." },
    { title: "Changelog-to-Content-Pipeline", text: "Jedes Feature Release wird automatisch in 3 Content-Formate verwandelt: Release Note, Blog Post, Tutorial. Der AI Content Lead macht aus einem Changelog eine Content-Maschine." },
  ],
  whyKaderOS: "IT-Content muss von Leuten geschrieben werden, die Code verstehen — sonst wird es peinlich. KaderOS liefert Content, der Code-Snippets enthält, die tatsächlich funktionieren, und Architektur-Empfehlungen, die Hand und Fuss haben.",
  faqs: [
    { question: "Kann der AI Content Lead auch Code-Beispiele schreiben?", answer: "Ja. Der AI Content Lead erstellt Code-Beispiele in gängigen Sprachen (TypeScript, Python, Go, etc.), die compilieren und den beschriebenen Zweck erfüllen. Keine Pseudocode-Attrappen." },
    { question: "Wie stellt ihr technische Korrektheit sicher?", answer: "Der AI Content Lead arbeitet mit deiner Codebasis und API-Dokumentation. Jeder Beitrag kann von deinem Engineering-Team in einem schnellen Review geprüft werden — typischerweise 10-15 Minuten." },
    { question: "Kann der AI Content Lead auch Comparison Pages erstellen?", answer: "Ja. Faire, faktische Vergleiche mit Konkurrenzprodukten: Feature-Matrix, Performance-Benchmarks, Preisvergleich. Kein Trash-Talk, sondern ehrliche Positionierung, die Vertrauen aufbaut." },
  ],
  ctaText: "AI Content Lead für dein IT-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-it", "cmo-fuer-it", "cfo-fuer-it", "sales-lead-fuer-it"],
  relatedBranchen: ["content-lead-fuer-beratung", "content-lead-fuer-pharma", "content-lead-fuer-bildung"],
};

const contentPharma: AITeamPage = {
  slug: "content-lead-fuer-pharma",
  rolle: "content-lead", rolleLabel: "Content Lead", branche: "pharma", brancheLabel: "Pharma",
  metaTitle: "AI Content Lead für Pharma — Medical Content und HCP-Kommunikation | KaderOS",
  metaDescription: "AI Content Lead für Pharma: Medical Education Content, Patient Information und HCP-Materialien. Compliant, fundiert, wirkungsvoll.",
  h1: "AI Content Lead für Pharma — KaderOS",
  intro: "Pharma-Content ist hochreguliert und gleichzeitig essenziell: Medical Education, Patient Information, HCP-Materialien. Jedes Wort muss stimmen, jeder Claim belegt sein, jede Aussage compliant. Ein AI Content Lead von KaderOS navigiert diese Anforderungen und liefert Content, der wirkt.",
  challenges: [
    { title: "Jeder Text braucht eine Freigabe", text: "Medical, Legal, Regulatory — der Freigabeprozess für Pharma-Content ist langwierig. Oft dauert die Freigabe länger als die Erstellung. Und jede Änderung bedeutet eine neue Runde." },
    { title: "Zielgruppengerechte Aufbereitung", text: "Derselbe Wirkstoff, drei Zielgruppen: Ärzte, Apotheker, Patienten. Jede braucht andere Sprache, andere Tiefe, andere Formate. Die Content-Produktion verdreifacht sich." },
    { title: "Konsistenz über Märkte und Kanäle", text: "Core Messages müssen über alle Märkte und Kanäle konsistent sein. Aber lokale Anpassungen sind nötig. Ohne Content-Governance entsteht ein Flickenteppich." },
  ],
  solutions: [
    { title: "Pre-Compliance-Content-Erstellung", text: "Dein AI Content Lead erstellt Content, der von Anfang an Compliance-Anforderungen berücksichtigt: Referenzen, Disclaimers, Pflichtinformationen. Weniger Iterationsschleifen, schnellere Freigabe." },
    { title: "Multi-Audience-Content aus einer Quelle", text: "Ein Kern-Content wird in 3 Versionen aufbereitet: HCP-Professional, Apotheker-Praxis, Patienten-verständlich. Konsistente Botschaft, zielgruppengerechte Sprache." },
    { title: "Global-Local Content Framework", text: "Core Messages zentral definiert, lokale Adaptionen strukturiert. Der AI Content Lead stellt sicher, dass lokale Versionen die Core Messages erhalten und marktgerecht anpassen." },
  ],
  useCases: [
    { title: "Patient-Information-Serie für eine Autoimmunerkrankung", text: "12 Artikel in einfacher Sprache: Symptome, Diagnose, Behandlungsoptionen, Alltag. Der AI Content Lead hat medizinische Literatur aufbereitet und patientengerecht formuliert. Downloads: 15'000 in 3 Monaten." },
    { title: "HCP-Slide-Kit für einen Produktlaunch", text: "60-Slide-Deck für den Aussendienst: Wirkungsmechanismus, Studiendaten, Dosierung, FAQs. Der AI Content Lead hat alle Slides getextet und referenziert. Freigabe in einer Runde — dank Pre-Compliance." },
    { title: "Medical Education Newsletter", text: "Monatlicher Newsletter für 5'000 Fachärzte: Studienzusammenfassungen, Praxistipps, Kongressberichte. Der AI Content Lead erstellt, der Medical Advisor prüft. Öffnungsrate: 38%." },
  ],
  whyKaderOS: "Pharma-Content ist kein Platz für Fehler. KaderOS liefert medizinisch fundierte Inhalte mit eingebauter Compliance-Sensibilität. Kein Medical Writer ersetzt — aber einer, der 80% der Arbeit abnimmt und die letzten 20% effizienter macht.",
  faqs: [
    { question: "Ersetzt der AI Content Lead Medical Writer?", answer: "Nein, er ergänzt sie. Der AI Content Lead übernimmt Recherche, Erstformulierung und Formatierung. Medical Writer und Medical Advisor fokussieren auf fachliche Prüfung und Finalisierung — effizienter als heute." },
    { question: "Wie geht KaderOS mit Referenzen und Quellen um?", answer: "Der AI Content Lead zitiert Quellen im wissenschaftlichen Standard. Studiendaten werden korrekt referenziert, Claims mit Evidenzlevel gekennzeichnet. Dein Medical Review kann sich auf Inhalt konzentrieren, nicht auf Formatierung." },
    { question: "Kann der AI Content Lead auch für Market Access Content?", answer: "Ja. HTA-Dossiers, Value Dossiers, Budget-Impact-Modelle — der AI Content Lead unterstützt bei der Texterstellung und Aufbereitung von Health Economics und Outcomes Research Content." },
  ],
  ctaText: "AI Content Lead für dein Pharma-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-pharma", "cmo-fuer-pharma", "cfo-fuer-pharma", "sales-lead-fuer-pharma"],
  relatedBranchen: ["content-lead-fuer-it", "content-lead-fuer-beratung", "content-lead-fuer-bildung"],
};

const contentLogistik: AITeamPage = {
  slug: "content-lead-fuer-logistik",
  rolle: "content-lead", rolleLabel: "Content Lead", branche: "logistik", brancheLabel: "Logistik",
  metaTitle: "AI Content Lead für Logistik — Expertise zeigen, Kunden gewinnen | KaderOS",
  metaDescription: "AI Content Lead für Logistik: Branchen-Guides, Case Studies und B2B-Content. Fachkompetenz sichtbar machen, Verlader überzeugen.",
  h1: "AI Content Lead für Logistik — KaderOS",
  intro: "Logistik-Content ist B2B-Content: nüchtern, fachlich, entscheidungsrelevant. Verlader wollen wissen, dass du ihre Anforderungen verstehst. Ein AI Content Lead von KaderOS produziert die Inhalte, die Logistik-Entscheider überzeugen.",
  challenges: [
    { title: "Kein Content, keine Sichtbarkeit", text: "Die Website hat 5 Seiten, der letzte News-Beitrag ist von 2024. Google hat keinen Grund, dich zu ranken. Potenzielle Kunden, die online recherchieren, finden dich nicht." },
    { title: "B2B-Content braucht Tiefe", text: "Logistik-Entscheider wollen keine oberflächlichen Marketing-Texte. Sie wollen Fachkompetenz sehen: Zoll-Know-how, Routing-Expertise, Branchen-Verständnis. Dieser Content erfordert Fachwissen." },
    { title: "Case Studies fehlen", text: "Du hast tolle Projekte umgesetzt — Cross-Border-Logistik, Pharma-Transport, Same-Day-Delivery. Aber es existiert keine Dokumentation, die du als Referenz nutzen könntest." },
  ],
  solutions: [
    { title: "Logistik-Fach-Blog", text: "Dein AI Content Lead produziert regelmässig Fachbeiträge: Zoll-Updates, Branchen-Guides, Effizienz-Tipps. Content, der Google-Rankings bringt und Fachkompetenz zeigt." },
    { title: "Case Study Production", text: "Aus jedem bedeutenden Projekt wird eine professionelle Case Study: Challenge, Lösung, Ergebnis, Kennzahlen. Der AI Content Lead führt ein kurzes Interview und macht daraus eine überzeugende Story." },
    { title: "Branchen-spezifische Lösungsseiten", text: "Landing Pages für jede Branche, die du bedienst: Pharma-Logistik, Lebensmittel, Fashion, Automotive. Jede Seite mit branchenspezifischen Lösungen und Referenzen." },
  ],
  useCases: [
    { title: "Branchen-Landing-Pages für eine Spedition", text: "6 branchenspezifische Landing Pages: Pharma, Food, Automotive, Fashion, Elektronik, Gefahrgut. Der AI Content Lead hat recherchiert, geschrieben und SEO-optimiert. Organische Anfragen: +150%." },
    { title: "Zoll-Guide für Schweiz-EU", text: "Umfassender Guide 'Import/Export Schweiz-EU': Zolltarife, Ursprungsregeln, Freihandelsabkommen, e-dec. 3'000+ Downloads, als Lead-Magnet genutzt. 20 qualifizierte Leads." },
    { title: "Case-Study-Library", text: "10 professionelle Case Studies aus verschiedenen Branchen und Logistik-Lösungen. Eingesetzt in Proposals und auf der Website. Verlader zitieren Case Studies als Entscheidungsgrund." },
  ],
  whyKaderOS: "Logistik-Content muss in Tonnen, Laufzeiten und Franken denken — nicht in Marketing-Phrasen. KaderOS liefert Inhalte, die Logistik-Entscheider ernst nehmen: fachlich fundiert, praxisrelevant, mit konkreten Zahlen.",
  faqs: [
    { question: "Kann der AI Content Lead auch technische Dokumente erstellen?", answer: "Ja. Service Descriptions, SLA-Dokumentation, Prozessbeschreibungen — der AI Content Lead erstellt auch technische Dokumente, die im Tagesgeschäft gebraucht werden." },
    { question: "Wie bleibt der Zoll-Content aktuell?", answer: "Der AI Content Lead verfolgt Änderungen in der Schweizer und EU-Zollgesetzgebung. Bei relevanten Änderungen werden bestehende Inhalte aktualisiert und Update-Beiträge veröffentlicht." },
    { question: "Kann der Content auch für Ausschreibungen genutzt werden?", answer: "Ja. Case Studies, Branchen-Expertise-Seiten und Service-Beschreibungen werden direkt in Ausschreibungs-Antworten eingebaut. Der AI Content Lead liefert das Content-Arsenal für dein Sales-Team." },
  ],
  ctaText: "AI Content Lead für dein Logistik-Unternehmen aufsetzen",
  relatedRollen: ["cto-fuer-logistik", "cmo-fuer-logistik", "cfo-fuer-logistik", "sales-lead-fuer-logistik"],
  relatedBranchen: ["content-lead-fuer-handel", "content-lead-fuer-pharma", "content-lead-fuer-it"],
};

const contentBildung: AITeamPage = {
  slug: "content-lead-fuer-bildung",
  rolle: "content-lead", rolleLabel: "Content Lead", branche: "bildung", brancheLabel: "Bildung",
  metaTitle: "AI Content Lead für Bildung — Kursinhalte und Marketing-Content | KaderOS",
  metaDescription: "AI Content Lead für Bildungsanbieter: Kursbeschreibungen, Blog-Content und Absolventenstories. Kurse verkaufen durch Content.",
  h1: "AI Content Lead für Bildung — KaderOS",
  intro: "Bildungs-Content hat zwei Aufgaben: Kurse verkaufen und Wissen vermitteln. Kursbeschreibungen müssen überzeugen, Blog-Content muss positionieren, und Marketing-Materialien müssen informieren, ohne zu überverkaufen. Ein AI Content Lead von KaderOS meistert diese Balance.",
  challenges: [
    { title: "Kursbeschreibungen, die nicht überzeugen", text: "Die Kursbeschreibung liest sich wie ein Lehrplan: Module, ECTS-Punkte, Lernziele. Aber was hat der Teilnehmer davon? Welches Problem wird gelöst? Welche Karriere-Chance öffnet sich? Die Benefits fehlen." },
    { title: "Kein Content zwischen den Kurszyklen", text: "Zwischen Anmeldeschluss und Kursstart herrscht Content-Stille. Keine Blog Posts, keine Social-Media-Aktivität, keine Nurturing-Mails. Potenzielle Interessenten für den nächsten Zyklus werden nicht aufgebaut." },
    { title: "Absolventen-Stories nicht genutzt", text: "Deine besten Verkaufsargumente sind zufriedene Absolventen. Aber ihre Geschichten werden nicht erzählt: keine Testimonials, keine Erfolgsgeschichten, keine Alumni-Interviews." },
  ],
  solutions: [
    { title: "Benefit-orientierte Kursbeschreibungen", text: "Dein AI Content Lead schreibt Kursbeschreibungen, die verkaufen: Problem → Lösung → Ergebnis → Beweis. Jeder Kurs wird aus der Perspektive des Teilnehmers beschrieben, nicht aus der des Lehrplans." },
    { title: "Ganzjähriger Content-Kalender", text: "Blog-Beiträge, LinkedIn-Posts und Newsletter über das ganze Jahr — nicht nur zur Anmeldezeit. Der AI Content Lead hält deine Marke sichtbar und baut kontinuierlich Interesse auf." },
    { title: "Absolventen-Storytelling", text: "Strukturierte Alumni-Interviews, aufbereitete Erfolgsgeschichten, Video-Testimonial-Skripte. Der AI Content Lead verwandelt zufriedene Absolventen in überzeugende Content-Pieces." },
  ],
  useCases: [
    { title: "Kursbeschreibungen-Relaunch", text: "Neuformulierung aller 40 Kursbeschreibungen: benefit-orientiert, SEO-optimiert, mit Social Proof. Der AI Content Lead hat geschrieben, A/B-Tests vorgeschlagen und Final-Versionen erstellt. Kursseiten-Conversions: +25%." },
    { title: "Alumni-Success-Stories", text: "12 ausführliche Absolventen-Interviews: Vorher-Nachher, Karriereentwicklung, persönliche Insights. Als Blog, LinkedIn-Serie und Testimonials auf Kursseiten verwendet. Stärkster Conversion-Faktor laut Umfrage." },
    { title: "Branchen-Trend-Content", text: "Monatliche Trend-Analyse für die Branchen, in die die Absolventen gehen. Positionierung als thought leader. 3'000+ Newsletter-Abonnenten, die zu potenziellen Kursteilnehmern werden." },
  ],
  whyKaderOS: "Bildungs-Content muss informieren und überzeugen — ohne zu manipulieren. KaderOS versteht dieses Gleichgewicht: ehrliche Kommunikation über den Mehrwert von Bildung, gestützt auf reale Ergebnisse und Absolventenstories. Kein Hard Selling, sondern Vertrauensaufbau.",
  faqs: [
    { question: "Kann der AI Content Lead auch Kursmaterialien erstellen?", answer: "Der AI Content Lead fokussiert auf Marketing-Content, nicht auf didaktische Materialien. Er kann aber Kurs-Zusammenfassungen, Vorschau-Module und Sample-Lektionen erstellen, die als Marketing-Tool dienen." },
    { question: "Wie geht der AI Content Lead mit verschiedenen Kurs-Niveaus um?", answer: "Der AI Content Lead passt Sprache und Tiefe an das jeweilige Niveau an: berufsbegleitende CAS anders als Einsteigerkurse, Executive Education anders als Bachelor-Programme." },
    { question: "Kann der Content auch für Employer Branding genutzt werden?", answer: "Ja. Der AI Content Lead kann Content für dein Employer Branding als Bildungsanbieter erstellen: Dozenten-Portraits, Behind-the-Scenes, Kultur-Content. So gewinnst du nicht nur Teilnehmer, sondern auch Dozenten." },
  ],
  ctaText: "AI Content Lead für deine Bildungseinrichtung aufsetzen",
  relatedRollen: ["cto-fuer-bildung", "cmo-fuer-bildung", "cfo-fuer-bildung", "sales-lead-fuer-bildung"],
  relatedBranchen: ["content-lead-fuer-beratung", "content-lead-fuer-pharma", "content-lead-fuer-treuhand"],
};

export const part2Pages: AITeamPage[] = [
  // CFO
  cfoTreuhand, cfoImmobilien, cfoGastronomie, cfoHandel, cfoHandwerk,
  cfoBeratung, cfoIT, cfoPharma, cfoLogistik, cfoBildung,
  // Sales Lead
  salesTreuhand, salesImmobilien, salesGastronomie, salesHandel, salesHandwerk,
  salesBeratung, salesIT, salesPharma, salesLogistik, salesBildung,
  // Content Lead
  contentTreuhand, contentImmobilien, contentGastronomie, contentHandel, contentHandwerk,
  contentBeratung, contentIT, contentPharma, contentLogistik, contentBildung,
];
