import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { SeoPage } from "@/components/marketing/seo-page";

export const metadata: Metadata = {
  title: "Reading Log Template",
  description: "Use ReadLog instead of a spreadsheet reading log template when you want fast entry and searchable history.",
};

export default function ReadingLogTemplatePage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <SeoPage
        eyebrow="Reading log template"
        title="A reading log template that behaves like an app, not a spreadsheet."
        description="ReadLog replaces manual templates with a structured private log that is easier to use on mobile and stronger at search, streaks, and export."
        bullets={[
          "Less setup than Notion or spreadsheets",
          "Structured data for title, author, pages, rating, and notes",
          "Reusable archive and grouped book detail pages",
          "Export whenever you need the spreadsheet version later",
        ]}
      />
      <MarketingFooter />
    </div>
  );
}
