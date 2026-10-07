import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { sections } from '../lib/treatments'

export default function Services() {
  const { hash } = useLocation()

  // Jump to #anchor (e.g. /services#laser). Repeats once web fonts load, since they shift the layout.
  useEffect(() => {
    if (!hash) return
    const go = () => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
    go()
    document.fonts?.ready.then(go)
  }, [hash])

  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      {/* Page Header */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-medium text-ink mb-4">
          Treatments
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl mb-8">
          Personalized treatments guided by clinical expertise. Explore our full menu below, or book a free consultation to build a plan around your goals.
        </p>
        <Link
          to="/contact"
          className="inline-block font-medium text-ink transition-all"
          style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '6px', backgroundColor: '#cbae94', color: '#fff' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#b89678'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#cbae94'
          }}
        >
          Book a consultation
        </Link>
      </section>

      {/* Treatment type sections - alternate image side on desktop */}
      {sections.map((section, idx) => {
        const isAlternate = idx % 2 === 1

        return (
          <section key={section.name} id={section.anchor} className="mx-auto max-w-6xl px-6 py-16 scroll-mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
              {/* Content: Title and Treatment List */}
              <div className={`flex flex-col justify-between ${isAlternate ? 'md:order-2' : ''}`}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-medium text-ink mb-8">
                    {section.name}
                  </h2>
                </div>
                <div className="space-y-3">
                  {section.treatments.map((t) => (
                    <Link
                      key={t.slug}
                      to={`/treatments/${t.slug}`}
                      className="flex items-center text-ink hover:text-peach transition-colors group"
                      style={{ textDecoration: 'none' }}
                    >
                      <span className="font-medium">{t.title}</span>
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">↷</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className={`h-96 md:h-[500px] rounded-image overflow-hidden bg-cream-dark ${isAlternate ? 'md:order-1' : ''}`}>
                {section.image && (
                  <img
                    src={section.image}
                    alt={section.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
