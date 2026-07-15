// The recurring "open circle" mark from Vina's own Canva portfolio (seen on the
// cover, about, and closing slides) — reused here as the site's signature motif.
export default function BrandSwoosh({ className = '', size = 240 }) {
  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      className={`brand-swoosh ${className}`}
      aria-hidden="true"
    >
      <path d="M 60 70 A 90 90 0 1 1 70 185" />
      <circle cx="183" cy="55" r="10" fill="currentColor" stroke="none" />
    </svg>
  )
}
