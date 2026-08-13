import { Link } from 'react-router-dom'
import raw from '../content/services.txt?raw'
import { parseContent } from '../lib/loadContent'
import ContactForm from '../components/ContactForm'

const c = parseContent(raw)
const categories = Object.keys(c)
  .filter((k) => /^CATEGORY_\d+_NAME$/.test(k))
  .map((k) => c[k])

export default function Services() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-10 text-center">
        <h1 className="font-serif text-4xl font-semibold">{c.PAGE_TITLE}</h1>
        <p className="mt-4 text-ink-soft max-w-2xl mx-auto">{c.PAGE_SUBTITLE}</p>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-10 border-t border-cream-dark">
        <h2 className="font-serif text-xl font-semibold mb-6 text-center">{c.FORM_TITLE}</h2>
        <ContactForm ctaLabel={c.FORM_CTA} />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-cream-dark">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((name) => (
            <Link
              key={name}
              to="/contact"
              className="rounded-2xl bg-white/60 border border-cream-dark p-6 text-center font-medium hover:border-peach transition-colors"
            >
              {name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-2xl bg-peach/30 border border-peach/40 p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-serif text-xl font-semibold">{c.PROMO_TITLE}</div>
            <p className="text-sm text-ink-soft mt-1">{c.PROMO_BODY}</p>
          </div>
          <Link
            to="/contact"
            className="whitespace-nowrap rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-cream hover:opacity-90 transition-opacity"
          >
            {c.PROMO_CTA}
          </Link>
        </div>
      </section>
    </div>
  )
}
