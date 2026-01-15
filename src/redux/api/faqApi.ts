import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const faqAPI = createApi({
    reducerPath: "faqAPI",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["faq"],
    endpoints: (builder) => ({
        getFaqs: builder.query({
            query: () => ({
                url: "/faqs",
                method: "GET",
            }),
            providesTags: ["faq"],
        }),
        createFaq: builder.mutation({
            query: (data) => ({
                url: "/faqs",
                method: "POST",
                data,
            }),
            invalidatesTags: ["faq"],
        }),
        updateFaq: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/faqs/${id}`,
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["faq"],
        }),
        deleteFaq: builder.mutation({
            query: (id) => ({
                url: `/faqs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["faq"],
        }),
    }),
});

export const {
    useGetFaqsQuery,
    useCreateFaqMutation,
    useUpdateFaqMutation,
    useDeleteFaqMutation,
} = faqAPI;
