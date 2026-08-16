import { Link } from 'react-router-dom'

export default function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 border-t border-cream-dark">
      {/* Section Header: Title left, Link right */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-medium text-ink">
          Your Voice Matters Here
        </h2>
        <Link
          to="#"
          className="text-ink-soft hover:text-ink transition-colors text-sm"
        >
          See Business Profile →
        </Link>
      </div>

      {/* Cards Grid - 3 equal columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-cream-dark hover:border-peach hover:shadow-md transition-all duration-300"
            style={{
              backgroundColor: '#efefef',
              minHeight: '200px',
            }}
          />
        ))}
      </div>
    </section>
  )
}
