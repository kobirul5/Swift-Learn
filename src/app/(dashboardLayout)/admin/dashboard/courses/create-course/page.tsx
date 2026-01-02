import AddCourseForm from "@/components/admin/courses/AddCourseForm";

export default function AddCoursePage() {
  return (
    <div className="min-h-screen ">
      <div className="mx-auto ">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Page Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Add New Course</h1>
            <a
              href="/admin/dashboard/courses"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              ← Back to Courses
            </a>
          </div>

          {/* Client-side Form Component */}
          <AddCourseForm />
        </div>
      </div>
    </div>
  );
}