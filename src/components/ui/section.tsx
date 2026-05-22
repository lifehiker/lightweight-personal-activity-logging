import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <section className={cn("container-shell", className)}>{children}</section>;
}
