// src/lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // your NestJS backend URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 Unauthorized responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 errors
    if (error.response?.status === 401) {
      // IMPORTANT: Do NOT redirect if the user is currently on the login page
      // This prevents infinite redirect loop when login fails
      const currentPath = window.location.pathname;
      if (!currentPath.includes("/login") && !currentPath.includes("/forgot-password")) {
        // Clear auth data
        localStorage.removeItem("token");
        document.cookie = "vahanex-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

        // Redirect to login
        window.location.href = "/login";
      }
      // If on login/forgot page → just let the component show the error message
    }

    // Always reject the promise so the component can handle other errors
    return Promise.reject(error);
  }
);

export default api;