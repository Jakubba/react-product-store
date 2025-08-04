import React, { useEffect } from 'react'
import { useProductStore } from '../../services/productStore'
import Header from '../../components/Header/Header'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'
import { useSearchQuery } from './../../hooks/useSearchQuery'
import ErrorRetry from '../../components/ErrorRetry/ErrorRetry'
import NoProducts from '../../components/NoProducts/NoProducts'
import ProductsDisplay from '../../components/ProductsDisplay/ProductsDisplay'
import LoadingMore from '../../components/LoadingMore/LoadingMore'

const Home: React.FC = () => {
  const { products, loading, error, fetchProducts, query, setQuery } = useProductStore()

  const { searchTerm, setSearchTerm } = useSearchQuery(query, setQuery)

  useEffect(() => {
    if (!query && products.length === 0) {
      fetchProducts(true)
    }
  }, [fetchProducts, query, products.length])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <div className="px-4 sm:px-12 py-6 pt-20">
      <Header onSearch={handleSearch} searchValue={searchTerm} />

      {error && <ErrorRetry error={error} onRetry={() => fetchProducts(true)} />}

      {!loading && products.length === 0 && !error && <NoProducts />}

      {products.length > 0 && <ProductsDisplay products={products} loading={loading} />}

      {loading && products.length > 0 && <LoadingMore />}

      <ScrollToTopButton />
    </div>
  )
}

export default Home
