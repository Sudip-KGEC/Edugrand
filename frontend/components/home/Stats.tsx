import { STATS } from "@/constants/home";
import { Container } from "@/components/ui/Container";

export function Stats() {
  return (
    <section className="bg-dark text-white" aria-label="EduGrand in numbers">
      <Container className="grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} data-reveal suppressHydrationWarning className="text-center lg:border-r lg:border-white/10 lg:last:border-0">
            <p className="font-display text-4xl font-extrabold text-brand-gradient sm:text-5xl">
              <span suppressHydrationWarning data-count={stat.value} data-suffix={stat.suffix}>
                {stat.value.toLocaleString("en-IN")}
                {stat.suffix}
              </span>
            </p>
            <p className="mt-2 text-sm font-medium text-white/70">{stat.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
