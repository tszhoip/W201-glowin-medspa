import { Link } from 'react-router-dom'
import glowingImg from '../assets/images/footer/glowin.png'
import medspaImg from '../assets/images/footer/medspa.png'

// Hardcoded links from design
const col1Links = [
  { label: 'Home', href: '/' },
  { label: 'Botos', href: '/treatments/botox-dysport' },
  { label: 'Dermal Filler', href: '/treatments/dermal-fillers' },
  { label: 'PRP Injection', href: '/treatments/prp-injections' },
  { label: 'Sculptra', href: '/treatments/sculptra' },
  { label: 'Agnes', href: '/treatments/agnes' },
  { label: 'C02', href: '/treatments/co2' },
  { label: 'Ultherpy', href: '/treatments/ultherapy' },
]

const col2Links = [
  { label: 'Inmode', href: '/treatments/inmode' },
  { label: 'Miim Laser', href: '/treatments/miim-laser' },
  { label: 'Noblex', href: '/treatments/noblex' },
  { label: 'PDO Threads', href: '/treatments/pdo-threads' },
  { label: 'Scarlet', href: '/treatments/scarlet' },
  { label: 'Shrink', href: '/treatments/shrink' },
  { label: 'Shrink', href: '/treatments/shrink' },
  { label: 'Thermage', href: '/treatments/thermage' },
  { label: 'V-Zet', href: '/treatments/v-zet' },
  { label: 'PRP Injections', href: '/treatments/prp-injections' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'US State Privacy Notice', href: '#' },
  { label: 'Terms of Use', href: '#' },
  { label: 'Supply Chain Transparency', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-peach text-white">
      {/* Desktop Layout (≥ md) */}
      <div className="hidden md:block w-full">
        <div className="mx-auto max-w-7xl px-8 py-16">
          {/* Link Columns Section */}
          <div className="grid grid-cols-4 gap-12 mb-16">
            {/* Column 1: First set of treatment links */}
            <div className="space-y-2 text-sm">
              {col1Links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Column 2: Second set of treatment links */}
            <div className="space-y-2 text-sm">
              {col2Links.map((link) => (
                <Link
                  key={link.label + link.href}
                  to={link.href}
                  className="block hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Column 3: Spacer for layout */}
            <div></div>

            {/* Column 4: Legal links */}
            <div className="space-y-2 text-sm text-right">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
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
              {col1Links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Column 2 - includes overflow from column 2 links + legal links */}
            <div className="space-y-2 text-sm">
              {col2Links.map((link) => (
                <Link
                  key={link.label + link.href}
                  to={link.href}
                  className="block hover:underline"
                >
                  {link.label}
                </Link>
              ))}

              {/* Legal links at end of column 2 */}
              <div className="border-t border-white/30 pt-2 mt-4">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
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
                className="w-full h-auto"
                style={{ minWidth: '200%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
