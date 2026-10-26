import Image from "next/image";
import type { AssetMedia } from "@/types";

/** Static product media: intentionally independent of homepage parallax. */
export function ProductCutout({ media, className = "" }: { media: AssetMedia; className?: string }) {
  return (
    <figure className={`catalog-object ${className}`}>
      <div className="catalog-object__image">
        <Image src={media.src} alt={media.alt} fill sizes="(max-width: 767px) 90vw, (max-width: 1199px) 44vw, 560px" />
      </div>
      <figcaption>{media.caption || "Minh họa kiểu dáng · Demo"}</figcaption>
    </figure>
  );
}
