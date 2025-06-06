import API from "./config";



export const sellerSignUp = async (formData) => {
  const response = await API.post("/seller/seller-register", formData);
  return response.data; 
};