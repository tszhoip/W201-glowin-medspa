import { Link } from 'react-router-dom'
import { topTreatments } from '../lib/treatments'
import Button from '../components/ui/Button'
import HomeTreatments from '../components/HomeTreatments'
import Section from '../components/ui/Section'
import Highlighted from '../lib/highlight'
import { parseContent } from '../lib/loadContent'
import homeRaw from '../content/home.txt?raw'
import globalRaw from '../content/global.txt?raw'

const c = parseContent(homeRaw)

// Hero banner: one photo from assets/images/home/banners/ picked at random on each visit.
// To add or remove a banner, just add or delete a .jpg in that folder.
// Name a bright photo "...-bright.jpg" to give it a darker overlay so the white headline stays readable.
const banners = Object.entries(import.meta.glob('../assets/images/home/banners/*.jpg', { eager: true, import: 'default' }))
const [heroFile, heroBanner] = banners[Math.floor(Math.random() * banners.length)]
const heroIsBright = heroFile.endsWith('-bright.jpg')
const g = parseContent(globalRaw)

// Address comes from global.txt (FOOTER_ADDRESS): street on line 1, city/state/zip on line 2. Also drives the map.
const [street, ...cityParts] = g.FOOTER_ADDRESS.split(',')
const cityLine = cityParts.join(',').trim()
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(g.FOOTER_ADDRESS)}&output=embed`

// Hidden for now. Set to true to bring the "Top Treatments" section back (data: Top Treatment column in treatments.xlsx).
const SHOW_TOP_TREATMENTS = false

export default function Home() {
  return (
    <div>
      {/* Hero (sits below the fixed header) */}
      <section className="hero">
        <img
          src={heroBanner}
          alt={c.HERO_HEADLINE.replaceAll('*', '')}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${heroIsBright ? 'bg-black/30' : 'bg-black/10'}`} />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-3xl">
            <h1 className="type-h1 mb-6">
              <Highlighted text={c.HERO_HEADLINE} />
            </h1>
            <Button to="/book-now" variant="light" size="xl">
              {c.HERO_CTA}
            </Button>
          </div>
        </div>
      </section>

      {/* Intro statement - *asterisks* in the copy become the serif highlight */}
      <section>
        <div className="page-container pt-12 pb-[28px] md:pb-16">
          <p className="type-statement md:ml-[25%]">
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
                <div className={`absolute inset-0 ${heroIsBright ? 'bg-black/30' : 'bg-black/10'}`} />
                <p className="type-h1 absolute inset-0 flex items-center justify-center text-center text-white px-3">
                  {t.shortName}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <HomeTreatments copy={c} />

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
