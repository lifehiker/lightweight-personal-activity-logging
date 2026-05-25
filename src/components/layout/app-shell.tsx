import Link from "next/link";
import { Home, Library, BarChart3, Download, Settings } from "lucide-react";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Badge } from "@/components/ui/badge";

const nav = [
  { href: "/app", label: "Dashboard", icon: Home },
  { href: "/app/history", label: "History", icon: Library },
  { href: "/app/stats", label: "Stats", icon: BarChart3 },
  { href: "/app/export", label: "Export", icon: Download },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const subscription = session?.user?.subscriptionStatus || "free";

  return (
    <div className="container-shell grid gap-6 py-6 lg:grid-cols-[240px_1fr]">
      <aside className="panel h-fit p-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            ReadLog
          </Link>
          <Badge>{subscription}</Badge>
        </div>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Private reading history with fast logging, stats, and exports.
        </p>
        <nav className="mt-6 space-y-2">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[var(--muted)] transition hover:bg-[var(--panel-strong)] hover:text-[var(--ink)]"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 border-t border-[var(--line)] pt-4">
          <SignOutButton />
        </div>
      </aside>
      <main className="space-y-6">{children}</main>
    </div>
  );
}
