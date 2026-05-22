import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "Reading Log App No Social",
  description: "A reading log app with no social feed, no public shelves, and no distraction.",
};

export default function ReadingLogAppNoSocialPage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <SeoPage
        eyebrow="Reading log app no social"
        title="A reading log app with no social layer attached."
        description="ReadLog is for readers who want a practical private log, not another reading identity to maintain."
        bullets={[
          "No social graph or public profile pressure",
          "Quick entry instead of discovery mechanics",
          "Private notes and ratings",
          "Built around your own reading archive",
        ]}
      />
      <MarketingFooter />
    </div>
  );
}
