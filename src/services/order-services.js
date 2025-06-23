import API from "./config";

export const createOrderRequestService = async (token, payload) => {
  const response = await API.post("/orders/request-order", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
