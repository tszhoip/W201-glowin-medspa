import { parseContent } from '../lib/loadContent'
import raw from '../content/book-now.txt?raw'
import bgImage from '../assets/images/book-now/background.jpg'
import ConsultationForm from '../components/ConsultationForm'

const c = parseContent(raw)

// /book-now: booking form on a full-bleed photo. Copy comes from src/content/book-now.txt.
export default function BookNow() {
  return (
    <section className="relative mt-[var(--header-height)] min-h-[calc(100vh-var(--header-height))] flex items-center justify-center px-6 py-16 md:py-32">
      <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />

      <div className="panel relative w-full max-w-[731px]">
        <h1 className="type-caps whitespace-pre-line">{c.TITLE}</h1>
        <p className="type-body mt-5 max-w-md">{c.BODY}</p>
        <div className="mt-8">
          <ConsultationForm copy={c} tinted />
        </div>
      </div>
    </section>
  )
}
