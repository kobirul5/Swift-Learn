import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const metaApi = createApi({
  reducerPath: "metaApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ['meta'],
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => ({
        url: "/meta/admin-stats",
        method: "GET",
      }),
      providesTags: ["meta"]
    }),
  }),
});

export const {
  useGetAdminStatsQuery
} = metaApi;
