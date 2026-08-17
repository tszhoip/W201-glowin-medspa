import { Link } from 'react-router-dom'
import servicesRaw from '../content/services.txt?raw'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'
import glowingImg from '../assets/images/footer/glowin.png'
import medspaImg from '../assets/images/footer/medspa.png'

const g = parseContent(globalRaw)
const services = parseContent(servicesRaw)

// Extract all treatment/service names from CATEGORY_*_NAME
const allTreatments = Object.keys(services)
  .filter((k) => /^CATEGORY_\d+_NAME$/.test(k))
  .map((k) => ({
    name: services[k],
    slug: services[k].toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-'),
  }))

// Split treatments into two columns
const treatmentsCol1 = allTreatments.slice(0, Math.ceil(allTreatments.length / 2))
const treatmentsCol2 = allTreatments.slice(Math.ceil(allTreatments.length / 2))

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#e8b294' }} className="text-white">
      <div className="w-full px-6 py-16 md:py-20">
        {/* Mobile/Tablet: GLOWIN + 2 columns of links */}
        <div className="md:hidden mx-auto max-w-6xl">
          <div className="grid grid-cols-3 gap-6 mb-12">
            {/* Logo */}
            <div className="col-span-1">
              <img
                src={glowingImg}
                alt="Glowin"
                className="w-full h-auto"
              />
            </div>

            {/* Column 1 Links */}
            <div className="col-span-1 space-y-2 text-sm">
              <Link to="/" className="block hover:underline">
                Home
              </Link>
              {treatmentsCol1.map((t) => (
                <Link
                  key={t.slug}
                  to={`/treatments/${t.slug}`}
                  className="block hover:underline"
                >
                  {t.name}
                </Link>
              ))}
            </div>

            {/* Column 2 Links */}
            <div className="col-span-1 space-y-2 text-sm">
              {treatmentsCol2.map((t) => (
                <Link
                  key={t.slug}
                  to={`/treatments/${t.slug}`}
                  className="block hover:underline"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Full 3-column layout */}
        <div className="hidden md:block mx-auto max-w-6xl">
          <div className="grid grid-cols-4 gap-12 mb-12">
            {/* Column 1: Treatments */}
            <div className="space-y-2 text-sm">
              <Link to="/" className="block hover:underline">
                Home
              </Link>
              {treatmentsCol1.map((t) => (
                <Link
                  key={t.slug}
                  to={`/treatments/${t.slug}`}
                  className="block hover:underline"
                >
                  {t.name}
                </Link>
              ))}
            </div>

            {/* Column 2: More Treatments */}
            <div className="space-y-2 text-sm">
              {treatmentsCol2.map((t) => (
                <Link
                  key={t.slug}
                  to={`/treatments/${t.slug}`}
                  className="block hover:underline"
                >
                  {t.name}
                </Link>
              ))}
            </div>

            {/* Column 3: Empty spacer */}
            <div></div>

            {/* Column 4: MEDSPA + Legal */}
            <div>
              <img
                src={medspaImg}
                alt="Medspa"
                className="w-full h-auto mb-8"
              />
              <div className="space-y-2 text-sm">
                <Link to="#" className="block hover:underline">
                  Privacy Policy
                </Link>
                <Link to="#" className="block hover:underline">
                  US State Privacy Notice
                </Link>
                <Link to="#" className="block hover:underline">
                  Terms of Use
                </Link>
                <Link to="#" className="block hover:underline">
                  Supply Chain Transparency
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-6xl my-8 border-t border-white/20" />

        {/* Copyright */}
        <div className="mx-auto max-w-6xl text-xs opacity-90 text-center md:text-left">
          {g.COPYRIGHT}
        </div>
      </div>
    </footer>
  )
}
