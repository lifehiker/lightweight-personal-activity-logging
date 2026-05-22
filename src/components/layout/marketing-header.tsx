import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export async function MarketingHeader() {
  const session = await auth();

  return (
    <header className="container-shell flex items-center justify-between py-5">
      <Link href="/" className="text-xl font-bold tracking-tight">
        ReadLog
      </Link>
      <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
        <Link href="/pricing">Pricing</Link>
        <Link href="/private-reading-log-app">Why private</Link>
        <Link href="/goodreads-alternative">Goodreads alternative</Link>
        <Link href="/storygraph-alternative">StoryGraph alternative</Link>
      </nav>
      <div className="flex items-center gap-3">
        <Link href={session ? "/app" : "/signin"} className="text-sm font-medium text-[var(--muted)]">
          {session ? "Dashboard" : "Sign in"}
        </Link>
        <Link href={session ? "/app" : "/signin"}>
          <Button>{session ? "Open app" : "Start logging"}</Button>
        </Link>
      </div>
    </header>
  );
}
