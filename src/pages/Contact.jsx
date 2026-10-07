import raw from '../content/contact.txt?raw'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'
import ContactForm from '../components/ContactForm'
import Section from '../components/ui/Section'

const c = parseContent(raw)
const g = parseContent(globalRaw)

// Labels for the shared form (ContactForm), from contact.txt
const formCopy = {
  FORM_NAME: c.FORM_NAME_LABEL || 'Full Name',
  FORM_EMAIL: c.FORM_EMAIL_LABEL || 'Email',
  FORM_PHONE: c.FORM_PHONE_LABEL || 'Phone',
  FORM_MESSAGE: c.FORM_MESSAGE_LABEL || 'What are you interested in?',
  FORM_CONSENT: c.FORM_CONSENT || 'I agree to receive SMS or e-mails for the provided number/email above.',
  FORM_CTA: c.FORM_CTA || 'Send Message',
  FORM_SENDING: c.FORM_SENDING || 'Sending...',
  FORM_THANKS: c.FORM_THANKS || "Thank you! We've received your message. We'll be in touch soon.",
}

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
          <ContactForm copy={formCopy} source="Contact page" phone="required" size="md" tinted />
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
