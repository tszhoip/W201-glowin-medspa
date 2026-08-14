# Glowin Medspa — Design System

## 1. Visual Theme & Atmosphere

Glowin's website is an exercise in clinical clarity and healing warmth — a digital sanctuary where professional medspa expertise and patient trust are paramount. The page opens with generous full-viewport hero sections featuring beautiful treatment imagery: before/after results, clinical equipment, serene treatment rooms, and professional close-ups against soft, neutral backgrounds. There are no decorative borders, no gradients, no patterns, no shadows. The UI exists only to guide patients toward booking, getting information, and connecting with the practice. Every pixel that isn't treatment imagery or essential navigation is cream-colored whitespace, and that restraint conveys professionalism and medical precision.

The color philosophy is restrained and purposeful: a single peach (#e8b294) for primary calls to action, three shades of neutral ink for text hierarchy, and cream for everything else. The entire emotional weight is carried by photography — lifestyle shots of relaxed patients, close-up clinical imagery showing expertise, serene treatment room compositions that instill confidence. The UI chrome dissolves into the imagery. The navigation bar floats above the hero with no visible background, border, or shadow — the Glowin logotype and navigation labels simply exist in the space, trusting the professional content beneath them to provide sufficient contrast and credibility.

Typography uses a system that combines serif headings for warmth with clean sans-serif for clarity — unifying the website and mobile experience into a single professional voice. Display headings render treatment titles at 40px weight 500, while body/UI text handles everything from navigation (14px/500) to body copy (14px/400). The font selection carries precision without coldness, sophistication without clinical sterility — exactly matching Glowin's brand identity of advanced medical technology delivered with human warmth. There are no text shadows, no text gradients, no decorative type treatments. Every letterform earns its place through clarity and professionalism alone.

**Key Characteristics:**
- Full-viewport hero sections (100vh) dominated by beautiful treatment/results photography with minimal overlay UI
- Near-zero UI decoration: no shadows, no gradients, no borders, no patterns anywhere on the page
- Single accent color — Peach (#e8b294) — used exclusively for primary CTA buttons (Book Now, Schedule Consultation)
- Typography system combining serif display + clean sans-serif body
- Professional imagery-first presentation where treatment results and clinic expertise carry all emotional weight
- Frosted-glass navigation concept with transparent/white nav that floats over hero content
- 0.33s cubic-bezier transitions as the universal timing for all interactive state changes
- Carousel-driven hero with dot indicators for before/after showcase
- Persistent Tawk.to chat for real-time patient questions and support

## 2. Color Palette & Roles

### Primary
- **Peach** (`#e8b294`): Primary CTA button background — a warm, confident peachy tone (rgb 232, 178, 148) that stands alone as the only chromatic color in the entire interface. Used exclusively for "Book Now", "Schedule Consultation", and other primary action buttons
- **Cream** (`#faf6f1`): Dominant background color for all surfaces, panels, navigation, and secondary button fills — the canvas that lets professional imagery breathe

### Secondary & Accent
- **Peach-Dark** (`#d99872`): Peach hover/active state — a darker shade of the primary for interactive feedback
- No secondary accent colors exist. Glowin deliberately avoids color variety to maintain clinical focus and visual discipline

### Surface & Background
- **Cream Canvas** (`#faf6f1`): Page background, navigation panel, dropdown menus, and all surface containers — warm, inviting, professional
- **Cream-Dark** (`#f1e9df`): Subtle alternate surface for section differentiation — barely perceptible shift from pure cream (rgb 241, 233, 223)
- **Ink** (`#2b2a28`): Dark surface color for text overlays and potential dark-mode contexts (rgb 43, 42, 40) — a warm near-black with subtle warmth
- **Frosted Glass** (`rgba(250, 246, 241, 0.75)`): Semi-transparent cream for navigation backdrop-filter effects on scroll

### Neutrals & Text
- **Ink** (`#2b2a28`): Primary heading and navigation text — the darkest text value (rgb 43, 42, 40), used for treatment names, nav labels, and hero titles on light backgrounds
- **Ink-Soft** (`#6b6560`): Body text and secondary content (rgb 107, 101, 96) — the default paragraph color, warm neutral gray
- **Ink-Soft 70%** (`rgba(107, 101, 96, 0.7)`): Tertiary text for sub-links and secondary navigation
- **Ink-Soft 50%** (`rgba(107, 101, 96, 0.5)`): Placeholder text in input fields and disabled states
- **Cream-Dark** (`#f1e9df`): Light borders and divider lines (rgb 241, 233, 223)
- **Cream-Dark 60%** (`rgba(241, 233, 223, 0.6)`): Subtle UI borders and delineation

### Semantic & Accent
- Glowin's medical site avoids semantic color coding (no red/green status indicators in most contexts). Error and warning states follow standard browser defaults in form contexts
- The peach CTA (#e8b294) serves as the sole interactive color signal — immediately recognizable across the site

### Gradient System
- No gradients are used anywhere in the interface
- Depth is achieved entirely through photography, whitespace, and the binary contrast between full-bleed imagery and clean cream surfaces
- The navigation achieves layering through opacity (frosted glass effect) rather than gradient or shadow

## 3. Typography Rules

### Font Family
- **Display**: Serif font stack (`Georgia, serif`, or system serif) — used for hero titles and treatment names. Warm, professional, approachable for medical context
- **Text/UI**: **Switzer Medium** (500) from Fontshare — used for navigation, body copy, buttons, and all UI text. Clean geometric sans-serif optimized for medical/professional clarity. Single weight: 500 (Medium) only
- **Weight Lock**: Only Medium (500) is used across the entire site. No light, no bold, no weight variation
- **No OpenType features** — typography is completely unembellished
- **No italic variants** used in primary site navigation

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Hero Title | 40px (2.50rem) | 500 | 48px (1.20) | normal | Display serif, cream text on professional imagery |
| Treatment Name | 17px (1.06rem) | 500 | 20px (1.18) | normal | Text sans-serif, treatment names in nav panel and cards |
| Nav Item | 14px (0.88rem) | 500 | 16.8px (1.20) | normal | Text sans-serif, primary navigation labels |
| Body Text | 14px (0.88rem) | 400 | 20px (1.43) | normal | Text sans-serif, paragraph and descriptive content |
| Button Label | 14px (0.88rem) | 500 | 16.8px (1.20) | normal | Text sans-serif, CTA button text |
| Sub-link | 14px (0.88rem) | 400 | 20px (1.43) | normal | Tertiary links (Learn, Details, View Results) |
| Promo Text | 22px (1.38rem) | 400 | 20px (0.91) | normal | Cream/white promotional text on hero ("New Treatment Available") |
| Category Label | 16px (est.) | 500 | — | normal | Cream text labels on treatment cards ("Non-Invasive Lifting") |

### Principles
- **"Normal" letter-spacing everywhere**: Unlike most modern brands that use negative tracking, Glowin uses default letter-spacing at every level. This reflects professional confidence — the typefaces speak for themselves without manipulation
- **Weight restraint**: Only two weights appear — 500 (medium) for headings/UI and 400 (regular) for body. No bold (700), no light (300). The system avoids typographic drama in favor of clinical clarity
- **Unified font sizing**: Most UI text clusters at 14px with only hero titles (40px) and promo text (22px) breaking away. This extreme uniformity creates a sense of engineered precision
- **Display vs Text split**: Two-variant system (Display serif for hero, Text sans-serif for UI) creates subtle optical correction without visible stylistic difference — they appear as a coordinated system at different sizes
- **No text transforms**: No uppercase text appears in the main navigation or CTAs — the lowercase approach reinforces professionalism and approachability

## 4. Component Stylings

### Buttons
All buttons use subtly-rounded rectangles (6px border-radius) — creating a refined, professional aesthetic that mirrors the precision of medical practice.

**Primary CTA** — The main action button:
- Default: bg `#e8b294` (Peach), text `#2b2a28` (Ink), fontSize 14px, fontWeight 500, padding 4px with inner content centering, borderRadius 6px, minHeight 40px, width 200px
- Border: 3px solid transparent (reserves space for focus/active border animation)
- Box Shadow: `rgba(0,0,0,0) 0px 0px 0px 2px inset` (invisible at rest, animates to visible on focus)
- Transition: `background-color 0.33s, color 0.33s, box-shadow 0.25s`
- Hover: `#d99872` (Peach-Dark)
- Used for: "Book Now", "Schedule Consultation", "Get Started"

**Secondary CTA** — The alternative action button:
- Default: bg `#ffffff`, text `#2b2a28` (Ink), same dimensions and border pattern as primary
- Transition: identical timing to primary (0.33s)
- Used for: "Learn More" alongside primary CTA

**Nav Button** — Top navigation items:
- Default: bg transparent, text `#2b2a28` (Ink), fontSize 14px, fontWeight 500, borderRadius 6px, padding 4px 16px, minHeight 32px
- Transition: `color 0.33s, background-color 0.33s`
- Active/expanded: subtle background highlight with cream-dark
- Used for: "Home", "About", "Services", "Contact", "Blog"

**Text Link** — In-content actions:
- Default: text `#6b6560` (Ink-Soft), fontSize 14px, fontWeight 400, no background, no border
- Hover: underline decoration with color shift to `#2b2a28`
- Transition: `box-shadow 0.33s, color 0.33s`
- Used for: "Learn More", "View Results", "More Details", "Schedule" links

### Cards & Containers

**Treatment Card** (Navigation panel / Browse page):
- Background: transparent (inherits panel cream)
- Border: none
- Shadow: none
- Content: treatment image (professional photography) + treatment name centered below + two text links
- Layout: 3-column grid within the dropdown panel on desktop
- No hover animation on the card itself — interaction is via the text links beneath

**Results Card** (Homepage/Services section):
- Background: full-bleed professional treatment results photography
- Border radius: approximately 12px (subtly rounded)
- Overflow: hidden (clips image to rounded corners)
- Text: cream label in top-left corner ("Non-Invasive Lifting", "Clinical Results")
- Size: large format, approximately 2:1 aspect ratio
- No shadow, no border, no overlay gradient — text relies on image and subtle overlay for contrast

**Info Card** (Treatment detail pages):
- Background: `#ffffff` or `#f1e9df` (cream-dark) for subtle alternation
- Border: none
- Shadow: none (or minimal `rgba(0,0,0,0.02)` only if depth needed)
- Content: treatment description, benefits, technical specs
- Spacing: generous padding (16-24px) to reflect medical professionalism

### Inputs & Forms
- Background: transparent or `#ffffff` (white)
- Text color: `#2b2a28` (Ink)
- Placeholder color: `rgba(107, 101, 96, 0.5)` (Ink-Soft 50%)
- Border: minimal 1px `#f1e9df` (Cream-Dark)
- Font: sans-serif, 14px
- Contact form and booking inputs maintain this clean, focused aesthetic
- The Tawk.to chat input bar sits at the viewport bottom with a clean cream background and subtle border

### Navigation
- **Desktop**: Centered horizontal nav with Glowin logotype on the left, navigation buttons center-aligned (Home, About, Services, Contact, Blog, Machines), and icons on the right
- **Background**: Cream (transitions from transparent over dark hero to opaque cream on scroll)
- **Dropdown panel**: Full-width cream panel with 3-column treatment grid + right sidebar text links, no shadow, no border — appears seamlessly below the nav
- **Sticky behavior**: Remains at top
- **Mobile**: Hamburger collapse with slide-in menu from left
- **No visible separator** between nav and content — the nav blends with the hero

### Image Treatment
- **Hero**: Full-viewport (100vh) sections with professional treatment/results photography — edge-to-edge, no padding, no margin
- **Treatment images**: Professional high-quality photographs on cream background in dropdown panel
- **Results cards**: Professional before/after or treatment room imagery with approximately 2:1 ratio, rounded corners (12px)
- **Carousel**: Auto-advancing with dot indicators and left/right arrow navigation on edges for treatment showcase
- **Lazy loading**: Below-fold sections use lazy loading, rendering as blank cream until scrolled into view

### Persistent Chat Bar
- Anchored to viewport bottom, visible across all sections
- Cream background with subtle border
- Contains: Tawk.to chat widget for real-time patient support
- Provides: immediate access to questions, appointment scheduling, consultation requests

## 5. Layout Principles

### Spacing System
- **Base unit**: 8px
- **Common values**: 8px (0.5rem), 16px (1rem), 24px (1.5rem), 32px (2rem)
- **Button padding**: 4px (minimal outer) with content centering via flexbox, 4px 16px for nav items
- **Section padding**: Full-viewport sections with content centered vertically
- **Card gap**: approximately 16px between treatment cards

### Grid & Container
- **Max width**: approximately 1200-1383px (full viewport width for most content)
- **Hero**: Full-bleed, edge-to-edge, 100vh sections with professional imagery
- **Navigation panel**: 3-column grid for treatment cards with right-aligned text sidebar (~70/30 split)
- **Treatment cards**: 2-up or 3-up horizontal layout depending on section

### Whitespace Philosophy
Glowin uses whitespace as a professional and luxury signal. The generous vertical spacing between sections (each section is a full viewport height) means you can only see one "message" at a time — one treatment showcase, one success story, one call-to-action. This creates a gallery-like browsing experience where each scroll is a deliberate transition, not a continuous feed. White space is not empty — it's the frame that elevates each treatment result and builds patient confidence through clarity.

### Border Radius Scale
| Value | Context |
|-------|---------|
| 0px | Most elements — sharp edges are the default |
| 6px | Buttons (primary, secondary, nav items) — subtle but refined rounding |
| 12px | Treatment cards and result cards — noticeable but restrained rounding on larger surfaces |
| 50% | Chat/input focus states and decorative elements — perfect circles |

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Level 0 (Flat) | No shadow, no border | Default state for all elements — cards, panels, buttons at rest |
| Level 1 (Frost) | `rgba(250,246,241,0.75)` backdrop | Navigation bar on scroll — frosted glass transparency |
| Level 2 (Overlay) | `rgba(128,128,128,0.65)` | Modal overlays and region/cookie popups |
| Level 3 (Subtle) | `rgba(0,0,0,0.05)` | Minimal shadow hints on rare hover states, focus rings |

### Shadow Philosophy
Glowin's approach to elevation is essentially "none." The site avoids box-shadows entirely in its primary interface. Depth is communicated through three alternative strategies:
1. **Z-index layering**: The sticky navigation sits above hero content through positioning, not shadow
2. **Opacity-based transparency**: The frosted glass nav and overlay modals use background-color opacity rather than shadow to indicate layering
3. **Photography-as-depth**: The full-bleed professional images create their own visual depth through lighting, composition, and clinical authenticity — making UI shadows redundant and unprofessional

### Decorative Depth
- No gradients, glows, or atmospheric effects on UI elements
- The hero imagery itself provides all visual richness — professional treatment room lighting, confident patient expressions, clinical precision
- The carousel arrow buttons use a semi-transparent cream background to float above the hero imagery without disrupting it

## 7. Do's and Don'ts

### Do
- Let professional treatment imagery dominate every screen — the results and expertise ARE the design
- Use Peach (#e8b294) exclusively for primary CTAs — never for decorative purposes
- Maintain viewport-height sections for major content blocks — one message per screen
- Keep typography at weight 400-500 only — no bold, no light, no extremes
- Use 6px border-radius for all interactive elements — refined precision over playfulness
- Trust whitespace as a professional signal — never fill available space just because it's empty
- Keep all transitions at 0.33s — consistency in motion is as important as consistency in color
- Use professional photography on cream backgrounds for treatment showcases
- Center CTAs horizontally below treatment names — the vertical rhythm is name → benefits → buttons
- Maintain the serif/sans-serif font split — serif for hero-scale text only, sans-serif for everything else
- Ensure all medical content is accurate and professionally vetted

### Don't
- Add shadows to any element — elevation through shadow contradicts the clinical, gallery aesthetic
- Use more than one chromatic color besides the peach CTA — the palette is intentionally neutral-plus-one
- Apply gradients, patterns, or decorative backgrounds to surfaces — cream and professional photography are the only backgrounds
- Use text larger than 40px on the web — the typography is deliberately restrained even at hero scale
- Add borders to cards or containers — separation is achieved through spacing, not lines
- Use uppercase text transforms in primary navigation — professionalism is expressed through lowercase calm
- Introduce rounded-pill buttons or large border-radii — the 6px radius is deliberate and refined
- Override the font system with other typefaces — cross-platform clarity is a core value
- Add hover animations with scale/translate transforms — interactions are color-only (background and border transitions)
- Clutter the viewport with multiple CTAs — every screen should have at most two action buttons
- Use medical jargon without explanation — prioritize patient understanding over technical accuracy
- Mix clinical imagery with overly styled UI — let the professionalism of the content dominate

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <768px | Single-column layout, hamburger nav replaces horizontal labels, hero text scales to ~28px, CTA buttons stack vertically, treatment cards become full-width, image sizes reduce |
| Tablet | 768-1024px | 2-column treatment grid, hero maintains full-viewport height, CTAs remain side-by-side, reduced horizontal padding, larger touch targets |
| Desktop | 1024-1440px | Full horizontal nav, 3-column treatment grid in dropdown, hero at 40px, side-by-side CTAs at 200px/160px width, full-resolution imagery |
| Large Desktop | >1440px | Content remains centered, hero photography scales to fill wider viewports, max-width container for nav panel content, enhanced image quality |

### Touch Targets
- Primary CTA buttons: 200px × 40px minimum (well above 44×44px WCAG requirement)
- Nav buttons: minimum 32px height with 4px 16px padding — adequate touch targets
- Carousel arrows: ~44px square cream semi-transparent buttons at viewport edges
- Text links ("Learn", "Book"): 14px text with adequate line-height spacing for touch
- Chat/input fields: minimum 44px touch-friendly targets

### Collapsing Strategy
- **Navigation**: Horizontal category buttons (Home, About, Services, Contact, Blog, Machines) collapse to a hamburger/drawer menu on mobile
- **Hero CTA pair**: Side-by-side buttons on desktop stack vertically on mobile
- **Treatment cards**: 3-column layout collapses to 2-column on tablet, single-column full-width on mobile
- **Treatment grid**: 3-column grid on desktop becomes 2-column on tablet, single-column on mobile
- **Spacing**: Section vertical padding remains generous (viewport-height sections) but horizontal padding reduces on mobile (16px minimum)

### Image Behavior
- Hero images are fully responsive and fill the entire viewport at every breakpoint
- Treatment images use `object-fit: cover` to maintain professional composition across widths
- Professional photos in cards scale proportionally within their grid cells
- Treatment card images maintain landscape ratio and clip via `overflow: hidden` with border-radius

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: "Peach (#e8b294)"
- Background: "Cream (#faf6f1)"
- Heading text: "Ink (#2b2a28)"
- Body text: "Ink-Soft (#6b6560)"
- Tertiary text: "Ink-Soft 70% opacity"
- Placeholder: "Ink-Soft 50% opacity"
- Alternate surface: "Cream-Dark (#f1e9df)"
- Hover/Active: "Peach-Dark (#d99872)"

### Example Component Prompts
- "Create a hero section with a full-viewport background image of professional treatment results, centered 'Lifting Treatment' title in serif at 40px weight 500 in cream, a subtitle line below, and two buttons side by side: a primary Peach (#e8b294) 'Book Now' button and a secondary cream 'Learn More' button, both with 4px border-radius and 40px height"

- "Design a navigation bar with the Glowin Medspa logotype on the left, five text buttons (14px, weight 500, Ink #2b2a28) centered (Home, About, Services, Contact, Blog), and a hamburger icon on the right visible only on mobile, all on a cream background with no shadow or border"

- "Build a treatment card grid with 3 columns, each card showing a professional treatment photo above a treatment name (17px, weight 500, Ink) and two text links (14px, weight 400, Ink-Soft #6b6560) labeled 'Learn' and 'Book', on a pure cream surface with no borders or shadows"

- "Create a results card with full-bleed professional before/after photography, 12px border-radius, overflow hidden, and a cream text label ('Non-Invasive Lifting Results') positioned in the top-left corner with no overlay gradient"

- "Design a booking form with Ink-colored labels, transparent or white input fields with Cream-Dark (#f1e9df) borders, placeholder text in Ink-Soft 50%, and a prominent Peach (#e8b294) 'Book Now' submit button (200px wide, 40px height, 4px border-radius)"

### Iteration Guide
When refining existing screens generated with this design system:
1. Focus on ONE component at a time — Glowin's system is so minimal that each element must be pixel-perfect and professional
2. Reference specific color names and hex codes from this document — there are only 6 colors in the entire system
3. Use natural language descriptions, not CSS values — "barely rounded corners" not "border-radius: 4px"
4. Describe the desired "feel" alongside specific measurements — "gallery-like confidence in treatment results" communicates the whitespace philosophy better than "margin-bottom: 100vh"
5. Always verify that professional imagery is doing the emotional heavy-lifting — if the UI itself feels "designed," it's too much
6. Ensure medical accuracy and professionalism in all copy and imagery — Glowin represents real clinical expertise
7. Prioritize patient trust through clarity — every design choice should reduce friction to booking a consultation
