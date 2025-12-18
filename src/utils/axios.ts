
import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  // baseURL: "https://swift-learn-server-fnu4.vercel.app/api",
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
console.log(process.env.NEXT_PUBLIC_API_URL, "---API URL");

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = Cookies.get("token"); // 👈 cookie name
    console.log(token,"from interceptor--------------------------------");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
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