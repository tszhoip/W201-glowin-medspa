import { Link } from 'react-router-dom'
import raw from '../content/services.txt?raw'
import { parseContent } from '../lib/loadContent'

const c = parseContent(raw)
const categories = Object.keys(c)
  .filter((k) => /^CATEGORY_\d+_NAME$/.test(k))
  .map((k) => c[k])

// Map service/machine names to slugs for URLs
const serviceMap = {
  'Lifting': 'lifting',
  'Microneedling': 'microneedling',
  'Rejuvenation Injection': 'rejuvenation',
  'Fractional Laser': 'laser',
  'Pigment Laser': 'pigment-laser',
  'Injectable': 'injectables',
  'Hair Removal': 'hair-removal',
  'Body': 'body',
  'Skincare': 'skincare',
  'Skincare RF': 'skincare-rf',
  'HydraFacial': 'hydrafacial',
  'Dermapen': 'dermapen',
  'Ultherapy': 'ultherapy',
  'Botox / Dysport': 'botox-dysport',
  'Dermal Fillers': 'dermal-fillers',
}

export default function Services() {
  return (
    <div className="bg-cream">
      {/* Page Header */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center border-b border-cream-dark">
        <h1 className="text-4xl md:text-5xl font-medium text-ink mb-4">
          {c.PAGE_TITLE || 'Services'}
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl mx-auto">
          {c.PAGE_SUBTITLE || 'Personalized treatments guided by clinical expertise.'}
        </p>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((name) => {
            const slug = serviceMap[name] || name.toLowerCase().replace(/\s+/g, '-')
            return (
              <Link
                key={name}
                to={`/treatments/${slug}`}
                className="group rounded-2xl overflow-hidden border border-cream-dark hover:border-peach transition-colors"
              >
                <div
                  className="w-full h-48 flex items-center justify-center text-cream font-medium mb-3 group-hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#e8b294' }}
                >
                  [Treatment image]
                </div>
                <div className="p-4 bg-white/50">
                  <h3 className="font-medium text-ink text-center group-hover:text-peach-dark transition-colors">
                    {name}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Promo Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-cream-dark">
        <div className="rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ backgroundColor: '#e8b294' }}>
          <div>
            <h3 className="text-xl font-medium text-ink mb-2">
              {c.PROMO_TITLE || 'New Intake Offer'}
            </h3>
            <p className="text-sm text-ink-soft max-w-md">
              {c.PROMO_BODY || 'Bundle any two treatments this month and save.'}
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
            {c.PROMO_CTA || 'Book Now'}
          </Link>
        </div>
      </section>
    </div>
  )
}
