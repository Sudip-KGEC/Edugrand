import Link from "next/link";
import { ArrowUpRight, CalendarClock, MapPin } from "lucide-react";
import type { Scholarship } from "@/types";
import { daysLeft, deadlineLabel } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function ScholarshipCard({ item }: { item: Scholarship }) {
  const urgent = daysLeft(item.deadline) <= 14;

  return (
    <article
      data-reveal suppressHydrationWarning
      className="group relative flex h-full flex-col rounded-3xl bg-white p-6 shadow-card ring-1 ring-line transition duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:ring-brand/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge>{item.category}</Badge>
          <Badge tone="outline">{item.level}</Badge>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mist text-ink transition group-hover:bg-brand-gradient group-hover:text-white">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-ink">
        <Link href={`/scholarships/${item.slug}`} className="after:absolute after:inset-0 after:rounded-3xl">
          {item.title}
        </Link>
      </h3>
      <p className="mt-1.5 text-sm font-medium text-muted">{item.provider}</p>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{item.summary}</p>

      <div className="mt-auto pt-6">
        <p className="font-display text-2xl font-bold text-brand-gradient">{item.amountLabel}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {item.country}
          </span>
          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1", urgent ? "bg-ink text-white" : "bg-mist")}>
            <CalendarClock className="size-3.5" />
            {deadlineLabel(item.deadline)}
          </span>
        </div>
      </div>
    </article>
  );
}
