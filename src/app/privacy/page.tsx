import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { Section } from "@/components/ui/section";

export default function PrivacyPage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <Section className="py-10">
        <div className="panel p-8">
          <h1 className="text-4xl font-semibold tracking-tight">Privacy policy</h1>
          <p className="mt-4 text-[var(--muted)]">
            ReadLog stores account information and reading logs so the product can authenticate you, render your private history, and fulfill export and billing workflows. The app does not intentionally expose user reading history publicly.
          </p>
        </div>
      </Section>
      <MarketingFooter />
    </div>
  );
}
