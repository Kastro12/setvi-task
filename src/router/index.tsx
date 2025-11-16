import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import { ProductsListPage } from '../pages/products/index.ts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductsListPage />,
      },
    ],
  },
]);
