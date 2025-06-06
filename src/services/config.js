// api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  withCredentials: true,
  baseURL: "http://178.248.112.16:8080", 
  headers: {
    "Content-Type": "application/json",
  },
});


API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
