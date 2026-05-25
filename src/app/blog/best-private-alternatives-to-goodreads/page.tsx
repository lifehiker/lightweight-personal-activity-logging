import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { BlogPost } from "@/components/marketing/blog-post";

export const metadata: Metadata = {
  title: "Best Private Alternatives to Goodreads",
  description:
    "A practical guide to private Goodreads alternatives for readers who want simple book tracking without social feeds.",
};

export default function BestPrivateAlternativesToGoodreadsPage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <BlogPost
        eyebrow="Reading workflow"
        title="Best private alternatives to Goodreads"
        description="Goodreads is useful when you want discovery, reviews, and public shelves. If you only want a private record of what you read, a lighter workflow is usually better."
        sections={[
          {
            heading: "Choose based on the job",
            body: "A private reading log should make capture fast, keep your notes out of public view, and make old books easy to find. That is a different job than recommendations, reviews, and community discussion.",
          },
          {
            heading: "What private tools get right",
            body: "Notes apps, spreadsheets, and Notion databases can work, but they often require setup and maintenance. A dedicated log should already understand titles, authors, dates, pages, ratings, notes, history, and export.",
          },
          {
            heading: "Where ReadLog fits",
            body: "ReadLog focuses on quick mobile entry and private history. It avoids feeds and public profiles, while still offering search, book detail views, streaks, yearly stats, and CSV export when you need them.",
          },
        ]}
      />
      <MarketingFooter />
    </div>
  );
}
