import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiStar, FiClock, FiUsers } from 'react-icons/fi'

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  icon: React.ReactNode;
  category: string;
  rating?: number;
  duration?: string;
  students?: number;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className=" rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative h-48 group overflow-hidden">
        <Image

          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg">
          {course.icon}
        </div>

        {course.rating && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center shadow-sm">
            <FiStar className="text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category and Duration */}
        <div className="flex justify-between items-center mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-600">
            {course.category}
          </span>
          {course.duration && (
            <div className="flex items-center text-sm text-gray-500">
              <FiClock className="mr-1" />
              <span>{course.duration}</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{course.title.slice(0,17)}...</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

        {/* Metadata & Price */}
        <div className="flex items-center justify-between">
          {course.students && (
            <div className="flex items-center text-sm text-gray-500">
              <FiUsers className="mr-1" />
              <span>{course.students}+</span>
            </div>
          )}
          <span className="text-lg font-bold text-gray-900">${course.price.toFixed(2)}</span>
        </div>

        {/* CTA Button */}
        <Link href={`/courses/${course.id}`} passHref>
          <div className="mt-6 w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
            <span>Enroll Now</span>
            <FiArrowRight />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default CourseCard
