import Image from "next/image"

export default function FeaturedCourse() {


    const course = {
        id: 1,
        title: 'Complete React Developer in 2024',
        instructor: 'Alex Johnson',
        category: 'Web Development',
        level: 'Intermediate',
        duration: '32 hours',
        students: 12453,
        rating: 4.8,
        price: 89.99,
        image: '/courses/react-dev.png',
        featured: true
    }

    return (
        <div>
            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-dark-800">Featured Course</h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <div className="h-64 md:h-full bg-dark-200 flex items-center justify-center overflow-hidden">
                                <span className="text-dark-500">
                                    <Image
                                        width={600}
                                        height={300}
                                        alt="Featured"
                                        src={course.image}
                                        className="object-cover w-full h-full"
                                        priority
                                        
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="p-8 md:w-1/2">
                            <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold mb-1">
                                {course.category}
                            </div>
                            <h3 className="text-2xl font-bold text-dark-800 mb-2">{course.title}</h3>
                            <p className="text-dark-600 mb-4">By {course.instructor}</p>
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400 mr-2">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>{i < Math.floor(course.rating) ? '★' : '☆'}</span>
                                    ))}
                                </div>
                                <span className="text-dark-600">
                                    {course.rating} ({course.students.toLocaleString()} students)
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                                    {course.level}
                                </span>
                                <span className="px-3 py-1 bg-dark-100 text-dark-800 rounded-full text-sm">
                                    {course.duration}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-dark-800">${course.price}</span>
                                <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
