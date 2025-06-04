// import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "./config";

// API.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const buyerSignUp = async (formData) => {
  const response = await API.post("/buyer/buyer-sign-up", formData);
  return response.data; 
};

