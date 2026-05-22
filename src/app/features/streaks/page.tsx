import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "Reading Streaks Feature",
  description: "Track current and longest reading streaks with a private reading log app.",
};

export default function FeatureStreaksPage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <SeoPage
        eyebrow="Feature: streaks"
        title="Track reading streaks without turning reading into a social game."
        description="Premium adds a simple streak view based on days with at least one reading log, plus yearly counts that stay focused and private."
        bullets={[
          "Current streak from unique reading days",
          "Longest streak for long-term momentum",
          "Yearly books finished and entry counts",
          "Private stats with no social leaderboard",
        ]}
      />
      <MarketingFooter />
    </div>
  );
}
