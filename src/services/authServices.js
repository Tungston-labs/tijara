import API from "./config";

export const sellerSignUp = async (formData) => {
  try {
    const response = await API.post("/seller/seller-register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error(
      "Error response:",
      err?.response?.data || err?.message || "Unknown error"
    );
    throw err;
  }
};
export const buyerSignUp = async (formData) => {
  try {
    const response = await API.post("/buyer/buyer-sign-up", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error(
      "Error response:",
      err?.response?.data || err?.message || "Unknown error"
    );
    throw err;
  }
};

export const checkStatus = async (userId) => {
  try {
    const response = await API.post("/user/check-status", { id: userId });
    return response.data;
  } catch (err) {
    console.error("Error checking status:", err?.response?.data || err.message);
    throw err;
  }
};

export const Login = async (credentials) => {
  try {
    const response = await API.post("/user/login", credentials);
    console.log("response",response);
    return response.data;
    
  } catch (err) {
    console.error("Error logging in:", err?.response?.data || err.message);
    throw err;
  }
};

