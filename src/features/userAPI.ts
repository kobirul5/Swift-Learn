import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/utils/axiosBaseQuery";

let email = "demo@gmail.com";

if (typeof window !== "undefined") {
  const localDataString = localStorage.getItem("user") || null;
  if (localDataString) {
    const localData = JSON.parse(localDataString);
    email = localData.email;
  }
}

export const userAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (emailS) => ({
        url: `/api/users/${emailS || email}`,
        method: "GET",
      }),
    }),

    createUser: builder.mutation({
      query: (userData) => ({
        url: "/api/users/register",
        method: "POST",
        data: userData, 
      }),
    }),

    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/api/users/login-user",
        method: "POST",
        data: userData, 
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginUserMutation,
  useCreateUserMutation,
} = userAPI;
