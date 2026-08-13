import raw from '../content/about.txt?raw'
import { parseContent, collectGroup } from '../lib/loadContent'

const c = parseContent(raw)
const disciplines = collectGroup(c, 'DISCIPLINE', ['NAME', 'DESC'])

export default function About() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <h1 className="font-serif text-4xl font-semibold">{c.PAGE_TITLE}</h1>
        <p className="mt-4 text-ink-soft max-w-2xl mx-auto">{c.PAGE_SUBTITLE}</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 border-t border-cream-dark text-center">
        <h2 className="font-serif text-2xl font-semibold">{c.STORY_TITLE}</h2>
        <p className="mt-4 text-ink-soft">{c.STORY_BODY}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-cream-dark">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {disciplines.map((d) => (
            <div key={d.name} className="rounded-2xl bg-white/60 border border-cream-dark p-6">
              <div className="font-medium mb-2">{d.name}</div>
              <p className="text-sm text-ink-soft">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 border-t border-cream-dark text-center">
        <h2 className="font-serif text-2xl font-semibold">{c.TEAM_TITLE}</h2>
        <p className="mt-4 text-ink-soft">{c.TEAM_BODY}</p>
      </section>
    </div>
  )
}
