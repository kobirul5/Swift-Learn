import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const instructorApi = createApi({
    reducerPath: "instructorApi",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["instructor"],
    endpoints: (builder) => ({
        getAllInstructors: builder.query({
            query: (params?: { page?: number; limit?: number; search?: string; expertise?: string }) => ({
                url: "/instructors",
                method: "GET",
                params,
            }),
            providesTags: ["instructor"],
        }),
        getSingleInstructor: builder.query({
            query: (id) => ({
                url: `/instructors/${id}`,
                method: "GET",
            }),
            providesTags: ["instructor"],
        }),
        createInstructor: builder.mutation({
            query: (data) => ({
                url: "/instructors",
                method: "POST",
                data,
            }),
            invalidatesTags: ["instructor"],
        }),
        updateInstructor: builder.mutation({
            query: ({ id, data }) => ({
                url: `/instructors/${id}`,
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["instructor"],
        }),
        deleteInstructor: builder.mutation({
            query: (id) => ({
                url: `/instructors/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["instructor"],
        }),
    }),
});

export const {
    useGetAllInstructorsQuery,
    useGetSingleInstructorQuery,
    useCreateInstructorMutation,
    useUpdateInstructorMutation,
    useDeleteInstructorMutation,
} = instructorApi;
