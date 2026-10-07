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
      <header className="fixed top-0 left-0 right-0 z-40 h-[var(--header-height)] bg-white border-b border-line">
        <div className="h-full flex items-center justify-between relative">
          {/* Left: dot (16px from edge) + Services + Contact */}
          <div className="flex items-center gap-3 ml-4">
            <div className="nav-dot hidden md:block" />
            <Link to="/services" className="nav-link hidden md:block">
              {g.NAV_SERVICES}
            </Link>
            <Link to="/contact" className="nav-link hidden md:block">
              Contact
            </Link>
          </div>

          {/* Center: logo (home) */}
          <Link to="/" className="flex-shrink-0 absolute left-1/2 -translate-x-1/2">
            <img src={logoSvg} alt="Glowin Medspa" className="h-[29px] w-auto" />
          </Link>

          {/* Right: Book Now + dot (16px from edge) / mobile menu button */}
          <div className="flex items-center gap-1 mr-4">
            <Link to="/contact" className="nav-link hidden md:inline-block">
              {g.CTA_BOOK}
            </Link>
            <div className="nav-dot hidden md:block" />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-link md:hidden p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
