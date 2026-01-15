"use client";

import {
    useGetAllTestimonialsQuery,
    useApproveTestimonialMutation,
    useDeleteTestimonialMutation,
} from "@/redux/api/testimonialApi";
import { FaCheck, FaTrash, FaStar } from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const TestimonialManagement = () => {
    const { data: testimonialsResponse, isLoading } = useGetAllTestimonialsQuery({});
    const [approveTestimonial] = useApproveTestimonialMutation();
    const [deleteTestimonial] = useDeleteTestimonialMutation();

    const testimonials = testimonialsResponse?.data || [];

    const handleApprove = async (id: string) => {
        try {
            await approveTestimonial(id).unwrap();
            toast.success("Testimonial approved successfully");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to approve testimonial");
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
        return <div className="p-10 text-center">Loading testimonials...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-dark-400">Manage Testimonials</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {testimonials.map((item: any) => (
                            <tr key={item._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10">
                                            <Image
                                                src={item.user?.image || "https://i.ibb.co/G4yDhqLg/man-7.jpg"}
                                                alt={item.user?.name || ""}
                                                fill
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{item.user?.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {item.user?.education || item.user?.role}
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                    {!item.isApproved && (
                                        <button
                                            onClick={() => handleApprove(item._id)}
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

                {testimonials.length === 0 && (
                    <div className="p-10 text-center text-gray-500">No testimonials found.</div>
                )}
            </div>
        </div>
    );
};

export default TestimonialManagement;
