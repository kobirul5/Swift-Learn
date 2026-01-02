'use client'
import Heading from '@/components/Heading';
import CourseCard from '@/components/pages/home/CourseCard';
import { useGetCourseQuery } from '@/redux/api/courseApi';
import { ICourse } from '@/type/course.interface';



const CoursesSection = () => {

  const { data, isLoading } = useGetCourseQuery(undefined);



  if (isLoading) {
    return <h1 className="text-center my-40 mx-auto">Loading....</h1>;
  }

  const courses = data?.data ?? [];

  return (
    <section className="pt-12 ">
      <div className="container mx-auto px-4">
        <Heading
          title='Our'
          title2='Courses'
          subtitle='Learn in-demand programming skills from industry experts with hands-on projects.'
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.slice(0, 4).map((course: ICourse, idx: number) => (
            <CourseCard key={idx} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
