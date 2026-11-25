import { Container } from "./Container";

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <section className="bg-hero border-b border-line">
        <Container className="py-14 sm:py-20">
          <h1 data-hero suppressHydrationWarning className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          <p data-hero suppressHydrationWarning className="mt-3 text-muted">Last updated {updated}</p>
        </Container>
      </section>
      <Container className="max-w-3xl py-14">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-bold text-ink">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-muted">{section.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
