"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProductOrbitItem } from "@/content/productOrbit";

type Gsap = typeof import("gsap")["gsap"];
type Tween = ReturnType<Gsap["to"]>;
type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };
type OrbitController = {
  select: (index: number) => void;
  play: (value: boolean) => void;
  hover: (value: boolean) => void;
  focus: (value: boolean) => void;
};

const STEP = 60;
const DWELL = 6;
const DURATION = 1.8;
const rounded = (value: number) => Math.round(value * 10000) / 10000;

/** Six front-facing cutouts on an ellipse, not six three-dimensional models.
 * SSR geometry is the first pose; enhancement never replaces the image scene.
 */
export function ProductOrbit({ items }: { items: ProductOrbitItem[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const controller = useRef<OrbitController | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [autoAvailable, setAutoAvailable] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>(".product-orbit__stage")!;
    const objects = Array.from(stage.querySelectorAll<HTMLElement>(".product-orbit__object"));
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const pose = { rotation: 0 };
    let gsap: Gsap | undefined;
    let tween: Tween | undefined;
    let delay: number | undefined;
    let loading: Promise<void> | undefined;
    let motionUnavailable = false;
    let disposed = false;
    let index = 0;
    let requested = true;
    let hovered = false;
    let focused = false;
    let visible = false;
    let manualTween = false;
    let radius = Math.min(stage.clientWidth * .37, 420);

    const saveData = () => Boolean(connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || ""));
    const canAnimate = () => desktop.matches && !reduced.matches && !saveData() && !motionUnavailable;
    const blocked = () => !requested || hovered || focused || !visible || document.hidden || !canAnimate();
    const cancelDelay = () => { if (delay !== undefined) window.clearTimeout(delay); delay = undefined; };
    const paint = () => {
      objects.forEach((object, i) => {
        const angle = (i * STEP + pose.rotation) * Math.PI / 180;
        const depth = (Math.cos(angle) + 1) / 2;
        object.style.transform = `translate(-50%, -50%) translate3d(${Math.sin(angle) * radius}px, ${Math.cos(angle) * 105}px, 0) scale(${.48 + depth * .52}) rotate(${-Math.sin(angle) * 5}deg)`;
        object.style.opacity = String(.9 + depth * .1);
        object.style.zIndex = String(Math.round(10 + depth * 100));
      });
    };
    const schedule = () => {
      cancelDelay();
      if (!gsap || blocked() || (tween && tween.progress() < 1)) return;
      // A native timer lets GSAP sleep between steps instead of keeping a timeline ticking.
      delay = window.setTimeout(() => move((index + 1) % items.length, false), DWELL * 1000);
    };
    const move = (next: number, manual: boolean) => {
      cancelDelay();
      tween?.kill();
      index = next;
      setActive(next);
      if (manual) {
        requested = false;
        setPlaying(false);
        setAnnouncement(`${items[next].name}. ${next + 1} trên ${items.length}.`);
      }
      // Nearest equivalent angle avoids a long reverse trip at 0/360 or rapid clicks.
      const target = -next * STEP;
      const difference = ((target - pose.rotation + 540) % 360 + 360) % 360 - 180;
      manualTween = manual;
      if (!gsap || !canAnimate()) {
        pose.rotation += difference;
        paint();
        sync();
        return;
      }
      tween = gsap.to(pose, {
        rotation: pose.rotation + difference,
        duration: DURATION,
        ease: "power2.inOut",
        onUpdate: paint,
        onComplete: () => { tween = undefined; manualTween = false; sync(); },
      });
      sync();
    };
    const ensureGsap = () => {
      if (gsap || loading) return;
      loading = import("gsap").then((module) => {
        if (disposed) return;
        gsap = module.gsap;
        sync();
      }).catch(() => {
        // Manual selection and catalog links remain usable if the motion chunk fails.
        if (!disposed) { motionUnavailable = true; sync(); }
      });
    };
    const sync = () => {
      if (disposed) return;
      const available = canAnimate();
      setAutoAvailable(available);
      root.dataset.motion = available ? (blocked() ? "paused" : "running") : "manual";
      if (available && visible && !document.hidden) ensureGsap();
      const shouldPause = !visible || document.hidden || (!manualTween && blocked());
      if (!available && tween) {
        tween.kill();
        tween = undefined;
        pose.rotation = -index * STEP;
        paint();
      } else if (tween) {
        if (shouldPause) tween.pause(); else tween.resume();
      }
      if (blocked()) cancelDelay(); else schedule();
    };

    controller.current = {
      select: (next) => move(next, true),
      play: (value) => { requested = value; setPlaying(value); sync(); },
      hover: (value) => { hovered = value; sync(); },
      focus: (value) => { focused = value; sync(); },
    };
    const resize = new ResizeObserver(() => {
      radius = Math.min(stage.clientWidth * .37, 420);
      paint();
      sync();
    });
    resize.observe(stage);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: .15 });
    observer.observe(stage);
    const preferenceChange = () => sync();
    desktop.addEventListener("change", preferenceChange);
    reduced.addEventListener("change", preferenceChange);
    connection?.addEventListener("change", preferenceChange);
    document.addEventListener("visibilitychange", preferenceChange);
    paint();
    sync();
    setReady(true);
    return () => {
      disposed = true;
      cancelDelay();
      tween?.kill();
      observer.disconnect();
      resize.disconnect();
      desktop.removeEventListener("change", preferenceChange);
      reduced.removeEventListener("change", preferenceChange);
      connection?.removeEventListener("change", preferenceChange);
      document.removeEventListener("visibilitychange", preferenceChange);
      controller.current = null;
    };
  }, [items]);

  const select = (index: number) => controller.current?.select((index + items.length) % items.length);

  return (
    <div
      ref={rootRef}
      className="product-orbit"
      data-active={active}
      data-motion="manual"
      role="region"
      aria-label="Khám phá sáu họ sản phẩm"
      aria-roledescription="bộ chọn sản phẩm"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") controller.current?.hover(true); }}
      onPointerLeave={() => controller.current?.hover(false)}
      onFocusCapture={() => controller.current?.focus(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) controller.current?.focus(false); }}
    >
      <div className="product-orbit__stage" aria-hidden="true">
        <div className="product-orbit__ground" />
        {items.map((item, i) => {
          const angle = i * STEP * Math.PI / 180;
          const depth = (Math.cos(angle) + 1) / 2;
          return (
            <div
              key={item.id}
              className="product-orbit__object"
              data-selected={i === active}
              style={{
                transform: `translate(-50%, -50%) translate3d(calc(var(--orbit-radius) * ${rounded(Math.sin(angle))}), ${rounded(Math.cos(angle) * 105)}px, 0) scale(${rounded(.48 + depth * .52)}) rotate(${rounded(-Math.sin(angle) * 5)}deg)`,
                opacity: rounded(.9 + depth * .1),
                zIndex: Math.round(10 + depth * 100),
              }}
            >
              <Image src={item.media.src} alt="" fill priority={i === 0} sizes="(max-width: 767px) 270px, 340px" />
            </div>
          );
        })}
      </div>
      <div className="container-editorial product-orbit__footer">
        <div className="product-orbit__selection">
          <div className="product-orbit__selected-name"><span>{items[active].index} / 06</span><p>{items[active].name}</p></div>
          <Link href={items[active].href} className="product-orbit__catalog-link">Xem nhóm sản phẩm <ArrowRight size={17} aria-hidden="true" /></Link>
          <div className="product-orbit__controls" aria-label="Điều khiển vòng xoay">
            <button type="button" disabled={!ready} onClick={() => select(active - 1)} aria-label="Họ sản phẩm trước"><ArrowLeft size={18} aria-hidden="true" /></button>
            {autoAvailable && <button type="button" onClick={() => controller.current?.play(!playing)} aria-label={playing ? "Tạm dừng tự xoay" : "Bật tự xoay"}>{playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}</button>}
            <button type="button" disabled={!ready} onClick={() => select(active + 1)} aria-label="Họ sản phẩm tiếp theo"><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
        <div className="product-orbit__families" role="group" aria-label="Chọn họ sản phẩm">
          {items.map((item, i) => <button
            key={item.id} type="button" data-orbit-select={i} disabled={!ready}
            aria-pressed={active === i} onClick={() => select(i)}
            onKeyDown={(event) => {
              let next: number;
              if (event.key === "ArrowRight") next = (i + 1) % items.length;
              else if (event.key === "ArrowLeft") next = (i - 1 + items.length) % items.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = items.length - 1;
              else return;
              event.preventDefault();
              select(next);
              rootRef.current?.querySelector<HTMLButtonElement>(`[data-orbit-select="${next}"]`)?.focus();
            }}
          ><span>{item.index}</span>{item.name}</button>)}
        </div>
        <p className="product-orbit__caption">Minh họa nhóm sản phẩm · Demo</p>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
        <noscript><ul className="product-orbit__fallback">{items.map((item) => <li key={item.id}><a href={item.href}>{item.name}</a></li>)}</ul></noscript>
      </div>
    </div>
  );
}
