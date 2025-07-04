
import { NextPage } from 'next';
import Link from 'next/link';


const courses = [
  {
    id: 1,
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React including components, state, and props.',
    price: 49.99,
    thumbnail: '/courses/app-development.png'
  },
  {
    id: 2,
    title: 'Advanced TypeScript',
    description: 'Deep dive into TypeScript features for enterprise applications.',
    price: 59.99,
    thumbnail: '/courses/python.png'
  },
  {
    id: 3,
    title: 'Next.js for Beginners',
    description: 'Build server-rendered React applications with Next.js.',
    price: 39.99,
    thumbnail: '/courses/react-dev.png'
  },
];

const AdminDashboard: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Courses Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Courses</h2>
              <Link href={'dashboard/courses/create-course'} className="btn">
                Add New Course
              </Link>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${course.price.toFixed(2)}</span>
                      <div className="space-x-2">
                        <button className="text-blue-500 hover:text-blue-700">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                <li className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        New course &quot;Advanced TypeScript&quot; added
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                </li>
                <li className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        5 new users registered
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        1 day ago
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;