import { useState } from 'react'
import Button from './ui/Button'

// The site's one form. Used on the Contact page, /book-now and every treatment page.
// Posts to /api/contact (api/contact.js), which emails the clinic and the visitor.
//
//   copy     labels from a content file: FORM_NAME, FORM_EMAIL, FORM_PHONE, FORM_MESSAGE,
//            FORM_CONSENT, FORM_CTA, FORM_SENDING, FORM_THANKS
//   source   where the enquiry came from, e.g. "Contact page" (goes in the email subject + body)
//   phone    'required' | 'optional' | false (hide the field)
//   tinted   fields/button sit on a white panel or card, so they use the grey tint instead of white
//   size     'lg' tall fields + full-width submit (booking forms) | 'md' compact (Contact page)
export default function ContactForm({ copy, source, phone = 'optional', tinted = false, size = 'lg' }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.target
    const data = new FormData(form)
    const name = (data.get('name') || '').trim()
    const email = (data.get('email') || '').trim()
    const phoneValue = (data.get('phone') || '').trim()
    const message = (data.get('message') || '').trim()
    const consent = data.get('consent') === 'on'

    if (!name || !email || (phone === 'required' && !phoneValue)) {
      setStatus('error')
      setErrorMsg('Please fill in all required fields.')
      return
    }
    if (!consent) {
      setStatus('error')
      setErrorMsg('Please tick the box to agree before sending.')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phoneValue,
          message,
          consent,
          consentLabel: copy.FORM_CONSENT,
          source,
        }),
      })
      const result = await res.json()

      if (res.ok && result.success) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
        setErrorMsg(result.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
      console.error('Form submission error:', err)
    }
  }

  if (status === 'sent') {
    return <div className={`card text-sm ${tinted ? 'card-outlined' : ''}`}>{copy.FORM_THANKS}</div>
  }

  const large = size === 'lg'
  const field = `field ${large ? 'field-lg' : ''} ${tinted ? 'field-tint' : ''}`

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" required placeholder={copy.FORM_NAME} className={field} />
      <input name="email" type="email" required placeholder={copy.FORM_EMAIL} className={field} />
      {phone && (
        <input name="phone" type="tel" required={phone === 'required'} placeholder={copy.FORM_PHONE} className={field} />
      )}
      <textarea name="message" rows={large ? undefined : 4} placeholder={copy.FORM_MESSAGE} className={field} />
      <label className="flex items-start gap-3 text-sm text-ink cursor-pointer">
        <input type="checkbox" name="consent" required className="checkbox mt-0.5" />
        {copy.FORM_CONSENT}
      </label>
      <Button
        type="submit"
        variant={tinted ? 'light' : 'cta'}
        size={large ? 'block' : 'md'}
        disabled={status === 'sending'}
      >
        {status === 'sending' ? copy.FORM_SENDING : copy.FORM_CTA}
      </Button>
      {status === 'error' && <p className="text-xs text-red-600">{errorMsg}</p>}
    </form>
  )
}
