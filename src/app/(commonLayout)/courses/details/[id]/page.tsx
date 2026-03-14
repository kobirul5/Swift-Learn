/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ICourse } from "@/type/course.interface";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiClock, FiStar, FiUsers } from "react-icons/fi";
import CourseBenefits from "../CourseBenefits";
import CourseInstructor from "../CourseInstructor";
import { useGetUserQuery } from "@/redux/api/userApi";
import {
  useCreateEnrollmentMutation,
  useGetCourseByIdQuery,
} from "@/redux/api/courseApi";
import Loader from "@/components/Shared/Loader";

export default function CourseDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetCourseByIdQuery(id);
  const { data: user, isLoading: userLoading } = useGetUserQuery(undefined);
  const [createEnrollment] = useCreateEnrollmentMutation();

  const router = useRouter();

  const course = data?.data;


  const handleEnrollment = async (courseId: string) => {
    if (!courseId) {
      toast.error("Something is Wrong");
      return;
    }
    if (!user?.data?._id) {
      toast.error("Please login first");
      return;
    }

    const enrolmentData = {
      student: user.data._id,
      course: courseId,
    };
    try {
      const res = await createEnrollment(enrolmentData).unwrap();

      console.log(res.data.url);
      if (res?.success) {
        router.push(res.data.url);
      }

      // if (res?.error?.data?.message) {
      //   toast.error(res.error.data.message);
      // }

    } catch (error: any) {
      toast.error(error.data.message || "Something went wrong");
    }
  };

  if (isLoading || userLoading) {
    return (
      <Loader message="Analyzing course content..." minHeight="min-h-screen" />
    );
  }

  if (!course) {
    return <div className="text-center py-32">Course not found</div>;
  }

  // Format thumbnail URL (ensure leading slash for relative paths)
  const getThumbnailSrc = (src?: string) => {
    if (!src) return "/assets/courses-banner.jpg";
    if (src.startsWith("http") || src.startsWith("/")) return src;
    return `/${src}`;
  };

  return (
    <section className="container mx-auto px-4 py-12 pt-28">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Thumbnail */}
        <div className="relative w-full h-80 lg:h-full rounded-xl overflow-hidden shadow-md">
          <Image
            src={getThumbnailSrc(course.thumbnail)}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-dark-900 mb-4">
            {course.title}
          </h1>

          <p className="text-lg text-dark-600 mb-6">{course.description}</p>

          <div className="flex items-center gap-4 text-dark-500 mb-6">
            <span className="flex items-center">
              <FiClock className="mr-1" /> 10 hours
            </span>
            <span className="flex items-center">
              <FiUsers className="mr-1" /> 1200+ Students
            </span>
            <span className="flex items-center">
              <FiStar className="mr-1 text-yellow-500" /> {course?.avgRating || 0}
              /5
            </span>
          </div>

          <div className="text-2xl font-bold text-primary-600 mb-6">
            ${course?.price?.toFixed(2) || "Free"}
          </div>

          <button
            onClick={() => handleEnrollment(course._id)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Enroll Now
          </button>
        </div>
      </div>
      <CourseBenefits />
      <CourseInstructor />
    </section>
  );
}
