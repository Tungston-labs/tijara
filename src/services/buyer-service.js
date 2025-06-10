import API from "./config";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDI4OGEzZmM5Y2Y2YTUxNGEwNWJhZCIsImVtYWlsIjoic29vcnlhQGdtYWlsLmNvbSIsInJvbGUiOiJidXllciIsImlhdCI6MTc0OTIwMjU5MCwiZXhwIjoxNzQ5MjA2MTkwfQ.lM4CK8tD09nMY0Yl98U9benKOgU0k-QH5O_PXTOup6Y";
export const buyerSignUp = async (formData) => {
  try {
    const response = await API.post("/buyer/buyer-sign-up", formData, {
      headers: {
        Authorization: `Bearer ${token}`, // <-- Attach token here
      },
    });
    console.log("Raw response", response);
  } catch (err) {
    console.error("Error response:", err?.response?.data || err.message);
    throw err;
  }
};
