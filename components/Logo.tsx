type LogoMarkProps = {
  size?: number
  className?: string
}

/**
 * The "Nexus Nodes" mark — three connected nodes standing in for "an
 * ecosystem of connected tools" rather than a generic monogram. Fixed
 * to the site's actual zinc-950 (#09090b) for the hollow node's fill
 * since the site is single-theme dark — see app/globals.css.
 */
export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 46 46"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line x1="12" y1="34" x2="23" y2="12" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="23" y1="12" x2="34" y2="34" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
      <line
        x1="12"
        y1="34"
        x2="34"
        y2="34"
        stroke="#a855f7"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="23" cy="12" r="5" fill="#09090b" stroke="#c084fc" strokeWidth="2.5" />
      <circle cx="12" cy="34" r="4" fill="#a855f7" />
      <circle cx="34" cy="34" r="4" fill="#a855f7" />
    </svg>
  )
}

type LogoProps = {
  markSize?: number
  wordmarkClassName?: string
  className?: string
}

/** Mark + wordmark lockup — what Navbar and Footer actually render. */
export function Logo({ markSize = 32, wordmarkClassName, className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <LogoMark size={markSize} />
      <span className={wordmarkClassName ?? 'font-bold tracking-wider text-sm text-zinc-100'}>
        NEXA <span className="text-purple-400">LABS</span>
      </span>
    </span>
  )
}
