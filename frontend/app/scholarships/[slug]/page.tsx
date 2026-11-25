import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, CheckCircle2, ChevronRight, FileText, Gift, MapPin, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScholarshipGrid } from "@/components/scholarship/ScholarshipGrid";
import { SITE } from "@/constants/site";
import { daysLeft, formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { getScholarship, getScholarshipSlugs, getScholarships } from "@/services/scholarship.service";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getScholarshipSlugs();
  return slugs.slice(0, 100).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getScholarship(slug);
  if (!item) return buildMetadata({ title: "Scholarship not found", noindex: true });
  return buildMetadata({
    title: `${item.title} ${new Date(item.deadline).getFullYear()}`,
    description: `${item.summary} ${item.amountLabel}. Deadline ${formatDate(item.deadline)}. Check eligibility and apply.`,
    path: `/scholarships/${item.slug}`,
  });
}

function Block({ icon: Icon, title, items }: { icon: typeof Gift; title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section data-reveal suppressHydrationWarning className="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
      <h2 className="flex items-center gap-3 font-display text-xl font-bold text-ink">
        <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
          <Icon className="size-5" />
        </span>
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((entry) => (
          <li key={entry} className="flex gap-3 leading-relaxed text-muted">
            <CheckCircle2 className="mt-1 size-4 shrink-0 text-brand" />
            {entry}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ScholarshipDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getScholarship(slug);
  if (!item) notFound();

  const related = await getScholarships({ category: item.category, limit: 4 }, 300);
  const others = related.items.filter((entry) => entry.slug !== item.slug).slice(0, 3);
  const days = daysLeft(item.deadline);
  const closed = days === 0 && new Date(item.deadline).getTime() < Date.now();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Scholarships", item: `${SITE.url}/scholarships` },
      { "@type": "ListItem", position: 3, name: item.title, item: `${SITE.url}/scholarships/${item.slug}` },
    ],
  };

  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: item.title,
    description: item.summary,
    url: `${SITE.url}/scholarships/${item.slug}`,
    dateModified: item.updatedAt,
    about: { "@type": "Thing", name: `${item.category} scholarship for ${item.level} students` },
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={page} />

      <section className="bg-hero border-b border-line">
        <Container className="py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
            <Link href="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="size-3.5" />
            <Link href="/scholarships" className="hover:text-brand">Scholarships</Link>
            <ChevronRight className="size-3.5" />
            <span className="line-clamp-1 font-medium text-ink">{item.title}</span>
          </nav>
          <div className="mt-6 flex flex-wrap gap-2" data-hero suppressHydrationWarning>
            <Badge>{item.category}</Badge>
            <Badge tone="dark">{item.level}</Badge>
            <Badge tone="outline">
              <MapPin className="mr-1 size-3" />
              {item.country}
            </Badge>
          </div>
          <h1 data-hero suppressHydrationWarning className="mt-5 max-w-4xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {item.title}
          </h1>
          <p data-hero suppressHydrationWarning className="mt-3 text-lg font-medium text-muted">by {item.provider}</p>
          <p data-hero suppressHydrationWarning className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{item.summary}</p>
        </Container>
      </section>

      <Container className="grid grid-cols-[minmax(0,1fr)] gap-8 py-10 sm:py-14 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <section data-reveal suppressHydrationWarning className="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">About this scholarship</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-muted">
              {item.description?.split("\n").filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
          <Block icon={ShieldCheck} title="Eligibility" items={item.eligibility} />
          <Block icon={Gift} title="Benefits" items={item.benefits} />
          <Block icon={FileText} title="Documents required" items={item.documents} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-3xl bg-ink text-white shadow-lift">
            <div className="bg-brand-gradient p-6">
              <p className="text-sm font-semibold text-white/80">Scholarship value</p>
              <p className="mt-1 font-display text-3xl font-extrabold">{item.amountLabel}</p>
            </div>
            <div className="space-y-5 p-6">
              <div className="flex items-start gap-3">
                <CalendarClock className="mt-0.5 size-5 text-brand-light" />
                <div>
                  <p className="text-sm text-white/60">Application deadline</p>
                  <p className="font-semibold">{formatDate(item.deadline)}</p>
                  <p className="text-sm text-brand-light">{closed ? "Closed" : `${days} days left`}</p>
                </div>
              </div>
              {item.applyUrl && !closed ? (
                <ButtonLink href={item.applyUrl} size="lg" className="w-full" target="_blank" rel="noopener noreferrer nofollow">
                  Apply now
                </ButtonLink>
              ) : null}
              <p className="text-xs leading-relaxed text-white/50">
                You will be taken to the official provider website. EduGrand never charges a fee to apply.
              </p>
            </div>
          </div>
        </aside>
      </Container>

      {others.length ? (
        <section className="bg-mist py-16">
          <Container>
            <h2 data-reveal suppressHydrationWarning className="font-display text-2xl font-bold sm:text-3xl">Similar scholarships</h2>
            <div className="mt-8">
              <ScholarshipGrid items={others} />
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
