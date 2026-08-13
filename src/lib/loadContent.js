// Parses a simple ".txt" content format so non-developers can edit copy safely.
//
// Format:
//   ## SECTION_KEY
//   Free text goes here. Can span
//   multiple lines/paragraphs.
//
//   ## NEXT_SECTION_KEY
//   ...
//
// Rules for editors:
//   - Never delete or rename a line starting with "## "
//   - Everything else under a heading is safe to edit freely
export function parseContent(raw) {
  const sections = {}
  const parts = raw.split(/^##[ \t]*(.+?)[ \t]*$/m)
  // parts[0] = anything before first heading (ignored)
  for (let i = 1; i < parts.length; i += 2) {
    const key = parts[i].trim()
    const value = (parts[i + 1] || '').trim()
    sections[key] = value
  }
  return sections
}

// Helper: pull a numbered group of keys, e.g. SERVICE_1_NAME, SERVICE_1_DESC,
// SERVICE_2_NAME, SERVICE_2_DESC ... into an array of objects.
// prefix = "SERVICE", fields = ["NAME", "DESC"]
export function collectGroup(content, prefix, fields) {
  const items = []
  let i = 1
  while (content[`${prefix}_${i}_${fields[0]}`] !== undefined) {
    const item = {}
    for (const field of fields) {
      item[field.toLowerCase()] = content[`${prefix}_${i}_${field}`] || ''
    }
    items.push(item)
    i += 1
  }
  return items
}
