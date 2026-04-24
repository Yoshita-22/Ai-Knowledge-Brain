import api from "./api";
import { getAccessToken, setAccessToken } from "../utils/token";

let isRefreshing = false;
let failedQueue = [];

// 🔁 Process queued requests after refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ============================
// REQUEST INTERCEPTOR
// ============================
api.interceptors.request.use(
  (config) => {
    // 🚨 Skip attaching token for refresh
    if (config.url.includes("/auth/refresh")) {
      return config;
    }

    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================
// RESPONSE INTERCEPTOR
// ============================
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // ❌ If no config → reject
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // ❌ Skip refresh retry itself
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // ============================
    // HANDLE 401
    // ============================
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 🔁 If already refreshing → queue requests
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await api.post("/auth/refresh");

        const newAccessToken = res.data.accessToken;

        setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (err) {
        processQueue(err, null);

        setAccessToken(null);

        console.log("❌ Session expired / token reuse detected");

        window.location.href = "/login";

        return Promise.reject(err);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;