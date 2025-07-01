import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../../services/product-services";

// Async thunk
export const addProductThunk = createAsyncThunk(
  "product/addProduct",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const res = await addProduct(formData, token);
      return res.product;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchProductsThunk = createAsyncThunk(
  "products/fetchAll",
  async ({ token, filters = {}, page = 1 }, { rejectWithValue }) => {
    try {
      const data = await getAllProducts({ token, ...filters, page }); // pass `page`
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

export const getProductByIdThunk = createAsyncThunk(
  "product/getById",
  async ({ token, productId }, { rejectWithValue }) => {
    try {
      const data = await getProductById({ token, productId });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "product/deleteProduct",
  async ({ productId, token }, { rejectWithValue }) => {
    try {
      const res = await deleteProduct({ productId, token });
      return { productId, message: res.message };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
    successMessage: null,
    page: 1,
    totalPages: 1,
    total: 0,
  },
  reducers: {
    clearProductMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    resetProducts: (state) => {
      state.products = [];
      state.page = 1;
      state.totalPages = 1;
      state.total = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.successMessage = "Product added successfully!";
      })
      .addCase(addProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { products, total, totalPages, page } = action.payload;

        if (page === 1) {
          state.products = products;
        } else {
          // append new products to existing list
          state.products = [...state.products, ...products];
        }

        state.total = total;
        state.totalPages = totalPages;
        state.page = page;
      })

      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })
      .addCase(getProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product";
      })
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;

        // Remove deleted product from list
        state.products = state.products.filter(
          (product) => product._id !== action.payload.productId
        );
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete product";
      });
  },
});

export const { clearProductMessages, resetProducts } = productSlice.actions;
export default productSlice.reducer;
