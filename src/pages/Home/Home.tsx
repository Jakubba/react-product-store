import React, { useEffect, useState } from 'react'
import { useProductStore } from '../../services/productStore'
import Header from '../../components/Header/Header'
import ProductSection from '../../components/ProductSection/ProductSection'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'

const FEATURED_LIMIT = 10

const Home: React.FC = () => {
  const { products, loading, error, fetchProducts, query, setQuery } = useProductStore()

  const [searchTerm, setSearchTerm] = useState(query)

  useEffect(() => {
    setSearchTerm(query)
  }, [query])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(searchTerm)
    }, 500)
    return () => clearTimeout(timeout)
  }, [searchTerm, setQuery])

  useEffect(() => {
    if (!query && products.length === 0) {
      fetchProducts(true)
    }
  }, [fetchProducts, query, products.length])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const featured = products.slice(0, FEATURED_LIMIT)
  const newArrivals = products.slice(FEATURED_LIMIT)

  return (
    <div className="px-4 sm:px-12 py-6">
      <Header onSearch={handleSearch} />

      {error && (
        <div className="text-center my-4">
          <p className="text-red-500 font-bold text-xl mb-2">{error}</p>
          <button
            onClick={() => fetchProducts(true)}
            className="cursor-pointer px-4 py-2 bg-stone-400 hover:bg-stone-700 text-white rounded-lg"
            aria-label="Retry fetching products"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && products.length === 0 && !error && (
        <div className="text-center mt-8 text-gray-500 text-lg">No products to display.</div>
      )}

      {products.length > 0 && (
        <>
          <ProductSection title="Featured Products" products={featured} loading={loading} />
          {newArrivals.length > 0 && (
            <ProductSection
              title="New Arrivals"
              products={newArrivals}
              loading={loading}
              showMore
              pageSize={10}
            />
          )}
        </>
      )}

      {loading && products.length > 0 && (
        <div className="flex justify-center items-center gap-2 text-gray-500 mt-4">
          <div className="w-5 h-5 border-4 border-gray-300 border-t-stone-500 rounded-full animate-spin"></div>
          <span>Loading more products...</span>
        </div>
      )}

      <ScrollToTopButton />
    </div>
  )
}

export default Home
