import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function DesignShowcase() {
  const [buttonHover, setButtonHover] = useState(null)

  const colors = [
    { name: 'Peach', hex: '#e8b294', role: 'Primary CTA' },
    { name: 'Peach-Dark', hex: '#d99872', role: 'Hover/Active' },
    { name: 'Cream', hex: '#faf6f1', role: 'Background' },
    { name: 'Cream-Dark', hex: '#f1e9df', role: 'Alt Surface' },
    { name: 'Ink', hex: '#2b2a28', role: 'Headings' },
    { name: 'Ink-Soft', hex: '#6b6560', role: 'Body Text' },
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-cream-dark">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-ink">
            Glowin Design System
          </h1>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#colors" className="text-sm text-ink-soft hover:text-ink transition-colors">
              Colors
            </a>
            <a href="#buttons" className="text-sm text-ink-soft hover:text-ink transition-colors">
              Buttons
            </a>
            <a href="#cards" className="text-sm text-ink-soft hover:text-ink transition-colors">
              Cards
            </a>
            <a href="#forms" className="text-sm text-ink-soft hover:text-ink transition-colors">
              Forms
            </a>
          </nav>
          <Link
            to="/"
            className="rounded-full bg-peach px-5 py-2 text-sm font-medium text-ink hover:bg-peach-dark transition-colors"
          >
            Back to Site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#2b2a28', minHeight: '300px' }}>
            <div className="p-12 text-center">
              <h2 className="text-4xl font-medium text-cream mb-4">
                Treatment Showcase
              </h2>
              <p className="text-lg text-cream/80 mb-8 max-w-2xl mx-auto">
                Professional medspa experience with results-driven aesthetic.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  className="px-6 py-2.5 text-sm font-medium transition-all duration-300"
                  style={{ backgroundColor: '#e8b294', color: '#2b2a28', borderRadius: '6px' }}
                  onMouseEnter={() => setButtonHover('primary')}
                  onMouseLeave={() => setButtonHover(null)}
                  onMouseOver={(e) => {
                    if (buttonHover === 'primary') {
                      e.target.style.backgroundColor = '#d99872'
                    }
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#e8b294'
                  }}
                >
                  Book Now
                </button>
                <button
                  className="px-6 py-2.5 text-sm font-medium transition-all duration-300"
                  style={{ backgroundColor: '#ffffff', color: '#2b2a28', border: '1px solid #f1e9df', borderRadius: '6px' }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette Section */}
        <section id="colors" className="mb-20">
          <h2 className="text-3xl font-medium text-ink mb-8">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((color) => (
              <div key={color.hex} className="rounded-lg border border-cream-dark overflow-hidden">
                <div
                  className="h-32 w-full"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-4 bg-white">
                  <h3 className="font-medium text-ink mb-1">{color.name}</h3>
                  <p className="text-xs text-ink-soft mb-2">{color.hex}</p>
                  <p className="text-xs text-ink-soft italic">{color.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons Section */}
        <section id="buttons" className="mb-20">
          <h2 className="text-3xl  font-medium text-ink mb-8">Button States</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Primary Button */}
            <div>
              <h3 className="text-lg font-medium text-ink mb-4">Primary CTA</h3>
              <div className="space-y-4">
                <button
                  className="px-6 py-2.5 text-sm font-medium transition-all"
                  style={{ backgroundColor: '#e8b294', color: '#2b2a28', borderRadius: '6px' }}
                >
                  Default
                </button>
                <button
                  className="px-6 py-2.5 text-sm font-medium transition-all"
                  style={{ backgroundColor: '#d99872', color: '#2b2a28', borderRadius: '6px' }}
                >
                  Hover
                </button>
                <button
                  className="px-6 py-2.5 text-sm font-medium opacity-60"
                  style={{ backgroundColor: '#e8b294', color: '#2b2a28', borderRadius: '6px' }}
                >
                  Disabled
                </button>
              </div>
            </div>

            {/* Secondary Button */}
            <div>
              <h3 className="text-lg font-medium text-ink mb-4">Secondary CTA</h3>
              <div className="space-y-4">
                <button
                  className="px-6 py-2.5 text-sm font-medium transition-all"
                  style={{ backgroundColor: '#ffffff', color: '#2b2a28', border: '1px solid #f1e9df', borderRadius: '6px' }}
                >
                  Default
                </button>
                <button
                  className="px-6 py-2.5 text-sm font-medium transition-all"
                  style={{ backgroundColor: '#f1e9df', color: '#2b2a28', borderRadius: '6px' }}
                >
                  Hover
                </button>
                <button
                  className="px-6 py-2.5 text-sm font-medium opacity-60"
                  style={{ backgroundColor: '#ffffff', color: '#2b2a28', border: '1px solid #f1e9df', borderRadius: '6px' }}
                >
                  Disabled
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Text Hierarchy Section */}
        <section className="mb-20">
          <h2 className="text-3xl  font-medium text-ink mb-8">Text Hierarchy</h2>
          <div className="space-y-6 p-8 rounded-lg border border-cream-dark bg-white">
            <div>
              <p className="text-xs uppercase tracking-wide text-ink-soft mb-2">Heading (40px, weight 500)</p>
              <h1 className="text-4xl  font-medium text-ink">Lifting Treatment</h1>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-ink-soft mb-2">Treatment Name (17px, weight 500)</p>
              <h2 className="text-lg font-medium text-ink">Non-Invasive Facial Lifting</h2>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-ink-soft mb-2">Body Text (14px, weight 400)</p>
              <p className="text-base text-ink-soft leading-relaxed max-w-2xl">
                Advanced radiofrequency technology stimulates natural collagen production for a lifted, rejuvenated appearance. Professional results without downtime.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-ink-soft mb-2">Tertiary Text (14px, weight 400, Ink-Soft)</p>
              <p className="text-sm text-ink-soft">This is tertiary supporting text. Often used for sub-headings, secondary navigation, and additional details.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-ink-soft mb-2">Placeholder Text</p>
              <input
                type="text"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 rounded border"
                style={{
                  borderColor: '#f1e9df',
                  color: '#2b2a28',
                }}
              />
            </div>
          </div>
        </section>

        {/* Treatment Cards Section */}
        <section id="cards" className="mb-20">
          <h2 className="text-3xl  font-medium text-ink mb-8">Treatment Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Lifting', 'Microneedling', 'Laser'].map((treatment) => (
              <div key={treatment} className="rounded-lg overflow-hidden border border-cream-dark">
                <div
                  className="h-40 flex items-center justify-center text-cream font-medium"
                  style={{ backgroundColor: '#2b2a28' }}
                >
                  [Treatment Image]
                </div>
                <div className="p-4 bg-cream">
                  <h3 className="font-medium text-ink text-lg mb-2">{treatment}</h3>
                  <div className="flex gap-3">
                    <a href="#" className="text-sm text-ink-soft hover:text-ink transition-colors">
                      Learn
                    </a>
                    <a href="#" className="text-sm text-ink-soft hover:text-ink transition-colors">
                      Book
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Before/After Results Card */}
        <section className="mb-20">
          <h2 className="text-3xl  font-medium text-ink mb-8">Results Card</h2>
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#2b2a28' }}>
            <div className="h-48 flex items-center justify-center text-cream font-medium">
              [Before/After Results Image]
            </div>
            <div className="absolute mt-[-40px] ml-6 bg-cream px-4 py-2 rounded text-sm font-medium text-ink">
              Non-Invasive Lifting Results
            </div>
          </div>
        </section>

        {/* Forms Section */}
        <section id="forms" className="mb-20">
          <h2 className="text-3xl  font-medium text-ink mb-8">Contact Form</h2>
          <div className="max-w-2xl mx-auto p-8 rounded-lg border border-cream-dark bg-white">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Full Name <span className="text-peach">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded text-sm text-ink"
                  style={{ borderColor: '#f1e9df', border: '1px solid #f1e9df' }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Email <span className="text-peach">*</span>
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded text-sm text-ink"
                  style={{ borderColor: '#f1e9df', border: '1px solid #f1e9df' }}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 rounded text-sm text-ink"
                  rows="4"
                  style={{ borderColor: '#f1e9df', border: '1px solid #f1e9df' }}
                  placeholder="Tell us about your interests"
                />
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" id="consent" className="mt-1" />
                <label htmlFor="consent" className="text-xs text-ink-soft">
                  I agree to receive SMS or e-mails for the provided number/email above.
                </label>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-2.5 text-sm font-medium text-ink transition-all"
                style={{ backgroundColor: '#e8b294', borderRadius: '6px' }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#d99872')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#e8b294')}
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <section className="border-t border-cream-dark pt-16 mt-20">
          <div className="mb-12">
            <h3 className=" text-lg font-semibold text-ink mb-4">Glowin Medspa</h3>
            <div className="text-sm text-ink-soft space-y-1 mb-4">
              <p>123 Glow Ave, Los Angeles, CA 90001</p>
              <p>(310) 555-0100</p>
              <p>hello@glowinmedspa.com</p>
            </div>
            <p className="text-sm text-ink-soft max-w-md">
              Modern medspa care, rooted in clinical results.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-ink-soft pb-8 border-t border-cream-dark pt-8">
            <a href="#" className="hover:text-ink transition-colors">Home</a>
            <a href="#" className="hover:text-ink transition-colors">About</a>
            <a href="#" className="hover:text-ink transition-colors">Services</a>
            <a href="#" className="hover:text-ink transition-colors">Contact</a>
            <a href="#" className="hover:text-ink transition-colors">Privacy</a>
            <span>© 2026 Glowin Medspa</span>
          </div>
        </section>
      </main>
    </div>
  )
}
