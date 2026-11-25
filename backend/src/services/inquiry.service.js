import { Inquiry } from "../models/Inquiry.js";
import { ApiError } from "../utils/ApiError.js";

export async function createContact({ name, email, message }) {
  return Inquiry.create({ type: "contact", name, email, message });
}

export async function subscribe(email) {
  await Inquiry.updateOne({ type: "newsletter", email }, { $setOnInsert: { type: "newsletter", email } }, { upsert: true });
}

export async function listInquiries({ type, status, page, limit }) {
  const filter = {};
  if (type) filter.type = type;
  if (status) filter.status = status;
  const [items, total] = await Promise.all([
    Inquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Inquiry.countDocuments(filter),
  ]);
  return { items, total, page, pages: Math.max(1, Math.ceil(total / limit)) };
}

export async function updateInquiry(id, status) {
  const item = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
  if (!item) throw new ApiError(404, "Inquiry not found");
  return item;
}

export async function deleteInquiry(id) {
  const item = await Inquiry.findByIdAndDelete(id);
  if (!item) throw new ApiError(404, "Inquiry not found");
}
