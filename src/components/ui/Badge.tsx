import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "muted" | "success";
  className?: string;
}

const variants = {
  default: "bg-surface-elevated text-muted-foreground ring-1 ring-border",
  accent: "bg-accent-soft text-accent",
  muted: "bg-zinc-100 text-zinc-600",
  success: "bg-emerald-50 text-emerald-700",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
