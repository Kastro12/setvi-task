import { SelectField } from '../../../components/formFields';
import { Box } from '@mui/material';
import { useCategoriesList } from '../../../hooks/categories';
import { useSearchParams } from 'react-router-dom';
import type { SelectChangeEvent } from '@mui/material';

const CategoriesField = () => {
  const { data, isLoading, error } = useCategoriesList({
    enabled: true,
  });

  const [params, setParams] = useSearchParams();
  const urlSearch = params.get('category') ?? '';

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;

    setParams({ category: value });
  };

  const handleClear = () => {
    setParams();
  };

  return (
    <Box sx={{ marginBottom: '20px' }}>
      <SelectField
        error={error}
        isLoading={isLoading}
        data={data}
        selectedValue={urlSearch}
        handleChange={handleChange}
        handleClear={handleClear}
        label={'Filter by category'}
      />
    </Box>
  );
};

export default CategoriesField;
