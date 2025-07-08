import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/utils/axiosBaseQuery";


export const moduleAndLectureAPI = createApi({
  reducerPath: "lectureAPI",
  baseQuery: axiosBaseQuery({ baseUrl: "https://swift-learn-server-fnu4.vercel.app" }),
  tagTypes:['modules'],
  endpoints: (builder) => ({
    getModule: builder.query({
      query: (courseId) => ({
        url: `/api/modules/${courseId}`,
        method: "GET",
      }),
      providesTags:['modules']
    }),
    createModule: builder.mutation({
      query: (data) => ({
        url: `/api/modules/create`,
        method: "POST",
        data
      }),
      invalidatesTags: ['modules']
    }),
    createLecture: builder.mutation({
      query: (data) => ({
        url: `/api/lecture`,
        method: "POST",
        data
      }),
      invalidatesTags: ['modules']
    }),
    

  }),
}); 

export const {
  useCreateLectureMutation,
  useGetModuleQuery,
  useCreateModuleMutation,
} = moduleAndLectureAPI;
