import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "onDark";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-sm hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-accent/40",
  secondary:
    "bg-white text-foreground shadow-sm ring-1 ring-border hover:bg-surface-elevated hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-accent/30",
  ghost:
    "bg-transparent text-foreground hover:bg-surface-elevated focus-visible:ring-accent/30",
  outline:
    "bg-transparent text-accent ring-1 ring-accent/25 hover:bg-accent-soft hover:-translate-y-0.5 focus-visible:ring-accent/40",
  /** For dark / highlighted surfaces (e.g. Pro pricing card). */
  onDark:
    "bg-transparent text-white ring-1 ring-white/40 hover:bg-white/10 focus-visible:ring-white/50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm rounded-[10px]",
  md: "h-11 px-5 text-sm rounded-[12px]",
  lg: "h-12 px-6 text-[15px] rounded-[14px]",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    disabled,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (props.href) {
    const { href, onClick } = props;
    if (disabled) {
      return (
        <span className={cn(classes, "pointer-events-none opacity-50")} aria-disabled>
          {children}
        </span>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      disabled={disabled}
      onClick={buttonProps.onClick}
    >
      {children}
    </button>
  );
}
