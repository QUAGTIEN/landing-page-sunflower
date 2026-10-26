import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers } from "lucide-react";
import { AssetMedia } from "@/types";

export interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light-on-dark" | "outline-on-dark";
  className?: string;
  showArrow?: boolean;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  showArrow = true,
}: ButtonLinkProps) {
  const styles = {
    primary:
      "bg-foreground text-on-dark hover:bg-foreground-soft border border-foreground",
    outline:
      "bg-transparent text-foreground border border-border hover:border-foreground hover:bg-surface/60",
    "light-on-dark":
      "bg-on-dark text-foreground hover:bg-surface border border-on-dark",
    "outline-on-dark":
      "bg-transparent text-on-dark border border-on-dark/30 hover:border-on-dark hover:bg-on-dark/10",
  }[variant];

  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-btn px-6 py-3.5 text-sm font-medium tracking-[-0.01em] transition-colors duration-200 ${styles} ${className}`}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  onDark = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 py-2 text-sm font-medium transition-colors duration-200 ${
        onDark
          ? "text-on-dark/90 hover:text-on-dark"
          : "text-foreground hover:text-muted-foreground"
      } ${className}`}
    >
      <span className="border-b border-current/30 pb-0.5 transition-colors group-hover:border-current">
        {children}
      </span>
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  onDark = false,
  align = "left",
  rightSlot,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  onDark?: boolean;
  align?: "left" | "split";
  rightSlot?: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-4 pb-8 md:pb-12 ${
        align === "split"
          ? "md:flex-row md:items-end md:justify-between"
          : "max-w-3xl"
      }`}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="eyebrow-index mb-3 text-accent">{eyebrow}</p>
        )}
        <h2
          id={id}
          className={`heading-section ${
            onDark ? "text-on-dark" : "text-foreground"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-4 text-base leading-relaxed md:text-lg ${
              onDark ? "text-on-dark/75" : "text-muted-foreground"
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  metaNote,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  metaNote?: string;
}) {
  return (
    <section className="border-b border-border bg-background pt-12 pb-14 md:pt-20 md:pb-20">
      <div className="container-editorial">
        <div className="max-w-3xl">
          <p className="eyebrow-index mb-4 text-accent">{eyebrow}</p>
          <h1 className="heading-section md:text-[3.5rem] md:leading-[1.05] text-foreground">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center gap-5">
              {primaryCta && (
                <ButtonLink href={primaryCta.href} variant="primary">
                  {primaryCta.label}
                </ButtonLink>
              )}
              {secondaryCta && (
                <TextLink href={secondaryCta.href}>
                  {secondaryCta.label}
                </TextLink>
              )}
            </div>
          )}
          {metaNote && (
            <p className="mt-6 border-l-2 border-accent/60 pl-3 text-xs text-muted-foreground">
              {metaNote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Uniform 4:3 or 1:1 Product / Editorial Photo Stage.
 * Renders real/illustrative image with consistent warm neutral staging,
 * or a clean technical specification placeholder when asset is pending.
 */
export function ProductStage({
  media,
  indexLabel,
  categoryTitle,
  aspect = "4:3",
  priority = false,
}: {
  media: AssetMedia;
  indexLabel?: string;
  categoryTitle?: string;
  aspect?: "4:3" | "1:1" | "16:9";
  priority?: boolean;
}) {
  const aspectClass = {
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
    "16:9": "aspect-video",
  }[aspect];

  const isPlaceholder =
    !media.src || media.rightsStatus === "placeholder_needed";

  return (
    <figure className="group flex flex-col">
      <div
        className={`relative w-full overflow-hidden rounded-frame border border-border bg-surface ${aspectClass}`}
      >
        {isPlaceholder ? (
          <div className="flex h-full w-full flex-col justify-between p-6 md:p-8 bg-gradient-to-br from-surface via-background to-surface-muted/50">
            <div className="flex items-center justify-between border-b border-border/80 pb-3 text-xs font-mono text-muted-foreground">
              <span>{indexLabel ?? "SPEC STAGE"}</span>
              <span className="rounded bg-background px-2 py-0.5 text-[11px] font-medium text-foreground">
                TODO_ASSET
              </span>
            </div>
            <div className="my-auto flex flex-col items-center justify-center text-center py-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/80 text-accent">
                <Layers className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                {categoryTitle ?? media.alt}
              </p>
              <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                {media.sourceNote}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-border/80 pt-2.5 text-[11px] text-muted-foreground">
              <span>Tỷ lệ khung chuẩn 4:3</span>
              <span>Sunflower Studio Standard</span>
            </div>
          </div>
        ) : (
          <>
            <div className="relative h-full w-full p-4 md:p-6 flex items-center justify-center">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                className="object-contain p-3 transition-transform duration-300 ease-out group-hover:scale-[1.025]"
              />
            </div>
            {media.rightsStatus !== "approved" && (
              <span className="absolute bottom-2.5 right-2.5 rounded bg-foreground/85 px-2.5 py-1 text-[10px] font-medium tracking-wide text-on-dark backdrop-blur-sm">
                {media.rightsStatus === "stock_illustrative"
                  ? "Ảnh minh họa quy trình"
                  : "Ảnh minh họa quy cách (Dev)"}
              </span>
            )}
          </>
        )}
      </div>
      {media.caption && (
        <figcaption className="mt-2 text-xs text-muted-foreground">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}
