import raw from '../content/blog.txt?raw'
import { parseContent, collectGroup } from '../lib/loadContent'

const c = parseContent(raw)
const posts = collectGroup(c, 'POST', ['TITLE', 'EXCERPT'])

export default function Blog() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-serif text-3xl font-semibold">{c.PAGE_TITLE}</h1>
      <p className="mt-2 text-ink-soft">{c.PAGE_SUBTITLE}</p>

      <div className="mt-10 space-y-6">
        {posts.map((p) => (
          <div key={p.title} className="rounded-2xl bg-white/60 border border-cream-dark p-6">
            <h2 className="font-medium text-lg">{p.title}</h2>
            <p className="mt-2 text-sm text-ink-soft">{p.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
