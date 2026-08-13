import { Link } from 'react-router-dom'
import raw from '../content/home.txt?raw'
import { parseContent, collectGroup } from '../lib/loadContent'

const c = parseContent(raw)
const services = collectGroup(c, 'SERVICE', ['NAME', 'DESC'])
const testimonials = collectGroup(c, 'TESTIMONIAL', ['QUOTE', 'AUTHOR'])

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 text-center">
        <p className="text-sm font-medium text-peach-dark">{c.HERO_EYEBROW}</p>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl mx-auto">
          {c.HERO_TITLE}
        </h1>
        <p className="mt-5 text-ink-soft max-w-xl mx-auto">{c.HERO_SUBTITLE}</p>
        <Link
          to="/contact"
          className="mt-8 inline-block rounded-full bg-peach px-7 py-3 text-sm font-medium text-ink hover:bg-peach-dark transition-colors"
        >
          {c.HERO_CTA}
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center border-t border-cream-dark">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold">{c.INTRO_TITLE}</h2>
        <p className="mt-4 text-ink-soft max-w-2xl mx-auto">{c.INTRO_BODY}</p>
        <Link
          to="/contact"
          className="mt-6 inline-block rounded-full border border-ink px-6 py-2.5 text-sm font-medium hover:bg-ink hover:text-cream transition-colors"
        >
          {c.INTRO_CTA}
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-cream-dark">
        <h2 className="text-center font-serif text-2xl md:text-3xl font-semibold mb-10">
          {c.SERVICES_TITLE}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.name} className="rounded-2xl bg-white/60 border border-cream-dark p-6">
              <div className="font-medium mb-2">{s.name}</div>
              <p className="text-sm text-ink-soft">{s.desc}</p>
            </div>
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

      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-cream-dark">
        <h2 className="text-center font-serif text-2xl md:text-3xl font-semibold mb-10">
          {c.VOICE_TITLE}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.author} className="rounded-2xl bg-white/60 border border-cream-dark p-6">
              <p className="text-ink-soft">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-sm font-medium">— {t.author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
