import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "CSV Export Feature",
  description: "Export your private reading log data as CSV with title, notes, ratings, and dates.",
};

export default function FeatureExportPage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <SeoPage
        eyebrow="Feature: export"
        title="Export your reading history when you need ownership, backup, or migration."
        description="Premium users can download a CSV of every reading log including titles, authors, pages, ratings, notes, and timestamps."
        bullets={[
          "One-click CSV download",
          "Useful for backups and personal analysis",
          "Portable if you later change tools",
          "No hidden lock-in around your reading history",
        ]}
      />
      <MarketingFooter />
    </div>
  );
}
