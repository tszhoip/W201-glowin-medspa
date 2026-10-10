import { Link } from 'react-router-dom'
import glowingImg from '../assets/images/footer/glowin.png'
import medspaImg from '../assets/images/footer/medspa.png'

// Footer links + copyright sit in one row, 16px apart
const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Membership', href: '/members' },
  { label: 'Contact', href: '/contact' },
  { label: 'Style', href: '/guideline' }, // TEMP: remove before launch (the /guideline page)
]

export default function Footer() {
  return (
    <footer className="bg-peach text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        {/* Links + copyright, one row */}
        <div className="flex flex-wrap items-center gap-4 text-sm mb-12 md:mb-16">
          {footerLinks.map((link) => (
            <Link key={link.label} to={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
          <p className="opacity-90">© 2026 Glowin, Inc. All rights reserved.</p>
        </div>

        {/* Wordmark: GLOWIN left, MEDSPA right (desktop) */}
        <div className="hidden md:flex items-flex-end justify-between pt-8">
          <img src={glowingImg} alt="Glowin" className="w-64 h-auto" />
          <img src={medspaImg} alt="Medspa" className="w-64 h-auto" />
        </div>

        {/* Wordmark: large GLOWIN, cropped (mobile) */}
        <div className="md:hidden pt-8 overflow-hidden">
          <img src={glowingImg} alt="Glowin" className="w-full h-auto min-w-[200%]" />
        </div>
      </div>
    </footer>
  )
}
