import axios from "axios";

const API = axios.create({
  baseURL: "https://to-do-backend-5-rxi2.onrender.com/api",
});

// Automatically attach token
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
