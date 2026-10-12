import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../Features/Cart/cartSlice';
import searchReducer from '../Features/Search/searchSlice';

export const store = configureStore({
  reducer: { cart: cartReducer, search: searchReducer },
});