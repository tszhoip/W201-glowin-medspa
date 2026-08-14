import { Link } from 'react-router-dom'
import raw from '../content/lifting-detail.txt?raw'
import { parseContent, collectGroup } from '../lib/loadContent'

// Reusable template for individual treatment pages.
// Duplicate a content/*.txt file (e.g. copy lifting-detail.txt to
// microneedling-detail.txt) and swap the import below to spin up a new
// treatment landing page.
const c = parseContent(raw)
const prices = collectGroup(c, 'PRICE', ['NAME', 'VALUE'])
const results = collectGroup(c, 'RESULT', ['LABEL', 'NAME', 'DESC'])
const faqs = collectGroup(c, 'FAQ', ['Q', 'A'])

export default function TreatmentDetail() {
  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center border-b border-cream-dark">
        <p className="text-sm font-medium text-peach-dark">{c.EYEBROW || 'Treatment'}</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-medium text-ink mb-4">
          {c.PAGE_TITLE || 'Treatment Name'}
        </h1>
        <p className="text-lg text-ink-soft max-w-xl mx-auto mb-8">
          {c.PAGE_SUBTITLE || 'Professional treatment description.'}
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium text-ink transition-all"
          style={{ backgroundColor: '#e8b294', borderRadius: '6px' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d99872')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e8b294')}
        >
          {c.HERO_CTA || 'Book Now'}
          <span>→</span>
        </Link>
      </section>

      {/* Pricing Section */}
      {prices.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-16 border-b border-cream-dark">
          <h2 className="text-2xl font-medium text-ink mb-8 text-center">Pricing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {prices.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl bg-white/50 border border-cream-dark p-6 flex items-center justify-between hover:border-peach transition-colors"
              >
                <span className="font-medium text-ink">{p.name}</span>
                <span className="text-peach-dark font-semibold">{p.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center border-b border-cream-dark">
        <h2 className="text-3xl font-medium text-ink mb-6">{c.HOW_TITLE || 'How It Works'}</h2>
        <p className="text-lg text-ink-soft leading-relaxed">{c.HOW_BODY || 'Treatment description.'}</p>
      </section>

      {/* Expected Results Section */}
      {results.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16 border-b border-cream-dark">
          <h2 className="text-center text-3xl font-medium text-ink mb-10">{c.RESULTS_TITLE || 'Expected Results'}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {results.map((r) => (
              <div key={r.name} className="rounded-2xl bg-white/50 border border-cream-dark p-6 hover:border-peach transition-colors">
                <div className="text-peach-dark text-4xl font-medium mb-3">{r.label}</div>
                <h3 className="font-medium text-ink mb-2">{r.name}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Precautions Section */}
      <section className="mx-auto max-w-3xl px-6 py-16 border-b border-cream-dark">
        <h2 className="text-3xl font-medium text-ink text-center mb-8">
          {c.PRECAUTIONS_TITLE || 'Precautions & Aftercare'}
        </h2>
        <div className="text-sm text-ink-soft whitespace-pre-line leading-relaxed bg-white/50 rounded-2xl border border-cream-dark p-6">
          {c.PRECAUTIONS_BODY || 'Care instructions.'}
        </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-3xl font-medium text-ink text-center mb-10">{c.FAQ_TITLE || 'FAQ'}</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-2xl bg-white/50 border border-cream-dark p-6 cursor-pointer hover:border-peach transition-colors">
                <summary className="font-medium text-ink cursor-pointer select-none">
                  {f.q}
                </summary>
                <p className="mt-4 text-sm text-ink-soft leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
