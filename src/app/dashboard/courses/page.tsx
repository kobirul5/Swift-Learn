'use client';
import { FiDelete, FiEdit } from 'react-icons/fi';
// import Image from 'next/image';
import Link from 'next/link';
import { useGetCourseQuery } from '@/features/courseAPI';
import { ICourse } from '@/type/course.interface';

const Courses = () => {
  const {data:courses, isLoading} = useGetCourseQuery(undefined)
  console.log(courses,"----------")

  if(isLoading){
    return <h1>Loading...</h1>
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex flex-col md:flex-row justify-between items-center  mb-6">
        <h2 className="text-xl font-semibold">All Courses</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center space-x-3">
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="border rounded-lg px-4 py-2 text-sm"
          />
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Filter by status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
          <div>
            <Link href='/dashboard/courses/create-course' className='btn' > Add Course</Link>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto textc">
        <table className="min-w-full">
          <thead>
            <tr className="border-b text-dark-500 text-left text-sm">
              <th className="pb-3">Course</th>
              <th className="pb-3">Modules</th>
              <th className="pb-3">Price</th>
              <th className="pb-3">Last Updated</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(courses?.data as ICourse[]).map((course, idx) => (
              <tr key={idx} className="border-b hover:bg-dark-50">
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-dark-200 rounded-md mr-3 overflow-hidden">
                      {course.thumbnail && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          // width={300}
                          // height={300}
                          src={course?.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-xs text-dark-500 line-clamp-1">
                        {course.description?.slice(0,50)}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{course?.modules?.length}</td>
                <td>${course.price}</td>
                <td className="text-sm text-dark-500">
                  {course.updatedAt && new Date(course.updatedAt).toLocaleDateString()}
                </td>
                <td>
                  <div className="flex space-x-2 gap-2">
                    <button className="text-green-600 hover:text-green-800">
                      <FiEdit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-dark-800">
                      <FiDelete size={18} />
                    </button>
                    <Link 
                    // href={`/dashboard/courses/details/4555`} 
                    href={`/dashboard/courses/details/${course._id}`} 
                    className="text-primary-600 border px-4 p-2 rounded-xl hover:text-white  hover:bg-primary-800">
                      View Details
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
