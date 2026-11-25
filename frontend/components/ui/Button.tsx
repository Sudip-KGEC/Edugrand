import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "ghost" | "light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand-gradient text-white shadow-glow hover:brightness-105 hover:-translate-y-0.5",
  dark: "bg-ink text-white hover:bg-ink-soft hover:-translate-y-0.5",
  outline: "bg-white text-ink ring-1 ring-line hover:ring-brand hover:text-brand",
  ghost: "text-ink hover:bg-brand-soft hover:text-brand",
  light: "bg-white text-ink hover:bg-brand-soft",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function buttonStyles(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

type Common = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode };

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: Common & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  const classes = buttonStyles(variant, size, className);
  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: Common & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button className={buttonStyles(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
