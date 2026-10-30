import { Link } from 'react-router-dom'
import { useState } from 'react'
import heroBanner from '../assets/images/home/banner-01.png'
import { sections, topTreatments } from '../lib/treatments'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import Highlighted from '../lib/highlight'
import { parseContent } from '../lib/loadContent'
import homeRaw from '../content/home.txt?raw'
import globalRaw from '../content/global.txt?raw'

const c = parseContent(homeRaw)
const g = parseContent(globalRaw)

// Address comes from global.txt (FOOTER_ADDRESS): street on line 1, city/state/zip on line 2. Also drives the map.
const [street, ...cityParts] = g.FOOTER_ADDRESS.split(',')
const cityLine = cityParts.join(',').trim()
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(g.FOOTER_ADDRESS)}&output=embed`

// Hidden for now. Set to true to bring the "Top Treatments" section back (data: Top Treatment column in treatments.xlsx).
const SHOW_TOP_TREATMENTS = false

export default function Home() {
  const [activeType, setActiveType] = useState(sections[0]?.anchor)

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
            <Button to="/book-now" variant="light" size="sm">
              BOOK NOW
            </Button>
          </div>
        </div>
      </section>

      {/* Intro statement - *asterisks* in the copy become the serif highlight */}
      <section className="min-h-[60vh]">
        <div className="page-container pt-12 pb-16">
          <p className="type-h1 md:w-3/4">
            <Highlighted text={c.INTRO} />
          </p>
        </div>
      </section>

      {/* Top Treatments - featured rows from the spreadsheet ("Top Treatment" column) */}
      {SHOW_TOP_TREATMENTS && (
        <Section innerClassName="pb-0">
          <h2 className="type-h1 mb-8">Top Treatments</h2>

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
                <p className="type-h1 absolute inset-0 flex items-center justify-center text-center text-white px-3">
                  {t.shortName}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Treatment types.
          Desktop: hovering (or tabbing to) a name shows its thumbnail; clicking goes to /treatments#anchor.
          Mobile (no hover): every thumbnail is shown, each one a link to its section. */}
      <Section>
        <div className="hidden md:grid grid-cols-2 gap-12 items-start">
          <div>
            {sections.map((section) => {
              const active = activeType === section.anchor
              return (
                <div
                  key={section.anchor}
                  className={`type-h1 transition-colors ${active ? 'text-peach' : 'text-ink'}`}
                  onMouseEnter={() => setActiveType(section.anchor)}
                >
                  <Link to={`/treatments#${section.anchor}`} onFocus={() => setActiveType(section.anchor)}>
                    {section.shortName}
                    {active ? ' •' : ''}
                  </Link>
                </div>
              )
            })}

            <Link to="/treatments" className="type-link mt-6 inline-block">
              See all
            </Link>
          </div>

          <Link to={`/treatments#${activeType}`} className="img-frame block aspect-[622/560]" tabIndex={-1} aria-hidden="true">
            {sections.map((section) =>
              section.image ? (
                <img
                  key={section.anchor}
                  src={section.image}
                  alt=""
                  className={`w-full h-full object-cover ${activeType === section.anchor ? 'block' : 'hidden'}`}
                />
              ) : null
            )}
          </Link>
        </div>

        <div className="md:hidden space-y-8">
          {sections.map((section) => (
            <Link key={section.anchor} to={`/treatments#${section.anchor}`} className="block">
              <div className="img-frame aspect-[622/560]">
                {section.image && <img src={section.image} alt="" className="w-full h-full object-cover" />}
              </div>
              <p className="type-h1 mt-3">{section.shortName}</p>
            </Link>
          ))}
          <Link to="/treatments" className="type-link inline-block">
            See all
          </Link>
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
            <p>{street}</p>
            <p>{cityLine}</p>
          </div>

          <iframe
            src={mapSrc}
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
