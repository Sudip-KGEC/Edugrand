# EduGrand

Student scholarship portal. Three independent apps in one repository, each deployed as its own Vercel project.

```
edugrand/
  frontend/   Public website (Next.js 15, Tailwind 4, GSAP)
  backend/    REST API (Express, MongoDB, JWT)
  admin/      Admin panel (Vite, React, Tailwind 4)
```

## Structure

```
backend/
  api/index.js            Vercel serverless entry
  src/
    config/               env and database connection
    models/               Mongoose models
    routes/               URL definitions
    controllers/          request and response handling
    services/             business logic
    middleware/           auth, validation, rate limits, errors
    validations/          zod schemas
    seed/                 sample data and admin creation

frontend/
  app/                    routes, metadata, sitemap, robots
  components/             layout, home, scholarship, chatbot, forms, ui
  services/               API client layer
  hooks/ lib/ constants/ types/

admin/
  src/pages/              Login, Dashboard, Scholarships, Inquiries
  src/components/         Layout, Modal, ScholarshipForm
  src/lib/ context/
```

## Run locally

Requires Node 20+ and a MongoDB database (local or Atlas).

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev

cd ../frontend
cp .env.example .env.local
npm install
npm run dev

cd ../admin
cp .env.example .env
npm install
npm run dev
```

- Website: http://localhost:3000
- API: http://localhost:5000/api/health
- Admin: http://localhost:5173 (sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD` from the backend `.env`)

`npm run seed` is safe to run again. It updates the sample scholarships and the admin account.

## Deploy to Vercel

Create three Vercel projects from the same repository and set the **Root Directory** for each one.

| Project  | Root directory | Environment variables |
| -------- | -------------- | --------------------- |
| backend  | `backend`      | `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGINS` |
| frontend | `frontend`     | `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL` |
| admin    | `admin`        | `VITE_API_URL` |

Order of setup:

1. Deploy `backend`. Set `CLIENT_ORIGINS` to your website and admin URLs, comma separated, with no trailing slash.
2. Run `npm run seed` once on your machine with the production `MONGODB_URI` and your chosen `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
3. Deploy `frontend` with `NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api` and `NEXT_PUBLIC_SITE_URL=https://your-domain.com`.
4. Deploy `admin` with `VITE_API_URL=https://your-backend.vercel.app/api`.

If you use MongoDB Atlas, allow Vercel's IP range (or `0.0.0.0/0`) in Network Access.

## API

Public

- `GET /api/scholarships` filters: `q`, `level`, `category`, `country`, `featured`, `sort`, `page`, `limit`
- `GET /api/scholarships/meta` available filter values
- `GET /api/scholarships/slugs` used by the sitemap
- `GET /api/scholarships/:slug`
- `POST /api/inquiries/contact`
- `POST /api/inquiries/newsletter`
- `POST /api/chat`
- `GET /api/health`

Admin (Bearer token)

- `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/admin/stats`
- `GET POST /api/admin/scholarships`, `GET PUT DELETE /api/admin/scholarships/:id`
- `GET /api/admin/inquiries`, `PATCH DELETE /api/admin/inquiries/:id`

## Performance and SEO

- Pages are statically generated and revalidated (home 5 min, detail 5 min), API responses carry cache headers
- Fonts are self hosted, GSAP loads on demand, the chatbot loads after the page is idle
- Per page metadata, canonical URLs, Open Graph, `sitemap.xml`, `robots.txt`, web manifest
- JSON-LD for Organization, WebSite search, FAQ, ItemList and BreadcrumbList
- Search and filters are plain GET forms, so they work without JavaScript
- Expired scholarships drop out of listings automatically

## Before you go live

- The numbers in `frontend/constants/home.ts` (`STATS`) and the contact email in `frontend/constants/site.ts` are placeholders. Replace them with real values
- Seed scholarships are sample data with example providers. Replace them from the admin panel
- Change `ADMIN_PASSWORD` and set a long random `JWT_SECRET`
- Review the privacy policy and terms text with a legal advisor
