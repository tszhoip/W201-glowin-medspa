# Cowork brief — design the Service Detail page template (Figma)

Paste everything below the line into a new Cowork session.

---

## Project

You're designing in Figma for **Glowin Medspa** — a Los Angeles medspa brand.
Home, Services, and Contact are already designed. Your job is the **service
detail page** — and it needs to work as a reusable template across ~20
treatments and devices, not as a one-off.

## Figma access

- File: https://www.figma.com/design/xUjXx2sd4ZrtsKMQo5sSvX/Glowin-Medspa?node-id=184-4750
- fileKey: `xUjXx2sd4ZrtsKMQo5sSvX`
- Page: **Wireframe**, node `184:4750`
- Design at 1364px wide. Place the new frame to the right of the existing
  "Contact" frame. Name it `Service details page v2`.

### Read these before designing anything

Match the existing type scale, spacing rhythm, color, and component style. Do
not introduce a new visual language.

| Node | Frame | Why |
|---|---|---|
| `224:346` | home | Section rhythm, label style, card treatment |
| `230:457` | Services | Filter tabs, grid, tech blurb |
| `232:648` | Services details page | The v1 you are replacing |
| `232:758` | Contact | Form block |
| `224:327` | footer | Reuse as-is, don't redraw |

Existing look: editorial, near-white background, warm tan footer band, hairline
dividers, quiet left-gutter section labels, generous whitespace, close-crop
warm-toned photography. Clinical confidence, not spa fluff.

---

## The actual service menu

This is what the template has to accommodate. Group and slug accordingly.

### Injectables
| Treatment | Notes |
|---|---|
| Botox | Neuromodulator |
| Dermal Fillers | HA fillers |
| Sculptra | Collagen stimulator, results build over months |
| Skin Boosters | Hydrating injectables |
| PRP Injections | Uses patient's own blood — needs a draw step in the visit flow |
| PDO Threads | Thread lift — a minor procedure, not a device treatment |

### Skin Tightening / Lifting (energy-based devices)
| Device | Technology |
|---|---|
| Ultherapy | Micro-focused ultrasound (HIFU) |
| Shurink | HIFU |
| V-Zet | HIFU |
| Thermage | Monopolar radiofrequency |
| Inmode | RF platform (multiple handpieces) |
| Agnes RF | RF microneedling — targeted, insulated needles |
| Scarlet RF | RF microneedling — broader treatment area |

### Skin Rejuvenation / Resurfacing / Pigment
| Device | Technology |
|---|---|
| CO2 | Fractional CO2 laser resurfacing — real downtime |
| Miin Laser | Q-switched Nd:YAG, 1064nm + 532nm — pigment, tattoo |
| Noblex | 755nm long-pulse Alexandrite — hair removal, pigment, vascular |

### Skin Care (non-device)
| Treatment |
|---|
| Acne Treatment |
| Facial Care |

> **Verify before writing clinical copy.** Device categories above are
> researched, but indications, settings, and protocols vary by clinic and must
> be confirmed with Glowin and the device manufacturers. Use realistic
> placeholder copy; flag anything you're unsure of rather than asserting it.

### Why the menu shapes the template

The range above is wide, and that's the actual design problem:

- **CO2** has a week of downtime. **Botox** has none. A recovery timeline is
  essential on one and absurd on the other.
- **Miin Laser** has four laser modes worth a spec graphic. **Facial Care** has
  no specs at all.
- **Sculptra** results build over 3 months. **Fillers** are immediate. The
  results timeline has to stretch and compress.
- **PRP** involves drawing the patient's blood — its visit flow has a step no
  other treatment has.

So: **every section must be optional and the page must not collapse when one is
absent.** Build with components and clear slots. Adding a treatment should be a
content swap, not a redesign.

### Taxonomy inconsistency to resolve

The category names don't currently agree across the file. Pick one set and
apply it everywhere:

- Services page tabs: All Services / Injectable / Skin Tightening / Skin Rejuvenation
- Home "Top Seller": Skin Tightening / Injectable / Skin Regen
- Home "Services" list: Face / Body / Eye / Regen
- Footer: Lifting / Injectables / Skincare / Body

---

## What the page is for

This is the page someone reads while deciding whether to let a stranger perform
a procedure **on their face**. Design it to answer their questions in the order
those questions actually occur to them. That sequence is the layout brief.

**1. "Is this the right thing for what's bothering me?"**
Breadcrumb, treatment name, one honest sentence on what it does. A key-facts
strip high on the page so the essentials read in five seconds: duration,
downtime, sessions needed, discomfort level, price from. Hero image of the
treatment being performed — not a stock beauty portrait.

**2. "Is this for someone like me?"**
What it treats. Who it suits. **Who should not have it** — pregnancy,
medications, skin conditions, recent sun exposure. Being explicit about who
shouldn't builds more trust than a longer benefits list.

**3. "What is actually going to happen to me?"**
How it works, in plain language — mechanism, not marketing. Then the visit as a
step sequence: consult → prep/numbing → treatment → aftercare. Let the client
mentally rehearse the appointment before booking it.

**4. "Why should I believe this technology?"**
A restrained spec block. Reference model: a 4-across or 2×2 grid, each cell a
large spec label with a short plain-English line beneath — numbers large,
explanation small. It's a spec table with good typography, not an illustration.
No fake charts, no decorative diagrams. This section is absent for facials.

**5. "Who is doing this to my face?"**
Provider credentials, licensure, and training on this specific device. This is
doing more work than it looks like — someone choosing between clinics is
choosing between people. If Glowin has real credentials worth naming, this
section should be larger than a footnote.

**6. "How long until I look normal / look good?"**
Two timelines, kept separate:
- **Recovery** — what you look like at 24h, 3 days, 1 week
- **Results** — when it starts, when it peaks, how long it lasts

A horizontal timeline reads better than bullets. Both sections are optional.

**7. "Does it actually work?"**
Before & after pairs plus a testimonial specific to this treatment — not the
generic homepage quotes.

**8. "What's the catch?"**
Precautions and aftercare. FAQ covering what people won't ask out loud: does it
hurt, will anyone be able to tell, what if I hate it, what if it doesn't work.

**9. "Okay, how do I start?"**
Pricing, then the existing SCHEDULE A CONSULTATION form block. Primary CTA is
**"Book a consultation"** — the consult is the actual product, not the syringe.

---

## Constraints

- **Skimmable in 30 seconds, complete in 5 minutes.** Someone reading only the
  section labels and the key-facts strip should still be able to decide.
- **Medical honesty.** No guaranteed outcomes, no "best," no superlatives.
  Include a results-vary disclaimer near before/after. Aesthetics advertising is
  regulated and overclaiming is real liability.
- **Restraint over decoration.** Match the existing editorial calm.
- **Responsive.** Design desktop at 1364px, plus a 390px mobile composition for
  at least the key-facts strip, the spec grid, and the timeline — those three
  break worst on small screens.

## Deliverable

1. Desktop frame (1364px) — worked example populated with **MIIN Laser**, so
   the template is tested against real content rather than lorem ipsum
2. Mobile frame (390px)
3. A second desktop variant populated with **Botox** — proving the template
   survives when the spec grid and recovery timeline are removed
4. The reusable components used to build them, properly named

---

## Note on the source material

Reference screenshots from a comparable clinic site (MIIN Laser detail page,
category nav) were reviewed to inform this brief — specifically the duration
chip, the HOW IT WORKS / WHAT IT TREATS / BENEFITS section pattern, and the
1064S / 1064D / QUASI / 532 spec grid. Use them as structural reference for
what information belongs on the page. **Do not copy their layout, type, or
color** — Glowin's own design language is established in the file and takes
precedence.
