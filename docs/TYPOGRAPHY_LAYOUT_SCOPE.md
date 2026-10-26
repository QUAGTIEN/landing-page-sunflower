# Chỉnh typography và layout theo góp ý Word

2026-10-17. Chủ dự án xác nhận triển khai giải pháp đã trình từ file “một số điểm giao diện cần chỉnh lại.docx”. Đây là chỉnh bổ sung giao diện, không phải lượt 4 motion.

1. Một hệ sans Inter tiếng Việt; bỏ monospace ở nội dung đọc thông thường, chữ chính 16–18px, phụ 14px trở lên; giữ monospace cho code/pre.
2. Giới thiệu: phần dẫn riêng, ảnh lớn và hồ sơ công ty trên khối beige có chiều sâu; ba khối nguyên tắc với số lớn; sáu họ có cutout đại diện và link đúng catalog.
3. Ứng dụng Home: tăng chữ, mỗi mục có vùng nền/đệm/focus rõ hơn, giữ link 4 giải pháp.
4. Năng lực: khối chia tầng, hiện sẵn hai ý chính; chi tiết còn lại native disclosure, không để cả cột phải trống.
5. Bảng chất liệu: desktop bảng dễ đọc, mobile trình bày từng vật liệu đủ bốn trường; dữ liệu dùng chung, không mất thông tin.

File: `src/app/layout.tsx`, stylesheet riêng `typography-layout.css`, các section About/Home solutions/Capabilities/Products. Nếu tách dữ liệu chỉ chuyển nguyên văn sang registry, không đổi canonical catalog. Không dependency/ảnh mới, reuse cutout đã có metadata/quyền demo; không đổi bảy route, Hero, 13 slug hoặc API/form. Snapshot trước sửa `references/work-snapshots/typography-layout-20261017/`.

Chỉ hover/focus và reveal sẵn có; không loop/canvas/orbit/scroll interception. Chữ/ảnh SSR; native details và link dùng được không JS, reduced-motion bỏ chuyển động. Khối tròn và 3D để cuối, theo quyết định mới nhất.

Kiểm tra: lint/typecheck/build; desktop/mobile/tablet/wide và 320px; nội dung kỹ thuật/table đủ, link/anchor/filter/quote hồi quy. Có ảnh trước/sau và báo giới hạn browser emulation.
