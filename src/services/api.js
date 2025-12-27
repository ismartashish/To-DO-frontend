// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://to-do-backend-3-jp8q.onrender.com/api",
  withCredentials: false,
});

export default api;
