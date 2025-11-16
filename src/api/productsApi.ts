import { getRequest } from './api';

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
}

export const PRODUCTS_LIMIT = 30;

export const fetchProductsList = async (skip: number, search: string, category: string) => {
  let apiUrl = `/products?limit=${PRODUCTS_LIMIT}&skip=${skip}`;
  if (search) apiUrl = `/products/search?q=${search}&limit=${PRODUCTS_LIMIT}&skip=${skip}`;
  if (category) apiUrl = `/products/category/${category}?limit=${PRODUCTS_LIMIT}&skip=${skip}`;

  return getRequest<ProductListResponse>(apiUrl);
};
