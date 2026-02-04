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
      query: (params?: { page?: number; limit?: number; searchTerm?: string; status?: string }) => ({
        url: `/students`,
        method: "GET",
        params: params,
      }),
      providesTags: ['user']
    }),
    getSingleStudents: builder.query({
      query: (params?: { _id: string }) => ({
        url: `/students/${params?._id}`,
        method: "GET",
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
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["user"],
    }),
    getAdmins: builder.query({
      query: () => ({
        url: "/users/get-admins",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetStudentsQuery,
  useLogoutUserMutation,
  useUpdateMeMutation,
  useGetSingleStudentsQuery,
  useGetAdminsQuery,
} = userAPI;
