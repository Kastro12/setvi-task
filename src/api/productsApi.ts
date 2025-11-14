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
}

export const fetchProductsList = () => {
  return getRequest<ProductListResponse>('/products');
};
