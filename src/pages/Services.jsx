import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { sections } from '../lib/treatments'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'

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
    <div>
      {/* Page header */}
      <Section>
        <h1 className="type-h1 mb-4">Treatments</h1>
        <p className="type-lead max-w-2xl mb-8">
          Personalized treatments guided by clinical expertise. Explore our full menu below, or book a free consultation to build a plan around your goals.
        </p>
        <Button to="/contact">Book a consultation</Button>
      </Section>

      {/* Treatment type sections - alternate image side on desktop */}
      {sections.map((section, idx) => {
        const isAlternate = idx % 2 === 1

        return (
          <Section key={section.name} id={section.anchor}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
              {/* Title and treatment list */}
              <div className={`flex flex-col justify-between ${isAlternate ? 'md:order-2' : ''}`}>
                <h2 className="type-h1 mb-8">{section.name}</h2>
                <div className="space-y-3">
                  {section.treatments.map((t) => (
                    <Link
                      key={t.slug}
                      to={`/treatments/${t.slug}`}
                      className="group flex items-center font-medium hover:text-peach transition-colors"
                    >
                      {t.title}
                      <span className="icon-arrow ml-2 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className={`img-frame h-96 md:h-[500px] ${isAlternate ? 'md:order-1' : ''}`}>
                {section.image && (
                  <img src={section.image} alt={section.name} className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          </Section>
        )
      })}
    </div>
  )
}
