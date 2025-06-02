import API from "./config";

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const sellerSignUp = async (payload) => {
  const response = await API.post("/seller/seller-register", payload);
  return response.data; 
};