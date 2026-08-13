import { Link, NavLink } from 'react-router-dom'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'

const g = parseContent(globalRaw)

const navLinkClass = ({ isActive }) =>
  `text-sm transition-colors ${
    isActive ? 'text-ink font-medium' : 'text-ink-soft hover:text-ink'
  }`

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-cream-dark">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-lg font-semibold tracking-tight">
          {g.BUSINESS_NAME}
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navLinkClass}>
            {g.NAV_HOME}
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            {g.NAV_ABOUT}
          </NavLink>
          <NavLink to="/services" className={navLinkClass}>
            {g.NAV_SERVICES}
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            {g.NAV_CONTACT}
          </NavLink>
        </nav>
        <Link
          to="/contact"
          className="rounded-full bg-peach px-5 py-2 text-sm font-medium text-ink hover:bg-peach-dark transition-colors"
        >
          {g.CTA_BOOK}
        </Link>
      </div>
    </header>
  )
}
