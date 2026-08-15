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
- **Treatment Detail pages** use `src/pages/TreatmentDetail.jsx` with dynamic routing (`/treatments/:id`).
  For each service/machine, create a content file: `src/content/{slug}-detail.txt` (e.g., `lifting-detail.txt`, 
  `laser-detail.txt`, `botox-dysport-detail.txt`). Template exists at `content/lifting-detail.txt`.

## Palette (src/index.css @theme)
cream `#faf6f1` · cream-dark `#f1e9df` · peach `#e8b294` · peach-dark `#d99872`
· ink `#2b2a28` · ink-soft `#6b6560`

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
