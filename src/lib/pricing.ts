import type { Category, CartLine, Product } from '../type'

export function lineKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}:${variantId}` : productId
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100
}

export function badgeText(product: Product): string | undefined {
  if (product.required) return 'Required'
  if (product.unitCompareAt !== undefined && product.unitCompareAt > product.unitActive) {
    const pct = Math.round(((product.unitCompareAt - product.unitActive) / product.unitCompareAt) * 100)
    return `Save ${pct}%`
  }
  return undefined
}

export function lineTotal(unitActive: number, quantity: number): number {
  return round2(unitActive * quantity)
}

export function lineCompareTotal(
  product: Pick<Product, 'unitActive' | 'unitCompareAt'>,
  quantity: number,
): number {
  const unit = product.unitCompareAt ?? product.unitActive
  return round2(unit * quantity)
}

export function selectCartLines(products: Product[], quantities: Record<string, number>): CartLine[] {
  const lines: CartLine[] = []

  for (const product of products) {
    if (product.variants?.length) {
      for (const variant of product.variants) {
        const quantity = quantities[lineKey(product.id, variant.id)] ?? 0
        if (quantity <= 0) continue
        lines.push({
          key: lineKey(product.id, variant.id),
          productId: product.id,
          variantId: variant.id,
          category: product.category,
          name: product.name,
          image: variant.cardImage ?? product.image,
          quantity,
          unitActive: product.unitActive,
          unitCompareAt: product.unitCompareAt,
          priceSuffix: product.priceSuffix,
          required: product.required,
          maxQty: product.maxQty,
        })
      }
      continue
    }

    const quantity = quantities[lineKey(product.id)] ?? 0
    if (quantity <= 0) continue
    lines.push({
      key: lineKey(product.id),
      productId: product.id,
      category: product.category,
      name: product.name,
      image: product.image,
      quantity,
      unitActive: product.unitActive,
      unitCompareAt: product.unitCompareAt,
      priceSuffix: product.priceSuffix,
      required: product.required,
      maxQty: product.maxQty,
    })
  }

  return lines
}

export function selectedCount(
  products: Product[],
  quantities: Record<string, number>,
  category: Category,
): number {
  return products.filter((product) => {
    if (product.category !== category) return false
    if (product.variants?.length) {
      return product.variants.some((variant) => (quantities[lineKey(product.id, variant.id)] ?? 0) > 0)
    }
    return (quantities[lineKey(product.id)] ?? 0) > 0
  }).length
}

export interface Totals {
  activeTotal: number
  compareTotal: number
  savings: number
}

export function computeTotals(lines: CartLine[]): Totals {
  let activeTotal = 0
  let compareTotal = 0

  for (const line of lines) {
    activeTotal += lineTotal(line.unitActive, line.quantity)
    compareTotal += lineCompareTotal(line, line.quantity)
  }

  activeTotal = round2(activeTotal)
  compareTotal = round2(compareTotal)

  return { activeTotal, compareTotal, savings: round2(compareTotal - activeTotal) }
}