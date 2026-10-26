# Lượt 3 mới — Hoàn thiện giao diện và QA

2026-10-17. **Đã hoàn tất code và các kiểm tra dưới đây; chờ chủ dự án review giao diện.** Lượt 4 (orbit/3D) chưa bắt đầu. Chỉ demo local tại http://localhost:3010/.

## 1. Phát hiện

Năm Hero đã có nhưng nội dung bên dưới còn nhiều tiêu đề dài, chữ lặp và card lồng nhau. About/Capabilities có `aria-labelledby` thiếu ID heading. Một số ảnh minh họa Giải pháp/Dự án cũ chứa thương hiệu ngoài và nền ảnh không đồng nhất. Các TODO nội bộ lộ trong hồ sơ công ty/catalog/liên hệ. Footer có link bảo mật chưa có target. Form đánh dấu cả email và phone là bắt buộc dù chỉ cần một; lỗi chưa liên kết bằng ID/focus. Lệnh `next lint` không phù hợp Next 15 đang cài.

## 2. Triển khai

- `src/components/ui/EditorialDetails.tsx` mới: disclosure native, SSR, mở bằng Enter/Space, không cần thư viện hoặc JS tùy biến.
- `src/components/ui/Primitives.tsx`: SectionHeading nhận ID, sửa tên region About/Capabilities. Các CTA/thông số giữ nguyên.
- `src/app/globals.css`: cùng chiều rộng/gutter cho các cột, heading nhẹ và dễ đọc hơn, nền xen kẽ ivory/beige cho các dòng Giải pháp/Dự án, bỏ thêm khung không cần thiết trong markup. Chữ bronze nhỏ dùng `--accent-ink` (#76563C); màu accent bề mặt cũ giữ nguyên. Focus sáng trên vùng tối, focus field rõ, font input 16px, touch target/footer tốt hơn trên mobile.
- `src/components/animations/RevealOnScroll.tsx`: biên độ mặc định 14px, 420ms; không reveal lại nội dung đã có trong viewport khi hydrate hoặc đích anchor; opacity khởi đầu .7 thay vì biến mất hoàn toàn. Tôn trọng reduced-motion, focus hủy animation, không pin/khóa cuộn.
- About: tiêu đề/copy gọn; các nguyên tắc và sáu nhóm trình bày bằng thin rule; link từng họ đi đúng nhóm catalog. Chỉ render dữ kiện đã xác nhận, giữ dữ liệu chờ trong source.
- Capabilities: tiêu đề gọn, hạng mục triển khai mở rộng native; QC bỏ card bao kín; trạng thái PDF trung thực, không link tải giả.
- Solutions: gọn phần vật liệu/thông tin báo giá trong details, bỏ đỏ/xanh trang trí khỏi tiêu đề vấn đề/phương án; đổi bốn ảnh minh họa thành cutout đại diện từ nhóm liên quan đã duyệt ở lượt 1.
- Projects: ba hồ sơ giữ nội dung/slug/link; bài toán hiện sẵn, quy cách/mục tiêu trong details. Ba ảnh minh họa thay bằng cutout cùng nhóm sản phẩm. Bộ lọc có aria-pressed/status; disabled trước hydrate và hướng dẫn noscript. BROTHERS Hero không đổi.
- Contact: trạng thái demo ngay đầu form; thông tin chưa xác nhận hiển thị bằng lời dễ hiểu, FAQ thu gọn. Autocomplete, lỗi liên kết `aria-describedby`, focus trường sai đầu tiên, mục đích có aria-pressed. Email/phone ghi đúng chỉ cần một. Tiêu đề kết quả phân biệt “Chưa gửi yêu cầu” với delivery thật. Thêm target `#chinh-sach-bao-mat` cho link footer và lưu ý thông tin cần điền; không tạo chính sách lưu trữ chưa được duyệt.
- Home selector: disabled trước hydrate, hướng dẫn noscript và thông báo sản phẩm đang chọn. `src/app/layout.tsx`: main có tabIndex -1 để skip link nhận focus.
- Catalog: ba quy cách chưa xác nhận dùng trạng thái dễ hiểu, không lộ TODO; dữ liệu gốc không sửa.
- `.eslintrc.json` mới + `package.json`: `npm run lint` dùng ESLint trực tiếp trên src. Không đổi dependency hoặc lockfile.

**Ảnh/quyền:** không tạo ảnh hoặc thêm download mới. Giải pháp/Dự án dùng `getCatalogObject()` và `ProductCutout` với metadata/nguồn đã có tại `src/content/catalogObjects.ts`; caption “Minh họa kiểu dáng · Demo”. Không biến cutout thành bằng chứng dự án/thông số vật liệu. Các ảnh cũ giữ trong nguồn, không xóa originals. BROTHERS giữ xác nhận quyền công bố; không dùng ảnh tòa nhà.

Không sửa nội dung canonical `products.ts`, `solutions.ts`, `projects.ts`, `company.ts`, `pageHeroes.ts`; không sửa API báo giá hoặc hai Hero chính Home/Products. Hash file đối chiếu snapshot đạt. Không DB/CMS/ERP, không webhook/Email mới, không analytics/deploy, không orbit/WebGL.

## 3. Kiểm chứng

- `npm run lint`: đạt toàn bộ src, không lỗi/cảnh báo.
- `npm run typecheck`: đạt.
- `npm run build`: đạt. Build log ở `references/work-snapshots/polish-round3-20261017/build-final.log`. First Load JS: Home 122 kB, Products 124, About/Solutions/Capabilities 112, Projects 119, Contact 128. Đây là số build, không phải Lighthouse hoặc số đo mạng thực tế.
- `node references/work-snapshots/polish-round3-20261017/verify-polish.cjs`: 7 route HTTP 200, 7 title riêng, mỗi trang 1 H1, không canvas/TODO trong HTML UI; 119 internal anchor links có target SSR hoặc target client Contact đã kiểm browser; 13 anchor/query catalog; 8 file contract quan trọng không đổi. API body `{}` trả 400 với đúng ba lỗi bắt buộc, bị từ chối trước logic delivery. Không gửi phiếu hợp lệ hoặc chuyển dữ liệu ra ngoài.
- Browser IAB/Windows, bản build cuối: **7 route × 390×844 / 768×1024 / 1440×900 / 1920×1080 = 28 baseline**, Hero ảnh đã load, không tràn document hoặc vùng chữ/input/button được rà. Thêm **7 route ở 320×844**, không phát hiện cắt/tràn nội dung được rà. Lưu `responsive-checks.json`, `edge-320-checks.json`.
- Kiểm tra cấu trúc cả 7 route: một H1, không ID trùng, không aria-labelledby thiếu đích, không img thiếu alt, không TODO UI/canvas. `structure-checks.json`.
- Catalog: lọc Thiết bị chỉ hiện hai nhóm; bấm chỉ mục Hộp đang ẩn khôi phục Tất cả 13 nhóm; Enter mở thông số. Quote Hộp → `/lien-he?san-pham=hop#quote-request`, select vẫn hop, focus quote-request, form trước trên mobile.
- Form trống: lỗi họ tên, cách liên hệ, nội dung; focus contactName; bốn input invalid có ID mô tả hợp lệ. Không POST khi client invalid. Enter/Escape mở/đóng menu, trả focus summary. Link footer bảo mật đến target có thật.
- Projects filter chọn Nhãn may mặc còn một hồ sơ, aria-pressed/status đúng; Enter mở chi tiết. Capabilities/Solutions native details mở bằng Enter. Home selector chọn Hộp cập nhật chữ/aria-pressed. Skip link đưa focus main-content.
- Anchor Giải pháp sau cuộn có top khoảng 96px, Header 72px, không che tiêu đề. Nhãn text-accent thực tế đọc được màu rgb(118,86,60), accent bề mặt vẫn #9B8974. Đây là kiểm tra token cụ thể, không phải audit contrast toàn site.
- Console warning/error ở tab build cuối sau điều hướng/thao tác: mảng rỗng, `final-console.json`.

Kiểm tra UI dùng browser thật qua công cụ trình duyệt; ảnh JPEG có thể nhỏ hơn viewport đặt do scrollbar/khung chụp. Không gọi đây là kiểm tra trên điện thoại thật hoặc pixel-perfect.

## 4. Ảnh review và giới hạn

- [Giải pháp desktop — vật thể tách nền](./mockups/polish-round3/solutions-detail-desktop.jpg).
- [Liên hệ mobile](./mockups/polish-round3/lien-he-mobile.jpg), [form mobile](./mockups/polish-round3/contact-form-mobile.jpg).
- [Sản phẩm mobile](./mockups/polish-round3/san-pham-mobile.jpg).
- [Giới thiệu — nguyên tắc](./mockups/polish-round3/about-values-desktop.jpg).
- Baseline 7 trang × 4 kích thước, ảnh before About, lỗi form và details mở nằm trong `docs/mockups/polish-round3/`.

**Chưa kiểm chứng:** Lighthouse/Core Web Vitals, screen reader, 200% browser zoom, thiết bị thật, tắt JS/reduced-motion/Save-Data bằng browser emulation. Capability hiện có chỉ cho đổi viewport, không các chế độ này; SSR/native details/noscript và guards giảm motion được kiểm source riêng, không thay cho test browser các chế độ đó. Hero hiện không mount WebGL nên không có canvas để mô phỏng lỗi; kiểm fallback WebGL thực tế dành lượt 4.

## 5. Còn mở và khôi phục

Chờ chủ dự án review lượt 3. Lượt 4 mới vòng xoay 6 họ sản phẩm rồi Hero 3D; poster giữ tới khi chất lượng được duyệt. Thông tin liên hệ/quy mô/chứng chỉ và chi tiết bản quyền ảnh stock cho production vẫn chờ tư liệu chính thức; không tự xác nhận hoặc triển khai backend.

Snapshot đầy đủ src, các docs kế hoạch và package trước sửa tại `references/work-snapshots/polish-round3-20261017/`. Khôi phục các file tương ứng, bỏ file mới `EditorialDetails.tsx` và `.eslintrc.json` nếu rollback toàn lượt; kiểm import rồi build lại. `apply-polish.cjs` là helper sửa một lần có guard, **không chạy lại trên source hiện tại**; `verify-polish.cjs` chỉ đọc source/HTTP và gửi body rỗng bị reject tới API local. Không viện dẫn Git commit vì checkout chưa có Git.
