import { Link } from 'react-router-dom'
import raw from '../content/home.txt?raw'
import { parseContent } from '../lib/loadContent'
import TestimonialsSection from '../components/TestimonialsSection'
import InstagramSection from '../components/InstagramSection'

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
      {/* Hero Section - Full Width Background Image */}
      <section className="relative w-full h-screen md:h-96">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#e8b294',
            backgroundImage: 'url(/src/assets/images/hero/hero-placeholder.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Centered Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-medium mb-4">
              Modern Medspa Innovation, Rooted in Clinical Care
            </h1>

            {/* CTA Button - Secondary Style */}
            <Link
              to="/contact"
              className="inline-block px-8 py-3 text-sm font-medium text-ink transition-all"
              style={{ backgroundColor: '#f5f5f5', borderRadius: '6px' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'inset 0 0 0 100px rgba(232, 178, 148, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              BOOK NOW
            </Link>
          </div>
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

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Instagram Section */}
      <InstagramSection />
    </div>
  )
}
