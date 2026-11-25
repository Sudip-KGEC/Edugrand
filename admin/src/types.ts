import type { CATEGORIES, LEVELS, STATUSES } from "./constants";

export type Scholarship = {
  _id: string;
  title: string;
  slug: string;
  provider: string;
  summary: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  documents: string[];
  amount: number;
  amountLabel: string;
  level: (typeof LEVELS)[number];
  category: (typeof CATEGORIES)[number];
  country: string;
  deadline: string;
  applyUrl: string;
  featured: boolean;
  status: (typeof STATUSES)[number];
  createdAt: string;
};

export type Inquiry = {
  _id: string;
  type: "contact" | "newsletter";
  name: string;
  email: string;
  message: string;
  status: "new" | "read";
  createdAt: string;
};

export type Paginated<T> = { items: T[]; total: number; page: number; pages: number };

export type Stats = {
  total: number;
  active: number;
  featured: number;
  closingSoon: number;
  newInquiries: number;
  subscribers: number;
  byCategory: { category: string; count: number }[];
  recent: Pick<Scholarship, "_id" | "title" | "slug" | "status" | "deadline" | "createdAt">[];
};

export type AdminUser = { id: string; name: string; email: string };
