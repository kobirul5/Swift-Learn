import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/utils/axiosBaseQuery";

// let email = "demo@gmail.com";

// if (typeof window !== "undefined") {
//   const localDataString = localStorage.getItem("user") || null;
//   if (localDataString) {
//     const localData = JSON.parse(localDataString);
//     email = localData.email;
//   }
// }

export const userAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: axiosBaseQuery({ baseUrl: "https://swift-learn-server-fnu4.vercel.app" }),
  tagTypes:['user'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `/api/users/login-user`,
        method: "GET",
      }),
      providesTags:['user']
    }),

    createUser: builder.mutation({
      query: (userData) => ({
        url: "/api/users/register",
        method: "POST",
        data: userData, 
      }),
      invalidatesTags:['user']
    }),

    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/api/users/login",
        method: "POST",
        data: userData, 
      }),
      invalidatesTags:['user']
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
      }),
      invalidatesTags:["user"]
    }),

  }),
});

export const {
  useGetUserQuery,
  useLoginUserMutation,
  useCreateUserMutation,
  useLogoutUserMutation
} = userAPI;
