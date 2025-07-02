import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


let email = "demo@gmail.com";

if (typeof window !== "undefined") {
     const localDataString = localStorage.getItem('user') || null;
     if (localDataString) {
          const localData = JSON.parse(localDataString);
          email = localData.email;
     }

}

export const userAPI = createApi({
     reducerPath: "baseAPI",
     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
     endpoints: (builder) => ({
          getUser: builder.query({
               query: (emailS) => `/api/users/${emailS || email}`,
          }),
          // crate user
          createUser: builder.mutation({
               query: (userData) => ({
                    url: "/api/users/register",
                    method: "POST",
                    body: userData,
               })
          }),
          loginUser: builder.mutation({
               query: (userData) => ({
                    url: "/api/users/login-user",
                    method: "POST",
                    body: userData,
               })
          }),
     })
})

export const { useGetUserQuery, useLoginUserMutation, useCreateUserMutation } = userAPI;