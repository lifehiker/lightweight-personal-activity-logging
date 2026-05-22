import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { Section } from "@/components/ui/section";

export default function TermsPage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <Section className="py-10">
        <div className="panel p-8">
          <h1 className="text-4xl font-semibold tracking-tight">Terms</h1>
          <p className="mt-4 text-[var(--muted)]">
            ReadLog is provided as a lightweight reading log service. Users are responsible for the content they store, and Premium billing depends on external payment processors when configured.
          </p>
        </div>
      </Section>
      <MarketingFooter />
    </div>
  );
}
