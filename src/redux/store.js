import { configureStore } from '@reduxjs/toolkit';
import buyerReducer from './slice/buyerSlice';
import sellerReducer from './slice/sellerSlice';
import locationReducer from './slice/locationSlice';
import productReducer from'./slice/productSlice';
 // ensure file exists and exports properly
export const store = configureStore({
  reducer: {
    buyer: buyerReducer, 
    seller: sellerReducer,
    location: locationReducer,
    product:productReducer,
  
  },
});
