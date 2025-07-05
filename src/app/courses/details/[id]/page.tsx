'use client'
import { useGetCourseByIdQuery } from '@/features/courseAPI';
import { ICourse } from '@/type/course.interface';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiClock, FiStar, FiUsers } from 'react-icons/fi';



export default function CourseDetailPage() {
    const {id} = useParams()
  const [course, setCourses] = useState<ICourse>();
  const { data, isLoading } = useGetCourseByIdQuery(id);
  console.log(data)

  useEffect(() => {
    if (data) {
      setCourses(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <h1 className="text-center py-40 mx-auto">Loading....</h1>;
  }


  if (!course) {
    return <div className="text-center py-32">Course not found</div>;
  }

  return (
    <section className="container mx-auto px-4 py-12 pt-28">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Thumbnail */}
        <div className="relative w-full h-80 md:h-full rounded-xl overflow-hidden shadow-md">
          <Image
            src={course.thumbnail || '/fallback.png'}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-dark-900 mb-4">{course.title}</h1>

          <p className="text-lg text-dark-600 mb-6">{course.description}</p>

          <div className="flex items-center gap-4 text-dark-500 mb-6">
            <span className="flex items-center">
              <FiClock className="mr-1" /> 10 hours
            </span>
            <span className="flex items-center">
              <FiUsers className="mr-1" /> 1200+ Students
            </span>
            <span className="flex items-center">
              <FiStar className="mr-1 text-yellow-500" /> {course?.rating || 0}/5
            </span>
          </div>

          <div className="text-2xl font-bold text-primary-600 mb-6">
            ${course?.price?.toFixed(2) || 'Free'}
          </div>

          <button 
          onClick={()=>toast.success("Enrollment Successful")}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
    </section>
  );
}
