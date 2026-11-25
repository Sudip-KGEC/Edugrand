import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Levels } from "@/components/home/Levels";
import { Featured } from "@/components/home/Featured";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Categories } from "@/components/home/Categories";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { buildMetadata } from "@/lib/seo";
import { getFeaturedScholarships, getScholarships } from "@/services/scholarship.service";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "EduGrand | Find scholarships for school, college and study abroad",
  path: "/",
});

export default async function HomePage() {
  const [featured, closing] = await Promise.all([
    getFeaturedScholarships(),
    getScholarships({ sort: "deadline", limit: 3 }, 300),
  ]);

  return (
    <>
      <Hero />
      <Stats />
      <Levels />
      <Featured
        muted
        items={featured}
        eyebrow="Featured"
        title="Top scholarships open right now"
        description="Hand picked awards with strong funding and clear eligibility."
        href="/scholarships"
      />
      <HowItWorks />
      <Categories />
      <Featured
        items={closing.items}
        eyebrow="Apply soon"
        title="Closing soon"
        description="These deadlines are coming up. Check eligibility and apply early."
        href="/scholarships?sort=deadline"
      />
      <Faq />
      <FinalCta />
    </>
  );
}
