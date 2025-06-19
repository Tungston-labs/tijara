import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slice/locationSlice";
import productReducer from "./slice/productSlice";
import orderReducer from "./slice/orderSlice";
import sellerProductReducer from "./slice/sellerProductSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    product: productReducer,
    order: orderReducer,
    sellerProduct: sellerProductReducer,
    user: authReducer,
  },
  devTools: __DEV__,
});
