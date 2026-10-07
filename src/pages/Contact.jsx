import raw from '../content/contact.txt?raw'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'
import ContactForm from '../components/ContactForm'
import Section from '../components/ui/Section'

const c = parseContent(raw)
const g = parseContent(globalRaw)

export default function Contact() {
  return (
    <div>
      {/* Page header */}
      <Section className="border-b border-line" innerClassName="max-w-4xl text-center">
        <h1 className="type-title mb-4">{c.PAGE_TITLE || 'Book a Consultation'}</h1>
        <p className="type-lead max-w-2xl mx-auto">
          {c.PAGE_SUBTITLE || 'Tell us a bit about what you\'re looking for and we\'ll follow up to schedule your visit.'}
        </p>
      </Section>

      {/* Form & contact info */}
      <Section innerClassName="max-w-5xl grid md:grid-cols-2 gap-12">
        <div className="card card-outlined card-lg">
          <h2 className="type-subheading mb-6">Get in Touch</h2>
          <ContactForm
            nameLabel={c.FORM_NAME_LABEL || 'Full Name'}
            emailLabel={c.FORM_EMAIL_LABEL || 'Email'}
            phoneLabel={c.FORM_PHONE_LABEL || 'Phone'}
            messageLabel={c.FORM_MESSAGE_LABEL || 'What are you interested in?'}
            ctaLabel={c.FORM_CTA || 'Send Message'}
          />
        </div>

        <div className="card card-outlined card-lg h-fit">
          <h2 className="type-subheading mb-6">{c.VISIT_TITLE || 'Visit Us'}</h2>

          <div className="mb-8">
            <h3 className="type-label mb-3">Hours</h3>
            <p className="text-sm text-ink-soft whitespace-pre-line leading-relaxed">
              {c.VISIT_HOURS || 'Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM\nSun: Closed'}
            </p>
          </div>

          <div className="border-t border-line pt-8">
            <h3 className="type-label mb-3">Location</h3>
            <div className="text-sm text-ink-soft space-y-1">
              <p>{g.FOOTER_ADDRESS}</p>
              <p>{g.FOOTER_PHONE}</p>
              <p>{g.FOOTER_EMAIL}</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
