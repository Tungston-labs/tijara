import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkStatus, Login, signUp } from "../../services/authServices";

export const SignUpThunk = createAsyncThunk(
  "user/signUp",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await signUp(formData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const checkStatusThunk = createAsyncThunk(
  "user/checkStatus",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await checkStatus(userId);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const userLoginThunk = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Login(credentials);
      console.log("Login response in thunk:", res);
      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Unknown error" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "user",
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
      
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SignUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(SignUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationStatus = action.payload.status;
      })
      .addCase(checkStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(userLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
