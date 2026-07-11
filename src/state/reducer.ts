import type { Category, Product } from '../type'
import { lineKey } from '../lib/pricing'

export const CATEGORIES: Category[] = ['cameras', 'plan', 'sensors', 'accessories']

export interface BundleState {
  products: Product[]
  quantities: Record<string, number>
  activeVariant: Record<string, string>
  expandedSteps: Record<Category, boolean>
}

export type BundleAction =
  | {
      type: 'INIT'
      products: Product[]
      quantities?: Record<string, number>
      activeVariant?: Record<string, string>
    }
  | { type: 'SET_QTY'; productId: string; variantId?: string; quantity: number }
  | { type: 'SELECT_VARIANT'; productId: string; variantId: string }
  | { type: 'TOGGLE_STEP'; category: Category }

export const initialState: BundleState = {
  products: [],
  quantities: {},
  activeVariant: {},
  expandedSteps: { cameras: true, plan: false, sensors: false, accessories: false },
}

export function seedQuantities(products: Product[]): {
  quantities: Record<string, number>
  activeVariant: Record<string, string>
} {
  const quantities: Record<string, number> = {}
  const activeVariant: Record<string, string> = {}

  for (const product of products) {
    if (product.variants?.length) {
      const selected = product.variants.find((variant) => variant.seededQty > 0) ?? product.variants[0]
      activeVariant[product.id] = selected.id
      for (const variant of product.variants) {
        quantities[lineKey(product.id, variant.id)] = variant.seededQty
      }
    } else {
      quantities[lineKey(product.id)] = product.seededQty ?? 0
    }
  }

  return { quantities, activeVariant }
}

export function bundleReducer(state: BundleState, action: BundleAction): BundleState {
  switch (action.type) {
    case 'INIT': {
      const seeded = seedQuantities(action.products)
      return {
        ...state,
        products: action.products,
        quantities: action.quantities ?? seeded.quantities,
        activeVariant: action.activeVariant ?? seeded.activeVariant,
      }
    }

    case 'SET_QTY': {
      const product = state.products.find((p) => p.id === action.productId)
      if (!product || product.required) return state

      const max = product.maxQty ?? Infinity
      const quantity = Math.min(Math.max(action.quantity, 0), max)
      const key = lineKey(action.productId, action.variantId)
      return { ...state, quantities: { ...state.quantities, [key]: quantity } }
    }

    case 'SELECT_VARIANT':
      return {
        ...state,
        activeVariant: { ...state.activeVariant, [action.productId]: action.variantId },
      }

    case 'TOGGLE_STEP':
      return {
        ...state,
        expandedSteps: {
          ...state.expandedSteps,
          [action.category]: !state.expandedSteps[action.category],
        },
      }

    default:
      return state
  }
}