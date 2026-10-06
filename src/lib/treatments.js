// Treatment data comes from src/content/treatments.xlsx via
// `npm run treatments` (runs automatically before dev/build).
import data from '../content/treatments.json'

const typeImages = import.meta.glob('../assets/images/services-page/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const treatmentImages = import.meta.glob('../assets/images/treatments/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const byName = (images, dir) => (name) => (name ? images[`../assets/images/${dir}/${name}`] : undefined)
const typeImage = byName(typeImages, 'services-page')
export const treatmentImage = byName(treatmentImages, 'treatments')

// [{ name, image, treatments: [...] }] in spreadsheet order
export const sections = data.types.map((t) => ({
  name: t.name,
  image: typeImage(t.image),
  treatments: data.treatments.filter((x) => x.type === t.name),
}))

export const findTreatment = (slug) => data.treatments.find((x) => x.slug === slug)
