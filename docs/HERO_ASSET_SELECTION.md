# Chọn hình và bố cục Hero trang con — Phương án 01

> **Đã triển khai lượt 2 mới · 2026-10-17:** Năm Hero còn lại đã áp dụng vào app theo bảng chọn hình bên dưới, cộng với Hero Sản phẩm lượt 1. Xem [INTERIOR_ROUND2_REPORT.md](./INTERIOR_ROUND2_REPORT.md) để xem ảnh app thật và checks. Hai ảnh mới có derivative WebP đã ghi nguồn/quyền trong `src/content/pageHeroes.ts` và sổ intake; originals giữ nguyên. Các câu “chưa áp dụng” bên dưới lưu lịch sử bước mockup, không phản ánh tiến độ hiện tại. Vòng xoay và live Hero 3D vẫn chưa bật.

> **Lịch sử lượt 1 mới · 2026-10-17:** Hero Sản phẩm tĩnh và catalog 13 cutout đã được code, có checks và ảnh tại [CATALOG_ROUND1_REPORT.md](./CATALOG_ROUND1_REPORT.md). Năm Hero khác sau đó được triển khai trong lượt 2 mới theo cập nhật ở đầu tài liệu.

Ngày 2026-10-17. Chủ dự án đã chốt hướng: đủ 13 nhóm catalog có vật thể tách nền; sáu trang con có Hero riêng; tham khảo MWDT về bố cục và Dream Space về màu/vòng xoay. Hero trang chủ giữ poster concept 03. Vòng xoay và 3D để bước motion cuối. Đây là bản duyệt chọn hình/bố cục, chưa sửa ứng dụng.

## Tư liệu mới và xác nhận

- **Bộ tem nhiều vật liệu**: 447×447; ảnh minh họa vật liệu. Chưa có bằng chứng là ảnh tồn kho thực tế hoặc thông tin tác giả/license gốc. Dùng vùng ảnh vuông tối đa khoảng 447px trong bản demo, không làm nền full-width.
- **Tòa nhà**: 500×667; chủ dự án xác nhận **chỉ là ảnh tham khảo/minh họa**. Loại khỏi Hero Giới thiệu và Liên hệ; không ghi là trụ sở, xưởng hoặc địa điểm Sunflower.
- **Bao bì BROTHERS**: 738×411; chủ dự án xác nhận **“Sunflower có tham gia và được phép công bố”**. Chọn cho trang Dự án; giữ artwork nguyên bản. Chưa có vai trò/công đoạn cụ thể, ngày, sản lượng hoặc kết quả: không tự viết thêm.

Bản gốc và sổ nguồn: references/intake/owner-20261017/ASSET_REGISTER.json. Chưa copy ảnh mới vào public/; không đổi dữ liệu khách hàng/dự án trong frontend ở bước này.

## Phương án chọn cho 7 trang

| Trang | Hình chính | Bố cục / thông điệp | Trạng thái |
|---|---|---|---|
| / | Poster concept 03 desktop/mobile hiện có | Full-bleed studio, cuộn tem là chủ thể | Giữ bản đã duyệt |
| /san-pham | public/images/products/cutouts/label-rolls-v1.webp, thêm hộp/thẻ phụ từ bộ cutout hiện có | Nền beige, tiêu đề giữa, cụm vật thể lớn phía dưới; cuộn tem nổi bật nhất | Minh họa AI cho demo. Vòng xoay chỉ chuẩn bị ở bước motion, chưa triển khai |
| /gioi-thieu | public/images/company/print-color-samples-unsplash.webp (1200×800) | Typography/editorial graphite + ảnh cận bản in dọc. “Từ ý tưởng. Đến từng chi tiết.” | Stock minh họa ngành in, không phải cơ sở/đội ngũ Sunflower |
| /giai-phap | references/intake/owner-20261017/label-material-collection.png | Nền ivory, chữ trái, ảnh vật liệu khổ vuông phải. “Đúng chất liệu. Đúng ứng dụng.” | Minh họa do chủ dự án cung cấp, không tự suy diễn thông số |
| /nang-luc | public/images/company/printing-press-unsplash.webp (1200×801) | Máy in chiếm phần lớn Hero, vùng tối giúp chữ rõ. “Từ chế bản. Đến thành phẩm.” | Stock minh họa, caption rõ không phải nhà xưởng Sunflower |
| /du-an | references/intake/owner-20261017/brothers-packaging.png | Graphite ấm, chữ trái + ảnh bộ bao bì phải. “Những dấu ấn trên thành phẩm.” | Quyền công bố do chủ dự án xác nhận; cần mô tả đúng phạm vi tham gia khi viết case study |
| /lien-he | public/images/products/cutouts/ivory-tags-v1.webp (1100×1100) | Hero gọn, nền warm gray, hình thẻ bài phụ; biểu mẫu ngay sau Hero | Minh họa AI cho demo. Không dùng ảnh tòa nhà thay địa chỉ |

## Bản xem

- docs/mockups/interior-heroes-v1/index.html: bảng tổng hợp có bộ chọn trang, xem lưới/desktop/mobile.
- Chạy từ thư mục dự án: node references/hero-review-20261017/server.mjs → http://127.0.0.1:3011/. Server chỉ cung cấp HTML và bảy ảnh được chọn trên loopback; không mở toàn bộ thư mục dự án.
- Cổng 3010 giữ nguyên app lượt 3; các CTA trong mockup chỉ liên kết tới route demo hiện có.
- Ảnh chụp và kiểm tra responsive nằm cùng thư mục mockup. Đây là mockup thực tế được render trong browser, không phải ảnh AI giả giao diện đã triển khai.

## Còn mở

Ảnh bộ tem và BROTHERS đủ để duyệt art direction nhưng chưa đủ sắc nét cho màn hình lớn/retina nếu dùng quá rộng. Ưu tiên xin bản gốc lớn hơn khi tiện; không trì hoãn mockup vì thiếu bản lớn. Vị trí ảnh hiện giới hạn hợp lý theo độ phân giải.

Sau bản chọn hình/mockup, chủ dự án yêu cầu lập kế hoạch chỉnh sửa. Kế hoạch thực thi hiện hành tại [IMPLEMENTATION_PLAN.md, mục 9.10](./IMPLEMENTATION_PLAN.md#910-kế-hoạch-chỉnh-sửa-hiện-hành--catalog-13-nhóm-hero-từng-trang-motion-sau-cùng): asset 13 nhóm → trang Sản phẩm → năm Hero còn lại → QA → vòng xoay → Hero 3D cuối cùng. Chưa áp dụng UI, chưa thêm vòng xoay, WebGL, dependency, route chi tiết, backend/database hoặc deploy. Mốc review trên ứng dụng thật vẫn cần sau triển khai.

## Kiểm chứng bản duyệt

- Đã render đủ sáu Hero trong browser, chọn từng trang và chuyển lưới/desktop/mobile. Desktop viewport 1440×900; khung artboard rộng khoảng 1339px khi xem riêng. Cả sáu Hero có ảnh tải đủ, chữ/CTA/chú thích trong khung.
- Đã kiểm tra cả sáu bố cục ở khung mobile 390px trong màn hình desktop, đồng thời chụp lại trên viewport thực 390×844. Hero Liên hệ trên mobile được rút gọn, hình thẻ bài là chi tiết phụ để ưu tiên biểu mẫu khi áp dụng UI.
- Không có tràn ngang hoặc lỗi console; không có canvas/animation ở bản duyệt tĩnh. Đây không phải kiểm thử motion, hiệu năng, accessibility toàn website hay bằng chứng 3D hoàn thành.
- browser-review.json lưu kiểm tra khung desktop/mobile; overview-desktop.jpg là tổng hợp mới nhất; mỗi trang có ảnh tên *-hero-desktop.jpg và *-hero-mobile.jpg. File mobile chụp toàn bản duyệt trên viewport nhỏ, không phải ảnh cắt từ desktop.
- Sửa lỗi độ ưu tiên CSS làm chữ dẫn trên nền tối thiếu tương phản trước khi chốt ảnh. Caption minh họa và thông tin BROTHERS được phân biệt rõ.
- Không chạy lại build ứng dụng vì không thay src/, package hoặc API; chỉ thêm bản gốc tham chiếu, sổ nguồn, mockup HTML, helper preview và cập nhật kế hoạch. Header trong mockup chỉ minh họa nhịp bố cục; khi triển khai sẽ tái sử dụng Header/logo đã duyệt.
- Khôi phục thay đổi kế hoạch bằng references/hero-review-20261017/IMPLEMENTATION_PLAN.before.md nếu cần; các file mới chỉ thuộc bộ duyệt, không được import vào app hoặc đưa vào public.
