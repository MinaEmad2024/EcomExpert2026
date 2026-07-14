import { useBundle } from '../../state/BundleContext'
import { badgeText, lineKey } from '../../lib/pricing'
import { PriceDisplay } from '../PriceDisplay'
import { WyzeShieldIcon } from '../Icons'
import { QtyStepper } from './QtyStepper'
import { VariantSelector } from './VariantSelector'
import type { Product } from '../../type'

interface ProductCardProps {
  product: Product
  layout?: 'main' | 'desktop-alt'
}

export function ProductCard({ product, layout = 'main' }: ProductCardProps) {
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
  const badge = product.cardBadge ?? badgeText(product)
  const compactDescriptionLink = product.id === 'cam-pan-v3'
  const desktopAlt = layout === 'desktop-alt'
  const cardHeight =
    product.id === 'battery-cam-pro'
      ? 'lg:h-[166px]'
      : product.id === 'cam-floodlight-v2' || product.id === 'duo-cam-doorbell'
        ? 'lg:h-[174px]'
        : 'lg:h-[160px]'

  return (
    <div
      data-testid={`product-card-${product.id}`}
      className={`product-card relative rounded-panel border bg-surface ${desktopAlt ? 'lg:h-[331px]' : cardHeight} ${
        isSelected
          ? 'border-2 border-primary p-[10px]'
          : desktopAlt
            ? 'border-border p-card lg:p-[10px]'
            : 'border-border p-card'
      } `}
    >
      {badge && (
        <span className="absolute -top-2.5 left-card rounded-xl bg-primary px-2.5 py-[3px] text-xs leading-[14.7px] font-semibold text-white">
          {badge}
        </span>
      )}
      <div className={`flex h-full ${desktopAlt ? 'gap-lg lg:flex-col lg:gap-0' : 'gap-lg'}`}>
        {image ? (
          <img
            className={
              desktopAlt
                ? 'h-24 w-24 flex-shrink-0 object-contain lg:h-[145px] lg:w-full'
                : 'h-24 w-24 flex-shrink-0 object-contain'
            }
            src={image}
            alt=""
          />
        ) : (
          <WyzeShieldIcon
            className={
              desktopAlt
                ? 'h-24 w-24 flex-shrink-0 text-primary lg:h-[145px] lg:w-full'
                : 'h-24 w-24 flex-shrink-0 text-primary'
            }
          />
        )}
        <div className="product-card-content flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="m-0 text-base font-semibold tracking-[0.6px] text-ink">{product.name}</h3>
          {product.description && (
            <p className="m-0 text-xs leading-[15.6px] font-medium tracking-[0.6px] text-body opacity-75">
              {product.description}
              {compactDescriptionLink && product.learnMoreUrl && (
                <>
                  {' '}
                  <a className="text-link" href={product.learnMoreUrl}>
                    Learn More
                  </a>
                </>
              )}
            </p>
          )}
          {product.learnMoreUrl && !compactDescriptionLink && (
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
              active={product.cardActive ?? product.unitActive}
              compareAt={product.cardCompareAt ?? product.unitCompareAt}
              suffix={product.priceSuffix}
              variant="card"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
