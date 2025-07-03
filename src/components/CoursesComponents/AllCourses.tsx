
import { IICourse } from "@/app/courses/page";
import Image from "next/image";

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
                    {filteredCourses
                        .map((course) => (
                            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-dark-200 flex items-center justify-center">
                                    <Image
                                        width={600}
                                        height={400}
                                        alt={course.title}
                                        src={course.image}
                                        className="object-cover w-full h-full"
                                        priority
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
                                            {course.category}
                                        </span>
                                        <span className="px-2 py-1 bg-dark-100 text-dark-800 rounded-full text-xs font-medium">
                                            {course.level}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-dark-800 mb-2">{course.title}</h3>
                                    <p className="text-dark-600 text-sm mb-4">By {course.instructor}</p>
                                    <div className="flex items-center mb-4">
                                        <div className="flex text-yellow-400 mr-2">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i}>{i < Math.floor(course.rating) ? '★' : '☆'}</span>
                                            ))}
                                        </div>
                                        <span className="text-dark-600 text-sm">
                                            {course.rating} ({course.students.toLocaleString()})
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-dark-800">${course.price}</span>
                                        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors">
                                            View Course
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}
