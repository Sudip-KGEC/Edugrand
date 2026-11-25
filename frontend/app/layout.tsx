import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE } from "@/constants/site";
import { ChatLoader } from "@/components/chatbot/ChatLoader";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const sora = localFont({
  src: "./fonts/Sora.woff2",
  variable: "--font-sora",
  display: "swap",
  weight: "100 800",
});

const inter = localFont({
  src: "./fonts/Inter.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "scholarships",
    "scholarship portal",
    "student scholarships India",
    "merit scholarship",
    "study abroad scholarships",
    "education grants",
    "fellowships",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ff6a00",
  width: "device-width",
  initialScale: 1,
};

const organization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      email: SITE.email,
      logo: `${SITE.url}/icon.svg`,
    },
    {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE.url}/scholarships?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <noscript>
          <style>{"[data-reveal],[data-hero]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <JsonLd data={organization} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ChatLoader />
      </body>
    </html>
  );
}
