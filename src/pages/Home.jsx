import { Link } from 'react-router-dom'
import raw from '../content/home.txt?raw'
import { parseContent } from '../lib/loadContent'

const c = parseContent(raw)

export default function Home() {
  const services = [
    { name: c.SERVICE_1_NAME || 'Lifting' },
    { name: c.SERVICE_2_NAME || 'Injectables' },
    { name: c.SERVICE_3_NAME || 'Laser' },
    { name: c.SERVICE_4_NAME || 'Body' },
  ]

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-16">
        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden mb-8" style={{ backgroundColor: '#e8b294', minHeight: '300px' }}>
          <div className="w-full h-80 flex items-center justify-center text-cream font-medium">
            [Hero photo — clinic interior]
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center mb-12">
          <p className="text-xs text-ink-soft mb-4">hero photo — clinic interior</p>
          <h1 className="text-4xl md:text-5xl font-medium text-ink mb-3 max-w-3xl mx-auto">
            {c.HERO_HEADLINE || 'Radiant skin, expert care'}
          </h1>
          <p className="text-lg text-ink-soft mb-8 max-w-xl mx-auto">
            {c.HERO_SUBHEADLINE || 'Med-spa treatments tailored to you'}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium text-ink transition-all"
            style={{ backgroundColor: '#e8b294', borderRadius: '6px' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d99872')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e8b294')}
          >
            {c.HERO_CTA || 'Book a Consultation'}
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-cream-dark">
        <h2 className="text-3xl font-medium text-ink mb-10">
          {c.SERVICES_TITLE || 'Our Services'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <div key={service.name} className="rounded-2xl overflow-hidden">
              <div
                className="w-full h-40 flex items-center justify-center text-cream font-medium mb-3"
                style={{ backgroundColor: '#e8b294' }}
              >
                [Service image]
              </div>
              <p className="text-sm font-medium text-ink">{service.name}</p>
            </div>
          ))}
        </div>

        {/* Promo Banner */}
        <div className="rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ backgroundColor: '#e8b294' }}>
          <div>
            <h3 className="text-xl font-medium text-ink mb-2">
              {c.PROMO_BADGE || 'New: Glow Facial Package'}
            </h3>
            <p className="text-sm text-ink-soft max-w-md">
              {c.PROMO_DESCRIPTION || 'Rejuvenate your skin with our signature treatment.'}
            </p>
          </div>
          <Link
            to="/contact"
            className="whitespace-nowrap px-6 py-2.5 text-sm font-medium text-ink transition-all"
            style={{ backgroundColor: '#f5f5f5', borderRadius: '6px' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'inset 0 0 0 100px rgba(232, 178, 148, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {c.PROMO_CTA || 'Learn more'}
          </Link>
        </div>
      </section>
    </div>
  )
}
