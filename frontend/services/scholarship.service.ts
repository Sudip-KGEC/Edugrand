import { FALLBACK_SCHOLARSHIPS } from "@/constants/fallback";
import type { Paginated, Scholarship, ScholarshipFilters, ScholarshipMeta } from "@/types";
import { apiFetch } from "./api";

function toQuery(filters: ScholarshipFilters) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) params.set(key, String(value));
  });
  const query = params.toString();
  return query ? `?${query}` : "";
}

const emptyPage: Paginated<Scholarship> = { items: [], total: 0, page: 1, pages: 1 };

export async function getScholarships(filters: ScholarshipFilters = {}, revalidate = 120) {
  try {
    return await apiFetch<Paginated<Scholarship>>(`/scholarships${toQuery(filters)}`, { revalidate });
  } catch {
    return emptyPage;
  }
}

export async function getFeaturedScholarships() {
  const data = await getScholarships({ featured: true, limit: 6 }, 300);
  if (data.items.length) return data.items;
  return FALLBACK_SCHOLARSHIPS;
}

export async function getScholarship(slug: string) {
  try {
    return await apiFetch<Scholarship>(`/scholarships/${encodeURIComponent(slug)}`, { revalidate: 300 });
  } catch {
    return null;
  }
}

export async function getScholarshipMeta() {
  try {
    return await apiFetch<ScholarshipMeta>("/scholarships/meta", { revalidate: 600 });
  } catch {
    return { levels: [], categories: [], countries: [] } satisfies ScholarshipMeta;
  }
}

export async function getScholarshipSlugs() {
  try {
    return await apiFetch<{ slug: string; updatedAt?: string }[]>("/scholarships/slugs", { revalidate: 600 });
  } catch {
    return [];
  }
}
