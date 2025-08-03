import React, { memo } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import SkeletonCard from '../SkeletonCard/SkeletonCard'
import SkeletonTitle from '../SkeletonTitle/SkeletonTitle'
import type { Product } from '../../services/productStore'

interface ProductSectionProps {
  title: string
  products: Product[]
  loading: boolean
  lastProductRef?: (node: HTMLElement | null) => void
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  loading,
  lastProductRef,
}) => {
  return (
    <div className="my-8 max-w-[960px] mx-auto">
      {loading && products.length === 0 ? (
        <SkeletonTitle />
      ) : (
        <h2 className="text-xl font-bold mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading && products.length === 0
          ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          : products.map((product, index) => {
              if (lastProductRef && index === products.length - 1) {
                return <ProductCard key={product.id} product={product} ref={lastProductRef} />
              }
              return <ProductCard key={product.id} product={product} />
            })}
      </div>
    </div>
  )
}

export default memo(ProductSection)
