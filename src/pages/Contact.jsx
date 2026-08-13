import raw from '../content/contact.txt?raw'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'
import ContactForm from '../components/ContactForm'

const c = parseContent(raw)
const g = parseContent(globalRaw)

export default function Contact() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="font-serif text-3xl font-semibold">{c.PAGE_TITLE}</h1>
        <p className="mt-3 text-ink-soft">{c.PAGE_SUBTITLE}</p>
        <div className="mt-8">
          <ContactForm
            nameLabel={c.FORM_NAME_LABEL}
            emailLabel={c.FORM_EMAIL_LABEL}
            phoneLabel={c.FORM_PHONE_LABEL}
            messageLabel={c.FORM_MESSAGE_LABEL}
            ctaLabel={c.FORM_CTA}
          />
        </div>
      </div>
      <div className="rounded-2xl bg-white/60 border border-cream-dark p-8 h-fit">
        <h2 className="font-serif text-xl font-semibold mb-4">{c.VISIT_TITLE}</h2>
        <p className="text-sm text-ink-soft whitespace-pre-line">{c.VISIT_HOURS}</p>
        <div className="mt-6 text-sm text-ink-soft space-y-1">
          <p>{g.FOOTER_ADDRESS}</p>
          <p>{g.FOOTER_PHONE}</p>
          <p>{g.FOOTER_EMAIL}</p>
        </div>
      </div>
    </div>
  )
}
