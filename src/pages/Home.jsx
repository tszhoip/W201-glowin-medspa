import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import heroBanner from '../assets/images/home/banner-01.png'
import { sections, topTreatments } from '../lib/treatments'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import Highlighted from '../lib/highlight'
import { parseContent } from '../lib/loadContent'
import homeRaw from '../content/home.txt?raw'

const c = parseContent(homeRaw)

// Hidden for now. Set to true to bring the "Top Treatments" section back (data: Top Treatment column in treatments.xlsx).
const SHOW_TOP_TREATMENTS = false

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
    <div>
      {/* Hero (sits below the fixed header) */}
      <section className="hero">
        <img
          src={heroBanner}
          alt={c.HERO_HEADLINE.replaceAll('*', '')}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-3xl">
            <h1 className="type-h1 mb-6">
              <Highlighted text={c.HERO_HEADLINE} />
            </h1>
            <Button to="/contact" variant="light" size="sm">
              BOOK NOW
            </Button>
          </div>
        </div>
      </section>

      {/* Intro statement - *asterisks* in the copy become the serif highlight */}
      <section className="min-h-[80vh]">
        <div className="page-container pt-12 pb-16">
          <p className="type-h1 md:w-3/4">
            <Highlighted text={c.INTRO} />
          </p>
        </div>
      </section>

      {/* Top Treatments - featured rows from the spreadsheet ("Top Treatment" column) */}
      {SHOW_TOP_TREATMENTS && (
        <Section innerClassName="pb-0">
          <h2 className="type-section mb-8">Top Treatments</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topTreatments.map((t) => (
              <Link
                key={t.slug}
                to={`/treatments/${t.slug}`}
                className="img-frame group relative block aspect-[417/372]"
              >
                {t.introImage && (
                  <img
                    src={t.introImage}
                    alt={t.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                  />
                )}
                <div className="absolute inset-0 bg-black/10" />
                <p className="type-feature absolute inset-0 flex items-center justify-center text-center text-white px-3">
                  {t.shortName}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Treatment types - active item follows scroll; links go to /services#anchor */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            {sections.map((section) => {
              const active = activeType === section.anchor
              return (
                <div
                  key={section.anchor}
                  ref={(el) => (itemRefs.current[section.anchor] = el)}
                  data-id={section.anchor}
                  className={`type-h1 transition-colors ${active ? 'text-peach' : 'text-ink'}`}
                >
                  <Link to={`/services#${section.anchor}`}>
                    {section.shortName}
                    {active ? ' •' : ''}
                  </Link>
                </div>
              )
            })}

            <Link to="/services" className="type-link mt-6 inline-block">
              See all
            </Link>
          </div>

          <div className="img-frame md:sticky md:top-20 aspect-[622/560]">
            {sections.map((section) =>
              section.image ? (
                <img
                  key={section.anchor}
                  src={section.image}
                  alt={section.shortName}
                  className={`w-full h-full object-cover ${activeType === section.anchor ? 'block' : 'hidden'}`}
                />
              ) : null
            )}
          </div>
        </div>
      </Section>

      {/* Your Voice Matters */}
      <Section>
        <h2 className="type-kicker mb-10">Your Voice Matters</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card card-outlined card-interactive">
              <p className="text-sm text-ink-soft leading-relaxed mb-4">
                "Clean, modern, and welcoming—I felt cared for from start to finish."
              </p>
              <p className="text-xs text-ink-soft">- J. Kim</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Instagram Section - Hidden for now */}

      {/* Location / Direction */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-sm text-ink-soft space-y-2">
            <p>123 Glowin Ave, Suite 200</p>
            <p>Los Angeles, CA 90001</p>
            <p className="mt-4">
              <a href="tel:+1234567890" className="text-ink hover:text-peach transition-colors">
                (123) 456-7890
              </a>
            </p>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-118.2437!3d34.0522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27d49b%3A0xce0d0a63ae5b0efd!2s123%20Glowin%20Ave%20Suite%20200%20Los%20Angeles%20CA%2090001!5e0!3m2!1sen!2sus!4v1234567890"
            title="Map"
            width="100%"
            height="300"
            className="border-0 rounded-card"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>
    </div>
  )
}
