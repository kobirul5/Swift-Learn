import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


export const moduleAndLectureAPI = createApi({
  reducerPath: "lectureAPI",
  baseQuery: axiosBaseQuery(),
  tagTypes:['modules'],
  endpoints: (builder) => ({
    getModule: builder.query({
      query: (courseId) => ({
        url: `/modules/${courseId}`,
        method: "GET",
      }),
      providesTags:['modules']
    }),
    createModule: builder.mutation({
      query: (data) => ({
        url: `/modules/create`,
        method: "POST",
        data
      }),
      invalidatesTags: ['modules']
    }),
    createLecture: builder.mutation({
      query: (data) => ({
        url: `/lecture`,
        method: "POST",
        data
      }),
      invalidatesTags: ['modules']
    }),
    deleteLecture: builder.mutation({
      query: (id) => ({
        url: `/lecture/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['modules']
    }),
    

  }),
}); 

export const {
  useCreateLectureMutation,
  useGetModuleQuery,
  useCreateModuleMutation,
  useDeleteLectureMutation,
} = moduleAndLectureAPI;
