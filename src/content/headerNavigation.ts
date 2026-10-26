import { PRODUCT_CATEGORIES, PRODUCT_FAMILIES } from "@/content/products";
import { HOME_SOLUTIONS } from "@/content/home";
import { CAPABILITIES_LIST } from "@/content/capabilities";

export interface HeaderSubmenu {
  id: string;
  href: string;
  label: string;
  title: string;
  viewAllLabel: string;
  groups: { id: string; label: string; links: { label: string; href: string }[] }[];
}

const capabilityLabels: Record<string, string> = {
  "tu-van-vat-lieu-che-ban": "Tư vấn vật liệu & chế bản",
  "san-xuat-gia-cong-tem-nhan": "In ấn & gia công",
  "cung-ung-vat-tu-thiet-bi": "Vật tư & thiết bị mã vạch",
  "kiem-soat-chat-luong-giao-van": "Kiểm tra & bàn giao",
};

/** Construct in the server layout. Only labels/hrefs cross the client boundary. */
export const HEADER_SUBMENUS: HeaderSubmenu[] = [
  {
    id: "products", href: "/san-pham", label: "Sản phẩm", title: "Danh mục sản phẩm",
    viewAllLabel: "Xem tất cả sản phẩm",
    groups: PRODUCT_FAMILIES.map((family) => ({
      id: family.id, label: family.name,
      links: PRODUCT_CATEGORIES.filter((product) => product.familyId === family.id)
        .map((product) => ({ label: product.name, href: `/san-pham#${product.slug}` })),
    })),
  },
  {
    id: "solutions", href: "/giai-phap", label: "Giải pháp", title: "Giải pháp theo ứng dụng",
    viewAllLabel: "Xem tất cả giải pháp",
    groups: [{ id: "applications", label: "Ứng dụng", links: HOME_SOLUTIONS.map((item) => ({ label: item.title, href: `/giai-phap#${item.slug}` })) }],
  },
  {
    id: "capabilities", href: "/nang-luc", label: "Năng lực", title: "Năng lực & quy trình",
    viewAllLabel: "Xem trang năng lực",
    groups: [{ id: "capability-index", label: "Năng lực chuyên môn", links: CAPABILITIES_LIST.map((item) => ({ label: capabilityLabels[item.id] ?? item.title, href: `/nang-luc#${item.id}` })) }],
  },
];
