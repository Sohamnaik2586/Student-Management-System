import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";

const API = axios.create({
  baseURL: apiBaseUrl
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
