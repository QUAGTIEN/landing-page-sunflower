import { MaterialLayerSpec } from "@/types";

export const COMPANY_INFO = {
  brandName: "Sunflower",
  legalName: "Công ty Sản xuất & In ấn Bao bì Tem nhãn Sunflower",
  tagline: "Tem nhãn. Tạo dấu ấn.",
  shortIntro:
    "Thiết kế, gia công, sản xuất và cung ứng tem nhãn cuộn, tem nhãn tờ, bao bì giấy, nhãn may mặc và vật tư in mã vạch cho doanh nghiệp tại Hà Nội và khu vực lân cận.",
  editorialStatement:
    "Chúng tôi tập trung vào tính chính xác của vật liệu, độ ổn định khi vận hành trên dây chuyền đóng gói và sự rõ ràng trong từng quy cách kỹ thuật.",
  locationRegion: "Hà Nội & Khu vực phía Bắc",
  contacts: {
    address: "TODO_CONTENT: Cập nhật địa chỉ văn phòng & xưởng sản xuất chính thức tại Hà Nội",
    hotline: "TODO_CONTENT: Cập nhật số Hotline kinh doanh chính thức",
    email: "TODO_CONTENT: Cập nhật email tiếp nhận báo giá chính thức",
    zaloUrl: "", // Chỉ hiển thị nút Zalo khi có URL chính thức được xác nhận
    workingHours: "Thứ 2 – Thứ 7 · 08:00 – 17:30 (TODO_CONTENT: Xác nhận giờ làm việc)",
    mapEmbedUrl: "", // Chỉ nhúng bản đồ khi địa chỉ đã được phê duyệt
  },
  profilePdfUrl: "", // Chỉ hiển thị nút tải PDF Hồ sơ năng lực khi có file thật
  verificationNotice:
    "Một số thông tin liên hệ và thông số nhà xưởng đang ở trạng thái TODO_CONTENT chờ xác nhận chính thức từ Sunflower trước khi xuất bản.",
};

export const HERO_CONTENT = {
  eyebrow: "TEM NHÃN & BAO BÌ",
  headlineLine1: "Tem nhãn.",
  headlineLine2: "Tạo dấu ấn.",
  fullHeadline: "Tem nhãn. Tạo dấu ấn.",
  description:
    "Thiết kế, sản xuất tem nhãn và bao bì theo yêu cầu doanh nghiệp.",
  primaryCta: {
    label: "Khám phá sản phẩm",
    href: "/san-pham",
  },
  secondaryCta: {
    label: "Yêu cầu báo giá",
    href: "/lien-he",
  },
  posterImage: {
    src: "/images/hero/hero-studio-desktop-v3.png",
    width: 1586,
    height: 992,
    alt: "Concept minh họa: cuộn tem trắng lõi kraft, hộp giấy, thẻ bài và nhãn satin trong studio ivory",
    sourceNote: "Imagegen — poster bỏ UI từ concept 03 được chủ dự án duyệt ngày 2026-10-17; prompt: docs/mockups/redesign-v2-round1-poster-prompts.md. Chỉ dùng demo, thay bằng render scene được duyệt trước production.",
    rightsStatus: "illustrative_dev_only" as const,
  },
  mobilePosterImage: {
    src: "/images/hero/hero-studio-mobile-v3.png",
    width: 940,
    height: 1672,
    sourceNote: "Imagegen — biến thể portrait từ poster desktop concept 03, dành khoảng trống trên cho HTML. Chỉ dùng demo nội bộ, không phải ảnh sản phẩm thật; cùng prompt/provenance với poster desktop.",
    rightsStatus: "illustrative_dev_only" as const,
  },
};

export const MATERIAL_LAYERS_STORY: {
  eyebrow: string;
  headline: string;
  subtitle: string;
  disclaimer: string;
  layers: MaterialLayerSpec[];
} = {
  eyebrow: "CẤU TRÚC VẬT LIỆU TIÊU CHUẨN",
  headline: "Từ lớp vật liệu đến cuộn tem hoàn thiện.",
  subtitle:
    "Cấu tạo minh họa điển hình của dòng decal cuộn công nghiệp. Mỗi lớp vật liệu được phối hợp theo bề mặt dán, phương pháp in và điều kiện môi trường thực tế của doanh nghiệp.",
  disclaimer:
    "Lưu ý kỹ thuật: Cấu trúc thực tế thay đổi tùy dòng sản phẩm (decal giấy thường, decal cảm nhiệt trực tiếp, màng PP/PVC, tem dệt hoặc thẻ bài giấy cứng).",
  layers: [
    {
      id: "facestock",
      index: "01",
      code: "LAYER 01 / FACESTOCK",
      nameVi: "Lớp mặt (Facestock)",
      nameEn: "Surface Print Substrate",
      role: "Bề mặt tiếp nhận mực in hoặc nhiệt trực tiếp; quyết định độ sắc nét của mã vạch, văn bản và khả năng kháng trầy xước, độ ẩm.",
      typicalMaterials: "Giấy Couche mờ/bán bóng, giấy cảm nhiệt, màng nhựa PP, PVC, PET, Satin",
      colorHex: "#FBFAF7",
      opacity: 1,
    },
    {
      id: "adhesive",
      index: "02",
      code: "LAYER 02 / ADHESIVE",
      nameVi: "Lớp keo (Adhesive)",
      nameEn: "Pressure-Sensitive Adhesive",
      role: "Liên kết con tem với bề mặt sản phẩm (thùng carton, chai lọ nhựa/thủy tinh, túi màng ghép, kim loại) ở các dải nhiệt độ khác nhau.",
      typicalMaterials: "Keo Acrylic tiêu chuẩn, keo Hotmelt độ bám cao, keo bóc không để lại vết",
      colorHex: "#E8E3D9",
      opacity: 0.72,
    },
    {
      id: "silicone",
      index: "03",
      code: "LAYER 03 / RELEASE COAT",
      nameVi: "Lớp chống dính (Silicone)",
      nameEn: "Silicone Release Coating",
      role: "Lớp phủ siêu mỏng ngăn keo dính chết vào giấy đế, giúp tem tách nhẹ nhàng và ổn định trên máy dán nhãn tự động hoặc khi thao tác tay.",
      typicalMaterials: "Phủ Silicone kiểm soát lực bóc tách (Release Force)",
      colorHex: "#DCD7CC",
      opacity: 0.65,
    },
    {
      id: "liner",
      index: "04",
      code: "LAYER 04 / RELEASE LINER",
      nameVi: "Lớp đế (Release Liner)",
      nameEn: "Glassine / Kraft Backing Web",
      role: "Chịu lực căng kéo suốt quá trình bế khuôn, in mã vạch và xả cuộn; đảm bảo mắt thần (sensor) máy in nhận diện chính xác bước nhảy tem.",
      typicalMaterials: "Giấy đế Glassine trắng/xanh/vàng trong mờ hoặc giấy đế Kraft dày",
      colorHex: "#CBBCA4",
      opacity: 0.96,
    },
  ],
};
