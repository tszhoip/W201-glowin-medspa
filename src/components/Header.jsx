import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'
import MobileMenu from './MobileMenu'

const g = parseContent(globalRaw)

const navLinkClass = ({ isActive }) =>
  `text-sm transition-colors ${
    isActive ? 'text-ink font-medium' : 'text-ink-soft hover:text-ink'
  }`

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-cream-dark">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-serif text-lg font-semibold tracking-tight">
            {g.BUSINESS_NAME}
          </Link>

          {/* Desktop Navigation */}
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

          {/* CTA Button */}
          <Link
            to="/contact"
            className="bg-peach px-5 py-2 text-sm font-medium text-ink hover:bg-peach-dark transition-colors"
            style={{ borderRadius: '6px' }}
          >
            {g.CTA_BOOK}
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden ml-4 p-2 text-ink hover:text-peach transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
