import { PRODUCT_CATEGORIES } from "@/content/products";

/** Catalog has category anchors, not family IDs. Link each family to its first category. */
export function getProductFamilyHref(familyId: string) {
  const firstCategory = PRODUCT_CATEGORIES.find((product) => product.familyId === familyId);
  return firstCategory ? `/san-pham#${firstCategory.slug}` : "/san-pham";
}

/** Short homepage summaries; full specifications and canonical slugs stay in products.ts. */
export const HOME_PRODUCTS = [
  { id: "roll", slug: "tem-trang-cuon", label: "Tem cuộn", title: "Khởi đầu từ một cuộn tem.", description: "Tem trắng bế cuộn theo quy cách, dùng cho mã vạch, vận đơn và thông tin sản phẩm.", materials: "Decal giấy · Cảm nhiệt · PP / PVC", detail: "Kích thước, lõi và chiều ra tem theo yêu cầu." },
  { id: "box", slug: "hop", label: "Hộp giấy", title: "Bao bì hoàn thiện dấu ấn.", description: "Hộp giấy in và gia công theo thiết kế, kết hợp cùng tem nhãn cho bộ bao bì đồng nhất.", materials: "Ivory · Kraft · Giấy mỹ thuật", detail: "Quy cách hộp và gia công theo thiết kế." },
  { id: "tags", slug: "the-bai", label: "Thẻ bài", title: "Chăm chút từng chi tiết.", description: "Thẻ treo cho thời trang và phụ kiện, tùy chỉnh chất liệu, hình dáng và quy cách đục lỗ.", materials: "Couche · Ivory · Kraft", detail: "In, bế và hoàn thiện theo mẫu duyệt." },
] as const;

export const HOME_PROCESS = [
  { title: "Lắng nghe & tư vấn", description: "Trao đổi nhu cầu, bề mặt sử dụng và quy cách để lựa chọn vật liệu phù hợp." },
  { title: "Chế bản & duyệt mẫu", description: "Kiểm tra file thiết kế, màu sắc, kích thước và hướng ra tem trước khi sản xuất." },
  { title: "In & gia công", description: "In, bế, cán và chia cuộn hoặc cắt tờ theo quy cách đã thống nhất." },
  { title: "Kiểm tra & bàn giao", description: "Đối chiếu mẫu duyệt, kiểm tra ngoại quan và đóng gói trước khi giao hàng." },
] as const;

export const HOME_SOLUTIONS = [
  { slug: "kho-van-logistics-ma-vach", title: "Kho vận & mã vạch", description: "Tem vận đơn, nhãn kho và vật tư in cho thông tin biến đổi." },
  { slug: "nhan-mac-may-mac-xuat-khau", title: "Thời trang & may mặc", description: "Thẻ bài, tem dệt và nhãn satin cho bộ phụ liệu đồng bộ." },
  { slug: "nhan-bao-bi-thuc-pham-tieu-dung", title: "Thực phẩm & mỹ phẩm", description: "Tem nhãn và hộp giấy theo thiết kế, phù hợp điều kiện bảo quản." },
  { slug: "tem-ky-thuat-dien-tu-co-khi", title: "Điện tử & công nghiệp", description: "Tem thông số, mã vạch và nhãn nhận diện thiết bị." },
] as const;
