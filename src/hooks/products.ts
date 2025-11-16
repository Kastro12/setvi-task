import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchProductsList, PRODUCTS_LIMIT, fetchProduct } from '../api/productsApi';

export const useProductsList = ({ search, category }: { search: string; category: string }) => {
  return useInfiniteQuery({
    queryKey: ['productsList', search, category],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchProductsList(pageParam, search, category);
      return res;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + PRODUCTS_LIMIT;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },

    staleTime: 1000 * 60 * 2,
  });
};

export const useProduct = ({ id }: { id: number | undefined }) => {
  return useQuery({
    queryKey: ['productItem', id],
    queryFn: async () => {
      const res = await fetchProduct(id);
      return res;
    },
    staleTime: 5 * 60 * 1000,
    enabled: id ? true : false,
  });
};
