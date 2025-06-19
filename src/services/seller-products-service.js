import API from "./config";

export const getAllSellerProducts = async ({
  token,
  page = 1,
  limit = 10,
  search = "",
  category,
  status,
  sellerName,
}) => {
  try {
    const response = await API.get("/product/get-products", {
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
    console.log("hdbhdhdbdjs",response)
    return response.data;
  } catch (err) {
    console.error(
      "Error fetching products:",
      err?.response?.data || err.message
    );
    throw err;
  }
};

export const getAllBuyerProducts = async ({
  token,
  page = 1,
  limit = 10,
  search = "",
  category,
  status,
  sellerName,
}) => {
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
    console.error(
      "Error fetching products:",
      err?.response?.data || err.message
    );
    throw err;
  }
};

export const addSellerProduct = async ({ token, formData }) => {
  try {
    const response = await API.post("/product/add-product", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("wdwweerwerwerwer",response)
    return response.data;
  } catch (err) {
    console.error("Error adding product:", err?.response?.data || err.message);
    throw err;
  }
};
