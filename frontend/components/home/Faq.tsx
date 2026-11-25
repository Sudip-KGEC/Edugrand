import { Plus } from "lucide-react";
import { FAQS } from "@/constants/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  return (
    <section className="py-20 lg:py-28">
      <JsonLd data={schema} />
      <Container className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="FAQ" title="Questions students ask us" description="Short answers to help you get started with confidence." />
        <div className="divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
          {FAQS.map((item) => (
            <details key={item.q} data-reveal suppressHydrationWarning className="group px-6 py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-base font-semibold text-ink sm:text-lg">
                {item.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                  <Plus className="faq-icon size-4 transition-transform duration-300" />
                </span>
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
