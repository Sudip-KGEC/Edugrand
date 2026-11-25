import { ArrowRight, BadgeCheck, GraduationCap, Search, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const QUICK = [
  { label: "Undergraduate", href: "/scholarships?level=Undergraduate" },
  { label: "Women", href: "/scholarships?category=Women" },
  { label: "Study abroad", href: "/scholarships?category=International" },
  { label: "Closing soon", href: "/scholarships?sort=deadline" },
];

export function Hero() {
  return (
    <section className="bg-hero relative overflow-hidden">
      <div className="grid-pattern absolute inset-0" aria-hidden />
      <Container className="relative grid grid-cols-[minmax(0,1fr)] grid-cols-[minmax(0,1fr)] items-center gap-14 pb-24 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-32 lg:pt-20">
        <div>
          <p data-hero suppressHydrationWarning className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-dark shadow-card ring-1 ring-brand/20">
            <Sparkles className="size-4" />
            New scholarships added every week
          </p>
          <h1 data-hero suppressHydrationWarning className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[4.4rem]">
            Find the scholarship that <span className="text-brand-gradient">funds your future</span>
          </h1>
          <p data-hero suppressHydrationWarning className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Discover verified scholarships, grants and fellowships for school, college and study abroad. Check eligibility and apply, all free.
          </p>

          <form data-hero suppressHydrationWarning action="/scholarships" method="get" role="search" className="mt-9 max-w-xl">
            <label htmlFor="hero-search" className="sr-only">
              Search scholarships
            </label>
            <div className="flex items-center gap-2 rounded-full bg-white p-2 shadow-lift ring-1 ring-line focus-within:ring-2 focus-within:ring-brand">
              <Search className="ml-3 size-5 shrink-0 text-muted" />
              <input
                id="hero-search"
                name="q"
                type="search"
                placeholder="Search by name, provider or country"
                className="min-w-0 flex-1 bg-transparent px-1 py-2 text-base outline-none placeholder:text-muted/70"
              />
              <button
                type="submit"
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-brand-gradient px-6 text-sm font-semibold text-white shadow-glow transition hover:brightness-105"
              >
                Search <ArrowRight className="size-4" />
              </button>
            </div>
          </form>

          <ul data-hero suppressHydrationWarning className="mt-5 flex flex-wrap items-center gap-2">
            <li className="mr-1 text-sm font-medium text-muted">Popular:</li>
            {QUICK.map((chip) => (
              <li key={chip.href}>
                <ButtonLink href={chip.href} variant="outline" className="!h-8 !px-3.5 !text-xs">
                  {chip.label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-lg pb-12 lg:max-w-none" aria-hidden>
          <div suppressHydrationWarning data-parallax="-8" className="absolute -right-6 -top-10 size-72 rounded-full bg-brand-gradient opacity-90 blur-2xl" />
          <div data-float suppressHydrationWarning className="relative ml-auto w-[88%] rounded-[2rem] bg-white p-6 shadow-lift ring-1 ring-line">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                <GraduationCap className="size-6" />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-ink">Merit Excellence Award</p>
                <p className="text-sm text-muted">Undergraduate · India</p>
              </div>
            </div>
            <p className="mt-6 font-display text-4xl font-extrabold text-brand-gradient">₹50,000</p>
            <p className="text-sm text-muted">per year, up to 4 years</p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-brand-soft">
              <div data-bar suppressHydrationWarning className="h-full w-[72%] rounded-full bg-brand-gradient" />
            </div>
            <div className="mt-3 flex justify-between text-xs font-medium text-muted">
              <span>Application window</span>
              <span className="text-ink">21 days left</span>
            </div>
          </div>

          <div data-float suppressHydrationWarning className="absolute bottom-0 left-0 w-60 rounded-3xl bg-ink p-5 text-white shadow-lift sm:-left-8">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-light">
              <BadgeCheck className="size-4" /> Verified listing
            </p>
            <p className="mt-2 font-display text-xl font-bold">Official apply link</p>
            <p className="mt-1 text-xs text-white/60">Every scholarship is reviewed before it goes live</p>
          </div>

          <div data-float suppressHydrationWarning className="absolute -top-5 right-6 rounded-2xl bg-white px-4 py-3 shadow-card ring-1 ring-line">
            <p className="text-xs font-medium text-muted">For students</p>
            <p className="font-display text-xl font-bold text-ink">
              100% <span className="text-sm font-semibold text-brand">free</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
