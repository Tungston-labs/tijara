import API from "./config";


export const addAddressService = async (token, payload) => {
  const response = await API.post("/addresses/add", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};



export const getAddressesService = async (token) => {
  const response = await API.get("/addresses/get", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const updateAddressService = async (token, addressId, payload) => {
  const response = await API.put(`/addresses/${addressId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};



export const deleteAddressService = async (token, addressId) => {
  const response = await API.delete(`/addresses/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
