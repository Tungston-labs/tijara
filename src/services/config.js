import axios from "axios";
const API = axios.create({
  withCredentials: true,
  baseURL: "http://178.248.112.16:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
export default API;