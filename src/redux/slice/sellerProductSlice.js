import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addSellerProduct,
  getAllBuyerProducts,
  getAllSellerProducts,
} from "../../services/seller-products-service";


export const fetchSellerProductsThunk = createAsyncThunk(
  "products/fetchAll",
  async ({ token, filters }, { rejectWithValue }) => {
    try {
      const data = await getAllSellerProducts({ token, ...filters });
      console.log("API response:", data); 

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

// Slice
const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState: {
    sellerProducts: [],
    marketplaceProducts: [],
    loading: false,
    error: null,
    totalPages: 1,
    adding: false,
    addSuccess: false,
  },
  reducers: {
    clearSellerProductState: (state) => {
      state.sellerProducts = [];
      state.marketplaceProducts = [];
      state.error = null;
      state.adding = false;
      state.addSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Seller Products
      .addCase(fetchSellerProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerProducts = action.payload.products || [];
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchSellerProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch seller products";
      })

      // Marketplace Products
      .addCase(fetchBuyerProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.marketplaceProducts = action.payload.data || [];
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchBuyerProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch marketplace products";
      })

      // Add Seller Product
      .addCase(addSellerProductThunk.pending, (state) => {
        state.adding = true;
        state.addSuccess = false;
        state.error = null;
      })
      .addCase(addSellerProductThunk.fulfilled, (state, action) => {
        state.adding = false;
        state.addSuccess = true;
        state.sellerProducts=action.payload.token
      })
      .addCase(addSellerProductThunk.rejected, (state, action) => {
        state.adding = false;
        state.error = action.payload || "Failed to add product";
      });
  },
});

export const { clearSellerProductState } = sellerProductSlice.actions;

export default sellerProductSlice.reducer;
