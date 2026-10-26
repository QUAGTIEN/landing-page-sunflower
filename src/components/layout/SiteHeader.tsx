"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { SunflowerLogo } from "@/components/ui/SunflowerLogo";
import { NavigationDropdown } from "@/components/layout/NavigationDropdown";
import { PRIMARY_NAV_ITEMS, HEADER_CTA } from "@/content/navigation";
import { INTERIOR_HEADER_THEMES } from "@/content/pageHeroes";
import type { HeaderSubmenu } from "@/content/headerNavigation";

export function SiteHeader({ submenus }: { submenus: HeaderSubmenu[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const headerTheme = INTERIOR_HEADER_THEMES[pathname] ?? "light";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  const closeSubmenus = useCallback(() => {
    headerRef.current?.querySelectorAll<HTMLDetailsElement>("[data-nav-disclosure][open]")
      .forEach((details) => { details.open = false; });
  }, []);
  const closeMenu = useCallback((restoreFocus = false) => {
    closeSubmenus();
    if (menuRef.current) menuRef.current.open = false;
    if (restoreFocus) summaryRef.current?.focus();
  }, [closeSubmenus]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => { closeMenu(); }, [pathname, closeMenu]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    const close = () => closeMenu();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const submenu = headerRef.current?.querySelector<HTMLDetailsElement>("[data-nav-disclosure][open]");
      if (submenu) {
        event.preventDefault();
        submenu.open = false;
        submenu.querySelector<HTMLElement>("summary")?.focus();
      } else if (menuRef.current?.open) {
        event.preventDefault(); closeMenu(true);
      }
    };
    const onOutsideInteraction = (event: Event) => {
      if (!headerRef.current?.contains(event.target as Node)) closeMenu();
    };
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as Node;
      if (!headerRef.current?.contains(target)) { closeMenu(); return; }
      headerRef.current.querySelectorAll<HTMLDetailsElement>("[data-nav-disclosure][open]")
        .forEach((details) => { if (!details.contains(target)) details.open = false; });
      if (menuRef.current?.open && !menuRef.current.contains(target)) closeMenu();
    };
    desktop.addEventListener("change", close);
    window.addEventListener("hashchange", close);
    window.addEventListener("popstate", close);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onOutsideInteraction);
    document.addEventListener("click", onOutsideInteraction);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      desktop.removeEventListener("change", close);
      window.removeEventListener("hashchange", close);
      window.removeEventListener("popstate", close);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onOutsideInteraction);
      document.removeEventListener("click", onOutsideInteraction);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [closeMenu]);

  const isActive = (href: string) => href === "/" ? isHome : pathname.startsWith(href);
  return (
    <>
      <header ref={headerRef} className={`site-header ${isHome ? "site-header--home" : "site-header--interior"}`}
        data-scrolled={scrolled} data-menu-open={menuOpen}
        data-page={pathname === "/san-pham" ? "products" : undefined} data-theme={headerTheme}>
        <div className="site-header__bar">
          <Link href="/" aria-label="Sunflower — Trang chủ" className="site-header__brand" onClick={() => closeMenu()}>
            <span className="site-header__logo-on-light" aria-hidden="true"><SunflowerLogo variant="mono-charcoal" showWordmark showSubtext={false} /></span>
            <span className="site-header__logo-on-dark" aria-hidden="true"><SunflowerLogo variant="mono-light" showWordmark showSubtext={false} /></span>
          </Link>
          <nav aria-label="Điều hướng chính" className="site-header__navigation">
            {PRIMARY_NAV_ITEMS.map((item, index) => {
              const submenu = submenus.find((menu) => menu.href === item.href);
              return submenu ? (
                <NavigationDropdown key={item.href} submenu={submenu} index={index} active={isActive(item.href)} onNavigate={() => closeMenu()} />
              ) : (
                <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}
                  className="site-header__link" onClick={() => closeMenu()}>{item.label}</Link>
              );
            })}
          </nav>
          <Link href={HEADER_CTA.href} className="site-header__quote" onClick={() => closeMenu()}>
            <span>{HEADER_CTA.label}</span><ArrowRight size={16} aria-hidden="true" />
          </Link>
          <details ref={menuRef} className="site-menu" onToggle={(event) => {
            setMenuOpen(event.currentTarget.open);
            if (!event.currentTarget.open) closeSubmenus();
          }}>
            <summary ref={summaryRef} aria-controls="mobile-navigation" aria-label="Menu điều hướng" className="site-menu__toggle">
              <span>Menu</span><Menu size={20} className="site-menu__open-icon" aria-hidden="true" /><X size={20} className="site-menu__close-icon" aria-hidden="true" />
            </summary>
            <div className="site-menu__panel" id="mobile-navigation">
              <nav aria-label="Điều hướng di động">
                {PRIMARY_NAV_ITEMS.map((item, index) => {
                  const submenu = submenus.find((menu) => menu.href === item.href);
                  return submenu ? (
                    <NavigationDropdown key={item.href} submenu={submenu} index={index} active={isActive(item.href)} mobile onNavigate={() => closeMenu()} />
                  ) : (
                    <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className="site-menu__link" onClick={() => closeMenu()}>
                      <span className="site-menu__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{item.label}</span><ArrowRight size={18} aria-hidden="true" />
                    </Link>
                  );
                })}
                <Link href={HEADER_CTA.href} className="site-menu__quote" onClick={() => closeMenu()}><span>{HEADER_CTA.label}</span><ArrowRight size={18} aria-hidden="true" /></Link>
              </nav>
            </div>
          </details>
        </div>
      </header>
      {!isHome && <div className="site-header-spacer" aria-hidden="true" />}
    </>
  );
}
