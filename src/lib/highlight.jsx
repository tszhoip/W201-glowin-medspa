// Renders copy where *text between asterisks* becomes <span class="highlight">.
// Example: "We *enhance—not change*—what makes you unique."
export default function Highlighted({ text }) {
  return text
    .split('*')
    .map((part, i) => (i % 2 === 1 ? <span key={i} className="highlight">{part}</span> : part))
}
