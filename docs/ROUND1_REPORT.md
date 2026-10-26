# Báo cáo lượt 1 — Header + Hero full (2026-10-17)

**Kết quả:** Hoàn tất code và kiểm tra phạm vi lượt 1, dựa trên concept desktop 03 được chủ dự án duyệt. Chưa triển khai scene 3D mới hoặc motion tách lớp của lượt 2. Bản chạy hiện tại là build production chạy **local** tại `http://127.0.0.1:3010`; không phải deploy production.

## 1. Phát hiện và phạm vi

Hero cũ là Client Component, ghép đoạn giới thiệu với `MaterialStory`, import canvas Three.js và giao diện S0–S5. Header dùng nền riêng và chiếm một dải phía trên. Concept 03 yêu cầu một cảnh studio liền mạch, cuộn tem trắng làm main, các sản phẩm phụ ivory và HTML/CTA rõ ràng.

Mục tiêu lượt 1: dựng Hero tĩnh full chiều ngang/gần trọn viewport, Header hòa cảnh/thu gọn khi scroll, menu mobile truy cập được, bỏ phần giải thích vật liệu và UI kỹ thuật. Giữ route, danh mục và query liên hệ; không đổi logo hoặc dịch vụ backend.

## 2. File triển khai

| File | Thay đổi |
|---|---|
| `src/sections/home/HeroProductStage.tsx` | Server Component; H1/CTA HTML; art-directed picture qua `getImageProps`; native scroll cue. Không import GSAP/canvas/MaterialStory. |
| `src/components/layout/SiteHeader.tsx` | Fixed overlay ở Home; nền đặc + compact khi scroll; spacer trên trang con; underline nav; native details menu, Escape/outside/focus handling và đóng khi chuyển route/breakpoint. |
| `src/app/globals.css` | Token gutter/header; CSS Header/Hero, bố cục mobile/tablet/desktop, min-height theo `svh`, focus và touch target. |
| `src/content/company.ts` | Copy ngắn theo concept đã duyệt; metadata nguồn/quyền/dimensions cho poster desktop/mobile. |
| `src/sections/home/CorporateIntro.tsx` | Thêm anchor `gioi-thieu-sunflower` cho scroll cue. |
| `src/app/page.tsx` | Đồng bộ chú thích trạng thái Hero tĩnh, không đổi các section còn lại. |
| `src/app/layout.tsx` | Khai báo `data-scroll-behavior="smooth"` tương ứng CSS hiện có để Next không cảnh báo chuyển route. |
| `next.config.mjs` | Cho phép chất lượng ảnh 75/85, không nâng dependency. |

`MaterialStory.tsx`, `LabelRollScene.tsx`, `LabelRollModel.tsx` và dữ liệu lớp vật liệu cũ được giữ để tái sử dụng; không có import từ Hero mới nên không render canvas hoặc UI giải thích trên Home. Không viết lại scene giữa lượt 1 và lượt 2.

Tài liệu đồng bộ: `DESIGN_SYSTEM.md`, `PAGE_STRUCTURE.md`, `IMPLEMENTATION_PLAN.md`, storyboard và trạng thái concept 03.

## 3. Asset và tính trung thực

- `public/images/hero/hero-studio-desktop-v3.png`: 1586×992, 1,832,104 byte; bỏ UI khỏi concept 03 bằng imagegen tích hợp.
- `public/images/hero/hero-studio-mobile-v3.png`: 940×1672, 1,732,429 byte; portrait composition, vật thể nằm ở nửa dưới để dành chỗ cho HTML.
- Nguồn/prompt: [poster prompts](./mockups/redesign-v2-round1-poster-prompts.md). Quyền sử dụng đánh dấu `illustrative_dev_only` tại `src/content/company.ts`; có chú thích concept trên Hero. Không lấy logo AI hoặc artwork minh họa làm master.
- Browser dùng optimized image route của Next; `<picture>` chọn nguồn theo viewport, không dùng hai ảnh ẩn bằng CSS. Không có chữ/nút bị raster hóa trong poster.
- Kiểm tra HTTP tối ưu ảnh: desktop `w=1920,q=85,Accept=image/webp` → 200, 73,070 byte; mobile `w=640,q=85` → 200, 28,258 byte. Đây là dung lượng của hai response đã đo, không phải kết quả Lighthouse hoặc mọi thiết bị/định dạng.
- Scene hiện tại là poster tĩnh, không phải WebGL hoặc ảnh sản phẩm thật; model/material/hiệu năng live 3D sẽ được xử lý ở lượt 2.

## 4. Kiểm chứng

| Kiểm tra | Kết quả thực tế |
|---|---|
| TypeScript | `npm run typecheck` đạt sau build cuối. |
| Lint phạm vi sửa | ESLint với cấu hình `next/core-web-vitals`, `next/typescript`, `--max-warnings 0`: 0 lỗi, 0 warning trên 6 file TS/TSX được sửa. |
| Build | `npm run build` đạt; đủ 7 route cấp 1. Build ghi 13 mục sinh trang bao gồm route hệ thống, không phải 13 trang cấp 1. |
| HTTP trên build local | `/`, `/gioi-thieu`, `/san-pham`, `/giai-phap`, `/nang-luc`, `/du-an`, `/lien-he` đều trả 200, có H1. |
| Desktop | Đã xem/chụp ở 1440×900 và 1920×1080; chữ/CTA không đè cuộn tem, Header hòa cảnh. |
| Mobile/tablet | Đã xem/chụp ở 390×844 và 768×1024, chọn poster portrait đúng; không tràn ngang. |
| 320px | Đã xem ở 320×844; Hero cao 940px, CTA xếp lại và nằm trong chiều ngang. Không khóa chiều cao để cố nhét một màn hình. |
| Menu | Có 7 đường dẫn; mở/đóng, Tab vào link đầu, Escape đóng và trả focus về summary; đi đến Giới thiệu và quay về Home thành công. |
| Scroll | Header desktop từ 96px thu còn 72px và có nền `rgb(246,244,239)`; không khóa body scroll. |
| Server-rendered foundation | Sau bỏ thẻ script khỏi HTTP HTML vẫn có H1, CTA, picture/source và native details; không có canvas hoặc khối “Từ lớp vật liệu đến cuộn tem hoàn thiện”. Đây là kiểm tra HTML, chưa phải browser session tắt JS. |
| Console | Không thấy JavaScript error trong tab kiểm tra. Warning quality ảnh/scroll behavior phát hiện trong dev đã được xử lý; bản build local được xem lại. |

Lệnh lint đã dùng:

```powershell
node node_modules/eslint/bin/eslint.js --no-eslintrc --config references/work-snapshots/round1-20261017/eslint-round1.json src/components/layout/SiteHeader.tsx src/sections/home/HeroProductStage.tsx src/sections/home/CorporateIntro.tsx src/content/company.ts src/app/page.tsx src/app/layout.tsx --max-warnings 0
```

Không đổi script lint toàn repo hoặc cấu hình lint chính thức trong lượt này. Cấu hình lint phạm vi sửa được lưu trong snapshot nội bộ; full QA/lint toàn dự án nằm trong lượt 4.

## 5. Ảnh browser trước/sau

Ảnh sau ở desktop/mobile/tablet/1920 và menu được chụp lại trên build local cuối. Ảnh trước và kiểm tra 320px thực hiện trên dev. Kích thước viewport là kích thước yêu cầu của trình duyệt; scrollbar có thể chiếm một phần chiều ngang nội dung.

- [Trước — desktop](./mockups/redesign-v2-round1-before-desktop-1440x900.jpg)
- [Trước — mobile](./mockups/redesign-v2-round1-before-mobile-390x844.jpg)
- [Sau — desktop 1440×900](./mockups/redesign-v2-round1-desktop-1440x900.jpg)
- [Sau — desktop 1920×1080](./mockups/redesign-v2-round1-desktop-1920x1080.jpg)
- [Sau — mobile 390×844](./mockups/redesign-v2-round1-mobile-390x844.jpg)
- [Sau — tablet 768×1024](./mockups/redesign-v2-round1-tablet-768x1024.jpg)
- [Menu mobile](./mockups/redesign-v2-round1-mobile-menu.jpg)
- [Header khi cuộn](./mockups/redesign-v2-round1-header-scrolled-desktop.jpg)

## 6. Việc còn lại và giới hạn

- Lượt 2: R3F/Drei, hình khối/vật liệu, camera, mở dải/tách/hợp lớp, fallbacks và đo GPU/JS/model. Chưa có motion 3D trong bản này.
- Lượt 3: vật thể sản phẩm/section phía dưới Hero, giảm chữ và motion bổ trợ; các section đó vẫn là bản demo cũ.
- Lượt 4: Lighthouse, 200% browser zoom, browser session thực sự tắt JS/reduced-motion/Save-Data và thiết bị GPU yếu; chưa báo các kiểm tra này đã đạt. Lượt 1 không tải canvas nên việc xem Hero tĩnh không đòi WebGL.
- Poster AI chỉ phục vụ demo; cần render từ scene được duyệt/asset được phép trước khi production.
- Không thử gửi form hoặc kích hoạt webhook/email/database/ERP, không deploy.

## 7. Khôi phục

Snapshot trước sửa: `references/work-snapshots/round1-20261017/`, danh sách file gốc ở `MANIFEST.txt`. Sao chép file gốc tương ứng về đúng đường dẫn để khôi phục; kiểm tra đường dẫn workspace trước khi thao tác. Giữ bản concept/screenshot lịch sử.

Riêng bản gốc `CorporateIntro.tsx` được phục hồi vào snapshot bằng cách đảo đúng một dòng anchor đã thêm, vì file này chưa nằm trong lượt sao chép đầu; chi tiết ở `INTRO_BACKUP_NOTE.txt`. Những file gốc còn lại được sao chép trước khi sửa.

Các file mới cần ghi nhận khi rollback: hai poster trong `public/images/hero/`, báo cáo này và log prompt poster. Có thể ngừng tham chiếu chúng sau khi phục hồi source; không xóa hàng loạt thư mục hoặc ghi đè toàn bộ dự án. Hiện không có Git repository để giả định rollback theo commit.

Server kiểm tra hiện chạy bằng `npm run start -- --hostname 127.0.0.1 --port 3010`. Khi chuyển sang phát triển lượt sau, dừng đúng server local này trước khi chạy dev trên cùng port; không chạy build đồng thời với dev dùng chung `.next`.
