"use client";

import { useEffect } from "react";

const formatter = new Intl.NumberFormat("en-IN");

export function Animations() {
  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const heroTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-hero]"));
    const showAll = () => [...revealTargets, ...heroTargets].forEach((el) => el.classList.add("is-in"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showAll();
      return;
    }

    let cancelled = false;
    let context: { revert: () => void } | undefined;

    (async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        context = gsap.context(() => {
          if (heroTargets.length) {
            gsap.fromTo(
              heroTargets,
              { opacity: 0, y: 36 },
              { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.05 },
            );
          }

          if (revealTargets.length) {
            gsap.set(revealTargets, { opacity: 0, y: 28 });
            ScrollTrigger.batch(revealTargets, {
              start: "top 92%",
              once: true,
              onEnter: (batch) =>
                gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.09, overwrite: true }),
            });
          }

          gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
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

          gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, index) => {
            gsap.to(el, {
              y: index % 2 ? 14 : -14,
              duration: 3 + index * 0.4,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            gsap.to(el, {
              yPercent: Number(el.dataset.parallax) || -12,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((el) => {
            gsap.fromTo(
              el,
              { scaleX: 0 },
              { scaleX: 1, duration: 1.2, ease: "power3.out", transformOrigin: "left center", delay: 0.6 },
            );
          });
        });
      } catch {
        showAll();
      }
    })();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return null;
}
