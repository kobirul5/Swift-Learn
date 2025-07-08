import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/utils/axiosBaseQuery";


export const courseAPI = createApi({
  reducerPath: "courseAPI",
  baseQuery: axiosBaseQuery({ baseUrl: "https://swift-learn-server-fnu4.vercel.app" }),
  tagTypes: ['course'],
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: () => ({
        url: `/api/courses`,
        method: "GET",
      }),
      providesTags: ['course']
    }),
    getCourseById: builder.query({
      query: (id) => ({
        url: `/api/courses/${id}`,
        method: "GET",
      }),
      providesTags: ['course']
    }),
    getEnrolmentCourseByStudentId: builder.query({
      query: (id) => ({
        url: `/api/enrollment/${id}`,
        method: "GET",
      }),
      providesTags: ['course']
    }),

    createCourse: builder.mutation({
      query: (courseData) => ({
        url: "/api/courses/create-course",
        method: "POST",
        data: courseData,
      }),
      invalidatesTags: ["course"]
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/api/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"]
    }),
    updateCourse: builder.mutation({
      query: (updateCourse ) => ({
        url: `/api/courses/${updateCourse?.id}`,
        method: 'PATCH',
        data: updateCourse
      }),
      invalidatesTags: ["course"]
    }),
    
  }),
});

export const {
  useGetCourseQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useGetEnrolmentCourseByStudentIdQuery
} = courseAPI;
