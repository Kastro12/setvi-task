import { useQuery } from '@tanstack/react-query';
import { fetchProductsList } from '../api/productsApi';

export const useProductsList = () => {
  return useQuery({
    queryKey: ['productsList'],
    queryFn: fetchProductsList,
    staleTime: 1000 * 60 * 2,
  });
};
