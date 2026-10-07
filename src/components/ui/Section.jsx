// Standard page section: full-width band (optionally with a top rule) holding a centered
// container with the default vertical rhythm.
//   rule: draw a hairline above the section
//   size: 'md' (default, 64px) | 'sm' (56px) vertical padding
//   className: extra classes for the band; innerClassName: extra classes for the container
//   (e.g. innerClassName="pb-0" or "max-w-4xl text-center")
export default function Section({ id, rule = false, size = 'md', className = '', innerClassName = '', children }) {
  const pad = size === 'sm' ? 'section-y-sm' : 'section-y'
  return (
    <section id={id} className={`${rule ? 'section-rule' : ''} ${className}`.trim()}>
      <div className={`page-container ${pad} ${innerClassName}`.trim()}>{children}</div>
    </section>
  )
}
