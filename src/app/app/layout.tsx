import { AppShell } from "@/components/layout/app-shell";
import { getRequiredSession } from "@/lib/session";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getRequiredSession();
  return <AppShell>{children}</AppShell>;
}
