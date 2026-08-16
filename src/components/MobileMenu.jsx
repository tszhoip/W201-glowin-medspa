import { Link, NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `block px-4 py-3 text-sm transition-colors ${
    isActive ? 'text-ink font-medium bg-cream-dark/30' : 'text-ink-soft hover:text-ink'
  }`

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className="fixed left-0 top-0 bottom-0 w-64 bg-cream shadow-lg z-50 pt-20 overflow-y-auto transition-transform duration-300 ease-out"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <nav className="space-y-0">
          <NavLink
            to="/"
            onClick={onClose}
            end
            className={navLinkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            onClick={onClose}
            className={navLinkClass}
          >
            Services
          </NavLink>
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-cream-dark" />

        {/* CTA Button */}
        <div className="px-4 mb-4">
          <Link
            to="/contact"
            onClick={onClose}
            className="block w-full bg-peach px-4 py-3 text-sm font-medium text-ink text-center hover:bg-peach-dark transition-colors rounded"
            style={{ borderRadius: '6px' }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  )
}
