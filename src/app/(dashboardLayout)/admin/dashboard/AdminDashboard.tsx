import ProgressOverview from '@/components/admin/ProgressOverview';
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 rounded-2xl">
      <main className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-700">
            LMS Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s what&apos;s happening today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Courses */}
          <div className="bg-white rounded-2xl shadow-md border border-primary-100 p-6 transition-all hover:shadow-lg hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Courses
                </p>
                <p className="text-3xl font-bold mt-2 text-primary-700">248</p>
              </div>
              <div className="bg-primary-100 p-4 rounded-xl">
                <BookOpen className="h-7 w-7 text-primary-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1.5" />
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-gray-500 ml-1.5">this month</span>
            </div>
          </div>

          {/* Active Students */}
          <div className="bg-white rounded-2xl shadow-md border border-primary-100 p-6 transition-all hover:shadow-lg hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Students
                </p>
                <p className="text-3xl font-bold mt-2 text-primary-700">3,472</p>
              </div>
              <div className="bg-primary-100 p-4 rounded-xl">
                <Users className="h-7 w-7 text-primary-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1.5" />
              <span className="text-green-600 font-medium">+8.4%</span>
              <span className="text-gray-500 ml-1.5">this week</span>
            </div>
          </div>

          {/* New Enrollments */}
          <div className="bg-white rounded-2xl shadow-md border border-primary-100 p-6 transition-all hover:shadow-lg hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  New Enrollments
                </p>
                <p className="text-3xl font-bold mt-2 text-primary-700">+187</p>
              </div>
              <div className="bg-primary-100 p-4 rounded-xl">
                <Calendar className="h-7 w-7 text-primary-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-amber-600 font-medium">
              This week
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-2xl shadow-md border border-primary-100 p-6 transition-all hover:shadow-lg hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold mt-2 text-primary-700">$28,500</p>
              </div>
              <div className="bg-primary-100 p-4 rounded-xl">
                <DollarSign className="h-7 w-7 text-primary-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1.5" />
              <span className="text-green-600 font-medium">+19%</span>
              <span className="text-gray-500 ml-1.5">vs last month</span>
            </div>
          </div>
        </div>

        {/* Charts & Recent Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Course Activity */}
          <div className="bg-white rounded-2xl shadow-md border border-primary-100 p-7">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-primary-700">
              <BookOpen className="h-6 w-6" />
              Recent Course Activity
            </h2>
            <div className="space-y-5">
              {[
                { title: "Complete Web Development Bootcamp 2025", students: 52, date: "Today" },
                { title: "Advanced Next.js & TypeScript", students: 38, date: "Yesterday" },
                { title: "UI/UX Design Masterclass", students: 25, date: "2 days ago" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 border-b border-primary-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.students} new enrollments
                    </p>
                  </div>
                  <span className="text-sm text-primary-600 font-medium">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Progress Overview */}
          <div className="bg-white rounded-2xl shadow-md border border-primary-100 p-7">
            <ProgressOverview />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 flex flex-wrap gap-4">
          <button className="btn">
           <Link href="/admin/dashboard/courses/create-course">Add New Course</Link>
          </button>
        </div>
      </main>
    </div>
  );
}