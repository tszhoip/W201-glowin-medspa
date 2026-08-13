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
    <div>
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-10 text-center">
        <p className="text-sm font-medium text-peach-dark">{c.EYEBROW}</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold">{c.PAGE_TITLE}</h1>
        <p className="mt-4 text-ink-soft max-w-xl mx-auto">{c.PAGE_SUBTITLE}</p>
        <Link
          to="/contact"
          className="mt-6 inline-block rounded-full bg-peach px-7 py-3 text-sm font-medium text-ink hover:bg-peach-dark transition-colors"
        >
          {c.HERO_CTA}
        </Link>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-10 border-t border-cream-dark">
        <div className="grid sm:grid-cols-2 gap-4">
          {prices.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl bg-white/60 border border-cream-dark p-6 flex items-center justify-between"
            >
              <span className="font-medium">{p.name}</span>
              <span className="text-peach-dark font-semibold">{p.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 border-t border-cream-dark text-center">
        <h2 className="font-serif text-2xl font-semibold">{c.HOW_TITLE}</h2>
        <p className="mt-4 text-ink-soft">{c.HOW_BODY}</p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 border-t border-cream-dark">
        <h2 className="text-center font-serif text-2xl font-semibold mb-10">{c.RESULTS_TITLE}</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {results.map((r) => (
            <div key={r.name} className="rounded-2xl bg-white/60 border border-cream-dark p-6">
              <div className="text-peach-dark font-serif text-2xl font-semibold">{r.label}</div>
              <div className="mt-2 font-medium">{r.name}</div>
              <p className="mt-1 text-sm text-ink-soft">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 border-t border-cream-dark">
        <h2 className="font-serif text-2xl font-semibold text-center mb-6">
          {c.PRECAUTIONS_TITLE}
        </h2>
        <div className="text-sm text-ink-soft whitespace-pre-line">{c.PRECAUTIONS_BODY}</div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 border-t border-cream-dark">
        <h2 className="font-serif text-2xl font-semibold text-center mb-6">{c.FAQ_TITLE}</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-2xl bg-white/60 border border-cream-dark p-5">
              <summary className="font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-sm text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
