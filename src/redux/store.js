import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import orderReducer from "./slice/orderSlice";
import sellerProductReducer from "./slice/sellerProductSlice";
import authReducer from "./slice/authSlice";
import searchReducer from "./slice/searchSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
    sellerProduct: sellerProductReducer,
    user: authReducer,
    search: searchReducer,
  },
  devTools: __DEV__,
});
