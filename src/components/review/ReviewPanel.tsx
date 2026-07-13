import type { Category } from '../../type'
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

export function ReviewPanel() {
  const { state, isLoading } = useBundle()
  if (isLoading) return null

  const lines = selectCartLines(state.products, state.quantities)
  const totals = computeTotals(lines)

  return (
    <div className="rounded-panel bg-panel p-panel">
      <span className="text-[10px] leading-3 font-medium tracking-[1.6px] text-category uppercase">Review</span>
      <h2 className="mt-1 text-[22px] leading-7 font-semibold text-ink">Your security system</h2>
      <p className="mt-1 text-[13px] leading-[17px] text-label">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      {GROUP_ORDER.map((category) => {
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
      })}

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
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
            as low as $19.19/mo
          </span>
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
