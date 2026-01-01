import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


export const userAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: axiosBaseQuery(),
  tagTypes:['user'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `/users/get-me`,
        method: "GET",
      }),
      providesTags:['user']
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      invalidatesTags:["user"]
    }),

  }),
});

export const {
  useGetUserQuery,
  useLogoutUserMutation
} = userAPI;
