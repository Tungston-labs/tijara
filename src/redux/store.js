import { configureStore } from '@reduxjs/toolkit';
import buyerReducer from './slice/buyerSlice';
import sellerReducer from './slice/sellerSlice'
export const store = configureStore({
  reducer: {
    buyer: buyerReducer, 
    seller:sellerReducer
  },
});
