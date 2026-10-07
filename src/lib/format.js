// "INJECTABLES & REGENERATIVE" -> "Injectables & Regenerative"
export const titleCase = (s) => s.toLowerCase().replace(/(^|[\s(/-])([a-z])/g, (_, sep, ch) => sep + ch.toUpperCase())
