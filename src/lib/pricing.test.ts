import { describe, it, expect } from 'vitest'
import type { Product } from '../type'
import bundle from '../../public/bundle.json'
import {
  lineKey,
  badgeText,
  lineTotal,
  lineCompareTotal,
  selectCartLines,
  selectedCount,
  computeTotals,
} from './pricing'

const camera: Product = {
  id: 'cam',
  category: 'cameras',
  name: 'Test Cam',
  image: '/products/cam.png',
  unitActive: 20,
  unitCompareAt: 25,
  variants: [
    { id: 'red', label: 'Red', chipImage: '/red.png', seededQty: 0 },
    { id: 'blue', label: 'Blue', chipImage: '/blue.png', seededQty: 0 },
  ],
}

const plainProduct: Product = {
  id: 'card',
  category: 'accessories',
  name: 'Plain Accessory',
  image: '/products/plain.png',
  unitActive: 10,
  seededQty: 0,
}

const requiredProduct: Product = {
  id: 'hub',
  category: 'sensors',
  name: 'Hub',
  image: '/products/hub.png',
  unitActive: 0,
  unitCompareAt: 30,
  required: true,
  seededQty: 1,
}

describe('lineTotal / lineCompareTotal', () => {
  it('multiplies unit price by quantity', () => {
    expect(lineTotal(20, 3)).toBe(60)
  })

  it('rounds to the nearest cent', () => {
    expect(lineTotal(19.99, 3)).toBe(59.97)
  })

  it('falls back to unitActive when there is no compare-at price', () => {
    expect(lineCompareTotal({ unitActive: 10, unitCompareAt: undefined }, 2)).toBe(20)
  })

  it('uses unitCompareAt when present', () => {
    expect(lineCompareTotal({ unitActive: 20, unitCompareAt: 25 }, 2)).toBe(50)
  })
})

describe('badgeText', () => {
  it('shows "Required" for required products, ignoring price', () => {
    expect(badgeText(requiredProduct)).toBe('Required')
  })

  it('computes a percentage-off badge from active vs compare-at', () => {
    expect(badgeText(camera)).toBe('Save 20%')
  })

  it('shows no badge when there is no discount', () => {
    expect(badgeText(plainProduct)).toBeUndefined()
  })
})

describe('selectCartLines — per-variant quantities stay separate', () => {
  it('produces one line per variant with qty > 0, and skips zero-qty variants', () => {
    const quantities = {
      [lineKey('cam', 'red')]: 2,
      [lineKey('cam', 'blue')]: 0,
    }
    const lines = selectCartLines([camera], quantities)
    expect(lines).toHaveLength(1)
    expect(lines[0].variantId).toBe('red')
    expect(lines[0].quantity).toBe(2)
  })

  it('lists red and blue as independent lines when both have quantity', () => {
    const quantities = {
      [lineKey('cam', 'red')]: 2,
      [lineKey('cam', 'blue')]: 5,
    }
    const lines = selectCartLines([camera], quantities)
    expect(lines).toHaveLength(2)
    const red = lines.find((line) => line.variantId === 'red')
    const blue = lines.find((line) => line.variantId === 'blue')
    expect(red?.quantity).toBe(2)
    expect(blue?.quantity).toBe(5)
  })

  it('handles non-variant products by quantity alone', () => {
    const lines = selectCartLines([plainProduct], { card: 3 })
    expect(lines).toEqual([
      expect.objectContaining({ productId: 'card', quantity: 3, unitActive: 10 }),
    ])
  })
})

describe('selectedCount', () => {
  it('counts a product once even if multiple of its variants have quantity', () => {
    const quantities = {
      [lineKey('cam', 'red')]: 2,
      [lineKey('cam', 'blue')]: 1,
    }
    expect(selectedCount([camera], quantities, 'cameras')).toBe(1)
  })

  it('does not count products with zero quantity everywhere', () => {
    expect(selectedCount([camera], {}, 'cameras')).toBe(0)
  })
})

describe('computeTotals', () => {
  it('sums active/compare totals and derives savings', () => {
    const lines = selectCartLines([camera], { [lineKey('cam', 'red')]: 2 })
    const totals = computeTotals(lines)
    expect(totals.activeTotal).toBe(40)
    expect(totals.compareTotal).toBe(50)
    expect(totals.savings).toBe(10)
  })

  it('matches the seeded bundle.json totals from the design mock', () => {
    const products = bundle as Product[]
    const quantities: Record<string, number> = {}
    for (const product of products) {
      if (product.variants?.length) {
        for (const variant of product.variants) {
          quantities[lineKey(product.id, variant.id)] = variant.seededQty
        }
      } else {
        quantities[lineKey(product.id)] = product.seededQty ?? 0
      }
    }
    const totals = computeTotals(selectCartLines(products, quantities))
    expect(totals.activeTotal).toBe(187.89)
    expect(totals.compareTotal).toBe(238.81)
    expect(totals.savings).toBe(50.92)
  })
})