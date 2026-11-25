import { STEPS } from "@/constants/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          center
          eyebrow="How it works"
          title="From search to submission in three steps"
          description="No sign up and no fees. Just clear information and direct links."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} data-reveal suppressHydrationWarning className="relative rounded-3xl bg-white p-8 shadow-card ring-1 ring-line">
              <span className="font-display text-6xl font-extrabold text-brand-gradient opacity-90">0{index + 1}</span>
              <h3 className="mt-4 font-display text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
