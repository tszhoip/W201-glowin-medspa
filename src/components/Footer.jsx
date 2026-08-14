import { Link } from 'react-router-dom'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'

const g = parseContent(globalRaw)

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#e8b294' }} className="text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">

        {/* Two-Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">

          {/* Left Column - GLOWIN */}
          <div>
            <div className="text-2xl font-semibold mb-6">
              GLOWIN
            </div>

            {/* Contact Info */}
            <div className="mb-8 text-sm space-y-1 opacity-90">
              <p>{g.FOOTER_ADDRESS}</p>
              <p>{g.FOOTER_PHONE}</p>
              <p>{g.FOOTER_EMAIL}</p>
              <p className="text-xs mt-3">{g.FOOTER_HOURS}</p>
            </div>

            {/* Tagline */}
            <p className="text-sm opacity-90 max-w-md leading-relaxed">
              {g.FOOTER_TAGLINE}
            </p>
          </div>

          {/* Right Column - MEDSPA */}
          <div>
            <div className="text-2xl font-semibold mb-6">
              MEDSPA
            </div>

            {/* Links */}
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs opacity-75 mb-2">Services</p>
                <Link to="/services" className="hover:opacity-75 transition-opacity">
                  {g.FOOTER_SERVICES_TITLE}
                </Link>
              </div>
              <div>
                <p className="text-xs opacity-75 mb-2">Company</p>
                <Link to="/about" className="hover:opacity-75 transition-opacity">
                  {g.FOOTER_LINK_ABOUT}
                </Link>
              </div>
              <div>
                <p className="text-xs opacity-75 mb-2">Support</p>
                <Link to="/contact" className="hover:opacity-75 transition-opacity">
                  {g.FOOTER_LINK_CONTACT}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs opacity-90">
          <div>
            {g.COPYRIGHT}
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-75 transition-opacity">
              Privacy
            </a>
            <a href="#" className="hover:opacity-75 transition-opacity">
              Terms
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
