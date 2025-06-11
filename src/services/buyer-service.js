import API from "./config";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDI4OGEzZmM5Y2Y2YTUxNGEwNWJhZCIsImVtYWlsIjoic29vcnlhQGdtYWlsLmNvbSIsInJvbGUiOiJidXllciIsImlhdCI6MTc0OTIwMjU5MCwiZXhwIjoxNzQ5MjA2MTkwfQ.lM4CK8tD09nMY0Yl98U9benKOgU0k-QH5O_PXTOup6Y";
export const buyerSignUp = async (formData) => {
  try {
    const response = await API.post("/buyer/buyer-sign-up", formData);
    return response.data;
  } catch (err) {
    console.error("Error response:", err?.response?.data || err.message);
    throw err;
  }
};

export const checkBuyerStatus = async (userId) => {
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
    const response = await API.post("/buyer/buyer-login", credentials);
    return response.data;
  } catch (err) {
    console.error("Error logging in:", err?.response?.data || err.message);
    throw err;
  }
};
