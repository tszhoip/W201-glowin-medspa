# Glowin Medspa — Website

React + Vite site. Design source of truth: Figma "Glowin Medspa" file, **Wireframe** page.

## Editing copy (no code needed)

All page text lives in `src/content/*.txt`. Open a file, edit the text under any
`## HEADING`, save. Do not delete or rename the `## HEADING` lines — everything
else is safe to change.

| File | Page |
|---|---|
| `global.txt` | Nav labels, footer, business info, Formspree/Tawk.to IDs |
| `home.txt` | Home page |
| `services.txt` | Services page |
| `about.txt` | About page |
| `contact.txt` | Contact / booking page |
| `location.txt` | Location page |
| `machines.txt` | Machines page |
| `blog.txt` | Blog listing |
| `lifting-detail.txt` | Example treatment detail page (duplicate this pattern for new treatments) |

## One-time setup

1. **Formspree** (contact form email delivery): create a form at
   [formspree.io](https://formspree.io), copy the form ID, paste it into
   `FORMSPREE_FORM_ID` in `src/content/global.txt`.
2. **Tawk.to** (free live chat): create a property at
   [tawk.to](https://www.tawk.to), copy the Property ID and Widget ID from
   Administration → Channels, paste into `TAWK_PROPERTY_ID` /
   `TAWK_WIDGET_ID` in `src/content/global.txt`.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

## Deploy

Hosted on Vercel, connected to this GitHub repo. Every push to `main` deploys
to production; every PR gets a preview URL.
