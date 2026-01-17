import CourseDetailsContent from "@/components/admin/courses/CourseDetailsContent";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CourseDetailsPage({ params }: PageProps) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 rounded-2xl">
      <main className="p-4 md:p-6 lg:p-8">
        <div className="">
          <div className="p-6">
            {/* Back Button */}
            <Link
              href="/admin/dashboard/courses"
              className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-8 text-lg font-medium transition"
            >
              ← Back to Courses
            </Link>

            {/* pass id correctly */}
            <CourseDetailsContent courseId={id} />
          </div>
        </div>
      </main>
    </div>
  );
}
