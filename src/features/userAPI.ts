import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
     reducerPath: "baseAPI",
     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
     endpoints: (builder) => ({
          getUser: builder.query({
               query: () => "/api/users"
          })
     })
})

export const {useGetUserQuery} = userAPI;