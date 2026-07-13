import type { CartLine } from '../../type'
import { useBundle } from '../../state/BundleContext'
import { lineTotal, lineCompareTotal } from '../../lib/pricing'
import { QtyStepper } from '../builder/QtyStepper'
import { PriceDisplay } from '../PriceDisplay'
import { WyzeShieldIcon } from '../Icons'

interface LineItemProps {
  line: CartLine
}

export function LineItem({ line }: LineItemProps) {
  const { setQty } = useBundle()
  const showStepper = line.category !== 'plan'
  const activeAmount = lineTotal(line.unitActive, line.quantity)
  const compareAmount = lineCompareTotal(line, line.quantity)

  const [firstWord, ...rest] = line.name.split(' ')

  return (
    <div data-testid={`review-line-${line.key}`} className="flex items-center gap-2">
      {line.image ? (
        <img src={line.image} alt="" className="h-10 w-10 flex-shrink-0 rounded-small object-cover" />
      ) : (
        <WyzeShieldIcon className="h-10 w-10 flex-shrink-0 text-primary" />
      )}
      <div className="min-w-0 flex-1 text-[13px] leading-4 font-semibold text-ink">
        {line.category === 'plan' ? (
          <>
            {firstWord} <span className="text-primary">{rest.join(' ')}</span>
          </>
        ) : (
          <>
            {line.name}
            {line.required && ' (Required)'}
          </>
        )}
      </div>
      {showStepper && (
        <QtyStepper
          quantity={line.quantity}
          disabled={line.required}
          max={line.maxQty}
          onChange={(next) => setQty(line.productId, next, line.variantId)}
        />
      )}
      <PriceDisplay active={activeAmount} compareAt={compareAmount} suffix={line.priceSuffix} variant="review" />
    </div>
  )
}
