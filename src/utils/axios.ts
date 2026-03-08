/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://swift-learn.onrender.com/api/v1";
// const API_BASE = "https://swift-learn.onrender.com/api/v1";

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Read token from localStorage (as requested)
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (err) {
      // ignore errors
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  function onRejected(error) {
    return Promise.reject(error);
  }
);