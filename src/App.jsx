import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
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

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
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
