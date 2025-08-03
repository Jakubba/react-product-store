import React, { useEffect, useCallback, useRef, useMemo } from 'react'
import { useProductStore } from '../../services/productStore'
import Header from '../../components/Header/Header'
import ProductSection from '../../components/ProductSection/ProductSection'

const Home: React.FC = () => {
  const { products, loading, error, fetchProducts, hasMore, query, setQuery } = useProductStore()

  useEffect(() => {
    fetchProducts(true)
  }, [fetchProducts, query])

  useEffect(() => {
    const checkAndLoadMore = () => {
      if (!hasMore || loading) return
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      if (scrollHeight <= clientHeight + 100) {
        fetchProducts()
      }
    }
    checkAndLoadMore()
  }, [products, hasMore, loading, fetchProducts])

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value)
    },
    [setQuery],
  )

  const observer = useRef<IntersectionObserver | null>(null)
  const lastProductRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchProducts()
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore, fetchProducts],
  )

  const featured = useMemo(() => products.slice(0, 6), [products])
  const newArrivals = useMemo(() => products.slice(6), [products])

  return (
    <div className="px-4 sm:px-12 py-6">
      <Header onSearch={handleSearch} />

      {error && (
        <div className="text-center my-4">
          <p className="text-red-500 font-bold text-xl mb-2">{error}</p>
          <button
            onClick={() => fetchProducts()}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
            aria-label="Retry fetching products"
          >
            Try Again
          </button>
        </div>
      )}

      {loading && products.length === 0 ? (
        <div className="my-8 max-w-[960px] mx-auto">
          <div
            data-testid="loading"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="hover:shadow-md transition max-w-[176px] cursor-pointer rounded-lg p-3 animate-pulse bg-white"
              >
                <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 w-full bg-gray-300 mb-2 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <ProductSection
            title="Featured Products"
            products={featured}
            loading={loading}
            lastProductRef={lastProductRef}
          />

          {newArrivals.length > 0 && (
            <ProductSection title="New Arrivals" products={newArrivals} loading={loading} />
          )}

          {!loading && products.length === 0 && !error && (
            <div className="text-center mt-8 text-gray-500 text-lg">No products to display.</div>
          )}

          {loading && products.length > 0 && (
            <div className="text-center mt-4 text-gray-500">Loading more products...</div>
          )}

          {!hasMore && <div className="text-center mt-4 text-gray-500">No more products.</div>}
        </>
      )}
    </div>
  )
}

export default Home
