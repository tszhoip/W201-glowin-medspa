import { useState } from 'react'

// Booking form on the treatment detail pages. Posts to /api/contact (same endpoint
// as the Contact page) and records which treatment the enquiry came from.
export default function ConsultationForm({ treatment, copy }) {
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
    return <div className="rounded-md bg-white p-6 text-sm text-ink">{copy.FORM_THANKS}</div>
  }

  const field = 'w-full rounded bg-white px-4 text-ink outline-none border border-transparent focus:border-peach placeholder:text-ink-soft'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" required placeholder={copy.FORM_NAME} className={`${field} h-[54px]`} />
      <input name="email" type="email" required placeholder={copy.FORM_EMAIL} className={`${field} h-[54px]`} />
      <textarea name="message" placeholder={copy.FORM_MESSAGE} className={`${field} h-36 py-4 resize-none`} />
      <label className="flex items-center gap-3 text-sm text-ink cursor-pointer">
        <input type="checkbox" name="consent" required className="w-[22px] h-[22px] rounded accent-peach cursor-pointer" />
        {copy.FORM_CONSENT}
      </label>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full h-14 rounded-md bg-cta hover:bg-cta-dark text-ink font-medium transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? copy.FORM_SENDING : copy.FORM_CTA}
      </button>
      {status === 'error' && <p className="text-xs text-red-600">{errorMsg}</p>}
    </form>
  )
}
