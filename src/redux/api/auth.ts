import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { userAPI } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["auth", "user"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (courseData) => ({
        url: "/auth/register",
        method: "POST",
        data: courseData,
      }),
      invalidatesTags: ["auth", "user"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.data.user));
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("refreshToken", data.data.refreshToken);
            Cookies.set("accessToken", data.data.accessToken, { expires: 7 });
            Cookies.set("refreshToken", data.data.refreshToken, {
              expires: 30,
            });
            dispatch(userAPI.util.invalidateTags(["user"]));
          }
        } catch (error) {
          // Handle error
        }
      },
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["auth", "user"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.data.user));
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("refreshToken", data.data.refreshToken);
            Cookies.set("accessToken", data.data.accessToken, { expires: 7 });
            Cookies.set("refreshToken", data.data.refreshToken, {
              expires: 30,
            });
            dispatch(userAPI.util.invalidateTags(["user"]));
          }
        } catch (error) {
          // Handle error
        }
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["auth", "user"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.data.user));
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("refreshToken", data.data.refreshToken);
            Cookies.set("accessToken", data.data.accessToken, { expires: 7 });
            Cookies.set("refreshToken", data.data.refreshToken, {
              expires: 30,
            });
            dispatch(userAPI.util.invalidateTags(["user"]));
          }
        } catch (error) {
          // Handle error
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["auth"],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["auth"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth", "user"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // Optimistically clear all authentication data and API state
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        dispatch(userAPI.util.resetApiState());

        try {
          await queryFulfilled;
        } catch (error) {
          // Even if server call fails, we've already cleared everything locally
          console.error("Logout server error:", error);
        }
      },
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["auth"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutUserMutation,
  useResendOtpMutation,
  useChangePasswordMutation,
} = authApi;
