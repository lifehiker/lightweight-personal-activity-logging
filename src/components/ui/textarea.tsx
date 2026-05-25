import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-lg border border-[var(--line)] bg-white/90 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-[rgba(47,107,79,0.12)]",
        className,
      )}
      {...props}
    />
  );
}
