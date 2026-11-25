import type { Metadata } from "next";
import { Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: "Questions about a scholarship or your application? Send the EduGrand team a message.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-hero border-b border-line">
        <Container className="py-14 sm:py-20">
          <h1 data-hero suppressHydrationWarning className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Let us <span className="text-brand-gradient">help you</span>
          </h1>
          <p data-hero suppressHydrationWarning className="mt-4 max-w-2xl text-lg text-muted">
            Have a question about a scholarship or want to list one? Write to us and we will respond within two working days.
          </p>
        </Container>
      </section>
      <Container className="grid grid-cols-[minmax(0,1fr)] gap-10 py-14 lg:grid-cols-[1.4fr_1fr]">
        <div data-reveal suppressHydrationWarning>
          <ContactForm />
        </div>
        <div className="space-y-5">
          <div data-reveal suppressHydrationWarning className="rounded-3xl bg-ink p-7 text-white">
            <Mail className="size-6 text-brand-light" />
            <h2 className="mt-4 font-display text-lg font-bold">Email us</h2>
            <a href={`mailto:${SITE.email}`} className="mt-1 block text-white/80 hover:text-brand-light">{SITE.email}</a>
          </div>
          <div data-reveal suppressHydrationWarning className="rounded-3xl bg-brand-soft p-7">
            <Clock className="size-6 text-brand" />
            <h2 className="mt-4 font-display text-lg font-bold">Response time</h2>
            <p className="mt-1 text-muted">Monday to Saturday, usually within two working days.</p>
          </div>
        </div>
      </Container>
    </>
  );
}
