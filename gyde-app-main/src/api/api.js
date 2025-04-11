import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Ensure this matches your backend URL
  withCredentials: true, // Enables cookies if using JWT authentication
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
