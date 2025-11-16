import { useProductsList } from '../../hooks/products';
import Table from '../../components/table/Table';
import type { TableColumn } from '../../components/table/types';
import { SearchBar } from '../../components/formFields';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import CategoriesField from './components/CategoriesField';

const columns: TableColumn[] = [
  { key: 'id', fieldType: 'paragraph', label: 'ID', width: '10%' },
  { key: 'thumbnail', fieldType: 'image', label: 'Thumbnail', width: '15%' },
  { key: 'title', fieldType: 'paragraph', label: 'Title', width: '35%' },
  { key: 'category', fieldType: 'paragraph', label: 'Category', width: '20%' },
  { key: 'price', fieldType: 'paragraph', label: 'Price', width: '10%' },
  { key: 'rating', fieldType: 'paragraph', label: 'Rating', width: '10%' },
];

const ProductsListPage = () => {
  const [params, setParams] = useSearchParams();
  const urlSearch = params.get('search') ?? '';
  const urlCategory = params.get('category') ?? '';

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductsList({ search: urlSearch, category: urlCategory });

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <>
      <Typography variant='h1' sx={{ fontSize: '25px', textAlign: 'center', margin: '24px 0' }}>
        ProductsListPage
      </Typography>

      {error ? (
        <Alert severity='error'>{error?.message ?? 'Something went wrong. Try again later.'}</Alert>
      ) : (
        <>
          {' '}
          <Box sx={{ marginBottom: '20px' }}>
            <SearchBar
              setParams={setParams}
              placeholder={'Search products ...'}
              initialValue={urlSearch}
            />
          </Box>
          <CategoriesField />
          <Table
            columns={columns}
            data={products}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={!!hasNextPage}
            onLoadMore={fetchNextPage}
            rowHeight={50}
            overscanCount={5}
            style={{ maxHeight: '500px', width: '100%' }}
          />
        </>
      )}
    </>
  );
};

export default ProductsListPage;
