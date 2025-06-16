import API from "./config";

export const addProduct = async (data, token) => {
  try {
    const response = await API.post("/product/add-product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // in case you upload images
      },
    });
    return response.data;
  } catch (err) {
    console.error("Add product error:", err?.response?.data || err.message);
    throw err;
  }
};

export const getAllProducts = async ({ token, page = 1, limit = 10, search = "", category, status, sellerName }) => {
  try {
    const response = await API.get("/product/get-products-buyer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
        search,
        category,
        status,
        sellerName,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching products:", err?.response?.data || err.message);
    throw err;
  }
};
// Add more product-related functions as needed
