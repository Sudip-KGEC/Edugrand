import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="py-16" aria-busy="true">
      <div className="skeleton h-12 w-2/3 max-w-xl rounded-2xl" />
      <div className="skeleton mt-4 h-5 w-1/2 max-w-md rounded-xl" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton h-64 rounded-3xl" />
        ))}
      </div>
    </Container>
  );
}
