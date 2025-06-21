import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addSellerProduct,
  getAllBuyerProducts,
  getAllSellerProducts,
} from "../../services/seller-products-service";
import { getProductById } from "../../services/product-services";
import API from "../../services/config";

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
export const getSellerProductByIdThunk = createAsyncThunk(
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

export const updateSellerProductThunk = createAsyncThunk(
  "sellerProducts/update",
  async ({ productId, formData, token }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/product/update/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Update error", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

// Initial State
const initialState = {
  sellerProducts: [],
  marketplaceProducts: [],
  selectedSellerProduct:null,
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
      .addCase(getSellerProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSellerProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSellerProduct = action.payload;
      })
      .addCase(getSellerProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product";
      })

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
      })
       .addCase(updateSellerProductThunk.pending, (state) => {
        state.adding = true;  // Optional: reuse this for update loading
        state.errorSeller = null;
      })
      .addCase(updateSellerProductThunk.fulfilled, (state, action) => {
        state.adding = false;

        // Optional: update the product in sellerProducts if needed
        const updatedProduct = action.payload.product || action.payload;
        const index = state.sellerProducts.findIndex(
          (p) => p._id === updatedProduct._id
        );
        if (index !== -1) {
          state.sellerProducts[index] = updatedProduct;
        }

        // Optional success flag
        state.addSuccess = true;
      })
      .addCase(updateSellerProductThunk.rejected, (state, action) => {
        state.adding = false;
        state.errorSeller = action.payload || "Failed to update product";
      });
  },
});

export const { clearSellerProductState } = sellerProductSlice.actions;
export default sellerProductSlice.reducer;
