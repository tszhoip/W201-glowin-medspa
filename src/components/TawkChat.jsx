import { useEffect } from 'react'
import globalRaw from '../content/global.txt?raw'
import { parseContent } from '../lib/loadContent'

const g = parseContent(globalRaw)

// Free live chat widget: https://www.tawk.to/
// Set TAWK_PROPERTY_ID and TAWK_WIDGET_ID in src/content/global.txt
// (Property ID / Widget ID come from your Tawk.to dashboard > Administration > Channels).
export default function TawkChat() {
  useEffect(() => {
    const propertyId = g.TAWK_PROPERTY_ID
    const widgetId = g.TAWK_WIDGET_ID
    if (!propertyId || propertyId.startsWith('REPLACE_')) return
    if (document.getElementById('tawk-script')) return

    const script = document.createElement('script')
    script.id = 'tawk-script'
    script.async = true
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    document.body.appendChild(script)
  }, [])

  return null
}
