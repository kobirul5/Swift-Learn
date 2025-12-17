import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


export const courseAPI = createApi({
  reducerPath: "courseAPI",
  baseQuery: axiosBaseQuery(),
  tagTypes: ['course'],
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: () => ({
        url: `/courses`,
        method: "GET",
      }),
      providesTags: ['course']
    }),
    getCourseById: builder.query({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "GET",
      }),
      providesTags: ['course']
    }),
    getEnrolmentCourseByStudentId: builder.query({
      query: (id) => ({
        url: `/enrollment/${id}`,
        method: "GET",
      }),
      providesTags: ['course']
    }),

    createCourse: builder.mutation({
      query: (courseData) => ({
        url: "/courses/create-course",
        method: "POST",
        data: courseData,
      }),
      invalidatesTags: ["course"]
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"]
    }),
    updateCourse: builder.mutation({
      query: (updateCourse ) => ({
        url: `/courses/${updateCourse?.id}`,
        method: 'PATCH',
        data: updateCourse
      }),
      invalidatesTags: ["course"]
    }),
    createEnrollment: builder.mutation({
      query: (updateCourse ) => ({
        url: `/enrollment`,
        method: 'POST',
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
  useGetEnrolmentCourseByStudentIdQuery,
  useCreateEnrollmentMutation,
} = courseAPI;
