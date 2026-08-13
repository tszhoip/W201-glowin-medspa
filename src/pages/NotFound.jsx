import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-serif text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-ink-soft">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-peach px-6 py-2.5 text-sm font-medium text-ink hover:bg-peach-dark transition-colors"
      >
        Back home
      </Link>
    </div>
  )
}
