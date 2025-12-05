import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ems_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle 401 errors properly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    // 1. If this is login request --> DO NOT redirect
    if (url?.includes("/auth/login")) {
      return Promise.reject(error);
    }

    // 2. Only redirect for 401 if user was actually logged in
    if (status === 401) {
      const token = localStorage.getItem("ems_token");

      if (token) {
        localStorage.removeItem("ems_user");
        localStorage.removeItem("ems_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
