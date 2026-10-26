import type { AssetMedia } from "@/types";
import { PRODUCT_OBJECT_ASSETS } from "@/content/assets";

/** Original unbranded AI illustrations, authorized for this local demo.
 * Not product evidence or proof of equipment brands/models distributed.
 * Sources and prompts: references/product-cutouts/catalog-v1/README.md.
 * Canonical product names, specifications and quote slugs stay in products.ts.
 */
function illustration(slug: string, alt: string): AssetMedia {
  return {
    src: `/images/products/cutouts/${slug}-v1.webp`,
    alt,
    caption: "Minh họa kiểu dáng · Demo",
    sourceNote: "Original AI-generated unbranded illustration for owner-authorized local demo; not a real Sunflower product photograph. See references/product-cutouts/catalog-v1/README.md.",
    rightsStatus: "illustrative_dev_only",
    aspectRatio: "1:1",
  };
}

export const CATALOG_OBJECTS = {
  "tem-trang-cuon": PRODUCT_OBJECT_ASSETS.roll,
  "tem-mau-cuon": illustration("tem-mau-cuon", "Minh họa cuộn tem in mẫu xanh trầm và charcoal, lõi giấy kraft"),
  "tem-trang-to": illustration("tem-trang-to", "Minh họa các tờ decal trắng với đường bế nhãn chữ nhật"),
  "tem-mau-to": illustration("tem-mau-to", "Minh họa tờ tem in mẫu trung tính, chia ô bế nhãn"),
  giay: illustration("giay", "Minh họa xấp giấy in trắng, các lớp giấy và bề mặt không tráng"),
  "muc-in-ribbon": illustration("muc-in-ribbon", "Minh họa cuộn ribbon truyền nhiệt đen cùng lõi thu mực"),
  "may-in-ma-vach": illustration("may-in-ma-vach", "Minh họa kiểu dáng máy in nhãn để bàn, không đại diện model phân phối"),
  "may-quet-ma-vach": illustration("may-quet-ma-vach", "Minh họa kiểu dáng máy quét mã vạch trên đế, không đại diện model phân phối"),
  hop: PRODUCT_OBJECT_ASSETS.box,
  "the-bai": PRODUCT_OBJECT_ASSETS.tags,
  "tem-det": illustration("tem-det", "Minh họa nhãn dệt may mặc với kết cấu sợi và mép gập"),
  "tem-vai-nylon-satin": illustration("tem-vai-nylon-satin", "Minh họa cuộn nhãn vải satin ivory với dải vải mở cong"),
  "bang-dinh": illustration("bang-dinh", "Minh họa cuộn băng dính đóng gói trong màu hổ phách, lõi kraft"),
} satisfies Record<string, AssetMedia>;

export function getCatalogObject(slug: string): AssetMedia | undefined {
  return CATALOG_OBJECTS[slug as keyof typeof CATALOG_OBJECTS];
}
