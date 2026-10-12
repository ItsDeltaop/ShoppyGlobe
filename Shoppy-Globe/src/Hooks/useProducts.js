import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productsApi';

// Reusable data hook: owns request lifecycle and cleans up on unmount.
export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchProducts(controller.signal);
        setProducts(data);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Something went wrong while loading products.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, []);

  return { products, loading, error };
}
