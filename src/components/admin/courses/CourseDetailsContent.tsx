// components/admin/courses/CourseDetailsContent.tsx

"use client";

import CourseHeader from "./CourseHeader";
import AddModuleForm from "./AddModuleForm";
import ModuleCard from "./ModuleCard";
import { useGetCourseByIdQuery } from "@/redux/api/courseApi";
import Loader from "@/components/Shared/Loader";

interface Props {
  courseId: string;
}

export default function CourseDetailsContent({ courseId }: Props) {
  const { data, isLoading, isError } = useGetCourseByIdQuery(courseId);
  const course = data?.data;

  if (isLoading)
    return <Loader message="Fetching course structural details..." />;
  if (isError || !course)
    return (
      <div className="text-center py-20 text-2xl text-red-600">
        Course not found
      </div>
    );

  return (
    <>
      <div className="flex flex-col xl:flex-row gap-10 ">

        <CourseHeader
          title={course.title}
          description={course.description}
          thumbnail={course.thumbnail}
          price={course.price}
          modulesCount={course.modules?.length || 0}
          isFeatured={course.isFeatured}
          updatedAt={course.updatedAt}
        />

        <div className="w-full">

          <AddModuleForm courseId={courseId} />

          <div className="space-y-8">
            {course.modules?.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              course.modules.map((module: any) => (
                <ModuleCard key={module._id} module={module} />
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-dark-100">
                <p className="text-2xl text-dark-500 italic">
                  No modules yet. Add the first one!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
