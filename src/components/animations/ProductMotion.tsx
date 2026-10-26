"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Small product travel follows native scroll; no pinning or wheel interception. */
export function ProductMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let revert = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (disposed || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
        const node = ref.current;
        if (!node) return;
        gsap.fromTo(node, { y: 20 }, {
          y: -20, ease: "none",
          scrollTrigger: { trigger: node.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      revert = () => media.revert();
    }).catch(() => { /* Static product stays visible when motion cannot load. */ });
    return () => { disposed = true; revert(); };
  }, []);
  return <div ref={ref} className="product-object__motion">{children}</div>;
}
