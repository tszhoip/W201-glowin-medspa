import { useState } from 'react'
import { Link } from 'react-router-dom'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'
import MobileMenu from './MobileMenu'
import logoSvg from '../assets/images/home/logo.svg'

const g = parseContent(globalRaw)

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200" style={{ height: '64px' }}>
        <div className="mx-auto max-w-7xl px-6 h-full flex items-center justify-between">
          {/* Left: Circle + Services */}
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-black flex-shrink-0 hidden md:block"></div>
            <Link
              to="/services"
              className="text-base font-medium text-black hover:text-peach transition-colors hidden md:block"
            >
              {g.NAV_SERVICES}
            </Link>
          </div>

          {/* Center: Logo (Home) */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logoSvg}
              alt="Glowin Medspa"
              style={{ height: '36px', width: 'auto' }}
            />
          </Link>

          {/* Right: Book Now + Circle + Mobile Menu */}
          <div className="flex items-center gap-4 md:gap-4">
            {/* Desktop: Book Now */}
            <Link
              to="/contact"
              className="hidden md:inline-block text-base font-medium text-black hover:text-peach transition-colors"
            >
              {g.CTA_BOOK}
            </Link>

            {/* Right Circle */}
            <div className="w-4 h-4 rounded-full bg-black flex-shrink-0 hidden md:block"></div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-black hover:text-peach transition-colors"
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
