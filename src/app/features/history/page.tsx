import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "Reading History Feature",
  description: "A searchable private reading history for books, authors, and notes.",
};

export default function FeatureHistoryPage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <SeoPage
        eyebrow="Feature: history"
        title="A clean reading history you can actually use."
        description="ReadLog keeps every reading session in reverse chronological order with search by title or author and grouped book detail views."
        bullets={[
          "Most recent logs first",
          "Search by title or author",
          "Open book detail pages for a single title",
          "Edit or delete logs without leaving the page",
        ]}
      />
      <MarketingFooter />
    </div>
  );
}
