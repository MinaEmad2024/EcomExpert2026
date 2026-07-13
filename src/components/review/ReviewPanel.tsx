import type { CartLine, Category } from '../../type'
import { useBundle } from '../../state/BundleContext'
import { selectCartLines, computeTotals } from '../../lib/pricing'
import { TruckIcon } from '../Icons'
import { PriceDisplay } from '../PriceDisplay'
import { LineItem } from './LineItem'
import { Totals } from './Totals'
import { Checkout } from './Checkout'

const GROUP_ORDER: Category[] = ['cameras', 'sensors', 'accessories', 'plan']

const CATEGORY_LABELS: Record<Category, string> = {
  cameras: 'Cameras',
  sensors: 'Sensors',
  accessories: 'Accessories',
  plan: 'Plan',
}

function CartGroups({ lines }: { lines: CartLine[] }) {
  return GROUP_ORDER.map((category) => {
    const groupLines = lines.filter((line) => line.category === category)
    if (!groupLines.length) return null

    return (
      <div key={category} className="mt-2.5 border-t border-border-light pt-2.5">
        <span className="text-[10px] leading-3 tracking-[0.36px] text-category uppercase">
          {CATEGORY_LABELS[category]}
        </span>
        <div className="mt-2 flex flex-col gap-2.5">
          {groupLines.map((line) => (
            <LineItem key={line.key} line={line} />
          ))}
        </div>
      </div>
    )
  })
}

interface ReviewPanelProps {
  layout?: 'main' | 'desktop-alt'
}

export function ReviewPanel({ layout = 'main' }: ReviewPanelProps) {
  const { state, isLoading } = useBundle()
  if (isLoading) return null

  const lines = selectCartLines(state.products, state.quantities)
  const totals = computeTotals(lines)

  if (layout === 'desktop-alt') {
    return (
      <section className="rounded-panel bg-panel px-[61px] py-8">
        <div className="flex gap-12">
          <div className="w-[552px] flex-shrink-0">
            <h2 className="text-2xl leading-7 font-semibold text-ink">Your security system</h2>
            <p className="mt-1 text-[15px] leading-5 text-label">
              Review your personalized protection system designed to keep what matters most safe.
            </p>
            <CartGroups lines={lines} />
            <div className="mt-2.5 flex items-center justify-between border-t border-border-light pt-2.5">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                <TruckIcon className="h-5 w-5 text-savings" />
                Fast Shipping
              </span>
              <PriceDisplay active={0} compareAt={5.99} variant="review" />
            </div>
          </div>

          <div className="flex min-w-0 flex-1 gap-6">
            <img
              src="/products/satisfaction-badge.png"
              alt="100% Wyze satisfaction guarantee"
              className="mt-1 h-[130px] w-[130px] flex-shrink-0"
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <h3 className="text-lg font-semibold text-ink">30-day hassle-free returns</h3>
              <p className="mt-4 max-w-[320px] text-base leading-5 text-body">
                If you’re not totally in love with the protection system, we will refund you 100%.
              </p>
              <div className="mt-10 flex items-end justify-between gap-4">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">as low as $19.19/mo</span>
                <Totals activeTotal={totals.activeTotal} compareTotal={totals.compareTotal} />
              </div>
              {totals.savings > 0 && (
                <p className="mt-3 text-right text-xs leading-4 font-semibold text-savings">
                  Congrats! You’re saving ${totals.savings.toFixed(2)} on your security bundle!
                </p>
              )}
              <Checkout className="mt-1" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="rounded-panel bg-panel p-panel">
      <span className="text-[10px] leading-3 font-medium tracking-[1.6px] text-category uppercase">Review</span>
      <h2 className="mt-1 text-[22px] leading-7 font-semibold text-ink">Your security system</h2>
      <p className="mt-1 text-[13px] leading-[17px] text-label">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      <CartGroups lines={lines} />

      <div className="mt-2.5 flex items-center justify-between border-t border-border-light pt-2.5">
        <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
          <TruckIcon className="h-5 w-5 text-savings" />
          Fast Shipping
        </span>
        <PriceDisplay active={0} compareAt={5.99} variant="review" />
      </div>

      <div className="mt-2.5 flex items-start justify-between gap-3">
        <img
          src="/products/satisfaction-badge.png"
          alt="100% Wyze satisfaction guarantee"
          className="w-[72px] flex-shrink-0"
        />
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">as low as $19.19/mo</span>
          <Totals activeTotal={totals.activeTotal} compareTotal={totals.compareTotal} />
        </div>
      </div>

      {totals.savings > 0 && (
        <p className="mt-2.5 text-xs leading-4 font-semibold text-savings">
          Congrats! You're saving ${totals.savings.toFixed(2)} on your security bundle!
        </p>
      )}

      <Checkout />
    </div>
  )
}
