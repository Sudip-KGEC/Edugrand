import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="EduGrand home">
      <span className="grid size-9 place-items-center rounded-xl bg-brand-gradient shadow-glow">
        <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 9l9-5 9 5-9 5-9-5z" />
          <path d="M7 11.5V16c0 1.4 2.2 3 5 3s5-1.6 5-3v-4.5" />
        </svg>
      </span>
      <span className={cn("font-display text-xl font-bold tracking-tight", dark ? "text-white" : "text-ink")}>
        Edu<span className="text-brand">Grand</span>
      </span>
    </Link>
  );
}
