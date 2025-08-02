import React, { useEffect, useState } from 'react';
import { fetchAllProducts, searchProducts } from '../services/api';
import Header from './../components/Header';
import ProductSection from './../components/ProductSection';
import type { Product } from '../types';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    fetchAllProducts().then(setProducts);
  }, []);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.trim() === '') {
      fetchAllProducts().then(setProducts);
    } else {
      const result = await searchProducts(value);
      setProducts(result);
    }
  };

  const featured = products.slice(0, 6);
  const newArrivals = products.slice(6);

  return (
    <>
      <Header onSearch={handleSearch} />
      <ProductSection title='Featured Products' products={featured} />
      <ProductSection title='New Arrivals' products={newArrivals} />
    </>
  );
};

export default Home;
