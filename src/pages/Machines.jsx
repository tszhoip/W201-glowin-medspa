import raw from '../content/machines.txt?raw'
import { parseContent } from '../lib/loadContent'

const c = parseContent(raw)

function machinesFor(catIndex) {
  const items = []
  let i = 1
  while (c[`CATEGORY_${catIndex}_MACHINE_${i}`]) {
    items.push(c[`CATEGORY_${catIndex}_MACHINE_${i}`])
    i += 1
  }
  return items
}

const categories = []
let ci = 1
while (c[`CATEGORY_${ci}_NAME`]) {
  categories.push({ name: c[`CATEGORY_${ci}_NAME`], machines: machinesFor(ci) })
  ci += 1
}

export default function Machines() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-serif text-3xl font-semibold">{c.PAGE_TITLE}</h1>
      <p className="mt-2 text-ink-soft">{c.PAGE_SUBTITLE}</p>

      <div className="mt-10 space-y-10">
        {categories.map((cat) => (
          <div key={cat.name}>
            <h2 className="font-medium mb-4">{cat.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cat.machines.map((m) => (
                <div
                  key={m}
                  className="rounded-2xl bg-white/60 border border-cream-dark p-6 text-sm font-medium text-center"
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-peach/30 border border-peach/40 p-8 text-center">
        <h2 className="font-serif text-xl font-semibold">{c.WHY_TITLE}</h2>
        <p className="mt-2 text-ink-soft max-w-xl mx-auto">{c.WHY_BODY}</p>
      </div>
    </div>
  )
}
