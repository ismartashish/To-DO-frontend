// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://portfoliobackend-psah.onrender.com/api",
  withCredentials: false,
};

export default api;
