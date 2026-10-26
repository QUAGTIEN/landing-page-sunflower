# Vòng xoay Sản phẩm — scope / storyboard · 2026-10-19

Chủ dự án đã yêu cầu triển khai E1 của lượt 4 trước. Chỉ hero `/san-pham`; homepage tiếp tục poster, E2 chưa triển khai. Không backend/deploy/dependency mới.

## Hiện trạng và mục tiêu

`ProductsHeroStage.tsx` hiện là cụm tĩnh ba cutout. Thay bằng sáu đại diện của sáu họ canonical, giữ H1/CTA, catalog 13 nhóm, filter/specs/quote và menu đã hoàn thiện. Giữ giấy/cuộn trắng là điểm đầu. Hình là minh họa AI đã duyệt cho demo, không phải model hay bằng chứng hàng thực tế.

## Motion gate / lựa chọn kỹ thuật

1. **Lợi ích:** thấy bề rộng nhóm sản phẩm, chọn họ và đi xuống nhóm thật trong catalog. Một đối tượng trước rõ, nhóm sau nhỏ/nhạt hơn; nhãn luôn nằm ngoài chuyển động.
2. **CSS + GSAP hiện có:** quỹ đạo ellipse bằng transform/scale/opacity; các ảnh luôn hướng về người xem, không bịa mặt sau. Không WebGL, không panel cong hoặc sao chép Dream Space. JS chỉ nâng cấp HTML dựng sẵn. GSAP import động khi cần; không render lại React theo từng frame.
3. **Asset:** tái sử dụng `catalogObjects.ts`: tem-trang-cuon, tem-trang-to, muc-in-ribbon, may-in-ma-vach, hop, tem-vai-nylon-satin. Nguồn/quyền ở registry và `references/product-cutouts/`; cả sáu là `illustrative_dev_only`. Tổng file gốc 518,604 bytes, không thêm ảnh/model. Chỉ cuộn đầu tiên tải priority; năm ảnh còn lại lazy.
4. **Fallback:** HTML/CSS có sẵn sáu ảnh và CTA, noscript có sáu link; trước hydrate không có nút giả hoạt động. Dưới 768px: một sản phẩm, chọn thủ công, không tự quay. Reduced-motion: đổi ngay, không tween/autoplay. Save-Data/mạng 2g: không tự quay. Không cần canvas/WebGL. Thiếu GSAP: chọn ngay vẫn hoạt động. Hình lỗi không chặn nhãn/link.
5. **Chi phí:** sáu layer ảnh, transform/opacity; không blur động, ánh sáng hoặc shader. Tween chỉ khi chuyển nhóm, đứng yên giữa các lượt; không ticker chạy nền. Tạm dừng khi hover/focus, ngoài viewport, tab ẩn hoặc bấm tạm dừng. Không hứa FPS/Lighthouse khi chưa đo.
6. **Scroll:** không pin, wheel/touch handler, scroll lock hoặc forced snap. Chỉ nút trước/sau, chọn nhóm, pause/play và link catalog. Arrow/Home/End giới hạn trong các nút chọn.

## Storyboard

| Mốc | Hiển thị / thao tác |
|---|---|
| S0 · SSR / load | H1 + CTA, cuộn tem ở trước; năm cutout nhỏ hơn trên ellipse. Không thay poster bằng canvas, không entrance zoom. |
| S1 · sau khoảng 6 giây | Desktop được phép motion: chuyển chậm một vị trí trong 1.8 giây, sau đó nghỉ. Tổng một vòng khoảng 47 giây. |
| S2 · chọn / trước–sau | Đưa họ được chọn ra trước theo cung ngắn nhất, đồng bộ tên và link. Tự quay dừng sau thao tác chủ động. |
| S3 · pause / hover / focus | Dừng tại pose hiện tại; tiếp tục không nhảy vị trí. Các link và scroll giữ hoạt động. |
| S4 · ra khỏi hero / tab ẩn | Dừng delay/tween; trở lại tiếp tục từ pose giữ lại, không bù thời gian đã qua. |
| S5 · mobile / giảm motion | Một ảnh chính và sáu nút dễ chạm; không tự xoay. Reduced-motion đổi ảnh tức thì. |

## File / kiểm chứng / rollback

- Sửa `src/sections/products/ProductsHeroStage.tsx`; mới `src/content/productOrbit.ts`, `src/components/animations/ProductOrbit.tsx`, `src/app/products-orbit.css`; import CSS trong root layout.
- Không sửa canonical `products.ts`, query/form/API, logo, homepage hoặc catalog.
- Chạy lint/typecheck/build; kiểm tra desktop/mobile/tablet/wide và 320px, click/keyboard/select/pause/link/filter/menu/back; ghi giới hạn kiểm tra preference/no-JS/performance đúng thực tế.
- Snapshot trước sửa: `references/work-snapshots/products-orbit-20261019/` (src, docs, dependency manifests). Khôi phục các source đã sửa từ snapshot và xóa ba source mới/import để rollback; không cần đổi data/media/dependency.
- Bàn giao review riêng E1; không tự đánh dấu cả lượt 4 hoặc 3D homepage hoàn tất.
