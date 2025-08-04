import { create } from 'zustand'
import { API_BASE } from '../config/api'
import { ERROR_MESSAGES } from '../config/messages'
import { retryFetch } from '../utils/retryFetch'
import type { Product } from './productStore.types'
import type { ProductStore } from './productStore.types'
import { PRODUCTS_LIMIT } from '../config/constants'

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  query: '',
  fetchProducts: async (reset = false) => {
    const { page, query, products } = get()
    set({ loading: true, error: null })

    try {
      const skip = reset ? 0 : (page - 1) * PRODUCTS_LIMIT
      let url = `${API_BASE}?limit=${PRODUCTS_LIMIT}&skip=${skip}`

      if (query.trim()) {
        url = `${API_BASE}/search?q=${encodeURIComponent(query.trim())}&limit=${PRODUCTS_LIMIT}&skip=${skip}`
      }

      const res = await retryFetch(url)
      const data = await res.json()
      const newProducts: Product[] = data.products || []
      const combined = reset ? newProducts : [...products, ...newProducts]
      const unique = Array.from(new Map(combined.map((p) => [p.id, p])).values())
      const limited = unique.slice(0, 60)

      set({
        products: limited,
        loading: false,
        page: reset ? 2 : page + 1,
        hasMore: limited.length < 60 && newProducts.length === PRODUCTS_LIMIT,
      })
    } catch (error: any) {
      let message = ERROR_MESSAGES.fetchProducts.generic
      if (!navigator.onLine) message = ERROR_MESSAGES.fetchProducts.offline
      else if (error.message?.includes('HTTP 5')) message = ERROR_MESSAGES.fetchProducts.timeout
      set({ error: message, loading: false })
    }
  },

  setQuery: (query: string) => {
    set({ query, page: 1, products: [], hasMore: true })
    get().fetchProducts(true)
  },
}))
