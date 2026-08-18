import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'
import MobileMenu from './MobileMenu'

const g = parseContent(globalRaw)

const navLinkClass = ({ isActive }) =>
  `text-sm transition-colors ${
    isActive ? 'text-white font-medium' : 'text-white/80 hover:text-white'
  }`

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-black/30 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-lg font-semibold tracking-tight text-white">
            {g.BUSINESS_NAME}
          </Link>

          {/* Desktop Navigation - Simplified: Home | Services */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={navLinkClass}>
              {g.NAV_HOME}
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              {g.NAV_SERVICES}
            </NavLink>
          </nav>

          {/* Right Section: CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* CTA Button */}
            <Link
              to="/contact"
              className="hidden md:inline-block bg-peach px-5 py-2 text-sm font-medium text-ink hover:bg-peach-dark transition-colors"
              style={{ borderRadius: '6px' }}
            >
              {g.CTA_BOOK}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-peach transition-colors"
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
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
