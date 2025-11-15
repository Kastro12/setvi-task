import { useProductsList } from '../../hooks/products';
import Table from '../../components/table/Table';
import type { TableColumn } from '../../components/table/types';
import { Box, CircularProgress } from '@mui/material';

const columns: TableColumn[] = [
  { key: 'id', fieldType: 'paragraph', label: 'ID', width: '10%' },
  { key: 'thumbnail', fieldType: 'image', label: 'Thumbnail', width: '15%' },
  { key: 'title', fieldType: 'paragraph', label: 'Title', width: '35%' },
  { key: 'category', fieldType: 'paragraph', label: 'Category', width: '20%' },
  { key: 'price', fieldType: 'paragraph', label: 'Price', width: '10%' },
  { key: 'rating', fieldType: 'paragraph', label: 'Rating', width: '10%' },
];

const ProductsListPage = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductsList();

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  if (isLoading)
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '180px' }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  if (error) return <p>Error loading products.</p>;

  return (
    <>
      <h1>ProductsListPage</h1>

      <Table
        columns={columns}
        data={products}
        isLoading={isLoading || isFetchingNextPage}
        hasNextPage={!!hasNextPage}
        onLoadMore={fetchNextPage}
        rowHeight={50}
        overscanCount={5}
        style={{ height: '500px', width: '100%' }}
      />
    </>
  );
};

export default ProductsListPage;
