/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://swiftlearn-server.vercel.app/api/v1";

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Read token from Cookies
    try {
      const token = Cookies.get('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
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
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);