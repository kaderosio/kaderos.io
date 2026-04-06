import AITeamCalculatorClient from "./calculator-client";

export const metadata = {
  title: "AI Team Kalkulator — Berechne deine Einsparung | KaderOS",
  description:
    "Kostenloses Tool: Berechne in 10 Sekunden, wie viel du mit einem AI-Team sparst. Kosten Mensch vs. KaderOS im direkten Vergleich.",
  openGraph: {
    title: "AI Team Kalkulator — Berechne deine Einsparung",
    description:
      "Kostenloses Tool: Berechne wie viel du mit einem AI-Team sparst. Kosten Mensch vs. KaderOS im Vergleich.",
    url: "https://kaderos.io/tools/ai-team-calculator",
  },
};

export default function AITeamCalculatorPage() {
  return <AITeamCalculatorClient />;
}
