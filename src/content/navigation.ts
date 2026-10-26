import { NavItem } from "@/types";

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Giải pháp", href: "/giai-phap" },
  { label: "Năng lực", href: "/nang-luc" },
  { label: "Dự án", href: "/du-an" },
];

export const ALL_SITEMAP_ROUTES: NavItem[] = [
  ...PRIMARY_NAV_ITEMS,
  { label: "Liên hệ & báo giá", href: "/lien-he" },
];

export const HEADER_CTA = {
  label: "Yêu cầu báo giá",
  href: "/lien-he",
};
