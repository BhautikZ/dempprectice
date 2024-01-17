import axios from "axios";
import { toast } from "react-toastify";

const createAPI = (history) => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  API.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.message);
        // Redirect to login page
        history("/");
      } else {
        return Promise.reject(error);
      }
    }
  );

  return API;
};

export default createAPI;
