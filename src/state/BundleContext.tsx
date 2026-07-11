import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'
import type { Category, Product } from '../type'
import { bundleReducer, initialState, type BundleState } from './reducer'
import { loadConfig, saveConfig } from '../lib/storage'

interface BundleContextValue {
  state: BundleState
  isLoading: boolean
  setQty: (productId: string, quantity: number, variantId?: string) => void
  selectVariant: (productId: string, variantId: string) => void
  toggleStep: (category: Category) => void
  saveForLater: () => void
}

const BundleContext = createContext<BundleContextValue | null>(null)

export function BundleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bundleReducer, initialState)
  const isLoading = state.products.length === 0

  useEffect(() => {
    fetch('/bundle.json')
      .then((res) => res.json())
      .then((products: Product[]) => {
        const saved = loadConfig()
        dispatch({
          type: 'INIT',
          products,
          quantities: saved?.quantities,
          activeVariant: saved?.activeVariant,
        })
      })
  }, [])

  const value: BundleContextValue = {
    state,
    isLoading,
    setQty: (productId, quantity, variantId) =>
      dispatch({ type: 'SET_QTY', productId, variantId, quantity }),
    selectVariant: (productId, variantId) => dispatch({ type: 'SELECT_VARIANT', productId, variantId }),
    toggleStep: (category) => dispatch({ type: 'TOGGLE_STEP', category }),
    saveForLater: () => saveConfig({ quantities: state.quantities, activeVariant: state.activeVariant }),
  }

  return <BundleContext.Provider value={value}>{children}</BundleContext.Provider>
}

export function useBundle(): BundleContextValue {
  const ctx = useContext(BundleContext)
  if (!ctx) throw new Error('useBundle must be used within a BundleProvider')
  return ctx
}