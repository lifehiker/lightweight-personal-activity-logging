import { prisma } from "@/lib/prisma";
import { getRequiredSession } from "@/lib/session";
import { siteConfig } from "@/lib/site";
import { updateProfileAction } from "@/app/app/actions";
import { isStripeConfigured } from "@/lib/env";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function SettingsPage() {
  const session = await getRequiredSession();
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
  });

  return (
    <div className="space-y-6">
      <div className="panel p-6">
        <p className="eyebrow">Settings</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Profile and plan.</h1>
      </div>

      <form action={updateProfileAction} className="panel p-6">
        <h2 className="text-2xl font-semibold tracking-tight">Private profile</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">Display name</label>
            <Input name="name" defaultValue={user.name || ""} placeholder="A quiet reader" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Email</label>
            <Input value={user.email || ""} disabled />
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit">Save profile</Button>
        </div>
      </form>

      <div className="panel p-6">
        <h2 className="text-2xl font-semibold tracking-tight">Billing</h2>
        <p className="mt-3 text-[var(--muted)]">
          You are on the {user.subscriptionStatus} plan. Free accounts can store up to {siteConfig.freeEntryLimit} entries.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="/pricing">
            <Button>Compare plans</Button>
          </a>
          <form action="/api/stripe/portal" method="post">
            <Button type="submit" variant="secondary" disabled={!isStripeConfigured()}>
              {isStripeConfigured() ? "Open billing portal" : "Billing portal needs Stripe credentials"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
