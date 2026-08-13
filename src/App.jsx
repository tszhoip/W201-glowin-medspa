import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import TawkChat from './components/TawkChat'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Location from './pages/Location'
import Machines from './pages/Machines'
import Blog from './pages/Blog'
import TreatmentDetail from './pages/TreatmentDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/location" element={<Location />} />
          <Route path="/machines" element={<Machines />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/treatments/lifting" element={<TreatmentDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <TawkChat />
    </div>
  )
}
