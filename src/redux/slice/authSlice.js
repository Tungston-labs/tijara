import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  buyerSignUp,
  checkStatus,
  Login,
  sellerSignUp,
} from "../../services/authServices";
import { saveAuthData, clearAuthData } from "../../utils/mmkvStorage";
import { setToken } from "../../services/config";
export const SignUpThunk = createAsyncThunk(
  "user/signUp",
  async ({ formData, role }, { rejectWithValue }) => {
    try {
      let res;
      if (role === "seller") {
        res = await sellerSignUp(formData);
      } else {
        res = await buyerSignUp(formData);
      }
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
      console.log("DISPATCHED checkStatusThunk WITH ID:", userId);
      const res = await checkStatus(userId);
      console.log("DISPATCHED checkStatusThunk WITH ID:", userId);
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
      clearAuthData();
      setToken(null);
    //  mmkvStorage.clearAll();

      state.verificationStatus = null;
    },
    loginFromStorage: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.role = action.payload.role;
      setToken(action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(SignUpThunk.fulfilled, (state, action) => {
      //   state.loading = false;

      //   const userPayload = action.payload.buyer || action.payload.seller;

      //   if (userPayload) {
      //     state.user = {
      //       _id: userPayload._id,
      //       name: userPayload.name,
      //       email: userPayload.email,
      //       role: userPayload.role,
      //     };
      //     state.token = action.payload.accessToken || null;
      //     state.role = userPayload.role || null;
      //   } else {
      //     console.warn("SignUpThunk fulfilled but user payload is missing.");
      //   }
      // })
      .addCase(SignUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;

        if (payload && payload._id) {
          state.user = {
            _id: payload._id,
            name: payload.name,
            email: payload.email,
            role: payload.role,
          };
          state.token = payload.accessToken || null;
          state.role = payload.role || null;
          saveAuthData(action.payload.accessToken, state.user, state.role);
          setToken(action.payload.accessToken);
        }
      })
      .addCase(checkStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationStatus = action.payload.status;
        state.user = {
          ...state.user,
          _id: action.payload.id,
          email: action.payload.email,
          role: action.payload.role,
        };
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
          profileImage: action.payload.image,
        };
        state.token = action.payload.accessToken;
        state.role = action.payload.role;
        saveAuthData(action.payload.accessToken, state.user, state.role);
        setToken(action.payload.accessToken);
      });
  },
});

export const { logout,loginFromStorage } = authSlice.actions;
export default authSlice.reducer;
