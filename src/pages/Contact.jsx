import raw from '../content/contact.txt?raw'
import globalRaw from '../content/global.txt?raw'
import { parseContent, collectGroup } from '../lib/loadContent'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'

const c = parseContent(raw)
const g = parseContent(globalRaw)
const cards = collectGroup(c, 'CARD', ['TITLE', 'BODY'])
const faqs = collectGroup(c, 'FAQ', ['TITLE', 'BODY'])

// Address, phone and email come from global.txt (single source); {phone} / {email} in contact.txt are filled in here.
const address = g.FOOTER_ADDRESS
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
const fill = (text) => text.replace('{phone}', g.FOOTER_PHONE).replace('{email}', g.FOOTER_EMAIL)

export default function Contact() {
  return (
    <div>
      {/* Find us: text + map */}
      <Section innerClassName="below-header pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-x-10 gap-y-10 items-start">
          <div className="md:pt-10">
            <p className="type-body">{c.LABEL}</p>
            <h1 className="type-display mt-3">{c.TITLE}</h1>
            <p className="type-lead mt-5 max-w-md">{c.BODY}</p>
            <Button href={directionsHref} size="lg" className="mt-6" target="_blank" rel="noopener noreferrer">
              {c.DIRECTION_CTA}
            </Button>
          </div>

          <div className="img-frame aspect-[895/551]">
            <iframe
              src={mapSrc}
              title="Map"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>

      {/* Hours, parking, contact details */}
      <Section rule size="sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <div key={card.title} className="card text-center">
              <p className="text-2xl text-cta">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="type-card-title mt-4">{card.title}</h2>
              <p className="type-body mt-3 whitespace-pre-line">{fill(card.body)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section rule size="sm">
        <h2 className="type-subheading font-normal mb-6">{c.FAQ_TITLE}</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.title} className="card card-outlined">
              <h3 className="type-card-title">{faq.title}</h3>
              <p className="type-body mt-3 max-w-3xl">{faq.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
