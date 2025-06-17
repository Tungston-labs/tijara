// src/redux/slice/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderRequestService } from "../../services/order-services";

export const createOrderThunk = createAsyncThunk(
  "order/create",
  async ({ token, productId, quantity }, thunkAPI) => {
    try {
      const data = await createOrderRequestService(token, { productId, quantity });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    order: null,
    error: null,
  },
  reducers: {
    clearOrderState: (state) => {
      state.loading = false;
      state.order = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to place order";
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
