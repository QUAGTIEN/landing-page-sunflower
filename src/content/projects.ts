import { ProjectItem } from "@/types";

export const PROJECTS_LIST: ProjectItem[] = [
  {
    slug: "mau-tem-nhan-cuon-kho-van-b2b",
    index: "01",
    title: "Chuẩn hóa cuộn tem nhãn trắng cho hệ thống quản lý kho & mã vạch",
    categoryLabel: "Tem nhãn dạng cuộn",
    relatedProductSlug: "tem-trang-cuon",
    challenge:
      "Đảm bảo con tem bóc tách mượt trên máy in mã vạch tốc độ cao, khe bế đều đặn giúp cảm biến không báo lỗi giấy giữa ca làm việc.",
    specification:
      "Decal giấy mặt mờ / cảm nhiệt trực tiếp · Bế cuộn bo góc tiêu chuẩn · Lõi giấy kraft cứng cáp 1 inch & 3 inch.",
    outcome:
      "Vận hành ổn định với cả mực in Ribbon Wax và Wax/Resin; bản in mã vạch 1D/2D đạt độ tương phản cao cho máy quét.",
    permissionToPublish: true,
    statusNote: "Mẫu quy cách tiêu chuẩn (Không chứa thông tin bảo mật của khách hàng)",
    image: {
      src: "/images/products/tem-trang-cuon.webp",
      alt: "Mẫu thành phẩm cuộn tem nhãn trắng bế sẵn",
      sourceNote: "Ảnh sản phẩm sạch không chứa nhãn hiệu khách hàng",
      rightsStatus: "approved",
      aspectRatio: "4:3",
    },
  },
  {
    slug: "mau-tem-nhan-in-mau-cuon",
    index: "02",
    title: "Gia công tem nhãn màu dạng cuộn cho dây chuyền đóng gói sản phẩm",
    categoryLabel: "Tem nhãn dạng cuộn",
    relatedProductSlug: "tem-mau-cuon",
    challenge:
      "Giữ độ chính xác màu sắc nhận diện thương hiệu và lớp màng bảo vệ chống trầy xước khi cuộn tem chạy qua hệ thống trục căng của máy dán nhãn.",
    specification:
      "Decal cuộn in nhiều màu · Cán màng bảo vệ bề mặt · Chia cuộn theo hướng ra tem quy định.",
    outcome:
      "Minh họa năng lực gia công tem cuộn in màu (Hồ sơ dự án khách hàng thực tế sẽ được cập nhật sau khi có văn bản đồng ý công bố).",
    permissionToPublish: false,
    statusNote: "Hồ sơ minh họa quy cách — Chờ phê duyệt quyền công bố dự án thực tế (TODO_CONTENT)",
    image: {
      src: "/images/products/tem-mau-cuon.webp",
      alt: "Minh họa quy cách tem nhãn in màu dạng cuộn",
      caption: "Ảnh minh họa kiểu dáng (Không đại diện cho dự án khách hàng cụ thể)",
      sourceNote: "Ảnh minh họa trong giai đoạn phát triển",
      rightsStatus: "illustrative_dev_only",
      aspectRatio: "4:3",
    },
  },
  {
    slug: "mau-bo-nhan-det-the-bai-may-mac",
    index: "03",
    title: "Đồng bộ nhãn dệt cổ áo, tem hướng dẫn sử dụng và thẻ bài treo",
    categoryLabel: "Nhãn may mặc & Phụ kiện",
    relatedProductSlug: "tem-det",
    challenge:
      "Kết hợp đồng bộ kích thước, tông màu và tiêu chuẩn cắt gập giữa tem dệt (woven label), tem satin và thẻ bài giấy treo ngoài sản phẩm.",
    specification:
      "Tem dệt mật độ sợi cao cắt nhiệt + Thẻ bài giấy cứng đục lỗ tiêu chuẩn.",
    outcome:
      "Minh họa cấu trúc bộ phụ liệu ngành may mặc (Chờ cập nhật hình ảnh thành phẩm đã được khách hàng cấp phép).",
    permissionToPublish: false,
    statusNote: "Hồ sơ minh họa quy cách — Chờ phê duyệt quyền công bố dự án thực tế (TODO_CONTENT)",
    image: {
      src: "/images/products/tem-det.webp",
      alt: "Minh họa quy cách nhãn dệt ngành may mặc",
      caption: "Ảnh minh họa chất liệu dệt",
      sourceNote: "Ảnh minh họa trong giai đoạn phát triển",
      rightsStatus: "illustrative_dev_only",
      aspectRatio: "4:3",
    },
  },
];
