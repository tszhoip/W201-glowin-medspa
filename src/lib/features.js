// Switches for sections that are built but not public yet.
// Flip to true to bring the page back: it returns to the header menu, the mobile menu, the footer and the /members route.
export const SHOW_MEMBERSHIP = false

// Services page: make each treatment name a link to its detail page (with the arrow icon).
// While false, the names show as plain text and only the "Book a consultation" button is a link.
export const SHOW_TREATMENT_LINKS = false

// Treatment detail pages switched on one by one (slugs from treatments.xlsx) while SHOW_TREATMENT_LINKS is false.
// Their names become links on the Treatments page and the home page; the others stay plain text.
export const TREATMENT_PAGES_ON = ['xerf', 'picosure-pro']
export const hasDetailPage = (slug) => SHOW_TREATMENT_LINKS || TREATMENT_PAGES_ON.includes(slug)

// Forms: the "I agree to terms & conditions" checkbox. Off until the terms / privacy pages exist.
// While false, the box is hidden and enquiries are sent without a consent line.
export const SHOW_CONSENT = false
