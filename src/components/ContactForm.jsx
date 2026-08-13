import { useState } from 'react'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'

const g = parseContent(globalRaw)

// Sends submissions to Formspree (https://formspree.io) — no backend needed.
// Set FORMSPREE_FORM_ID in src/content/global.txt with the ID from your Formspree form.
export default function ContactForm({
  nameLabel = 'Name',
  emailLabel = 'Email',
  phoneLabel = 'Phone',
  messageLabel = 'Message',
  ctaLabel = 'Submit',
}) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const formId = g.FORMSPREE_FORM_ID
  const isConfigured = formId && !formId.startsWith('REPLACE_')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isConfigured) {
      setStatus('error')
      return
    }
    setStatus('sending')
    const form = e.target
    const data = new FormData(form)
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-cream-dark bg-white/60 p-6 text-sm text-ink">
        Thanks — we received your request and will follow up shortly.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          {nameLabel}
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
          {emailLabel}
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
          {phoneLabel}
        </label>
        <input
          id="phone"
          name="phone"
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
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-full bg-peach px-6 py-2.5 text-sm font-medium text-ink hover:bg-peach-dark transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : ctaLabel}
      </button>
      {status === 'error' && !isConfigured && (
        <p className="text-xs text-ink-soft">
          Form not connected yet — add your Formspree form ID to src/content/global.txt.
        </p>
      )}
      {status === 'error' && isConfigured && (
        <p className="text-xs text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
