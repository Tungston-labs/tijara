import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addSellerProduct,
  getAllBuyerProducts,
  getAllSellerProducts,
} from "../../services/seller-products-service";

// Thunks
export const fetchSellerProductsThunk = createAsyncThunk(
  "sellerProduct/fetchSellerProducts",
  async ({ token, filters }, { rejectWithValue }) => {
    try {
      const data = await getAllSellerProducts({ token, ...filters });
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

export const fetchBuyerProductsThunk = createAsyncThunk(
  "sellerProduct/fetchMarketplaceProducts",
  async ({ token, ...params }, thunkAPI) => {
    try {
      return await getAllBuyerProducts({ token, ...params });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addSellerProductThunk = createAsyncThunk(
  "sellerProduct/addSellerProduct",
  async ({ token, formData }, thunkAPI) => {
    try {
      return await addSellerProduct({ token, formData });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial State
const initialState = {
  sellerProducts: [],
  marketplaceProducts: [],
  loadingSeller: false,
  loadingMarketplace: false,
  errorSeller: null,
  errorMarketplace: null,
  totalPages: 1,
  adding: false,
  addSuccess: false,
};

// Slice
const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {
    clearSellerProductState: (state) => {
      state.sellerProducts = [];
      state.marketplaceProducts = [];
      state.errorSeller = null;
      state.errorMarketplace = null;
      state.adding = false;
      state.addSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Seller Products
      .addCase(fetchSellerProductsThunk.pending, (state) => {
        state.loadingSeller = true;
        state.errorSeller = null;
      })
      .addCase(fetchSellerProductsThunk.fulfilled, (state, action) => {
        state.loadingSeller = false;
        state.sellerProducts = action.payload.products || [];
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchSellerProductsThunk.rejected, (state, action) => {
        state.loadingSeller = false;
        state.errorSeller = action.payload || "Failed to fetch seller products";
      })

      // Fetch Marketplace Products
      .addCase(fetchBuyerProductsThunk.pending, (state) => {
        state.loadingMarketplace = true;
        state.errorMarketplace = null;
      })
      .addCase(fetchBuyerProductsThunk.fulfilled, (state, action) => {
        state.loadingMarketplace = false;
        state.marketplaceProducts = action.payload.data || [];
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchBuyerProductsThunk.rejected, (state, action) => {
        state.loadingMarketplace = false;
        state.errorMarketplace =
          action.payload || "Failed to fetch marketplace products";
      })

      // Add Seller Product
      .addCase(addSellerProductThunk.pending, (state) => {
        state.adding = true;
        state.addSuccess = false;
        state.errorSeller = null;
      })
      .addCase(addSellerProductThunk.fulfilled, (state, action) => {
        state.adding = false;
        state.addSuccess = true;
        state.sellerProducts.push(action.payload.product); // if response has single product
      })
      .addCase(addSellerProductThunk.rejected, (state, action) => {
        state.adding = false;
        state.errorSeller = action.payload || "Failed to add product";
      });
  },
});

export const { clearSellerProductState } = sellerProductSlice.actions;
export default sellerProductSlice.reducer;
