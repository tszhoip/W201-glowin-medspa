import { useState } from 'react'
import Button from './ui/Button'

// Booking form on the treatment detail pages. Posts to /api/contact (same endpoint
// as the Contact page) and records which treatment the enquiry came from (if any).
// tinted: fields and button sit on a white panel, so they use the grey tint instead of white.
export default function ConsultationForm({ treatment, copy, tinted = false }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.target
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const message = form.message.value.trim()
    const consent = form.consent.checked

    if (!name || !email || !consent) {
      setStatus('error')
      setErrorMsg('Please fill in your name and email, and agree to the terms.')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, consent, treatment }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
        setErrorMsg(data.message || 'Something went wrong. Please try again.')
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

  const field = `field field-lg ${tinted ? 'field-tint' : ''}`

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" required placeholder={copy.FORM_NAME} className={field} />
      <input name="email" type="email" required placeholder={copy.FORM_EMAIL} className={field} />
      <textarea name="message" placeholder={copy.FORM_MESSAGE} className={field} />
      <label className="flex items-center gap-3 text-sm text-ink cursor-pointer">
        <input type="checkbox" name="consent" required className="checkbox" />
        {copy.FORM_CONSENT}
      </label>
      <Button type="submit" size="block" variant={tinted ? 'light' : 'cta'} disabled={status === 'sending'}>
        {status === 'sending' ? copy.FORM_SENDING : copy.FORM_CTA}
      </Button>
      {status === 'error' && <p className="text-xs text-red-600">{errorMsg}</p>}
    </form>
  )
}
