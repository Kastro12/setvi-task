import { getRequest } from './api';
import type { CategoryListResponse } from '../types/categories';

export const fetchCategoriesList = async () => {
  return getRequest<CategoryListResponse[]>(`/products/categories`);
};
