import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: axiosBaseQuery(),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `/users/get-me`,
        method: "GET",
      }),
      providesTags: ['user']
    }),
    getStudents: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: `/students`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ['user']
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      invalidatesTags: ["user"]
    }),
    updateMe: builder.mutation({
      query: (data) => ({
        url: "/users/update-me",
        method: "PATCH",
        data: data,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: ["user"]
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetStudentsQuery,
  useLogoutUserMutation,
  useUpdateMeMutation
} = userAPI;
