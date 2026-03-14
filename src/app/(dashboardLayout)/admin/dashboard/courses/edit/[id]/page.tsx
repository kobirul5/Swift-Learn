'use client';
import { useParams } from 'next/navigation';
import { useGetCourseByIdQuery } from '@/redux/api/courseApi';
import Loader from '@/components/Shared/Loader';
import UpdateCourseForm from '@/components/admin/courses/UpdateCourseForm';
import Link from 'next/link';

export default function EditCoursePage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetCourseByIdQuery(params.id);

  const courseData = data?.data;

  if (isLoading) {
    return <Loader message="Loading course data..." />;
  }

  if (error || !courseData) {
    return (
      <div className="p-8 bg-white rounded-2xl text-center">
        <p className="text-red-600 mb-4">Error loading course data</p>
        <Link
          href="/admin/dashboard/courses"
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        >
          ← Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 rounded-2xl">
      <main className="p-4 md:p-6 lg:p-8">
        <div className="overflow-hidden">
          {/* Page Header */}
          <div className="flex justify-between items-center p-6 border-b border-primary-100">
            <h1 className="text-2xl font-bold text-primary-700">Edit Course</h1>
            <Link
              href="/admin/dashboard/courses"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              ← Back to Courses
            </Link>
          </div>

          {/* Client-side Form Component */}
          <UpdateCourseForm courseData={courseData} id={params.id} />
        </div>
      </main>
    </div>
  );
}
