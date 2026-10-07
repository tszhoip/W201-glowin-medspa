import { useEffect, useState } from 'react'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'

// Live style guide at /design-showcase. Everything here is rendered from the real tokens and
// classes in src/styles/, so it can never drift from the site. Guideline: src/design.md.

const COLORS = [
  ['ink', 'Headings & body text'],
  ['ink-soft', 'Secondary text'],
  ['peach', 'Brand tan: footer, active states'],
  ['peach-dark', 'Brand tan, hover'],
  ['cta', 'Primary call-to-action'],
  ['cta-dark', 'CTA hover'],
  ['page', 'Site background'],
  ['surface', 'Cards'],
  ['field', 'Form inputs'],
  ['placeholder', 'Behind images'],
  ['line', 'Hairlines & outlines'],
  ['neutral', 'Quiet buttons'],
]

const TYPES = [
  ['type-hero', 'Where your timeless glow begins'],
  ['type-display', 'Platelet-Rich Plasma'],
  ['type-title', 'Page title'],
  ['type-heading', 'Section heading'],
  ['type-subheading', 'Card or panel heading'],
  ['type-section', 'Top Treatments'],
  ['type-feature', 'Big list or card title'],
  ['type-caps', 'Schedule a consultation'],
  ['type-card-title', 'How does it work'],
  ['type-kicker', 'Your Voice Matters'],
  ['type-lead', 'Lead paragraph: personalized treatments guided by clinical expertise.'],
  ['type-body', 'Body copy used inside cards and short descriptions.'],
  ['type-label', 'Label'],
]

const RADII = ['image', 'button', 'field', 'card', 'card-lg']

function Block({ title, note, children }) {
  return (
    <Section rule size="sm">
      <div className="mb-8">
        <h2 className="type-heading">{title}</h2>
        {note && <p className="type-body mt-2 max-w-2xl">{note}</p>}
      </div>
      {children}
    </Section>
  )
}

const Tag = ({ children, className = '' }) => <code className={`text-xs text-ink-soft ${className}`}>{children}</code>

export default function DesignShowcase() {
  const [hex, setHex] = useState({})

  useEffect(() => {
    const cs = getComputedStyle(document.documentElement)
    setHex(Object.fromEntries(COLORS.map(([n]) => [n, cs.getPropertyValue(`--color-${n}`).trim()])))
  }, [])

  return (
    <div>
      <Section innerClassName="pt-20">
        <h1 className="type-title mb-4">Glowin style guide</h1>
        <p className="type-lead max-w-2xl">
          Live preview of the site's design tokens and reusable styles. Edit values in <Tag>src/styles/tokens.css</Tag>,
          add components in <Tag>src/styles/components.css</Tag>, and read the rules in <Tag>src/design.md</Tag>.
        </p>
      </Section>

      <Block title="Colors" note="Tokens in tokens.css. Use as Tailwind utilities: text-ink, bg-cta, border-line ...">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COLORS.map(([name, role]) => (
            <div key={name}>
              <div className="h-16 rounded-card border border-line" style={{ background: `var(--color-${name})` }} />
              <p className="mt-2 text-sm font-medium">{name}</p>
              <p className="text-xs text-ink-soft">{hex[name]}</p>
              <p className="text-xs text-ink-soft">{role}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Typography" note="Switzer, 2% letter-spacing. Always pick a type-* class instead of sizing text by hand.">
        <div className="space-y-6">
          {TYPES.map(([cls, sample]) => (
            <div key={cls} className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 items-baseline">
              <Tag>.{cls}</Tag>
              <p className={cls}>{sample}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Buttons" note={<>Use <Tag>{'<Button variant size />'}</Tag> from components/ui/Button.jsx.</>}>
        <div className="space-y-6">
          {[
            ['cta', 'Primary action'],
            ['light', 'On photos & tinted surfaces (shown on a dark backdrop)'],
            ['neutral', 'Quiet / secondary'],
          ].map(([variant, note]) => (
            <div
              key={variant}
              className={`flex flex-wrap items-center gap-4 ${variant === 'light' ? 'rounded-card bg-ink/70 p-4' : ''}`}
            >
              <Tag className={`w-24 ${variant === 'light' ? 'text-white' : ''}`}>{variant}</Tag>
              {['sm', 'md', 'lg', 'hero'].map((size) => (
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

      <Block title="Form fields">
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

      <Block title="Cards, images and radii">
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
        <div className="mt-6 flex flex-wrap gap-4">
          {RADII.map((r) => (
            <div key={r} className="text-center">
              <div className="h-16 w-24 bg-peach" style={{ borderRadius: `var(--radius-${r})` }} />
              <Tag>rounded-{r}</Tag>
            </div>
          ))}
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="img-frame aspect-[4/3] grid place-items-center">
            <Tag>.img-frame (placeholder shows while an image is missing)</Tag>
          </div>
        </div>
      </Block>

      <Block
        title="Layout"
        note={<><Tag>{'<Section rule size innerClassName>'}</Tag> wraps content in <Tag>.page-container</Tag> with the standard vertical rhythm (<Tag>.section-y</Tag> 64px, <Tag>.section-y-sm</Tag> 56px). Anchors land below the fixed header automatically.</>}
      />
    </div>
  )
}
