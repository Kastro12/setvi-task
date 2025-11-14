import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();

  return (
    <>
      <h1>ProductPage</h1> <p>Product ID: {id}</p>
    </>
  );
};

export default ProductPage;
