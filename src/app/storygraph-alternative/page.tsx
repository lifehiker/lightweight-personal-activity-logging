import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "StoryGraph Alternative",
  description: "A simpler StoryGraph alternative for readers who want private logging without extra setup.",
};

export default function StorygraphAlternativePage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <SeoPage
        eyebrow="StoryGraph alternative"
        title="A simpler StoryGraph alternative when analytics are not the main event."
        description="ReadLog strips the experience back to quick logging, book-level history, and a small set of useful personal stats."
        bullets={[
          "Minimal setup and less interface overhead",
          "Still supports notes, ratings, and pages read",
          "Keeps stats as a premium add-on, not the whole product",
          "Built for readers who want a lightweight personal journal",
        ]}
      />
      <MarketingFooter />
    </div>
  );
}
