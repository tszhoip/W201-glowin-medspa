import raw from '../content/members.txt?raw'
import { parseContent, collectGroup } from '../lib/loadContent'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'

const c = parseContent(raw)
const tiers = collectGroup(c, 'TIER', ['NAME', 'PRICE', 'PERIOD', 'BLURB', 'FEATURES', 'CTA'])

// /members: three membership tiers. All copy (dummy for now) lives in src/content/members.txt.
export default function Members() {
  return (
    <div>
      <Section>
        <h1 className="type-h1 mb-4">{c.TITLE}</h1>
        <p className="type-lead max-w-2xl">{c.BODY}</p>
      </Section>

      <Section innerClassName="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`card card-outlined flex flex-col ${i === 1 ? 'border-peach' : ''}`}
            >
              <h2 className="type-card-title">{tier.name}</h2>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="type-h1">{tier.price}</span>
                <span className="type-body">{tier.period}</span>
              </p>
              <p className="type-body mt-4">{tier.blurb}</p>

              <ul className="type-body mt-6 mb-8 list-disc pl-5 space-y-2 border-t border-line pt-6">
                {tier.features.split('\n').map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <Button to="/book-now" variant={i === 1 ? 'cta' : 'neutral'} size="lg" className="mt-auto">
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
        <p className="type-body mt-6">{c.NOTE}</p>
      </Section>
    </div>
  )
}
