# Service detail page v2 — what was built

File: https://www.figma.com/design/xUjXx2sd4ZrtsKMQo5sSvX/Glowin-Medspa?node-id=184-4750
Page: **Wireframe**

| Node | Frame | Size |
|---|---|---|
| `238:66` | Service details page v2 (MIIN Laser) | 1364 × 6437 |
| `245:82` | Service details page v2 — Botox variant | 1364 × 5755 |
| `247:98` | Service details page v2 — mobile 390 | 390 × 4196 |
| `249:114` | Service detail — reusable components | 7 components |

## Section order (desktop, MIIN Laser)

1. hero — breadcrumb, title, one-line promise, CTA, hero image, key-facts strip
2. who it's for — what it treats / a good fit if / **not suitable if**
3. what happens — mechanism in plain language + 4-step visit sequence
4. the technology *(optional)* — 1064S / 1064D / QUASI / 532 spec grid
5. who treats you — provider credentials
6. afterwards — recovery timeline *(optional)* + results timeline
7. does it work *(optional)* — before/after + treatment-specific testimonial
8. before you book — precautions & aftercare + honest FAQ
9. pricing
10. consultation form

Sections carrying `[OPTIONAL]` in the layer name are the ones that get deleted
per treatment. The Botox variant is the proof: technology grid and recovery
timeline removed, page still reads correctly, 682px shorter.

## Components (`249:114`)

`detail / key fact` · `detail / visit step` · `detail / spec cell [device only]`
· `detail / timeline node` · `detail / faq card` · `detail / price row`
· `detail / form field`

Each carries a description explaining when to use and when to omit it.

## Known issues to fix on your machine

**1. Fonts — the main one.** Your file uses Switzer and Satoshi. Neither is
available to the Figma MCP environment, so all *new* text is Inter. The header
and footer were cloned rather than rebuilt, so their Satoshi is intact.

Run this in Figma on your Mac (where the licensed fonts are installed) to swap
every Inter node to the brand type:

```js
// Map Inter → brand fonts across the three v2 frames.
// Adjust the family/style pairs if your brand ramp differs.
const IDS = ["238:66", "245:82", "247:98"];
const TARGET = { family: "Switzer", style: "Medium" };   // body + headings
const DISPLAY = { family: "Satoshi", style: "Regular" }; // 32px+ display type

await figma.loadFontAsync(TARGET);
await figma.loadFontAsync(DISPLAY);
await figma.loadFontAsync({ family: "Inter", style: "Medium" });

let n = 0;
for (const id of IDS) {
  const root = await figma.getNodeByIdAsync(id);
  for (const t of root.findAllWithCriteria({ types: ["TEXT"] })) {
    const segs = t.getStyledTextSegments(["fontName"]);
    if (!segs.some(s => s.fontName.family === "Inter")) continue;
    t.fontName = t.fontSize >= 32 ? DISPLAY : TARGET;
    n++;
  }
}
return { swapped: n };
```

**2. Footer on mobile.** The footer is a component built at 1364px and does not
reflow — it looks squeezed at 390px. It needs its own mobile variant. Out of
scope here because changing the component would affect home, Services and
Contact too.

**3. Placeholders left deliberately.** `[Provider name], [credential]`,
`[X] years`, `[Client initial]`, and all image frames marked `[replace]`.
Prices are illustrative and must be confirmed with Glowin.

## Imagery

Two kinds, and the distinction matters.

**Reused brand photography** — hero and provider frames pull `imageHash` values
from photos already in the file (the home hero close-up and the studio
portrait), so the pages read on-brand. These are stand-ins: the hero should
eventually show a treatment being performed rather than an editorial portrait,
and the provider frame needs the actual clinician.

**Purpose-drawn diagrams** — three new vector graphics, fully editable, built in
brand colours:

| Node | Diagram | Page |
|---|---|---|
| `253:114` | Penetration-depth cross-section — four laser modes reaching epidermis / dermis / deep dermis | MIIN Laser |
| `254:114` | Facial treatment-zone map — forehead, glabella, crow's feet with unit ranges | Botox |
| — | Before/after illustrative maps: pigment density (MIIN), expression-line depth (Botox) | both |

The before/after frames are **deliberately not fake photographs.** Using stock
faces as a fabricated before/after on a medspa site is misleading and a
regulatory exposure even in a mock, so they're drawn as honest diagrams —
scattered pigment that visibly thins, expression lines that visibly soften.
They communicate the outcome without pretending to be clinical evidence, and
their captions say so explicitly. Swap them for real consented photography
before launch.

**4. Still unfixed from v1** (they live in the existing frames, not mine):
"© 2026 Glossier." in the footer component, "Botos" → Botox and "INJETABLE" →
Injectable on the Services page, and the four competing category vocabularies.

## Editorial decisions worth reviewing

- **"Not suitable if" is given equal weight to "A good fit if."** Contraindications
  build more trust than a longer benefits list, and they are also the section a
  regulator would look for.
- **CTA is "Book a consultation," never "Buy."** The consult is the product.
- **The FAQ answers the awkward questions** — will anyone be able to tell, what
  if it doesn't work, what if I hate it. Softening these would waste the section.
- **Two separate timelines.** Recovery ("what you'll look like") and results
  ("when you'll see change") answer different anxieties and were kept apart.
- **Results-vary disclaimers** sit next to before/after and both timelines.
- No superlatives, no guarantees, no "best" — verified by scan across all frames.
