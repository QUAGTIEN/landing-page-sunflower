import type { AssetMedia } from "@/types";
import { CAPABILITY_MEDIA } from "@/content/capabilities";
import { PRODUCT_OBJECT_ASSETS } from "@/content/assets";

export type InteriorHeroId = "about" | "capabilities" | "solutions" | "projects" | "contact";
export type HeaderTheme = "light" | "dark" | "warm-dark" | "beige";

/** Header-only data; safe to use in the shared client header. */
export const INTERIOR_HEADER_THEMES: Record<string, HeaderTheme> = {
  "/gioi-thieu": "dark",
  "/nang-luc": "dark",
  "/du-an": "warm-dark",
  "/giai-phap": "light",
  "/lien-he": "beige",
  "/san-pham": "beige",
};

interface HeroMedia extends AssetMedia {
  width: number;
  height: number;
}

interface InteriorHeroContent {
  eyebrow: string;
  title: readonly [string, string];
  description: string;
  variant: "split" | "backdrop" | "compact";
  tone: "light" | "dark" | "warm-dark" | "beige";
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  media: HeroMedia;
  note?: string;
}

/** Approved mockup direction and owner-confirmed media scope, 2026-10-17.
 * Source/permissions: references/intake/owner-20261017/ASSET_REGISTER.json
 * and references/hero-assets/interior-round2/README.md.
 * BROTHERS participation/publication is confirmed; no specific role or result
 * is inferred. Stock and material collection never imply a Sunflower facility.
 */
export const INTERIOR_HEROES = {
  about: {
    eyebrow: "VỀ SUNFLOWER",
    title: ["Từ ý tưởng.", "Đến từng chi tiết."],
    description: "Thiết kế, sản xuất tem nhãn, bao bì và cung ứng vật tư in ấn cho doanh nghiệp.",
    variant: "split",
    tone: "dark",
    primaryCta: { label: "Tìm hiểu Sunflower", href: "#about-story-heading" },
    secondaryCta: { label: "Xem năng lực", href: "/nang-luc" },
    media: {
      ...CAPABILITY_MEDIA.colorSamplesPhoto,
      width: 1200,
      height: 800,
      caption: "Hình minh họa chất liệu và bản in · Không phải ảnh cơ sở Sunflower",
    },
  },
  capabilities: {
    eyebrow: "NĂNG LỰC & QUY TRÌNH",
    title: ["Từ chế bản.", "Đến thành phẩm."],
    description: "Tư vấn vật liệu, in ấn, gia công và kiểm tra theo quy cách đã thống nhất.",
    variant: "backdrop",
    tone: "dark",
    primaryCta: { label: "Xem quy trình", href: "#capabilities-workflow-heading" },
    secondaryCta: { label: "Trao đổi yêu cầu", href: "/lien-he" },
    media: {
      ...CAPABILITY_MEDIA.pressPhoto,
      width: 1200,
      height: 801,
      caption: "Hình minh họa ngành in · Không phải ảnh nhà xưởng Sunflower",
    },
  },
  solutions: {
    eyebrow: "GIẢI PHÁP THEO NHU CẦU",
    title: ["Đúng chất liệu.", "Đúng ứng dụng."],
    description: "Lựa chọn tem nhãn và bao bì theo bề mặt dán, môi trường sử dụng và cách đóng gói.",
    variant: "split",
    tone: "light",
    primaryCta: { label: "Khám phá giải pháp", href: "#solutions-index" },
    secondaryCta: { label: "Trao đổi nhu cầu", href: "/lien-he" },
    media: {
      src: "/images/hero/interior/label-material-collection-v1.webp",
      alt: "Ảnh minh họa các cuộn tem trắng, trong, bạc, vàng và hologram cùng ví dụ ứng dụng",
      width: 447,
      height: 447,
      caption: "Ảnh minh họa các nhóm vật liệu tem nhãn",
      sourceNote: "Owner-supplied reference photograph, 2026-10-17; original photographer/license not supplied. Local demo illustration, not evidence of Sunflower stock. Original retained at references/intake/owner-20261017/label-material-collection.png; format optimization only.",
      rightsStatus: "illustrative_dev_only",
    },
  },
  projects: {
    eyebrow: "DỰ ÁN & THÀNH PHẨM",
    title: ["Những dấu ấn", "trên thành phẩm."],
    description: "Khám phá tem nhãn và bao bì qua chất liệu, quy cách và cách gia công.",
    variant: "split",
    tone: "warm-dark",
    primaryCta: { label: "Khám phá thành phẩm", href: "#projects-index" },
    secondaryCta: { label: "Trao đổi quy cách", href: "/lien-he" },
    media: {
      src: "/images/hero/interior/brothers-packaging-v1.webp",
      alt: "Bộ hộp giấy và nhãn sản phẩm BROTHERS, Sunflower có tham gia thực hiện",
      width: 738,
      height: 411,
      caption: "Bao bì BROTHERS · Sunflower tham gia thực hiện",
      sourceNote: 'Owner attachment, 2026-10-17. Owner explicitly confirmed: “Sunflower có tham gia và được phép công bố”. No specific design/production role, date, quantity or performance result was supplied. Artwork preserved unchanged; original at references/intake/owner-20261017/brothers-packaging.png; format optimization only.',
      rightsStatus: "approved",
    },
  },
  contact: {
    eyebrow: "LIÊN HỆ & BÁO GIÁ",
    title: ["Bắt đầu từ", "yêu cầu của bạn."],
    description: "Gửi quy cách hoặc mẫu sản phẩm để trao đổi phương án phù hợp.",
    variant: "compact",
    tone: "beige",
    primaryCta: { label: "Gửi yêu cầu", href: "#quote-request" },
    secondaryCta: { label: "Xem sản phẩm", href: "/san-pham" },
    note: "Chất liệu / Kích thước / Số lượng dự kiến",
    media: {
      ...PRODUCT_OBJECT_ASSETS.tags,
      width: 1100,
      height: 1100,
      caption: "Hình minh họa chất liệu giấy · Demo",
    },
  },
} satisfies Record<InteriorHeroId, InteriorHeroContent>;

export function getInteriorHero(id: InteriorHeroId): InteriorHeroContent {
  return INTERIOR_HEROES[id];
}
