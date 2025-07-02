// api.js
import axios from "axios";
import { loadAuthData, saveAuthData, clearAuthData } from "../utils/mmkvStorage";
import { store } from "../redux/store";
import { logout } from "../redux/slice/authSlice";

// 🔥 Token in memory
let accessToken = null;

// 🔑 Set token in memory
export const setToken = (token) => {
  accessToken = token;
};

// 🔍 Get token
export const getToken = () => {
  return accessToken;
};

// 🔗 Axios instance
const API = axios.create({
  withCredentials: true, // For sending cookies (refresh token)
  baseURL: "http://178.248.112.16:8080", // Update to server IP if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Request Interceptor — Attach access token
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔄 Response Interceptor — Handle token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🛑 If 403 Forbidden (token expired) & not retried yet
    if (
      error.response?.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return API(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        const res = await axios.get(
          "http://178.248.112.16:8080/user/refresh",
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        // ✅ Update token in memory
        setToken(newAccessToken);

        // ✅ Update MMKV Storage
        const { user, role } = loadAuthData();
        saveAuthData(newAccessToken, user, role);

        processQueue(null, newAccessToken);

        // ✅ Retry the failed request
        originalRequest.headers.Authorization = "Bearer " + newAccessToken;
        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // 🔥 If refresh token fails — force logout
        clearAuthData();
        store.dispatch(logout());

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;
