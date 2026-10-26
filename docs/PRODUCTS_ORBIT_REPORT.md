# Vòng xoay Sản phẩm E1 — 2026-10-19

## 1. Hiện trạng và phạm vi

Chủ dự án yêu cầu bắt đầu phần vòng xoay trước. Hero Sản phẩm cũ là ba cutout tĩnh; các trang, typography/layout và menu đã có. Đây là E1 của lượt 4, không phải hoàn tất cả lượt 4. Trang chủ tiếp tục dùng poster, không nhập lại scene 3D cũ.

Phạm vi và motion gate được lưu trước khi code tại [storyboard](./storyboards/products-orbit.md). Chỉ demo local tại [Sản phẩm](http://localhost:3010/san-pham).

## 2. Đề xuất → triển khai

Sáu họ có sáu vật thể đại diện trên ellipse: cuộn tem, tờ nhãn, ribbon, máy in mã vạch, hộp, satin. Cuộn tem ở trước khi mở trang. Ảnh giữ hướng nhìn ban đầu, thay đổi vị trí/tỷ lệ/thứ tự lớp; nhãn và link nằm ngoài chuyển động để đọc được. Đây là ảnh tách nền có chiều sâu trình bày, không phải model xoay thấy mặt sau.

Desktop chuyển một vị trí trong 1.8 giây, nghỉ 6 giây. Timer thường cho khoảng nghỉ, GSAP chỉ tween khi chuyển; không có vòng lặp React cập nhật từng frame. Nút trước/sau, sáu nút chọn và pause/play hoạt động độc lập với scroll. Chọn chủ động dừng tự xoay, chọn liên tiếp ghi đè tween cũ theo cung ngắn nhất. Hover/focus tạm dừng; ngoài viewport/tab ẩn dừng timer và giữ pose. Không pin/wheel/touch interception hoặc khóa trang.

Mobile dưới 768px hiển thị một vật thể và chọn thủ công. Reduced-motion đổi tức thì; Save-Data/2g cũng không tự quay. Các nhánh preference, visibility và lỗi import có trong source; giới hạn kiểm chứng browser được ghi ở phần 4. HTML đầu tiên có hình/H1/CTA; sáu link noscript giữ đường vào catalog. Nút chưa hydrate ở trạng thái disabled. GSAP lỗi vẫn chọn nhóm và theo link được.

## 3. File và nội dung

| File | Công việc |
|---|---|
| `src/content/productOrbit.ts` | Mapping sáu họ canonical → đại diện/link/media hiện có; không đổi taxonomy |
| `src/components/animations/ProductOrbit.tsx` | SSR first pose, engine nâng cấp, dừng/tiếp tục/cleanup, điều khiển và keyboard |
| `src/app/products-orbit.css` | Ellipse nhiều lớp, chữ/nút cố định, mobile thủ công, focus và reduced-motion |
| `src/sections/products/ProductsHeroStage.tsx` | Ghép vòng xoay vào hero, giữ H1/CTA; title một dòng desktop và hai dòng mobile |
| `src/app/layout.tsx` | Import stylesheet có selector giới hạn ở feature |

Không sửa catalog/specs/quote/query/API, Header, logo hoặc Hero trang chủ. Hash đối chiếu 14 file quan trọng và dependency manifests vẫn giống snapshot. Không thêm thư viện, model, ảnh hoặc route.

Tái sử dụng sáu cutout có provenance trong `catalogObjects.ts` / `assets.ts` và `references/product-cutouts/`. Tổng file gốc **518,604 bytes**, không phải số byte mạng đã đo. Chúng là ảnh AI minh họa đã được cho phép dùng cho demo, không phải ảnh hàng thực tế. HTML preload một ảnh cuộn tem; năm ảnh còn lại native lazy/Next Image. Browser desktop đã tải đủ sáu ảnh.

## 4. Kiểm chứng và bằng chứng

- **Lint, typecheck, build:** đạt trên source cuối. Log tại `references/work-snapshots/products-orbit-20261019/build-final.log`. Trong quá trình làm đã sửa lỗi precision của style SSR gây hydration mismatch; bản build cuối không còn lỗi này.
- **HTTP/source contract:** bảy trang trả 200, mỗi trang một H1, không canvas. Đủ 13 anchor và link báo giá; sáu đại diện trỏ vào anchor có thật; HTML có sáu vật thể/sáu nút/sáu link noscript và một ảnh preload. `contract-checks.json` có chi tiết; helper chỉ GET, không POST.
- **Responsive browser:** preset 390×844, 768×1024, 1440×900, 1920×1080 và 320×844. Không tràn ngang; sáu nút chọn cao ít nhất 54px. Mobile chỉ một vật thể, không nút autoplay; tablet/desktop có sáu lớp. Hero desktop 1440 có cả bộ chọn trong chiều cao khoảng một màn hình; mobile cho cuộn tự nhiên để tới đủ nút. Các screenshot do công cụ trả có thể nhỏ hơn preset; DOM ghi nhận đúng viewport trong JSON.
- **Tương tác browser:** chọn đủ sáu nhóm, ArrowLeft/Right/Home/End, wrap trước/sau, đổi nhanh rồi pose cuối đúng; autoplay có tiến triển; pause giữ nguyên pose khi pointer đã ra ngoài; hover/focus dừng và rời ra tiếp tục. Cuộn xuống catalog giữ pose và dừng hoạt động. Back từ báo giá dựng lại đúng feature; Header dropdown/Escape vẫn hoạt động.
- **Luồng mua hàng:** lọc Thiết bị → chọn Nhãn may mặc trong orbit → link vào satin đang bị filter ẩn → mở lại đủ 13 nhóm → báo giá có `san-pham=tem-vai-nylon-satin` và select điền đúng. Không gửi biểu mẫu.
- **Hồi quy:** Home vẫn poster, không orbit/canvas hoặc tràn; About có screenshot đối chiếu. Nguồn Header/catalog/form/home không bị sửa.
- **Console bản build:** không warning/error trong lượt kiểm tra cuối. Không lấy log dev cũ làm kết quả production build.

Ảnh và JSON nằm trong [thư mục bằng chứng](./mockups/products-orbit/): `hero-desktop.jpg`, `hero-tablet.jpg`, `hero-mobile.jpg`, `hero-wide.jpg`, `hero-small.jpg`, `mobile-controls-320.jpg`, các pose/kiểm tra bổ sung và `responsive-checks.json`, `interaction-checks.json`, `console-final.json`.

Theo build, `/san-pham` First Load JS khoảng **125 kB** (trước 123 kB); các trang khác không tăng First Load JS trong báo cáo build. GSAP core import động khoảng **19,927 bytes gzip**, nằm ngoài initial route chunks. Đây là số build/file, không phải Lighthouse hoặc đo CPU/GPU/FPS. Không thêm renderer WebGL, shader, HDR hoặc texture.

**Chưa kiểm chứng bằng browser:** giả lập `prefers-reduced-motion`, Save-Data/2g, tắt JS, import GSAP lỗi, tab hidden, zoom 200%, screen reader, điện thoại thực và Lighthouse/FPS. Đã kiểm tra các guard/cleanup, HTML noscript và CSS tương ứng trong source; không gọi đó là nghiệm thu trên thiết bị thật. Không hứa 60fps từ kết quả build.

## 5. Còn chờ và khôi phục

Chờ chủ dự án review nhịp xoay, bố cục và chiều sâu E1 trên demo. E2 — chất lượng model/ánh sáng/chuyển động Hero trang chủ — còn mở; không bật lại scene cũ hoặc đánh dấu toàn bộ lượt 4 hoàn tất. Tư liệu chính thức và các tích hợp production vẫn theo phạm vi đã chốt, không chặn demo này.

Snapshot trước sửa: `references/work-snapshots/products-orbit-20261019/`. Để rollback: khôi phục `ProductsHeroStage.tsx`, `layout.tsx` và ba tài liệu từ snapshot; bỏ ba source mới (`ProductOrbit.tsx`, `productOrbit.ts`, `products-orbit.css`) rồi build lại. Dữ liệu/media/dependency không cần thay. Không có Git commit hoặc deployment trong lượt này.
