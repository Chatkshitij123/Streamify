import axios from "axios";
// import { BASE_URL } from "../utils/contants.js";

const isProd = import.meta.env.MODE === "production";

const BASE_URL = isProd ? "/" : import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10200,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
     withCredentials: true 
});

//Request interceptor
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const accessToken = localStorage.getItem("token");
//             if (accessToken) {
//                 config.headers.Authorization = `Bearer ${accessToken}`;
//             }
//             return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

//Response interceptor

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized – Token may be expired or invalid.");
        // Redirect to login page
        // window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance
