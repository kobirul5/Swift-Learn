import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/utils/axiosBaseQuery";


export const moduleAndLectureAPI = createApi({
  reducerPath: "lectureAPI",
  baseQuery: axiosBaseQuery({ baseUrl: "https://swift-learn-server-fnu4.vercel.app" }),
  tagTypes:['lecture'],
  endpoints: (builder) => ({
    getModule: builder.query({
      query: (courseId) => ({
        url: `/api/modules/${courseId}`,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation({
      query: (data) => ({
        url: `/api/lecture`,
        method: "POST",
        data
      }),
    }),

  }),
});

export const {
  useCreateLectureMutation,
  useGetModuleQuery,
} = moduleAndLectureAPI;
