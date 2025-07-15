import API from "./config";

export const registerUser = async (formData) => {
  try {
    const response = await API.post("/user/user-sign-up", formData, {
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
// export const buyerSignUp = async (formData) => {
//   try {
//     const response = await API.post("/buyer/buyer-sign-up", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     console.log("buyer ire  nsssnsn",response)
//     return response.data;
    
//   } catch (err) {
//     console.error(
//       "Error response:",
//       err?.response?.data || err?.message || "Unknown error"
//     );
//     throw err;
//   }
// };

export const checkStatus = async (userId) => {
  try {
    const response = await API.post("/user/check-status", { id: userId });
    console.log("gdyeijkeloeolopr",response)
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

export const uploadTradeLicense = async (formData) => {
  const res = await API.put("/user/add-trade-license", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const getTradeLicenseStatus = async () => {
  try {
    const res = await API.get(`/user/check-trade-license`);
    return res.data;
  } catch (err) {
    console.error("Error fetching trade license status:", err?.response?.data || err.message);
    throw err.response?.data || err;
  }
};
