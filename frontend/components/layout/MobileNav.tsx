"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants/site";
import { ButtonLink } from "@/components/ui/Button";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="grid size-10 place-items-center rounded-full ring-1 ring-line transition hover:ring-brand"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open ? (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-white px-5 py-6">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3.5 font-display text-lg font-semibold text-ink hover:bg-brand-soft"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ButtonLink href="/scholarships" size="lg" className="mt-6 w-full" onClick={() => setOpen(false)}>
            Find scholarships
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );
}
