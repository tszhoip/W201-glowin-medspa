import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { sections } from '../lib/treatments'
import { collectGroup } from '../lib/loadContent'
import { hasDetailPage } from '../lib/features'

// Home page treatment categories (copy: TREATMENTS_INTRO_n_* in home.txt; photos: assets/images/home/treatments/,
// matched to the copy by file order, so name them 1-…, 2-…).
//   TYPE  the spreadsheet type's Short Name whose treatments are listed; empty = no list, links to /treatments
// Desktop: the panel stays pinned while you scroll; each step (90vh of scrolling) opens the next category and swaps the photo.
// Mobile: a plain stack (photo, title, text, list) per category.
const photos = Object.entries(import.meta.glob('../assets/images/home/treatments/*.jpg', { eager: true, import: 'default' }))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src)

export default function HomeTreatments({ copy }) {
  const items = collectGroup(copy, 'TREATMENTS_INTRO', ['TITLE', 'TEXT', 'TYPE']).map((item, i) => {
    const type = sections.find((s) => s.shortName === item.type)
    return {
      ...item,
      photo: photos[i],
      treatments: type ? type.treatments : [],
      href: type ? `/treatments#${type.anchor}` : '/treatments',
    }
  })

  const wrapRef = useRef(null)
  const panelRef = useRef(null)
  const [active, setActive] = useState(0)

  // The panel is only as tall as its content; while pinned it sits centered in the space below the header.
  function pinTop() {
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 0
    const free = window.innerHeight - header - panelRef.current.offsetHeight
    return header + Math.max(free / 2, 0)
  }

  // How far the pinned stretch has been scrolled (0..1) decides which category is open
  useEffect(() => {
    function update() {
      const wrap = wrapRef.current
      const panel = panelRef.current
      if (!wrap || !panel || !wrap.offsetParent) return // hidden on mobile
      const top = pinTop()
      panel.style.setProperty('--scrolly-top', `${top}px`)
      const range = wrap.offsetHeight - panel.offsetHeight
      const progress = Math.min(Math.max((top - wrap.getBoundingClientRect().top) / range, 0), 0.999)
      setActive(Math.floor(progress * items.length))
    }
    update()
    const ro = new ResizeObserver(update) // the open category changes the panel's height
    if (panelRef.current) ro.observe(panelRef.current)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items.length])

  // Clicking a closed title scrolls to its step
  function goTo(i) {
    const wrap = wrapRef.current
    const range = wrap.offsetHeight - panelRef.current.offsetHeight
    const top = wrap.getBoundingClientRect().top + window.scrollY - pinTop() + ((i + 0.5) / items.length) * range
    window.scrollTo({ top, behavior: 'smooth' })
  }

  function renderList(openIndex, ghost) {
    return (
      <ol className={ghost ? '' : '[grid-area:1/1]'}>
        {items.map((item, i) => {
          const open = i === openIndex
          return (
            <li key={item.title} className="grid grid-cols-[3rem_1fr] py-2">
              <span className={`type-body pt-2 transition-colors ${open ? 'text-ink' : 'text-ink/30'}`}>{i + 1}</span>
              <div>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  className={`type-heading font-display font-light italic tracking-[0] text-left transition-colors ${open ? 'text-ink' : 'text-ink/30 hover:text-ink/60'}`}
                >
                  {item.title}
                </button>
                {open && <Details item={item} linkLabel={copy.TREATMENTS_INTRO_LINK} />}
              </div>
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <>
      {/* Desktop: pinned panel + one empty scroll step per category */}
      <section ref={wrapRef} className="hidden md:block">
        <div ref={panelRef} className="scrolly-panel">
          <div className="page-container py-6 grid grid-cols-2 gap-12 items-center">
            {/* The visible list, plus invisible copies with each category open so the column always
                reserves room for the longest one (keeps the pinned panel from shifting) */}
            <div className="grid items-start">
              {renderList(active, false)}
              {items.map((item, i) => (
                <div key={item.title} className="[grid-area:1/1] invisible" aria-hidden="true" inert>
                  {renderList(i, true)}
                </div>
              ))}
            </div>

            <Link to={items[active]?.href || '/treatments'} className="img-frame relative block w-[min(100%,64vh)] aspect-[4/5] justify-self-end" tabIndex={-1} aria-hidden="true">
              {items.map((item, i) => (
                <img
                  key={item.title}
                  src={item.photo}
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </Link>
          </div>
        </div>
        {items.map((item) => (
          <div key={item.title} className="h-[90vh]" aria-hidden="true" />
        ))}
      </section>

      {/* Mobile: stacked */}
      <section className="md:hidden page-container section-y space-y-14">
        {items.map((item, i) => (
          <div key={item.title}>
            <div className="img-frame aspect-[4/5]">
              {item.photo && <img src={item.photo} alt="" className="w-full h-full object-cover" />}
            </div>
            <p className="type-body text-ink mt-6">{i + 1}</p>
            <h3 className="type-heading font-display font-light italic tracking-[0] mt-1">{item.title}</h3>
            <Details item={item} linkLabel={copy.TREATMENTS_INTRO_LINK} />
          </div>
        ))}
      </section>
    </>
  )
}

function Details({ item, linkLabel }) {
  return (
    <div className="mt-4 max-w-md">
      <p className="type-body text-ink">{item.text}</p>
      {item.treatments.length > 0 && (
        <ul className="type-body text-ink mt-5 space-y-1">
          {item.treatments.map((t) => (
            <li key={t.slug} className="flex gap-3">
              <span aria-hidden="true">·</span>
              {hasDetailPage(t.slug) ? (
                <Link to={`/treatments/${t.slug}`} className="group inline-flex items-center hover:text-peach transition-colors">
                  {t.title}
                  <span className="icon-arrow size-[0.6em] -rotate-45 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ) : (
                t.title
              )}
            </li>
          ))}
        </ul>
      )}
      <Link to={item.href} className="type-link type-body text-ink mt-5 inline-block">
        {linkLabel}
      </Link>
    </div>
  )
}
