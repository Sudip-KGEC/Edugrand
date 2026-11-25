export const SITE = {
  name: "EduGrand",
  tagline: "Find the scholarship that funds your future",
  description:
    "EduGrand helps students discover verified scholarships, grants and fellowships for school, undergraduate, postgraduate and PhD studies in India and abroad. Search, check eligibility and apply for free.",
  url: process.env.FRONTEND_SITE_URL ?? "http://localhost:3000",
  apiUrl: process.env.BACKEND_API_URL ?? "http://localhost:5000/api",
  email: "support@edugrand.com",
} as const;

export const NAV_LINKS = [
  { label: "Scholarships", href: "/scholarships" },
  { label: "Closing soon", href: "/scholarships?sort=deadline" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  Explore: [
    { label: "All scholarships", href: "/scholarships" },
    { label: "Undergraduate", href: "/scholarships?level=Undergraduate" },
    { label: "Postgraduate", href: "/scholarships?level=Postgraduate" },
    { label: "PhD and research", href: "/scholarships?level=PhD" },
  ],
  Categories: [
    { label: "Merit based", href: "/scholarships?category=Merit" },
    { label: "Need based", href: "/scholarships?category=Need-based" },
    { label: "For women", href: "/scholarships?category=Women" },
    { label: "Study abroad", href: "/scholarships?category=International" },
  ],
  Company: [
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of use", href: "/terms" },
  ],
} as const;
