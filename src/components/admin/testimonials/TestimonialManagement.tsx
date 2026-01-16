"use client";

import {
    useGetAllTestimonialsQuery,
    useUpdateTestimonialStatusMutation,
    useDeleteTestimonialMutation,
} from "@/redux/api/testimonialApi";
import { FaCheck, FaTrash, FaStar, FaEye, FaTimes } from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import Pagination from "@/components/Shared/Pagination";
import TestimonialDetailsModal from "@/components/Modals/TestimonialDetailsModal";
import Loader from "@/components/Shared/Loader";

const TestimonialManagement = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);
    const limit = 10;
    const { data: testimonialsResponse, isLoading } = useGetAllTestimonialsQuery({ page, limit, searchTerm });
    const [updateStatus] = useUpdateTestimonialStatusMutation();
    const [deleteTestimonial] = useDeleteTestimonialMutation();

    const testimonials = testimonialsResponse?.data || [];

    const handleStatusUpdate = async (id: string, isApproved: boolean) => {
        try {
            await updateStatus({ id, isApproved }).unwrap();
            toast.success(`Testimonial ${isApproved ? "approved" : "unapproved"} successfully`);
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update testimonial status");
        }
    };

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteTestimonial(id).unwrap();
                    toast.success("Testimonial deleted successfully");
                } catch (error: any) {
                    toast.error(error?.data?.message || "Failed to delete testimonial");
                }
            }
        });
    };

    if (isLoading) {
        return <Loader
            message="Loading testimonials..."
            
        />
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Manage Testimonials</h2>
                    <p className="text-dark-500 text-sm">Review and manage student testimonials</p>
                </div>
                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Search testimonials..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
                    />
                    <div className="absolute left-3 top-2.5 text-dark-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {testimonials.map((item: any) => (
                            <tr key={item._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10">
                                            <Image
                                                src={item.image || "https://i.ibb.co/G4yDhqLg/man-7.jpg"}
                                                alt={item.name || ""}
                                                fill
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {item.designation}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-yellow-500">
                                        <FaStar className="mr-1" />
                                        <span>{item.rating}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 max-w-xs truncate">{item.content}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.isApproved ? (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Approved
                                        </span>
                                    ) : (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            Pending
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-3">
                                    <button
                                        onClick={() => setSelectedTestimonial(item)}
                                        className="text-blue-600 hover:text-blue-900"
                                        title="View Details"
                                    >
                                        <FaEye size={18} />
                                    </button>
                                    {item.isApproved ? (
                                        <button
                                            onClick={() => handleStatusUpdate(item._id, false)}
                                            className="text-orange-600 hover:text-orange-900"
                                            title="Unapprove"
                                        >
                                            <FaTimes size={18} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleStatusUpdate(item._id, true)}
                                            className="text-green-600 hover:text-green-900"
                                            title="Approve"
                                        >
                                            <FaCheck size={18} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Delete"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                {testimonialsResponse?.meta && testimonialsResponse.meta.totalPages > 0 && (
                    <Pagination
                        currentPage={page}
                        totalPages={testimonialsResponse.meta.totalPages}
                        onPageChange={(p) => setPage(p)}
                        variant="admin"
                    />
                )}

                {testimonials.length === 0 && (
                    <div className="p-10 text-center text-gray-500">No testimonials found.</div>
                )}
            </div>

            {/* View Modal */}
            <TestimonialDetailsModal
                testimonial={selectedTestimonial}
                onClose={() => setSelectedTestimonial(null)}
            />
        </div>
    );
};

export default TestimonialManagement;
