import ProductSection from '../ProductSection/ProductSection'
import type { Product } from '../../services/productStore.types'

type ProductsDisplayProps = {
  products: Product[]
  loading: boolean
}

const FEATURED_LIMIT = 10

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({ products, loading }) => {
  const featured = products.slice(0, FEATURED_LIMIT)
  const newArrivals = products.slice(FEATURED_LIMIT)

  return (
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
  )
}

export default ProductsDisplay
