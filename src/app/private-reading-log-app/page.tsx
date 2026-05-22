import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "Private Reading Log App",
  description:
    "ReadLog is a private reading log app for tracking books read, notes, and history without social features.",
};

export default function PrivateReadingLogAppPage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <SeoPage
        eyebrow="Private reading log app"
        title="A private reading log app without the performance of social reading."
        description="ReadLog is designed for readers who want speed, privacy, and useful history. You can log a finished book or a simple reading session, add a note, and move on."
        bullets={[
          "No public shelves or social identity pressure",
          "Fast mobile-first form for quick entry",
          "Searchable book and author history",
          "Premium unlocks yearly stats and CSV export",
        ]}
      />
      <MarketingFooter />
    </div>
  );
}
