import API from "./config";

export const fetchLocation = async (search = "") => {
  try {
    const response = await API.get(`/location/get-location?search=${search}`);
    return response;
  } catch (error) {
    throw error;
  }
};

