export interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
}
export interface ProductStore {
  products: Product[]
  loading: boolean
  error: string | null
  page: number
  hasMore: boolean
  query: string
  fetchProducts: (reset?: boolean) => Promise<void>
  setQuery: (query: string) => void
}
