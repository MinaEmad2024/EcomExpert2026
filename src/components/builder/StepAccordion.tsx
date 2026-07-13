import type { ReactNode } from 'react'
import type { Category, Product } from '../../type'
import { useBundle } from '../../state/BundleContext'
import { selectedCount } from '../../lib/pricing'
import { ChevronIcon } from '../Icons'
import { ProductCard } from './ProductCard'

interface StepAccordionProps {
  category: Category
  stepNumber: number
  title: string
  icon: ReactNode
  next?: { category: Category; title: string }
  products: Product[]
  layout?: 'main' | 'desktop-alt'
}

export function StepAccordion({ category, stepNumber, title, icon, next, products, layout = 'main' }: StepAccordionProps) {
  const { state, toggleStep } = useBundle()
  const expanded = state.expandedSteps[category]
  const count = selectedCount(state.products, state.quantities, category)
  const desktopAltExpanded = layout === 'desktop-alt' && expanded
  const stepDividerClass = desktopAltExpanded
    ? 'relative before:absolute before:top-4 before:left-[-15px] before:right-[-15px] before:border-t before:border-[#8e98a4]'
    : layout === 'main'
      ? 'relative max-lg:before:absolute max-lg:before:top-4 max-lg:before:left-[-16px] max-lg:before:right-[-16px] max-lg:before:border-t max-lg:before:border-[#8e98a4]'
      : ''

  function handleNext() {
    if (!next) return
    toggleStep(category)
    if (!state.expandedSteps[next.category]) toggleStep(next.category)
  }

  return (
    <section
      className={
        expanded
          ? 'rounded-panel bg-panel p-panel max-lg:rounded-none max-lg:px-4'
          : layout === 'desktop-alt'
            ? 'border-t border-border-light pt-[14px] pb-[27px]'
            : 'border-t border-border-light py-3 max-lg:px-4'
      }
    >
      <button
        type="button"
        className={`flex w-full cursor-pointer items-center justify-between gap-md border-0 bg-transparent p-0 text-left text-inherit ${stepDividerClass}`}
        onClick={() => toggleStep(category)}
        aria-expanded={expanded}
      >
          <span className={`flex min-w-0 flex-col ${!expanded && layout === 'desktop-alt' ? 'gap-5' : 'gap-0.5'}`}>
            <span className="text-[10px] leading-3 font-medium tracking-[1.6px] text-category uppercase">
            STEP {stepNumber} OF 4
          </span>
          <span
            className={`flex items-center gap-sm ${
              desktopAltExpanded
                ? 'mt-1 pt-4'
                : 'max-lg:mt-1 max-lg:pt-4'
            }`}
          >
            <span className="h-6 w-6 flex-shrink-0 text-ink">{icon}</span>
            <span className="text-[22px] leading-7 font-semibold text-ink">{title}</span>
          </span>
        </span>
        <span className="group flex flex-shrink-0 items-center gap-sm" data-expanded={expanded}>
          {count > 0 && (
            <span className="hidden text-sm font-medium whitespace-nowrap text-primary group-data-[expanded=true]:inline max-lg:inline">
              {count} selected
            </span>
          )}
          <ChevronIcon className="h-4 w-4 text-primary transition-transform duration-150 group-data-[expanded=true]:rotate-180" />
        </span>
      </button>
      {expanded && (
        <div className="mt-panel flex flex-col gap-step">
          <div className={layout === 'desktop-alt' ? 'desktop-alt-product-grid' : 'product-grid'}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} layout={layout} />
            ))}
          </div>
          {next && (
            <button
              type="button"
              className="cursor-pointer self-start rounded-button border border-primary bg-transparent px-6 py-2 text-lg font-semibold text-primary lg:self-center"
              onClick={handleNext}
            >
              Next: {next.title}
            </button>
          )}
        </div>
      )}
    </section>
  )
}
