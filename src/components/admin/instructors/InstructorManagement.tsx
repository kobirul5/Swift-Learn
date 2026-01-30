/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    useGetAllInstructorsQuery,
    useDeleteInstructorMutation,
} from "@/redux/api/instructorApi";
import { FaTrash, FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import Pagination from "@/components/Shared/Pagination";
import Loader from "@/components/Shared/Loader";
import InstructorModal from "@/components/Modals/InstructorModal";

const InstructorManagement = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInstructor, setSelectedInstructor] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    
    const limit = 10;
    const { data: instructorResponse, isLoading } = useGetAllInstructorsQuery({ page, limit, search: searchTerm });
    const [deleteInstructor] = useDeleteInstructorMutation();

    const instructors = instructorResponse?.data || [];
    const meta = instructorResponse?.meta;

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
                    await deleteInstructor(id).unwrap();
                    toast.success("Instructor deleted successfully");
                } catch (error: any) {
                    toast.error(error?.data?.message || "Failed to delete instructor");
                }
            }
        });
    };

    const handleCreate = () => {
        setSelectedInstructor(null);
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const handleEdit = (instructor: any) => {
        setSelectedInstructor(instructor);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedInstructor(null);
    };

    if (isLoading) {
        return <Loader message="Loading instructors..." />;
    }

    return (
        <div className="">
            <div className="p-6 border-b border-primary-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-primary-700">Manage Instructors</h2>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                         <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Search instructors..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full pl-10 pr-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
                            />
                            <div className="absolute left-3 top-2.5 text-gray-400">
                                <FaSearch className="w-4 h-4" />
                            </div>
                        </div>
                        
                        <button 
                            onClick={handleCreate}
                            className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition"
                        >
                            <FaPlus /> Add Instructor
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto p-6">
                <table className="min-w-full divide-y divide-primary-100">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary-100">
                        {instructors.map((item: any) => (
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
                                    <div className="text-sm text-gray-500">
                                        <div>Exp: {item.yearsExperience} yrs</div>
                                        <div>Rating: {item.averageRating}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {item.expertise?.slice(0, 3).map((skill: string, idx: number) => (
                                            <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                        {item.expertise?.length > 3 && (
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                +{item.expertise.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-3">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-600 hover:text-blue-900"
                                        title="Edit"
                                    >
                                        <FaEdit size={18} />
                                    </button>
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
                {meta && meta.totalPages > 0 && (
                    <Pagination
                        currentPage={page}
                        totalPages={meta.totalPages}
                        onPageChange={(p) => setPage(p)}
                        variant="admin"
                    />
                )}

                {instructors.length === 0 && (
                    <div className="p-10 text-center text-gray-500">No instructors found.</div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <InstructorModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    instructor={selectedInstructor}
                    isEditMode={isEditMode}
                />
            )}
        </div>
    );
};

export default InstructorManagement;
