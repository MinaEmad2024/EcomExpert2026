interface QtyStepperProps {
  quantity: number
  onChange: (next: number) => void
  disabled?: boolean
  min?: number
  max?: number
}

const buttonClass =
  'flex h-6 w-6 items-center justify-center rounded-small border-0 bg-chip text-base leading-none text-ink cursor-pointer disabled:text-category disabled:cursor-not-allowed'

export function QtyStepper({ quantity, onChange, disabled, min = 0, max = Infinity }: QtyStepperProps) {
  return (
    <div className="inline-flex items-center gap-sm">
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(quantity - 1)}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="min-w-4 text-center text-base leading-5 font-medium">{quantity}</span>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(quantity + 1)}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}