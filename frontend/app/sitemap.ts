import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { getScholarshipSlugs } from "@/services/scholarship.service";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getScholarshipSlugs();
  const now = new Date();
  const pages = ["", "/scholarships", "/about", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/scholarships" ? ("daily" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path === "/scholarships" ? 0.9 : 0.5,
  }));
  const detail = slugs.map((item) => ({
    url: `${SITE.url}/scholarships/${item.slug}`,
    lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...pages, ...detail];
}
