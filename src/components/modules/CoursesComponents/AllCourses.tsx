'use client'

import { IICourse } from "@/app/courses/page";
import { useGetCourseQuery } from "@/features/courseAPI";
import { ICourse } from "@/type/course.interface";
import { useEffect, useState } from "react";
import CourseCard from "../Home/CourseCard";

interface AllCoursesProps {
    filteredCourses: IICourse[];
    activeCategory: string;
}

export default function AllCourses({ filteredCourses, activeCategory }: AllCoursesProps) {
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
        <div>
            <h2 className="text-2xl font-bold mb-6 text-dark-800">
                {activeCategory === 'All' ? 'All Courses' : activeCategory}
                <span className="ml-2 text-dark-500 text-lg">
                    ({filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'})
                </span>
            </h2>

            {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">😞</div>
                    <h3 className="text-xl font-medium text-dark-700 mb-2">
                        No courses found
                    </h3>
                    <p className="text-dark-500">
                        Try adjusting your search or filter criteria
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses
                        .map((course, idx) => (<CourseCard key={idx} course={course} />
                        ))}
                </div>
            )}
        </div>
    )
}
