'use client';

import { useGetCourseByIdQuery } from "@/features/courseAPI";
import { FaCheckCircle, FaStar, FaUsers, FaClock, FaPlus } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import Link from "next/link";

interface CourseDetailPageProps {
  id: string;
}

export default function CourseBannerDetails({ id }: CourseDetailPageProps) {
  const { data: course, isLoading } = useGetCourseByIdQuery(id);

  console.log(course,"--------------------")

  if (isLoading) {
    return <div className="p-10 text-center text-lg">Loading course...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <div className=" py-14 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-10">
          {/* Course Info */}
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">{course?.title}</h1>
            <p className="text-dark-100 text-lg mb-6">{course.description} </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-yellow-400">
                <FaStar /> <span>4.5 (1,200 students)</span>
              </div>
              <span className="hidden sm:inline">|</span>
              <span>
                Last updated:{" "}
                {course?.updatedAt
                  ? new Date(course.updatedAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>

          {/* Course Actions + Pricing */}
          <div className="bg-white text-dark-700 rounded-xl p-6 shadow-lg w-full max-w-sm">
            <img
              src={course?.thumbnail || "https://placehold.co/600x400?text=No+Image"}
              alt="Course Thumbnail"
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <div className="text-2xl font-bold">${course?.price ?? "N/A"}</div>

            {/* Admin Action: Add Module */}
            <Link
              href={`/dashboard/courses/${id}/add-module`}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              <FaPlus /> Add Module
            </Link>

            <div className="mt-4 text-sm text-gray-600 space-y-1">
              <p>✔ 30-Day Money-Back Guarantee</p>
              <p>✔ Full Lifetime Access</p>
              <p>✔ {course?.modules?.length ?? 0} Modules Included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg shadow">
            <FaClock className="text-dark-600 text-xl" />
            <span>Lifetime access</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg shadow">
            <MdOndemandVideo className="text-dark-600 text-xl" />
            <span>On-demand videos</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg shadow">
            <FaUsers className="text-dark-600 text-xl" />
            <span>1200+ students</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg shadow">
            <FaCheckCircle className="text-dark-600 text-xl" />
            <span>Certificate of completion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
