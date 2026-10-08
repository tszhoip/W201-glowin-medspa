# Glowin Medspa — project context

Client website build. This file is the handoff context for any Claude session.

## Design source of truth
Figma file **Glowin Medspa** → page **Wireframe**. Always pull the design from
here; do not invent layouts.

- fileKey: `xUjXx2sd4ZrtsKMQo5sSvX`
- Wireframe page node: `184:4750`
- URL: https://www.figma.com/design/xUjXx2sd4ZrtsKMQo5sSvX/Glowin-Medspa?node-id=184-4750

**Simplified Site Map (5 pages):**

| Route | Component | Notes |
|---|---|---|
| `/` | Home | Hero + About story + Disciplines + Services preview + Testimonials + Instagram |
| `/services` | Services | 15-item grid (9 services + 6 machines), all linking to detail pages |
| `/treatments/:id` | TreatmentDetail | Dynamic route for individual treatment/machine detail (lifting, laser, botox, etc.) |
| `/contact` | Contact | Contact form + visit info |
| `*` | NotFound | 404 page |

**Removed Pages:**
- ❌ `/about` — Content merged into Home (story + disciplines visible above Services)
- ❌ `/blog` — Removed entirely
- ❌ `/location` — Removed entirely (location info in Contact page + footer)
- ❌ `/machines` — Merged into `/services` grid (6 machines now appear alongside 9 services)

Use the Figma MCP (`get_metadata`, `get_screenshot`, `get_design_context`) to read frames.

## Stack & hosting
- React 19 + Vite 8, Tailwind CSS v4 (via `@tailwindcss/vite`), react-router-dom v7
- GitHub under **tszhoip@gmail.com**, hosted on **Vercel** (push to `main` = prod deploy)
- Custom domain: not registered yet (planned `glowinmedspa.com`)

## Architecture decisions
- **No headless CMS.** Client requests copy changes through us. All copy lives in
  `src/content/*.txt` — plain text under `## KEY` markers, parsed by
  `src/lib/loadContent.js` (`parseContent`, `collectGroup`). Never hardcode copy
  in components.
- **Forms → Formspree** (not Mailchimp; Mailchimp is newsletter, not form delivery).
  `src/components/ContactForm.jsx`. Set `FORMSPREE_FORM_ID` in `content/global.txt`.
  May swap to Vercel serverless + Resend later.
- **Live chat → Tawk.to** (free). `src/components/TawkChat.jsx`. Set
  `TAWK_PROPERTY_ID` / `TAWK_WIDGET_ID` in `content/global.txt`.
- **Booking** is form-only for now. A real booking platform (Boulevard / Vagaro /
  Mindbody / Zenoti) may replace "Book Now" later.
- **Treatments are spreadsheet-driven.** `src/content/treatments.xlsx` is the source of
  truth for the Services page and every `/treatments/:slug` detail page. Sheets:
  `Treatments` (title, intro image, slug, type dropdown, blurb ≤50 words, optional single before&after image, What It Treats, Benefit (plain text), Top Treatment 1-3 = featured on Home,
  and optional How It Works in Markdown; columns matched by header name), `Treatment Types` (name, short name, section
  image; feeds the dropdown, the Home type list and /services#anchor links), `Instructions`. `scripts/treatments.mjs build` converts it
  to `src/content/treatments.json` (runs automatically before `dev`/`build`; fails on
  unknown type or duplicate slug, warns on long blurbs/missing images). The owner edits
  the xlsx, re-uploads it and leaves a note — don't scan for changes. Images:
  type images in `src/assets/images/treatment-type/`, before/after in
  `src/assets/images/treatments/`. `npm run treatments:seed` regenerates the starting
  file (overwrites edits!).
- **Treatment detail page** (`src/pages/TreatmentDetail.jsx`): hero (intro image on the left; type label, title, blurb,
  Book Now -> #book on the right), numbered cards (How It Works / What It Treats / Benefit,
  hidden when empty), Before & After, then the consultation form
  (the shared `src/components/ContactForm.jsx`). Page copy lives in `src/content/treatment-detail.txt` (placeholder text for now).
  CTA peach is the `cta` token (sampled from the design screenshot).

- **One form for the whole site:** `src/components/ContactForm.jsx` (Contact page, `/book-now`, every treatment page).
  Props: `copy` (labels from a content file), `source` (shown in the email subject/body so each enquiry says
  where it came from), `phone` ('required' | 'optional' | false), `tinted`, `size`. Posts to `api/contact.js`,
  which emails the clinic + the visitor and records the consent wording the visitor agreed to.
- **Contact page** (`/contact`, `src/pages/Contact.jsx`): "Find Us" hero with Google map + Direction button, three info cards, FAQ cards.
  Copy in `src/content/contact.txt`; address/phone/email come from `global.txt`. It has no form; enquiries go through `/book-now`.
- **Members page** (`/members`, `src/pages/Members.jsx`): three membership tiers (name, price, blurb, feature list, CTA to
  `/book-now`). All copy is dummy text in `src/content/members.txt` (add/remove tiers by numbering `TIER_n_*`). Menu order:
  Services, Members, Contact. Layout is a simple guess; the Figma pricing frame hasn't been matched yet.
- **Booking page** (`/book-now`, `src/pages/BookNow.jsx`): full-bleed photo (`assets/images/book-now/background.jpg`)
  with a white `.panel` holding the consultation form (shared `ContactForm`, `tinted`). Copy in
  `src/content/book-now.txt`. Header / mobile menu / banner / Services "Book now" links go here; `/contact` is the
  separate contact + visit-info page.

## Styling
All styling follows `src/design.md` (read it before touching UI). Tokens in `src/styles/tokens.css`,
reusable classes in `src/styles/components.css`, shared `<Button>` / `<Section>` in
`src/components/ui/`. No hex colors, pixel radii or inline `style={{}}` in components; hover states
live in CSS. Live preview: `/guideline` (`src/pages/Guideline.jsx`; auto-reads the style files; add a demo when you add a reusable style). The footer link to it is TEMP — remove before launch. Palette: ink `#2D2D2D`, ink-soft `#6B6560`,
peach `#CBAE94`, cta `#F7CBA3`, page `#F5F5F5`.

## Status

**Completed (Latest Simplification — Aug 15, 2026):**
- ✅ Simplified from 8 pages to 5-page lean structure
- ✅ Merged About content into Home (story + 4 discipline cards)
- ✅ Merged Machines into Services grid (6 machines + 9 services = 15 items)
- ✅ Dynamic treatment routing via `/treatments/:id` (supports lifting, laser, botox, etc.)
- ✅ Removed Blog, Location, and separate Machines pages
- ✅ Simplified header nav to Home | Services | Book Now (removed About link)
- ✅ Updated Footer to remove old page links

**Previously Done:**
- ✅ Scaffold, routing system, Header/Footer components
- ✅ Design system: Switzer Regular (400) + 2% letter-spacing, 6-color palette
- ✅ Hero section with real background image (banner-01.png)
- ✅ Content management: .txt files parsed by loadContent.js
- ✅ Forms: Formspree integration for Contact submissions
- ✅ Live chat: Tawk.to embed
- ✅ Social sections: Testimonials + Instagram placeholders
- ✅ 404 page, build verified

**Not done:
- [ ] Register domain; connect Vercel
- [ ] Push to GitHub; import to Vercel
- [ ] Real Formspree + Tawk.to IDs
- [ ] Legal pages: Privacy Policy, Terms, medical disclaimer (deferred — needs
      legal business name, address, phone, whether before/after photos are used)
- [ ] Real copy + images (current copy is placeholder)
- [ ] SEO: OG tags, sitemap.xml, robots.txt, LocalBusiness/MedicalBusiness schema
- [ ] Google Business Profile, GA4, Search Console
- [ ] Accessibility pass (ADA — real risk for local service businesses)
- [ ] Mobile nav (header nav is hidden below md, no hamburger yet)

## Conventions
- Copy changes go in `src/content/*.txt`, never in JSX
- Never delete or rename a `## KEY` line — the parser depends on it
- Run `npm run build` before committing
- Weekly: review copy for updates unless client flags a change sooner
