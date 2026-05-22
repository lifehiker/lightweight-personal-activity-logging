import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "App to Track Books Read",
  description:
    "A simple app to track books read with private notes, ratings, pages, searchable history, and CSV export.",
};

export default function AppToTrackBooksReadPage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <SeoPage
        eyebrow="App to track books read"
        title="An app to track books read without turning it into a social project."
        description="ReadLog gives you the book tracking pieces that matter: title, author, date, notes, pages, personal rating, history, and export."
        bullets={[
          "Log a book or reading session from one mobile-friendly form",
          "Keep personal notes and ratings private",
          "Find past books by title or author",
          "Upgrade only when you need unlimited entries, stats, or CSV export",
        ]}
      />
      <MarketingFooter />
    </div>
  );
}
