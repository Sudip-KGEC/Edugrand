"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-muted">Please try again in a moment.</p>
        <Button className="mt-8" onClick={reset}>Try again</Button>
      </div>
    </Container>
  );
}
