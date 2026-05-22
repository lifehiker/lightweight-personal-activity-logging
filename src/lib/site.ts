export const siteConfig = {
  name: "ReadLog",
  shortName: "ReadLog",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  description:
    "A private reading log for tracking books, notes, streaks, and history without Goodreads-style social clutter.",
  freeEntryLimit: 30,
  premiumMonthlyPrice: "$3.99",
  premiumAnnualPrice: "$24",
};
