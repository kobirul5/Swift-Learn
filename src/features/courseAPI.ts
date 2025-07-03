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

    createCourse: builder.mutation({
      query: (courseData) => ({
        url: "/api/courses/create-course",
        method: "POST",
        data: courseData,
      }),
    }),



  }),
});

export const {
  useGetCourseQuery,
  useCreateCourseMutation
} = courseAPI;
