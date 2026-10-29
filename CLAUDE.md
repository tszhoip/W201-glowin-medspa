# Glowin Medspa — project context

Client website build. This file is the handoff context for any Claude session.

## Design source of truth
Figma file **Glowin Medspa** → page **Wireframe**. Always pull the design from
here; do not invent layouts.

- fileKey: `xUjXx2sd4ZrtsKMQo5sSvX`
- Wireframe page node: `184:4750`
- URL: https://www.figma.com/design/xUjXx2sd4ZrtsKMQo5sSvX/Glowin-Medspa?node-id=184-4750

**Site map (routes in `src/App.jsx`):**

| Route | Component | Notes |
|---|---|---|
| `/` | Home | Hero + intro statement + treatment types (hover shows thumbnail; mobile shows all; click → `/services#anchor`) + testimonials + location/map. Top Treatments block hidden (`SHOW_TOP_TREATMENTS` in Home.jsx); Instagram hidden |
| `/services` | Services | Sections per treatment type (Facial / Injectables / Laser / Wellness), 28 treatments from the xlsx; names are plain text while `SHOW_TREATMENT_LINKS` is off |
| `/treatments/:id` | TreatmentDetail | One page per treatment slug; no nav entry while `SHOW_TREATMENT_LINKS` is off |
| `/book-now` | BookNow | Photo background + consultation form |
| `/contact` | Contact | Find Us + map + info cards + FAQ (no form) |
| `/members` | Members | HIDDEN (`SHOW_MEMBERSHIP`); shows 404 while off |
| `/guideline` | Guideline | TEMP style preview; remove before launch |
| `*` | NotFound | 404 page |

Header menu: Services, Contact, Book Now (+ Membership when on). Mobile has a hamburger → `src/components/MobileMenu.jsx`.
`about.txt` and `services.txt` in `src/content/` are leftovers not used by any page.

Use the Figma MCP (`get_metadata`, `get_screenshot`, `get_design_context`) to read frames.

## Stack & hosting
- React 19 + Vite 8, Tailwind CSS v4 (via `@tailwindcss/vite`), react-router-dom v7
- GitHub under **tszhoip@gmail.com**, hosted on **Vercel** (push to `main` = prod deploy)
- Custom domain: **https://www.glowinmedspa.com** (live on Vercel; `vercel.json` rewrites all routes to index.html)

## Architecture decisions
- **No headless CMS.** Client requests copy changes through us. All copy lives in
  `src/content/*.txt` — plain text under `## KEY` markers, parsed by
  `src/lib/loadContent.js` (`parseContent`, `collectGroup`). Never hardcode copy
  in components.
- **Forms → Vercel function + Gmail (not Formspree).** All forms use the shared `src/components/ContactForm.jsx`, which posts to
  `api/contact.js` (nodemailer + Gmail SMTP). Vercel env vars: `GMAIL_USER`, `GMAIL_PASSWORD` (Google app password) and
  `NOTIFY_EMAILS` (comma-separated recipients of the "new enquiry" email; falls back to `GMAIL_USER`). Addresses live in
  Vercel settings, not in the repo (the repo is public).
- **Live chat → Tawk.to** (free). `src/components/TawkChat.jsx`. IDs are set in
  `content/global.txt` (`TAWK_PROPERTY_ID` / `TAWK_WIDGET_ID`), but the widget is
  currently OFF: `<TawkChat />` is commented out in `src/App.jsx`. Confirm whose
  Tawk.to account the IDs belong to before turning it on.
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
- **Services page treatment links are OFF** (`SHOW_TREATMENT_LINKS` in `src/lib/features.js`): names show as plain text, only "Book a consultation" is a link. Detail pages still exist at `/treatments/:slug`.
- **Treatment detail page** (`src/pages/TreatmentDetail.jsx`): hero (intro image on the left; type label, title, blurb,
  Book Now -> #book on the right), numbered cards (How It Works / What It Treats / Benefit,
  hidden when empty), Before & After, then the consultation form
  (the shared `src/components/ContactForm.jsx`). Page copy lives in `src/content/treatment-detail.txt` (placeholder text for now).
  CTA peach is the `cta` token (sampled from the design screenshot).

- **One form for the whole site:** `src/components/ContactForm.jsx` (`/book-now` and every treatment page).
  Props: `copy` (labels from a content file), `source` (shown in the email subject/body so each enquiry says
  where it came from), `phone` ('required' | 'optional' | false), `tinted`, `size`. Posts to `api/contact.js`,
  which emails the clinic + the visitor and records the consent wording the visitor agreed to.
- **Contact page** (`/contact`, `src/pages/Contact.jsx`): "Find Us" hero with Google map + Direction button, three info cards, FAQ cards.
  Copy in `src/content/contact.txt`; address/phone/email come from `global.txt`. It has no form; enquiries go through `/book-now`.
- **Members page** — HIDDEN for now (switch `SHOW_MEMBERSHIP` in `src/lib/features.js`; `/members` shows the 404 page while off) (`/members`, `src/pages/Members.jsx`): three membership tiers (name, price, blurb, feature list, CTA to
  `/book-now`). All copy is dummy text in `src/content/members.txt` (add/remove tiers by numbering `TIER_n_*`). Menu label is "Membership"; order:
  Services, Membership, Contact. Footer: one 16px-gap row of Home, Services, Membership (only when on), Contact, Style (TEMP link to /guideline) + copyright. Layout is a simple guess; the Figma pricing frame hasn't been matched yet.
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

_Updated 2026-10-29._

**Done:**
- ✅ Live at https://www.glowinmedspa.com (GitHub → Vercel, custom domain connected)
- ✅ Pages: Home, Services, Treatment detail, Book Now, Contact, 404 (+ hidden Members, temp Guideline)
- ✅ Spreadsheet-driven treatments (28 treatments, 4 types)
- ✅ Home treatment types: hover thumbnail, all thumbnails on mobile, click → `/services#anchor`
- ✅ Services: plain-text treatment names (only "Book a consultation" links)
- ✅ Form → `api/contact.js` (Gmail): enquiry email to `NOTIFY_EMAILS` + receipt to the visitor
- ✅ Mobile hamburger menu (`MobileMenu.jsx`)
- ✅ Favicon (`public/favicon.svg`)
- ✅ PRP image cells fixed in the xlsx (`PRP.jpg`, `PRP-ba.png`)
- ✅ Real form test on production `/book-now` (2026-10-29): clinic got "New enquiry", visitor got the receipt

**Not done:**
- [ ] Emails are sent from the owner's personal Gmail (`GMAIL_USER`), so visitors see it on the receipt.
      Switch to a clinic mailbox before handover (Vercel env vars — owner's call)
- [ ] Remove the TEMP footer "Style" link (and `/guideline` route) before handing to the client
- [ ] Legal pages: Privacy Policy, Terms, medical disclaimer — the form already says "I agree to the
      terms & privacy policy" but no such pages exist (needs legal business name, address, etc.)
- [ ] Confirm the "surgical plan" wording on `/book-now` with the client
- [ ] Real copy + images (most copy is still placeholder)
- [ ] xlsx `Instructions` sheet: remove duplicate paragraphs; image path notes still say `services-page/`
      (type images actually live in `treatment-type/`)
- [ ] Members page: match the Figma pricing frame before turning `SHOW_MEMBERSHIP` on
- [ ] Tawk.to chat: confirm account, then un-comment `<TawkChat />` in `App.jsx`
- [ ] SEO: OG tags, sitemap.xml, robots.txt, LocalBusiness/MedicalBusiness schema
- [ ] Google Business Profile, GA4, Search Console
- [ ] Accessibility pass (ADA — real risk for local service businesses)
- [ ] Maybe later: real booking platform behind "Book Now"

## Team & workflow
- Two maintainers: **tszhoip** (owner; pushes straight to `main`) and **mmmhan0528** (collaborator).
- mmmhan0528's flow: `git pull` → branch `june/<topic>` → check on localhost → push the branch →
  check the Vercel preview → merge into `main` only after an explicit OK.
- `treatments.xlsx` is binary and can't be merged: `git pull` first, tell the other person before editing,
  then commit + push right away.
- Never commit secrets (Gmail app password etc.); they live only in Vercel env vars.

## Conventions
- Copy changes go in `src/content/*.txt`, never in JSX
- Never delete or rename a `## KEY` line — the parser depends on it
- Run `npm run build` before committing
- Weekly: review copy for updates unless client flags a change sooner
