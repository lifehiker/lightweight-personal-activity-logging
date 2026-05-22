import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "Book Tracker App",
  description: "Track books read, notes, ratings, and history with a simple private book tracker app.",
};

export default function BookTrackerAppPage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <SeoPage
        eyebrow="Book tracker app"
        title="A simple book tracker app for people who want clarity instead of clutter."
        description="Use ReadLog as a personal book tracker app with title, author, notes, pages, and ratings in a single clean workflow."
        bullets={[
          "Fast quick-add form optimized for phones",
          "Sorted reading history",
          "Grouped title detail pages",
          "Yearly stats and export available with Premium",
        ]}
      />
      <MarketingFooter />
    </div>
  );
}
