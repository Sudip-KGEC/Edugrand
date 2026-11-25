import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark,
  center,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div data-reveal suppressHydrationWarning className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-white/70" : "text-muted")}>{description}</p>
      ) : null}
    </div>
  );
}
