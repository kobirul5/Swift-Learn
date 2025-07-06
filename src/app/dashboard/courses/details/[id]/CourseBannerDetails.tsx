'use client';

import { useDeleteCourseMutation, useGetCourseByIdQuery } from "@/features/courseAPI";
import { useEffect, useState } from "react";
import { ICourse } from "@/type/course.interface";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import ModuleModal from "@/app/dashboard/courses/details/ModuleModal";
import ModuleAccordion from "@/app/dashboard/courses/details/[id]/ModuleAccordion";



interface CourseDetailPageProps {
  id: string;
}

export default function CourseBannerDetails({ id }: CourseDetailPageProps) {
  const { data, isLoading } = useGetCourseByIdQuery(id);
  const [deleteCourse] = useDeleteCourseMutation()
  const [course, setCourse] = useState<ICourse>()
  const router = useRouter()
  const [show, setShow] = useState<boolean>(false);



  useEffect(() => {
    if (!data) return;

    if (data) {
      setCourse(data.data);
    }
  }, [data]);

  const handleEdit = () => {
    router.push(`/dashboard/courses/update/${id}`)
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteCourse(id)
        if (res?.data?.success) {
          router.push('/dashboard/courses')
          Swal.fire({
            title: "Deleted!",
            text: "Your Course has been deleted.",
            icon: "success"
          });

        }

      }
    });
  };

  // const handleAddModule = () => {
  //   alert('Add Module clicked!');
  // };


  if (isLoading) {
    return <div className="p-10 text-center text-lg">Loading course...</div>;
  }

  return (
    <div className="bg-white min-h-screen rounded-2xl">
      <header className="bg-white shadow rounded-2xl">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-dark-900">Course Details</h1>
          <div className="space-x-2">
            <button
              onClick={handleEdit}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded"
            >
              Edit Course
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete Course
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className=" mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          {/* Course Thumbnail */}
          <img
            src={course?.thumbnail}
            alt={course?.title}
            className="w-full h-64 object-cover"
          />

          {/* Course Info */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{course?.title}</h2>
            <p className="text-dark-600 mb-4">{course?.description}</p>
            <p className="text-lg font-semibold">${course?.price}</p>
          </div>
        </div>

        {/* Modules Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b border-dark-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-dark-800 mb-6">Course Modules</h2>
            <button
              onClick={() => setShow(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              + Add Module
            </button>
          </div>

            <div>
              <ModuleAccordion id={id} />
            </div>

          {show && (<ModuleModal setShow={setShow} courseId={id} />)}

        </div>
      </main>

    </div>

  )
}
