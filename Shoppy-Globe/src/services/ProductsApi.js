const API_BASE = (import.meta.env.VITE_PRODUCTS_API || 'https://dummyjson.com/products').replace(/\/$/, '');

export async function fetchProducts(signal) {
  const url = API_BASE.includes('?') ? `${API_BASE}&limit=100` : `${API_BASE}?limit=100`;
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Products could not be loaded (HTTP ${response.status}).`);
  const payload = await response.json();
  return Array.isArray(payload) ? payload : payload.products || [];
}

export async function fetchProductById(id, signal) {
  // Derive the detail endpoint from the collection endpoint.
  const collectionUrl = new URL(API_BASE, window.location.origin);
  const detailUrl = `${collectionUrl.origin}${collectionUrl.pathname.replace(/\/$/, '')}/${encodeURIComponent(id)}`;
  const response = await fetch(detailUrl, { signal });
  if (!response.ok) throw new Error(response.status === 404 ? 'We could not find that product.' : `Product details failed to load (HTTP ${response.status}).`);
  return response.json();
}