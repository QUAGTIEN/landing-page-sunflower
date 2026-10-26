import type { ReactNode } from "react";

/** Native disclosure: usable before hydration and without JavaScript. */
export function EditorialDetails({ title, children, className = "" }: {
  title: string; children: ReactNode; className?: string;
}) {
  return (
    <details className={`editorial-details ${className}`}>
      <summary><span>{title}</span><span className="editorial-details__icon" aria-hidden="true" /></summary>
      <div className="editorial-details__body">{children}</div>
    </details>
  );
}
