import { create } from 'zustand'
import { API_BASE } from '../config/api'
import { PRODUCTS_LIMIT } from '../config/constants'
import { ERROR_MESSAGES } from '../config/messages'
import { retryFetch } from '../utils/retryFetch'

export interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
}

interface ProductStore {
  products: Product[]
  loading: boolean
  error: string | null
  page: number
  hasMore: boolean
  query: string
  fetchProducts: (reset?: boolean) => Promise<void>
  setQuery: (query: string) => void
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  query: '',
  fetchProducts: async (reset = false) => {
    if (get().loading) return
    const { query } = get()
    set({ loading: true, error: null })

    try {
      let url = API_BASE
      if (query.trim()) {
        url = `${API_BASE}/search?q=${encodeURIComponent(query.trim())}`
      }

      const res = await retryFetch(url)
      const data = await res.json()
      const newProducts: Product[] = data.products || []

      set({
        products: newProducts,
        loading: false,
        page: 1,
        hasMore: false,
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
