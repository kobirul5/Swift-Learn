'use client';

// import { useGetMyCoursesQuery } from '@/features/courseAPI';
import Link from 'next/link';

const courses = [
  {
    _id: 'course1',
    title: 'JavaScript for Beginners',
    thumbnail: 'https://i.ibb.co/9n8Nn7b/js-course.jpg',
    instructor: { name: 'John Doe' },
    progress: 30,
  },
  {
    _id: 'course2',
    title: 'React Mastery',
    thumbnail: 'https://i.ibb.co/kK4vRQr/react-course.jpg',
    instructor: { name: 'Jane Smith' },
    progress: 70,
  },
  {
    _id: 'course3',
    title: 'Node.js & Express Bootcamp',
    thumbnail: 'https://i.ibb.co/LN1KgM5/node-course.jpg',
    instructor: { name: 'Kabirul Islam' },
    progress: 50,
  },
];

export default function MyCourses() {
//   const { data: courses, isLoading } = useGetMyCoursesQuery();

//   if (isLoading) return <p>Loading...</p>;
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
              <p className="text-gray-600 text-sm mb-2">By {course.instructor?.name || 'Instructor'}</p>

              {/* Optional: Progress bar */}
              <div className="w-full bg-gray-200 h-2 rounded mb-3">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>

              <Link
                href={`/courses/${course._id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
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
