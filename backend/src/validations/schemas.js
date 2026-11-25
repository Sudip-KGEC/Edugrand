import { z } from "zod";
import { CATEGORIES, LEVELS, SCHOLARSHIP_STATUS } from "../models/constants.js";

const list = z.array(z.string().trim().min(1).max(300)).max(25);

export const scholarshipBody = z.object({
  title: z.string().trim().min(5).max(160),
  provider: z.string().trim().min(2).max(120),
  summary: z.string().trim().min(20).max(300),
  description: z.string().trim().min(50).max(10000),
  eligibility: list.default([]),
  benefits: list.default([]),
  documents: list.default([]),
  amount: z.coerce.number().min(0),
  amountLabel: z.string().trim().min(1).max(60),
  level: z.enum(LEVELS),
  category: z.enum(CATEGORIES),
  country: z.string().trim().min(2).max(60),
  deadline: z.coerce.date(),
  applyUrl: z.string().trim().url().max(500),
  featured: z.boolean().default(false),
  status: z.enum(SCHOLARSHIP_STATUS).default("active"),
});

export const scholarshipUpdate = scholarshipBody.partial();

export const scholarshipQuery = z.object({
  q: z.string().trim().max(80).optional(),
  level: z.enum(LEVELS).optional(),
  category: z.enum(CATEGORIES).optional(),
  country: z.string().trim().max(60).optional(),
  status: z.enum(SCHOLARSHIP_STATUS).optional(),
  featured: z.enum(["true", "false"]).optional(),
  sort: z.enum(["deadline", "amount", "latest"]).default("deadline"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

export const loginBody = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6).max(100),
});

export const contactBody = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email(),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(),
});

export const newsletterBody = z.object({
  email: z.string().trim().toLowerCase().email(),
});


export const chatBody = z.object({
  message: z.string().trim().min(1, "Message is required").max(500, "Message is too long"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "bot"]),
        text: z.string().max(600),
      }),
    )
    .max(8)
    .default([]),
});

export const inquiryQuery = z.object({
  type: z.enum(["contact", "newsletter"]).optional(),
  status: z.enum(["new", "read"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const inquiryUpdate = z.object({ status: z.enum(["new", "read"]) });
