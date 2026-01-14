'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetStudentsQuery } from '@/redux/api/userApi';
import { IUser } from '@/type/user.interface';
import Image from 'next/image';



export default function StudentsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState<number>(1);
  const limit = 5;

  const { data, isLoading, error } = useGetStudentsQuery({ page, limit });

  const students = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const filteredStudents = students.filter((student: IUser) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-dark-600">Loading students...</p>
        </div>
      </div>
    );
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
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark-800">Students Management</h1>
        <button
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
          onClick={() => router.push('/dashboard/students/add')}
        >
          Add New Student
        </button>
      </div>

      <div className="  p-6 ">
        <div className="mb-6">
          <label htmlFor="search" className="block text-sm font-medium text-dark-700 mb-1">
            Search Students
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by name or email..."
            className="w-full px-4 py-2 border border-dark-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b text-dark-500 text-left text-sm">
                <th className="pb-3">Student</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Joined</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student: IUser) => (
                <tr key={student._id} className="border-b hover:bg-dark-50">
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        {student.image ? (
                          <Image
                            src={student.image}
                            alt={student.name}
                            fill
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-dark-200 flex items-center justify-center">
                            <span className="text-dark-500 text-sm">
                              {student.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </td>
                  <td className="text-dark-600">{student.email}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs 'bg-green-100 text-green-800'
                    }`}>
                      {student.role}
                    </span>
                  </td>
                  <td className="text-sm text-dark-500">
                    {new Date(student?.createdAt || "N/A").toLocaleDateString()}
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <button
                        className="text-primary-600 hover:text-primary-800"
                        onClick={() => router.push(`/dashboard/students/${student._id}`)}
                      >
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-dark-200 hover:bg-dark-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-dark-700">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-dark-200 hover:bg-dark-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
