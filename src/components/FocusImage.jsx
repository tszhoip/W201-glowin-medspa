import { useLayoutEffect, useRef } from 'react'

// A cover photo that keeps its focus point (e.g. the face) in view on every screen size.
//   focus  { x, y } as fractions of the photo (0 = left/top, 1 = right/bottom), e.g. { x: 0.4, y: 0.35 }.
//          The crop is centered on that point as far as the photo allows. Without it, the photo is centered.
// Use it like a normal <img> with object-cover (pass className for size/position).
export default function FocusImage({ focus, className = '', ...props }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const img = ref.current
    if (!img || !focus) return
    // Close guess before the photo has loaded (avoids a visible jump); refined below once sizes are known
    img.style.objectPosition = `${focus.x * 100}% ${focus.y * 100}%`

    function place() {
      const { naturalWidth: W, naturalHeight: H, clientWidth: w, clientHeight: h } = img
      if (!W || !H || !w || !h) return
      const scale = Math.max(w / W, h / H) // object-cover
      const axis = (full, box, f) => {
        const spare = full * scale - box
        if (spare <= 0) return 50
        const start = Math.min(Math.max(f * full * scale - box / 2, 0), spare)
        return (start / spare) * 100
      }
      img.style.objectPosition = `${axis(W, w, focus.x)}% ${axis(H, h, focus.y)}%`
    }

    place()
    img.addEventListener('load', place)
    const ro = new ResizeObserver(place)
    ro.observe(img)
    return () => {
      img.removeEventListener('load', place)
      ro.disconnect()
    }
  }, [focus])

  return <img ref={ref} className={`object-cover ${className}`} {...props} />
}
