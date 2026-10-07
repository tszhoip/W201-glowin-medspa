import { Link } from 'react-router-dom'

// The one way to render a button or button-like link.
//   variant: cta (default) | light | neutral        -> colors, see styles/components.css
//   size:    md (default) | sm | lg | hero | block  -> padding / type size
// Pass `to` for an internal link, `href` for an anchor/external link, neither for a <button>.
export default function Button({ to, href, variant = 'cta', size = 'md', className = '', ...props }) {
  const cls = `btn btn-${variant} btn-${size} ${className}`.trim()
  if (to) return <Link to={to} className={cls} {...props} />
  if (href) return <a href={href} className={cls} {...props} />
  return <button className={cls} {...props} />
}
