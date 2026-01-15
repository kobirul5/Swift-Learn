import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (courseData) => ({
        url: "/auth/register",
        method: "POST",
        data: courseData,
      }),
      invalidatesTags: ["auth"]
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["auth"]
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["auth"]
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["auth"]
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["auth"]
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"]
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["auth"]
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["auth"]
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
  useChangePasswordMutation
} = authApi;
