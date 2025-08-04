import React, { forwardRef, useState } from 'react'
import type { Product } from '../../services/productStore'

interface ProductCardProps {
  product: Product
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(({ product }, ref) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div ref={ref} className="hover:shadow-md transition  cursor-pointer rounded-lg p-3 bg-white">
      <div className="w-full h-40 bg-[#f3f3f3] rounded-lg mb-4 relative overflow-hidden">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-300 rounded-lg" />}
        <img
          src={product.thumbnail}
          alt={product.title}
          onLoad={() => setLoaded(true)}
          className={`w-full h-40 object-contain rounded-lg transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      </div>
      <h3 className="font-medium text-[16px] leading-[24px] tracking-[0px] font-[Plus Jakarta Sans]">
        {product.title}
      </h3>
      <p className="font-normal text-[14px] leading-[21px] tracking-[0px] font-[Plus Jakarta Sans] text-[#964F52]">
        ${product.price}
      </p>
    </div>
  )
})

ProductCard.displayName = 'ProductCard'

export default React.memo(ProductCard)
