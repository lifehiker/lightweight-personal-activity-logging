import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export type BlogPostSection = {
  heading: string;
  body: string;
};

export async function BlogPost({
  eyebrow,
  title,
  description,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: BlogPostSection[];
}) {
  const session = await auth();

  return (
    <Section className="py-10">
      <article className="panel p-8 md:p-10">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="balance mt-3 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="pretty mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
          {description}
        </p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
              <p className="pretty mt-3 leading-8 text-[var(--muted)]">{section.body}</p>
            </section>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--line)] pt-6">
          <Link href={session ? "/app" : "/signin"}>
            <Button>{session ? "Open ReadLog" : "Start a private log"}</Button>
          </Link>
          <Link href="/private-reading-log-app">
            <Button variant="secondary">Why private tracking</Button>
          </Link>
        </div>
      </article>
    </Section>
  );
}
