import { BundleProvider, useBundle } from './state/BundleContext'
import { selectCartLines, computeTotals, selectedCount } from './lib/pricing'
import { CATEGORIES } from './state/reducer'



function BundleSummary() {
    const { state, isLoading } = useBundle()

    if (isLoading) return <div>Loading…</div>


    const lines = selectCartLines(state.products, state.quantities)
    const totals = computeTotals(lines)

    return (
      <div>
        <p>Loaded {state.products.length} products</p>
        <ul>
          {CATEGORIES.map((category) => (
            <li key={category}>
              {category}: {selectedCount(state.products, state.quantities, category)} selected
            </li>
          ))}
        </ul>
        <p>Active total: ${totals.activeTotal.toFixed(2)}</p>
        <p>Compare total: ${totals.compareTotal.toFixed(2)}</p>
        <p>Savings: ${totals.savings.toFixed(2)}</p>
      </div>
    )
  }

  

function App() {
  return (
    <BundleProvider>
      <BundleSummary />
    </BundleProvider>
  )


}

export default App
