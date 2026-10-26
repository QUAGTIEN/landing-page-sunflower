import { Fragment } from "react";
import Image from "next/image";
import { ButtonLink, TextLink } from "@/components/ui/Primitives";
import { getInteriorHero, type InteriorHeroId } from "@/content/pageHeroes";

/** Static server-rendered Hero. Page content and actions never wait for JS. */
export function InteriorHero({ page }: { page: InteriorHeroId }) {
  const hero = getInteriorHero(page);
  const onDark = hero.tone === "dark" || hero.tone === "warm-dark";
  const headingId = `${page}-hero-heading`;
  const captionId = `${page}-hero-caption`;

  return (
    <section
      className="interior-hero"
      data-page={page}
      data-variant={hero.variant}
      data-tone={hero.tone}
      aria-labelledby={headingId}
    >
      {hero.variant === "backdrop" && (
        <div className="interior-hero__backdrop">
          <Image src={hero.media.src} alt={hero.media.alt} aria-describedby={captionId} fill priority sizes="100vw" />
        </div>
      )}
      <div className="container-editorial">
        <div className="interior-hero__grid">
          <div className="interior-hero__copy">
            <p className="interior-hero__eyebrow">{hero.eyebrow}</p>
            <h1 id={headingId}>
              {hero.title.map((line) => (
                <Fragment key={line}><span>{line}</span>{" "}</Fragment>
              ))}
            </h1>
            <p className="interior-hero__lead">{hero.description}</p>
            <div className="interior-hero__actions">
              <ButtonLink href={hero.primaryCta.href} variant={onDark ? "light-on-dark" : "primary"}>{hero.primaryCta.label}</ButtonLink>
              <TextLink href={hero.secondaryCta.href} onDark={onDark}>{hero.secondaryCta.label}</TextLink>
            </div>
            {hero.note && <p className="interior-hero__note">{hero.note}</p>}
          </div>
          {hero.variant !== "backdrop" && (
            <figure className="interior-hero__visual" aria-describedby={captionId}>
              <Image
                src={hero.media.src}
                alt={hero.media.alt}
                width={hero.media.width}
                height={hero.media.height}
                priority
                sizes={page === "solutions" ? "(max-width: 767px) 85vw, 447px" : page === "contact" ? "(max-width: 767px) 112px, 400px" : "(max-width: 767px) 90vw, (max-width: 1199px) 44vw, 738px"}
              />
            </figure>
          )}
        </div>
        <p className="interior-hero__caption" id={captionId}>{hero.media.caption}</p>
      </div>
    </section>
  );
}
