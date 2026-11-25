import { Search, SlidersHorizontal } from "lucide-react";
import type { ScholarshipFilters, ScholarshipMeta } from "@/types";
import { Button, ButtonLink } from "@/components/ui/Button";

const selectClass =
  "h-12 w-full rounded-2xl border-0 bg-white px-4 text-sm font-medium text-ink ring-1 ring-line outline-none transition focus:ring-2 focus:ring-brand";

function Select({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value?: string;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </label>
      <select id={name} name={name} defaultValue={value ?? ""} className={selectClass}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Filters({ filters, meta }: { filters: ScholarshipFilters; meta: ScholarshipMeta }) {
  const hasFilters = Boolean(filters.q || filters.level || filters.category || filters.country);

  return (
    <form action="/scholarships" method="get" role="search" className="rounded-3xl bg-mist p-5 ring-1 ring-line sm:p-6">
      <div className="mb-5 flex items-center gap-2 font-display text-sm font-semibold text-ink">
        <SlidersHorizontal className="size-4 text-brand" />
        Refine your search
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
        <div>
          <label htmlFor="q" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Keyword
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={filters.q ?? ""}
              placeholder="Name or provider"
              className={`${selectClass} pl-11`}
            />
          </div>
        </div>
        <Select name="level" label="Level" value={filters.level} options={meta.levels} />
        <Select name="category" label="Category" value={filters.category} options={meta.categories} />
        <Select name="country" label="Country" value={filters.country} options={meta.countries} />
        <div>
          <label htmlFor="sort" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Sort by
          </label>
          <select id="sort" name="sort" defaultValue={filters.sort ?? "deadline"} className={selectClass}>
            <option value="deadline">Nearest deadline</option>
            <option value="amount">Highest amount</option>
            <option value="latest">Recently added</option>
          </select>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button type="submit">Search scholarships</Button>
        {hasFilters ? (
          <ButtonLink href="/scholarships" variant="outline">
            Clear filters
          </ButtonLink>
        ) : null}
      </div>
    </form>
  );
}
