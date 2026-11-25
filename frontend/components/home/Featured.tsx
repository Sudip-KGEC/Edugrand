import { ArrowRight } from "lucide-react";
import type { Scholarship } from "@/types";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScholarshipGrid } from "@/components/scholarship/ScholarshipGrid";

export function Featured({
  items,
  eyebrow,
  title,
  description,
  href,
  muted,
}: {
  items: Scholarship[];
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  muted?: boolean;
}) {
  if (!items.length) return null;
  return (
    <section className={muted ? "bg-mist py-20 lg:py-28" : "py-20 lg:py-28"}>
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <ButtonLink href={href} variant="dark" data-reveal suppressHydrationWarning className="self-start sm:self-auto">
            View all <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
        <div className="mt-12">
          <ScholarshipGrid items={items} />
        </div>
      </Container>
    </section>
  );
}
