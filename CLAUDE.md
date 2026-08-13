# Glowin Medspa — project context

Client website build. This file is the handoff context for any Claude session.

## Design source of truth
Figma file **Glowin Medspa** → page **Wireframe**. Always pull the design from
here; do not invent layouts.

- fileKey: `xUjXx2sd4ZrtsKMQo5sSvX`
- Wireframe page node: `184:4750`
- URL: https://www.figma.com/design/xUjXx2sd4ZrtsKMQo5sSvX/Glowin-Medspa?node-id=184-4750

Frames on that page:

| Node | Frame | Route |
|---|---|---|
| `184:4758` | 3a-home | `/` |
| `184:4759` | 3b-services | `/services` |
| `184:4760` | 3c-about | `/about` |
| `184:4762` | 3d-lifting-detail | `/treatments/lifting` |
| `184:4761` | 3d-blog | `/blog` |
| `184:4763` | 3e-contact | `/contact` |
| `184:4764` | 3e-machines | `/machines` |
| `184:4765` | 4a-location | `/location` |

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
- Treatment detail pages use `src/pages/TreatmentDetail.jsx` as a template —
  duplicate `content/lifting-detail.txt` for each new treatment.

## Palette (src/index.css @theme)
cream `#faf6f1` · cream-dark `#f1e9df` · peach `#e8b294` · peach-dark `#d99872`
· ink `#2b2a28` · ink-soft `#6b6560`

## Status
Done: scaffold, routing, header/footer, all 8 pages from wireframe, .txt content
system, Formspree form, Tawk.to embed, 404 page, build verified.

Not done:
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
