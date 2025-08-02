import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types';

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <div className='my-8 max-w-[960px] mx-auto'>
      <h2 className='font-bold text-[22px] leading-[28px] tracking-[0px] font-[Plus Jakarta Sans] pt-[20px] pr-4 pb-[12px] pl-4'>
        {title}
      </h2>
      <div className='flex flex-wrap gap-4 p-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
