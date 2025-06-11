import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  buyerSignUp,
  checkBuyerStatus,
  login,
} from "../../services/buyer-service";

export const buyerSignUpThunk = createAsyncThunk(
  "buyer/signUp",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await buyerSignUp(formData);
      return res.buyer;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const checkBuyerStatusThunk = createAsyncThunk(
  "buyer/checkStatus",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await checkBuyerStatus(userId);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "buyer/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await login(credentials);
      // Store token in AsyncStorage or secure storage
      // await AsyncStorage.setItem('token', res.accessToken);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const buyerSlice = createSlice({
  name: "buyer",
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
      state.role = null;
      state.verificationStatus = null;
      // Also clear token from storage
      // AsyncStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buyerSignUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyerSignUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.verificationStatus = action.payload.status;
      })
      .addCase(buyerSignUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkBuyerStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkBuyerStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationStatus = action.payload.status;
      })
      .addCase(checkBuyerStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          name: action.payload.name,
          _id: action.payload._id,
        };
        state.token = action.payload.accessToken;
        state.role = action.payload.role;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = buyerSlice.actions;
export default buyerSlice.reducer;
