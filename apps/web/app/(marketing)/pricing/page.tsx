import PricingPageClient from "./pricing-client";

export const metadata = {
  title: "Pricing",
  description: "KaderOS Pricing: Free (gratis), Pro (CHF 79/Mo) und Business (CHF 199/Mo). Ohne Kleingedrucktes.",
};

export default function PricingPage() {
  return <PricingPageClient />;
}
