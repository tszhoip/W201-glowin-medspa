# Glowin Medspa — v2 design implementation plan

**Status:** the Figma design was substantially reworked after the first build.
The existing code was built from the older 8-frame wireframe and no longer
matches. This document specifies the rebuild.

---

## 1. Design source

Figma file **Glowin Medspa**, page **Wireframe**.

- fileKey: `xUjXx2sd4ZrtsKMQo5sSvX`
- Page node: `184:4750`
- URL: https://www.figma.com/design/xUjXx2sd4ZrtsKMQo5sSvX/Glowin-Medspa?node-id=184-4750

### Frames to implement

| Node ID | Frame | Canvas size | Target route |
|---|---|---|---|
| `224:346` | home | 1364 × 4416 | `/` |
| `230:457` | Services | 1364 × 4428 | `/services` |
| `232:648` | Services details page | 1364 × 3071 | `/services/:slug` |
| `232:758` | Contact | 1364 × 1285 | `/contact` |
| `221:199` | overlay menu (nav) | 531 × 820 | mobile nav overlay |
| `234:903` | overlay menu (form) | 531 × 820 | mobile form / drawer |
| `224:327` | footer | 1364 × 276 | shared component |

**Before writing code for a frame, pull it from Figma:**

1. Load the Figma design-to-code guidance (`/figma-design-to-code` skill, or the
   `skill://figma/figma-design-to-code/SKILL.md` MCP resource) — required.
2. Call `get_design_context` with the fileKey and that frame's node ID.
3. Call `get_screenshot` on the same node to check the result visually.
4. Download referenced images via `download_assets`.

Do not implement from this document alone — it describes structure and intent.
Figma is authoritative for exact spacing, type scale, and color.

---

## 2. What changed vs. the current code

The old build had 8 routes derived from wireframe frames
(`3a-home` … `4a-location`). The new design collapses to **4 page types**:

| Old route | Fate in v2 |
|---|---|
| `/` | Redesigned — new sections, real photography |
| `/services` | Redesigned — filter tabs + machines section merged in |
| `/treatments/lifting` | Becomes `/services/:slug` (generic detail template) |
| `/contact` | Redesigned — split layout, terms checkbox added |
| `/about` | **Removed** as a page — the story paragraph now lives on home |
| `/machines` | **Removed** as a page — merged into `/services` |
| `/blog` | **Removed** from this phase |
| `/location` | **Removed** as a page — map block now lives on home |

Footer nav still links to About / Reviews / FAQ / Privacy / Terms. Those pages
are **not designed yet** — stub them or leave the links inert until designs
exist. Do not invent layouts for them.

---

## 3. Visual language

Read exact values from Figma; these are the observed direction.

- **Aesthetic:** editorial, generous whitespace, full-bleed photography, thin
  hairline section dividers, minimal chrome. Corners are subtly rounded on cards
  and inputs, not pill-shaped.
- **Palette:** near-white page background; warm tan/clay footer band
  (approx `#C9A68C`); dark charcoal text; a warm accent used on the
  detail-page "Book Now" button; neutral light grey form-field fills.
- **Type:** geometric/grotesque sans throughout. Section labels are small and
  set at the same weight as body — hierarchy comes from size and spacing, not
  heavy weights. Page titles on the detail page are set noticeably larger.
  The wordmark "GLOWIN … MEDSPA" in the footer is set very large, split to the
  outer edges of the container.
- **Grid:** 1364 design width, content inset 52px each side → 1261px content
  column. Card rows are 3-up at 403px with 26px gutters.
- **Imagery:** close-crop skin/portrait photography, warm-toned and consistent.
  Machine cards use product shots on dark charcoal tiles.

Update `src/index.css` `@theme` to the real values pulled from Figma. The
current cream/peach tokens are from the old wireframe and are wrong.

---

## 4. Page composition

### 4.1 Shared

**Header** — logo mark + "GLOWIN" wordmark at left, hamburger at right. No
inline desktop nav in this design; navigation is the overlay menu at all
breakpoints. Header sits over the hero on home (transparent, light content) and
on a solid background elsewhere.

**Overlay menu (`221:199`)** — full-screen panel. Close (×) top-left, centered
nav list (Home, Services), full-width "Book Now" pinned to the bottom. Needs
focus trap, Esc to close, scroll lock, and `aria-expanded` on the trigger.

**Mobile form drawer (`234:903`)** — same overlay shell, back-arrow instead of
×, containing First Name / Email / Message / terms checkbox / Submit.

**Footer (`224:327`)** — tan band. Three link columns (Lifting, Injectables,
Skincare, Body | About, Our Machines, Reviews, Contact | FAQ, Privacy), then a
large split wordmark row with copyright and a stack of legal links.

> Note: the footer copyright in the design currently reads "© 2026 Glossier."
> — that is placeholder text from another brand and must be corrected.

### 4.2 Home (`224:346`)

Sections top to bottom:

1. **Hero** — full-bleed photo, ~811px tall, overlaid centered headline
   "Modern Medspa Innovation, Rooted in Clinical Care" + "BOOK NOW" pill.
2. **Intro paragraph** — centered, narrow measure, the "Founded by
   board-certified providers…" copy.
3. **Top Seller** — label left, "See All" right, 3 image cards with centered
   uppercase captions (Skin Tightening / Injectable / Skin Regen).
4. **Services** — label left; a large stacked word list (Face / Body / Eye /
   Regen) with a small "SEE ALL" chip; one tall image at right.
5. **Your Voice Matters Here** — label left, "See Business Profile" right,
   3 testimonial cards (quote top, attribution bottom).
6. **Instagram** — label left, "See All" right, 3 image tiles.
7. **Location** — label left, "See Direction" right, full-width map block.
8. **Value row** — 3 columns (VALUE 1/2/3 + supporting line).
9. Footer.

### 4.3 Services (`230:457`)

1. **Service filter tabs** — All Services / Injectable / Skin Tightening /
   Skin Rejuvenation. Active tab is a filled pill; others outlined. Filtering
   is client-side over the service list.
2. **Service card grid** — 3-up, 5 rows in the design. Image card with centered
   caption. Cards link to `/services/:slug`.
3. **Technology blurb** — centered, narrow measure ("The right technology makes
   all the difference…").
4. **Machine filter tabs** — All Machine / Injectable / Skin Tightening /
   Skin Rejuvenation. Same tab component as above.
5. **Machine card grid** — 3-up on dark charcoal tiles, product shot + caption.
6. **Consultation form block** — see 4.5.
7. Footer.

Build the tab row once as a shared `FilterTabs` component and use it for both
grids.

### 4.4 Service detail (`232:648`) — template for `/services/:slug`

1. Breadcrumb "Services / Lifting", large title, description paragraph,
   accent "Book Now" button.
2. **Pricing** — label + rows of `name … price`, right-aligned price.
3. **How It Works** — label + paragraph.
4. **Expected Results** — 3 columns numbered 01 / 02 / 03 with a short line each.
5. **Before & After** — two side-by-side image placeholders, captioned
   "Before" / "After".
6. **Precautions & Aftercare** — bulleted list.
7. **FAQ** — bordered cards, question + answer. Use `<details>`/`<summary>` or
   an accessible accordion.
8. Consultation form block.
9. Footer.

Sections are separated by full-width hairline rules with the label in the left
gutter — implement as one repeating `DetailSection` component.

### 4.5 Consultation form block (appears on Services, Service detail, Contact)

Two-column: left = "SCHEDULE A CONSULTATION" heading + intro paragraph;
right = First Name / Email / Message / "I agree to terms & conditions"
checkbox / Submit (full-width). Stacks to one column on mobile.

Build once as `ConsultationForm` and reuse. Keep the existing Formspree wiring
(`FORMSPREE_FORM_ID` in `content/global.txt`). The terms checkbox is new and
must be `required`.

### 4.6 Contact (`232:758`)

The consultation form block on a mostly empty page, plus header and footer.
Note the design drops the address/hours panel that was in the old wireframe —
confirm before removing that information from the site entirely, since local
SEO benefits from a visible NAP (name, address, phone).

---

## 5. Content system

Keep the existing pattern: copy lives in `src/content/*.txt` as `## KEY` blocks
parsed by `src/lib/loadContent.js`. Do not hardcode copy in JSX. Do not
introduce a CMS — the client requests changes through us.

Restructure to match the new pages:

- `global.txt` — nav, footer columns, business info, Formspree/Tawk.to IDs
- `home.txt` — all home sections
- `services.txt` — tab labels, service cards, machine cards, tech blurb
- `contact.txt` — consultation block copy
- `services/<slug>.txt` — one per treatment detail page, keyed to the route slug
- Delete `about.txt`, `blog.txt`, `location.txt`, `machines.txt`; fold any copy
  worth keeping into `home.txt` / `services.txt`

Service and machine cards need a `CATEGORY` field per item so the filter tabs
can work off content rather than hardcoded arrays.

---

## 6. Copy problems to fix before launch

These exist in the Figma file and must not ship:

1. **"tailoring a surgical plan"** in the consultation paragraph, on all three
   form instances. Glowin is a medspa; implying surgical services is both
   inaccurate and a regulatory exposure. Rewrite as non-surgical.
2. **"© 2026 Glossier."** in the footer — another brand's name.
3. **"Botos"** → Botox. **"INJETABLE"** → Injectable.
4. Repeated placeholders: "Skin Boosters" ×12 across the service grid,
   "Founded by board-certified provider" ×3 in the value row, the same
   "J. Kim" testimonial ×3.
5. Legal links (Privacy Policy, US State Privacy Notice, Terms of Use, Supply
   Chain Transparency) are placeholders — the real set for a CA medspa still
   needs drafting, plus a medical disclaimer.

---

## 7. Suggested order of work

1. Pull `get_design_context` on the footer (`224:327`) and header first —
   establish real color and type tokens in `src/index.css`, replacing the
   current cream/peach values.
2. Build shared primitives: `Header`, `OverlayMenu`, `Footer`, `FilterTabs`,
   `ConsultationForm`, `SectionLabel`.
3. Rebuild `/` from `224:346`.
4. Rebuild `/services` from `230:457`.
5. Build `/services/:slug` from `232:648`, with `lifting` as the first entry.
6. Rebuild `/contact` from `232:758`.
7. Delete the orphaned routes and their content files; add redirects from the
   old paths if any were shared publicly (they were not — safe to drop).
8. Restore the Tawk.to embed (`TawkChat`) in the new layout.
9. Responsive pass — the design is desktop-only at 1364px; define the mobile
   composition for each section (the overlay menu frames are the only mobile
   artifacts provided).
10. Accessibility pass — focus trap in the overlay, visible focus rings, alt
    text on all imagery, labelled form fields, colour contrast on the tan
    footer.

## 8. Done means

- `npm run build` is clean
- Each route visually matches its Figma frame at 1364px
- No copy hardcoded outside `src/content/`
- Overlay menu is keyboard-operable and closes on Esc
- Forms submit to Formspree and the terms checkbox is enforced
- No placeholder text from section 6 remains
