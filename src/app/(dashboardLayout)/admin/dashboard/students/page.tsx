"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetStudentsQuery } from "@/redux/api/userApi";
import { IUser } from "@/type/user.interface";
import Image from "next/image";
import Loader from "@/components/Shared/Loader";
import Pagination from "@/components/Shared/Pagination";
import { FaEye, FaTrash } from "react-icons/fa";
import { MdBlock} from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";

export default function StudentsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<string>();
  const limit = 10;

  const { data, isLoading, error } = useGetStudentsQuery({
    page,
    limit,
    searchTerm,
    status,
  });
  const totalPages = data?.meta?.totalPages || 1;

  if (isLoading) {
    return <Loader message="Loading students..." />;
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-xl shadow">
        <div className="text-center text-red-600">
          <p>Error loading students. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 rounded-2xl">
      <main className="p-4 md:p-6 lg:p-8">
        <div className="">
          <div className="p-6 border-b border-primary-100">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-primary-700">
                Students Management
              </h1>
              <button
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                onClick={() => router.push("/dashboard/students/add")}
              >
                Add New Student
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div>
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Search Students
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name or email..."
                  className="w-full px-4 py-2 border border-primary-100 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  className="w-full px-4 py-2 border border-primary-100 rounded-md focus:ring-primary-500 focus:border-primary-500 space-y-3 "
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" >All</option>
                  <option value="active" >Active</option>
                  <option value="inactive" >Inactive</option>
                  <option value="banned" >Banned</option>
                  {/* <option value="deleted">Deleted</option> */}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-primary-100 text-gray-600 text-left text-sm">
                    <th className="pb-3">Student</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Joined</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((student: IUser) => (
                    <tr
                      key={student._id}
                      className="border-b border-primary-100 hover:bg-gray-50"
                    >
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            {student.image ? (
                              <Image
                                src={student.image}
                                alt={student.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 text-sm">
                                  {student.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </td>
                      <td className="text-gray-600">{student.email}</td>
                      <td>
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {student.role}
                        </span>
                      </td>
                      <td className="text-sm text-gray-500">
                        {new Date(
                          student?.createdAt || "N/A"
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs 
                          ${
                            student.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`
                          }>
                          {student.status}

                        </span>
                      </td>
                      <td>
                        <div className="flex space-x-3">
                          <button
                            className="text-primary-600 hover:text-primary-800"
                            onClick={() =>
                              router.push(`/dashboard/students/${student._id}`)
                            }
                          >
                            <FaEye className="text-lg" />
                          </button>
                          <button className="">
                            {
                              student.status === "banned" ? (
                                <IoCheckmarkSharp className="text-green-500 hover:text-green-800  font-bold text-lg " />
                              ) : (
                                <MdBlock className="text-lg text-red-500" />
                              )
                            }
                            {/* <MdBlock className="text-lg" /> */}
                            
                          </button>
                          <button className="text-red-500 hover:text-red-800">
                            <FaTrash className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              variant="admin"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
