/** Internal provenance for the live Hero. No customer artwork or remote HDR is used. */
export const HERO_SCENE_ASSET = {
  id: "hero-studio-procedural-v2",
  rightsStatus: "illustrative_dev_only",
  sourceNote: "Original procedural geometry and canvas textures created in this project, guided by owner-approved concept 03.",
  subject: "White label roll, ivory carton, punched hang tags, satin strip and two champagne spheres.",
  productEvidence: false,
  externalMediaRequests: 0,
  textureDownloadBytes: 0,
  maximumTextureDimension: 1024,
  fallback: {
    desktop: "/images/hero/hero-studio-desktop-v3.png",
    mobile: "/images/hero/hero-studio-mobile-v3.png",
    sourceNote: "Owner-approved AI concept 03; demo illustration, not a real product photograph.",
  },
} as const;

export const HERO_SCENE_BUDGET = {
  desktopDpr: 1.25,
  mobileDpr: 1,
  reducedDpr: 0.85,
  desktopMinimumFps: 22,
  mobileMinimumFps: 18,
  startupTimeoutMs: 18000,
  targetJsGzipBytes: 300 * 1024,
} as const;

/** Owner-approved React 19 / R3F 9 / Drei 10 synchronization (2026-10-17). */
export const HERO_SCENE_REACT_MAJOR = 19;

/** Round 3: original unbranded AI cutouts, authorized for this local demo only.
 * These are presentation illustrations, not customer work or product evidence.
 * Prompts/source PNGs: references/product-cutouts/round3/README.md.
 */
export const PRODUCT_OBJECT_ASSETS = {
  roll: {
    src: "/images/products/cutouts/label-rolls-v1.webp",
    alt: "Minh họa cuộn tem trắng lõi kraft với dải tem mở cong",
    caption: "Minh họa kiểu dáng tem cuộn · Demo",
    rightsStatus: "illustrative_dev_only", productEvidence: false,
    sourceNote: "Original Imagegen unbranded white label roll; AI illustration, not an actual product photograph. Earlier extraction trials were rejected for alpha residue.",
  },
  box: {
    src: "/images/products/cutouts/ivory-box-v1.webp",
    alt: "Minh họa hộp giấy ivory không in, nhìn từ góc nghiêng",
    caption: "Minh họa kiểu dáng hộp giấy · Demo",
    rightsStatus: "illustrative_dev_only", productEvidence: false,
    sourceNote: "Original Imagegen unbranded ivory folding carton; no customer artwork.",
  },
  tags: {
    src: "/images/products/cutouts/ivory-tags-v1.webp",
    alt: "Minh họa hai thẻ bài giấy ivory đục lỗ, có dây cotton",
    caption: "Minh họa kiểu dáng thẻ bài · Demo",
    rightsStatus: "illustrative_dev_only", productEvidence: false,
    sourceNote: "Original Imagegen blank paper hang tags; no customer artwork.",
  },
} as const;

export type ProductObjectId = keyof typeof PRODUCT_OBJECT_ASSETS;
