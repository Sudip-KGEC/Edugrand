import type { Metadata } from "next";
import { Eye, HeartHandshake, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About EduGrand",
  description: "EduGrand is a free scholarship portal that helps students find genuine funding for their education.",
  path: "/about",
});

const VALUES = [
  { icon: ShieldCheck, title: "Trusted listings", text: "Every scholarship is reviewed and links to the official provider before it is published." },
  { icon: Eye, title: "Clear information", text: "Eligibility, benefits and documents are written in plain language so you can decide quickly." },
  { icon: HeartHandshake, title: "Free for students", text: "We never charge students. If anyone asks for money to give you a scholarship, walk away." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-hero border-b border-line">
        <Container className="py-14 sm:py-24">
          <h1 data-hero suppressHydrationWarning className="max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Education should never stop because of <span className="text-brand-gradient">money</span>
          </h1>
          <p data-hero suppressHydrationWarning className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Thousands of scholarships go unclaimed because students never hear about them. EduGrand brings them together in one place so the right student can find the right award.
          </p>
        </Container>
      </section>
      <Container className="py-16">
        <ul className="grid gap-6 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <li key={title} data-reveal suppressHydrationWarning className="rounded-3xl bg-white p-8 shadow-card ring-1 ring-line">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                <Icon className="size-6" />
              </span>
              <h2 className="mt-6 font-display text-xl font-bold">{title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
        <div data-reveal suppressHydrationWarning className="bg-dark mt-16 rounded-[2rem] p-10 text-center text-white sm:p-16">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Ready to find your scholarship?</h2>
          <ButtonLink href="/scholarships" size="lg" className="mt-8">
            Browse scholarships
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
