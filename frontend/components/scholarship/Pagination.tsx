import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ScholarshipFilters } from "@/types";
import { cn } from "@/lib/utils";

function href(filters: ScholarshipFilters, page: number) {
  const params = new URLSearchParams();
  Object.entries({ ...filters, page }).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && !(key === "page" && value === 1) && key !== "limit") {
      params.set(key, String(value));
    }
  });
  const query = params.toString();
  return query ? `/scholarships?${query}` : "/scholarships";
}

export function Pagination({ page, pages, filters }: { page: number; pages: number; filters: ScholarshipFilters }) {
  if (pages <= 1) return null;

  const numbers = Array.from({ length: pages }, (_, index) => index + 1).filter(
    (n) => n === 1 || n === pages || Math.abs(n - page) <= 1,
  );

  const base = "grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-semibold transition";

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={href(filters, page - 1)} rel="prev" aria-label="Previous page" className={cn(base, "ring-1 ring-line hover:ring-brand")}>
          <ChevronLeft className="size-4" />
        </Link>
      ) : null}
      {numbers.map((n, index) => (
        <span key={n} className="flex items-center gap-2">
          {index > 0 && n - numbers[index - 1] > 1 ? <span className="text-muted">…</span> : null}
          <Link
            href={href(filters, n)}
            aria-current={n === page ? "page" : undefined}
            className={cn(base, n === page ? "bg-brand-gradient text-white shadow-glow" : "ring-1 ring-line hover:ring-brand")}
          >
            {n}
          </Link>
        </span>
      ))}
      {page < pages ? (
        <Link href={href(filters, page + 1)} rel="next" aria-label="Next page" className={cn(base, "ring-1 ring-line hover:ring-brand")}>
          <ChevronRight className="size-4" />
        </Link>
      ) : null}
    </nav>
  );
}
