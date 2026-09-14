import { Link } from 'react-router-dom'
import facialImg from '../assets/images/services-page/FACIAL.jpg'
import injectablesImg from '../assets/images/services-page/INJECTABLES.jpg'
import laserImg from '../assets/images/services-page/LASER.jpg'
import wellnessImg from '../assets/images/services-page/WELLNESS.jpg'

// Service categories with their services
const categories = [
  {
    name: 'FACIAL & PEELING',
    image: facialImg,
    services: [
      'HydraFacial',
      'Ulta Peel',
      'Enzyme Peel',
      '24K Gold Therapy',
      'Acne Care Facial',
      'Lymphatic Facial'
    ]
  },
  {
    name: 'INJECTABLES & REGENERATIVE',
    image: injectablesImg,
    services: [
      'Neurotoxin',
      'Dermal Filler',
      'Collagen Biostimulators',
      'Thread Lift',
      'Skin Booster',
      'PRP (Platelet-Rich Plasma)',
      'Regenerative Skin Therapy',
      'Fat Dissolving Injection'
    ]
  },
  {
    name: 'LASER & ENERGY',
    image: laserImg,
    services: [
      'UltiMAX PRIME®',
      'Thermage FLX®',
      'InMode SkinFX / Body4 / Formal',
      'Quanta Pro',
      'Eve Titan',
      'Fractional RF Microneedling',
      'Picosure® Pro',
      'XSRF (RF)',
      'Plasma'
    ]
  },
  {
    name: 'WELLNESS',
    image: wellnessImg,
    services: [
      'Medical Weight Management',
      'IV Therapy',
      'Hair Restoration',
      'Hormone & Men\'s Wellness',
      'Joint PRP / PRF'
    ]
  }
]

// Map service names to slugs for URLs
const serviceMap = {
  'HydraFacial': 'hydrafacial',
  'Ulta Peel': 'ulta-peel',
  'Enzyme Peel': 'enzyme-peel',
  '24K Gold Therapy': 'gold-therapy',
  'Acne Care Facial': 'acne-care-facial',
  'Lymphatic Facial': 'lymphatic-facial',
  'Neurotoxin': 'neurotoxin',
  'Dermal Filler': 'dermal-filler',
  'Collagen Biostimulators': 'collagen-biostimulators',
  'Thread Lift': 'thread-lift',
  'Skin Booster': 'skin-booster',
  'PRP (Platelet-Rich Plasma)': 'prp',
  'Regenerative Skin Therapy': 'regenerative-skin-therapy',
  'Fat Dissolving Injection': 'fat-dissolving-injection',
  'UltiMAX PRIME®': 'ultimax-prime',
  'Thermage FLX®': 'thermage-flx',
  'InMode SkinFX / Body4 / Formal': 'inmode-skinf',
  'Quanta Pro': 'quanta-pro',
  'Eve Titan': 'eve-titan',
  'Fractional RF Microneedling': 'fractional-rf',
  'Picosure® Pro': 'picosure-pro',
  'XSRF (RF)': 'xsrf',
  'Plasma': 'plasma',
  'Medical Weight Management': 'medical-weight-management',
  'IV Therapy': 'iv-therapy',
  'Hair Restoration': 'hair-restoration',
  'Hormone & Men\'s Wellness': 'mens-wellness',
  'Joint PRP / PRF': 'joint-prp'
}

export default function Services() {
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      {/* Page Header */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-medium text-ink mb-4">
          Services
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl mx-auto mb-6">
          Personalized treatments guided by clinical expertise. Explore our full menu of skincare, injectables, lasers, and wellness services to build a plan around your goals.
        </p>
        <Link
          to="/contact"
          className="inline-block font-medium text-ink transition-all"
          style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '6px', backgroundColor: '#cbae94', color: '#fff' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#b89678'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#cbae94'
          }}
        >
          Book a consultation
        </Link>
      </section>

      {/* Category Sections */}
      {categories.map((category, idx) => (
        <section key={idx} className="w-full">
          {/* Category Image with Title */}
          <div className="relative w-full h-64 md:h-80">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-medium text-white text-center">
                {category.name}
              </h2>
            </div>
          </div>

          {/* Services Grid */}
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {category.services.map((service) => {
                const slug = serviceMap[service] || service.toLowerCase().replace(/\s+/g, '-').replace(/[®™]/g, '')
                return (
                  <Link
                    key={service}
                    to={`/treatments/${slug}`}
                    className="px-4 py-3 text-center font-medium rounded-lg transition-all"
                    style={{
                      backgroundColor: '#5c4a42',
                      color: '#fff',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#4a3a32'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#5c4a42'
                    }}
                  >
                    {service}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
