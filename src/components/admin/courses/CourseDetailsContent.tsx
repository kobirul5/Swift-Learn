// components/admin/courses/CourseDetailsContent.tsx

"use client";

import CourseHeader from "./CourseHeader";
import AddModuleForm from "./AddModuleForm";
import ModuleCard from "./ModuleCard";
import { useGetCourseByIdQuery } from "@/redux/api/courseApi";

interface Props {
  courseId: string;
}

export default function CourseDetailsContent({ courseId }: Props) {
  const { data, isLoading, isError } = useGetCourseByIdQuery(courseId);
  const course = data?.data;

  if (isLoading)
    return <div className="text-center py-20 text-xl">Loading...</div>;
  if (isError || !course)
    return (
      <div className="text-center py-20 text-2xl text-red-600">
        Course not found
      </div>
    );

  return (
    <>
      <CourseHeader
        title={course.title}
        description={course.description}
        thumbnail={course.thumbnail}
        price={course.price}
        modulesCount={course.modules?.length || 0}
        isFeatured={course.isFeatured}
        updatedAt={course.updatedAt}
      />

      <AddModuleForm courseId={courseId} />

      <div className="space-y-8">
        {course.modules?.length > 0 ? (
          course.modules.map((module: any) => (
            <ModuleCard key={module._id} module={module} />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <p className="text-2xl text-gray-500">
              No modules yet. Add the first one!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
