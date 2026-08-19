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
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200" style={{ height: '56px' }}>
        <div className="h-full flex items-center justify-between relative">
          {/* Left: Circle (16px from edge) + Services */}
          <div className="flex items-center" style={{ marginLeft: '16px', gap: '4px' }}>
            <div className="rounded-full flex-shrink-0 hidden md:block" style={{ backgroundColor: '#2D2D2D', width: '24px', height: '24px' }}></div>
            <Link
              to="/services"
              className="font-medium hover:text-peach transition-colors hidden md:block"
              style={{ color: '#2D2D2D', fontSize: '32px' }}
            >
              {g.NAV_SERVICES}
            </Link>
          </div>

          {/* Center: Logo (Home) */}
          <Link to="/" className="flex-shrink-0 absolute left-1/2" style={{ transform: 'translateX(-50%)' }}>
            <img
              src={logoSvg}
              alt="Glowin Medspa"
              style={{ height: '29px', width: 'auto' }}
            />
          </Link>

          {/* Right: Book Now + Circle (16px from edge) + Mobile Menu */}
          <div className="flex items-center" style={{ marginRight: '16px', gap: '4px' }}>
            {/* Desktop: Book Now */}
            <Link
              to="/contact"
              className="hidden md:inline-block font-medium hover:text-peach transition-colors"
              style={{ color: '#2D2D2D', fontSize: '32px' }}
            >
              {g.CTA_BOOK}
            </Link>

            {/* Right Circle */}
            <div className="rounded-full flex-shrink-0 hidden md:block" style={{ backgroundColor: '#2D2D2D', width: '24px', height: '24px' }}></div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:text-peach transition-colors"
              style={{ color: '#2D2D2D' }}
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
