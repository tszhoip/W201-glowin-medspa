import { Link, useParams } from 'react-router-dom'
import { findTreatment, treatmentImage } from '../lib/treatments'
import NotFound from './NotFound'

// Template for every /treatments/:slug page. Content comes from
// src/content/treatments.xlsx (see the "Instructions" sheet in that file).
export default function TreatmentDetail() {
  const { id } = useParams()
  const t = findTreatment(id)

  if (!t) return <NotFound />

  const before = treatmentImage(t.before)
  const after = treatmentImage(t.after)

  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      {/* Title, blurb, CTA */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-medium text-ink mb-4">{t.title}</h1>
        {t.blurb && <p className="text-lg text-ink-soft max-w-xl mx-auto mb-8">{t.blurb}</p>}
        <Link
          to="/contact"
          className="inline-block font-medium transition-all"
          style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '6px', backgroundColor: '#cbae94', color: '#fff' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b89678')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#cbae94')}
        >
          Book Now
        </Link>
      </section>

      {/* Optional: before & after */}
      {before && after && (
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '12px' }}>
            <figure>
              <img src={before} alt={`${t.title} before`} className="w-full h-80 object-cover rounded-lg" />
              <figcaption className="mt-2 text-sm text-ink-soft">Before</figcaption>
            </figure>
            <figure>
              <img src={after} alt={`${t.title} after`} className="w-full h-80 object-cover rounded-lg" />
              <figcaption className="mt-2 text-sm text-ink-soft">After</figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* Optional: how it works (rich text, rendered from Markdown at build time) */}
      {t.howHtml && (
        <section className="mx-auto max-w-3xl px-6 pb-16">
          <h2 className="text-2xl font-medium text-ink mb-4">How It Works</h2>
          <div
            className="text-ink-soft leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:underline [&_strong]:text-ink"
            dangerouslySetInnerHTML={{ __html: t.howHtml }}
          />
        </section>
      )}
    </div>
  )
}
