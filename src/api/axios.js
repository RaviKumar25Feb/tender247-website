import axios from "axios";

const api = axios.create({
  baseURL: "https://tender247-server.onrender.com/api",
  timeout: 15000,
});

export default api;
