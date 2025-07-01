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
               query: () => `/api/users/${email}`,
          }),
          // crate user
          createUser: builder.mutation({
               query: (userData) => ({
                    url: "/api/users",
                    method: "POST",
                    body: userData,
               })
          }),
     })
})

export const { useGetUserQuery, useCreateUserMutation } = userAPI;