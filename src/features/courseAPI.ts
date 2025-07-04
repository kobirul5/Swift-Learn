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
      query: ({ id, ...body }) => ({
        url: `/courses/${id}`,
        method: 'PATCH',
        body,
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
} = courseAPI;
