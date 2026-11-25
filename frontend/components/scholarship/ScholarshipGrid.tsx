import type { Scholarship } from "@/types";
import { ScholarshipCard } from "./ScholarshipCard";

export function ScholarshipGrid({ items }: { items: Scholarship[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item._id}>
          <ScholarshipCard item={item} />
        </li>
      ))}
    </ul>
  );
}
