'use client';

import { useDeleteCourseMutation, useGetCourseByIdQuery } from "@/features/courseAPI";
import { useEffect, useState } from "react";
import { ICourse } from "@/type/course.interface";
import Swal from "sweetalert2";


interface CourseDetailPageProps {
  id: string;
}

export default function CourseBannerDetails({ id }: CourseDetailPageProps) {
  const { data, isLoading } = useGetCourseByIdQuery(id);
  const [deleteCourse] = useDeleteCourseMutation()
  const [course, setCourse] = useState<ICourse>()




  useEffect(() => {
    if (!data) return;

    if (data) {
      setCourse(data.data);
    }
  }, [data]);

  const handleEdit = () => {
    alert(`Editing course: ${course?.title}`);
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
        const res = await deleteCourse(id) as { success: boolean, massage: string, data: ICourse }
        console.log(res)
        if (res?.success) {

          Swal.fire({
            title: "Deleted!",
            text: "Your Course has been deleted.",
            icon: "success"
          });
        }

      }
    });
  };

  const handleAddModule = () => {
    alert('Add Module clicked!');
  };


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
              className="bg-primary-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
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
            <h3 className="text-xl font-semibold">Modules</h3>
            <button
              onClick={handleAddModule}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              + Add Module
            </button>
          </div>


          <div className="p-8 text-center text-dark-500">
            No modules added yet.
          </div>

        </div>
      </main>

    </div>

  )
}
