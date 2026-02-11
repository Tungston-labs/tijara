import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addAddressService,
  getAddressesService,
  updateAddressService,
  deleteAddressService,
} from "../../services/addressService";


export const getAddressesThunk = createAsyncThunk(
  "address/getAll",
  async (token, { rejectWithValue }) => {
    try {
      return await getAddressesService(token);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ADD
export const addAddressThunk = createAsyncThunk(
  "address/add",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      return await addAddressService(token, payload);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// UPDATE
export const updateAddressThunk = createAsyncThunk(
  "address/update",
  async ({ token, addressId, payload }, { rejectWithValue }) => {
    try {
      return await updateAddressService(token, addressId, payload);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// DELETE
export const deleteAddressThunk = createAsyncThunk(
  "address/delete",
  async ({ token, addressId }, { rejectWithValue }) => {
    try {
      return await deleteAddressService(token, addressId);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* =============================
   SLICE
============================= */

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getAddressesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAddressesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.data;
      })
      .addCase(getAddressesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addAddressThunk.fulfilled, (state, action) => {
        state.addresses.unshift(action.payload.data);
      })

      // UPDATE
      .addCase(updateAddressThunk.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(
          (addr) => addr._id === action.payload.data._id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload.data;
        }
      })

      // DELETE
      .addCase(deleteAddressThunk.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (addr) => addr._id !== action.meta.arg.addressId
        );
      });
  },
});

export default addressSlice.reducer;
