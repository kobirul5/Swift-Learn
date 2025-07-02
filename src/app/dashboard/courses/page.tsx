'use client';
import { FiDelete, FiEdit } from 'react-icons/fi';
import Image from 'next/image';
import { ICourse } from '@/type/course.interface';

const Courses = () => {
  const courses: ICourse[] = [
    {
      _id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript programming language',
      price: 29.99,
      thumbnail: '/images/js-course.jpg',
      modules: ['1', '2', '3'],
      createdAt: '2023-01-15',
      updatedAt: '2023-01-20',
    },
    {
      _id: '2',
      title: 'React Masterclass',
      description: 'Master React with hooks, context, and advanced patterns',
      price: 39.99,
      thumbnail: '/images/react-course.jpg',
      modules: ['4', '5', '6', '7'],
      createdAt: '2023-02-10',
      updatedAt: '2023-03-05',
    },
    {
      _id: '3',
      title: 'Node.js Backend Development',
      description: 'Build scalable backend services with Node.js',
      price: 34.99,
      thumbnail: '/images/node-course.jpg',
      modules: ['8', '9'],
      createdAt: '2023-03-01',
      updatedAt: '2023-03-15',
    },
    {
      _id: '4',
      title: 'TypeScript for Beginners',
      description: 'Introduction to TypeScript and its core concepts',
      price: 24.99,
      thumbnail: '/images/ts-course.jpg',
      modules: ['10', '11', '12'],
      createdAt: '2023-04-05',
      updatedAt: '2023-04-20',
    },
    {
      _id: '5',
      title: 'GraphQL API Design',
      description: 'Learn to design efficient GraphQL APIs',
      price: 44.99,
      modules: ['13', '14', '15', '16'],
      createdAt: '2023-05-12',
      updatedAt: '2023-06-01',
    },
    {
      _id: '6',
      title: 'Python Crash Course',
      description: 'Quick start to Python programming',
      price: 19.99,
      thumbnail: '/images/python-course.jpg',
      modules: ['17', '18'],
      createdAt: '2023-06-10',
      updatedAt: '2023-06-25',
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">All Courses</h2>
        <div className="flex space-x-3">
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
        </div>
      </div>

      <div className="overflow-x-auto">
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
            {courses.map((course) => (
              <tr key={course._id} className="border-b hover:bg-dark-50">
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-dark-200 rounded-md mr-3 overflow-hidden">
                      {course.thumbnail && (
                        <Image
                          width={300}
                          height={300}
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-xs text-dark-500 line-clamp-1">
                        {course.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{course?.modules?.length}</td>
                <td>${course.price}</td>
                <td className="text-sm text-dark-500">
                  {course.updatedAt}
                </td>
                <td>
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-800">
                      <FiEdit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-dark-800">
                      <FiDelete size={18} />
                    </button>
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
