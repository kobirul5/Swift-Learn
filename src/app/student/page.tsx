'use client';

import { useGetEnrolmentCourseByStudentIdQuery } from '@/features/courseAPI';
import { useGetUserQuery } from '@/features/userAPI';
import { ICourse } from '@/type/course.interface';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function MyCourses() {

  const [courses, setCourses] = useState<ICourse[]>([]);
  const { data: userData } = useGetUserQuery(undefined)

  const userId = userData?.data?._id;
  

  const { data, isLoading } = useGetEnrolmentCourseByStudentIdQuery(userId);
  console.log(data,"--------------------")


  useEffect(() => {
    if (!data) {
      return
    }
    if (data) {
      setCourses(data.data);
    }

  }, [data, userData]);


  if (isLoading) {
    return <h1 className="text-center py-40 mx-auto">Loading....</h1>;
  }

  if (!courses?.length) return <p className="text-center">You haven&apos;t purchased any courses yet.</p>;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Purchased Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="rounded-t-2xl h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-gray-600 text-sm mb-2">By Jhankar Mahbub</p>

              {/* Optional: Progress bar */}
              {/* <div className="w-full bg-gray-200 h-2 rounded mb-3">
                <div
                  className="bg-primary-500 h-2 rounded"
                  style={{ width: `${80}%` }}
                ></div>
              </div> */}

              <Link
                href={`/student/${course._id}`}
                className="inline-block bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 text-sm"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
