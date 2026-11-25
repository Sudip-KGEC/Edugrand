import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LEVEL_CARDS } from "@/constants/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Levels() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Browse by level"
          title="Scholarships for every stage of study"
          description="Start with where you are today and see awards built for your level."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LEVEL_CARDS.map(({ label, href, icon: Icon, hint }) => (
            <li key={label} data-reveal suppressHydrationWarning>
              <Link
                href={href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-mist p-7 ring-1 ring-line transition duration-300 hover:-translate-y-1.5 hover:bg-ink hover:shadow-lift hover:ring-ink"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-white text-brand shadow-card transition group-hover:bg-brand-gradient group-hover:text-white">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-8 font-display text-xl font-bold text-ink transition-colors group-hover:text-white">{label}</h3>
                <p className="mt-1 text-sm text-muted transition-colors group-hover:text-white/70">{hint}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
