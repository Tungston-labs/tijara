import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sellerSignUp } from '../../services/seller-services';

export const sellerSignUpThunk = createAsyncThunk(
  'seller/signUp',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await sellerSignUp(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sellerSignUpThunk.pending, state => {
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
      });
  },
});

export default sellerSlice.reducer;
