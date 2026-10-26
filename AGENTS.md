# AGENTS.md — SUNFLOWER WEBSITE / AI AGENT WORKING RULES

> **Version 2.1 · 2026-10-16 · Approved direction: Refined Industrial Minimalism (MWDT-inspired) + Immersive 3D Hero**  
> Scope: public-facing Sunflower Corporate Website. **Do not modify Sunflower ERP** under these instructions.  
> Applies to any coding agent (Codex, Antigravity, …). Read this file first, then `docs/DESIGN_SYSTEM.md`, `docs/PAGE_STRUCTURE.md` and `references/README_REFERENCES.md` **before** editing UI.  
> **v2.1 changes:** project is now **greenfield** (no legacy source code); homepage Hero is an approved **immersive, scroll-driven 3D label-roll experience**; tech stack and phases locked by owner answers (2026-10-16).

## 0. Project identity and non-negotiables

Sunflower is a Hanoi-based business working with **label design/production, printed packaging and printing supplies**. Build an informative B2B corporate website whose purpose is to (a) establish trust, (b) present real products/materials, (c) explain solutions/capabilities and (d) collect actual quote/contact requests.

**Approved sitemap — exactly 7 first-level pages:**

1. `/` — Trang chủ
2. `/gioi-thieu` — Giới thiệu
3. `/san-pham` — Sản phẩm
4. `/giai-phap` — Giải pháp
5. `/nang-luc` — Năng lực
6. `/du-an` — Dự án
7. `/lien-he` — Liên hệ & báo giá

**Design direction is LOCKED:** `Refined Industrial Minimalism` — visually direct, calm, precise, premium B2B, with a **warm ivory / beige / warm gray / charcoal / muted metallic-neutral** palette. **Bright blue and orange/yellow from the logo are NOT the website UI palette.** The owner **approved designing a mono/neutral logo variant** (charcoal on light, warm white on dark) that keeps the original symbol structure (gear + S + label roll); the variant must be approved before production use. Never redesign the symbol itself or silently recolor the official brand file.

**Homepage Hero exception (approved):** the Hero is an **Immersive 3D Product Experience** — a realistic white adhesive label roll in a soft studio scene, scroll-driven camera and material-layer breakdown. It is not limited to MWDT's static product-on-the-right layout. All other sections stay industrial-minimal and scannable.

References and their roles (see `references/README_REFERENCES.md`):

- [MWDT](https://mwdtinc.com/) + [designer's case study](https://kristopherray.com/projects/mwdt/): typography, industrial minimalism, directness, layout rhythm, RFQ emphasis.
- Revolve Robotics (owner screenshot): split hero, one large product, generous negative space.
- [Fizzi 3D](https://e-commerce-fizzi.vercel.app/) ([source](https://github.com/JackByteBack/E-Commerce-fizzi)): scroll-linked 3D product motion with Next.js + R3F + GSAP.
- [Ori Scan](https://ori-new-version.webflow.io/): realism, lighting, materials, premium 3D presentation.

Take away **principles**; do **not** copy any reference's branding, images, models, layout exactly or copywriting.

The actual MWDT effect is a **90-frame image sequence with GSAP ScrollTrigger**, not a live WebGL model. Sunflower's approved approach is **live 3D via React Three Fiber** (procedural or GLB model); an image sequence remains a fallback option. Never misrepresent rendered frames or AI concepts as real products.

## 1. Rule hierarchy

1. Latest approved user instructions and provided real company information.
2. This root `AGENTS.md` for workflow/scope.
3. `docs/PAGE_STRUCTURE.md` for pages, content and behavior.
4. `docs/DESIGN_SYSTEM.md` for visual tokens, layout and motion.
5. Reference screenshots/websites for inspiration only.

When a style request conflicts with a functional contract, **preserve functionality** and propose a visual treatment. If a change impacts page architecture, data semantics, branding, backend, asset license or user journeys, request approval first.

## 2. Greenfield setup (no legacy source code)

The owner confirmed (2026-10-16) this is a **greenfield project**: no legacy source code is available. Build a new Next.js app **once**, in a single project folder; do not scaffold parallel apps or throw away approved work between phases.

Before writing code:

- Read the 3 docs + `references/README_REFERENCES.md`; inventory reference images, intake product photos and missing content.
- Produce **mockups + a scroll storyboard for the 3D Hero** (Phase 0) and get approval before implementation.
- Submit a scoped plan listing folders/files, dependencies, asset needs, risks and fallback before each phase.
- Keep visual baselines at 390×844, 768×1024, 1440×900 and, where practical, 1920×1080 for every approval milestone.

**Legacy website lessons (from owner's old screenshots; keep as content/UX guidance):**

1. **Header:** retain site hierarchy and 7-page navigation; restyle white/ivory + charcoal, dark CTA; avoid bright orange.
2. **Home Hero:** retain concise headline `Tem nhãn. Tạo dấu ấn.` if approved; remove competition between industrial video, flat illustration and large blue geometric block. Feature ONE believable label/packaging product subject (or an approved film still) as focal point; support an optional hero scroll sequence.
3. **Dark blue product material section:** replace huge blue backdrop and simplified vector elements with tactile product/material photography or a verified technical cutaway/sequence on ivory/graphite; keep the technical storytelling purpose.
4. **Work process/capabilities:** keep the editorial/photo-led storytelling; reduce giant curves and decorative shapes; standardize image crops and color grades.
5. **Product catalog:** keep the 13 existing product groups and quote pathways. Normalize image backgrounds, scale and aspect ratios; remove mismatched stock-photo treatments.
6. **CTA/footer:** preserve lead-conversion purpose; replace hard blue/orange with warm graphite and ivory; prevent oversized blank fields or isolated CTA.
7. **About:** keep trustworthy factory imagery and succinct corporate narrative; don't imply stock footage is Sunflower's actual production facility.

## 3. Visual discipline — what to do and NOT to do

**Do:**

- Use the semantic tokens specified in `docs/DESIGN_SYSTEM.md`; no scattered `#005...` blue or `#FF8...` orange in newly edited UI.
- Prefer **editorial split layouts**, full-width product/factory photography, typographic headings, restrained thin rules, genuine negative space and clear hierarchy.
- Use **one focal object per major scene**. A large image/model is more effective than 4 competing layers.
- Present products accurately: white label rolls, colored printed rolls, sheets, paper, ribbons, scanners/printers, folding boxes, tags and fabric labels **according to real inventory**.
- Let real printed products provide color. Use dark sections sparingly to establish a deliberate rhythm.
- Keep hover and motion restrained, meaning-based, fast enough for interaction and fully accessible.

**Do not:**

- Add blue/orange or purple/blue gradient panels, glowing borders, glassmorphism, generic SaaS card grids, arbitrary “AI-generated tech” particles or floating icons.
- Add giant asymmetric blobs/curves purely for decoration or repeated pill-like containers.
- Use cartoon or low-poly 3D, continuous decorative spinning, fast/bouncy animation.
- Create fake stats, factory capabilities, certifications, testimonials, customers, project results, brand partners or price figures.
- Use images of other companies' factories or copyrighted customers' labels and imply they are Sunflower's own.
- Publish product photos showing **third-party trademarks/customer artwork** (e.g. brand names printed on sample labels, tags, tapes, ribbons) unless rights are documented. Equipment brand names (printer/ribbon manufacturers) only if Sunflower actually distributes them and the owner confirms.
- Copy a whole animation/3D repository into production source just to reuse one effect.
- Add animation libraries beyond the approved stack (GSAP + ScrollTrigger, R3F, Drei) when CSS or an installed dependency can deliver the behavior.
- Implement cart, checkout, inventory, login or public ERP functions without an approved requirement.

## 4. Truthful content and public media

- Write in natural Vietnamese for B2B buyers. Use concrete language about product, materials, specifications and workflow; avoid ungrounded claims.
- Missing company evidence: `TODO: Xác nhận với Sunflower`, displayed only in drafts/admin; do not publish fake content.
- New/copyedited text must be reviewed for factual accuracy and business meaning.
- Record asset source, attribution needs, license and permission. Stock footage/images must be marked illustrative where appropriate.
- No publication of client artwork, logos, personal records, ERP CRM/PO information or factory details without authorization.
- Existing brand mark may be used in the header, but proposing a new neutral/monochrome lockup requires approval and accessible contrast checks.

## 5. Technology and code organization

**Locked stack (owner, 2026-10-16):** **Next.js App Router + React + TypeScript + Tailwind CSS**, **GSAP + ScrollTrigger** (scroll timelines), **Three.js via React Three Fiber + Drei** (3D), deployed on **Vercel** (preview domain during development; official domain later). No CMS in MVP; no Firebase until requested. Motion/Lenis/other libraries only with a demonstrated need. Do not upgrade major dependencies mid-project unless requested.

- Routes: `src/app/*/page.tsx`.
- Section code specific to a page: `src/sections/{home,about,products,solutions,capabilities,projects,contact}/`.
- Reusable primitives: `src/components/ui/`, site structure `src/components/layout/`.
- Motion/reusable effects: `src/components/animations/`; 3D scene, models, materials and scroll timeline in `src/components/three/` (client-only, lazy-loaded).
- Media: `public/images/`, `public/videos/`, `public/models/` (GLB when used), `public/sequences/` (only if image-sequence fallback is approved).
- Reference screenshots, AI concepts, intake photos and external repos: `references/`, **not published from `/public`**. Copy a file to `public/` only after it is approved and its source/licence is recorded in `src/content/`.
- Asset metadata and content: `src/content/`; shared types in `src/types/`.
- Avoid duplicated class strings and scattered magic values; use design tokens and reusable patterns.
- Prefer Server Components. Use `"use client"` only for interactions, browser APIs, motion and 3D canvases that actually need them.
- Never bury client secrets, API tokens or unredacted business data inside the frontend.

### Motion integration gate

Before adopting a scroll/3D effect, state:

1. What the user gains (understanding, exploration, brand impact).
2. Implementation approach: CSS/Motion, **frame sequence + GSAP ScrollTrigger**, or R3F/GLB model. Document why.
3. Which approved photo/sequence/model assets are needed, who owns them and the fallback static image.
4. How it behaves for `prefers-reduced-motion`, no-JS/failed canvas, slow networks and small screens.
5. Download size, CPU/GPU cost, loading priority and impact on page performance.
6. Whether the effect interrupts normal page scrolling; **scroll-jacking is prohibited**. Pinning a section while native scroll scrubs a timeline (`ScrollTrigger pin + scrub`) is allowed; intercepting wheel/touch events, forced snapping or locking the page is not.

**Motion policy (v2.1):** the homepage has **one flagship 3D sequence** (Hero → Material layer breakdown, one shared scene). Other homepage sections use subtle reveals, hover and at most one progressive step highlight. Interior pages: subtle reveal/hover only, unless a specific motion is approved. Desktop gets the full 3D experience; capable mobiles get a reduced scene; weak devices, no-WebGL and `prefers-reduced-motion` get a static poster. Lenis is **not** installed by default.

## 6. Required working phases and approvals

Never generate the whole website in one pass and ask for review only at the end. Stop for owner approval at each milestone, with desktop + mobile screenshots and a change summary.

### Phase 0 — Analysis, mockups, 3D storyboard (no code)
Inventory assets and missing data; produce mockups for Header + Hero (desktop), Hero (mobile), Product Showcase, one Capabilities section, CTA/Footer; produce a frame-by-frame scroll storyboard for the 3D Hero; propose the mono logo variant. **Approval required before Phase 1.**

### Phase 1 — Foundation
Initialize Next.js, folder structure, design tokens, typography, layout primitives, Header/Footer shell, 7 route stubs with metadata, content data files in `src/content/`.

### Phase 2 — Header, 3D Hero and homepage
Build static Hero first (poster + headline + CTA), then the R3F label-roll scene, scroll timeline, material breakdown, fallbacks; then remaining homepage sections. **Visual approval before Phase 3.** If procedural 3D cannot reach the target material/lighting quality, propose a Blender → GLB pipeline.

### Phase 3 — Six interior pages
Order: `/san-pham`, `/gioi-thieu`, `/nang-luc`, `/giai-phap`, `/du-an`, `/lien-he`. Maintain route/content contracts; do not create new top-level pages.

### Phase 4 — Real functions and approved advanced effects
Quote form delivery (server-side email when credentials exist), Zalo button / GA4 / PDF profile only when official data exists, optional upload only after storage policy approval.

### Phase 5 — Responsive, SEO, a11y, performance, QA, deploy
Run lint/typecheck/build. Compare screenshots at **390×844, 768×1024, 1440×900** (plus 1920×1080). Test `prefers-reduced-motion`, no-WebGL fallback, keyboard, 200% zoom, menu/forms, Lighthouse. Deploy to Vercel preview. If visual browser tests were unavailable, report **not visually verified** rather than claiming pixel-perfect.

## 7. Definition of Done

- [ ] No 7-page route was broken, removed or silently renamed.
- [ ] New neutral design tokens are applied consistently across updated sections.
- [ ] Visual hierarchy is direct, calm and premium; no residual bright-blue/orange UI sections except explicitly approved logo/media.
- [ ] Real catalog data and inquiry flow remain accurate and functional.
- [ ] Photography treatment consistent; source/permission tracked.
- [ ] Mobile composition intentionally designed, not just scaled desktop.
- [ ] All links/buttons/forms work or show truthful integration status; no fake success.
- [ ] Accessibility: readable color contrast, visible focus, keyboard control, motion reduction, useful image alt, semantic headings.
- [ ] No scroll lock/scroll hijack, no major layout shift, no critical console errors.
- [ ] Lint/typecheck/build passed where environment supported; assets optimized.
- [ ] Changes summarized with files modified, checks run, before/after screenshots where possible, remaining tasks and rollback notes.

## 8. Reporting format for every agent task

1. **What I found**: relevant existing code, components, and constraints.
2. **Change proposal**: objective, current→target, and exact files.
3. **Implementation**: what changed and what deliberately remained unchanged.
4. **Verification**: concrete viewport/device, tests, and failures.
5. **Outstanding**: image rights, text claims, backend, performance, owner approvals.

Stop and ask before altering brand identity, business claims, CMS/database contracts, production form destination, or adding significant dependencies. Do not promise visuals or effects cannot be verified.

## 9. Reference provenance

- [MWDT official site](https://mwdtinc.com/): manufacturing/product imagery, capability/industry-oriented information architecture and RFQ emphasis.
- [Kristopher Ray — MWDT case study](https://kristopherray.com/projects/mwdt/): author-reported 90-frame scroll sequence driven by GSAP ScrollTrigger, monochrome/high-contrast visual system and detailed content strategy. **The underlying site uses Hugo/Netlify, not Next.js**; port design principles, not the original stack.
- Revolve Robotics: owner-supplied screenshot (`references/website-samples/`), layout/negative-space reference only.
- Fizzi 3D (Prismic tutorial, Apache-2.0): Next.js + GSAP + R3F scroll-linked product pattern; learn the technique, do not copy its models/branding.
- Ori Scan (Webflow): visual realism benchmark only; no source available.
- `references/hero-3d/`: **AI concepts** for art direction (lighting, camera, materials). `01-` is the primary Hero art direction. Not product evidence, not a 3D model.
- `references/intake/` (owner's product/stock photos): candidates only; many contain third-party trademarks and must be replaced or cleared before publication.
- Sunflower legacy screenshots (described by owner 2026-10-16; image files not yet in `references/`): content/UX lessons only.
