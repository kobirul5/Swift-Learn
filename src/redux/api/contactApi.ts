import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const contactAPI = createApi({
    reducerPath: "contactAPI",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["contact"],
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: (params?: { page?: number; limit?: number; searchTerm?: string }) => ({
                url: "/contacts",
                method: "GET",
                params,
            }),
            providesTags: ["contact"],
        }),
        createContact: builder.mutation({
            query: (data) => ({
                url: "/contacts",
                method: "POST",
                data,
            }),
            invalidatesTags: ["contact"],
        }),
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["contact"],
        }),
    }),
});

export const {
    useGetContactsQuery,
    useCreateContactMutation,
    useDeleteContactMutation,
} = contactAPI;
