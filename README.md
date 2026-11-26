# EduGrand

A full-stack student scholarship portal. Students can search and filter scholarships and get instant answers from an AI chatbot. Admins manage scholarships and student inquiries from a separate dashboard.

## Live Demo

| App | Link |
| --- | --- |
| Website | https://edugrand.vercel.app |
| Admin panel | https://edugrandadmin.vercel.app |
| API health check | https://edugrandbackend.vercel.app/api/health |

**Demo admin login**

- Email: `[admin email]`
- Password: `[admin password]`

> The backend runs on serverless functions, so the first request after a period of inactivity may take a few seconds.

## The Problem

Students often struggle to find scholarships that match their level, field and country. Information is scattered across many sites, deadlines are easy to miss, and basic questions can take days to get answered. Organizations that list scholarships also have no simple way to publish and manage them.

## The Solution

- **For students:** a fast, searchable scholarship directory with filters, detail pages, a contact form, a newsletter, and an AI chatbot that answers questions 24/7.
- **For admins:** a protected dashboard to add, edit and delete scholarships, track stats, and review student inquiries without touching the database.

## Features

**Website (students)**

- Search and filter scholarships by keyword, level, category, country and featured status, with sorting and pagination
- Scholarship detail pages with deadline, eligibility and provider information
- Expired scholarships are automatically removed from listings
- AI chatbot (Google Gemini) for instant answers
- Contact and newsletter forms
- Filters are plain GET forms, so search works even without JavaScript

**Admin panel**

- JWT login with protected routes
- Dashboard with key stats
- Full CRUD for scholarships
- Inquiry management (view, update status, delete)

**SEO and performance**

- Static generation with revalidation (home and detail pages every 5 minutes)
- Per-page metadata, canonical URLs, Open Graph, `sitemap.xml`, `robots.txt`, web manifest
- JSON-LD structured data (Organization, WebSite search, FAQ, ItemList, BreadcrumbList)
- Self-hosted fonts, GSAP loaded on demand, chatbot loaded after the page is idle
- Cache headers on API responses

## Tech Stack

| Layer | Technology |
| --- | --- |
| Website | Next.js 15, TypeScript, Tailwind CSS 4, GSAP |
| Admin panel | React, Vite, Tailwind CSS 4 |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Auth | JWT, role-based admin access |
| Validation | Zod |
| AI | Google Gemini API (called from the backend, so the key never reaches the browser) |
| Deployment | Vercel (three separate projects) |

## Key Technical Decisions

- **Separate deployments:** website, admin and API scale and deploy independently.
- **Layered backend:** controllers handle HTTP, services hold business logic, and Zod schemas validate input at the edge.
- **Secure AI integration:** the chatbot calls a backend `/api/chat` endpoint, which talks to Gemini, keeping the API key server-side.
- **CORS allowlist:** only the configured website and admin origins can call the API (driven by the `CLIENT_ORIGINS` env variable).
- **Rate limiting and centralized error handling** middleware on the API.
- **Static generation with revalidation** for fast pages and good SEO.

## Notes

- Scholarship data in the demo is sample data with example providers.
- Some stats and the contact email on the site are placeholders.
- The demo admin account is for review purposes only.

## Author

**[ Sudip ]**
[contact.sudipdas01@gmail.com]