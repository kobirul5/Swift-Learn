
import Link from 'next/link';

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/admin/dashboard/courses"
          className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6 text-lg font-medium"
        >
          ← Back to Courses
        </Link>

        {/* <CourseDetailsContent courseId={id} /> */}
      </div>
    </div>
  );
}