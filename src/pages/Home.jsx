import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import heroBanner from '../assets/images/home/banner-01.png'
import { sections, topTreatments } from '../lib/treatments'

export default function Home() {
  const [activeType, setActiveType] = useState(sections[0]?.anchor)
  const itemRefs = useRef({})

  // Swap the image when a list item crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveType(entry.target.dataset.id)
        })
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((section) => {
      if (itemRefs.current[section.anchor]) observer.observe(itemRefs.current[section.anchor])
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      {/* Hero Section - account for fixed header (56px) */}
      <section className="relative w-full" style={{ height: '80vh', minHeight: '600px', maxHeight: '1000px', marginTop: '56px' }}>
        <img
          src={heroBanner}
          alt="Rooted in Clinical Care"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
              Where your timeless glow begins
            </h1>
            <Link
              to="/contact"
              className="inline-block font-medium text-ink transition-all"
              style={{ padding: '12px', fontSize: '14pt', borderRadius: '6px', backgroundColor: '#f5f5f5' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'inset 0 0 0 100px rgba(203, 174, 148, 0.5)'
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

      {/* Top Treatments - featured rows from the spreadsheet ("Top Treatment" column) */}
      <section className="mx-auto max-w-6xl px-6 pt-16">
        <h2 className="text-2xl md:text-[32px] font-normal text-ink mb-8">Top Treatments</h2>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '16px' }}>
          {topTreatments.map((t) => (
            <Link
              key={t.slug}
              to={`/treatments/${t.slug}`}
              className="group relative block overflow-hidden rounded-md bg-cream-dark"
              style={{ aspectRatio: '417 / 372' }}
            >
              {t.introImage && (
                <img
                  src={t.introImage}
                  alt={t.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
              )}
              <div className="absolute inset-0 bg-black/10" />
              <p
                className="absolute inset-0 flex items-center justify-center text-center text-white font-normal px-3"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.1 }}
              >
                {t.title}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Treatment types - active item follows scroll; links go to /services#anchor */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <div>
              {sections.map((section) => {
                const active = activeType === section.anchor
                return (
                  <div
                    key={section.anchor}
                    ref={(el) => (itemRefs.current[section.anchor] = el)}
                    data-id={section.anchor}
                    className={`font-normal transition-colors ${active ? 'text-peach' : 'text-ink'}`}
                    style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', lineHeight: 1.17 }}
                  >
                    <Link to={`/services#${section.anchor}`} className="no-underline">
                      {section.shortName}
                      {active ? ' •' : ''}
                    </Link>
                  </div>
                )
              })}
            </div>

            <Link
              to="/services"
              className="inline-block mt-6 font-medium text-ink uppercase transition-colors hover:bg-[#d9d9d9]"
              style={{ backgroundColor: '#e6e6e6', fontSize: '12px', padding: '8px 12px', borderRadius: '2px' }}
            >
              See all
            </Link>
          </div>

          <div className="md:sticky md:top-20 overflow-hidden rounded-md bg-cream-dark" style={{ aspectRatio: '622 / 560' }}>
            {sections.map((section) =>
              section.image ? (
                <img
                  key={section.anchor}
                  src={section.image}
                  alt={section.shortName}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  style={{ display: activeType === section.anchor ? 'block' : 'none' }}
                />
              ) : null
            )}
          </div>
        </div>
      </section>

      {/* Your Voice Matters Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-medium text-ink mb-10" style={{ fontSize: '14px' }}>
          Your Voice Matters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '12px' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-cream-dark p-6 bg-white/50 hover:border-peach hover:shadow-md transition-all"
            >
              <p className="text-sm text-ink-soft leading-relaxed mb-4">
                "Clean, modern, and welcoming—I felt cared for from start to finish."
              </p>
              <p className="text-xs text-ink-soft">- J. Kim</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Section - Hidden for now */}

      {/* Location/Direction Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-sm text-ink-soft space-y-2">
              <p>123 Glowin Ave, Suite 200</p>
              <p>Los Angeles, CA 90001</p>
              <p className="mt-4">
                <a href="tel:+1234567890" className="text-ink hover:text-peach transition-colors">
                  (123) 456-7890
                </a>
              </p>
            </div>
          </div>

          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-118.2437!3d34.0522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27d49b%3A0xce0d0a63ae5b0efd!2s123%20Glowin%20Ave%20Suite%20200%20Los%20Angeles%20CA%2090001!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
