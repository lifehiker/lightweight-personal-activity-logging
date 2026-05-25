import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { BlogPost } from "@/components/marketing/blog-post";

export const metadata: Metadata = {
  title: "How to Keep a Reading Log Without Spreadsheets",
  description:
    "Keep a reading log without spreadsheet friction by using a fast, structured, private book tracking workflow.",
};

export default function ReadingLogWithoutSpreadsheetsPage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <BlogPost
        eyebrow="Reading workflow"
        title="How to keep a reading log without spreadsheets"
        description="Spreadsheets are flexible, but they are rarely the fastest place to capture a reading session from your phone. A better log starts with a small structured form."
        sections={[
          {
            heading: "Keep the fields simple",
            body: "Most readers only need title, author, date, optional pages, optional rating, and a short note. More fields can wait until the workflow has already become a habit.",
          },
          {
            heading: "Log from the phone first",
            body: "The best reading log is the one you use at the moment you finish a chapter or book. A mobile-first form removes the copy-paste and row-formatting work that makes spreadsheets feel heavy.",
          },
          {
            heading: "Export later",
            body: "You can still keep ownership of the data. ReadLog stores structured entries and Premium users can export CSV when they want a backup, spreadsheet analysis, or migration path.",
          },
        ]}
      />
      <MarketingFooter />
    </div>
  );
}
