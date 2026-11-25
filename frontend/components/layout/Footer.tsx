import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/constants/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{SITE.description.split(".")[0]}.</p>
          <a href={`mailto:${SITE.email}`} className="mt-5 inline-block text-sm font-medium text-brand-light hover:text-white">
            {SITE.email}
          </a>
        </div>
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <nav key={title} aria-label={title}>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50">{title}</h3>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 transition-colors hover:text-brand-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Made to help every student study without limits.</p>
        </Container>
      </div>
    </footer>
  );
}
