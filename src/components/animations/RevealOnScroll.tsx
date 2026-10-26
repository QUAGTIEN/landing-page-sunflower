"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Content is visible in server HTML. Only animate once the observer sees it. */
export function RevealOnScroll({
  children, className = "", delayMs = 0, yOffset = 14,
}: { children: ReactNode; className?: string; delayMs?: number; yOffset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Never replay entry motion on content already visible after hydration or
    // native anchor navigation. Server HTML remains the baseline throughout.
    if (node.getBoundingClientRect().top < window.innerHeight || preference.matches) return;
    let animation: Animation | undefined;
    let seen = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || seen) return;
      seen = true;
      observer.disconnect();
      const hashTarget = document.getElementById(window.location.hash.slice(1));
      if (preference.matches || !node.animate || node.contains(document.activeElement) ||
        (hashTarget && (node.contains(hashTarget) || hashTarget.contains(node)))) return;
      animation = node.animate(
        [{ opacity: .7, transform: `translateY(${yOffset}px)` }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 420, delay: Math.min(delayMs, 120), easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" },
      );
    }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });
    const cancel = () => animation?.cancel();
    node.addEventListener("focusin", cancel);
    preference.addEventListener("change", cancel);
    observer.observe(node);
    return () => {
      observer.disconnect(); animation?.cancel();
      node.removeEventListener("focusin", cancel);
      preference.removeEventListener("change", cancel);
    };
  }, [delayMs, yOffset]);
  return <div ref={ref} className={className}>{children}</div>;
}
