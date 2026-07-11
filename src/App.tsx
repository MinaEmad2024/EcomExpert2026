import { useEffect, useState } from 'react'
import type { Product } from './type'

function App() {

  
  const [products, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    fetch('/bundle.json')
      .then((res) => res.json())
      .then(setProducts)
  }, [])

  if (!products) return <div>Loading…</div>

  return <div>Loaded {products.length} products</div>
}

export default App
