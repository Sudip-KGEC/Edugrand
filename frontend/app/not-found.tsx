import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-8xl font-extrabold text-brand-gradient">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold">We could not find that page</h1>
        <p className="mt-3 text-muted">The scholarship may have closed or the link may be incorrect.</p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/scholarships" variant="outline">Browse scholarships</ButtonLink>
        </div>
      </div>
    </Container>
  );
}
