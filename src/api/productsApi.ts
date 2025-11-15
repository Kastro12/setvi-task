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

export const fetchProductsList = async (skip: number) => {
  return getRequest<ProductListResponse>(`/products?limit=${PRODUCTS_LIMIT}&skip=${skip}`);
};
