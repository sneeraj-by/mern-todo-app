import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
  timeout: 10000, // 10 seconds
});

apiClient.interceptors.response.use(
  (response) => response, // Allow successful responses
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token might be expired, try refreshing the token
      try {
        const refreshResponse = await apiClient.post("/refresh");
        const { token } = refreshResponse.data;

        // Retry the failed request with new access token
        error.config.headers["Authorization"] = `Bearer ${token}`;
        return apiClient(error.config);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // Handle failure to refresh token (e.g., redirect to login)
        window.location.href = "/";
      }
    }
    return Promise.reject(error); // Reject other errors
  }
);

// apiClient.js
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && [401, 403].includes(error.response.status)) {
//       window.location.href = "/"; // or use navigate() if inside component
//     }
//     return Promise.reject(error);
//   }
// );

// Add a request interceptor to include the token in the Authorization header
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default apiClient;
