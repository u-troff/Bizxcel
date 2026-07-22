import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline-navy";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold text-white hover:bg-gold-hover",
  secondary:
    "border border-border text-ink bg-transparent hover:border-gold hover:text-gold",
  "outline-navy":
    "border border-white/30 text-white bg-transparent hover:border-white hover:bg-white/10",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-sm font-semibold font-sans transition-colors duration-200 whitespace-nowrap";

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
