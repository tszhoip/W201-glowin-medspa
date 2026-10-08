import { NavLink } from 'react-router-dom'
import Button from './ui/Button'

const navLinkClass = ({ isActive }) =>
  `block px-4 py-3 text-sm transition-colors ${
    isActive ? 'text-ink font-medium bg-black/5' : 'text-ink-soft hover:text-ink'
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
        className="fixed left-0 top-0 bottom-0 w-64 bg-page shadow-lg z-50 pt-20 overflow-y-auto transition-transform duration-300 ease-out"
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
          <NavLink
            to="/members"
            onClick={onClose}
            className={navLinkClass}
          >
            Members
          </NavLink>
          <NavLink
            to="/contact"
            onClick={onClose}
            className={navLinkClass}
          >
            Contact
          </NavLink>
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-line" />

        {/* CTA Button */}
        <div className="px-4 mb-4">
          <Button to="/book-now" onClick={onClose} size="md" className="w-full py-3">
            Book Now
          </Button>
        </div>
      </div>
    </>
  )
}
