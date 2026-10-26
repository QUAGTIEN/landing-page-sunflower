# Lượt 3 — Polish và QA toàn site

2026-10-17. Owner yêu cầu triển khai lượt 3 của bốn lượt mới.

- Giữ 7 route, Hero/poster và media đã duyệt, 13 slug catalog, query/logic/API báo giá.
- `Primitives.tsx`: ID SectionHeading; native disclosure dùng chung, chữ và nhịp thống nhất.
- About/Capabilities/Solutions/Projects: giảm tiêu đề/copy lặp, bỏ khung lồng, chi tiết kỹ thuật mở bằng bàn phím/native details; giữ nội dung chi tiết.
- Contact: ẩn placeholder kỹ thuật khỏi UI, FAQ gọn, focus field rõ; giữ dữ liệu chưa xác nhận trong content.
- Header/Footer/Home selector: kiểm tra tương tác và no-JS, motion reveal không làm nội dung biến mất khi tải/chuyển anchor.
- CSS: heading/body, divider và nền xen kẽ tiết chế, focus trên tối/sáng, mobile 320px trở lên.
- Không dependency/ảnh mới; không backend, deploy, orbit hoặc 3D. Snapshot source/docs trước sửa ở `references/work-snapshots/polish-round3-20261017/`.

Motion gate: chỉ tinh chỉnh reveal/hover sẵn có bằng WAAPI/CSS, giúp đọc có nhịp; không cần asset/download mới, không loop/pin/intercept scroll. SSR hiện sẵn; reduced-motion bỏ animation; phần đã trong viewport khi mount/đích anchor không reveal lại. Mobile giảm khoảng dịch chuyển. Không có GPU canvas.

Kiểm chứng: lint/typecheck/build; 7 route × 390/768/1440/1920; thêm 320, ID/anchor/alt, menu/bàn phím/filter/details, query báo giá và demo validation. Browser chỉ cung cấp viewport, không có emulation no-JS/reduced-motion/zoom: kiểm tra source/SSR riêng và ghi giới hạn rõ nếu không có capability.
