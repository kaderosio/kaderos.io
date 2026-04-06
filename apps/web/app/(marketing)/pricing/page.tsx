import PricingPageClient from "./pricing-client";

export const metadata = {
  title: "Pricing",
  description: "KaderOS Pricing: Free (gratis), Pro (CHF 49/Mo) und Business (CHF 199/Mo). Ohne Kleingedrucktes.",
};

export default function PricingPage() {
  return <PricingPageClient />;
}
