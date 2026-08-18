import { useState } from 'react'
import { Link } from 'react-router-dom'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'
import MobileMenu from './MobileMenu'
import logoImg from '../assets/images/home/logo.png'

const g = parseContent(globalRaw)

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)'
      }}>
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Left: Services */}
          <Link
            to="/services"
            className="text-base font-medium text-white hover:text-peach transition-colors hidden md:block"
          >
            {g.NAV_SERVICES}
          </Link>

          {/* Center: Logo (Home) */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logoImg}
              alt="Glowin Medspa"
              className="h-12 md:h-16 w-auto"
            />
          </Link>

          {/* Right Section: Book Now + Mobile Menu */}
          <div className="flex items-center gap-4 md:gap-0">
            {/* Desktop: Book Now */}
            <Link
              to="/contact"
              className="hidden md:inline-block text-base font-medium text-white hover:text-peach transition-colors"
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
