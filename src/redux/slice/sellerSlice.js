import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkSellerStatus,
  login,
  sellerSignUp,  
} from "../../services/seller-services";

export const sellerSignUpThunk = createAsyncThunk(
  "seller/signUp",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await sellerSignUp(formData);
      return res.seller;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const checkSellerStatusThunk = createAsyncThunk(
  "seller/checkStatus",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await checkSellerStatus(userId);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const sellerLoginThunk = createAsyncThunk(
  "seller/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await login(credentials);
      return res;
    } catch (err) {
      return rejectWithValue(err?.response.data || err.message);
    }
  }
);
const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    user: null,
    loading: false,
    error: null,
    verificationStatus: null,
    token: null,
    role: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      (state.role = null), (state.verificationStatus = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sellerSignUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sellerSignUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(sellerSignUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkSellerStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkSellerStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkSellerStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationStatus = action.payload.status;
      })
      .addCase(sellerLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sellerLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sellerLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          name: action.payload.name,
          _id: action.payload._id,
        };
        state.token = action.payload.accessToken;
        state.role = action.payload.role;
      });
  },
});
export const{logout}=sellerSlice.actions
export default sellerSlice.reducer;
