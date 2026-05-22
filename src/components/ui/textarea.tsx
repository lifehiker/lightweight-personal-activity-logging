import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-[rgba(191,75,44,0.10)]",
        className,
      )}
      {...props}
    />
  );
}
