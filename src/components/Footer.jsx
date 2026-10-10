import { Link } from 'react-router-dom'
import glowingImg from '../assets/images/footer/glowin.png'
import medspaImg from '../assets/images/footer/medspa.png'

// Site navigation links (same pages as the header menu, plus Home)
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Membership', href: '/members' },
  { label: 'Contact', href: '/contact' },
]

const legalLinks = [
  { label: 'Style guideline (temp)', href: '/guideline' }, // TEMP: remove before launch
]

export default function Footer() {
  return (
    <footer className="bg-peach text-white">
      {/* Desktop Layout (≥ md) */}
      <div className="hidden md:block w-full">
        <div className="mx-auto max-w-7xl px-8 py-16">
          {/* Link Columns Section */}
          <div className="grid grid-cols-4 gap-12 mb-16">
            {/* Column 1: site navigation */}
            <div className="space-y-2 text-sm">
              {navLinks.map((link, idx) => (
                <Link
                  key={`nav-${idx}`}
                  to={link.href}
                  className="block hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Spacer for layout */}
            <div className="col-span-2"></div>

            {/* Legal links */}
            <div className="space-y-2 text-sm text-right">
              {legalLinks.map((link, idx) => (
                <Link
                  key={`legal-${idx}`}
                  to={link.href}
                  className="block hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Wordmark Section: GLOWIN | Copyright + Legal | MEDSPA */}
          <div className="flex items-flex-end justify-between pt-8 border-t border-white/30">
            {/* Left: GLOWIN Image */}
            <div className="flex-1">
              <img
                src={glowingImg}
                alt="Glowin"
                className="w-64 h-auto"
              />
              <p className="text-xs mt-4 opacity-90">© 2026 Glowin, Inc.<br />All rights reserved.</p>
            </div>

            {/* Right: MEDSPA Image */}
            <div className="flex-1 text-right">
              <img
                src={medspaImg}
                alt="Medspa"
                className="w-64 h-auto ml-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (< md) */}
      <div className="md:hidden w-full">
        <div className="px-6 py-12">
          {/* Link Columns Section - 2 columns on mobile */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            {/* Column 1 */}
            <div className="space-y-2 text-sm">
              {navLinks.map((link, idx) => (
                <Link
                  key={`mobile-nav-${idx}`}
                  to={link.href}
                  className="block hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Column 2: legal links */}
            <div className="space-y-2 text-sm">
              {legalLinks.map((link, idx) => (
                <Link
                  key={`mobile-legal-${idx}`}
                  to={link.href}
                  className="block hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Wordmark Section - stacked on mobile */}
          <div className="border-t border-white/30 pt-8">
            {/* Copyright at top */}
            <div className="mb-8 flex justify-between items-start text-xs opacity-90">
              <div>
                © 2026 Glowin, Inc.<br />All rights reserved.
              </div>
            </div>

            {/* GLOWIN Image - large, overflow hidden */}
            <div className="overflow-hidden">
              <img
                src={glowingImg}
                alt="Glowin"
                className="w-full h-auto min-w-[200%]"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
