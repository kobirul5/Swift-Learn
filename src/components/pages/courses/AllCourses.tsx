'use client'
import { IICourse } from "@/app/(commonLayout)/courses/page";
import CourseCard from "@/components/pages/home/CourseCard";


interface AllCoursesProps {
    filteredCourses: IICourse[];
    activeCategory: string;
}

export default function AllCourses({ filteredCourses, activeCategory }: AllCoursesProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-dark-800">
                {activeCategory === 'All' ? 'All Courses' : activeCategory}
                <span className="ml-2 text-dark-500 text-lg">
                    ({filteredCourses?.length || 0} {(filteredCourses?.length || 0) === 1 ? 'course' : 'courses'})
                </span>
            </h2>

            {(filteredCourses?.length || 0) === 0 ? (
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
                    {filteredCourses.map((course, idx) => (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        <CourseCard key={idx} course={course as any} />
                    ))}
                </div>
            )}
        </div>
    )
}
