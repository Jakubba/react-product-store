import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className='hover:shadow-md transition max-w-[176px] cursor-pointer'>
      <img
        src={product.thumbnail}
        alt={product.title}
        className='w-full h-40 object-contain rounded mb-2 rounded-lg mb-4 bg-[#f3f3f3]'
      />
      <h3 className='font-medium text-[16px] leading-[24px] tracking-[0px] font-[Plus Jakarta Sans]'>
        {product.title}
      </h3>
      <p className='font-normal text-[14px] leading-[21px] tracking-[0px] font-[Plus Jakarta Sans] text-[#964F52]'>
        ${product.price}
      </p>
    </div>
  );
};

export default ProductCard;
