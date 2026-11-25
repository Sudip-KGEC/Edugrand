import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function FinalCta() {
  return (
    <section className="px-5 pb-20 sm:px-8 lg:pb-28">
      <Container className="!px-0">
        <div className="bg-brand-gradient relative overflow-hidden rounded-[2rem] px-6 py-14 text-white sm:px-14 sm:py-20">
          <div data-float suppressHydrationWarning className="absolute -right-16 -top-16 size-64 rounded-full bg-white/15" aria-hidden />
          <div data-float suppressHydrationWarning className="absolute -bottom-20 left-1/3 size-56 rounded-full bg-ink/15" aria-hidden />
          <div className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div data-reveal suppressHydrationWarning>
              <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-5xl">Never miss a scholarship deadline again</h2>
              <p className="mt-4 max-w-xl text-lg text-white/90">
                Join students who get new scholarships and closing dates in their inbox. Free, and you can leave anytime.
              </p>
            </div>
            <div data-reveal suppressHydrationWarning className="rounded-3xl bg-ink p-6 sm:p-8">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
