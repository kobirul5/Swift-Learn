import { ICourse } from '@/type/course.interface';
import Image from 'next/image'
import Link from 'next/link'


interface CourseCardProps {
  course: ICourse;
}

const CourseCard = ({ course }: CourseCardProps) => {

  if (!course) {
    return <h1>Loading.....</h1>
  }

  return (
    <div key={course._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-dark-200 flex items-center justify-center">
        <Image
          width={600}
          height={400}
          alt={course.title}
          src={course.thumbnail || '/courses/react-dev.png'}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
            {/* {course?.category} */}
            Programming
          </span>
          <span className="px-2 py-1 bg-dark-100 text-dark-800 rounded-full text-xs font-medium">
            High
          </span>
        </div>
        <h3 className="text-xl font-bold text-dark-800 mb-2">{course.title}</h3>
        <p className="text-dark-600 text-sm mb-4">By Jhonkar Mahbub</p>
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              // <span key={i}>{i < Math.floor(course.rating) ? '★' : '☆'}</span>
              <span key={i}>{i < Math.floor(course.rating) ? '' : '★'}</span>
            ))}
          </div>
          <span className="text-dark-600 text-sm">
            {course.rating}
          </span>
        </div>


        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-dark-800">${course.price}</span>
          <Link href={`/courses/details/${course._id}`} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors">
            View Course
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
