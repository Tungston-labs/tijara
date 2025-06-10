import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLocation } from "../../services/location-service";

export const fetchLocationThunk = createAsyncThunk(
  "location/fetch",
  async (search = "", { rejectWithValue }) => {
    try {
      const res = await fetchLocation(search);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);
const locationSlice = createSlice({
  name: "location",
  initialState: {
    locations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;
