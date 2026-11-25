import { Scholarship } from "../models/Scholarship.js";
import { Inquiry } from "../models/Inquiry.js";

export async function getDashboardStats() {
  const now = new Date();
  const soon = new Date(now.getTime() + 14 * 86400000);
  const [total, active, featured, closingSoon, newInquiries, subscribers, byCategory, recent] = await Promise.all([
    Scholarship.countDocuments(),
    Scholarship.countDocuments({ status: "active", deadline: { $gte: now } }),
    Scholarship.countDocuments({ featured: true, status: "active" }),
    Scholarship.countDocuments({ status: "active", deadline: { $gte: now, $lte: soon } }),
    Inquiry.countDocuments({ type: "contact", status: "new" }),
    Inquiry.countDocuments({ type: "newsletter" }),
    Scholarship.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Scholarship.find({}, "title slug status deadline createdAt").sort({ createdAt: -1 }).limit(5).lean(),
  ]);
  return {
    total,
    active,
    featured,
    closingSoon,
    newInquiries,
    subscribers,
    byCategory: byCategory.map((row) => ({ category: row._id, count: row.count })),
    recent,
  };
}
