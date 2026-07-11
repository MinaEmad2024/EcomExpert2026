import { useBundle } from '../../state/BundleContext'
import { badgeText, lineKey } from '../../lib/pricing'
import { PriceDisplay } from '../PriceDisplay'
import { WyzeShieldIcon } from '../Icons'
import { QtyStepper } from './QtyStepper'
import { VariantSelector } from './VariantSelector'
import type { Product } from '../../type'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { state, setQty, selectVariant } = useBundle()
  const variants = product.variants

  const activeVariantId = variants?.length
    ? (state.activeVariant[product.id] ?? variants[0].id)
    : undefined

  const activeVariant = variants?.find((variant) => variant.id === activeVariantId)
  const quantity = state.quantities[lineKey(product.id, activeVariantId)] ?? 0

  const isSelected = variants?.length
    ? variants.some((variant) => (state.quantities[lineKey(product.id, variant.id)] ?? 0) > 0)
    : quantity > 0

  const image = activeVariant?.cardImage ?? product.image
  const badge = badgeText(product)

  return (
    <div
      className={`relative rounded-panel border bg-surface ${
        isSelected ? 'border-2 border-primary p-[10px]' : 'border-border p-card'
      } ${className ?? ''}`}
    >
      {badge && (
        <span className="absolute -top-2.5 left-card rounded-xl bg-primary px-2.5 py-[3px] text-xs leading-[14.7px] font-semibold text-white">
          {badge}
        </span>
      )}
      <div className="flex gap-lg">
        {image ? (
          <img className="h-24 w-24 flex-shrink-0 object-contain" src={image} alt="" />
        ) : (
          <WyzeShieldIcon className="h-24 w-24 flex-shrink-0 text-primary" />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-sm">
          <h3 className="m-0 text-base font-semibold tracking-[0.6px] text-ink">{product.name}</h3>
          {product.description && (
            <p className="m-0 text-xs leading-[15.6px] font-medium tracking-[0.6px] text-body opacity-75">
              {product.description}
            </p>
          )}
          {product.learnMoreUrl && (
            <a className="text-xs font-medium text-link" href={product.learnMoreUrl}>
              Learn More
            </a>
          )}
          {variants?.length && activeVariantId && (
            <VariantSelector
              variants={variants}
              activeVariantId={activeVariantId}
              onSelect={(variantId) => selectVariant(product.id, variantId)}
            />
          )}
          <div className="mt-auto flex items-center justify-between gap-md">
            <QtyStepper
              quantity={quantity}
              disabled={product.required}
              max={product.maxQty}
              onChange={(next) => setQty(product.id, next, activeVariantId)}
            />
            <PriceDisplay
              active={product.unitActive}
              compareAt={product.unitCompareAt}
              suffix={product.priceSuffix}
              variant="card"
            />
          </div>
        </div>
      </div>
    </div>
  )
}