export type Category = 'cameras' | 'plan' | 'sensors' | 'accessories'

export interface Variant {
  id: string
  label: string
  /** Thumbnail shown in the color-chip selector row. */
  chipImage: string
  /** Overrides the card's main photo when this variant is active; falls back to Product.image when absent. */
  cardImage?: string
  seededQty: number
}

export interface Product {
  id: string
  category: Category
  name: string
  description?: string
  learnMoreUrl?: string
  image: string
  variants?: Variant[]
  unitActive: number
  unitCompareAt?: number
  priceSuffix?: string
  /** Stepper is locked at its seeded quantity (e.g. Sense Hub). */
  required?: boolean
  /** Upper bound on quantity, for non-variant products that aren't required (e.g. the Plan is 0 or 1). */
  maxQty?: number
  /** Seeded quantity for products without variants. */
  seededQty?: number
}

export interface CartLine {
  key: string
  productId: string
  variantId?: string
  category: Category
  name: string
  image: string
  quantity: number
  unitActive: number
  unitCompareAt?: number
  priceSuffix?: string
  required?: boolean
  maxQty?: number
}