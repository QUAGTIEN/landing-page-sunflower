import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { HeaderSubmenu } from "@/content/headerNavigation";

export function NavigationDropdown({ submenu, mobile = false, index, active, onNavigate }: {
  submenu: HeaderSubmenu; mobile?: boolean; index: number; active: boolean; onNavigate: () => void;
}) {
  const surface = mobile ? "mobile" : "desktop";
  const panelId = `nav-${surface}-${submenu.id}`;
  return (
    <details name={`header-${surface}-submenus`} data-nav-disclosure
      className={`nav-disclosure nav-disclosure--${surface}`}>
      <summary className={mobile ? "site-menu__link nav-disclosure__trigger" : "site-header__link nav-disclosure__trigger"}
        aria-controls={panelId} aria-current={active ? "page" : undefined} data-active={active || undefined}>
        {mobile && <span className="site-menu__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>}
        <span>{submenu.label}</span><ChevronDown size={mobile ? 18 : 14} aria-hidden="true" />
      </summary>
      <div id={panelId} className={`nav-disclosure__panel ${submenu.id === "products" ? "nav-disclosure__panel--catalog" : "nav-disclosure__panel--compact"}`}>
        <div className="nav-disclosure__inner">
          <div className="nav-disclosure__heading">
            <p>{submenu.title}</p>
            <Link href={submenu.href} onClick={onNavigate} aria-current={active ? "page" : undefined} className="nav-disclosure__view-all">
              {submenu.viewAllLabel}<ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="nav-disclosure__groups">
            {submenu.groups.map((group) => (
              <section key={group.id} aria-labelledby={`${panelId}-${group.id}`}>
                <h2 id={`${panelId}-${group.id}`}>{group.label}</h2>
                <ul>{group.links.map((link) => (
                  <li key={link.href}><Link href={link.href} onClick={onNavigate}>{link.label}<span aria-hidden="true">↗</span></Link></li>
                ))}</ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </details>
  );
}
