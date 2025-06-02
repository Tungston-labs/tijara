import { configureStore } from '@reduxjs/toolkit';
import buyerReducer from './slices/buyerSlice'; 
import sellerReducer from "./slice/sellerSlice.js"
export const store = configureStore({
  reducer: {
    buyer: buyerReducer, 
    seller:sellerReducer
  },
});
