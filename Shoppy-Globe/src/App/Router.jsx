import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from './App';
import LoadingScreen from '../Components/Common/LoadingScreen';

const HomePage = lazy(() => import('../Pages/HomePage'));
const ProductDetailPage = lazy(
  () => import('../Pages/ProductDetails')
);
const CartPage = lazy(() => import('../Pages/CartPage'));
const CheckoutPage = lazy(
  () => import('../Pages/CheckoutPage')
);
const NotFoundPage = lazy(
  () => import('../Pages/NotFoundPage')
);

function LazyPage({ children }) {
  return (
    <Suspense
      fallback={<LoadingScreen label="Preparing your space…" />}
    >
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <LazyPage>
            <HomePage />
          </LazyPage>
        ),
      },
      {
        path: 'product/:id',
        element: (
          <LazyPage>
            <ProductDetailPage />
          </LazyPage>
        ),
      },
      {
        path: 'cart',
        element: (
          <LazyPage>
            <CartPage />
          </LazyPage>
        ),
      },
      {
        path: 'checkout',
        element: (
          <LazyPage>
            <CheckoutPage />
          </LazyPage>
        ),
      },
      {
        path: '*',
        element: (
          <LazyPage>
            <NotFoundPage />
          </LazyPage>
        ),
      },
    ],
  },
]);
