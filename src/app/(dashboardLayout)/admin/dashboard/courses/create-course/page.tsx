import AddCourseForm from "@/components/admin/courses/AddCourseForm";

export default function AddCoursePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 rounded-2xl">
      <main className="p-4 md:p-6 lg:p-8">
        <div className=" overflow-hidden">
          {/* Page Header */}
          <div className="flex justify-between items-center p-6 border-b border-primary-100">
            <h1 className="text-2xl font-bold text-primary-700">Add New Course</h1>
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
      </main>
    </div>
  );
}