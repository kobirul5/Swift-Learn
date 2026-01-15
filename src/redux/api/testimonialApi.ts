import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const testimonialApi = createApi({
    reducerPath: "testimonialApi",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["testimonial"],
    endpoints: (builder) => ({
        getAllTestimonials: builder.query({
            query: (params?: { page?: number; limit?: number; searchTerm?: string }) => ({
                url: "/testimonials",
                method: "GET",
                params,
            }),
            providesTags: ["testimonial"],
        }),
        getApprovedTestimonials: builder.query({
            query: () => ({
                url: "/testimonials/approved",
                method: "GET",
            }),
            providesTags: ["testimonial"],
        }),
        createTestimonial: builder.mutation({
            query: (data) => ({
                url: "/testimonials",
                method: "POST",
                data,
            }),
            invalidatesTags: ["testimonial"],
        }),
        approveTestimonial: builder.mutation({
            query: (id) => ({
                url: `/testimonials/${id}/approve`,
                method: "PATCH",
            }),
            invalidatesTags: ["testimonial"],
        }),
        deleteTestimonial: builder.mutation({
            query: (id) => ({
                url: `/testimonials/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["testimonial"],
        }),
    }),
});

export const {
    useGetAllTestimonialsQuery,
    useGetApprovedTestimonialsQuery,
    useCreateTestimonialMutation,
    useApproveTestimonialMutation,
    useDeleteTestimonialMutation,
} = testimonialApi;
