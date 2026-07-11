interface PriceDisplayProps {
  active: number
  compareAt?: number
  suffix?: string
  variant: 'card' | 'review'
}

export function PriceDisplay({ active, compareAt, suffix = '', variant }: PriceDisplayProps) {
  const showCompare = compareAt !== undefined && compareAt > active
  const activeText = active === 0 ? 'FREE' : `$${active.toFixed(2)}${suffix}`

  const compareClass =
    variant === 'card'
      ? 'text-[16px] font-medium tracking-[0.08px] text-strike line-through'
      : 'text-[13px] font-medium text-muted line-through'
  const activeClass =
    variant === 'card'
      ? 'text-[16px] font-semibold tracking-[0.08px] text-active'
      : 'text-base font-semibold text-primary'

  return (
    <span className="inline-flex flex-col items-end gap-0.5">
      {showCompare && (
        <span className={compareClass}>
          ${compareAt.toFixed(2)}
          {suffix}
        </span>
      )}
      <span className={activeClass}>{activeText}</span>
    </span>
  )
}