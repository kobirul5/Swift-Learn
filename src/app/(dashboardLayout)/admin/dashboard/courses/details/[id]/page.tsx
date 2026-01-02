import CourseDetailsContent from "@/components/admin/courses/CourseDetailsContent";
import Link from "next/link";

export default function CourseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div className="min-h-screen  py-8">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
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
  );
}
