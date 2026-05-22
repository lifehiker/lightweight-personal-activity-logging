import { FAQ } from "@/components/marketing/faq";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/marketing/hero";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";

export default function HomePage() {
  return (
    <div className="pb-10">
      <MarketingHeader />
      <Hero />
      <FeatureGrid />
      <FAQ />
      <MarketingFooter />
    </div>
  );
}
