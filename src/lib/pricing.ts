import { siteConfig } from "@/lib/site";

export const pricingTiers = {
  free: {
    name: "Free",
    limit: siteConfig.freeEntryLimit,
    features: [
      `${siteConfig.freeEntryLimit} log entries`,
      "Private history",
      "Create, edit, and delete logs",
      "Book detail pages",
    ],
  },
  premium: {
    name: "Premium",
    monthly: siteConfig.premiumMonthlyPrice,
    annual: siteConfig.premiumAnnualPrice,
    features: [
      "Unlimited entries",
      "Yearly stats dashboard",
      "CSV export",
      "Priority support",
    ],
  },
};
