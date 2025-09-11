import axios from "axios";

export const reverseGeocode = async (latitude, longitude) => {
  try {
    const apiKey = process.env.OPENCAGE_API_KEY; // same key as backend
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    const response = await axios.get(url);
    const result = response.data?.results?.[0];
    const components = result?.components || {};

    return (
      components.city ||
      components.town ||
      components.village ||
      components.suburb ||
      result?.formatted ||
      "Unknown Location"
    );
  } catch (err) {
    console.error("Frontend reverseGeocode error:", err);
    return "Unknown Location";
  }
};
