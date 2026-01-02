'use client';

import Link from 'next/link';
import { ICourse } from '@/type/course.interface';
import toast from 'react-hot-toast';
import { useDeleteCourseMutation, useGetCourseQuery } from '@/redux/api/courseApi';

const Courses = () => {
  const { data: response, isLoading } = useGetCourseQuery(undefined);
  const [deleteCourse] = useDeleteCourseMutation();

  const courses = response?.data as ICourse[];

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteCourse(id).unwrap();
      toast.success('Course deleted successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || 'Failed to delete course');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-600">Loading courses...</p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No courses found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">All Courses</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Filter by status</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
            <Link
              href="/admin/dashboard/courses/create-course"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition font-medium text-center"
            >
              + Add Course
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Course</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Modules</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Price</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Last Updated</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course) => (
              <tr key={course._id} className="hover:bg-gray-50 transition duration-150">
                {/* Course Info */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 border border-gray-300">
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-500 text-xs font-medium">No Image</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{course.title}</p>
                      <p className="text-sm text-gray-500 line-clamp-1 mt-1 max-w-md">
                        {course.description || 'No description available'}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Modules */}
                <td className="px-6 py-5 text-gray-700">
                  <span className="font-medium">{course?.modules?.length || 0}</span>
                </td>

                {/* Price */}
                <td className="px-6 py-5">
                  <span className="font-semibold text-gray-900">${course.price.toFixed(2)}</span>
                </td>

                {/* Last Updated */}
                <td className="px-6 py-5 text-sm text-gray-600">
                  {course.updatedAt
                    ? new Date(course.updatedAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : '-'}
                </td>

                {/* Actions - View, Edit, Delete */}
                <td className="px-6 py-5">
                  <div className="flex items-center justify-center gap-3">
                    {/* View */}
                    <Link
                      href={`/admin/dashboard/courses/details/${course._id}`}
                      className="text-primary-600 hover:text-primary-800 font-medium text-sm underline"
                    >
                      View
                    </Link>

                    {/* Edit */}
                    <Link
                      href={`/admin/dashboard/courses/edit/${course._id}`}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
                    >
                      Edit
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;