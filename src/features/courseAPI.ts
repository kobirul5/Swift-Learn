import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/utils/axiosBaseQuery";


export const courseAPI = createApi({
  reducerPath: "courseAPI",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5000" }),
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
    createModule: builder.mutation({
      query: (moduleData) => ({
        url: "/api/modules/create",
        method: "POST",
        data: moduleData,
      }),
    }),
    deleteLecture: builder.mutation({
      query: (id) => ({
        url: `/api/lecture/${id}`,
        method: "DELETE",
      }),
    }),


  }),
});

export const {
  useGetCourseQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useCreateModuleMutation,
  useDeleteLectureMutation,
} = courseAPI;
