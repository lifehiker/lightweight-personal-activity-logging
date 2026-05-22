import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isGoogleAuthConfigured } from "@/lib/env";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { SignInForm } from "@/components/auth/sign-in-form";
import { Section } from "@/components/ui/section";

export default async function SignInPage() {
  const session = await auth();
  if (session) {
    redirect("/app");
  }

  return (
    <div className="pb-10">
      <MarketingHeader />
      <Section className="py-10">
        <SignInForm googleEnabled={isGoogleAuthConfigured()} />
      </Section>
      <MarketingFooter />
    </div>
  );
}
