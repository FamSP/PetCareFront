import axios from "axios";
import TokenService from "./token.service";
// import dotenv from "dotenv";
// dotenv.config();
const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  const token = TokenService.getAccessToken();
  if (token) {
    config.headers["x-access-token"] = token;
  }
  
  // Only set Content-Type for non-FormData requests
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }
  
  return config;
});
export default instance;
