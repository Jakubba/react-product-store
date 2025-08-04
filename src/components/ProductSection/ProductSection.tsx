// import React, { memo, useState } from 'react'
// import ProductCard from '../ProductCard/ProductCard'
// import SkeletonCard from '../SkeletonCard/SkeletonCard'
// import SkeletonTitle from '../SkeletonTitle/SkeletonTitle'
// import type { Product } from '../../services/productStore'
// import ShowMoreButton from '../ShowMoreButton/ShowMoreButton'

// interface ProductSectionProps {
//   title: string
//   products: Product[]
//   loading: boolean
//   showMore?: boolean
//   pageSize?: number
// }

// const ProductSection: React.FC<ProductSectionProps> = ({
//   title,
//   products,
//   loading,
//   showMore = false,
//   pageSize = 10,
// }) => {
//   const [visibleCount, setVisibleCount] = useState(pageSize)

//   const handleShowMore = () => {
//     setVisibleCount((prev) => prev + pageSize)
//   }

//   const visibleProducts = showMore ? products.slice(0, visibleCount) : products
//   const canShowMore = showMore && visibleCount < products.length

//   return (
//     <div className="my-8 max-w-[960px] mx-auto">
//       {loading && products.length === 0 ? (
//         <SkeletonTitle />
//       ) : (
//         <h2 className="text-xl font-bold mb-4">{title}</h2>
//       )}

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  md:gap-6">
//         {loading && products.length === 0
//           ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
//           : visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
//       </div>

//       {canShowMore && <ShowMoreButton onClick={handleShowMore} />}
//     </div>
//   )
// }

// export default memo(ProductSection)

import React, { memo, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import SkeletonCard from '../SkeletonCard/SkeletonCard'
import SkeletonTitle from '../SkeletonTitle/SkeletonTitle'
import type { Product } from '../../services/productStore'
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton'

interface ProductSectionProps {
  title: string
  products: Product[]
  loading: boolean
  showMore?: boolean
  pageSize?: number
  lastProductRef?: React.Ref<HTMLDivElement> // <--- DODANE
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  loading,
  showMore = false,
  pageSize = 10,
  lastProductRef,
}) => {
  const [visibleCount, setVisibleCount] = useState(pageSize)

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + pageSize)
  }

  const visibleProducts = showMore ? products.slice(0, visibleCount) : products
  const canShowMore = showMore && visibleCount < products.length

  return (
    <div className="my-8 max-w-[960px] mx-auto">
      {loading && products.length === 0 ? (
        <SkeletonTitle />
      ) : (
        <h2 className="text-xl font-bold mb-4">{title}</h2>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
        {loading && products.length === 0
          ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          : visibleProducts.map((product, index) => {
              const isLast = index === visibleProducts.length - 1
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  ref={isLast ? lastProductRef : undefined}
                />
              )
            })}
      </div>

      {canShowMore && <ShowMoreButton onClick={handleShowMore} />}
    </div>
  )
}

export default memo(ProductSection)
