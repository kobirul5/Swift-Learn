import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


export const courseAPI = createApi({
  reducerPath: "courseAPI",
  baseQuery: axiosBaseQuery(),
  tagTypes: ['course'],
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: (params?: { page?: number; limit?: number; searchTerm?: string; category?: string, isFeatured?: boolean }) => ({
        url: `/courses`,
        method: "GET",
        params: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          searchTerm: params?.searchTerm,
          category: params?.category,
          isFeatured: params?.isFeatured
        },
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
      query: (updateCourse) => ({
        url: `/courses/${updateCourse?.id}`,
        method: 'PATCH',
        data: updateCourse.data
      }),
      invalidatesTags: ["course"]
    }),
    createEnrollment: builder.mutation({
      query: (updateCourse) => ({
        url: `/enrollment`,
        method: 'POST',
        data: updateCourse
      }),
      invalidatesTags: ["course"]
    }),
    getModule: builder.query({
      query: (courseId) => ({
        url: `/modules/${courseId}`,
        method: "GET",
      }),
      providesTags: ['course']
    }),
    getSingleLecture: builder.query({
      query: (lectureId) => ({
        url: `/lecture/single/${lectureId}`,
        method: "GET",
      }),
      providesTags: ['course']
    }),
    createModule: builder.mutation({
      query: (data) => ({
        url: `/modules/create`,
        method: "POST",
        data
      }),
      invalidatesTags: ['course']
    }),
    createLecture: builder.mutation({
      query: (data) => ({
        url: `/lecture`,
        method: "POST",
        data
      }),
      invalidatesTags: ['course']
    }),
    deleteLecture: builder.mutation({
      query: (id) => ({
        url: `/lecture/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['course']
    }),
    unlockLecture: builder.mutation({
      query: ({ id }) => ({
        url: `/lecture/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ['course']
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
  useGetModuleQuery,
  useCreateModuleMutation,
  useCreateLectureMutation,
  useDeleteLectureMutation,
  useGetSingleLectureQuery,
  useUnlockLectureMutation,

} = courseAPI;
