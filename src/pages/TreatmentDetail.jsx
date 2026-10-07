import { Link, useParams } from 'react-router-dom'
import { findTreatment, sections, treatmentImage } from '../lib/treatments'
import { parseContent } from '../lib/loadContent'
import raw from '../content/treatment-detail.txt?raw'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import ConsultationForm from '../components/ConsultationForm'
import NotFound from './NotFound'

const c = parseContent(raw)

// Template for every /treatments/:slug page. Treatment data comes from
// src/content/treatments.xlsx; page copy comes from src/content/treatment-detail.txt.
export default function TreatmentDetail() {
  const { id } = useParams()
  const t = findTreatment(id)

  if (!t) return <NotFound />

  const intro = treatmentImage(t.intro)
  const beforeAfter = treatmentImage(t.image)
  const type = sections.find((s) => s.name === t.type)

  // Optional cards: only the filled ones show, numbered in order.
  const cards = [
    { title: c.CARD_HOW_TITLE, html: t.howHtml },
    { title: c.CARD_TREATS_TITLE, text: t.treats },
    { title: c.CARD_BENEFIT_TITLE, text: t.benefit },
  ].filter((card) => card.html || card.text)

  return (
    <div>
      {/* Hero: label + title block on one row, intro image underneath on the left */}
      <Section innerClassName="pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
          <div>
            <Link
              to={type ? `/services#${type.anchor}` : '/services'}
              className="type-label hover:text-ink transition-colors"
            >
              {t.type}
            </Link>
          </div>

          <div className="md:row-start-1 md:col-start-2">
            <h1 className="type-display">{t.title}</h1>
            {t.blurb && <p className="type-lead mt-6 max-w-xl">{t.blurb}</p>}
            <Button href="#book" size="lg" className="mt-6">
              {c.HERO_CTA}
            </Button>
          </div>

          {intro && (
            <div className="img-frame md:col-start-1 md:row-start-2 aspect-[688/464]">
              <img src={intro} alt={t.title} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </Section>

      {/* Numbered cards */}
      {cards.length > 0 && (
        <Section rule size="sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card, i) => (
              <div key={card.title} className="card">
                <p className="text-2xl text-cta">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="type-card-title mt-5">{card.title}</h2>
                {card.html ? (
                  <div
                    className="type-body mt-4 space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:underline [&_strong]:text-ink"
                    dangerouslySetInnerHTML={{ __html: card.html }}
                  />
                ) : (
                  <p className="type-body mt-4 whitespace-pre-line">{card.text}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Does it work? - before & after */}
      {beforeAfter && (
        <Section rule size="sm" innerClassName="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-8 gap-y-6">
          <p className="type-label">{c.LABEL_DOES_IT_WORK}</p>
          <figure>
            <img src={beforeAfter} alt={`${t.title} before and after`} className="w-full h-auto rounded-image" />
            <figcaption className="mt-3 text-sm text-ink-soft">{c.BEFORE_AFTER_CAPTION}</figcaption>
          </figure>
        </Section>
      )}

      {/* Book */}
      <Section
        id="book"
        rule
        size="sm"
        innerClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[200px_1fr_1fr] gap-x-8 gap-y-6"
      >
        <p className="type-label md:col-span-2 lg:col-span-1">{c.LABEL_BOOK}</p>
        <div>
          <h2 className="type-caps">{c.BOOK_TITLE}</h2>
          <p className="type-body mt-5 max-w-md">{c.BOOK_BODY}</p>
        </div>
        <ConsultationForm treatment={t.title} copy={c} />
      </Section>
    </div>
  )
}
