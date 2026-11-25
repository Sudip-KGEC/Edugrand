"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal],[data-hero],[data-count],[data-float],[data-parallax],[data-bar]";
const formatter = new Intl.NumberFormat("en-IN");

export function Animations() {
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const fresh = () => Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter((el) => !seen.has(el));
    const showVisible = (items: HTMLElement[]) => {
      items.forEach((el) => {
        seen.add(el);
        el.classList.add("is-in");
      });
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let cancelled = false;
    let context: { revert: () => void; add: (fn: () => void) => void } | undefined;
    let modules: Promise<[typeof import("gsap"), typeof import("gsap/ScrollTrigger")]> | undefined;

    async function animate(items: HTMLElement[]) {
      modules ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      try {
        const [{ gsap }, { ScrollTrigger }] = await modules;
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        context ??= gsap.context(() => undefined);

        const pick = (attr: string) => items.filter((el) => el.hasAttribute(attr));

        context.add(() => {
          const hero = pick("data-hero");
          if (hero.length) {
            gsap.fromTo(
              hero,
              { opacity: 0, y: 36 },
              { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.05 },
            );
          }

          const reveal = pick("data-reveal");
          if (reveal.length) {
            gsap.set(reveal, { opacity: 0, y: 28 });
            ScrollTrigger.batch(reveal, {
              start: "top 92%",
              once: true,
              onEnter: (batch) =>
                gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.09, overwrite: true }),
            });
          }

          pick("data-count").forEach((el) => {
            const target = Number(el.dataset.count);
            const suffix = el.dataset.suffix ?? "";
            const state = { value: 0 };
            ScrollTrigger.create({
              trigger: el,
              start: "top 92%",
              once: true,
              onEnter: () =>
                gsap.to(state, {
                  value: target,
                  duration: 1.8,
                  ease: "power2.out",
                  onUpdate: () => {
                    el.textContent = `${formatter.format(Math.round(state.value))}${suffix}`;
                  },
                }),
            });
          });

          pick("data-float").forEach((el, index) => {
            gsap.to(el, {
              y: index % 2 ? 14 : -14,
              duration: 3 + index * 0.4,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          });

          pick("data-parallax").forEach((el) => {
            gsap.to(el, {
              yPercent: Number(el.dataset.parallax) || -12,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            });
          });

          pick("data-bar").forEach((el) => {
            gsap.fromTo(
              el,
              { scaleX: 0 },
              { scaleX: 1, duration: 1.2, ease: "power3.out", transformOrigin: "left center", delay: 0.6 },
            );
          });
        });

        ScrollTrigger.refresh();
      } catch {
        showVisible(items);
      }
    }

    function scan() {
      frame = 0;
      const items = fresh();
      if (!items.length) return;
      items.forEach((el) => seen.add(el));
      if (reduced) {
        showVisible(items);
        return;
      }
      void animate(items);
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(scan);
    };

    scan();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelled = true;
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      context?.revert();
    };
  }, []);

  return null;
}