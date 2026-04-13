import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ShoppingCart, Leaf, Droplets } from 'lucide-react'
import api from '../lib/api'

const CATEGORIES = ['ALL', 'SEEDS', 'FERTILIZER', 'PESTICIDE', 'EQUIPMENT']

export function MarketplacePage() {
  const [category, setCategory] = useState('ALL')
  const [cart, setCart] = useState<Map<string, number>>(new Map())

  // Mocking products since the backend API '/products' isn't implemented completely yet
  const mockProducts = [
    { id: '1', name: 'Maize Seeds H614', category: 'SEEDS', unit: '2kg bag', pricePerUnit: 550 },
    { id: '2', name: 'CAN Fertilizer', category: 'FERTILIZER', unit: '50kg bag', pricePerUnit: 3500 },
    { id: '3', name: 'DAP Fertilizer', category: 'FERTILIZER', unit: '50kg bag', pricePerUnit: 3800 },
    { id: '4', name: 'Bean Seeds MW1', category: 'SEEDS', unit: '2kg bag', pricePerUnit: 600 },
    { id: '5', name: 'Weed Killer X', category: 'PESTICIDE', unit: '1L bottle', pricePerUnit: 1200 },
    { id: '6', name: 'Hand Sprayer', category: 'EQUIPMENT', unit: '1 piece', pricePerUnit: 2500 }
  ];

  const { data: products } = useQuery({
    queryKey: ['products', category],
    queryFn: () => Promise.resolve(category === 'ALL' ? mockProducts : mockProducts.filter(p => p.category === category))
  })

  const addToCart = (productId: string) => {
    setCart(c => new Map(c).set(productId, (c.get(productId) || 0) + 1))
  }

  const cartTotal = Array.from(cart.entries()).reduce((total, [id, qty]) => {
    const product = products?.find((p: any) => p.id === id)
    return total + (product?.pricePerUnit || 0) * qty
  }, 0)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Input Marketplace</h1>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium
              ${category === cat
                ? 'bg-green-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-green-400'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {products?.map((product: any) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="bg-green-50 rounded-lg h-32 flex items-center justify-center mb-3">
              {product.category === 'SEEDS' ? <Leaf className="text-green-500 w-10 h-10" />
                : <Droplets className="text-blue-500 w-10 h-10" />}
            </div>
            <h3 className="font-semibold text-sm">{product.name}</h3>
            <p className="text-gray-500 text-xs">{product.unit}</p>
            <p className="text-green-700 font-bold mt-1">KES {product.pricePerUnit}</p>
            <button
              onClick={() => addToCart(product.id)}
              className="mt-3 w-full py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
            >
              + Add to Order
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      {cart.size > 0 && (
        <div className="fixed bottom-4 left-4 right-4 bg-green-700 text-white p-4 rounded-xl shadow-lg flex justify-between items-center">
          <div>
            <p className="font-bold">KES {cartTotal.toLocaleString()}</p>
            <p className="text-xs opacity-80">{Array.from(cart.values()).reduce((a,b) => a+b, 0)} items</p>
          </div>
          <button className="bg-white text-green-700 px-6 py-2 rounded-lg font-bold flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Checkout
          </button>
        </div>
      )}
    </div>
  )
}
