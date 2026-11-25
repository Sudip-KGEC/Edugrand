import Link from "next/link";
import { NAV_LINKS } from "@/constants/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-brand-soft hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ButtonLink href="/scholarships">Find scholarships</ButtonLink>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
