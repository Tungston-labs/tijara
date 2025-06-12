import API from "./config";



export const sellerSignUp = async (formData) => {
  try {
    const response = await API.post("/seller/seller-register", formData);
    return response.data;
  } catch (err) {
    console.error("Error response:", err?.response?.data || err.message);
    throw err;
  }
};

export const checkSellerStatus = async (userId) => {
  try {
    const response = await API.post("/user/check-status", { id: userId });
    return response.data;
  } catch (err) {
    console.error("Error checking status:", err?.response?.data || err.message);
    throw err;
  }
};

export const login = async (credentials) => {
  try {
    const response = await API.post("/seller/seller-login", credentials);
    return response.data;
  } catch (err) {
    console.error("Error logging in:", err?.response?.data || err.message);
    throw err;
  }
};