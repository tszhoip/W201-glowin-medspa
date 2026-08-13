import raw from '../content/location.txt?raw'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'

const c = parseContent(raw)
const g = parseContent(globalRaw)

export default function Location() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl font-semibold">{c.PAGE_TITLE}</h1>
      <p className="mt-2 text-ink-soft">{c.PAGE_SUBTITLE}</p>

      <div className="mt-10 aspect-video w-full rounded-2xl bg-cream-dark border border-cream-dark flex items-center justify-center text-sm text-ink-soft">
        Map embed placeholder
      </div>

      <div className="mt-10 grid sm:grid-cols-3 gap-6">
        <div>
          <div className="text-sm font-medium mb-1">{c.ADDRESS_LABEL}</div>
          <p className="text-sm text-ink-soft">{g.FOOTER_ADDRESS}</p>
        </div>
        <div>
          <div className="text-sm font-medium mb-1">{c.HOURS_LABEL}</div>
          <p className="text-sm text-ink-soft whitespace-pre-line">{c.HOURS_BODY}</p>
        </div>
        <div>
          <div className="text-sm font-medium mb-1">{c.PHONE_LABEL}</div>
          <p className="text-sm text-ink-soft">{g.FOOTER_PHONE}</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-sm font-medium mb-1">{c.PARKING_LABEL}</div>
        <p className="text-sm text-ink-soft">{c.PARKING_BODY}</p>
      </div>
    </div>
  )
}
