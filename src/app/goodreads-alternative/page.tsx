import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "Goodreads Alternative",
  description: "A quiet Goodreads alternative for private tracking, quick logging, and simple reading history.",
};

export default function GoodreadsAlternativePage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <SeoPage
        eyebrow="Goodreads alternative"
        title="A Goodreads alternative for people who just want to log and leave."
        description="If you like tracking books but dislike crowded feeds, social performance, or recommendation clutter, ReadLog gives you the useful part only."
        bullets={[
          "Private-first instead of social-first",
          "One focused log form instead of dozens of shelves and widgets",
          "Search and revisit notes by title or author",
          "Keep ownership of your data with CSV export",
        ]}
      />
      <MarketingFooter />
    </div>
  );
}
