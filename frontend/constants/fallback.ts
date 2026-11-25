import type { Scholarship } from "@/types";

const inDays = (n: number) => new Date(Date.now() + n * 86400000).toISOString();

export const FALLBACK_SCHOLARSHIPS: Scholarship[] = [
  {
    _id: "f1",
    title: "National Merit Excellence Scholarship",
    slug: "national-merit-excellence-scholarship",
    provider: "EduGrand Foundation",
    summary: "Annual award for top performing undergraduate students across all streams in India.",
    amount: 50000,
    amountLabel: "₹50,000 / year",
    level: "Undergraduate",
    category: "Merit",
    country: "India",
    deadline: inDays(21),
    featured: true,
  },
  {
    _id: "f2",
    title: "Women in STEM Leadership Grant",
    slug: "women-in-stem-leadership-grant",
    provider: "Bright Futures Trust",
    summary: "Supports women pursuing engineering, science, technology or mathematics degrees.",
    amount: 75000,
    amountLabel: "₹75,000 one time",
    level: "Undergraduate",
    category: "Women",
    country: "India",
    deadline: inDays(35),
    featured: true,
  },
  {
    _id: "f3",
    title: "Global Graduate Research Fellowship",
    slug: "global-graduate-research-fellowship",
    provider: "Horizon Education Council",
    summary: "Fully funded masters fellowship for students planning research focused study abroad.",
    amount: 2500000,
    amountLabel: "Up to ₹25 lakh",
    level: "Postgraduate",
    category: "International",
    country: "Global",
    deadline: inDays(60),
    featured: true,
  },
];
