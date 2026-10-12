import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...product, quantity: 1 });
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((entry) => entry.id === id);
      if (item) item.quantity = Math.max(1, Math.floor(Number(quantity) || 1));
    },
    clearCart(state) { state.items = []; },
  },
});

export const { addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export default cartSlice.reducer;
