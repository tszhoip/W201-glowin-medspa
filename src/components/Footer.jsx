import { Link } from 'react-router-dom'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'

const g = parseContent(globalRaw)

export default function Footer() {
  return (
    <footer className="border-t border-cream-dark bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">

        {/* Business Name */}
        <div className="text-lg font-semibold mb-6">
          {g.BUSINESS_NAME}
        </div>

        {/* Contact Info Block */}
        <div className="mb-8 text-sm text-ink-soft space-y-1">
          <p>{g.FOOTER_ADDRESS}</p>
          <p>{g.FOOTER_PHONE}</p>
          <p>{g.FOOTER_EMAIL}</p>
          <p className="text-xs mt-3">{g.FOOTER_HOURS}</p>
        </div>

        {/* Tagline */}
        <p className="mb-8 text-sm text-ink-soft max-w-md leading-relaxed">
          {g.FOOTER_TAGLINE}
        </p>

        {/* CTA Button */}
        <Link
          to="/contact"
          className="inline-block mb-12 bg-peach px-6 py-2.5 text-sm font-medium text-ink hover:bg-peach-dark transition-colors"
          style={{ borderRadius: '6px' }}
        >
          {g.CTA_BOOK}
        </Link>

        {/* Divider */}
        <div className="my-12 border-t border-cream-dark" />

        {/* Links Row */}
        <div className="flex flex-wrap gap-4 md:gap-8 text-xs text-ink-soft">
          {/* Internal Navigation */}
          <Link to="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-ink transition-colors">
            {g.FOOTER_LINK_ABOUT}
          </Link>
          <Link to="/services" className="hover:text-ink transition-colors">
            {g.FOOTER_SERVICES_TITLE}
          </Link>
          <Link to="/contact" className="hover:text-ink transition-colors">
            {g.FOOTER_LINK_CONTACT}
          </Link>

          {/* Social Links (Placeholders) */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            Instagram
          </a>

          {/* Legal Links (Placeholders) */}
          <a href="#" className="hover:text-ink transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-ink transition-colors">
            Terms
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-cream-dark text-xs text-ink-soft">
          {g.COPYRIGHT}
        </div>
      </div>
    </footer>
  )
}
