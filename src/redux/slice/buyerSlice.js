import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { buyerSignUp } from "../../services/buyer-service";

export const buyerSignUpThunk = createAsyncThunk(
  "buyer/signUp",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await buyerSignUp(formData);
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(buyerSignUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyerSignUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(buyerSignUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default buyerSlice.reducer;
