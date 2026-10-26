import { CapabilityItem, ProcessStep } from "@/types";

export const CAPABILITIES_LIST: CapabilityItem[] = [
  {
    id: "tu-van-vat-lieu-che-ban",
    index: "01",
    title: "Tư vấn vật liệu & Chế bản kỹ thuật (Prepress)",
    summary:
      "Kiểm tra file thiết kế, bình bản, xác định hướng thớ giấy, khoảng cách bế (gap) và lựa chọn tổ hợp mặt – keo – đế phù hợp với dây chuyền của khách hàng.",
    details: [
      "Rà soát độ phân giải mã vạch, độ dày nét chữ nhỏ và hệ màu in ấn",
      "Tư vấn quy cách chia cuộn, đường kính lõi và chiều ra tem cho máy dán tự động",
      "Bố trí khuôn bế tối ưu khổ vật liệu nhằm tiết kiệm chi phí trên từng đơn vị sản phẩm",
    ],
  },
  {
    id: "san-xuat-gia-cong-tem-nhan",
    index: "02",
    title: "In ấn & Gia công bế cuộn / bế tờ theo yêu cầu",
    summary:
      "Thực hiện in ấn tem nhãn màu, bế đứt nửa (kiss-cut) tem trắng và tem màu dạng cuộn hoặc dạng tờ phẳng với độ chính xác bước nhảy ổn định.",
    details: [
      "Bế cuộn đa quy cách (1 tem/hàng đến nhiều tem/hàng, đục lỗ dẫn hướng nếu cần)",
      "Gia công sau in: cán màng bóng/mờ, phủ bảo vệ bề mặt, xẻ cuộn theo khổ máy",
      "Sản xuất bao bì hộp giấy, thẻ bài treo và nhãn may mặc (tem dệt, satin, ruban)",
    ],
    verificationNote:
      "TODO_CONTENT: Bổ sung danh sách thiết bị máy in, máy bế, máy chia cuộn thực tế sau khi Sunflower xác nhận.",
  },
  {
    id: "cung-ung-vat-tu-thiet-bi",
    index: "03",
    title: "Cung ứng đồng bộ Vật tư in & Thiết bị mã vạch",
    summary:
      "Kết hợp cung cấp giấy in, mực in Ribbon (Wax, Wax/Resin, Resin), băng dính đóng gói cùng máy in và máy quét mã vạch, giúp bộ phận mua hàng tối ưu đầu mối.",
    details: [
      "Tương thích đồng bộ giữa phôi decal cuộn, cuộn mực Ribbon và đầu in mã vạch",
      "Hướng dẫn lắp đặt, căn chỉnh cảm biến (sensor) nhận diện tem trên máy in",
      "Đáp ứng linh hoạt các đơn hàng định kỳ cho nhà máy và kho vận",
    ],
  },
  {
    id: "kiem-soat-chat-luong-giao-van",
    index: "04",
    title: "Kiểm soát chất lượng & Đóng gói bàn giao B2B",
    summary:
      "Kiểm tra ngoại quan bản in, lực bóc tách lớp đế, độ chính xác kích thước bế và đóng gói chống ẩm trước khi giao tới kho khách hàng.",
    details: [
      "Đối chiếu mẫu duyệt kỹ thuật (color & dimension check) trước khi chạy sản lượng",
      "Đóng màng co từng cuộn/xấp, dán nhãn ghi rõ quy cách ngoài thùng carton",
      "Hỗ trợ giao hàng theo lịch trình sản xuất tại Hà Nội và các khu công nghiệp lân cận",
    ],
  },
];

export const PRODUCTION_PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Tiếp nhận yêu cầu & Tư vấn vật liệu",
    description:
      "Ghi nhận kích thước, bề mặt dán, môi trường bảo quản (nhiệt độ, độ ẩm, ma sát) và dòng máy in/dán nhãn của khách hàng để đề xuất cấu trúc vật liệu phù hợp.",
    deliverable: "Bảng đề xuất quy cách kỹ thuật & báo giá chi tiết",
  },
  {
    step: "02",
    title: "Chế bản & Duyệt mẫu kỹ thuật",
    description:
      "Kiểm tra file thiết kế (AI/PDF), lập bản vẽ khuôn bế (die-line), xác nhận hướng ra tem, màu sắc và thông số lõi cuộn cùng bộ phận mua hàng/kỹ thuật.",
    deliverable: "File Maquette / Mẫu kỹ thuật được xác nhận",
  },
  {
    step: "03",
    title: "In ấn, Bế khuôn & Gia công hoàn thiện",
    description:
      "Triển khai in ấn, cán màng, bế cuộn hoặc cắt tờ phẳng, chia cuộn theo số mét/số lượng tem quy định trên từng cuộn.",
    deliverable: "Bán thành phẩm & thành phẩm theo đúng lệnh sản xuất",
  },
  {
    step: "04",
    title: "Kiểm định chất lượng & Bàn giao",
    description:
      "Kiểm tra độ sắc nét mã vạch, độ bám keo, độ đồng đều khe bế, đóng gói chống ẩm và bàn giao kèm đầy đủ chứng từ xuất kho.",
    deliverable: "Lô hàng đóng gói tiêu chuẩn & biên bản bàn giao",
  },
];

export const CAPABILITY_MEDIA = {
  pressPhoto: {
    src: "/images/company/printing-press-unsplash.webp",
    alt: "Minh họa hệ thống trục lăn và giấy cuộn trên máy in công nghiệp",
    caption: "Hình ảnh minh họa quy trình in ấn công nghiệp (Không phải ảnh nhà xưởng thực tế của Sunflower)",
    sourceNote: "Unsplash Stock — Gắn nhãn minh họa rõ ràng theo AGENTS.md",
    rightsStatus: "stock_illustrative" as const,
  },
  workshopPhoto: {
    src: "/images/company/printing-workshop-unsplash.webp",
    alt: "Minh họa thiết bị trục in và gia công tem nhãn",
    caption: "Hình ảnh minh họa thiết bị ngành in (TODO_ASSET: Thay bằng ảnh xưởng Sunflower khi được phê duyệt)",
    sourceNote: "Unsplash Stock — Gắn nhãn minh họa rõ ràng theo AGENTS.md",
    rightsStatus: "stock_illustrative" as const,
  },
  colorSamplesPhoto: {
    src: "/images/company/print-color-samples-unsplash.webp",
    alt: "Minh họa bảng kiểm soát màu sắc và bản in tiêu chuẩn",
    caption: "Hình ảnh minh họa kiểm soát màu sắc chế bản",
    sourceNote: "Unsplash Stock — Gắn nhãn minh họa rõ ràng theo AGENTS.md",
    rightsStatus: "stock_illustrative" as const,
  },
};
