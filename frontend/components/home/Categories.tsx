import Link from "next/link";
import { CATEGORY_CARDS } from "@/constants/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Categories() {
  return (
    <section className="bg-dark py-20 text-white lg:py-28">
      <Container className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <SectionHeading
          dark
          eyebrow="Browse by category"
          title="Funding that fits who you are"
          description="Merit, need, gender, community or global study. Pick the path that matches your story."
        />
        <ul className="grid grid-cols-2 gap-4">
          {CATEGORY_CARDS.map(({ label, href, icon: Icon }) => (
            <li key={label} data-reveal suppressHydrationWarning>
              <Link
                href={href}
                className="group flex h-full flex-col gap-10 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition duration-300 hover:bg-brand-gradient hover:ring-transparent"
              >
                <Icon className="size-8 text-brand-light transition-colors group-hover:text-white" />
                <span className="font-display text-lg font-semibold">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
