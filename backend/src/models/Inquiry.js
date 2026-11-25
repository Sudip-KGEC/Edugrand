import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["contact", "newsletter"], required: true, index: true },
    name: { type: String, trim: true, maxlength: 80, default: "" },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, trim: true, maxlength: 2000, default: "" },
    status: { type: String, enum: ["new", "read"], default: "new" },
  },
  { timestamps: true },
);

inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ type: 1, email: 1 });

export const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);
