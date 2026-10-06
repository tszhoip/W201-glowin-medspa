// Treatments spreadsheet tooling.
//
//   node scripts/treatments.mjs build   xlsx -> src/content/treatments.json (runs automatically on dev/build)
//   node scripts/treatments.mjs seed    (re)creates src/content/treatments.xlsx with the starting data
//
// The spreadsheet is the source of truth for the Services page and every
// /treatments/:slug detail page. See the "Instructions" sheet inside the file.
import ExcelJS from 'exceljs'
import { marked } from 'marked'
import { existsSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const XLSX_PATH = join(root, 'src/content/treatments.xlsx')
const JSON_PATH = join(root, 'src/content/treatments.json')
const TYPE_IMG_DIR = join(root, 'src/assets/images/services-page')
const TREATMENT_IMG_DIR = join(root, 'src/assets/images/treatments')

const MAX_BLURB_WORDS = 50
const MAX_ROWS = 500

const TYPES = [
  { name: 'FACIAL & PEELING', image: 'FACIAL.jpg' },
  { name: 'INJECTABLES & REGENERATIVE', image: 'INJECTABLES.jpg' },
  { name: 'LASER & ENERGY', image: 'LASER.jpg' },
  { name: 'WELLNESS', image: 'WELLNESS.jpg' },
]

// [title, slug, type]. Slugs match the links already used on the site.
const SEED = [
  ['HydraFacial', 'hydrafacial', 'FACIAL & PEELING'],
  ['Lhala Peel', 'lhala-peel', 'FACIAL & PEELING'],
  ['Enzyme Peel', 'enzyme-peel', 'FACIAL & PEELING'],
  ['24K Gold Therapy', 'gold-therapy', 'FACIAL & PEELING'],
  ['Acne Care Facial', 'acne-care-facial', 'FACIAL & PEELING'],
  ['Lymphatic Facial', 'lymphatic-facial', 'FACIAL & PEELING'],
  ['Neurotoxin', 'neurotoxin', 'INJECTABLES & REGENERATIVE'],
  ['Dermal Filler', 'dermal-filler', 'INJECTABLES & REGENERATIVE'],
  ['Sculptra® • Radiesse®', 'sculptra-radiesse', 'INJECTABLES & REGENERATIVE'],
  ['Thread Lift', 'thread-lift', 'INJECTABLES & REGENERATIVE'],
  ['Skin Booster', 'skin-booster', 'INJECTABLES & REGENERATIVE'],
  ['PRP (Platelet-Rich Plasma)', 'prp', 'INJECTABLES & REGENERATIVE'],
  ['Cell Factor', 'cell-factor', 'INJECTABLES & REGENERATIVE'],
  ['Regenerative Skin Therapy', 'regenerative-skin-therapy', 'INJECTABLES & REGENERATIVE'],
  ['Fat Dissolving Injection', 'fat-dissolving-injection', 'INJECTABLES & REGENERATIVE'],
  ['PDO Threads', 'pdo-threads', 'INJECTABLES & REGENERATIVE'],
  ['Ultherapy PRIME®', 'ultherapy-prime', 'LASER & ENERGY'],
  ['Thermage FLX®', 'thermage-flx', 'LASER & ENERGY'],
  ['InMode (MiniFX / BodyFX / Forma)', 'inmode-minifx', 'LASER & ENERGY'],
  ['Onda Pro', 'onda-pro', 'LASER & ENERGY'],
  ['Eve Titan', 'eve-titan', 'LASER & ENERGY'],
  ['Potenza® RF Microneedling', 'potenza-rf', 'LASER & ENERGY'],
  ['PicoSure® Pro', 'picosure-pro', 'LASER & ENERGY'],
  ['XERF (Sérf)', 'xerf', 'LASER & ENERGY'],
  ['Plasma', 'plasma', 'LASER & ENERGY'],
  ['Co2', 'co2', 'LASER & ENERGY'],
  ['Miim Laser', 'miim-laser', 'LASER & ENERGY'],
  ['Agnes', 'agnes', 'LASER & ENERGY'],
  ['Noblex', 'noblex', 'LASER & ENERGY'],
  ['Scarlet', 'scarlet', 'LASER & ENERGY'],
  ['Shrink', 'shrink', 'LASER & ENERGY'],
  ['V-Zet', 'v-zet', 'LASER & ENERGY'],
  ['Medical Weight Management', 'medical-weight-management', 'WELLNESS'],
  ['IV Therapy', 'iv-therapy', 'WELLNESS'],
  ['Hair Restoration', 'hair-restoration', 'WELLNESS'],
  ['Joint PRP / PRF', 'joint-prp', 'WELLNESS'],
]

const INSTRUCTIONS = [
  'HOW TO EDIT THIS FILE',
  '',
  'Sheet "Treatments" — one row per treatment. Row order = order on the Services page.',
  '  • Title: name shown on the Services page and at the top of the detail page.',
  '  • Intro Image (optional): image file name shown at the top of the detail page, e.g. "hydrafacial-intro.jpg". Files go in src/assets/images/treatments/',
  '  • Slug: the web address, e.g. "hydrafacial" -> /treatments/hydrafacial. Lowercase letters, numbers and dashes only. Leave blank to auto-generate from the title. Changing a slug breaks old links.',
  '  • Treatment Type: pick from the dropdown. The list comes from the "Treatment Types" sheet.',
  '  • Blurb: short description, 50 words max.',
  '  • Before & After Image (optional): ONE image file name showing before and after together, e.g. "hydrafacial-before-after.jpg". Files go in src/assets/images/treatments/',
  '  • What It Treats (optional): plain text. Line breaks are kept (one concern per line works well).',
  '  • Benefit (optional): plain text. Line breaks are kept.',
  '  • How It Works (optional): text shown under the heading "How It Works". Markdown is supported:',
  '  • Optional sections are hidden on the page when left empty. Columns are matched by their header names, so you may reorder columns but do not rename the headers.',
  '        **bold**   *italic*   - list item (one per line)   blank line = new paragraph   [link text](https://...)',
  '',
  'Sheet "Treatment Types" — the sections of the Services page.',
  '  • Name: add, rename or remove rows here; the dropdown on the Treatments sheet follows. Row order = section order.',
  '  • Image: file name of the section image, e.g. "FACIAL.jpg". Files go in src/assets/images/services-page/',
  '  • If you rename or remove a type, update the Treatment Type of the treatments that use it (the build tells you which ones are wrong).',
  '',
  'Every treatment gets a detail page automatically; the Book Now button is always included.',
  'After saving, re-upload the file to src/content/treatments.xlsx and leave a note about what changed.',
]

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[®™•]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

function cellText(cell) {
  const v = cell?.value
  if (v == null) return ''
  if (typeof v === 'object') {
    if (Array.isArray(v.richText)) return v.richText.map((r) => r.text).join('').trim()
    if (v.result != null) return String(v.result).trim()
    if (v.text != null) return String(v.text).trim()
    return ''
  }
  return String(v).trim()
}

async function seed() {
  const wb = new ExcelJS.Workbook()

  const tws = wb.addWorksheet('Treatments', { views: [{ state: 'frozen', ySplit: 1 }] })
  tws.columns = [
    { header: 'Title', key: 'title', width: 36 },
    { header: 'Intro Image', key: 'intro', width: 30 },
    { header: 'Slug', key: 'slug', width: 28 },
    { header: 'Treatment Type', key: 'type', width: 30 },
    { header: 'Blurb (max 50 words)', key: 'blurb', width: 60 },
    { header: 'Before & After Image', key: 'image', width: 30 },
    { header: 'What It Treats', key: 'treats', width: 50 },
    { header: 'Benefit', key: 'benefit', width: 50 },
    { header: 'How It Works (Markdown)', key: 'how', width: 60 },
  ]
  SEED.forEach(([title, slug, type]) => tws.addRow({ title, slug, type }))
  for (let r = 2; r <= MAX_ROWS; r++) {
    tws.getCell(`D${r}`).dataValidation = {
      type: 'list',
      allowBlank: false,
      formulae: [`'Treatment Types'!$A$2:$A$30`],
      showErrorMessage: true,
      errorTitle: 'Unknown treatment type',
      error: 'Pick a type from the list (edit types on the "Treatment Types" sheet).',
    }
    for (const col of ['E', 'G', 'H', 'I']) tws.getCell(`${col}${r}`).alignment = { wrapText: true, vertical: 'top' }
  }

  const yws = wb.addWorksheet('Treatment Types', { views: [{ state: 'frozen', ySplit: 1 }] })
  yws.columns = [
    { header: 'Name', key: 'name', width: 36 },
    { header: 'Image', key: 'image', width: 30 },
  ]
  TYPES.forEach((t) => yws.addRow(t))

  const iws = wb.addWorksheet('Instructions')
  iws.getColumn(1).width = 140
  INSTRUCTIONS.forEach((line) => iws.addRow([line]))
  iws.getCell('A1').font = { bold: true, size: 14 }

  for (const ws of [tws, yws]) ws.getRow(1).font = { bold: true }

  await wb.xlsx.writeFile(XLSX_PATH)
  console.log(`Wrote ${XLSX_PATH} (${SEED.length} treatments, ${TYPES.length} types)`)
}

async function build() {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(XLSX_PATH)
  const warnings = []
  const errors = []

  // Numbers can export sheet names like "Treatments - Table 1", so match on the start of the name.
  const sheet = (name) => wb.worksheets.find((w) => w.name.trim().toLowerCase().startsWith(name))
  const yws = sheet('treatment types')
  const tws = sheet('treatments')
  if (!yws || !tws) throw new Error('treatments.xlsx must have sheets "Treatments" and "Treatment Types".')

  const types = []
  yws.eachRow((row, n) => {
    if (n === 1) return
    const name = cellText(row.getCell(1))
    const image = cellText(row.getCell(2))
    if (!name) return
    if (types.some((t) => t.name === name)) return errors.push(`Treatment Types row ${n}: duplicate type "${name}".`)
    if (!image) warnings.push(`Treatment Types row ${n} ("${name}"): no image set.`)
    else if (!existsSync(join(TYPE_IMG_DIR, image)))
      warnings.push(`Treatment Types row ${n} ("${name}"): image "${image}" not found in src/assets/images/services-page/.`)
    types.push({ name, image })
  })

  // Columns are found by header name (ignoring "(...)" notes and case), so they can be reordered.
  const norm = (h) => h.replace(/\(.*?\)/g, '').replace(/\s+/g, ' ').trim().toLowerCase()
  const col = {}
  tws.getRow(1).eachCell((cell, c) => {
    col[norm(cellText(cell))] = c
  })
  const need = ['title', 'intro image', 'slug', 'treatment type', 'blurb', 'before & after image', 'what it treats', 'benefit', 'how it works']
  const missing = need.filter((h) => !col[h])
  if (missing.length) {
    console.error(`[treatments] ERROR: Treatments sheet is missing column(s): ${missing.join(', ')}. Don't rename the header row.`)
    process.exit(1)
  }
  const get = (row, h) => cellText(row.getCell(col[h]))

  const treatmentFiles = existsSync(TREATMENT_IMG_DIR) ? readdirSync(TREATMENT_IMG_DIR) : []
  const treatments = []
  const slugs = new Set()
  tws.eachRow((row, n) => {
    if (n === 1) return
    const title = get(row, 'title')
    if (!title) return
    const intro = get(row, 'intro image')
    const slug = slugify(get(row, 'slug') || title)
    const type = get(row, 'treatment type')
    const blurb = get(row, 'blurb').replace(/\s+/g, ' ')
    const image = get(row, 'before & after image')
    const treats = get(row, 'what it treats')
    const benefit = get(row, 'benefit')
    const how = get(row, 'how it works')
    const where = `Treatments row ${n} ("${title}")`

    if (slugs.has(slug)) errors.push(`${where}: duplicate slug "${slug}".`)
    slugs.add(slug)
    if (!types.some((t) => t.name === type))
      errors.push(`${where}: Treatment Type "${type}" is not on the Treatment Types sheet.`)
    const words = blurb ? blurb.split(' ').length : 0
    if (words > MAX_BLURB_WORDS) warnings.push(`${where}: blurb is ${words} words (max ${MAX_BLURB_WORDS}).`)
    // Exact-case match: macOS ignores case but the Vercel (Linux) build does not.
    for (const img of [intro, image].filter(Boolean))
      if (!treatmentFiles.includes(img))
        warnings.push(`${where}: image "${img}" not found in src/assets/images/treatments/ (names are case-sensitive).`)

    treatments.push({
      title,
      slug,
      type,
      blurb,
      intro,
      image,
      treats,
      benefit,
      // Raw HTML typed into the sheet is escaped, not rendered.
      howHtml: how
        ? marked.parse(how, { async: false, renderer: Object.assign(new marked.Renderer(), { html: ({ text }) => text.replace(/</g, '&lt;') }) })
        : '',
    })
  })

  warnings.forEach((w) => console.warn(`[treatments] warning: ${w}`))
  if (errors.length) {
    errors.forEach((e) => console.error(`[treatments] ERROR: ${e}`))
    process.exit(1)
  }
  writeFileSync(JSON_PATH, JSON.stringify({ types, treatments }, null, 2) + '\n')
  console.log(`[treatments] ${treatments.length} treatments, ${types.length} types -> src/content/treatments.json`)
}

const cmd = process.argv[2]
if (cmd === 'seed') await seed()
else if (cmd === 'build') await build()
else {
  console.error('Usage: node scripts/treatments.mjs <build|seed>')
  process.exit(1)
}
