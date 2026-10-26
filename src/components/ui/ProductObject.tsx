import Image from "next/image";
import { ProductMotion } from "@/components/animations/ProductMotion";
import { PRODUCT_OBJECT_ASSETS, type ProductObjectId } from "@/content/assets";

export function ProductObject({ id }: { id: ProductObjectId }) {
  const asset = PRODUCT_OBJECT_ASSETS[id];
  return (
    <figure className="product-object">
      <ProductMotion>
        <Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 1023px) 90vw, 55vw" className="product-object__image" />
      </ProductMotion>
      <figcaption className="product-object__caption">{asset.caption}</figcaption>
    </figure>
  );
}
