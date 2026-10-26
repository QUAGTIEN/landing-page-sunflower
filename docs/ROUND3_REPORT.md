# Lượt 3 — Toàn landing page với Hero poster

Ngày: 2026-10-17. Trạng thái: **Hoàn tất code và kiểm tra lượt 3, có kết quả chờ chủ dự án duyệt**. Demo local: http://127.0.0.1:3010/. Chưa triển khai lượt 4 hoặc nghiệm thu thiết kế thay chủ dự án.

## Phát hiện

Homepage cũ dài khoảng 12.160px ở viewport 1440×900, 2.876 từ theo DOM main (các từ tiếng Việt đếm theo khoảng trắng). Sáu họ sản phẩm, bảng thông số, ứng dụng và hồ sơ mẫu lặp thông tin của các trang con. Reveal cũ render opacity 0 trước hydration, làm nội dung mất khi JS không chạy. Hero poster đã được duyệt; 3D hoãn đến cuối.

## Thay đổi

- Intro ngắn; showcase ba nhóm tem cuộn / hộp giấy / thẻ bài với ảnh alpha độc lập, bộ chọn có aria-pressed và CTA theo slug chuẩn. Thông số đầy đủ và 13 nhóm còn tại `/san-pham`.
- Nhịp nền ivory → beige → graphite quy trình → ivory ứng dụng → beige cấu hình → CTA/footer tối. Hình in ấn lớn có chú thích minh họa rõ, không đại diện cho xưởng Sunflower.
- Quy trình bốn bước dùng native details/summary (bàn phím và no-JS); ứng dụng và cấu hình là liên kết ngắn tới anchor trang con. Không đưa artwork khách hàng chưa được phép lên showcase mới.
- Footer gọn, giữ đủ 7 route và liên hệ; không hiển thị chuỗi TODO như dữ liệu thật. Dữ liệu chưa xác nhận vẫn giữ trong content, hiện thông báo đang cập nhật.
- Sửa liên kết họ sản phẩm cũ trỏ tới family-ID không tồn tại; dùng hàm `getProductFamilyHref` để mở category anchor thực tế. Không thay slug/schema hoặc sửa bộ lọc catalog.
- Reveal dùng Web Animations khi observer nhận diện vùng nhìn, không ẩn SSR. Parallax vật thể ±20px chỉ desktop chuột và không giảm motion, GSAP/ScrollTrigger sẵn có; không pin, không wheel/touch listener, không animation vòng lặp. CSS chuyển sản phẩm và hover có reduced-motion.
- Không sửa Hero poster, mã 3D, dependency, API/form delivery, database, ERP; không deploy. Không mở thêm lượt 4.

## File và nguồn

File sửa: `src/app/page.tsx`, `src/app/globals.css`, `src/sections/home/{CorporateIntro,FeaturedProducts,CapabilitiesProcess,SolutionsAndApplications,SelectedWork,InquiryCTA}.tsx`, `src/components/layout/SiteFooter.tsx`, `src/components/animations/RevealOnScroll.tsx`, `src/content/assets.ts`, `docs/IMPLEMENTATION_PLAN.md`.

File mới: `src/components/animations/ProductMotion.tsx`, `src/components/ui/ProductObject.tsx`, `src/content/home.ts`; ba WebP trong `public/images/products/cutouts/`. Nguồn PNG và prompt: `references/product-cutouts/round3/README.md`. Built-in Imagegen tạo ảnh alpha; Sharp chỉ resize/encode WebP, không tự tách nền. Hai lần thử tách nền ảnh tem cũ còn cặn alpha nên bỏ; ảnh tem cuối là minh họa một cuộn mới tạo. Tất cả output AI là `illustrative_dev_only`, `productEvidence: false`, chờ duyệt ảnh và quyền sử dụng production.

## Kiểm chứng

### Kỹ thuật và luồng

- ESLint 0 lỗi/cảnh báo trên các file TS/TSX sửa/mới, dùng `node node_modules/eslint/bin/eslint.js --no-eslintrc --config references/work-snapshots/round1-20261017/eslint-round1.json … --max-warnings 0`. `npm run typecheck` đạt. `npm run build` đạt; log cuối tại `references/work-snapshots/round3-20261017/build-final.log`.
- Build báo homepage 4,85 KB, First Load JS 122 KB (không phải tổng tải sau lazy GSAP, ảnh và tương tác). Không thêm dependency; không tải R3F hoặc khởi tạo canvas trên homepage.
- `node references/work-snapshots/round3-20261017/verify-navigation.mjs`: 7 route HTTP 200; đủ 13 category anchor; 13 anchor khác nhau được homepage liên kết đều tồn tại. Lần đầu bắt được family-ID sai và đã sửa. Kết quả: [navigation/assets JSON](./mockups/round3-navigation-assets.json).
- SSR có đúng một H1 và không có inline opacity 0 che nội dung. Đây là kiểm tra HTML, **không phải** mô phỏng browser tắt JS hoàn chỉnh.
- Browser: chọn ba sản phẩm bằng chuột/Enter; đúng một nút aria-pressed, đổi đúng ảnh/copy/CTA. Stage desktop giữ chiều cao 635px khi đổi nhóm. “Hộp giấy” → `/lien-he?san-pham=hop` chọn sẵn `hop` trong form; không submit dữ liệu. Back về homepage hoạt động.
- Summary quy trình mở bằng Enter, nhóm details chỉ giữ một bước mở; menu mobile Enter mở và Escape đóng. Console browser cuối không có error.
- GSAP thực sự ghi transform nhỏ lên object khi cuộn trên desktop (ví dụ translateY 9,5472px trong phạm vi ±20px); mobile dùng bố cục riêng, vật thể trước mô tả. Không đo FPS hoặc cam kết hiệu năng GPU từ kiểm tra này.

### Responsive và hình ảnh

| Viewport | Chiều cao trang | Tràn ngang / canvas |
|---|---:|---|
| 390×844 | 7.022px | Không / 0 |
| 768×1024 | 5.969px | Không / 0 |
| 1440×900 | 6.006px | Không / 0 |
| 1920×1080 | 6.334px | Không / 0 |
| 320×844 | 7.430px | Không / 0; kiểm tra thêm bounds con không vượt viewport |

Browser tại desktop: DOM main giảm từ 2.876 còn 429 từ đếm theo khoảng trắng (~85%); chiều cao trang giảm từ 12.160 còn 6.006px (~51%). Đây là so sánh cùng viewport với sản phẩm mặc định, không phải phép đếm ngôn ngữ học. [Metrics](./mockups/round3-browser-metrics.json), [trước](./mockups/round3-before.json).

Ba WebP alpha: cuộn tem 84.322 B; hộp 62.868 B; thẻ bài 129.202 B, tổng **276.392 B (~270 KiB)**. Alpha có vùng 0–255, không phải nền chữ nhật giả trong suốt. Đã xem vật thể trên ivory và graphite bằng trang QA nội bộ; [ảnh alpha](./mockups/round3-alpha-ivory-graphite.jpg). Server QA tạm cổng 3011 đã dừng; không thêm route công khai.

Chữ phụ trên studio beige được đổi sang token `--studio-ink`; tương phản tính theo WCAG từ 4,26:1 lên **5,27:1**. Kicker bronze trên beige 4,64:1; muted trên surface 4,90:1; muted footer trên graphite 6,48:1. Chưa phải audit accessibility toàn website.

Bằng chứng thực tế: [toàn trang desktop](./mockups/round3-full-desktop-1440x900.jpg), [toàn trang mobile](./mockups/round3-full-mobile-390x844.jpg), [tablet](./mockups/round3-full-tablet-768x1024.jpg), [desktop 1920](./mockups/round3-full-desktop-1920x1080.jpg); [showcase desktop](./mockups/round3-showcase-desktop-1440x900.jpg), [showcase mobile](./mockups/round3-showcase-mobile-390x844.jpg), [hộp](./mockups/round3-showcase-box-desktop.jpg), [thẻ bài](./mockups/round3-showcase-tags-desktop.jpg), [quy trình](./mockups/round3-process-desktop-1440x900.jpg). [Trước sửa desktop](./mockups/round3-before-desktop.jpg) có giới hạn reveal cũ ẩn nội dung chưa cuộn tới. Motion có thể review trực tiếp tại local; công cụ browser hiện không cung cấp quay video, không tạo video giả từ ảnh tĩnh.

### Giới hạn chưa kiểm tra trực tiếp

Reduced-motion được xử lý bằng media query + JS preference listener và GSAP matchMedia, nhưng chưa đổi preference trong browser để xác minh chủ động. Chưa mô phỏng đầy đủ no-JS, mạng chậm/Save-Data; chưa kiểm tra zoom 200%, Lighthouse hoặc điện thoại/GPU/touch thật. Các mục này còn ở lượt 4. Không tuyên bố pixel-perfect hoặc đo FPS/CLS từ ảnh screenshot.

## Còn mở và khôi phục

Chờ chủ dự án duyệt toàn landing page và các ảnh demo. Ảnh thật, thông tin doanh nghiệp chính thức, quyền công bố và các kiểm tra QA tổng thể ở lượt 4 còn mở. 3D làm sau khi hoàn thiện các phần còn lại. Backend và deploy chỉ thực hiện khi có yêu cầu riêng.

Không có Git: khôi phục file cũ theo `references/work-snapshots/round3-20261017/MANIFEST.txt`; các file mới ghi trong báo cáo phải được gỡ import trước khi xóa. Giữ bản poster đã duyệt, không khôi phục nhầm prototype 3D vào trang chủ.
