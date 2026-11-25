import { Scholarship } from "../models/Scholarship.js";
import { ApiError } from "../utils/ApiError.js";
import { escapeRegex, slugify } from "../utils/slugify.js";

const SORTS = {
  deadline: { deadline: 1, _id: 1 },
  amount: { amount: -1, _id: 1 },
  latest: { createdAt: -1, _id: 1 },
};

const startOfToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

function buildFilter(query, { publicOnly }) {
  const filter = {};
  if (publicOnly) {
    filter.status = "active";
    filter.deadline = { $gte: startOfToday() };
  } else if (query.status) {
    filter.status = query.status;
  }
  if (query.level) filter.level = query.level;
  if (query.category) filter.category = query.category;
  if (query.country) filter.country = new RegExp(`^${escapeRegex(query.country)}$`, "i");
  if (query.featured) filter.featured = query.featured === "true";
  if (query.q) {
    const pattern = new RegExp(escapeRegex(query.q), "i");
    filter.$or = [{ title: pattern }, { provider: pattern }, { summary: pattern }, { country: pattern }];
  }
  return filter;
}

export async function listScholarships(query, { publicOnly = true } = {}) {
  const filter = buildFilter(query, { publicOnly });
  const skip = (query.page - 1) * query.limit;
  const [items, total] = await Promise.all([
    Scholarship.find(filter, publicOnly ? "-description -eligibility -benefits -documents" : undefined)
      .sort(SORTS[query.sort])
      .skip(skip)
      .limit(query.limit)
      .lean(),
    Scholarship.countDocuments(filter),
  ]);
  return { items, total, page: query.page, pages: Math.max(1, Math.ceil(total / query.limit)) };
}

export async function getScholarshipBySlug(slug) {
  const item = await Scholarship.findOne({ slug, status: { $ne: "draft" } }).lean();
  if (!item) throw new ApiError(404, "Scholarship not found");
  return item;
}

export async function getScholarshipMeta() {
  const filter = { status: "active", deadline: { $gte: startOfToday() } };
  const [levels, categories, countries] = await Promise.all([
    Scholarship.distinct("level", filter),
    Scholarship.distinct("category", filter),
    Scholarship.distinct("country", filter),
  ]);
  return { levels: levels.sort(), categories: categories.sort(), countries: countries.sort() };
}

export async function listSlugs() {
  return Scholarship.find({ status: "active" }, "slug updatedAt").sort({ updatedAt: -1 }).limit(5000).lean();
}

async function uniqueSlug(title) {
  const base = slugify(title);
  let slug = base;
  let attempt = 1;
  while (await Scholarship.exists({ slug })) {
    attempt += 1;
    slug = `${base}-${attempt}`;
  }
  return slug;
}

export async function createScholarship(data) {
  const slug = await uniqueSlug(data.title);
  return Scholarship.create({ ...data, slug });
}

export async function updateScholarship(id, data) {
  const item = await Scholarship.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, "Scholarship not found");
  return item;
}

export async function deleteScholarship(id) {
  const item = await Scholarship.findByIdAndDelete(id);
  if (!item) throw new ApiError(404, "Scholarship not found");
}

export async function getAdminScholarship(id) {
  const item = await Scholarship.findById(id).lean();
  if (!item) throw new ApiError(404, "Scholarship not found");
  return item;
}
