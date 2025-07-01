import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
     reducerPath: "baseAPI",
     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
     endpoints: (builder) => ({
          getUser: builder.query({
               query: () => "/api/users"
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

export const {useGetUserQuery, useCreateUserMutation} = userAPI;