# Glowin Medspa — Style Guide

How the site is styled, and the rules for keeping it easy to change. A live preview of
everything below is at **`/guideline`** (`src/pages/Guideline.jsx`). Colors, radii and the class index are parsed from
`tokens.css` / `components.css`, so new tokens and classes appear there on their own; demos are
added by hand and a "no demo yet" badge flags any class that lacks one.

## The three layers

| Layer | File | What lives here | Change it when… |
|---|---|---|---|
| Tokens | `src/styles/tokens.css` | colors, radii, font, max width (`@theme`) | the brand look changes (one edit restyles the site) |
| Base | `src/styles/base.css` | `html`/`body` defaults, header height | almost never |
| Components | `src/styles/components.css` | named classes: `type-*`, `btn-*`, `field`, `card`, `img-frame`, `page-container`… | you need a new reusable look |

React helpers: `components/ui/Button.jsx` (all buttons/CTAs) and `components/ui/Section.jsx`
(page sections). Copy lives in `src/content/*.txt` and the treatments spreadsheet — never in JSX.

## Rules

1. **No hex colors, pixel radii or font sizes in components.** Use a token (`text-ink-soft`,
   `bg-cta`, `rounded-image`) or a component class (`type-lead`, `btn btn-cta btn-md`).
2. **No inline `style={{…}}`** except for genuinely dynamic values. Hover/focus states belong in CSS,
   not `onMouseEnter`.
3. **Need something new?** First check `/guideline`. If it's reusable, add a token or class in
   `src/styles/` (with a one-line `/* comment */` on the same line — the guideline shows it) and add a
   demo to `src/pages/Guideline.jsx` (list the class in `DEMOED`). If it's a one-off layout tweak,
   a Tailwind utility (`mt-6`, `md:grid-cols-3`) is fine — utilities always win over component classes.
4. **Buttons are `<Button>`**, never hand-built. Sections are `<Section>`.
5. **Every photo sits in `.img-frame`** (or uses `rounded-image`), so the 4px radius is one setting.

## Tokens (tokens.css)

- **Text:** `ink` #2D2D2D, `ink-soft` #6B6560
- **Brand:** `peach` #CBAE94 (footer, active states, hover accents), `cta` #F7CBA3 (primary action; `cta-dark` on hover)
- **Surfaces:** `page` #F5F5F5 (site background), `surface` white 70% (cards), `field` white (inputs),
  `placeholder` #F1E9DF (behind images), `line` #E4E4E4 (hairlines), `neutral` #E6E6E6 (quiet buttons)
- **Radii:** `image` 4px, `button` 6px, `field` 4px, `card` 6px, `card-lg` 16px
- **Layout:** `--container-page` 72rem; `--header-height` 56px (base.css)

## Typography (components.css)

Font: Switzer (300/400/500), global 2% letter-spacing. Pick a class, don't size by hand.

| Class | Use |
|---|---|
| `type-h1` | home hero headline and statement text (light; pair with `.highlight` for serif accents) |
| `type-display` | treatment page title |
| `type-title` | page titles (h1) |
| `type-heading` | section headings (h2) |
| `type-subheading` | card / panel headings |
| `type-section` | light heading above a block ("Top Treatments") |
| `type-feature` | big list items and card titles |
| `type-caps` | uppercase call-out ("Schedule a consultation") |
| `type-card-title`, `type-kicker` | small headings |
| `type-lead`, `type-body` | paragraphs (grey) |
| `type-label` | small uppercase eyebrow |
| `type-link` | text links (underline on hover), e.g. "See all" |
| `nav-link` | header links |

## Buttons

```jsx
<Button to="/contact">Book a consultation</Button>                 // cta, md
<Button to="/contact" variant="light" size="sm">BOOK NOW</Button>   // on photos
<Button to="/services" variant="neutral" size="sm">See all</Button>
<Button size="block" type="submit">Submit</Button>                  // full-width form submit
```
Variants: `cta` (default), `light`, `neutral`. Sizes: `sm`, `md`, `lg`, `hero`, `block`.

## Icons

SVGs live in `src/assets/images/icon/`. Each gets a class that draws it with a CSS mask, so it follows the
surrounding text color and `font-size` (e.g. `<span className="icon-arrow" />`). To add one: drop the SVG in
the folder, add a `.icon-name` rule to `components.css`.

## Forms & cards

- Inputs: `field` (+ `field-lg` for tall fields, `field-tint` when sitting on a card); checkbox: `checkbox`.
- Cards: `card` (+ `card-outlined`, `card-lg`, `card-interactive`).

## Layout

```jsx
<Section>…</Section>                        // 64px vertical rhythm, centered .page-container
<Section rule size="sm">…</Section>         // hairline above, 56px rhythm
<Section innerClassName="max-w-4xl text-center pb-0">…</Section>   // tweak the inner container
```
Breakpoint: `md` (768px) — single column below, multi-column above. Anchor links (`#book`,
`/services#laser`) land below the fixed header automatically (`scroll-padding-top`).

## Adding a page — checklist

1. Wrap blocks in `<Section>`; headings use `type-*` classes; paragraphs `type-lead` / `type-body`.
2. Buttons via `<Button>`; photos in `.img-frame`; cards via `.card`.
3. Run `npm run lint && npm run build`, then check `/guideline` if you touched `src/styles/`.
