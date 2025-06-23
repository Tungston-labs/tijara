// api.js
import axios from "axios";

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

API.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default API;
