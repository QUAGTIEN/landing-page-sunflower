# SUNFLOWER — PAGE STRUCTURE & FUNCTIONAL SPECIFICATION v2.1

> **Products orbit E1 · 2026-10-19:** `/san-pham` Hero now explores six existing families, one representative cutout each, with stable labels and a link to the selected canonical category. All 13 catalog groups/filter/specifications/quote queries remain unchanged. Server HTML includes images/CTA and six noscript links; keyboard/manual controls enhance it. Mobile uses one selected object without auto motion. Homepage remains poster-only; E2/3D pending. See `PRODUCTS_ORBIT_REPORT.md` for evidence and test limits.

> **Header dropdown · 2026-10-17:** Owner-approved click-open subnavigation implemented for Products (6 families/13 categories), Solutions (4), Capabilities (4), with parent-page links. Native disclosures, mobile nested accordion, keyboard/outside/route/resize cleanup; seven routes/quote flow retained. See HEADER_DROPDOWN_REPORT.md; earlier flat-header rules below are historical. No orbit/3D/backend.

> **Typography/layout revision · 2026-10-17:** Owner-approved Word feedback implemented: Inter sans for readable UI, common support/body text 14/16px, About tactile profile/value surfaces and six object families, clearer Home applications/Capabilities, responsive server-rendered material table/cards with identical data. Seven routes/catalog/quote contracts retained. See TYPOGRAPHY_LAYOUT_REPORT.md. This supplements round 3; orbit/3D remains last.

> **Current round 3 · 2026-10-17:** UI polish implemented: aligned gutters, concise headings, native technical disclosures, ivory/beige editorial rows, existing unbranded cutouts reused in Solutions/Projects, readable accent text, form error/focus improvements and truthful demo copy. Seven routes/13 canonical categories preserved. Homepage remains poster-only, no orbit/3D. Scope/checks/limits: POLISH_ROUND3_REPORT.md. Round 4 remains pending; older status notes below are historical.

> **Current round 2 · 2026-10-17:** The five remaining interior Heroes are implemented, so all seven first-level pages now have a distinct main Hero. About/Capabilities link to existing content headings, Solutions/Projects to index anchors, Contact to a server-rendered quote anchor outside Suspense. Contact form is first in DOM/mobile, while desktop retains contact info left/form right. Original query/state/handlers/field IDs and all catalog contracts are preserved. No routes/backend added. See INTERIOR_ROUND2_REPORT.md; older “round 2 pending” notes below are historical.

> **Current implementation · 2026-10-17:** Products Hero and all 13 alpha catalog objects are implemented in the first of the next four rounds. Canonical catalog data, seven routes and inquiry context are preserved; filter/anchor/disclosure/prefill checks passed. See CATALOG_ROUND1_REPORT.md for actual evidence and verification limits. Five remaining interior Heroes follow in round 2 of this new sequence.

> **Owner-approved next round · 2026-10-17:** Implement Products static Hero and all 13 cutout catalog groups first. Preserve canonical names, slugs, six families, applications/specifications, quote fields and query-prefill contract; long specifications may move into native details. Six-family filtering and links to all 13 anchors remain functional, including jumps from a filtered state. Five other interior Heroes follow in the next round. No new routes, backend or production integration; homepage keeps its poster.

> **Latest owner decision · 2026-10-17:** Homepage currently uses the approved poster only, with native scrolling straight into the next section. Defer all Hero 3D interactions until the other site work is complete. Round 3 can proceed without live-Hero acceptance; see `IMPLEMENTATION_PLAN.md` section 9.2. Seven routes and existing quote/content contracts remain in force.

> **Round 3 implementation · 2026-10-17:** Homepage flow is poster → concise introduction → three-product selector → dark capability/process section → four application links → illustrative project/configuration links → quote preparation → shared CTA/footer. Full specifications and all 13 canonical product groups stay on `/san-pham`. Family links now point to the first existing category anchor rather than nonexistent family-ID anchors. No route, catalog schema or backend destination changed.

> **Updated:** 2026-10-16 · **Scope:** Greenfield public corporate website build (not ERP internal UI).  
> **Architecture locked:** 7 first-level pages. **Visual direction:** Refined Industrial Minimalism / MWDT-inspired + **Immersive 3D Hero**.  
> Business descriptions, media permissions and production integrations must be confirmed by Sunflower (`TODO_CONTENT` used for unverified fields).

> **Owner update · 2026-10-17:** Approved concept 03 and authorized round 1. Home Hero is now a full-bleed studio with live HTML headline/CTA; a static art-directed poster is used in round 1. The separate material-explanation block is removed. Round 2 adds the shared live 3D timeline. Seven routes, 13 categories and quote context contracts remain unchanged. See `IMPLEMENTATION_PLAN.md` section 9 for the four-round plan.
> **Round 2 progress:** Owner-approved React/R3F/Drei synchronization is complete; one live procedural scene now runs with camera, native-scroll layer separation and poster fallbacks. Browser evidence and remaining visual-quality/GLB proposal are in `ROUND2_REPORT.md`. Hero quality is not yet accepted; round 3 has not started. Route/content/backend contracts are unchanged.

## 0. Responsibilities of the 3 documents

| Document | Source of truth |
| --- | --- |
| `/AGENTS.md` | How agents audit/build, approval gates, code discipline, QA |
| `/docs/DESIGN_SYSTEM.md` | How every page looks and moves: warm neutral palette, typography, components, 3D hero spec, image standards |
| `/docs/PAGE_STRUCTURE.md` | What to build: page map, feature requirements, data contracts, UX journeys and acceptance |

**Greenfield discipline:** Build cleanly once according to the 7-page architecture, 13 product groups and B2B quote journeys. Keep structured data in `src/content/` separated from presentation components.

## 1. Locked sitemap (7 first-level pages)

```text
/                          Trang chủ / brand landing
/gioi-thieu                Thương hiệu & câu chuyện Sunflower
/san-pham                  Danh mục sản phẩm & vật tư
/giai-phap                 Giải pháp theo nhu cầu B2B
/nang-luc                  Năng lực thiết kế / sản xuất / vận hành
/du-an                     Thành phẩm và dự án được phép công bố
/lien-he                   Liên hệ / yêu cầu báo giá / hợp tác
```

Optional **second-level** routes such as `/san-pham/[slug]` and `/du-an/[slug]` are only implemented when content and approval exist. System routes (`not-found`, `robots`, `sitemap`, privacy where legally necessary) do not count toward 7 pages.

### Navigation contract

- Header logo → `/`; navigation includes `Trang chủ`, `Giới thiệu`, `Sản phẩm`, `Giải pháp`, `Năng lực`, `Dự án`; primary button `Yêu cầu báo giá` → `/lien-he`.
- Footer provides all 7 pages, verified company contacts and approved legal links; `Liên hệ` need not be a separate top-nav text item if the quote button supplies direct access.
- Active nav style is a **quiet charcoal underline, dot or weight change**—not a bright blue/orange strip.
- Mobile menu accessible: Escape closes, click outside if implemented, focus managed, no content trap.
- Site logo has a color treatment approved by owner. Do not silently convert the official blue/orange logo to beige.

### Content principles

- Default language: Vietnamese, formal but not stiff; support internationalization only if required.
- Keep website **B2B lead generation**, not a checkout/store; no forced registration, fake pricing or fake online stock.
- Every page has a unique H1, metadata and one clearly defined primary CTA.
- Use approved product/workshop photography with image caption/source rights stored separately; placeholder images must not imply evidence of specific company operations.
- When missing facts, draft internally with `TODO: Xác nhận với Sunflower`; not live claims.

## 2. Detailed pages, section layout, interactions and acceptance

### P01. TRANG CHỦ — `/`

**Jobs:** Make the industry, differentiator and quote path clear within seconds; make a lasting premium visual first impression, then offer directly scannable information for purchasing teams.

**New v2 section order:**

| # | Section | Desktop composition & content | Interaction / destination |
| --- | --- | --- | --- |
| 01 | `SiteHeader` | Ivory backdrop; precise aligned logo (mono/neutral approved variant or original)/nav/dark quote button | Nav 7-page journeys; sticky if unobtrusive |
| 02 | `HeroProductStage` | Full-bleed warm studio: HTML H1 (`Tem nhãn. Tạo dấu ấn.`), short copy/CTA on left, main white label roll with secondary ivory products on right. Integrated header; portrait poster on mobile/tablet. Static poster foundation in round 1. | `Khám phá sản phẩm` → `/san-pham`; secondary → `/lien-he`; native scroll cue → company intro |
| 03 | Material motion inside Hero (round 2) | Strip opens, illustrative layers separate/recombine within the same scene. No standalone explanatory section, layer list, callout controls or S0–S5 UI. | Scroll-scrubbed scene; static poster fallback |
| 04 | `CorporateIntro` | Simple typographic statement + one approved industrial photo or paper/material macro | `/gioi-thieu` |
| 05 | `FeaturedProducts` | **Editorial alternating rows** for 3–4 proven categories; product against ivory/studio white; thin separators | Product category → `/san-pham`, optionally approved detail route |
| 06 | `SolutionsAndApplications` | 2–4 real buyer use cases, clean image/text rows—not repetitive generic cards | `/giai-phap` |
| 07 | `Capabilities / Process` | Photo-led production/inspection narrative; honest steps, few high-contrast sections | `/nang-luc` |
| 08 | `SelectedWork` | Product image gallery or licensed work; image-first | `/du-an` |
| 09 | `InquiryCTA + Footer` | Calm graphite/charcoal or warm beige; human, direct call-to-action | `/lien-he`, verified contact details |

**Flagship experience:** `HeroProductStage` owns the full-bleed studio and one lazy-loaded R3F + GSAP timeline planned for round 2; no separate `MaterialStory` section. Round 1 renders static art-directed posters and HTML content on the server without importing the old canvas. The header, H1 and CTA work before WebGL/JavaScript loads; mobile navigation uses native disclosure. No scroll-jacking. Preserve the static poster for mobile/low-power/reduced-motion/no-JS fallbacks when live 3D is introduced.

**Accept when:** clear value proposition, visually focused 3D Hero + material breakdown, reliable navigation, no false stats/media, correct quote links, mobile screenshot coherent and 3D degrades gracefully.

### P02. GIỚI THIỆU — `/gioi-thieu`

**Buyer question:** *Sunflower là ai? Họ có định hướng, con người và sự đáng tin cậy ra sao?* Distinct from `/nang-luc`, which demonstrates *how* the work is done.

**Sections:**

1. `AboutHero`: direct editorial H1 + one authentic factory/studio/product image, neutral backdrop.
2. `OriginAndStory`: company history and specific facts only after approval; no fictitious timeline.
3. `PurposeAndValues`: short mission, vision, core values **only if verified**; may use plain text instead of cards.
4. `PeopleAndApproach`: genuine team/process images if approved; narrative on buyer relationships and collaboration.
5. `TrustEvidence`: verified milestones, supplier relationships or documents; omit rather than fabricate.
6. `ConnectCTA`: `/lien-he`, optional `/nang-luc`.

**Functions:** anchor navigation for long page only when valuable; image caption, CTA to catalogue/capabilities; links functional. No autoplay testimonials or fake metrics.

**Visual rule:** warm ivory/charcoal, large hero text and a real photograph with clean crop. Replace the old full-navy/about backdrop with primarily light neutral; one small contrasting graphite region allowed.

**Acceptance:** reader understands business identity, authentic images, no repeated copy from Home, no unverified claims.

### P03. SẢN PHẨM — `/san-pham`

**Buyer question:** *What exact kind of labels/printing supply can Sunflower help with? What information should I provide for a quote?*

**Source taxonomy:** 13 labels seen in Sunflower's existing product selection UI; use the current website/database as source of truth to confirm live products before release:

| Family for navigation/display | Product category (canonical working label) | Suggested slug (confirm existing before changing) |
| --- | --- | --- |
| Tem nhãn dạng cuộn | Tem trắng dạng cuộn | `tem-trang-cuon` |
| Tem nhãn dạng cuộn | Tem màu dạng cuộn | `tem-mau-cuon` |
| Tem nhãn dạng tờ | Tem trắng tờ | `tem-trang-to` |
| Tem nhãn dạng tờ | Tem màu dạng tờ | `tem-mau-to` |
| Vật tư in | Giấy | `giay` |
| Vật tư in | Mực in Ribbon | `muc-in-ribbon` |
| Thiết bị mã vạch | Máy in mã vạch | `may-in-ma-vach` |
| Thiết bị mã vạch | Máy quét mã vạch | `may-quet-ma-vach` |
| Bao bì & phụ kiện | Hộp | `hop` |
| Bao bì & phụ kiện | Thẻ bài | `the-bai` |
| Nhãn may mặc | Tem dệt | `tem-det` |
| Nhãn may mặc | Tem vải nylon / satin | `tem-vai-nylon-satin` |
| Vật tư in | Băng dính | `bang-dinh` |

**Important:** Do not migrate/rename existing persisted slugs just to match suggested spellings above. `Giấy` is an umbrella category and must be refined with company-provided subtypes if needed. This display grouping does not claim every product is currently in stock.

**Sections:**

1. `CatalogHero`: direct statement on finished products/materials; one accurate image.
2. `FamilyNavigator`: 5–6 families/anchor tabs, optional mobile horizontal scroller with visible indicator.
3. `ProductCollection`: consistent 4:3 or 1:1 real-product images, concise technical labels, simple dividers; **not many heavy cards**.
4. `FeaturedProductEditorial`: large alternation for only 2–3 hero categories (e.g. white rolls, color rolls, printed boxes), not 13 massive sections.
5. `ProductSpecificationGuide`: what to send—dimensions, substrate, print colors, quantity, roll core/presentation, intended use; show only fields relevant to category.
6. `ProductInquiryCTA`: product-aware contact link.

**Behaviors:**

- Search/filter **only if there are enough items and real data**; must actually change results and have empty state.
- Image enlarge/lightbox where warranted; keyboard closing and accessible labeling.
- Each category includes `Yêu cầu báo giá` that routes to `/lien-he?san-pham=<approved-slug>`, with server/client allowlist validation.
- Optional `/san-pham/[slug]` pages require approved content/assets; don't build empty shells.
- **No** cart, checkout, live stock, fake discount, fabricated unit pricing, rating stars.

**Visual rule:** mostly ivory, warm gray stages and real photos. Current screenshot shows mismatched grey/white/wood photography and large blue headings; convert to cohesive studio photography, charcoal titles and restrained image scale.

**Acceptance:** all verified categories accessible; accurate photos, no third-party copyrighted logos without license; real quote context, responsive catalogue.

### P04. GIẢI PHÁP — `/giai-phap`

**Buyer question:** *My business has this problem; which Sunflower product/approach should I discuss?* Do not duplicate the product list.

**Sections:**

1. `SolutionsHero`: specific promise; problem-led, not “best-in-market”.
2. `UseCaseIndex`: buyer needs or application industries **only as supported by Sunflower records**.
3. `SolutionStories`: `Nhu cầu → Lựa chọn vật liệu/quy cách → Loại sản phẩm liên quan → Điểm cần xác nhận` in an editorial split/photo format.
4. `SelectionGuide`: optional decision matrix or brief specifications, no unverified results.
5. `TalkToSalesCTA`: open `/lien-he?nhu-cau=<slug>`.

**Interactions:** accessible tab/anchor to use cases if content volume justifies; links to relevant product families and form prefill. No false calculators or animations that distract from specifications.

**Visual rule:** large real-world use-case photos; text in neat columns with subtle rules; avoid cards for every pain point.

**Acceptance:** each solution provides concrete next step, claims approved, links correct.

### P05. NĂNG LỰC — `/nang-luc`

**Buyer question:** *Can Sunflower actually manufacture/coordinate my order at the quality/specification needed?*

**Sections:**

1. `CapabilitiesHero`: light/neutral industry photo, hard-working direct headline.
2. `CapabilityIndex`: verified services (design/prepress, printed labels, material sourcing, machining/printing finishing **only if actually done**); precise bullet/spec format.
3. `EquipmentAndMaterials`: actual machines, print/label stock, tools, surfaces; meaningful captions and verified facts.
4. `ProcessNarrative`: 4–6 confirmed steps from requirement and sample to production, quality control and dispatch.
5. `QualityAndTraceability`: procedures, artifacts and evidence where verified; no claims of certification without proof.
6. `CompanyProfileDownload`: optional approved PDF; never a dead download link.
7. `QuoteCTA`: `/lien-he`.

**Interactions:** photo gallery, optional expand/collapse for detailed technical explanation, clear downloadable materials. One visual explanation may be animated *if it supports process understanding*.

**Visual rule:** MWDT-inspired technical clarity—photo left/right, thin dividers, labels, relevant spec. Replace giant navy arcs with restrained background; preserve actual machine/photo presence. Dark graphite permitted as **one** intentional feature section.

**Acceptance:** provides proof-oriented content; photos and specifications factual; CTA works; no unsupported performance numbers.

### P06. DỰ ÁN — `/du-an`

**Buyer question:** *What has Sunflower made and what finish can I expect?*

**Sections:**

1. `ProjectsHero`: concise introduction to authorized portfolio.
2. `WorkGallery`: consistent premium finish photos, clear type labels.
3. `CategoryFilter`: only if useful and actually filters content.
4. `FeaturedCase`: optional case stories `Bài toán → Yêu cầu → Phương án → Thành phẩm`, only with customer clearance.
5. `SimilarProjectCTA`: links to `/lien-he?du-an=<approved-slug>`.

**Interactions:** gallery expand/zoom, keyboard-safe close, link to authorized second-level case page only if published, optional filter tags.

**Visual rule:** look like an industrial product portfolio with large surfaces and disciplined white space. Do not overlay loud colorful interface accents onto the work.

**Acceptance:** source permissions, high-resolution but optimized images, no hidden client details, good mobile crop.

### P07. LIÊN HỆ — `/lien-he`

**Buyer question:** *Can I quickly send a useful brief, and will the business actually receive it?*

**Sections:**

1. `ContactHero`: short, approachable but confident, off-white background.
2. `VerifiedContacts`: company address, phone, email and business hours **only as confirmed**; map only if actual address is approved.
3. `InquiryForm`: product quote / general consultation / partnership modes (one form may handle all).
4. `PreparationGuide`: relevant spec fields to gather—type, dimensions, material, artwork, quantity, delivery location.
5. `PrivacyNote`: concise handling statement and relevant policy if required.
6. `Footer`.

**MVP fields:** contact name; email **or** phone; inquiry message; optional company, request purpose, category/selected product, quantity, size, material, delivery location/date. For some categories (printers/scanners), use model/quantity rather than label-roll dimensions. Do not display every technical field for every product indiscriminately.

**Functionality contract:**

- Validate on client and server; reject invalid/oversized input; conditional context from query requires allowlist.
- `idle → validating → submitting → success/error`, with meaningful feedback and prevented duplicate submits.
- Spam protection (rate limiting, honeypot or approved provider), secure storage/notifications and limited data exposure.
- No upload unless storage policy, file constraints and permissions are agreed.
- **Never show false success** if request was not delivered; if backend not ready, show honest demo/disabled state.
- ERP/Firebase internal integration is **not** automatic; requires business approval and credentials maintained server-side.

**Visual rule:** warm ivory with clear charcoal form elements and focus rings; avoid orange CTA and dark navy background entirely unless one small approved contrast block is useful.

**Acceptance:** quote form genuinely delivered or transparently non-live; all links verified; responsive and keyboard accessible.

## 3. Shared components and architecture

| Component | Where | Contract |
| --- | --- | --- |
| `SiteHeader`, `SiteFooter` | All | Navigation, approved logo, links, CTA, mobile menu |
| `PageHero` | 6 interior pages | 1 H1, one focal image or statement, proper metadata |
| `HeroProductStage` | Home | Fast static first render, optional single progressive-enhancement motion |
| `ProductEditorialRow` | Home/Products | Alternating large image and minimal copy |
| `ProductStage` | Products/Projects | Uniform photo stage, stable aspect ratio and src set |
| `ProductCollection` | Products | Data-driven categories, no repetitive markup |
| `ProcessTimeline` | Capabilities/Home | Real verified production steps, non-animated fallback |
| `ProjectGallery` | Projects/Home | Rights-cleared images with captions |
| `QuoteRequestForm` | Contact | Client/server validation and truthful delivery state |
| `SectionHeading`, `TextLink`, `PrimaryButton` | All | Semantic tokens, focus/hover accessible |
| `LabelRollScene` (`src/components/three/`) | Home only | Lazy-loaded R3F 3D label roll + exploded material layers driven by GSAP ScrollTrigger, static poster default |

**Storage layout:**

```text
sunflower-website/
├── AGENTS.md
├── docs/
│   ├── DESIGN_SYSTEM.md
│   └── PAGE_STRUCTURE.md
├── references/                        # AI concepts, website samples, intake photos; NOT published
├── public/
│   ├── images/brand/
│   ├── images/hero/
│   ├── images/products/
│   ├── images/company/
│   ├── images/projects/
│   ├── videos/manufacturing/            # when needed
│   ├── sequences/label-roll/            # only if fallback sequence used
│   └── models/                          # only if GLB/R3F model used
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── gioi-thieu/page.tsx
│   │   ├── san-pham/page.tsx
│   │   ├── giai-phap/page.tsx
│   │   ├── nang-luc/page.tsx
│   │   ├── du-an/page.tsx
│   │   ├── lien-he/page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── sections/{home,about,products,solutions,capabilities,projects,contact}/
│   ├── components/{layout,ui,products,contact,animations,three}/
│   ├── content/{company,navigation,products,solutions,projects}.ts
│   ├── lib/
│   └── types/
└── package.json
```

## 4. Data contracts and source-of-truth

```ts
// Illustrative types; adapt to the real codebase, never overwrite real DB schema.
type ProductCategory = {
  slug: string; name: string; family: string;
  summary?: string; specifications?: { label: string; value: string }[];
  images: { src: string; alt: string; rightsStatus?: string }[];
};
type Solution = {
  slug: string; title: string; problem: string;
  approach: string; relatedProductSlugs: string[];
};
type Project = {
  slug: string; title: string; images: string[];
  permissionToPublish: boolean;
};
type ContactInquiry = {
  purpose: "quote" | "consultation" | "partnership" | "other";
  contactName: string; email?: string; phone?: string;
  company?: string; productSlug?: string; request: string;
  quantity?: string; dimensions?: string;
};
```

- Public catalogue can live in typed `src/content/` initially, with asset metadata and public copy separated from components.
- A CMS is optional and should only be added when real editing frequency/roles justify it.
- Contact inquiries involve personal/business-sensitive content; must use secured server integration and an approved retention policy.
- No data from the private ERP is exposed publicly merely because both brands share a name.

## 5. End-to-end user journeys (must survive redesign)

1. **Buyer knows product:** Home → Products → category/specs → Contact prefilled with product context → confirmed inquiry.
2. **Buyer needs advice:** Home/Solutions → use case → related product → Contact with need context.
3. **Procurement evaluates supplier:** Home → Capabilities → Projects → Contact.
4. **Business partner:** About → Capabilities → Contact, purpose = Partnership.
5. **Mobile browsing:** Header menu → desired route → contact CTA; no animation overlays or content inaccessible without hover.

Tracking analytics, consent banners, live chat and newsletter are **not** automatic scope. Discuss before adding.

## 6. SEO, accessibility, performance and verification

- Unique `title`, meta description, H1 for every page; correct canonical slug, OG image, meaningful section headings.
- Organization structured data only with **verified** company details; images must have meaningful alt text or decorative empty alt.
- For non-interactive motion decoration use static semantic HTML content as foundation; never hide the headline behind a WebGL load.
- Target accessible body/link/input text contrast. Visible focus, keyboard nav, meaningful form error labels; reduced-motion stops decorative movement.
- Test 390×844, 768×1024, 1440×900, plus 1920×1080 where useful; check 320px and zoom. Avoid horizontal overflow, snap scroll trapping and unexpected page jumps.
- Avoid heavy hero downloads on cellular. Defer high-quality frames/video/3D until needed and keep static poster fast.
- Check source asset licensing and copyright; screenshot references are **not** public assets.

## 7. Phased implementation plan (stop for approval at each milestone)

**Phase 0 — Mockups & 3D Storyboard (no code):** audit references/intake assets; produce visual mockups for Header + Hero (desktop & mobile), Product Showcase, one Capabilities section, CTA/Footer, mono logo variant, and a 6-step scroll storyboard for the 3D Hero.

**Phase 1 — Foundation:** initialize Next.js + TypeScript + Tailwind CSS, folder structure, warm neutral CSS variables, `Inter` typography, layout shell (`SiteHeader`, `SiteFooter`), 7 route stubs and typed data in `src/content/`.

**Phase 2 — Header, 3D Hero & Homepage:** build the approved full-bleed static Hero + HTML H1/CTA first (redesign round 1); add R3F + Drei + GSAP scroll-driven material separation in the same Hero (round 2), then refine other homepage sections (round 3). The owner removed the standalone `MaterialStory` explanation. Review screenshots/motion at the milestones in `IMPLEMENTATION_PLAN.md` section 9.

**Phase 3 — Six interior pages:** implement `/san-pham`, `/gioi-thieu`, `/nang-luc`, `/giai-phap`, `/du-an`, `/lien-he` using structured content and approved/placeholder media.

**Phase 4 — Functional integrations & approved enhancements:** server-side quote form validation + email/API hookup when credentials are supplied, optional Zalo contact / PDF profile download / GA4 when verified.

**Phase 5 — QA & Vercel deployment:** lint/typecheck/build, browser screenshots (390×844, 768×1024, 1440×900, 1920×1080), reduced-motion & no-WebGL fallback checks, accessibility, metadata, Vercel preview deploy.

### Definition of Done per page

- [ ] Route path and functional goals fulfilled.
- [ ] Main visual is genuinely product/process-oriented; no bright blue/orange UI.
- [ ] Warm monochrome tokens, typography and section rhythm consistently applied.
- [ ] Realistic photos, copyright permission and accurate alt/captions (`TODO_CONTENT` where unverified).
- [ ] CTA/nav/search/filter/form behave truthfully (no fake success state).
- [ ] Responsive and reduced-motion behavior validated.
- [ ] Metadata, keyboard/focus, accessibility and performance basics checked.
- [ ] Desktop & mobile screenshot evidence recorded at each milestone.
- [ ] Any unavailable data/backend/asset and approval blockers reported explicitly.

## 8. Decisions already fixed vs still needing owner input

**Fixed (2026-10-16):** Greenfield Next.js App Router + React + TypeScript + Tailwind CSS + GSAP ScrollTrigger + React Three Fiber/Drei; Vercel deployment; 7 public first-level pages; 13 product categories; B2B catalogue and quote flow; Refined Industrial Minimalism warm neutral palette; mono/neutral logo variant allowed (pending visual signoff); Immersive 3D white adhesive label roll Hero with scroll-driven material layer breakdown.

**Need approval / real evidence:** Phase 0 mockups & 3D storyboard signoff; vector logo master (SVG/AI) if available; confirmation of exact material layers for Sunflower's flagship label stock; replacement/clearance for intake product photos containing third-party trademarks; verified company profile facts, contact details, email delivery credentials, and client project permissions.
