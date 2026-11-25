import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Filters } from "@/components/scholarship/Filters";
import { Pagination } from "@/components/scholarship/Pagination";
import { ScholarshipGrid } from "@/components/scholarship/ScholarshipGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";
import { getScholarshipMeta, getScholarships } from "@/services/scholarship.service";
import type { ScholarshipFilters } from "@/types";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const pick = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

async function parseFilters(searchParams: SearchParams): Promise<ScholarshipFilters> {
  const params = await searchParams;
  const page = Number(pick(params.page));
  return {
    q: pick(params.q)?.slice(0, 80),
    level: pick(params.level),
    category: pick(params.category),
    country: pick(params.country),
    sort: pick(params.sort) ?? "deadline",
    page: Number.isInteger(page) && page > 0 ? page : 1,
    limit: 12,
  };
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const filters = await parseFilters(searchParams);
  const parts = [filters.level, filters.category, filters.country].filter(Boolean);
  const title = parts.length ? `${parts.join(" ")} Scholarships` : "Browse All Scholarships";
  return buildMetadata({
    title,
    description: `Search ${parts.join(" ").toLowerCase() || "verified"} scholarships on EduGrand. Compare amounts, deadlines and eligibility, then apply for free.`,
    path: "/scholarships",
    noindex: Boolean(filters.q) || (filters.page ?? 1) > 1,
  });
}

export default async function ScholarshipsPage({ searchParams }: { searchParams: SearchParams }) {
  const filters = await parseFilters(searchParams);
  const [data, meta] = await Promise.all([getScholarships(filters, 60), getScholarshipMeta()]);

  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE.url}/scholarships/${item.slug}`,
      name: item.title,
    })),
  };

  return (
    <>
      <JsonLd data={list} />
      <section className="bg-hero border-b border-line">
        <Container className="py-14 sm:py-20">
          <h1 data-hero suppressHydrationWarning className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Browse <span className="text-brand-gradient">scholarships</span>
          </h1>
          <p data-hero suppressHydrationWarning className="mt-4 max-w-2xl text-lg text-muted">
            Compare funding, deadlines and eligibility across school, college, research and study abroad awards.
          </p>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <Filters filters={filters} meta={meta} />

        <div className="mt-10 flex items-center justify-between">
          <p className="text-sm font-medium text-muted" aria-live="polite">
            {data.total} {data.total === 1 ? "scholarship" : "scholarships"} found
          </p>
        </div>

        <div className="mt-6">
          {data.items.length ? (
            <>
              <ScholarshipGrid items={data.items} />
              <Pagination page={data.page} pages={data.pages} filters={filters} />
            </>
          ) : (
            <div className="rounded-3xl bg-mist px-6 py-20 text-center ring-1 ring-line">
              <SearchX className="mx-auto size-12 text-brand" />
              <h2 className="mt-5 font-display text-2xl font-bold">No scholarships match your search</h2>
              <p className="mx-auto mt-2 max-w-md text-muted">Try fewer filters or a different keyword to see more results.</p>
              <ButtonLink href="/scholarships" className="mt-6">
                Reset search
              </ButtonLink>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
