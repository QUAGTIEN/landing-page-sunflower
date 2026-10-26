# Lượt 2 — Hero live 3D: bản demo để review

> **Quyết định mới của chủ dự án · 2026-10-17:** Giữ poster đã duyệt; hoàn thiện thao tác 3D cuối cùng sau khi xong các phần còn lại. Trang chủ đã bỏ import/mount `HeroExperience`, nên không tải scene hay khởi tạo timeline, không đổi poster hoặc giữ khoảng cuộn 3D. Mã prototype còn nguyên để làm sau. Các ảnh, số đo và kiểm thử bên dưới là lịch sử bản 3D trước khi tắt; không phải trạng thái demo hiện tại. Khôi phục bằng snapshot `references/work-snapshots/hero-poster-only-20261017/`; không bật lại 3D tự động trong lượt 3.

**Kiểm chứng bản poster:** Đã tạo production build và phục vụ local tại cổng 3010; ESLint riêng `HeroProductStage.tsx` bằng cấu hình lượt 1 đạt 0 cảnh báo, `npm run typecheck` đạt. Browser 1440×900: Hero cao 900px, section tiếp theo bắt đầu ở 900px; cuộn một viewport tới giới thiệu (không sticky). Mobile 390×844 và tablet 768×1024 không tràn ngang; cả ba viewport có 0 canvas và `data-motion="poster"`. Ảnh: [desktop](./mockups/hero-poster-only-desktop-1440x900.jpg), [mobile](./mockups/hero-poster-only-mobile-390x844.jpg), [tablet](./mockups/hero-poster-only-tablet-768x1024.jpg). Không thêm dependency hoặc sửa backend. Chưa làm lượt 3 và chưa hoàn thiện 3D.

Ngày: 2026-10-17. Local: http://127.0.0.1:3010.

**Trạng thái:** Đã xử lý dependency và có bản R3F chạy thực tế, camera/scroll/tách–hợp lớp để review. **Chưa nghiệm thu chất lượng Hero.** Vật liệu procedural vẫn đơn giản hơn concept 03; đề xuất Blender → GLB bên dưới. Chưa bắt đầu lượt 3; kế hoạch vẫn 4 lượt. Chưa deploy, kết nối database/ERP hoặc thay form delivery.

## 1. Phát hiện và xử lý dependency

Khi bật R3F, bộ cũ gây lỗi runtime ReactCurrentOwner: Next 15 App Router dùng React 19, R3F 8/Drei 9 yêu cầu React 18. Chủ dự án đã **đồng ý đồng bộ phiên bản** trong cuộc trò chuyện; không còn chờ xác nhận nâng major.

| Thư viện | Trước | Hiện tại |
| --- | --- | --- |
| React / React DOM | 18.3.1 | 19.2.9, pin exact |
| R3F | 8.18.0 | 9.8.2, pin exact |
| Drei | 9.122.0 | 10.7.9, pin exact |
| React / React DOM types | 18.x | 19.2.18 / 19.2.7 |
| Next / GSAP / Three | 15.5.28 / 3.15.0 / 0.170.0 | Giữ nguyên phiên bản đã cài |

Nguồn compatibility: [Next.js 15.1](https://nextjs.org/blog/next-15-1), [R3F installation](https://r3f.docs.pmnd.rs/getting-started/installation). Package/lock trước migration được lưu tại references/work-snapshots/round2-20261017/dependency-sync-before/.

Đã kiểm tra cài lại bằng npm ci --no-audit --no-fund (không force): thành công. Lần chuyển cây cũ sang mới ban đầu dùng --force để giải ERESOLVE của cây đang cài; lockfile mới đã tái cài được bình thường. npm ls cho bộ React/R3F/Drei không có invalid peer; npm ls --all exit 0 vẫn liệt kê hai optional Sharp/WASM packages extraneous (@emnapi/runtime, @img/sharp-wasm32), kể cả sau npm ci. Không tự nâng các dependency ngoài phạm vi để dọn cảnh báo deprecation/optional này.

## 2. Triển khai

- **Model:** src/components/three/LabelRollModel.tsx — lõi kraft rỗng, mặt cuộn có vân vòng giấy, barrel có đường bế, dải cong với 5 nhãn rời; một nhãn bóc và bốn lớp hình học tách/hợp. Giữ trục bề rộng giấy song song để tránh tự xoắn ở chỗ cong; chặn lớp xuyên sàn và ẩn interface trong suốt khi chưa tách.
- **Cụm phụ:** hộp ivory thấp có đường gấp, hai thẻ đục lỗ/dây, dải satin, hai cầu champagne nhỏ. Cuộn tem là chủ thể. Props lùi theo camera; không tự quay/nảy lặp.
- **Vật liệu/studio:** LabelRollMaterials.ts và LabelRollEnvironment.tsx — texture canvas gốc, ánh sáng/environment tạo cục bộ, nền cyclorama cong, contact shadow mềm. Không ảnh/HDR/model tải ngoài. Lớp product riêng loại backdrop khỏi depth pass; canvas alpha cho shadow trong suốt.
- **Scene:** LabelRollScene.tsx — một canvas R3F, camera off-axis theo viewport, native-scroll pose và parallax; kéo chuột có giới hạn, trả về pose khi thả. Dừng render khi yên/ngoài viewport/tab ẩn; giảm DPR rồi poster nếu FPS thấp liên tiếp. Đo trên các frame đang chuyển động, tránh coi khoảng nghỉ demand-render là FPS thấp.
- **Controller:** src/sections/home/HeroExperience.tsx — lazy scene sau first paint; HTML H1/CTA và picture từ HeroProductStage.tsx vẫn render sẵn. GSAP ScrollTrigger scrub, CSS sticky; không chặn wheel/touch, khóa trang hoặc ép snap. Nội dung nhường chỗ theo timeline; context cleanup hoàn nguyên style, focus bàn phím làm CTA hiện lại.
- **Chiều cao khi tải:** globals.css dùng cùng biến chiều cao/travel cho pending/live, dự trữ trước hydration khi scripting enabled; reduced-motion/no-JS giữ poster bình thường. Sửa lỗi browser scroll anchoring làm refresh giữa sequence nhảy sang section sau. [CSS scripting media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/scripting).
- **Nguồn/quyền/ngân sách:** src/content/assets.ts; scene là minh họa dev-only, không phải sản phẩm đo đạc hoặc bằng chứng cấu tạo thật. Giữ poster concept 03 đã duyệt làm fallback. Không thêm UI giải thích vật liệu, S0–S5, thanh trạng thái hoặc thông số chẩn đoán trên giao diện.

File mới khác: labelRollTimeline.ts, sceneTypes.ts, scripts/verify-hero-geometry.mjs. Không sửa taxonomy 13 nhóm, route, API, logo hoặc các section còn lại của homepage.

Hero hiện kết thúc trước CorporateIntro của bản homepage cũ; phần nối thẳng vào Product Showcase cùng nhịp section mới thuộc lượt 3, chưa được triển khai trong lượt này.

## 3. Kiểm chứng

| Kiểm tra | Kết quả |
| --- | --- |
| Lint 9 file TS/TSX mới/sửa bằng ESLint + config Next của snapshot lượt 1 | 0 lỗi, 0 cảnh báo |
| npm run typecheck; npm run build | Đạt; homepage First Load JS khoảng 128KB theo Next |
| 7 route HTTP; SSR H1/poster | Tất cả 200; H1 và poster có trong HTML trước hydration |
| Geometry forward/reverse | 202 pose mỗi cấu hình desktop/mobile, 404 tổng; 19 geometry/rig; position/normal hữu hạn, không xuyên sàn, không cấp phát geometry khi scroll, dispose đủ |
| Browser desktop 1440×900 | Mở đầu, tách/hợp lớp, native scroll tới section sau; không lỗi console trong đợt QA cuối |
| Refresh desktop giữa sequence | Trước/sau y≈990.4, progress≈0.629, frameTop=0, scene ready |
| Mobile 390×844 | Camera riêng, copy/CTA đọc được; pose tách lớp, không overflow ngang |
| Refresh mobile giữa sequence | Trước/sau y≈548.8, progress≈0.650, scene ready |
| Resize desktop ↔ mobile; tablet 768×1024; wide 1920×1080 | Canvas khởi tạo lại đúng nhánh; có ảnh thật |
| 320×844 | Không overflow ngang; copy/CTA không bị che; kiểm tra min-height 940px |
| Điều hướng | Trang Sản phẩm không có canvas; Back khôi phục một canvas và pose; menu mobile Enter/Escape đạt |
| Drag desktop | Smoke test kéo/thả không đổi scroll progress hoặc gây lỗi; parallax/yaw có giới hạn, pitch tác động camera để giấy không xuyên sàn |

Lệnh lint dùng node node_modules/eslint/bin/eslint.js --no-eslintrc --config references/work-snapshots/round1-20261017/eslint-round1.json với danh sách file mới/sửa và --max-warnings 0. Chưa sửa script npm run lint của nền tảng Next 15 trong phạm vi này.

**Giới hạn QA:** Các kích thước mobile/tablet là browser resize trên Windows, chưa phải GPU/touch thiết bị thật. Chưa chủ động giả lập reduced-motion/no-WebGL/Save-Data/2G/context loss sau migration, tắt JS trong browser, zoom thật 200%, Lighthouse hoặc đo điện/GPU memory. Các nhánh fallback đã được code; SSR và lỗi module trả poster đã kiểm tra, không đồng nghĩa mọi nhánh đã nghiệm thu. Chưa quay video; review motion trực tiếp tại demo local, ảnh dưới đây là các pose thật.

## 4. Bằng chứng hình ảnh và hiệu năng

- [Desktop mở đầu 1440×900](./mockups/redesign-v2-round2-desktop-1440x900.jpg)
- [Desktop tách lớp](./mockups/redesign-v2-round2-desktop-layers-1440x900.jpg), [hợp lớp](./mockups/redesign-v2-round2-desktop-recombined-1440x900.jpg)
- [Mobile mở đầu 390×844](./mockups/redesign-v2-round2-mobile-390x844.jpg), [mobile tách lớp](./mockups/redesign-v2-round2-mobile-layers-390x844.jpg)
- [Tablet 768×1024](./mockups/redesign-v2-round2-tablet-768x1024.jpg), [desktop 1920×1080](./mockups/redesign-v2-round2-desktop-1920x1080.jpg), [320px](./mockups/redesign-v2-round2-mobile-320x844.jpg)
- [Số đo runtime](./mockups/redesign-v2-round2-runtime.json), [chunk gzip](./mockups/redesign-v2-round2-bundle.json)

Mẫu active-frame cuối trên IAB Windows / Intel UHD / viewport 1440×900 / DPR 1.25: **87.6 FPS**, 45 draw calls, 18,648 triangles kể cả shadow pass, 12 textures ở pose tách lớp. Đây là một cửa sổ đo khoảng 2.5 giây trong thao tác cuộn, không phải mức FPS ổn định mọi máy hoặc kết quả GPU mobile. Không dùng mẫu này để tuyên bố toàn site đạt performance.

Ngân sách build: scene khoảng **251KiB gzip**; tổng scene + chunk GSAP/ScrollTrigger khoảng **295KiB gzip** (cộng file trong manifest, chưa trừ cache/chunk dùng chung). JSON ghi byte chính xác của bản build. Texture/HDR network của live scene = 0 byte; canvas texture vẫn tốn CPU tạo và GPU memory. DPR 1.25 desktop / 1 mobile, giảm 0.85 trước khi fallback; ba cửa sổ chậm liên tiếp mới chuyển poster.

Ảnh round2-pending-* trước đó chỉ là poster khi chờ sửa dependency; không dùng chúng làm bằng chứng live 3D.

## 5. Đánh giá chất lượng và đề xuất Blender → GLB

Bản procedural chứng minh bố cục, motion và tích hợp. **Chưa đạt độ chân thực của concept 03:** cạnh giấy/ánh sáng còn đơn giản, hộp/thẻ/satin chưa có mức chi tiết vật liệu và nếp gấp như mockup. Chưa đánh dấu chất lượng Hero hoàn tất hoặc tự chuyển lượt 3.

Đề xuất xử lý trong chính phạm vi lượt 2, giữ kế hoạch 4 lượt:

1. Dựng model Blender từ cùng bố cục: cạnh cuộn có bevel/normal tốt hơn, lõi kraft/giấy bằng UV/PBR, nếp gấp hộp và satin; giữ các vật thể/lớp tách riêng để animation hiện tại tiếp tục điều khiển.
2. Lưu nguồn làm việc trong references/3d-working/; chỉ đưa GLB/texture sang public sau khi duyệt nguồn và hình ảnh. Không dùng artwork khách hàng.
3. Load GLB bằng R3F/Drei hiện có, thay rig/material nội bộ; giữ HeroExperience, native scroll, route, H1/CTA và fallbacks. Đo lại kích thước model/texture/FPS, không tự thêm thư viện hậu kỳ.
4. Sau khi scene được duyệt, render poster thật từ model thay ảnh AI; chụp lại desktop/mobile và nghiệm thu Hero trước lượt 3.

Đây là đề xuất tiếp theo, **chưa tạo hoặc tích hợp GLB**, không mặc định chủ dự án đã duyệt đổi pipeline chỉ vì đồng ý nâng phiên bản thư viện.

## 6. Khôi phục

Không có Git commit để rollback. Snapshot trước lượt 2: references/work-snapshots/round2-20261017/MANIFEST.txt. Phục hồi đúng các file tương đối được liệt kê; package.json/package-lock.json lấy từ dependency-sync-before/ rồi chạy npm ci để khớp bộ cũ.

File mới có thể bỏ khi rollback: HeroExperience.tsx; LabelRollMaterials.ts, LabelRollEnvironment.tsx, labelRollTimeline.ts, sceneTypes.ts; src/content/assets.ts; scripts/verify-hero-geometry.mjs; báo cáo này. Giữ ảnh/báo cáo trong docs để đối chiếu nếu cần. Không ghi đè toàn workspace hoặc xóa thư mục theo wildcard.
