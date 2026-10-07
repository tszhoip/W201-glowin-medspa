import { useState } from 'react'
import Button from './ui/Button'

// Sends submissions to Vercel API route (/api/contact)
// Email delivered via Gmail SMTP
export default function ContactForm({
  nameLabel = 'Full Name',
  emailLabel = 'Email',
  phoneLabel = 'Phone',
  messageLabel = 'Your Message',
  ctaLabel = 'SEND',
}) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.target
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const phone = form.phone.value.trim()
    const message = form.message.value.trim()
    const consent = form.consent.checked

    // Validation
    if (!name || !email || !phone) {
      setStatus('error')
      setErrorMsg('Please fill in all required fields.')
      return
    }

    if (!consent) {
      setStatus('error')
      setErrorMsg('Please agree to receive communication.')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          consent,
        }),
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
    return (
      <div className="card card-outlined text-sm">
        Thank you! We've received your message. We'll be in touch soon.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          id="name"
          name="name"
          required
          placeholder={nameLabel}
          className="field field-tint"
        />
      </div>
      <div>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={emailLabel}
          className="field field-tint"
        />
      </div>
      <div>
        <input
          id="phone"
          name="phone"
          required
          placeholder={phoneLabel}
          className="field field-tint"
        />
      </div>
      <div>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={messageLabel}
          className="field field-tint"
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="checkbox mt-0.5"
        />
        <label htmlFor="consent" className="text-xs text-ink-soft leading-relaxed cursor-pointer">
          I agree to receive SMS or e-mails for the provided number/email above.
        </label>
      </div>
      <Button type="submit" variant="light" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : ctaLabel}
      </Button>
      {status === 'error' && (
        <p className="text-xs text-red-600">{errorMsg}</p>
      )}
    </form>
  )
}
