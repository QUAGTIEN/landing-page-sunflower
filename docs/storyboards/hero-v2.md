# Hero full — Storyboard nháp v2 (2026-10-17)

**Trạng thái:** Chủ dự án đã duyệt concept 03 và đồng bộ React 19/R3F 9/Drei 10. Lượt 2 đã có scene live/camera/timeline để review với screenshot browser thật; chưa nghiệm thu chất lượng vật liệu. Đề xuất Blender → GLB tại [báo cáo lượt 2](../ROUND2_REPORT.md). Chưa sang lượt 3.

![Concept Hero desktop 03 — cuộn tem chính, cụm phụ hài hòa](../mockups/redesign-v2-hero-desktop-concept-03.png)

[Bản 01](../mockups/redesign-v2-hero-desktop-concept-01.png) và [bản 02](../mockups/redesign-v2-hero-desktop-concept-02.png) để đối chiếu.

## Bố cục mở đầu

Một cảnh studio full chiều ngang, Header trong cùng không gian. Headline `Tem nhãn. Tạo dấu ấn.` và CTA bên trái; cuộn tem trắng lớn là chủ thể, dải nhãn tiến xuống tiền cảnh. Hướng mới nhất ở bản 03 chọn bốn nhóm: `tem-trang-cuon` làm main; `hop` thấp phía sau, `the-bai` giấy ivory và `tem-vai-nylon-satin` nhỏ ở tiền cảnh. Hai khối cầu champagne trầm hỗ trợ chiều sâu; sản phẩm phụ nhỏ hơn rõ rệt, cùng họ màu, không che chữ. Cuộn tem in thứ hai và hộp đứng lớn của bản 02 được bỏ để giảm cạnh tranh. Bề mặt/artwork chỉ minh họa concept, không có nhãn hiệu khách hàng. Không có khung trình diễn, bảng tiến độ hoặc khối giải thích vật liệu.

Ảnh được tạo bằng công cụ imagegen tích hợp, chỉ dùng nội bộ cho art direction. Logo raster trong concept là tham chiếu bố cục; khi code dùng lại component thương hiệu hiện có, không lấy logo sinh bởi AI làm master. Copy ngắn trong concept là bản nháp trình bày cần chủ dự án xem trước khi dùng.

## Diễn biến dự kiến

| Nhịp | Camera / vật thể | Text / tương tác |
|---|---|---|
| 1. Mở đầu | Cuộn tem ở góc ba phần tư, đọc rõ lõi và cạnh giấy; dải nhãn cong về trước | H1, mô tả và CTA hiện ngay; Header hòa nền |
| 2. Tiến gần | Camera tiến/dịch ngang nhẹ để thấy chiều dày | Text nhường không gian theo native scroll, Header thu gọn |
| 3. Mở dải | Dải nhãn mở thêm, một nhãn bóc lên; chi tiết phụ nằm ở các lớp sâu khác nhau | Không thêm bảng giải thích |
| 4. Tách lớp | Camera đổi góc vừa phải, facestock/keo/silicone/liner tách theo chiều sâu | Chỉ giữ chú thích minh họa nhỏ nếu cần; không callout kỹ thuật |
| 5. Hợp lớp | Các lớp trở về, nhãn và dải ổn định | Nội dung section kế tiếp bắt đầu xuất hiện |
| 6. Chuyển giao | Cuộn tem dịch/thu về vùng nối sản phẩm | Dẫn sang Product Showcase; không khóa hoặc ép snap scroll |

Trong bản procedural hiện tại, props lùi theo chiều sâu khi focus vào cuộn tem; các khối cầu không tự quay/nảy. Camera orbit có giới hạn và dải vật liệu tách/hợp theo native scroll. Không thêm bảng giải thích.

Các pose thật: [mở đầu desktop](../mockups/redesign-v2-round2-desktop-1440x900.jpg), [tách lớp desktop](../mockups/redesign-v2-round2-desktop-layers-1440x900.jpg), [hợp lớp](../mockups/redesign-v2-round2-desktop-recombined-1440x900.jpg), [mobile mở đầu](../mockups/redesign-v2-round2-mobile-390x844.jpg), [mobile tách lớp](../mockups/redesign-v2-round2-mobile-layers-390x844.jpg). Xem chuyển động trực tiếp tại http://127.0.0.1:3010. Đây là bằng chứng bản demo, chưa là mốc chủ dự án duyệt motion/chất lượng.

## Công việc chuẩn bị còn lại sau khi duyệt concept 03

- Concept desktop 03 đã được duyệt về bố cục, chủ thể và hướng ánh sáng; dùng làm baseline cho Hero tĩnh.
- Đã tạo poster portrait và kiểm tra bản code ở mobile 390×844/tablet 768×1024 trong lượt 1; bằng chứng ở `docs/mockups/redesign-v2-round1-*`. Chưa mặc định duyệt chuyển động responsive ở lượt 2.
- Đã có các pose camera thật của lượt 2; phần nối Hero vào nhịp Product Showcase mới tiếp tục ở lượt 3. Bản hiện tại đi tới CorporateIntro cũ.
- Chọn 3–4 nhóm showcase theo ảnh/quyền sử dụng; rà lại asset và nguồn. Không mặc định concept cho phép công bố ảnh sản phẩm hoặc logo khách hàng.
- Đã đồng bộ `DESIGN_SYSTEM.md` / `PAGE_STRUCTURE.md` theo concept đã duyệt và việc bỏ phần giải thích vật liệu.

## Fallback và giới hạn

H1/CTA HTML và poster luôn render sẵn; live scene lazy-load sau first paint. Reduced-motion, Save-Data/2G, máy yếu, no-WebGL hoặc lỗi scene dùng poster. Browser đã kiểm tra 390×844, 768×1024, 1440×900, 1920×1080; chưa giả lập chủ động toàn bộ nhánh fallback hoặc đo Lighthouse/GPU mobile thật. Vật liệu procedural còn dưới mức chân thực concept 03; không dùng model/AI mockup làm bằng chứng sản phẩm thật. Báo cáo lượt 2 ghi byte/FPS và giới hạn phép đo.

Prompt đầy đủ và provenance: [bản 01](../mockups/redesign-v2-hero-prompt.md), [bản 02](../mockups/redesign-v2-hero-prompt-02.md), [bản 03](../mockups/redesign-v2-hero-prompt-03.md).
