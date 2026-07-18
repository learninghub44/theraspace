import { cn } from "@/app/lib/utils"

/**
 * The TheraSpace mark: two soft, overlapping arcs — one open, one closed —
 * suggesting a held, safe space rather than a literal icon (no heart, no
 * speech bubble, no clinical cross). Reads calm and a little organic at
 * any size, and works as a favicon-scale mark since it's just two strokes.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="20" className="fill-thera-primary/10" />
      <path
        d="M12 25c0-6.5 4.5-11.5 10-11.5"
        stroke="currentColor"
        className="text-thera-primary"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M28 16c1.3 1.9 2 4.2 2 6.7 0 6-4.7 10.8-10.5 10.8"
        stroke="currentColor"
        className="text-thera-accent"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="3" className="fill-thera-secondary" />
    </svg>
  )
}

export function Logo({
  className,
  markClassName,
  wordmark = true,
}: {
  className?: string
  markClassName?: string
  wordmark?: boolean
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark className={cn("w-8 h-8 lg:w-9 lg:h-9 shrink-0", markClassName)} />
      {wordmark && (
        <span className="text-xl lg:text-2xl font-display font-medium tracking-tight">
          Thera<span className="text-thera-primary">Space</span>
        </span>
      )}
    </span>
  )
}
