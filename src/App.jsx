import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import TawkChat from './components/TawkChat'
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'
import TreatmentDetail from './pages/TreatmentDetail'
import DesignShowcase from './pages/DesignShowcase'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/treatments/:id" element={<TreatmentDetail />} />
          <Route path="/design-showcase" element={<DesignShowcase />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <TawkChat />
    </div>
  )
}
