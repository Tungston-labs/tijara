// api.js
import axios from "axios";
import { loadAuthData, saveAuthData, clearAuthData } from "../utils/mmkvStorage";
import { store } from "../redux/store";
import { logout } from "../redux/slice/authSlice";

let accessToken = null;

export const setToken = (token) => {
  accessToken = token;
};

export const getToken = () => {
  return accessToken;
};

const API = axios.create({
  withCredentials: true, 
  baseURL: "http://178.248.112.16:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

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
          "http://178.248.112.16:8080/user/refresh-token",
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        setToken(newAccessToken);

        const { user, role } = loadAuthData();
        saveAuthData(newAccessToken, user, role);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = "Bearer " + newAccessToken;
        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);

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