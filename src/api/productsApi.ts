import { getRequest } from './api';
import type { ProductListResponse, ProductProps } from '../types/products';

export const PRODUCTS_LIMIT = 30;

export const fetchProductsList = async (skip: number, search: string, category: string) => {
  let apiUrl = `/products?limit=${PRODUCTS_LIMIT}&skip=${skip}`;
  if (search) apiUrl = `/products/search?q=${search}&limit=${PRODUCTS_LIMIT}&skip=${skip}`;
  if (category) apiUrl = `/products/category/${category}?limit=${PRODUCTS_LIMIT}&skip=${skip}`;

  return getRequest<ProductListResponse>(apiUrl);
};

export const fetchProduct = async (id: number | undefined) => {
  return getRequest<ProductProps>(`/products/${id}`);
};
