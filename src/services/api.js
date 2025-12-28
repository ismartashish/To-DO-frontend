// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://to-do-backend-5-rxi2.onrender.com/api",
  withCredentials: false,
});

export default api;
