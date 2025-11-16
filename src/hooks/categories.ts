import { useQuery } from '@tanstack/react-query';
import { fetchCategoriesList } from '../api/categoriesApi';

export const useCategoriesList = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['categoriesList'],
    queryFn: fetchCategoriesList,
    staleTime: 5 * 60 * 1000,
    enabled,
  });
};
