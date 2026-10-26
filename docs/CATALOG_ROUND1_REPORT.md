# Lượt 1 mới — Hero Sản phẩm tĩnh và catalog 13 nhóm

Ngày 2026-10-17. **Có kết quả code và kiểm tra, chờ chủ dự án review giao diện.** Đây là lượt 1 của bốn lượt tiếp theo, theo cách chia mới nhất; không phải triển khai lại lượt 1 Header/homepage cũ.

## 1. Phát hiện và phạm vi

Catalog trước dùng ảnh trong `ProductStage`, nhiều hình có bối cảnh/nhãn hiệu hoặc placeholder; Hero chỉ có chữ. Ba vật thể alpha đã có ở homepage chưa phủ toàn bộ 13 nhóm. Mục tiêu lượt này là Hero riêng cho Sản phẩm và vật thể tách nền cho đủ catalog, giữ dữ liệu và hành trình báo giá.

## 2. Thay đổi

- Hero Sản phẩm render từ server: beige, H1 “Vật liệu nhỏ. Dấu ấn lớn.”, CTA xuống chỉ mục 13 nhóm, cuộn tem trắng là chính và hộp/thẻ phụ. Header hòa nền beige ở đầu trang Sản phẩm, trở về nền đọc rõ khi cuộn.
- Đủ **13 nhóm có cutout WebP alpha**: dùng lại ba hình homepage, tạo thêm mười minh họa AI không thương hiệu. Mỗi hình có alt, caption demo và registry nguồn/quyền. Không coi hình thiết bị là model Sunflower phân phối.
- Catalog editorial xen kẽ ảnh/chữ, nhịp ivory/beige, vật thể trực tiếp trên nền section. Ảnh tĩnh; không parallax, vòng xoay hoặc canvas.
- Thông số, ứng dụng và danh sách cần chuẩn bị báo giá nằm trong native `details`; giữ đủ giá trị dữ liệu. Giảm phần chữ/nhãn kỹ thuật lặp ở trạng thái ban đầu.
- Bộ lọc sáu họ có trạng thái `aria-pressed` và thông báo số nhóm. Chỉ mục 13 link hoạt động trước JS; khi click vào nhóm đang bị lọc ẩn, đồng bộ hiển thị trước hành động anchor gốc. `hashchange` hỗ trợ lịch sử trình duyệt. Filter disabled trước hydration, có giải thích no-JS.
- Native disclosure dùng bàn phím; bảng tham chiếu giữ nội dung, bổ sung scope cho header và vùng cuộn ngang có focus/nhãn.
- Ba hình Hero được ưu tiên tải để tránh ảnh phụ xuất hiện muộn; ảnh catalog lazy-load, reserve kích thước. Không thêm dependency.

### File source

| Loại | File |
|---|---|
| Mới | `src/sections/products/ProductsHeroStage.tsx` |
| Mới | `src/components/ui/ProductCutout.tsx` |
| Mới | `src/content/catalogObjects.ts` |
| Sửa | `src/app/san-pham/page.tsx` |
| Sửa | `src/sections/products/ProductsCatalogueView.tsx` |
| Sửa | `src/components/layout/SiteHeader.tsx` — chỉ thêm dấu nhận diện route cho màu Header |
| Sửa | `src/app/globals.css` — style Hero/catalog và responsive có phạm vi riêng |

Nguồn ảnh/prompt/bản gốc/checks: `references/product-cutouts/catalog-v1/`. Mười WebP mới nằm trong `public/images/products/cutouts/`; ba WebP cũ dùng lại. Tài liệu hiện hành được cập nhật trong `IMPLEMENTATION_PLAN.md`, `DESIGN_SYSTEM.md`, `PAGE_STRUCTURE.md`, `HERO_ASSET_SELECTION.md`.

`src/content/products.ts`, tên/slug/họ sản phẩm, specifications/applications/quoteFields, API và biểu mẫu không bị sửa. Homepage vẫn poster đã duyệt. Năm Hero khác thuộc lượt 2 mới; BROTHERS chưa được đưa vào app trong lượt này.

## 3. Kiểm chứng

**Checks source cuối cùng:**

- `npm run typecheck`: đạt.
- `node node_modules/eslint/bin/eslint.js --no-eslintrc --config references/work-snapshots/round1-20261017/eslint-round1.json src/app/san-pham/page.tsx src/sections/products/ProductsHeroStage.tsx src/sections/products/ProductsCatalogueView.tsx src/components/ui/ProductCutout.tsx src/content/catalogObjects.ts src/components/layout/SiteHeader.tsx --max-warnings 0`: đạt, không lỗi/cảnh báo trên các file TS/TSX thay đổi.
- `npm run build`: đạt. Log thật tại `references/work-snapshots/catalog-round1-20261017/build-final.log`. Next báo route Sản phẩm 6.41 kB, First Load JS 124 kB; đây là số build, không phải điểm Lighthouse hay phép đo mạng/thiết bị thật.
- `node references/product-cutouts/catalog-v1/verify-demo.cjs`: đạt trên bản build cuối. Bảy route trả HTTP 200, một H1/route; 13 anchor và 13 URL báo giá trong HTML; đủ 13 ảnh được phục vụ, kích thước 1100×1100 và có alpha. Dữ liệu đo tại `demo-checks.json` cùng thư mục.
- `http://localhost:3010/san-pham` trả HTTP 200. Demo đang phục vụ từ build local bằng `next start`, không phải deploy production.

**Browser thực tế, IAB trên Windows:**

- Kiểm tra 320×844, 390×844, 768×1024, 1440×900, 1920×1080: không thấy tràn ngang; Hero/CTA/caption đọc được; một H1 và 13 nhóm. Bốn viewport chuẩn đã kiểm tra lại trên build cuối; 320px kiểm tra ở bản dev có cùng CSS.
- Sáu bộ lọc cho đúng số nhóm: 2 / 2 / 3 / 2 / 2 / 2; “Tất cả” cho 13. Click nhóm Máy quét khi đang lọc Hộp/Thẻ khôi phục đủ nhóm và đến đúng anchor. Kiểm tra lại trường hợp đổi filter → link nhóm khác trên build cuối.
- Click đủ 13 chỉ mục cho đúng hash và nhóm hiển thị. Đã cuộn/đưa từng dòng vào viewport để ảnh lazy-load tải đủ trước ảnh tổng hợp desktop.
- Mở/đóng thông số bằng Enter; nhóm Máy quét giữ bốn dòng thông số/ứng dụng và ba trường chuẩn bị báo giá. Kiểm tra lại disclosure Tem màu cuộn trên build cuối.
- Menu mobile mở/đóng; Escape đóng và trả focus về summary. Mobile không tràn CTA.
- Báo giá Máy quét prefill `may-quet-ma-vach`; trên build cuối báo giá Hộp prefill `hop`. Back về catalog đủ 13 nhóm, Forward giữ prefill `hop`. Không submit form.
- Direct link/refresh tới nhóm Satin giữ hash và nhóm hiển thị; sau cuộn ổn định đầu nhóm cách đỉnh khoảng 96px, không bị Header che.
- Tab mới trên build cuối không ghi lỗi/cảnh báo console; log `final-console.json` là mảng rỗng. Trong lúc đổi server, tab cũ có lỗi prefetch tạm thời; không dùng tab cũ để kết luận console bản bàn giao. Cảnh báo LCP ảnh phụ ở dev được xử lý bằng priority cho ba hình Hero.
- Homepage kiểm tra lại có H1 “Tem nhãn. Tạo dấu ấn.”, poster desktop và không có canvas.

## 4. Bằng chứng và giới hạn

- [Trước chỉnh sửa, desktop](./mockups/catalog-round1/before-desktop.jpg).
- [Hero desktop 1440×900](./mockups/catalog-round1/hero-1440x900.jpg), [mobile 390×844](./mockups/catalog-round1/hero-390x844.jpg), [tablet 768×1024](./mockups/catalog-round1/hero-768x1024.jpg), [desktop 1920×1080](./mockups/catalog-round1/hero-1920x1080.jpg).
- [Catalog desktop](./mockups/catalog-round1/catalog-desktop-preview.jpg), [toàn catalog desktop](./mockups/catalog-round1/catalog-desktop-full.jpg), [catalog mobile](./mockups/catalog-round1/printed-roll-mobile-390x844.jpg).
- [Bộ lọc](./mockups/catalog-round1/filter-checks.json), [13 anchor](./mockups/catalog-round1/anchor-checks.json), [responsive cuối](./mockups/catalog-round1/final-responsive-checks.json), [báo giá](./mockups/catalog-round1/quote-checks.json).

Ảnh chụp là browser thật, không phải mockup AI. Kích thước file screenshot do trình duyệt loại scrollbar/vùng bao quanh có thể nhỏ hơn viewport được đặt; ảnh toàn catalog desktop chụp ở bề rộng thực khoảng 1264px, không gọi là baseline 1440px. Một số ảnh tương tác/mobile tổng hợp thu trong dev; các baseline Hero chuẩn và preview catalog cuối lấy từ build local sau cùng.

Đã kiểm tra alpha bằng metadata/pixel và nhìn vật thể trên nền ivory/beige tại kích thước thiết kế. Một số output AI còn speckle nhỏ ở mép khi xem độ phân giải gốc; chưa phải ảnh retouch production. Registry/README giữ rõ giới hạn này. Tổng 13 cutout **1,281,330 bytes (~1.22 MiB)**, lazy-load; hai ảnh nhãn dệt/băng dính hơi vượt mục tiêu khoảng 150 KB/file để giữ chi tiết, số đo ghi trong sổ ảnh.

No-JS được kiểm tra ở HTML server và cấu trúc native disclosure/link; chưa có kiểm thử browser tắt JS. Reduced-motion được bảo toàn qua CSS chung, lượt này không tạo animation mới; chưa mô phỏng tùy chọn hệ điều hành. Chưa chạy Lighthouse, 200% zoom, screen reader, mạng chậm/Save-Data hoặc thiết bị mobile thật; thuộc lượt QA tiếp theo. Không khẳng định các tình huống này đã đạt từ screenshot responsive. No-WebGL không ảnh hưởng phần mới vì không dùng canvas.

## 5. Còn mở và khôi phục

Chờ review giao diện lượt 1. Lượt 2 mới triển khai năm Hero còn lại; lượt 3 mới polish/QA; lượt 4 mới làm vòng xoay rồi Hero 3D. Tư liệu BROTHERS đã có quyền công bố từ chủ dự án; không cần xin lại. Ảnh sản phẩm thực tế/đúng model và thông tin công ty còn cần bổ sung trước production; không chặn demo minh họa hiện tại. Không DB/CMS/ERP/email delivery/deploy trong lượt này.

Snapshot trước sửa tại `references/work-snapshots/catalog-round1-20261017/`, giữ cấu trúc đường dẫn của các file cũ. Khôi phục từng file đã sửa từ snapshot; kiểm tra import trước khi bỏ ba module source mới và mười WebP. Giữ bản gốc/prompt/báo cáo ngoài public. Thư mục chưa có Git repository; không có commit rollback được viện dẫn.
