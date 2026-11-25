import mongoose from "mongoose";
import { CATEGORIES, LEVELS, SCHOLARSHIP_STATUS } from "./constants.js";

const scholarshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, required: true, unique: true },
    provider: { type: String, required: true, trim: true, maxlength: 120 },
    summary: { type: String, required: true, trim: true, maxlength: 300 },
    description: { type: String, required: true, trim: true },
    eligibility: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    documents: { type: [String], default: [] },
    amount: { type: Number, required: true, min: 0, default: 0 },
    amountLabel: { type: String, required: true, trim: true },
    level: { type: String, enum: LEVELS, required: true, index: true },
    category: { type: String, enum: CATEGORIES, required: true, index: true },
    country: { type: String, required: true, trim: true, index: true },
    deadline: { type: Date, required: true },
    applyUrl: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: SCHOLARSHIP_STATUS, default: "active" },
  },
  { timestamps: true },
);

scholarshipSchema.index({ status: 1, deadline: 1 });
scholarshipSchema.index({ status: 1, featured: 1, createdAt: -1 });

export const Scholarship = mongoose.models.Scholarship || mongoose.model("Scholarship", scholarshipSchema);
