import Button from '../components/ui/Button'
import Section from '../components/ui/Section'

export default function NotFound() {
  return (
    <Section innerClassName="max-w-xl py-24 text-center">
      <h1 className="type-heading">Page not found</h1>
      <p className="type-lead mt-3">The page you're looking for doesn't exist.</p>
      <Button to="/" className="mt-6">
        Back home
      </Button>
    </Section>
  )
}
