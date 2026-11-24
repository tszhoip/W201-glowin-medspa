import { useLayoutEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigationType } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
// import TawkChat from './components/TawkChat'
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'
import BookNow from './pages/BookNow'
import Members from './pages/Members'
import { SHOW_MEMBERSHIP } from './lib/features'
import TreatmentDetail from './pages/TreatmentDetail'
import Guideline from './pages/Guideline'
import NotFound from './pages/NotFound'

// /services was renamed to /treatments; keep old links and bookmarks working (and their #anchor)
function OldServicesRedirect() {
  const { hash } = useLocation()
  return <Navigate to={`/treatments${hash}`} replace />
}

// Opening a new page starts at the top (otherwise the old page's scroll position is kept).
// #anchor links are left alone (the page scrolls to the anchor); Back/Forward returns to where you were.
const savedScroll = {}
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual' // we handle it below
function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  const navType = useNavigationType()
  useLayoutEffect(() => {
    if (navType === 'POP' && savedScroll[key] != null) {
      const y = savedScroll[key]
      window.scrollTo({ top: y, left: 0, behavior: 'instant' })
      requestAnimationFrame(() => window.scrollTo({ top: y, left: 0, behavior: 'instant' })) // after images/layout settle
    } else if (!hash && navType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    const remember = () => { savedScroll[key] = window.scrollY }
    window.addEventListener('scroll', remember, { passive: true })
    return () => window.removeEventListener('scroll', remember)
  }, [pathname, hash, key, navType])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/treatments" element={<Services />} />
          <Route path="/services" element={<OldServicesRedirect />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-now" element={<BookNow />} />
          {SHOW_MEMBERSHIP && <Route path="/members" element={<Members />} />}
          <Route path="/treatments/:id" element={<TreatmentDetail />} />
          <Route path="/guideline" element={<Guideline />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {/* <TawkChat /> */}
    </div>
  )
}
