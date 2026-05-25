import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { BlogPost } from "@/components/marketing/blog-post";

export const metadata: Metadata = {
  title: "Simple Reading Tracker vs Goodreads",
  description:
    "Compare a simple private reading tracker with Goodreads for casual readers who want fast logging and less clutter.",
};

export default function SimpleReadingTrackerVsGoodreadsPage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <BlogPost
        eyebrow="Product comparison"
        title="Simple reading tracker vs Goodreads: what casual readers actually need"
        description="Goodreads is broad because it supports reviews, discovery, lists, community, and social proof. Casual readers often need a narrower tool: log the book, add a note, and find it later."
        sections={[
          {
            heading: "Speed matters more than breadth",
            body: "A reading tracker should make the common action effortless. For many readers, that means one form and a reverse-chronological history rather than a full social reading platform.",
          },
          {
            heading: "Privacy changes the experience",
            body: "When the log is private by default, personal ratings and notes can stay useful instead of performative. You can track honestly without maintaining a public reading identity.",
          },
          {
            heading: "Use the right tool for the moment",
            body: "Goodreads can still be useful for reviews and discovery. ReadLog is for the quieter workflow after you have read: record the book or session, keep the memory, and move on.",
          },
        ]}
      />
      <MarketingFooter />
    </div>
  );
}
