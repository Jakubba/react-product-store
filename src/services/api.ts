// const API_BASE = 'https://dummyjson.com/products';

// export const fetchAllProducts = async () => {
//   const res = await fetch(`${API_BASE}?limit=30`);
//   const data = await res.json();
//   return data.products;
// };

// export const searchProducts = async (query) => {
//   const res = await fetch(`${API_BASE}/search?q=${query}`);
//   const data = await res.json();
//   return data.products;
// };

import type { Product } from '../types';

const API_BASE = 'https://dummyjson.com/products';

export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_BASE}?limit=30`);
  const data = await res.json();
  return data.products;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const res = await fetch(`${API_BASE}/search?q=${query}`);
  const data = await res.json();
  return data.products;
};
