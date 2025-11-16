import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProductsList, PRODUCTS_LIMIT } from '../api/productsApi';

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
