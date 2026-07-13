import type { Variant } from '../../type'

interface VariantSelectorProps {
  variants: Variant[]
  activeVariantId: string
  onSelect: (variantId: string) => void
}

export function VariantSelector({ variants, activeVariantId, onSelect }: VariantSelectorProps) {
  return (
    <div className="flex flex-nowrap gap-1.5">
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId
        return (
          <button
            key={variant.id}
            type="button"
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-button border px-2 py-1 ${
              isActive ? 'border-savings bg-savings/5' : 'border-border bg-surface'
            }`}
            onClick={() => onSelect(variant.id)}
            aria-pressed={isActive}
          >
            <img className="h-4 w-4 rounded-small object-cover" src={variant.chipImage} alt="" />
            <span className="whitespace-nowrap text-[10px] font-medium tracking-[0.6px] text-body">{variant.label}</span>
          </button>
        )
      })}
    </div>
  )
}
