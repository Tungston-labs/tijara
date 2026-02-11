import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import orderReducer from "./slice/orderSlice";
import sellerProductReducer from "./slice/sellerProductSlice";
import authReducer from "./slice/authSlice";
import searchReducer from "./slice/searchSlice";
import addressReducer from "./slice/addressSlice"
export const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
    sellerProduct: sellerProductReducer,
    user: authReducer,
    search: searchReducer,
    addresses:addressReducer,
  },
  devTools: __DEV__,
});
