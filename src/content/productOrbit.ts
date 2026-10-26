import { PRODUCT_FAMILIES } from "@/content/products";
import { CATALOG_OBJECTS } from "@/content/catalogObjects";

const REPRESENTATIVES = {
  "tem-nhan-cuon": "tem-trang-cuon",
  "tem-nhan-to": "tem-trang-to",
  "vat-tu-in": "muc-in-ribbon",
  "thiet-bi-ma-vach": "may-in-ma-vach",
  "bao-bi-phu-kien": "hop",
  "nhan-may-mac": "tem-vai-nylon-satin",
} as const;

/** Presentation-only mapping. Canonical taxonomy/specifications stay in products.ts.
 * All six media retain their illustrative_dev_only provenance in catalogObjects.ts.
 */
export const PRODUCT_ORBIT_ITEMS = PRODUCT_FAMILIES.map((family) => {
  const slug = REPRESENTATIVES[family.id as keyof typeof REPRESENTATIVES];
  return {
    id: family.id, index: family.index, name: family.shortName,
    href: `#${slug}`, media: CATALOG_OBJECTS[slug],
  };
});

export type ProductOrbitItem = (typeof PRODUCT_ORBIT_ITEMS)[number];
