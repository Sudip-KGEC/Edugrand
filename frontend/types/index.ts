export type Level = "School" | "Diploma" | "Undergraduate" | "Postgraduate" | "PhD";

export type Scholarship = {
  _id: string;
  title: string;
  slug: string;
  provider: string;
  summary: string;
  description?: string;
  eligibility?: string[];
  benefits?: string[];
  documents?: string[];
  amount: number;
  amountLabel: string;
  level: Level;
  category: string;
  country: string;
  deadline: string;
  applyUrl?: string;
  featured: boolean;
  updatedAt?: string;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pages: number;
};

export type ScholarshipMeta = {
  levels: string[];
  categories: string[];
  countries: string[];
};

export type ScholarshipFilters = {
  q?: string;
  level?: string;
  category?: string;
  country?: string;
  sort?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
};

export type ChatResult = Pick<Scholarship, "_id" | "title" | "slug" | "amountLabel" | "deadline" | "level" | "country">;

export type ChatReply = {
  reply: string;
  suggestions: string[];
  scholarships: ChatResult[];
};
