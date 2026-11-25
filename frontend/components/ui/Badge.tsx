import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "soft",
  className,
}: {
  children: React.ReactNode;
  tone?: "soft" | "dark" | "outline";
  className?: string;
}) {
  const tones = {
    soft: "bg-brand-soft text-brand-dark",
    dark: "bg-ink text-white",
    outline: "bg-white text-ink ring-1 ring-line",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}
