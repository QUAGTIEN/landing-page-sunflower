import { getImageProps } from "next/image";
import { ArrowDown } from "lucide-react";
import { HERO_CONTENT } from "@/content/company";
import { ButtonLink, TextLink } from "@/components/ui/Primitives";

/** Poster-only demo. The 3D prototype is deferred until the rest of the site is complete. */
export function HeroProductStage() {
  const imageOptions = {
    alt: HERO_CONTENT.posterImage.alt,
    sizes: "100vw",
    quality: 85,
    loading: "eager" as const,
    fetchPriority: "high" as const,
  };
  const { props: desktop } = getImageProps({
    ...imageOptions,
    src: HERO_CONTENT.posterImage.src,
    width: HERO_CONTENT.posterImage.width,
    height: HERO_CONTENT.posterImage.height,
  });
  const { props: mobile } = getImageProps({
    ...imageOptions,
    src: HERO_CONTENT.mobilePosterImage.src,
    width: HERO_CONTENT.mobilePosterImage.width,
    height: HERO_CONTENT.mobilePosterImage.height,
  });

  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero-sequence" data-motion="poster" data-scene-state="deferred">
      <div className="hero-product">
      <picture className="hero-product__picture">
        <source media="(max-width: 1023px)" srcSet={mobile.srcSet} sizes="100vw" />
        {/* Art-directed picture keeps one optimized poster request per viewport. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...desktop} alt={HERO_CONTENT.posterImage.alt} className="hero-product__image" />
      </picture>

      <div className="hero-product__content">
        <div className="hero-product__copy">
          <p className="hero-product__eyebrow">{HERO_CONTENT.eyebrow}</p>
          <h1 id="hero-heading" className="hero-product__headline" aria-label={HERO_CONTENT.fullHeadline}>
            <span>{HERO_CONTENT.headlineLine1}</span>
            <span>{HERO_CONTENT.headlineLine2}</span>
          </h1>
          <p className="hero-product__description">{HERO_CONTENT.description}</p>
          <div className="hero-product__actions">
            <ButtonLink href={HERO_CONTENT.primaryCta.href}>
              {HERO_CONTENT.primaryCta.label}
            </ButtonLink>
            <TextLink href={HERO_CONTENT.secondaryCta.href}>
              {HERO_CONTENT.secondaryCta.label}
            </TextLink>
          </div>
        </div>
      </div>

      <div className="hero-product__footnote">
        <a href="#gioi-thieu-sunflower" className="hero-product__scroll">
          <ArrowDown size={18} aria-hidden="true" />
          <span>Cuộn để khám phá</span>
        </a>
        <p>Concept minh họa</p>
      </div>
      </div>
    </section>
  );
}
