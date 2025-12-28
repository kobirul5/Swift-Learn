'use client'
import Heading from '@/components/Heading';
// import { FiCode, FiDatabase, FiSmartphone, FiServer } from 'react-icons/fi';
import CourseCard from './CourseCard';
import { useGetCourseQuery } from '@/redux/features/courseAPI';
import { ICourse } from '@/type/course.interface';
import { useEffect, useState } from 'react';


const CoursesSection = () => {
  
  const [courses, setCourses] = useState<ICourse[]>([]);
  const { data, isLoading } = useGetCourseQuery(undefined);

  useEffect(() => {
    if (data) {
      setCourses(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <h1 className="text-center my-40 mx-auto">Loading....</h1>;
  }



  return (
    <section className="pt-12 ">
      <div className="container mx-auto px-4">
        <Heading
          title='Our'
          title2='Courses'
          subtitle='Learn in-demand programming skills from industry experts with hands-on projects.'
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.slice(0,4).map((course, idx) => (
            <CourseCard key={idx} course={course} />
          ))}
        </div>


        <div className="text-center mt-10">
          <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;