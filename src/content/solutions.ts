import { SolutionItem } from "@/types";

export const SOLUTIONS_LIST: SolutionItem[] = [
  {
    slug: "kho-van-logistics-ma-vach",
    index: "01",
    title: "Tem nhãn vận hành kho vận, logistics & truy xuất mã vạch",
    industryContext: "Kho hàng thương mại điện tử, nhà máy sản xuất, trung tâm phân phối",
    buyerProblem:
      "Tem mã vạch bị mờ, bong mép trên thùng carton hoặc máy in mã vạch thường xuyên kẹt giấy, lệch bước nhảy làm gián đoạn khâu xuất kho.",
    recommendedApproach:
      "Đồng bộ chất liệu decal cuộn (cảm nhiệt trực tiếp cho lưu kho ngắn hạn hoặc decal giấy/PVC kết hợp mực Ribbon Wax/Resin cho lưu kho dài hạn) với đúng kích thước lõi máy in đang vận hành.",
    materialConsiderations: [
      "Decal cảm nhiệt trực tiếp cho vận đơn ngắn ngày, không cần dùng cuộn mực",
      "Decal giấy thường + Ribbon Wax/Resin cho nhãn dán thùng carton lưu kho nhiều tháng",
      "Kiểm tra khoảng cách khe hở (gap) và độ bám của lớp keo Hotmelt trên bề mặt thùng giấy nhám",
    ],
    confirmationPoints: [
      "Model máy in mã vạch hiện có (Desktop lõi 1 inch hay Industrial lõi 3 inch)",
      "Thời gian lưu kho và điều kiện nhiệt độ/độ ẩm trong kho",
      "Kích thước con tem và số lượng tiêu thụ trung bình mỗi tháng",
    ],
    relatedProductSlugs: ["tem-trang-cuon", "muc-in-ribbon", "may-in-ma-vach", "may-quet-ma-vach", "bang-dinh"],
    image: {
      src: "/images/products/tem-trang-cuon.webp",
      alt: "Cuộn tem nhãn mã vạch dùng cho kho vận và quản lý hàng hóa",
      sourceNote: "Ảnh sản phẩm cuộn tem nhãn trắng",
      rightsStatus: "approved",
      aspectRatio: "4:3",
    },
  },
  {
    slug: "nhan-mac-may-mac-xuat-khau",
    index: "02",
    title: "Bộ nhãn mác đồng bộ cho ngành may mặc, giày da & phụ kiện",
    industryContext: "Xưởng may thời trang, gia công xuất khẩu, thương hiệu local brand",
    buyerProblem:
      "Khó kiểm soát sự đồng nhất về màu sắc, chất liệu và tiến độ khi phải đặt lẻ tem cổ áo, tem sườn hướng dẫn giặt, thẻ bài treo và nhãn dán thùng ở nhiều nhà cung cấp khác nhau.",
    recommendedApproach:
      "Thiết lập bộ quy chuẩn nhãn mác đồng bộ từ Tem dệt gắn cổ, Tem vải Satin/Nylon in ký hiệu giặt là, Thẻ bài treo (Hang tag) kèm nhãn mã vạch dán ngoài bao bì đóng gói.",
    materialConsiderations: [
      "Tem dệt mật độ cao cắt siêu âm hoặc gập hai đầu tránh gây ngứa cổ áo",
      "Tem vải Satin/Nylon kết hợp mực in Resin chuyên dụng chịu giặt công nghiệp không phai",
      "Thẻ bài giấy Couche/Ivory/Kraft định lượng cao đục lỗ chuẩn xác",
    ],
    confirmationPoints: [
      "Bản vẽ kích thước từng loại nhãn trong bộ phụ liệu (Main label, Care label, Hang tag)",
      "Yêu cầu thử nghiệm độ bền giặt hoặc tiêu chuẩn thị trường xuất khẩu",
      "Kế hoạch giao hàng theo từng chuyền may / mã hàng (Style/PO)",
    ],
    relatedProductSlugs: ["tem-det", "tem-vai-nylon-satin", "the-bai", "tem-trang-cuon"],
    image: {
      src: "/images/products/tem-det.webp",
      alt: "Minh họa bộ nhãn dệt và phụ liệu ngành may mặc",
      caption: "Ảnh minh họa chất liệu dệt (Dùng trong môi trường dev)",
      sourceNote: "Ảnh minh họa chất liệu tem dệt",
      rightsStatus: "illustrative_dev_only",
      aspectRatio: "4:3",
    },
  },
  {
    slug: "nhan-bao-bi-thuc-pham-tieu-dung",
    index: "03",
    title: "Tem nhãn thương hiệu & hộp bao bì cho thực phẩm, mỹ phẩm, dược phẩm",
    industryContext: "Cơ sở chế biến thực phẩm, hàng tiêu dùng nhanh (FMCG), dược mỹ phẩm",
    buyerProblem:
      "Nhãn dán chai lọ bị thấm nước, nhăn rách khi bảo quản lạnh hoặc màu sắc in giữa các lô hàng thiếu đồng nhất với hộp giấy bên ngoài.",
    recommendedApproach:
      "Sử dụng decal màng nhựa (PP, PVC, decal trong) cán màng bảo vệ cho sản phẩm tiếp xúc độ ẩm/kho lạnh, kết hợp sản xuất hộp giấy bao bì theo cùng hệ thống quản lý màu.",
    materialConsiderations: [
      "Decal nhựa PP/PVC trắng sữa hoặc trong suốt kháng nước, kháng dầu mỡ",
      "Tùy chỉnh hướng ra tem (winding direction) nếu doanh nghiệp dùng máy phóng nhãn tự động",
      "Hộp giấy Ivory/Kraft định lượng phù hợp trọng lượng chai lọ bên trong",
    ],
    confirmationPoints: [
      "Chất liệu bề mặt dán (Chai nhựa PET/HDPE, lọ thủy tinh, túi màng nhôm hay hộp giấy)",
      "Điều kiện bảo quản (Nhiệt độ phòng, ngăn mát hay cấp đông)",
      "Phương thức dán nhãn (Dán thủ công bằng tay hay chạy máy tự động)",
    ],
    relatedProductSlugs: ["tem-mau-cuon", "tem-mau-to", "hop", "tem-trang-to"],
    image: {
      src: "/images/products/tem-mau-cuon.webp",
      alt: "Minh họa cuộn tem nhãn in màu cho bao bì sản phẩm",
      caption: "Ảnh minh họa quy cách cuộn in màu",
      sourceNote: "Ảnh minh họa cuộn tem màu",
      rightsStatus: "illustrative_dev_only",
      aspectRatio: "4:3",
    },
  },
  {
    slug: "tem-ky-thuat-dien-tu-co-khi",
    index: "04",
    title: "Tem thông số kỹ thuật, nhãn chịu nhiệt & niêm phong linh kiện",
    industryContext: "Sản xuất linh kiện điện tử, thiết bị cơ khí, gia dụng, máy móc",
    buyerProblem:
      "Tem thông số dán trên vỏ máy bị bong tróc khi thiết bị tỏa nhiệt hoặc bị phai chữ khi lau chùi bằng dung môi công nghiệp.",
    recommendedApproach:
      "Ứng dụng decal PVC dẻo dai hoặc decal Xi bạc (PET kim loại mờ) kết hợp mực in Ribbon Resin thuần để tạo lớp bản in kháng hóa chất, chịu ma sát và nhiệt độ làm việc cao.",
    materialConsiderations: [
      "Decal Xi bạc / PET trắng chịu nhiệt, xé không rách",
      "Mực in Ribbon Resin 100% chống trầy xước và dung môi nhẹ",
      "Đầu in mã vạch 300 dpi – 600 dpi cho các con tem linh kiện kích thước nhỏ",
    ],
    confirmationPoints: [
      "Nhiệt độ bề mặt thiết bị khi vận hành và hóa chất tiếp xúc (nếu có)",
      "Độ nhẵn hoặc độ nhám sơn tĩnh điện của bề mặt vỏ máy",
      "Quy cách cung ứng (In sẵn toàn bộ hay cung cấp phôi + mực để nhà máy tự in số Serial)",
    ],
    relatedProductSlugs: ["tem-trang-cuon", "muc-in-ribbon", "may-in-ma-vach"],
    image: {
      src: "/images/products/muc-in-ribbon.webp",
      alt: "Minh họa cuộn mực in Ribbon chuyên dụng cho tem kỹ thuật",
      caption: "Ảnh minh họa vật tư in truyền nhiệt",
      sourceNote: "Ảnh minh họa mực in Ribbon",
      rightsStatus: "illustrative_dev_only",
      aspectRatio: "4:3",
    },
  },
];

export function getSolutionBySlug(slug: string): SolutionItem | undefined {
  return SOLUTIONS_LIST.find((item) => item.slug === slug);
}
