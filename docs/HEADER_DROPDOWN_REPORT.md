# Menu danh mục con trên Header

2026-10-17. **Hoàn tất code/checks, chờ review giao diện.** Demo local tại http://localhost:3010/gioi-thieu; bấm Sản phẩm/Giải pháp/Năng lực. Không triển khai motion lượt 4.

## 1. Phát hiện và phạm vi

Header cũ có sáu link trực tiếp; mobile chỉ có một tầng. Owner yêu cầu bấm để mở danh mục và duyệt phương án desktop thả xuống, mobile bung/thu, có xem toàn bộ. Dữ liệu/anchors đã đủ: 13 sản phẩm trong 6 họ, 4 ứng dụng, 4 năng lực. Scope trước code ở `HEADER_DROPDOWN_SCOPE.md`.

## 2. Thay đổi

- **`src/content/headerNavigation.ts` mới**: tạo registry ba submenu trên server, từ product/family/home solutions/capability canonical; chỉ label/href và grouping đi qua props Client Header. Không sao chép spec vào registry hoặc đổi taxonomy.
- **`src/components/layout/NavigationDropdown.tsx` mới**: native details/summary, name phân nhóm cùng cấp, summary aria-controls/aria-current, ID desktop/mobile riêng. Sản phẩm có 6 nhóm/13 link; hai bảng khác có 4 link; tất cả có link trang tổng. Dùng navigation/link bình thường, không role menu giả hoặc trap phím.
- **`src/components/layout/SiteHeader.tsx`**: điều phối mở/đóng, bấm lại trigger thu menu; Escape đóng submenu trước rồi mới đóng drawer mobile, trả focus về đúng summary. Click/pointer/focus ra ngoài đóng; chọn link cùng trang/hash, route change, Back/Forward/hashchange hoặc chuyển breakpoint dọn menu. Cleanup listeners khi unmount. Trang chủ/Giới thiệu/Dự án và CTA vẫn là link trực tiếp.
- **`src/app/header-navigation.css` mới**, import trong **`src/app/layout.tsx`**: bảng ivory, chữ charcoal, link có vùng bấm đủ lớn, nhóm ba cột trên desktop; mobile một cột nằm trong drawer cuộn được. Header dùng logo charcoal/nền sáng khi desktop panel mở, khôi phục theme khi đóng. Panel ngắn có scrollbar riêng, không khóa body hoặc bắt wheel. Chỉ chevron transition nhẹ, reduced-motion bỏ transition.
- **`src/app/globals.css`**: điều kiện theme tối/beige tính thêm trạng thái native desktop dropdown; không đổi palette/brand.
- **`src/sections/products/ProductsCatalogueView.tsx`**: sửa hồi quy thực tế khi URL đã có `#hop`, người dùng lọc ẩn Hộp rồi chọn Hộp từ Header. URL không đổi nên hashchange không chạy; thêm listener click capture cho link danh mục hợp lệ cùng trang, reset filter trước navigation, cuộn native lại nếu đúng hash cũ. Chỉ áp dụng click trái không modifier; cleanup khi unmount. Không đổi data/schema hoặc quote flow.

Bảy file source mới/sửa, không dependency/ảnh mới, không DB/CMS/ERP/backend/analytics/deploy. Giữ bảy route, 13 slug, font/layout đã duyệt và Hero poster. Khối tròn/orbit/3D vẫn để cuối.

## 3. Kiểm chứng

- `npm run lint`, `npm run typecheck`, `npm run build`: đạt trên source cuối. Log `references/work-snapshots/header-dropdown-20261017/build-final.log`.
- Build First Load JS được báo: Home122 kB, Products123, About/Solutions/Capabilities112, Projects119, Contact128. Products route2.22 kB sau bổ sung xử lý link (trước2.02). Đây là số build, không phải Lighthouse/mạng thật.
- `node references/work-snapshots/header-dropdown-20261017/verify-header.cjs`: 7 route HTTP200, mỗi route1 H1/0canvas; cả desktop/mobile có đúng 13/4/4 link và 6 họ Sản phẩm. **413 anchor nội bộ** trỏ đúng target SSR hoặc privacy Contact kiểm browser sau hydration. 13 category/quote link còn nguyên. Hash11 file dữ liệu/API/form/Hero/typography cũ không đổi. `contract-checks.json` cùng thư mục.
- Browser IAB/Windows, bản build cuối: mở Products ở **7 trang × 390×844/768×1024/1440×900/1920×1080 = 28 baseline**. Không tràn document/Header/nhãn link được rà; mỗi lần đúng một submenu mở, không duplicate ID hoặc aria-controls thiếu đích; 1H1/route. `responsive-checks.json`.
- Desktop: bấm lại trigger thu menu; chuyển Products→Solutions chỉ một bảng mở; Enter mở, Tab đi link xem toàn bộ; Tab ra khỏi link cuối đóng bảng và focus Giải pháp; Escape đóng, focus summary; bấm caption Hero ngoài panel đóng. `closing-checks.json`.
- Mobile: Escape lần1 đóng danh mục con, drawer vẫn mở/focus Sản phẩm; lần2 đóng drawer/focus Menu. Chọn Hộp đóng cả drawer/submenu và đến `san-pham#hop`; báo giá giữ `?san-pham=hop`, select hop. Giải pháp Thời trang và Năng lực Kiểm tra đi đúng target; link Xem toàn bộ đến trang tổng và đóng menu. `interaction-checks.json`.
- Lỗi cùng hash được tái hiện trước sửa (Hộp vẫn hidden/filter Thiết bị), rồi kiểm lại source cuối: `#hop` giữ nguyên, filter trở về Tất cả13 nhóm, Hộp hiện, menu đóng. Đây là lý do sửa thêm catalog ngoài Header; không lấy kiểm tra khác hash thay thế.
- **320×844**: không tràn ngang, drawer747px/scrollHeight1456px; bấm được mục cuối Tem vải nylon/satin, đến đúng nhóm và đóng menu. **1200×500**: Header không tràn; panel387px/scrollHeight470px, cuộn native được. Chuyển desktop→mobile→desktop đều đóng/reset drawer/submenu. `edge-checks.json`.
- Console warning/error sau thao tác cuối: mảng rỗng, `final-console.json`. Không submit form hoặc gửi dữ liệu ngoài.
- Back khi menu đang mở về catalog, Forward về Giới thiệu: submenu/drawer đều đóng; `history-checks.json`.

## 4. Ảnh review và giới hạn

- [Products desktop](./mockups/header-dropdown/products-desktop.jpg), [mobile](./mockups/header-dropdown/products-mobile.jpg).
- [Giải pháp desktop](./mockups/header-dropdown/solutions-desktop.jpg), [Năng lực desktop](./mockups/header-dropdown/capabilities-desktop.jpg).
- [320px](./mockups/header-dropdown/products-320.jpg), [desktop thấp](./mockups/header-dropdown/products-short-desktop.jpg).
- Baseline 7 trang × 4 viewport và JSON kiểm tra nằm cùng thư mục. Screenshot JPEG có thể khác preset do scrollbar/khung chụp; nội dung dọc ngoài panel cuộn không phải tràn document.

Chưa chạy screen reader, browser tắt JS/reduced-motion, 200% zoom, Lighthouse hoặc thiết bị thật. HTML SSR/native disclosure/name/links và CSS guards được kiểm riêng, không gọi đó là browser emulation các chế độ trên. Ngoài JS, native disclosure/link là nền tảng; tiện ích đóng bằng Escape/click ngoài cần JS. Không đo GPU vì không có canvas.

## 5. Tồn đọng và rollback

Chờ chủ dự án review. Motion nâng cao chưa bắt đầu; thông tin công ty/ảnh production/backend vẫn theo phạm vi cũ. Không yêu cầu lại quyền media vì menu không thêm media.

Snapshot đầy đủ source/docs trước sửa tại `references/work-snapshots/header-dropdown-20261017/`. Khôi phục các file tương ứng và bỏ ba file mới `headerNavigation.ts`, `NavigationDropdown.tsx`, `header-navigation.css` cùng import nếu rollback toàn hạng mục, rồi lint/typecheck/build. `verify-header.cjs` chỉ đọc source/HTTP local. Workspace chưa có Git, không viện dẫn commit.
