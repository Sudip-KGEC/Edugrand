import { asyncHandler } from "../utils/asyncHandler.js";
import * as service from "../services/scholarship.service.js";

export const list = asyncHandler(async (req, res) => {
  const data = await service.listScholarships(req.validQuery);
  res.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  res.json({ success: true, data });
});

export const meta = asyncHandler(async (_req, res) => {
  const data = await service.getScholarshipMeta();
  res.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
  res.json({ success: true, data });
});

export const slugs = asyncHandler(async (_req, res) => {
  const data = await service.listSlugs();
  res.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
  res.json({ success: true, data });
});

export const detail = asyncHandler(async (req, res) => {
  const data = await service.getScholarshipBySlug(req.params.slug);
  res.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  res.json({ success: true, data });
});
