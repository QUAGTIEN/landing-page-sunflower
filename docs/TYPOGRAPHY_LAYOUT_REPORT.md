# Chỉnh typography và layout theo góp ý Word

2026-10-17. **Đã hoàn tất code/checks, chờ review giao diện.** Đây là bổ sung typography/layout sau lượt 3, không phải lượt 4 motion. Demo local: http://localhost:3010/gioi-thieu.

## 1. Phát hiện và phạm vi được duyệt

Chủ dự án đánh giá trang Sản phẩm tốt nhất, yêu cầu chữ dễ đọc và thống nhất hơn, các vùng nhiều chữ phân tầng rõ; Giới thiệu cần khối có chiều sâu. Sáu ảnh trong Word chỉ rõ bảng chất liệu, Ứng dụng Home, ba nguyên tắc, hồ sơ doanh nghiệp, sáu họ và Năng lực. Chủ dự án xác nhận triển khai đề xuất; khối tròn/3D làm cuối.

Source trước sửa dùng nhiều monospace 10–12px cho đoạn đọc/nhãn/bảng. About chủ yếu đường kẻ trên cùng nền, ảnh và hồ sơ chưa cân chiều cao. Năng lực giấu cả ba ý vào disclosure nên cột phải gần như trống. Bảng kỹ thuật cần kéo ngang trên mobile. Kế hoạch trước code: `TYPOGRAPHY_LAYOUT_SCOPE.md`.

## 2. Triển khai

- **`src/app/typography-layout.css` mới**, import sau globals ở `src/app/layout.tsx`: thống nhất font sans Inter đã có, giữ monospace cho code/pre. Các lớp chữ phụ phổ biến 14px, text-sm/nội dung chính 16px, dẫn About 18px desktop. Chỉnh line-height, heading và khoảng đệm; CSS riêng cho các khối mới, dùng token màu hiện tại và bóng giấy nhẹ. Không tải font/thư viện mới.
- **`src/sections/about/AboutContentSections.tsx`**: phần dẫn thành hàng riêng; ảnh lớn/hồ sơ beige cân chiều cao trên desktop; hồ sơ phân rõ nhãn/giá trị, không thêm facts. Ba nguyên tắc có số lớn, nền ivory/beige, viền/bóng mềm; tiêu đề ngắn. Sáu họ có cutout, tên/mô tả/link và chú thích demo, responsive 3→2→1 cột. Bảy route và các ID Hero/section chính giữ nguyên.
- **`src/sections/home/SolutionsAndApplications.tsx`**: modifier layout cho bốn hàng ứng dụng có vùng nền, khoảng đệm và focus/hover rõ, chữ mô tả 16px; link bốn giải pháp không đổi.
- **`src/sections/capabilities/CapabilitiesDetailSections.tsx`**: bốn khối nền xen kẽ, tiêu đề/tóm tắt một phía, hiện sẵn hai hạng mục ở phía còn lại. Hạng mục thứ ba ở native details “Xem thêm hạng mục”. Đủ 12 ý cũ, không thêm claim/thông số.
- **`src/sections/products/MaterialReference.tsx` mới**: chuyển nguyên dataset năm vật liệu từ component catalog sang Server Component. Desktop bảng có row header, chữ nội dung 15px, cột ngắn và đệm thoáng, hàng nền xen kẽ. Dưới 1024px dùng năm khối đọc, mỗi khối có tên + đủ ba trường, chữ nội dung 16px. CSS chỉ hiện một cách trình bày ở mỗi breakpoint; không phụ thuộc JS.
- **`src/sections/products/ProductsCatalogueView.tsx`**, **`src/app/san-pham/page.tsx`**: tách bảng ra sau catalog; giữ filter/anchors/13 cutout/query và metadata. Không đổi canonical data.

Tám file source sửa/mới. Không sửa nội dung doanh nghiệp/canonical sản phẩm/giải pháp/dự án/năng lực, Hero Home/Products, form/API, brand symbol, dependency hay nơi nhận dữ liệu. Không orbit/WebGL/scroll lock, DB/CMS/ERP hoặc deploy. Hover là thay nền/màu; giữ guards reduced-motion và reveal sẵn có.

**Media:** chỉ dùng lại ảnh màu chế bản có caption minh họa và sáu cutout đã có tại `src/content/catalogObjects.ts`: cuộn trắng, tờ trắng, ribbon, máy in, hộp, nhãn dệt. Next Image mặc định lazy cho ảnh dưới Hero; không preload sáu vật thể. Alt lấy registry, chú thích nêu rõ minh họa demo, không đại diện model phân phối/sản phẩm thật. Không thêm ảnh public, không dùng tòa nhà hoặc sửa BROTHERS.

## 3. Kiểm chứng

- `npm run lint`: đạt toàn src, không cảnh báo/lỗi.
- `npm run typecheck`: đạt.
- `npm run build`: đạt; log `references/work-snapshots/typography-layout-20261017/build-final.log`.
- Build First Load JS: Home 122 kB, Products **123 kB** (trước 124), About/Solutions/Capabilities 112, Projects 119, Contact 128. Products route code 2.02 kB (trước 3.44). Đây là số build, không phải Lighthouse hoặc tốc độ tải đo trên mạng thật.
- `node references/work-snapshots/typography-layout-20261017/verify-revision.cjs`: bảy route 200/title riêng/một H1, không canvas/TODO trong HTML UI; 119 anchor nội bộ hợp lệ (target privacy Contact kiểm trong browser sau hydration); 13 category ID/query. Dataset bảng **so sánh nguyên văn với snapshot, hoàn toàn giống**, năm card mobile và ba nguyên tắc/sáu họ có đủ. Hash mười file contract/data/API/Hero/form không đổi. `contract-checks.json` cùng thư mục.
- Browser IAB/Windows, **bản build cuối**: 7 trang × 390×844, 768×1024, 1440×900, 1920×1080 = **28 responsive baseline**; không tràn document/cắt chữ trong các vùng được rà, không trùng ID/thiếu aria-labelledby, Hero ảnh tải xong, một H1/route, không canvas. `responsive-checks.json`.
- Kiểm thêm 7 trang ở **320×844**, không thấy tràn/cắt vùng chữ/controls được rà. `edge-320-checks.json`.
- Desktop: ba mô tả nguyên tắc 16px, bảng 15px; font bảng thực tế `Inter, Inter Fallback, system-ui, ... sans-serif`, không monospace. Hồ sơ và ảnh About cùng cao khoảng 618px ở 1440px. Sáu ảnh họ tải đủ, sáu link đi đúng category.
- Mobile: bảng desktop display none, năm khối có đủ ba giá trị/mỗi khối, mô tả 16px; nguyên tắc một cột, các khối không tràn. Bảng desktop có năm `th scope=row`. Không thay text kỹ thuật giữa desktop/mobile.
- Năng lực: tám ý hiện sẵn + bốn ý trong details; Enter mở/đóng native details thành công. Home ứng dụng bốn đoạn mô tả 16px.
- Hành trình: About “Bao bì & phụ kiện” → `/san-pham#hop`; chọn filter Thiết bị rồi click chỉ mục Hộp khôi phục nhóm ẩn; báo giá → `/lien-he?san-pham=hop#quote-request`, select vẫn hop, focus quote-request. Menu mobile Enter mở/Escape đóng và trả focus. Không submit form hoặc gửi dữ liệu ra ngoài.
- Console warning/error tab build cuối: mảng rỗng. `interaction-checks.json`, `final-console.json`.

Dev cold compile Giới thiệu mất khoảng 20 giây và tool networkidle timeout một lần; server sau đó trả 200 và kiểm tra tiếp bình thường. Ảnh bàn giao chụp lại từ build cuối, không dùng lỗi tải dev làm baseline.

## 4. Ảnh review

- [Ba khối nguyên tắc desktop](./mockups/typography-layout/about-values-desktop.jpg), [mobile](./mockups/typography-layout/about-values-mobile.jpg).
- [Hồ sơ và ảnh desktop](./mockups/typography-layout/about-story-desktop.jpg).
- [Sáu họ desktop](./mockups/typography-layout/about-families-desktop.jpg), [mobile](./mockups/typography-layout/about-families-mobile.jpg).
- [Toàn trang Giới thiệu desktop](./mockups/typography-layout/about-full-desktop.jpg).
- [Ứng dụng Home desktop](./mockups/typography-layout/home-applications-desktop.jpg).
- [Năng lực desktop](./mockups/typography-layout/capabilities-desktop.jpg), [mobile](./mockups/typography-layout/capabilities-mobile.jpg).
- [Bảng chất liệu desktop](./mockups/typography-layout/materials-desktop.jpg), [mobile](./mockups/typography-layout/materials-mobile.jpg).

Ảnh `before-about-values.jpg` lưu trước sửa; ảnh `*-dev.jpg` là quan sát trong dev. Baseline Hero 7 trang × 4 viewport nằm cùng thư mục. Screenshot JPEG có thể khác kích thước preset vì scrollbar/khung chụp. Một số ảnh chụp tại anchor H2 đặt heading dưới Header nên eyebrow phía trên có thể nằm ngoài viewport; không coi đó là ảnh full section.

## 5. Giới hạn và khôi phục

Chưa chạy Lighthouse, browser zoom 200%, screen reader, thiết bị thật hoặc browser emulation no-JS/reduced-motion/Save-Data. Source/native HTML/guards được kiểm riêng, không thay cho kiểm các chế độ browser đó. Không đo FPS/GPU vì không bật canvas. Chưa owner nghiệm thu chỉ vì build/checks đạt.

Thông tin liên hệ/quy mô/chứng chỉ chính thức và quyền ảnh stock production vẫn chờ xác nhận, tiếp tục demo. Lượt 4 motion chỉ làm sau khi UI được review; poster giữ nguyên tới khi chất lượng scene được duyệt.

Snapshot trước sửa: `references/work-snapshots/typography-layout-20261017/` chứa src và docs kế hoạch. Phục hồi các file tương ứng; bỏ hai file mới `src/app/typography-layout.css`, `src/sections/products/MaterialReference.tsx` cùng import nếu rollback toàn lượt, rồi build lại. Helpers revise-* là sửa một lần, không chạy lại trên source hiện tại; verify-revision chỉ đọc source/HTTP local. Không có Git commit trong workspace.
