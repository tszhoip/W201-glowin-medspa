import { Link } from 'react-router-dom'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'

const g = parseContent(globalRaw)

export default function Footer() {
  return (
    <footer className="border-t border-cream-dark bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="font-serif text-lg font-semibold">{g.BUSINESS_NAME}</div>
          <p className="mt-2 text-sm text-ink-soft max-w-xs">{g.FOOTER_TAGLINE}</p>
          <p className="mt-4 text-sm text-ink-soft">{g.FOOTER_ADDRESS}</p>
          <p className="text-sm text-ink-soft">{g.FOOTER_PHONE}</p>
          <p className="text-sm text-ink-soft">{g.FOOTER_EMAIL}</p>
          <p className="mt-2 text-sm text-ink-soft">{g.FOOTER_HOURS}</p>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">{g.FOOTER_SERVICES_TITLE}</div>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li>{g.FOOTER_LINK_LIFTING}</li>
            <li>{g.FOOTER_LINK_MICRONEEDLING}</li>
            <li>{g.FOOTER_LINK_LASER}</li>
            <li>{g.FOOTER_LINK_INJECTABLES}</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium mb-3">{g.FOOTER_COMPANY_TITLE}</div>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li>
              <Link to="/about">{g.FOOTER_LINK_ABOUT}</Link>
            </li>
            <li>{g.FOOTER_LINK_OURSTORY}</li>
            <li>{g.FOOTER_LINK_REVIEWS}</li>
            <li>
              <Link to="/contact">{g.FOOTER_LINK_CONTACT}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream-dark">
        <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-ink-soft">{g.COPYRIGHT}</div>
      </div>
    </footer>
  )
}
