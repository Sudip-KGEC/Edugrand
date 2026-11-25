import { Award, Globe2, GraduationCap, HeartHandshake, Microscope, School, Trophy, Users } from "lucide-react";

export const LEVEL_CARDS = [
  { label: "School", href: "/scholarships?level=School", icon: School, hint: "Class 9 to 12" },
  { label: "Undergraduate", href: "/scholarships?level=Undergraduate", icon: GraduationCap, hint: "Bachelor's degrees" },
  { label: "Postgraduate", href: "/scholarships?level=Postgraduate", icon: Award, hint: "Masters and MBA" },
  { label: "PhD", href: "/scholarships?level=PhD", icon: Microscope, hint: "Research fellowships" },
] as const;

export const CATEGORY_CARDS = [
  { label: "Merit", href: "/scholarships?category=Merit", icon: Trophy },
  { label: "Need-based", href: "/scholarships?category=Need-based", icon: HeartHandshake },
  { label: "Women", href: "/scholarships?category=Women", icon: Users },
  { label: "International", href: "/scholarships?category=International", icon: Globe2 },
] as const;

export const STATS = [
  { value: 2500, suffix: "+", label: "Scholarships listed" },
  { value: 150, suffix: "+", label: "Trusted providers" },
  { value: 40, suffix: " Cr+", label: "Funding available (₹)" },
  { value: 100, suffix: "%", label: "Free for students" },
] as const;

export const STEPS = [
  { title: "Search", text: "Filter by level, category and country to see only what fits your profile." },
  { title: "Check eligibility", text: "Every listing shows clear criteria, benefits and the documents you need." },
  { title: "Apply", text: "Go straight to the official application and submit before the deadline." },
] as const;

export const FAQS = [
  {
    q: "Is EduGrand free for students?",
    a: "Yes. Searching, saving and applying through EduGrand is completely free. We never ask students for money to access a scholarship.",
  },
  {
    q: "How do I know a scholarship is genuine?",
    a: "Each listing links to the official provider application page. We review every listing before publishing and remove expired or suspicious ones.",
  },
  {
    q: "Can I apply for more than one scholarship?",
    a: "In most cases yes. Check the rules of each provider, as a few do not allow you to hold two awards at the same time.",
  },
  {
    q: "What documents do I usually need?",
    a: "Common documents are an ID proof, latest mark sheets, an income certificate, a bank passbook and a passport size photo. Each scholarship page lists its own documents.",
  },
  {
    q: "How often is the list updated?",
    a: "New scholarships are added every week and listings are closed automatically after their deadline passes.",
  },
] as const;
