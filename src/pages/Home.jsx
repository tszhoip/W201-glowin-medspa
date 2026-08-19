import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import heroBanner from '../assets/images/home/banner-01.png'
import co2 from '../assets/images/home/Co2.jpg'
import miimLaser from '../assets/images/home/Miin Laser.jpg'
import pdoThreads from '../assets/images/home/PDO Threads.jpg'
import catFace from '../assets/images/home/cat-face.png'
import faceImg from '../assets/images/services/face.png'
import injectableImg from '../assets/images/services/in.png'
import skinImg from '../assets/images/services/skin.png'

const serviceItems = [
  { id: 'face', label: 'Face', image: faceImg },
  { id: 'injectable', label: 'Injectable', image: injectableImg },
  { id: 'skincare', label: 'Skin Care', image: skinImg }
]

export default function Home() {
  const [activeService, setActiveService] = useState('face')
  const itemRefs = useRef({})

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveService(entry.target.dataset.id)
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)

    serviceItems.forEach((item) => {
      if (itemRefs.current[item.id]) {
        observer.observe(itemRefs.current[item.id])
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])
  return (
    <div className="bg-cream">
      {/* Hero Section - account for fixed header (56px) */}
      <section className="relative w-full" style={{ height: '80vh', minHeight: '600px', maxHeight: '1000px', marginTop: '56px' }}>
        <img
          src={heroBanner}
          alt="Rooted in Clinical Care"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
              Rooted in Clinical Care
            </h1>
            <Link
              to="/contact"
              className="inline-block font-medium text-ink transition-all"
              style={{ padding: '12px', fontSize: '14pt', borderRadius: '6px', backgroundColor: '#f5f5f5' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'inset 0 0 0 100px rgba(203, 174, 148, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center border-t border-cream-dark">
        <p className="text-base md:text-lg text-ink-soft leading-relaxed">
          Founded by board-certified providers, Glowin began with a simple question: why should advanced skincare be hard to access? We built streamlined systems, trained providers, and science-backed protocols so results feel natural — never confusing, rushed, or overpriced.
        </p>
      </section>

      {/* Top Seller Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-cream-dark">
        <div className="flex justify-between items-center mb-10">
          <h2 className="font-medium text-ink" style={{ fontSize: '14px' }}>
            Face Treatments
          </h2>
          <Link to="/services" className="text-ink-soft hover:text-ink transition-colors font-medium" style={{ fontSize: '14px' }}>
            See All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '12px' }}>
          <Link to="/treatments/co2" className="group relative">
            <img
              src={co2}
              alt="Co2"
              className="w-full h-64 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
            />
            <p className="absolute inset-0 flex items-center justify-center font-medium text-white" style={{ fontSize: '14pt' }}>Co2</p>
          </Link>

          <Link to="/treatments/miim-laser" className="group relative">
            <img
              src={miimLaser}
              alt="Miim Laser"
              className="w-full h-64 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
            />
            <p className="absolute inset-0 flex items-center justify-center font-medium text-white" style={{ fontSize: '14pt' }}>Miim Laser</p>
          </Link>

          <Link to="/treatments/pdo-threads" className="group relative">
            <img
              src={pdoThreads}
              alt="PDO Threads"
              className="w-full h-64 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
            />
            <p className="absolute inset-0 flex items-center justify-center font-medium text-white" style={{ fontSize: '14pt' }}>PDO Threads</p>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-cream-dark">
        <h2 className="text-2xl md:text-3xl font-medium text-ink mb-10">
          Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Service Links - Scrollable */}
          <div className="space-y-4 h-80 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
            {serviceItems.map((service) => (
              <div
                key={service.id}
                ref={(el) => (itemRefs.current[service.id] = el)}
                data-id={service.id}
                className={`block font-medium transition-colors py-8 ${
                  activeService === service.id ? 'text-peach' : 'text-ink hover:text-peach'
                }`}
                style={{ fontSize: '16px' }}
              >
                <Link to="/services" className="no-underline">
                  {service.label} •
                </Link>
              </div>
            ))}
          </div>

          {/* Right: Featured Image - Sticky */}
          <div className="sticky top-20 h-80 rounded-lg overflow-hidden">
            <img
              src={serviceItems.find((s) => s.id === activeService)?.image || catFace}
              alt={activeService}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
        </div>
      </section>

      {/* Your Voice Matters Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-cream-dark">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-medium text-ink">
            Your Voice Matters
          </h2>
          <Link to="#" className="text-ink-soft hover:text-ink transition-colors text-sm">
            All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-cream-dark p-6 bg-white/50 hover:border-peach hover:shadow-md transition-all"
            >
              <p className="text-sm text-ink-soft leading-relaxed mb-4">
                "Clean, modern, and welcoming—I felt cared for from start to finish."
              </p>
              <p className="text-xs text-ink-soft">- J. Kim</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Section - Hidden for now */}

      {/* Location/Direction Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-cream-dark">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium text-ink mb-6">
              Location
            </h2>
            <div className="text-sm text-ink-soft space-y-2">
              <p>123 Glowin Ave, Suite 200</p>
              <p>Los Angeles, CA 90001</p>
              <p className="mt-4">
                <a href="tel:+1234567890" className="text-ink hover:text-peach transition-colors">
                  (123) 456-7890
                </a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-medium text-ink mb-6">
              Direction
            </h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-118.2437!3d34.0522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27d49b%3A0xce0d0a63ae5b0efd!2s123%20Glowin%20Ave%20Suite%20200%20Los%20Angeles%20CA%2090001!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
