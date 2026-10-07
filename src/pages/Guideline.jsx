import { useMemo } from 'react'
import tokensCss from '../styles/tokens.css?raw'
import componentsCss from '../styles/components.css?raw'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'

// Live style guideline at /guideline.
//
// AUTO: colors, radii, layout tokens and the class index are parsed straight from
//       src/styles/tokens.css and components.css, so anything added there shows up here
//       by itself. Classes that have no demo below get a "no demo yet" badge.
// MANUAL: the demos in this file. When you add a reusable style, add a demo here and list
//       its class in DEMOED so the badge disappears. Rules: src/design.md.

// ── Parsing ───────────────────────────────────────────────

function parseTokens(css) {
  const out = []
  let group = 'Other'
  for (const line of css.split('\n')) {
    const g = line.match(/^\s*\/\*\s*([^*]+?)\s*\*\/\s*$/)
    if (g) {
      group = g[1]
      continue
    }
    const m = line.match(/^\s*--([a-z0-9-]+):\s*([^;]+);\s*(?:\/\*\s*(.*?)\s*\*\/)?/)
    if (m) out.push({ name: m[1], value: m[2].trim(), note: m[3] || '', group })
  }
  return out
}

function parseClasses(css) {
  const groups = []
  let cur = null
  const seen = new Set()
  for (const line of css.split('\n')) {
    const h = line.match(/\/\*\s*──\s*([^─*]+?)\s*(?:─|\*\/)/)
    if (h) {
      cur = { name: h[1], items: [] }
      groups.push(cur)
      continue
    }
    const c = line.match(/^\s{2}\.([a-z][a-z0-9-]*)(?=[\s{,:.])/)
    if (c && cur && !seen.has(c[1])) {
      seen.add(c[1])
      const note = line.match(/\/\*\s*(.*?)\s*\*\//)
      cur.items.push({ name: c[1], note: note ? note[1] : '' })
    }
  }
  return groups
}

// ── Demo configuration (manual) ───────────────────────────

const TYPE_SAMPLES = {
  'type-h1': (
    <>
      We personalize treatments that <span className="highlight">enhance—not change</span>—what makes you unique.
    </>
  ),
  'type-display': 'Platelet-Rich Plasma',
  'type-title': 'Page title',
  'type-heading': 'Section heading',
  'type-subheading': 'Card or panel heading',
  'type-section': 'Top Treatments',
  'type-feature': 'Big list or card title',
  'type-caps': 'Schedule a consultation',
  'type-card-title': 'How does it work',
  'type-kicker': 'Your Voice Matters',
  'type-lead': 'Lead paragraph: personalized treatments guided by clinical expertise.',
  'type-body': 'Body copy used inside cards and short descriptions.',
  'type-label': 'Label',
}
// Classes that are modifiers rather than text styles; demoed inside the samples above.
const MODIFIERS = ['highlight']
const BUTTON_VARIANTS = [
  ['cta', 'Primary action'],
  ['light', 'On photos and tinted surfaces (shown on a dark backdrop)'],
  ['neutral', 'Quiet / secondary'],
]
const BUTTON_SIZES = ['sm', 'md', 'lg', 'hero']

// Every class that has a demo on this page.
const DEMOED = new Set([
  ...Object.keys(TYPE_SAMPLES),
  ...MODIFIERS,
  'btn',
  ...BUTTON_VARIANTS.map(([v]) => `btn-${v}`),
  ...[...BUTTON_SIZES, 'block'].map((s) => `btn-${s}`),
  'field', 'field-tint', 'field-lg', 'checkbox',
  'card', 'card-outlined', 'card-lg', 'card-interactive',
  'img-frame', 'page-container', 'section-y', 'section-y-sm', 'section-rule', 'hero',
  'nav-link', 'nav-dot',
])

// ── Small building blocks ─────────────────────────────────

const Tag = ({ children, className = '' }) => (
  <code className={`text-xs text-ink-soft ${className}`}>{children}</code>
)

function Block({ id, title, note, children }) {
  return (
    <Section id={id} rule size="sm">
      <div className="mb-8">
        <h2 className="type-heading">{title}</h2>
        {note && <p className="type-body mt-2 max-w-2xl">{note}</p>}
      </div>
      {children}
    </Section>
  )
}

const NAV = [
  ['workflow', 'Workflow'],
  ['colors', 'Colors'],
  ['typography', 'Typography'],
  ['buttons', 'Buttons'],
  ['forms', 'Forms'],
  ['cards', 'Cards & images'],
  ['radii', 'Radii'],
  ['layout', 'Layout'],
  ['navigation', 'Navigation'],
  ['index', 'Class index'],
]

// ── Page ──────────────────────────────────────────────────

export default function Guideline() {
  const tokens = useMemo(() => parseTokens(tokensCss), [])
  const classGroups = useMemo(() => parseClasses(componentsCss), [])

  const colors = tokens.filter((t) => t.name.startsWith('color-'))
  const radii = tokens.filter((t) => t.name.startsWith('radius-'))
  const others = tokens.filter((t) => !t.name.startsWith('color-') && !t.name.startsWith('radius-'))
  const colorGroups = [...new Set(colors.map((c) => c.group))]

  // type-* classes found in components.css but not in TYPE_SAMPLES still get a row.
  const extraTypes = classGroups
    .flatMap((g) => g.items)
    .filter((i) => i.name.startsWith('type-') && !TYPE_SAMPLES[i.name])

  const allClasses = classGroups.flatMap((g) => g.items)
  const missingDemos = allClasses.filter((i) => !DEMOED.has(i.name))

  return (
    <div>
      <Section innerClassName="pt-20">
        <p className="type-label mb-3">Temporary page</p>
        <h1 className="type-title mb-4">Style guideline</h1>
        <p className="type-lead max-w-2xl">
          The site's design language, rendered from the real tokens and classes. Edit values in{' '}
          <Tag>src/styles/tokens.css</Tag>, add reusable styles in <Tag>src/styles/components.css</Tag>.
        </p>
        <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="nav-link">
              {label}
            </a>
          ))}
        </nav>
      </Section>

      <Block id="workflow" title="Workflow">
        <ol className="type-body list-decimal pl-5 space-y-1 max-w-2xl">
          <li>Ask for a new or changed reusable style (token or class).</li>
          <li>It's added to <Tag>tokens.css</Tag> / <Tag>components.css</Tag>, then used in the pages.</li>
          <li>This page picks up the new token or class automatically; a demo is added so it can be reviewed.</li>
        </ol>
        {missingDemos.length > 0 ? (
          <p className="mt-6 rounded-card bg-cta/40 p-4 text-sm max-w-2xl">
            Needs a demo: {missingDemos.map((i) => `.${i.name}`).join(', ')}
          </p>
        ) : (
          <p className="mt-6 text-sm text-ink-soft">Every class in components.css has a demo.</p>
        )}
      </Block>

      <Block id="colors" title="Colors" note="Tokens in tokens.css. Use as utilities: text-ink, bg-cta, border-line …">
        {colorGroups.map((group) => (
          <div key={group} className="mb-8">
            <h3 className="type-label mb-4">{group}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colors
                .filter((c) => c.group === group)
                .map((c) => (
                  <div key={c.name}>
                    <div className="h-16 rounded-card border border-line" style={{ background: `var(--${c.name})` }} />
                    <p className="mt-2 text-sm font-medium">{c.name.replace('color-', '')}</p>
                    <p className="text-xs text-ink-soft">{c.value}</p>
                    {c.note && <p className="text-xs text-ink-soft">{c.note}</p>}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </Block>

      <Block id="typography" title="Typography" note="Switzer, 2% letter-spacing. Pick a type-* class; don't size text by hand.">
        <div className="space-y-6">
          {[...Object.entries(TYPE_SAMPLES), ...extraTypes.map((i) => [i.name, 'The quick brown fox jumps over the lazy dog'])].map(
            ([cls, sample]) => (
              <div key={cls} className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 items-baseline">
                <Tag>.{cls}</Tag>
                <p className={cls}>{sample}</p>
              </div>
            )
          )}
        </div>
      </Block>

      <Block id="buttons" title="Buttons" note={<>Use <Tag>{'<Button variant size />'}</Tag> from components/ui/Button.jsx.</>}>
        <div className="space-y-6">
          {BUTTON_VARIANTS.map(([variant, note]) => (
            <div
              key={variant}
              className={`flex flex-wrap items-center gap-4 ${variant === 'light' ? 'rounded-card bg-ink/70 p-4' : ''}`}
            >
              <Tag className={`w-24 ${variant === 'light' ? 'text-white' : ''}`}>{variant}</Tag>
              {BUTTON_SIZES.map((size) => (
                <Button key={size} variant={variant} size={size}>
                  {size}
                </Button>
              ))}
              <span className={`text-xs ${variant === 'light' ? 'text-white/80' : 'text-ink-soft'}`}>{note}</span>
            </div>
          ))}
          <div className="max-w-sm">
            <Button size="block">block (full width)</Button>
          </div>
        </div>
      </Block>

      <Block id="forms" title="Form fields">
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          <div className="space-y-4">
            <input className="field field-lg" placeholder=".field .field-lg" />
            <textarea className="field field-lg" placeholder="textarea.field-lg" />
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" className="checkbox" /> .checkbox
            </label>
          </div>
          <div className="card card-outlined space-y-4">
            <input className="field field-tint" placeholder=".field .field-tint (on a card)" />
            <input className="field field-tint" placeholder=".field .field-tint" />
          </div>
        </div>
      </Block>

      <Block id="cards" title="Cards & images">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card">
            <Tag>.card</Tag>
          </div>
          <div className="card card-outlined card-interactive">
            <Tag>.card .card-outlined .card-interactive</Tag>
          </div>
          <div className="card card-outlined card-lg">
            <Tag>.card .card-outlined .card-lg</Tag>
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="img-frame aspect-[4/3] grid place-items-center p-4 text-center">
            <Tag>.img-frame — wraps every photo; this placeholder shows while an image is missing</Tag>
          </div>
        </div>
      </Block>

      <Block id="radii" title="Radii & other tokens">
        <div className="flex flex-wrap gap-6">
          {radii.map((r) => (
            <div key={r.name} className="text-center">
              <div className="h-16 w-24 bg-peach" style={{ borderRadius: `var(--${r.name})` }} />
              <Tag>{r.name.replace('radius-', 'rounded-')}</Tag>
              <p className="text-xs text-ink-soft">{r.value}</p>
              {r.note && <p className="text-xs text-ink-soft">{r.note}</p>}
            </div>
          ))}
        </div>
        <div className="mt-8 space-y-1 text-sm">
          {others.map((t) => (
            <p key={t.name}>
              <Tag>--{t.name}</Tag> <span className="text-ink-soft">{t.value}</span>
            </p>
          ))}
        </div>
      </Block>

      <Block
        id="layout"
        title="Layout"
        note={<><Tag>{'<Section rule size innerClassName>'}</Tag> wraps content in <Tag>.page-container</Tag> with the standard vertical rhythm: <Tag>.section-y</Tag> 64px, <Tag>.section-y-sm</Tag> 56px, <Tag>.section-rule</Tag> hairline above. Anchors land below the fixed header automatically. Breakpoint: md (768px).</>}
      >
        <div className="rounded-card border border-line">
          <div className="page-container section-y-sm text-sm text-ink-soft">
            .page-container + .section-y-sm (this box is a live example)
          </div>
        </div>
      </Block>

      <Block id="navigation" title="Navigation">
        <div className="flex items-center gap-3 rounded-card bg-white px-4 py-3 max-w-md">
          <div className="nav-dot" />
          <span className="nav-link">Services</span>
          <span className="nav-link">Contact</span>
          <span className="ml-auto nav-link">Book Now</span>
          <div className="nav-dot" />
        </div>
      </Block>

      <Block id="index" title="Class index" note="Generated from components.css, so it is always complete.">
        <div className="space-y-8">
          {classGroups.map((g) => (
            <div key={g.name}>
              <h3 className="type-label mb-3">{g.name}</h3>
              <div className="divide-y divide-line rounded-card border border-line bg-surface">
                {g.items.map((i) => (
                  <div key={i.name} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-2">
                    <code className="text-sm w-48 shrink-0">.{i.name}</code>
                    <span className="text-sm text-ink-soft">{i.note}</span>
                    {!DEMOED.has(i.name) && (
                      <span className="ml-auto rounded bg-cta px-2 py-0.5 text-xs">no demo yet</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Block>
    </div>
  )
}
