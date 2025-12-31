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
    verifyOtp: builder.mutation({
      query: (otp) => ({
        url: "/auth/verify-otp",
        method: "POST",
        data: { otp },
      }),
      invalidatesTags: ["auth"]
    }),
   
  }),
});

export const {
useCreateUserMutation,
useVerifyOtpMutation,
} = authApi;
