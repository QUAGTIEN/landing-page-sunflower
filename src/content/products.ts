import { ProductCategory, ProductFamily } from "@/types";

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    id: "tem-nhan-cuon",
    index: "01",
    name: "Tem nhãn dạng cuộn",
    shortName: "Tem nhãn cuộn",
    description:
      "Decal bế cuộn tiêu chuẩn cho máy in mã vạch công nghiệp và dây chuyền dán nhãn tự động.",
  },
  {
    id: "tem-nhan-to",
    index: "02",
    name: "Tem nhãn dạng tờ",
    shortName: "Tem nhãn tờ",
    description:
      "Tem decal cắt tờ phẳng A4/A5 hoặc quy cách riêng, phù hợp dán thủ công và in văn phòng/công nghiệp.",
  },
  {
    id: "vat-tu-in",
    index: "03",
    name: "Vật tư in & đóng gói",
    shortName: "Vật tư & Ribbon",
    description:
      "Giấy in chuyên dụng, mực in mã vạch Ribbon (Wax, Wax/Resin, Resin) và băng dính đóng gói.",
  },
  {
    id: "thiet-bi-ma-vach",
    index: "04",
    name: "Thiết bị mã vạch",
    shortName: "Thiết bị mã vạch",
    description:
      "Máy in tem nhãn mã vạch và máy quét mã vạch đồng bộ với vật tư tiêu hao của doanh nghiệp.",
  },
  {
    id: "bao-bi-phu-kien",
    index: "05",
    name: "Bao bì & phụ kiện",
    shortName: "Hộp & Thẻ bài",
    description:
      "Hộp giấy đóng gói sản phẩm và thẻ bài (hang tag) gia công theo nhận diện thương hiệu.",
  },
  {
    id: "nhan-may-mac",
    index: "06",
    name: "Nhãn may mặc",
    shortName: "Nhãn may mặc",
    description:
      "Tem dệt (woven label) và tem vải nylon/satin in hướng dẫn sử dụng, thông số kích cỡ ngành thời trang.",
  },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 1,
    slug: "tem-trang-cuon",
    name: "Tem trắng dạng cuộn",
    familyId: "tem-nhan-cuon",
    familyName: "Tem nhãn dạng cuộn",
    summary:
      "Cuộn decal trắng bế sẵn theo kích thước yêu cầu, sử dụng để in thông tin biến đổi, mã vạch, QR code, nhãn vận chuyển và quản lý kho.",
    applications: [
      "Tem vận đơn, nhãn kho vận & logistics",
      "Tem mã vạch quản lý bán lẻ, siêu thị, nhà máy",
      "Nhãn thông số kỹ thuật dán thùng carton và linh kiện",
    ],
    specifications: [
      { label: "Chất liệu phổ biến", value: "Decal giấy thường, cảm nhiệt trực tiếp, PVC, PP, Xi bạc" },
      { label: "Quy cách bế", value: "1 tem/hàng, 2 tem/hàng, 3 tem/hàng hoặc theo bản vẽ" },
      { label: "Đường kính lõi", value: "Lõi 1 inch (25mm), 1.5 inch (38mm), 3 inch (76mm)" },
    ],
    quoteFields: ["Kích thước tem (ngang × cao)", "Chất liệu mặt & keo", "Đường kính lõi & chiều dài cuộn", "Số lượng cuộn"],
    featuredOnHome: true,
    image: {
      src: "/images/products/tem-trang-cuon.webp",
      alt: "Cuộn tem nhãn trắng bế sẵn lõi giấy kraft",
      sourceNote: "Ảnh sản phẩm sạch không chứa nhãn hiệu bên thứ ba",
      rightsStatus: "approved",
      aspectRatio: "4:3",
    },
  },
  {
    id: 2,
    slug: "tem-mau-cuon",
    name: "Tem màu dạng cuộn",
    familyId: "tem-nhan-cuon",
    familyName: "Tem nhãn dạng cuộn",
    summary:
      "Tem nhãn in màu hoàn thiện hoặc in nền thương hiệu dạng cuộn, sẵn sàng cho dây chuyền dán nhãn tự động hoặc in thêm ngày sản xuất/mã vạch.",
    applications: [
      "Nhãn chính cho chai lọ thực phẩm, đồ uống, mỹ phẩm, dược phẩm",
      "Tem nhận diện thương hiệu kết hợp in thông tin biến đổi",
      "Tem cảnh báo, tem phân loại màu trong sản xuất công nghiệp",
    ],
    specifications: [
      { label: "Công nghệ in", value: "In cuộn nhiều màu theo mẫu thiết kế của doanh nghiệp" },
      { label: "Gia công bề mặt", value: "Cán màng bóng/mờ, phủ UV, ép kim theo yêu cầu" },
      { label: "Hướng ra tem", value: "Tùy chỉnh chiều ra tem phù hợp máy dán tự động" },
    ],
    quoteFields: ["File thiết kế / Số màu in", "Kích thước & hình dáng bế", "Gia công bề mặt", "Số lượng đặt in"],
    featuredOnHome: true,
    image: {
      src: "/images/products/tem-mau-cuon.webp",
      alt: "Minh họa các cuộn tem nhãn in màu theo thiết kế",
      caption: "Ảnh minh họa kiểu dáng cuộn (Cần thay bằng ảnh sản phẩm được cấp phép trước khi xuất bản)",
      sourceNote: "Ảnh tham khảo có nhãn hiệu mẫu nước ngoài — chỉ dùng trong môi trường dev",
      rightsStatus: "illustrative_dev_only",
      aspectRatio: "4:3",
    },
  },
  {
    id: 3,
    slug: "tem-trang-to",
    name: "Tem trắng tờ",
    familyId: "tem-nhan-to",
    familyName: "Tem nhãn dạng tờ",
    summary:
      "Decal trắng cắt tờ phẳng (A4, A3 hoặc kích thước đặt riêng), chia ô bế sẵn để in bằng máy in laser/inkjet văn phòng hoặc gia công tiếp.",
    applications: [
      "Tem nhãn địa chỉ, phân loại hồ sơ, tài liệu văn phòng",
      "Nhãn phụ hàng hóa nhập khẩu số lượng linh hoạt",
      "Tem kiểm kê tài sản, nhãn dán thủ công tại xưởng",
    ],
    specifications: [
      { label: "Khổ tờ tiêu chuẩn", value: "A4 (210×297mm), A3 hoặc cắt tờ theo yêu cầu" },
      { label: "Bề mặt giấy", value: "Decal giấy nhám, giấy bóng, decal đế vàng/đế xanh" },
      { label: "Kiểu bế", value: "Bế đứt nửa (kiss-cut) chia nhiều con tem trên 1 tờ" },
    ],
    quoteFields: ["Khổ tờ & kích thước từng con tem", "Số tem trên 1 tờ", "Loại máy in sử dụng", "Số lượng tờ"],
    featuredOnHome: false,
    image: {
      src: "/images/products/tem-trang-to.webp",
      alt: "Minh họa tem nhãn trắng bế sẵn dạng tờ phẳng",
      caption: "Ảnh minh họa quy cách tờ (Cần xử lý/thay ảnh không chứa logo bên thứ ba)",
      sourceNote: "Ảnh intake có góc logo Avery — chỉ dùng minh họa dev",
      rightsStatus: "illustrative_dev_only",
      aspectRatio: "4:3",
    },
  },
  {
    id: 4,
    slug: "tem-mau-to",
    name: "Tem màu dạng tờ",
    familyId: "tem-nhan-to",
    familyName: "Tem nhãn dạng tờ",
    summary:
      "Tem decal in màu sắc nét thành từng tờ hoặc bế rời, phù hợp cho bao bì sản phẩm, nhãn dán thủ công, sticker thương hiệu và tem niêm phong.",
    applications: [
      "Tem nhãn dán hộp quà, túi giấy, hũ thực phẩm thủ công",
      "Tem bảo hành, tem niêm phong, nhãn hướng dẫn sử dụng",
      "Bộ nhãn đa kích thước trên cùng một tờ phẳng",
    ],
    specifications: [
      { label: "Chất liệu", value: "Decal giấy Couche, decal nhựa sữa, decal trong, decal kraft" },
      { label: "Hoàn thiện", value: "Cán màng bóng/mờ, bế demi theo biên dạng bất kỳ" },
      { label: "Đóng gói", value: "Xấp tờ phẳng dễ bảo quản và thao tác bóc dán" },
    ],
    quoteFields: ["Kích thước & hình dáng tem", "Chất liệu decal", "File thiết kế", "Số lượng tem/tờ"],
    featuredOnHome: false,
    image: {
      src: "/images/products/tem-mau-to.webp",
      alt: "Minh họa tem nhãn in màu dạng tờ",
      caption: "Ảnh minh họa (Cần thay bằng ảnh thành phẩm thực tế của Sunflower)",
      sourceNote: "Ảnh intake có chữ Yardsale.nz — chỉ dùng minh họa dev",
      rightsStatus: "illustrative_dev_only",
      aspectRatio: "4:3",
    },
  },
  {
    id: 5,
    slug: "giay",
    name: "Giấy",
    familyId: "vat-tu-in",
    familyName: "Vật tư in & đóng gói",
    summary:
      "Cung ứng các dòng giấy in công nghiệp, giấy văn phòng và vật liệu giấy nền phục vụ hoạt động in ấn, đóng gói và quản lý sản xuất.",
    applications: [
      "Giấy in phiếu xuất nhập kho, hóa đơn, chứng từ sản xuất",
      "Giấy nguyên liệu cho gia công bao bì, thẻ bài, nhãn mác",
      "Giấy lót, giấy đóng gói công nghiệp",
    ],
    specifications: [
      { label: "Phân loại chi tiết", value: "TODO_CONTENT: Xác nhận danh mục các dòng giấy cụ thể của Sunflower", isTodo: true },
      { label: "Định lượng (GSM)", value: "Tùy chọn theo mục đích in ấn và gia công" },
      { label: "Quy cách cung ứng", value: "Dạng tờ (Ream/Pallet) hoặc dạng cuộn theo yêu cầu" },
    ],
    quoteFields: ["Chủng loại giấy & định lượng (GSM)", "Khổ giấy", "Số lượng dự kiến"],
    featuredOnHome: false,
    image: {
      src: "",
      alt: "Khung kỹ thuật nhóm sản phẩm Giấy in công nghiệp",
      sourceNote: "TODO_ASSET: Chờ bổ sung ảnh chụp thực tế nhóm Giấy từ Sunflower",
      rightsStatus: "placeholder_needed",
      aspectRatio: "4:3",
    },
  },
  {
    id: 6,
    slug: "muc-in-ribbon",
    name: "Mực in Ribbon",
    familyId: "vat-tu-in",
    familyName: "Vật tư in & đóng gói",
    summary:
      "Cuộn ruy-băng mực in truyền nhiệt (Thermal Transfer Ribbon) đảm bảo độ bám mực, chống phai và bảo vệ đầu in cho máy in mã vạch.",
    applications: [
      "Ribbon Wax: In trên decal giấy thường trong kho vận, bán lẻ",
      "Ribbon Wax/Resin: Chống trầy xước và kháng ẩm tốt cho vận chuyển",
      "Ribbon Resin: Kháng hóa chất, nhiệt độ cao trên decal PVC, PET, Xi bạc, Tem vải",
    ],
    specifications: [
      { label: "Chủng loại mực", value: "Wax, Wax/Resin, Resin (Đen, Trắng, Vàng nhũ...)" },
      { label: "Kích thước phổ biến", value: "110mm × 300m, 110mm × 100m, 80mm × 300m hoặc cắt theo yêu cầu" },
      { label: "Mặt mực", value: "Face-in (mực trong) hoặc Face-out (mực ngoài) theo dòng máy" },
    ],
    quoteFields: ["Loại chất liệu tem đang dùng", "Model máy in mã vạch", "Khổ rộng × chiều dài cuộn mực", "Số lượng cuộn"],
    featuredOnHome: true,
    image: {
      src: "/images/products/muc-in-ribbon.webp",
      alt: "Minh họa các cuộn mực in mã vạch Thermal Transfer Ribbon",
      caption: "Ảnh minh họa dòng mực in cuộn (Xác nhận thương hiệu phân phối thực tế)",
      sourceNote: "Ảnh sản phẩm mẫu có nhãn Zebra — chỉ dùng minh họa trong giai đoạn dev",
      rightsStatus: "illustrative_dev_only",
      aspectRatio: "4:3",
    },
  },
  {
    id: 7,
    slug: "may-in-ma-vach",
    name: "Máy in mã vạch",
    familyId: "thiet-bi-ma-vach",
    familyName: "Thiết bị mã vạch",
    summary:
      "Thiết bị in tem nhãn mã vạch để bàn và công nghiệp, tương thích đồng bộ với các dòng decal cuộn và mực in Ribbon do Sunflower cung cấp.",
    applications: [
      "In tem nhãn tại quầy, văn phòng, kho hàng vừa và nhỏ (Dòng Desktop)",
      "In tem công suất lớn liên tục trong nhà máy sản xuất (Dòng Industrial)",
      "Tích hợp cùng phần mềm quản lý kho, ERP, WMS",
    ],
    specifications: [
      { label: "Độ phân giải đầu in", value: "203 dpi, 300 dpi, 600 dpi (tùy độ nhỏ của mã vạch/chữ)" },
      { label: "Phương thức in", value: "Truyền nhiệt gián tiếp (dùng Ribbon) & Nhiệt trực tiếp" },
      { label: "Danh mục model", value: "TODO_CONTENT: Cập nhật danh sách hãng & model phân phối chính thức", isTodo: true },
    ],
    quoteFields: ["Sản lượng tem in mỗi ngày", "Kích thước tem lớn nhất & độ phân giải cần in", "Chuẩn kết nối (USB, LAN, RS232)"],
    featuredOnHome: false,
    image: {
      src: "/images/products/may-in-ma-vach.webp",
      alt: "Máy in mã vạch để bàn đang in cuộn tem nhãn",
      caption: "Ảnh minh họa thiết bị in mã vạch",
      sourceNote: "Ảnh thiết bị mẫu TSC — cần xác nhận model phân phối chính thức",
      rightsStatus: "illustrative_dev_only",
      aspectRatio: "4:3",
    },
  },
  {
    id: 8,
    slug: "may-quet-ma-vach",
    name: "Máy quét mã vạch",
    familyId: "thiet-bi-ma-vach",
    familyName: "Thiết bị mã vạch",
    summary:
      "Thiết bị đọc mã vạch 1D và 2D (QR Code, DataMatrix) có dây và không dây, hỗ trợ kiểm kho, xuất nhập hàng và truy xuất nguồn gốc nhanh chóng.",
    applications: [
      "Quét mã vạch thành phẩm trên băng chuyền và khu vực đóng gói",
      "Kiểm kê kho nguyên vật liệu, bán thành phẩm bằng máy quét không dây",
      "Quét mã QR quản lý lô hàng, đơn vận chuyển",
    ],
    specifications: [
      { label: "Chuẩn giải mã", value: "Mã vạch 1D tiêu chuẩn & 2D (QR Code, PDF417, DataMatrix)" },
      { label: "Kiểu kết nối", value: "Có dây USB / Không dây Bluetooth & Wireless Dongle" },
      { label: "Danh mục model", value: "TODO_CONTENT: Cập nhật các model máy quét cung ứng", isTodo: true },
    ],
    quoteFields: ["Loại mã cần quét (1D hay 2D/QR)", "Môi trường sử dụng (văn phòng, kho lạnh, nhà xưởng)", "Số lượng thiết bị"],
    featuredOnHome: false,
    image: {
      src: "",
      alt: "Khung kỹ thuật nhóm Máy quét mã vạch công nghiệp",
      sourceNote: "TODO_ASSET: Chờ bổ sung ảnh thiết bị máy quét mã vạch thực tế",
      rightsStatus: "placeholder_needed",
      aspectRatio: "4:3",
    },
  },
  {
    id: 9,
    slug: "hop",
    name: "Hộp",
    familyId: "bao-bi-phu-kien",
    familyName: "Bao bì & phụ kiện",
    summary:
      "Thiết kế và gia công hộp giấy mềm, hộp carton lạnh/sóng bồi in offset theo quy cách sản phẩm, giúp bảo vệ hàng hóa và nâng tầm diện mạo thương hiệu.",
    applications: [
      "Hộp đựng dược phẩm, mỹ phẩm, thực phẩm chức năng, linh kiện",
      "Hộp giấy Kraft thân thiện môi trường cho hàng tiêu dùng & xuất khẩu",
      "Hộp đóng gói đồng bộ cùng tem nhãn dán ngoài",
    ],
    specifications: [
      { label: "Chất liệu giấy", value: "Giấy Ivory, Duplex, Kraft, Bristols hoặc bồi sóng E/B" },
      { label: "Gia công sau in", value: "Bế dán thành phẩm, cán màng, ép kim, thúc nổi, cửa sổ bóng kính" },
      { label: "Thiết kế cấu trúc", value: "Hộp nắp cài, nắp gài đáy khóa, hộp âm dương, hộp trượt" },
    ],
    quoteFields: ["Kích thước hộp (Dài × Rộng × Cao)", "Trọng lượng sản phẩm bên trong", "Chất liệu & quy cách in", "Số lượng đặt sản xuất"],
    featuredOnHome: true,
    image: {
      src: "",
      alt: "Khung kỹ thuật nhóm Hộp giấy bao bì",
      sourceNote: "TODO_ASSET: Chờ bổ sung ảnh chụp hộp giấy thành phẩm của Sunflower",
      rightsStatus: "placeholder_needed",
      aspectRatio: "4:3",
    },
  },
  {
    id: 10,
    slug: "the-bai",
    name: "Thẻ bài",
    familyId: "bao-bi-phu-kien",
    familyName: "Bao bì & phụ kiện",
    summary:
      "Thẻ treo sản phẩm (Hang tag / Price tag) in ấn sắc nét, đục lỗ và bế hình dáng đa dạng cho ngành may mặc, giày dép, túi xách và phụ kiện.",
    applications: [
      "Thẻ treo quần áo thời trang, thông tin thương hiệu & hướng dẫn bảo quản",
      "Thẻ bài kết hợp dán tem mã vạch quản lý SKU tại cửa hàng",
      "Thẻ nhận diện lô hàng trong nhà máy sản xuất",
    ],
    specifications: [
      { label: "Chất liệu", value: "Giấy Couche 300–400gsm, Ivory, Kraft, giấy mỹ thuật hoặc bồi 2 lớp" },
      { label: "Gia công hoàn thiện", value: "Cán màng mờ/bóng, đục lỗ tròn, đóng mắt cáo kim loại, bo góc" },
      { label: "Hình dáng", value: "Chữ nhật, vuông, tròn, gấp đôi hoặc bế khuôn hình riêng" },
    ],
    quoteFields: ["Kích thước thẻ & định lượng giấy", "Quy cách đục lỗ / gia công bề mặt", "Số lượng thẻ bài"],
    featuredOnHome: false,
    image: {
      src: "/images/products/the-bai.webp",
      alt: "Minh họa thẻ bài treo sản phẩm đục lỗ",
      caption: "Ảnh minh họa thẻ bài (Cần thay bằng ảnh không chứa nhãn hiệu khách hàng)",
      sourceNote: "Ảnh intake có logo Mizuno — chỉ dùng minh họa trong môi trường dev",
      rightsStatus: "illustrative_dev_only",
      aspectRatio: "4:3",
    },
  },
  {
    id: 11,
    slug: "tem-det",
    name: "Tem dệt",
    familyId: "nhan-may-mac",
    familyName: "Nhãn may mặc",
    summary:
      "Nhãn dệt mật độ sợi cao (Woven Label) cho cổ áo, sườn áo và phụ kiện thời trang; bền màu qua nhiều chu kỳ giặt công nghiệp và giữ phom sắc sảo.",
    applications: [
      "Nhãn chính gắn cổ áo (Main label), nhãn size (Size tab)",
      "Tem dệt gắn túi xách, chăn ga gối đệm, giày dép xuất khẩu",
      "Nhãn viền gập đôi hoặc gập hai đầu may trực tiếp lên sản phẩm",
    ],
    specifications: [
      { label: "Kiểu dệt", value: "Dệt mật độ cao (Damask), dệt Satin, dệt Taffeta" },
      { label: "Gia công cắt gập", value: "Cắt nhiệt chống tưa sợi, cắt siêu âm, gập 2 đầu (End fold), gập giữa (Center fold)" },
      { label: "Độ bền", value: "Chịu giặt công nghiệp, không phai màu sợi" },
    ],
    quoteFields: ["Kích thước nhãn mở & sau khi gập", "Số màu sợi trong logo", "Kiểu gập thành phẩm", "Số lượng đặt dệt"],
    featuredOnHome: true,
    image: {
      src: "/images/products/tem-det.webp",
      alt: "Minh họa nhãn dệt may mặc mật độ sợi cao",
      caption: "Ảnh minh họa chất liệu dệt (Cần thay bằng mẫu được phép công bố)",
      sourceNote: "Ảnh intake có chữ Creations by Guzman — chỉ dùng minh họa dev",
      rightsStatus: "illustrative_dev_only",
      aspectRatio: "4:3",
    },
  },
  {
    id: 12,
    slug: "tem-vai-nylon-satin",
    name: "Tem vải nylon / satin",
    familyId: "nhan-may-mac",
    familyName: "Nhãn may mặc",
    summary:
      "Nhãn vải Satin bóng mềm và Nylon Taffeta (Ruban) chuyên dụng để in thành phần chất liệu, ký hiệu giặt ủi (Care label) và xuất xứ hàng may mặc.",
    applications: [
      "Tem hướng dẫn sử dụng & ký hiệu giặt là may bên sườn trang phục",
      "Nhãn vải Satin mềm mại cho đồ trẻ em, đồ lót, thời trang cao cấp",
      "Cuộn vải Taffeta/Satin trắng để doanh nghiệp tự in thêm bằng mực Ribbon Resin",
    ],
    specifications: [
      { label: "Chất liệu vải", value: "Satin dệt biên / không biên (trắng, đen), Nylon Taffeta (Ruban)" },
      { label: "Hình thức cung ứng", value: "In hoàn thiện cắt rời HOẶC cung cấp cuộn phôi trắng + Ribbon Resin" },
      { label: "Đặc tính", value: "Bám mực tốt với mực Resin chuyên dụng, chịu giặt và là ủi" },
    ],
    quoteFields: ["Chất liệu (Satin hay Nylon Taffeta)", "Khổ rộng băng vải × chiều dài", "Đặt in thành phẩm hay mua cuộn phôi trắng", "Số lượng"],
    featuredOnHome: false,
    image: {
      src: "",
      alt: "Khung kỹ thuật nhóm Tem vải Nylon và Satin",
      sourceNote: "TODO_ASSET: Chờ bổ sung ảnh chụp cuộn tem vải Satin / Nylon thực tế",
      rightsStatus: "placeholder_needed",
      aspectRatio: "4:3",
    },
  },
  {
    id: 13,
    slug: "bang-dinh",
    name: "Băng dính",
    familyId: "vat-tu-in",
    familyName: "Vật tư in & đóng gói",
    summary:
      "Băng dính đóng thùng carton trong/đục, băng dính giấy và băng dính in logo thương hiệu giúp niêm phong hàng hóa an toàn trong khâu vận chuyển.",
    applications: [
      "Niêm phong thùng carton xuất xưởng và kho vận",
      "Băng dính in logo/cảnh báo chống bóc mở hàng hóa",
      "Băng dính giấy kraft thân thiện môi trường cho đóng gói xuất khẩu",
    ],
    specifications: [
      { label: "Chủng loại", value: "Băng dính OPP trong/đục, băng dính in chữ/logo, băng dính giấy" },
      { label: "Quy cách cuộn", value: "Bản rộng 48mm, 60mm; chiều dài 100Y, 200Y hoặc cuộn máy" },
      { label: "Độ dày màng keo", value: "43 mic, 50 mic (tùy trọng lượng thùng hàng)" },
    ],
    quoteFields: ["Loại băng dính (Trong/Đục/Giấy/In logo)", "Bản rộng & chiều dài cuộn", "Số lượng cuộn/cây"],
    featuredOnHome: false,
    image: {
      src: "/images/products/bang-dinh.webp",
      alt: "Minh họa băng dính đóng gói và băng dính in theo yêu cầu",
      caption: "Ảnh minh họa đóng gói (Cần thay bằng ảnh studio nền sáng đồng bộ)",
      sourceNote: "Ảnh intake có nhãn mẫu nước ngoài trên nền gỗ — chỉ dùng minh họa dev",
      rightsStatus: "illustrative_dev_only",
      aspectRatio: "4:3",
    },
  },
];

export function getProductBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((item) => item.slug === slug);
}
