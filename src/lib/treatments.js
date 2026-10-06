// Treatment data comes from src/content/treatments.xlsx via
// `npm run treatments` (runs automatically before dev/build).
import data from '../content/treatments.json'

const typeImages = import.meta.glob('../assets/images/treatment-type/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const treatmentImages = import.meta.glob('../assets/images/treatments/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const byName = (images, dir) => (name) => (name ? images[`../assets/images/${dir}/${name}`] : undefined)
const typeImage = byName(typeImages, 'treatment-type')
export const treatmentImage = byName(treatmentImages, 'treatments')

// [{ name, shortName, anchor, image, treatments: [...] }] in spreadsheet order
export const sections = data.types.map((t) => ({
  name: t.name,
  shortName: t.shortName,
  anchor: t.anchor,
  image: typeImage(t.image),
  treatments: data.treatments.filter((x) => x.type === t.name),
}))

export const findTreatment = (slug) => data.treatments.find((x) => x.slug === slug)

// Treatments marked 1-3 in the "Top Treatment" column, in that order.
export const topTreatments = data.treatments
  .filter((x) => x.top !== null)
  .sort((a, b) => a.top - b.top)
  .map((x) => ({ ...x, introImage: treatmentImage(x.intro) }))
