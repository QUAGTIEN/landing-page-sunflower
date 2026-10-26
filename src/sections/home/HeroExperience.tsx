"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, version as reactVersion, type PointerEvent, type ReactNode } from "react";
import type { HeroMotionState, HeroSceneMetrics } from "@/components/three/sceneTypes";
import { HERO_SCENE_BUDGET, HERO_SCENE_REACT_MAJOR } from "@/content/assets";

const LabelRollScene = dynamic(
  () => import("@/components/three/LabelRollScene").then((module) => module.LabelRollScene),
  { ssr: false, loading: () => null },
);

type DeviceNavigator = Navigator & {
  deviceMemory?: number;
  connection?: EventTarget & { saveData?: boolean; effectiveType?: string };
};

/** Also catches a failed lazy module, before the canvas boundary can mount. */
class SceneLoadBoundary extends Component<{ children: ReactNode; onFailure: (reason: string) => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure("scene-unavailable"); }
  render() { return this.state.failed ? null : this.props.children; }
}

/** Server HTML stays intact; only the optional scene and native-scroll choreography are client-side. */
export function HeroExperience({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [eligible, setEligible] = useState(false);
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [reason, setReason] = useState("poster");
  const failed = useRef(false);
  const motion = useRef<HeroMotionState>({ progress: 0, pointerX: 0, pointerY: 0, dragX: 0, dragY: 0 });
  const dragging = useRef<{ id: number; x: number; y: number } | null>(null);

  const onFailure = useCallback((failure: string) => {
    failed.current = true;
    setReady(false);
    setEligible(false);
    setReason(failure);
  }, []);
  const onReady = useCallback(() => {
    if (!failed.current) { setReady(true); setReason("ready"); }
  }, []);
  const onMetrics = useCallback((metrics: HeroSceneMetrics) => {
    const section = sectionRef.current;
    if (section) section.dataset.sceneMetrics = JSON.stringify(metrics);
  }, []);

  useEffect(() => {
    const preferences = window.matchMedia("(prefers-reduced-motion: reduce)");
    const size = window.matchMedia("(max-width: 1023px)");
    const device = navigator as DeviceNavigator;
    let cancelled = false;
    let idle = 0;
    let timer = 0;
    let secondFrame = 0;
    const delay = window.setTimeout.bind(window);
    const evaluate = () => {
      if (cancelled || failed.current) return;
      setMobile(size.matches);
      const fallback = preferences.matches ? "reduced-motion" :
        device.connection?.saveData ? "save-data" :
        /(^|-)2g$/.test(device.connection?.effectiveType ?? "") ? "slow-network" :
        (device.deviceMemory !== undefined && device.deviceMemory <= 2) ||
        (device.hardwareConcurrency > 0 && device.hardwareConcurrency <= 2) ? "low-power" : null;
      if (fallback) {
        setEligible(false); setReady(false); setReason(fallback);
        return;
      }
      // Do not import an incompatible reconciler and crash the surrounding page.
      if (Number(reactVersion.split(".")[0]) !== HERO_SCENE_REACT_MAJOR) {
        setReason("dependency-mismatch");
        return;
      }
      try {
        const probe = document.createElement("canvas");
        const context = probe.getContext("webgl2", { antialias: false });
        if (!context) { setReason("no-webgl"); return; }
        context.getExtension("WEBGL_lose_context")?.loseContext();
      } catch { setReason("no-webgl"); return; }
      setReason("loading");
      setEligible(true);
    };
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        if ("requestIdleCallback" in window) idle = window.requestIdleCallback(evaluate, { timeout: 1200 });
        else timer = delay(evaluate, 150);
      });
    });
    const resize = () => setMobile(size.matches);
    preferences.addEventListener("change", evaluate);
    device.connection?.addEventListener("change", evaluate);
    size.addEventListener("change", resize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame);
      if (idle) window.cancelIdleCallback(idle);
      clearTimeout(timer);
      preferences.removeEventListener("change", evaluate);
      device.connection?.removeEventListener("change", evaluate);
      size.removeEventListener("change", resize);
    };
  }, []);

  useEffect(() => {
    if (!eligible || ready || !visible || !tabVisible) return;
    const timeout = window.setTimeout(() => onFailure("startup-timeout"), HERO_SCENE_BUDGET.startupTimeoutMs);
    return () => clearTimeout(timeout);
  }, [eligible, ready, visible, tabVisible, onFailure]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(section);
    const visibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    visibility();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  useEffect(() => {
    if (!eligible || !ready) return;
    let cancelled = false;
    let revert = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const section = sectionRef.current;
      const frame = frameRef.current;
      if (!section || !frame) return;
      const copy = frame.querySelector(".hero-product__copy");
      const state = { progress: 0 };
      const context = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section, start: "top top",
            end: () => "+=" + Math.max(1, section.offsetHeight - frame.offsetHeight),
            scrub: mobile ? 0.5 : 0.85, invalidateOnRefresh: true,
          },
        }).to(state, {
          progress: 1, duration: 1, ease: "none",
          onUpdate: () => {
            motion.current.progress = state.progress;
            motion.current.invalidate?.();
            section.dataset.progress = state.progress.toFixed(3);
          },
        });
        if (copy) timeline.to(copy, { opacity: 0, y: -48, duration: 0.19, ease: "sine.inOut" }, 0.10)
          .set(copy, { pointerEvents: "none" }, 0.29);
      }, section);
      revert = () => { context.revert(); motion.current.progress = 0; delete section.dataset.progress; };
      ScrollTrigger.refresh();
    }).catch(() => onFailure("timeline-unavailable"));
    return () => { cancelled = true; revert(); };
  }, [eligible, ready, mobile, onFailure]);

  const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || mobile || !ready) return;
    const bounds = frameRef.current?.getBoundingClientRect();
    if (!bounds) return;
    motion.current.pointerX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    motion.current.pointerY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    if (dragging.current) {
      motion.current.dragX = Math.max(-0.20, Math.min(0.20, (event.clientX - dragging.current.x) / bounds.width * 1.1));
      motion.current.dragY = Math.max(-0.10, Math.min(0.10, (event.clientY - dragging.current.y) / bounds.height * 0.6));
    }
    motion.current.invalidate?.();
  };
  const release = () => {
    dragging.current = null;
    motion.current.dragX = motion.current.dragY = 0;
    motion.current.pointerX = motion.current.pointerY = 0;
    motion.current.invalidate?.();
  };

  return (
    <section
      ref={sectionRef} id="hero" aria-labelledby="hero-heading"
      className="hero-sequence" data-motion={eligible ? "live" : reason === "poster" ? "pending" : "poster"}
      data-scene-state={reason} data-scene-mobile={mobile}
    >
      <div ref={frameRef} className="hero-product" onPointerMove={pointerMove} onPointerLeave={release}>
        {children}
        {eligible && (
          <div className="hero-live-layer" data-ready={ready} aria-hidden="true">
            <SceneLoadBoundary onFailure={onFailure}>
              <LabelRollScene motion={motion} mobile={mobile} active={visible && tabVisible} onReady={onReady} onFailure={onFailure} onMetrics={onMetrics} />
            </SceneLoadBoundary>
          </div>
        )}
        {eligible && ready && !mobile && (
          <div className="hero-scene-interaction" aria-hidden="true"
            onPointerDown={(event) => {
              if (event.pointerType !== "mouse" || event.button !== 0) return;
              dragging.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerUp={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
              release();
            }}
            onPointerCancel={release} onLostPointerCapture={release}
          />
        )}
      </div>
    </section>
  );
}
