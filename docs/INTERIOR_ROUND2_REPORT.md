# Lượt 2 mới — Năm Hero trang con

2026-10-17. **Hoàn tất code/checks, chờ chủ dự án review giao diện.** Đây là lượt 2 của bốn lượt tiếp theo, không phải prototype 3D lượt 2 cũ.

## 1. Phát hiện

Năm trang dùng chung Hero chủ yếu có chữ. Hình/caption được chọn và mockup đã có, nhưng chưa áp dụng vào app. Header chỉ dùng logo charcoal/nền sáng. Trên mobile, biểu mẫu Liên hệ nằm sau toàn bộ khối thông tin/FAQ; chưa có điểm neo form ở HTML trước hydration.

## 2. Thay đổi và file

| Trang | Hero thực tế | CTA chính |
|---|---|---|
| Giới thiệu | Graphite, chữ trái + cận bản in phải; “Từ ý tưởng. Đến từng chi tiết.” | `#about-story-heading` |
| Năng lực | Ảnh máy in phủ Hero, overlay tối giúp chữ rõ; “Từ chế bản. Đến thành phẩm.” | `#capabilities-workflow-heading` |
| Giải pháp | Ivory split với bộ tem nhiều vật liệu, hiển thị tối đa 447px; “Đúng chất liệu. Đúng ứng dụng.” | `#solutions-index` |
| Dự án | Graphite ấm split với BROTHERS, giữ nguyên bố cục/artwork; “Những dấu ấn trên thành phẩm.” | `#projects-index` |
| Liên hệ | Warm gray gọn, thẻ bài phụ; “Bắt đầu từ yêu cầu của bạn.” | `#quote-request` |

- Mới `src/components/ui/InteriorHero.tsx`: Server Component, chung ba biến thể split/backdrop/compact. H1/ảnh/CTA/caption render sẵn; không canvas, không animation Hero mới.
- Mới `src/content/pageHeroes.ts`: nội dung/media/kích thước/nguồn/quyền và theme Header. Không đổi schema catalog hoặc dữ liệu dự án.
- Sửa năm `src/app/{gioi-thieu,nang-luc,giai-phap,du-an,lien-he}/page.tsx`; metadata route được giữ.
- Sửa `src/components/layout/SiteHeader.tsx` và `src/app/globals.css`: Header tối/sáng/beige theo Hero, logo neutral sáng/tối đã có. CSS dựa vào native menu để đổi màu logo cả trước hydration; menu mở hoặc Header sau cuộn về nền sáng. Không vẽ lại symbol/brand file.
- Thêm ID chỉ mục ở `src/sections/solutions/SolutionsDetailSections.tsx` và `src/sections/projects/ProjectsShowcaseSections.tsx`.
- Sửa markup `src/sections/contact/QuoteRequestForm.tsx`: form đứng trước trong DOM/mobile; desktop vẫn thông tin trái/form phải bằng CSS order. Form có heading/region nhận diện riêng. Toàn bộ state/query/handlers trước phần JSX và các ID field cũ được đối chiếu, giữ nguyên.
- Điểm neo `#quote-request` thuộc page server bên ngoài Suspense, luôn có trước JS; fallback có hướng dẫn no-JS. Một điểm neo duy nhất; query báo giá vẫn giữ khi click CTA.
- Thêm hai WebP trong `public/images/hero/interior/`: bộ tem 27,094 bytes, BROTHERS 72,212 bytes, **tổng 99,306 bytes**. Chỉ encode định dạng, không crop/upscale/retouch hoặc thay artwork. Các stock/cutout khác dùng lại file cũ.

Nguồn/checks ảnh tại `references/hero-assets/interior-round2/README.md`, `asset-checks.json`; metadata public tại `src/content/pageHeroes.ts`. Sổ intake được cập nhật đường dẫn derivative, vẫn giữ nguyên xác nhận owner. Stock/bộ tem có chú thích minh họa, không nhận là cơ sở/tồn kho Sunflower. BROTHERS chỉ ghi “Sunflower tham gia thực hiện”, đúng quyền công bố chủ dự án đã xác nhận; không thêm công đoạn, thời gian, sản lượng hoặc kết quả. Tòa nhà không được dùng.

Homepage poster và catalog 13 cutout của lượt 1 không bị thiết kế lại. Không dependency mới/nâng major, không đổi API/database/ERP/form delivery, không deploy.

## 3. Kiểm chứng

**Source và build:**

- `npm run typecheck`: đạt.
- ESLint trực tiếp trên 11 file TS/TSX sửa/mới, cấu hình `references/work-snapshots/round1-20261017/eslint-round1.json`, `--no-eslintrc --max-warnings 0`: đạt, không lỗi/cảnh báo. Lệnh: `node node_modules/eslint/bin/eslint.js --no-eslintrc --config references/work-snapshots/round1-20261017/eslint-round1.json src/components/ui/InteriorHero.tsx src/content/pageHeroes.ts src/components/layout/SiteHeader.tsx src/app/gioi-thieu/page.tsx src/app/nang-luc/page.tsx src/app/giai-phap/page.tsx src/app/du-an/page.tsx src/app/lien-he/page.tsx src/sections/contact/QuoteRequestForm.tsx src/sections/solutions/SolutionsDetailSections.tsx src/sections/projects/ProjectsShowcaseSections.tsx --max-warnings 0`.
- `npm run build`: đạt; log tại `references/work-snapshots/interior-round2-20261017/build-final.log`. Next báo First Load JS: Giới thiệu/Giải pháp/Năng lực 112 kB, Dự án 117 kB, Liên hệ 127 kB; Trang chủ 122 kB/Sản phẩm 124 kB. Đây là số build, không phải phép đo Lighthouse/mạng thật.
- `node references/hero-assets/interior-round2/verify-heroes.cjs`: đạt trên build cuối. Bảy route HTTP 200/một H1/không canvas; năm Hero/CTA/anchor SSR đúng; media HTTP 200 và đúng kích thước; homepage vẫn có poster, catalog đủ 13 anchor/URL báo giá. Logic form trước JSX giống snapshot, các ID field cũ giữ nguyên. Kết quả thật ở `demo-checks.json` cùng thư mục.

**Browser thực tế IAB trên Windows:**

- Đủ năm Hero được kiểm tra/chụp lại trên build cuối ở **390×844, 768×1024, 1440×900, 1920×1080**: 20 baseline, ảnh tải đủ, một H1 và không canvas; không phát hiện tràn ngang. `final-responsive-checks.json` lưu viewport được đặt và kết quả DOM.
- 320×844 kiểm tra thêm trong dev, cùng source/CSS cuối: không tràn document hoặc vùng chữ Hero. Ảnh bộ tem ≤447px; BROTHERS khoảng 625px trên 1440px và 620px trên 1920px, dưới kích thước gốc 738px.
- Đã bấm đủ năm CTA trong dev và xác nhận hash/target. Trên build cuối, kiểm tra lại CTA Giới thiệu và hành trình Sản phẩm → báo giá Hộp → CTA form. URL giữ `?san-pham=hop#quote-request`, product select vẫn `hop`; focus tới `quote-request`, form ở đầu khối liên hệ trên mobile. Dev cũng kiểm tra prefill `may-in-ma-vach`.
- Back hai bước về catalog đủ 13 nhóm; Forward về báo giá giữ prefill `hop`. Không nhập dữ liệu người thật hoặc submit form.
- Header menu mobile nền tối: mở menu chuyển nền sáng/logo charcoal, đóng bằng Escape và trả focus về summary. Trên build cuối, từ menu Giới thiệu sang Giải pháp menu đóng và theme chuyển sáng đúng. Header Giới thiệu sau cuộn đổi nền ivory/logo charcoal, heading target không bị che.
- Màu chữ nav/Header được đọc từ DOM và tính tương phản: Giới thiệu/Năng lực **16.77:1**, Dự án **14.51:1**, Giải pháp **11.54:1**, Liên hệ **10.20:1**. Đây chỉ là các cặp nav/background đặc được đo, không phải audit contrast toàn trang/ảnh nền.
- Tab mới trên build cuối không ghi lỗi/cảnh báo console (`final-console.json` là mảng rỗng).

Lần điều hướng dev đầu có timeout khi cold compile khoảng 15 giây; sau biên dịch route trả 200 và kiểm tra tiếp bình thường. Một số ảnh/fallback form ở ảnh chụp sớm chưa tải xong; đã chờ load/network idle rồi thay các baseline bằng ảnh build cuối có media đầy đủ. Không dùng ảnh trống làm bằng chứng hoàn tất.

## 4. Ảnh và giới hạn

- [Giới thiệu desktop](./mockups/interior-round2/gioi-thieu-desktop.jpg), [mobile](./mockups/interior-round2/gioi-thieu-mobile.jpg).
- [Năng lực desktop](./mockups/interior-round2/nang-luc-desktop.jpg), [mobile](./mockups/interior-round2/nang-luc-mobile.jpg).
- [Giải pháp desktop](./mockups/interior-round2/giai-phap-desktop.jpg), [mobile](./mockups/interior-round2/giai-phap-mobile.jpg).
- [Dự án desktop](./mockups/interior-round2/du-an-desktop.jpg), [mobile](./mockups/interior-round2/du-an-mobile.jpg).
- [Liên hệ desktop](./mockups/interior-round2/lien-he-desktop.jpg), [mobile](./mockups/interior-round2/lien-he-mobile.jpg).
- Các ảnh `before-*-desktop.jpg`, `*-tablet.jpg`, `*-wide.jpg` và JSON kiểm tra nằm cùng thư mục. Baseline mới chụp từ app thật, không phải mockup AI. Browser có thể loại scrollbar/vùng bao quanh nên kích thước file ảnh khác viewport được đặt.

Chưa chạy browser tắt JS, mô phỏng reduced-motion/Save-Data, 200% zoom, screen reader, Lighthouse hoặc thiết bị mobile thật. HTML SSR/anchor/fallback được kiểm tra riêng; Hero tĩnh và CSS giảm motion chung được giữ, không coi đó là bằng chứng đã test các chế độ browser này. Ảnh stock có caption và nguồn registry cũ, nhưng chi tiết photographer/license cho production chưa có. Ảnh owner nhỏ được giới hạn hiển thị; bản gốc lớn hơn có thể cải thiện retina sau này, không chặn demo.

## 5. Còn mở và rollback

Lượt 2 đã có kết quả để review; lượt 3 tiếp theo polish/QA toàn site, lượt 4 mới vòng xoay Sản phẩm rồi Hero 3D. Homepage tiếp tục poster. Chưa owner nghiệm thu chỉ vì checks đạt. Thông tin công ty chính thức/ảnh thực tế và backend production vẫn là phạm vi riêng.

Snapshot trước sửa: `references/work-snapshots/interior-round2-20261017/` với cấu trúc đường dẫn source/docs/sổ intake. Khôi phục các file tương ứng từ snapshot; kiểm tra import trước khi bỏ `InteriorHero.tsx`, `pageHeroes.ts` và hai WebP mới. Giữ originals/prompt/tài liệu ngoài public. Không viện dẫn Git commit vì workspace chưa có repository.
