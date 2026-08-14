import raw from '../content/about.txt?raw'
import { parseContent, collectGroup } from '../lib/loadContent'

const c = parseContent(raw)
const disciplines = collectGroup(c, 'DISCIPLINE', ['NAME', 'DESC'])

export default function About() {
  return (
    <div className="bg-cream">
      {/* Page Header */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center border-b border-cream-dark">
        <h1 className="text-4xl md:text-5xl font-medium text-ink mb-4">
          {c.PAGE_TITLE || 'About Glowin Medspa'}
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl mx-auto">
          {c.PAGE_SUBTITLE || 'A modern medspa built on clinical care, honest guidance, and results you can see.'}
        </p>
      </section>

      {/* Story Section */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center border-b border-cream-dark">
        <h2 className="text-3xl font-medium text-ink mb-6">
          {c.STORY_TITLE || 'Our Story'}
        </h2>
        <p className="text-lg text-ink-soft leading-relaxed">
          {c.STORY_BODY || 'Glowin Medspa was founded to close the gap between clinical-grade skincare and a genuinely welcoming experience.'}
        </p>
      </section>

      {/* Disciplines Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-b border-cream-dark">
        <h2 className="text-3xl font-medium text-ink mb-10 text-center">
          Why Choose Glowin
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {disciplines.map((d) => (
            <div key={d.name} className="rounded-2xl bg-white/50 border border-cream-dark p-6 hover:border-peach transition-colors">
              <h3 className="font-medium text-ink mb-2">{d.name}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="text-3xl font-medium text-ink mb-6">
          {c.TEAM_TITLE || 'Meet Our Team'}
        </h2>
        <p className="text-lg text-ink-soft leading-relaxed">
          {c.TEAM_BODY || 'Our providers bring years of clinical and aesthetic experience.'}
        </p>
      </section>
    </div>
  )
}
