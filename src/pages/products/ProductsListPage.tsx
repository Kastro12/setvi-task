import { useProductsList } from '../../hooks/products';

const ProductsListPage = () => {
  const { data, isLoading, error } = useProductsList();

  console.log('data', data);
  console.log('isLoading', isLoading);
  console.log('error', error);

  return (
    <>
      <h1>ProductsListPage</h1>
    </>
  );
};

export default ProductsListPage;
