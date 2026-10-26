# SUNFLOWER — DESIGN SYSTEM v2.1

> **Products orbit E1 · 2026-10-19:** Owner-authorized six-family exploration now uses existing transparent cutouts on a CSS ellipse, GSAP steps (1.8s motion + 6s dwell), front-facing media and quiet depth by scale. Fixed labels, manual selectors/previous/next/pause; mobile/reduced-motion/Save-Data manual. Pause on hover/focus/offscreen/hidden tab. No new images/WebGL or scroll interception. Scope/storyboard: `storyboards/products-orbit.md`; evidence/limits: `PRODUCTS_ORBIT_REPORT.md`. Homepage poster and all other page compositions retained; E2 still pending. Older “no orbit” notes are historical.

> **Header dropdown · 2026-10-17:** Owner-approved click-open subnavigation implemented for Products (6 families/13 categories), Solutions (4), Capabilities (4), with parent-page links. Native disclosures, mobile nested accordion, keyboard/outside/route/resize cleanup; seven routes/quote flow retained. See HEADER_DROPDOWN_REPORT.md; earlier flat-header rules below are historical. No orbit/3D/backend.

> **Typography/layout revision · 2026-10-17:** Owner-approved Word feedback implemented: Inter sans for readable UI, common support/body text 14/16px, About tactile profile/value surfaces and six object families, clearer Home applications/Capabilities, responsive server-rendered material table/cards with identical data. Seven routes/catalog/quote contracts retained. See TYPOGRAPHY_LAYOUT_REPORT.md. This supplements round 3; orbit/3D remains last.

> **Current round 3 · 2026-10-17:** UI polish implemented: aligned gutters, concise headings, native technical disclosures, ivory/beige editorial rows, existing unbranded cutouts reused in Solutions/Projects, readable accent text, form error/focus improvements and truthful demo copy. Seven routes/13 canonical categories preserved. Homepage remains poster-only, no orbit/3D. Scope/checks/limits: POLISH_ROUND3_REPORT.md. Round 4 remains pending; older status notes below are historical.

> **Current round 2 · 2026-10-17:** Five interior Heroes are implemented: graphite print-proof split (About), dark full-bleed press photo (Capabilities), ivory material-photo split (Solutions), warm graphite BROTHERS split (Projects), compact warm-gray tags (Contact). Shared Server Component/registry; media captions distinguish illustration from owner-confirmed work. Header uses the existing light/charcoal neutral logos with CSS native-menu handling; mobile Contact prioritizes the form. No new Hero animation/canvas. Review evidence and remaining QA: INTERIOR_ROUND2_REPORT.md; this supersedes earlier “five Heroes pending” notes.

> **Current implementation · 2026-10-17:** Round 1 of the next four rounds is implemented: static Products Hero and all 13 cutout groups, with native expandable specifications and consistent ivory/beige rows. Visual review is pending; checks/evidence/limitations in CATALOG_ROUND1_REPORT.md. Other five interior Heroes and advanced motion remain pending.

> **Owner-approved catalog/Hero direction · 2026-10-17:** The next four rounds are catalog + static Products Hero; five remaining interior Heroes; UI polish/QA; advanced motion last. Products uses a warm beige centered Hero with the white label roll as focal object, and all 13 canonical catalog groups receive transparent product illustrations on section backgrounds. Use editorial alternating rows, concise visible copy and accessible expandable specifications. Other interior Heroes follow the reviewed mockups in HERO_ASSET_SELECTION.md in the next round. Homepage remains poster-only; no orbit/WebGL in this round.

> **Latest owner decision · 2026-10-17:** Keep the approved static poster as the current Hero. No automatic canvas replacement, sticky 3D scroll travel or interaction overlay. Finish the remaining site first; complete 3D last, then validate integration. Older 3D specifications below describe deferred work, not the current demo.

> **Round 3 implementation · 2026-10-17:** Homepage uses short editorial copy, a beige stage with three transparent product illustrations, a graphite photo/process section, light applications and reference configurations, then a compact dark CTA/footer. Product translation is limited to ±20px on desktop/fine pointer with no reduced-motion; reveal never hides server HTML. New cutouts remain demo-only illustrations with provenance in `src/content/assets.ts`. See `ROUND3_REPORT.md` for verification and remaining approval.

> **Status:** Approved *direction* for a greenfield build; numeric tokens below are a proposed design baseline and must be checked in rendered screenshots before final signoff.  
> **Owner update · 2026-10-17:** Concept 03 approved; round 1 implements a full-bleed static studio Hero with native HTML headline/CTA, integrated header and separate portrait poster. Main white label roll, secondary ivory box/hang tags/satin, two restrained champagne spheres explicitly requested by owner. No separate material-explanation section or S0–S5 UI. The live scene/timeline follows in round 2; poster art is AI concept for demo only. See `IMPLEMENTATION_PLAN.md` section 9.
> **Round 2:** React 19 / R3F 9 / Drei 10 synchronization approved and implemented. The live procedural scene/timeline now runs in the browser with responsive evidence in `ROUND2_REPORT.md`. Visual quality remains below concept 03; Blender → GLB is proposed before Hero acceptance. No approval of final material realism is implied.
> **Style:** Refined Industrial Minimalism · Premium B2B · Warm Monochrome · Product-first · **Immersive 3D Hero**.  
> **References:** [MWDT](https://mwdtinc.com/) (typography, layout), Revolve Robotics (negative space), [Fizzi](https://e-commerce-fizzi.vercel.app/) (scroll-linked 3D), [Ori Scan](https://ori-new-version.webflow.io/) (realism/lighting), `references/hero-3d/01-*` (Hero art direction). Interpreted for labels/packaging; never copied pixel-for-pixel.  
> **Companion:** root `AGENTS.md` = work rules; `docs/PAGE_STRUCTURE.md` = what pages/functions exist.

## 1. Visual manifesto

Make Sunflower look **credible, exacting, tactile and restrained**. Prioritize genuine product surfaces, material texture, clean alignment and information buyers actually need. Use visual drama **once** where it earns attention, then make the site fast to scan.

**Five characteristics:**

1. **Directness:** short statement and one purpose per section; remove decorative visual noise.
2. **Material realism:** photographic paper, adhesive rolls, satin/woven labels, ink ribbons and actual printing machinery; tangible rather than cartoon-like.
3. **Warm minimalism:** warm ivory/beige/warm gray with charcoal for contrast, not vivid corporate blue or fluorescent orange.
4. **Editorial confidence:** generous white space, disciplined typographic grid, alternating product/text positions, crisp lines and modest radii.
5. **One immersive 3D hero sequence:** a realistic label roll moves, opens and reveals its material layers along scroll; most B2B content remains stable and readable.

### Keep vs change from Sunflower v1

| Keep | Replace / refine |
| --- | --- |
| 7 pages, B2B CTA flow, product taxonomy and company story | Bright blue/orange page fills, CTA backgrounds and headings |
| Compact left-copy/right-product Hero concept | Competing hero video + vector label + large blue decorative block |
| Editorial capability/process sections | Oversized decorative curves, mixed photographic/color treatments |
| Strong concise heading `Tem nhãn. Tạo dấu ấn.` (subject to content signoff) | Blue-only oversized heading treatment and arbitrary bold distribution |
| Gallery and quote forms | Inconsistent product photo sizes, mixed screenshots and trademarked stock imagery |

## 2. Color system — NO bright blue/orange UI

### Core semantic tokens

| CSS token | Proposed HEX | Meaning | Practical use |
| --- | --- | --- | --- |
| `--background` | `#F6F4EF` | Warm Ivory | Main page background, calm neutral Hero |
| `--background-pure` | `#FBFAF7` | Soft White | Image/reading areas |
| `--surface` | `#EAE6DF` | Soft Beige | Secondary section, grounded product visual areas |
| `--surface-elevated` | `#FFFFFF` | Studio White | Image mat if white products need definition |
| `--surface-muted` | `#D4D0C8` | Warm Gray | Subtle visual grouping, non-text surfaces |
| `--foreground` | `#171715` | Charcoal | Primary text, CTA primary |
| `--foreground-soft` | `#33332F` | Graphite | Dark sections, secondary dark tone |
| `--muted-foreground` | `#64625D` | Warm Slate | Descriptions, metadata |
| `--border` | `#DCD8D0` | Warm Rule | Divider, input border, technical lines |
| `--accent` | `#9B8974` | Muted Bronze | Rare decorative detail, eyebrow rule, large numbers |
| `--on-dark` | `#F9F7F2` | Warm White | Text on charcoal/graphite |
| `--focus` | `#76563C` | Dark Bronze | Visible focus rings on light surfaces |
| `--error` | `#A03931` | Error | Invalid form state, paired with text/icon |
| `--success` | `#245940` | Success | Confirmed form response, paired with text/icon |

**Important:** `#9B8974` is **not** safe as small body text on ivory; use as visual ornament/large label only, or a darker variant with verified contrast. In finalized UI use WCAG AA text contrast (4.5:1 for normal text, 3:1 for large text), and >=3:1 for essential UI boundaries/focus.

### Starting CSS variables (adapt to existing tokens, don't duplicate)

```css
:root {
  --background: #F6F4EF;
  --background-pure: #FBFAF7;
  --surface: #EAE6DF;
  --surface-elevated: #FFFFFF;
  --surface-muted: #D4D0C8;
  --foreground: #171715;
  --foreground-soft: #33332F;
  --muted-foreground: #64625D;
  --border: #DCD8D0;
  --accent: #9B8974;
  --on-dark: #F9F7F2;
  --focus: #76563C;
  --error: #A03931;
  --success: #245940;
}
```

### Color placement

- 70–85% of visual real estate: ivory/soft white/beige/warm gray; **guideline, not an enforced formula**.
- Charcoal/graphite: text, primary CTA and **up to one or two** dark editorial/capability sections across a long homepage.
- Bronze/beige accents: tiny section markers, rules, subtle hover details; never an orange CTA substitute at every section.
- Printed products, photographs and company logo can naturally include real-life colors. **Don't desaturate evidence photos just to match beige.**
- Official blue/yellow logo: kept as the master brand file. The owner approved a **mono/neutral variant** for the website UI (charcoal `#171715` on light, warm white `#F9F7F2` on dark, optional muted bronze detail) that preserves the symbol structure (gear + S + label roll). Use the variant only after visual approval; until then the original may be used in the header. A vector (SVG/AI) master is still required — the supplied file is a raster PNG.
- Hover states must show accessible change without introducing new bright colors.

## 3. Typography — strong, human, readable

**Font:** one professional neutral sans family across the site: `Inter` (loaded via `next/font` with the `vietnamese` subset). `Geist Sans` is an alternate only after accents and weight rendering are checked. Do not use multiple display fonts to simulate premium design.

| Role | Desktop | Mobile | Weight | Line height |
| --- | --- | --- | --- | --- |
| Hero H1 | `clamp(3.75rem, 6.1vw, 6.5rem)` | `clamp(2.8rem, 10vw, 4.2rem)` | 600–700 | 0.98–1.08 |
| Section H2 | `clamp(2.5rem, 4.2vw, 4.6rem)` | `clamp(2rem, 7vw, 3.2rem)` | 600–700 | 1.05–1.17 |
| Product/category H3 | 1.5–2.25rem | 1.3–1.8rem | 550–650 | 1.15–1.28 |
| Lead paragraph | 1.1–1.25rem | 1rem–1.1rem | 400 | 1.5–1.65 |
| Body | 1–1.125rem | 1rem | 400 | 1.5–1.7 |
| Eyebrow/index | 0.75–0.875rem | 0.75rem | 550–650 | 1.3–1.5 |

- Maintain sentence-style or purposeful all-caps, not excessive uppercase tracking everywhere.
- Control headings by **max-width in ch** (~11–16ch for H1, variable by language and actual copy); descriptions generally 55–75 characters per line on desktop.
- Use boldness **only where rhetoric demands it**; no repeated mixed weights inside every headline.
- One H1 per page; every section fits in a meaningful H2/H3 hierarchy.
- Keep letter spacing around normal/negative for large bold headlines; Vietnamese diacritics must not collide.
- **Do not change the approved headline copy just to force line breaks**. Use width/line-wrap adjustments.

## 4. Containers, grid, spacing, and geometry

- Main desktop container: `max-width: 1280–1360px` (pilot at 1320px); visual content may break out for a **specific editorial purpose**.
- Desktop grid: 12 columns; editorial split typically text 5/12 and subject 7/12. On mobile, one column with re-ordered content.
- Desktop gutter: 32–48px; tablet: 24–32px; mobile: 18–24px.
- Vertical section rhythm: 96–144px desktop, 64–96px tablet, 56–80px mobile; use section content density, not a rigid number.
- Spacing scale: `4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 160`px.
- Radius: buttons 2–6px, small photo frames 0–8px, large key imagery 0–12px; **no giant pill/blob forms**.
- Borders: hairline `1px solid var(--border)`; shadows none or almost invisible.
- Major section separators can be a single full-width rule, as in a technical product portfolio.
- Align heading baselines, CTA edges and visual crop boundaries to one grid.

### Allowed composition families

1. **Hero / `hero-product-stage`:** full-width continuous studio, close to one viewport high; left HTML H1 + short copy + CTA over the same scene as the large main product. No framed right-side image panel. Mobile uses a portrait composition with text above the product in the same background.
2. **Alternating product rows / `product-editorial-row`:** no large card container, image left/right alternates, 40/60 text/visual ratio or inverse.
3. **Technical visual / `material-breakdown`:** 2–4 demonstrable properties beside photo, macro or verified technical render; no generic floating paper vectors.
4. **Photo-led story / `editorial-process`:** factory/production photo with explanatory copy and limited dividers.
5. **Capabilities / `technical-index`:** compact columns or separated rows listing actual competencies rather than decorative icon cards.
6. **Product catalogue / `catalog-grid`:** consistent photo stage and no heavy card chrome; supports 13 groups.
7. **Case study / `project-story`:** large finished-product photography, material/requirement captions, genuine project data.
8. **Contact / `inquiry-panel`:** one easy-to-reach quote CTA and real functional form.

## 5. Hero visual specification (priority #1) — Immersive 3D

**Home H1 (locked):** `Tem nhãn. Tạo dấu ấn.` — do not change the copy; line breaks and entrance animation may be proposed. Supporting copy: one concise description of design, printing, labels and packaging; avoid grand promises.

**Subject:** one **white adhesive label roll** (kraft paper core, many wound layers visible on the side, die-cut rectangular labels with rounded corners on the surface, a strip unwound toward the viewer). Art direction: `references/hero-3d/01-floating-label-studio-hires-AI-concept.png`.

**Scene & art direction:**

- Soft studio space in warm ivory / beige-gray; large soft key light from upper-left, gentle window-like light streaks, warm bounce; natural contact shadows.
- Materials must read as real: matte/satin paper facestock with subtle grain, kraft core with fibre texture, slightly translucent liner, faint edge highlights on wound layers.
- Composition: full-bleed desktop studio with native HTML copy/CTA in left safe area and large white roll on right; portrait art direction on mobile/tablet. Scene/poster extends beyond the editorial container; text and header retain consistent gutters. Use min-height based on `svh`, allow content to grow at small widths/zoom, never clip text/CTA. Concept 03 is the approved visual baseline.
- Optional secondary depth elements (a blurred liner strip, a sheet of material) only if they stay quiet and out of focus.
- **Forbidden:** cartoon, low-poly, flat vector roll, neon/rim glow, particles, continuous decorative spin, stock factory video behind the roll.

**Scroll storyboard (one shared scene, Hero → Material Story):**

| Step | Scroll | State |
| --- | --- | --- |
| S0 | Load | Static poster + H1/CTA paint first; 3D scene fades in over it when ready; roll intact, stationary at rest. |
| S1 | 0–20% | Camera eases closer; roll rotates gently (≤ 25°); headline column scrolls away naturally. |
| S2 | 20–40% | The unwound strip extends; one label section lifts from the roll. |
| S3 | 40–70% | Controlled exploded view of the strip: facestock → adhesive → silicone release coat → liner, separated in depth; no explanatory captions/callout UI. |
| S4 | 70–90% | Layers recombine into one finished label material. |
| S5 | 90–100% | Scene settles/hands off to the next section (product structure / showcase). |

Owner update: keep material separation as visual motion inside the shared Hero; remove the explanatory `MaterialStory` block, layer-list/callout controls and S0–S5 progress UI. Layer count/order still needs confirmation against actual material; the scene remains illustrative. No separate technical text is required beyond a small concept/illustration caption.

**Interaction:**

- Scroll scrubs the main timeline (GSAP ScrollTrigger, `pin` + `scrub`; native scrolling preserved; no snapping, no wheel interception).
- Desktop pointer: subtle parallax / tilt (≤ ~6°), damped.
- Drag-to-rotate only when the user presses on the 3D area; clamped azimuth/polar range; eases back to the timeline pose on release so scroll and drag never fight.
- Mobile: reduced scene (lower DPR, fewer layers, no drag) on capable devices; static poster on weak devices, no-WebGL, `prefers-reduced-motion` or `Save-Data`.

**Technology (approved order):**

1. **Static poster** always rendered first (SEO/LCP); used as fallback.
2. **Live 3D via React Three Fiber + Drei**, procedural geometry and generated textures first; scene is client-only, lazy-loaded after first paint.
3. If procedural quality is insufficient → **Blender model exported to GLB/GLTF** (Draco/Meshopt compressed, KTX2 textures).
4. Image-sequence (MWDT-style) only as an alternative if live 3D fails performance targets.

The final poster should be a render of Sunflower's own 3D scene; the AI concept may serve as a **temporary dev fallback only**, never as product evidence.

## 6. Product images / video / model standards

### Product photography

- Prefer actual final products: accurately represent substrate, label shape, roll core, material, print finish and trim.
- For catalogue, consistent **4:3 or 1:1** stage per row/type; subject fills ~65–85% frame without cropping crucial edges; consistent lighting and exposure.
- Warm off-white/soft-gray photo backgrounds; isolate white rolls using soft contact shadow and careful rim lighting.
- Use **macro close-ups** when texture, adhesive, foil, satin or woven structure matters.
- When presenting machinery, color-grade photos lightly to match, but keep them credible and color-informative.
- Do not reuse competitor trademarks or client artwork unless usage permission is documented.
- Specify useful `alt`; decorative images may use `alt=""` where appropriate.

### Storage

```text
references/hero-3d/                 # AI art-direction concepts, not published
references/website-samples/         # owner-supplied layout references
references/intake/                  # owner product/stock photos awaiting rights check
references/current-site/           # legacy screenshots (when supplied)
public/images/brand/               # approved logos
public/images/hero/                # static poster, hero photograph
public/images/products/<group>/    # catalog finished products
public/images/company/             # approved factory/people/equipment
public/images/projects/            # approved project media
public/videos/manufacturing/        # edited web-ready footage
public/sequences/label-roll/        # optional image-sequence fallback
public/models/                      # optional licensed .glb/.gltf
src/components/three/               # R3F scene, roll model, materials, timeline
src/content/                       # source/rights/alt metadata, names, copy
```

- Use `next/image` for suitable raster/static images; use an explicitly dimensioned canvas for motion.
- Provide video poster and controls as needed; muted inline autoplay only with purposeful content and reduced-motion fallback.
- Do not check in gigantic original videos/PSD/AI master files or put source material in public assets.

## 7. Buttons, navigation, links and forms

- **Primary CTA:** solid charcoal `#171715`, warm-white text; medium size and square-ish corners, visible hover/focus.
- **Secondary CTA:** charcoal text link with arrow, or 1px neutral outline; no orange button.
- **Nav:** clean ivory/white, 5–6 visible items plus quote CTA. Header remains readable with sticky behavior and no bright blue underlines.
- **Inputs:** warm-white surface with calm neutral border, focus ring dark bronze; clear labels, validation, failure/success state.
- Use at most **one primary** CTA per section; a secondary link only if purposeful.
- No inert forms or `alert('success')` when backend hasn't received data.

## 8. Motion language

| Element | Desired behavior | Suggested technique | Maximal usage |
| --- | --- | --- | --- |
| Button hover | tiny arrow translation + color fade | CSS | Global |
| Section reveal | fade + <=16px vertical translation | CSS / GSAP | Selected major sections |
| Gallery hover | 1.015–1.035 scale in overflow-clipped image | CSS | Selected product imagery |
| Hero 3D roll | pointer parallax, clamped drag, scroll-driven camera; stationary at rest | R3F + Drei + GSAP ScrollTrigger | **One** shared scene |
| Material breakdown | visual layer separation and recombination, no explanation UI | Same R3F scene, sticky + scrubbed | Inside the shared Hero |
| Process progression | progressive step highlight (not hijack) | CSS / IntersectionObserver / GSAP | One section |
| Navigation menu | short fade/slide, focus managed | CSS | Global |

- Ordinary transitions: 160–300ms, reveal: approx. 400–650ms; 3D easing slow and damped (`power2.inOut`/`expo.out`, scrub ≈ 0.8–1.2s). Targets, not exact durations.
- Never infinite spin as decorative hero, exaggerated bounces, 3D effect applied to every image or keyboard-trapping sticky canvas.
- Disable or radically simplify movement for reduced-motion preferences and low-performance devices.
- Motion must not conceal content permanently if JS fails or observer never fires.

### 3D performance budget (targets, verify in QA)

- Hero H1/CTA + poster visible before any 3D JS loads; LCP element is the H1 or poster, never the canvas.
- 3D code split into its own lazy chunk; total 3D JS ≈ ≤ 300 KB gzip; textures ≤ ~1.5 MB total (KTX2/WebP, ≤ 2K).
- DPR capped at 1.5 (desktop) / 1.25 (mobile). Round 2 uses 1.25 / 1 with active-frame sampling (rather than counting demand-render idle gaps as low FPS); reduce to 0.85, then poster after three consecutive slow windows. Pause off-screen/hidden-tab rendering; no idle animation loop.
- Target ~60 fps on mid-range laptops; degrade to poster if sustained FPS is poor.

## 9. Responsive compositions

- **Desktop (>=1024px):** editorial split, strong aligned columns, product/stage in right field; consider full width technical rows.
- **Tablet (768–1023px):** content proportionally narrowed, image remains legible; reduce body measure and typography.
- **Mobile (<768px):** meaningful order: headline → support text → static product → primary CTA (or CTA close to lead as UX demands). Do not crop labels or let an animation overflow viewport.
- Target QA captures: 390×844, 768×1024, 1440×900, optional 1920×1080; check 320px and 200% text zoom as overflow sanity tests.
- Touch targets about 44×44px; no tooltip-only specification, all links accessible by touch and keyboard.

## 10. Visual QA acceptance

**Premium test:**

- Can a new visitor tell what Sunflower produces in 5 seconds?
- Does every major section have exactly one focal area? Are products more visually compelling than decoration?
- Are ivory, beige and charcoal sufficiently varied to avoid a monotonous gray wash **without adding new bright accents**?
- Does the quality/angle/background of product photography remain coherent across the page?
- Are body text, focus indicators and CTA states contrast-compliant?
- Are quote links/menus/forms actually usable?
- Is animation optional, performant and invisible to users who prefer reduced motion?
- Does mobile feel purposefully designed, not compressed desktop?

**Legacy migration check:** take before/after screenshots of Header, Hero, product-material panel, production/capability section, Product Gallery and Footer; assess differences against the intended design—not against pixel parity with MWDT.

## 11. Reference ethics / status

- Design inspiration: [MWDT website](https://mwdtinc.com/) (industrial directness and factual content), [MWDT designer case study](https://kristopherray.com/projects/mwdt/) (documented image-sequence approach), Revolve Robotics screenshot (negative space), [Fizzi](https://e-commerce-fizzi.vercel.app/) (R3F + GSAP scroll pattern), [Ori Scan](https://ori-new-version.webflow.io/) (realism). None is a ready-to-install theme for Sunflower.
- `references/hero-3d/` images are **AI concepts** for art direction only; product/stock photos in `references/intake/` need rights clearance and trademark removal before publication.
- This document sets the approved **direction** and proposed tokens. Final screenshot design, actual asset selection and the mono logo variant require review before production release.
