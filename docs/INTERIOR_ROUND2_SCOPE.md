# Lượt 2 mới — Phạm vi thực thi

2026-10-17. Chủ dự án yêu cầu bắt đầu lượt 2 theo bộ mockup đã chốt.

- Mục tiêu: áp dụng Hero Giới thiệu, Năng lực, Giải pháp, Dự án, Liên hệ; kiểm tra nối nội dung, contrast Header và mobile.
- Source mới: `src/content/pageHeroes.ts` (copy, media/provenance và theme), `src/components/ui/InteriorHero.tsx` (Server Component, split/backdrop/compact).
- Source sửa: năm `src/app/*/page.tsx`, `src/components/layout/SiteHeader.tsx`, `src/app/globals.css`. Thêm anchor vào chỉ mục Giải pháp/Dự án. Liên hệ thêm anchor form, ưu tiên form trong DOM/mobile, giữ bố cục desktop hai cột và toàn bộ logic/fields/query/Suspense.
- Media: tái sử dụng hai stock WebP và cutout thẻ bài hiện có; tối ưu kích thước/định dạng hai ảnh owner cung cấp sang `public/images/hero/interior/`. Giữ originals và sổ quyền ngoài public. BROTHERS chỉ ghi đúng “Sunflower tham gia thực hiện”; bộ tem/stock có caption minh họa, không nhận là tồn kho/cơ sở Sunflower. Không dùng ảnh tòa nhà.
- Dependency: dùng Next Image/CSS/component hiện có, không cài/nâng thư viện. Hero tĩnh, không canvas, không animation mới; nội dung/CTA/ảnh render trước JS.
- Rủi ro/fallback: ảnh nhỏ giữ giới hạn 447px bộ tem và 738px BROTHERS; dark Header dùng hai logo neutral đã có và CSS theo trạng thái native menu để no-JS vẫn tương phản. Menu mở hoặc sau cuộn dùng nền đọc rõ. Mobile xếp chữ rồi ảnh, Hero Liên hệ gọn; luôn có màu nền và alt nếu ảnh lỗi.
- Kiểm tra: source lint/typecheck/build; bảy route/13 nhóm; CTA anchors, quote prefill; dark Header đầu trang/cuộn/menu/Escape, screenshot 390×844/768×1024/1440×900 và 1920×1080 khi có thể; không tràn 320px. Ghi rõ phần chưa kiểm chứng như no-JS browser, zoom 200%, screen reader/Lighthouse/thiết bị thật.
- Snapshot: `references/work-snapshots/interior-round2-20261017/`. Demo local cổng 3010; không database/ERP/form delivery/deploy. Homepage poster và trang Sản phẩm lượt 1 giữ hiện trạng; motion nâng cao để lượt 4 mới.
