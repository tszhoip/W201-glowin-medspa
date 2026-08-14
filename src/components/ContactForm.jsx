import { useState } from 'react'

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
      <div className="rounded-2xl border border-cream-dark bg-white/60 p-6 text-sm text-ink">
        Thank you! We've received your message. We'll be in touch soon.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          {nameLabel} <span className="text-peach">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-cream-dark bg-white px-4 py-2 text-sm outline-none focus:border-peach"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          {emailLabel} <span className="text-peach">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-cream-dark bg-white px-4 py-2 text-sm outline-none focus:border-peach"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="phone">
          {phoneLabel} <span className="text-peach">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          required
          className="w-full rounded-lg border border-cream-dark bg-white px-4 py-2 text-sm outline-none focus:border-peach"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="message">
          {messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-cream-dark bg-white px-4 py-2 text-sm outline-none focus:border-peach"
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 w-4 h-4 rounded border border-cream-dark accent-peach cursor-pointer"
        />
        <label htmlFor="consent" className="text-xs text-ink-soft leading-relaxed cursor-pointer">
          I agree to receive SMS or e-mails for the provided number/email above.
        </label>
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-full bg-peach px-6 py-2.5 text-sm font-medium text-ink hover:bg-peach-dark transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : ctaLabel}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-600">{errorMsg}</p>
      )}
    </form>
  )
}
