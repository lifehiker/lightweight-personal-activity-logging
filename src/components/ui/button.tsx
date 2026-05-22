import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-[var(--brand)] text-white shadow-[0_12px_30px_rgba(139,47,21,0.28)] hover:-translate-y-0.5",
        variant === "secondary" &&
          "border border-[var(--line)] bg-white/80 text-[var(--ink)] hover:bg-[var(--panel-strong)]",
        variant === "ghost" && "bg-transparent text-[var(--ink)] hover:bg-white/40",
        variant === "danger" && "bg-[#7f1d1d] text-white hover:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}
