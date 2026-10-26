# Menu danh mục con trên Header

2026-10-17. Owner duyệt menu bấm mở: Sản phẩm (13 nhóm trong 6 họ), Giải pháp (4 ứng dụng), Năng lực (4 mục); mỗi bảng có link xem toàn bộ trang. Desktop bảng ivory dưới Header; mobile bung/thu trong menu. Trang chủ/Giới thiệu/Dự án và CTA vẫn là link trực tiếp.

- Registry slim `src/content/headerNavigation.ts` tính từ source canonical ở server; truyền props sang Header, không import toàn bộ catalog/spec vào client chỉ để làm menu.
- Component native details/summary dùng chung ở `src/components/layout/NavigationDropdown.tsx`; không role menu giả/keyboard trap, không thêm lib/ảnh/dependency.
- Sửa SiteHeader + CSS riêng/import root: mở bằng click/Enter/Space, Tab theo link, Escape về summary, click/focus ra ngoài đóng, chọn link kể cả cùng route/hash đóng, chuyển breakpoint và Back/Forward dọn trạng thái.
- Chỉ một bảng cùng cấp mở; native HTML group name và SSR link duy trì khi chưa có JS. Panel tự cuộn nếu thấp, không khóa scroll của trang.
- Giữ theme Header/logo, điều hướng 7 route, 13 slug/query; mọi submenu dùng anchor đang có. Không orbit/3D/backend/deploy.

Snapshot: `references/work-snapshots/header-dropdown-20261017/` gồm src/docs trước sửa. QA lint/typecheck/build; bấm/chuyển menu/đóng/Escape/Tab/hash/quote, desktop1440/1920, mobile390/tablet768/320, viewport thấp và resize. Chụp desktop/mobile menu mở; ghi giới hạn no-JS/emulation nếu browser không hỗ trợ.
