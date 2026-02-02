'use client'
import ProgressOverview from '@/components/admin/ProgressOverview';
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import { useGetAdminStatsQuery } from '@/redux/api/metaApi';

export default function DashboardPage() {
  const { data: statsData, isLoading } = useGetAdminStatsQuery({});
  const stats = statsData?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
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
                <p className="text-3xl font-bold mt-2 text-primary-700">{stats?.totalCourses || 0}</p>
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
                <p className="text-3xl font-bold mt-2 text-primary-700">{stats?.activeStudents || 0}</p>
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
                <p className="text-3xl font-bold mt-2 text-primary-700">+{stats?.newEnrollments || 0}</p>
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
                <p className="text-3xl font-bold mt-2 text-primary-700">${stats?.totalRevenue?.toLocaleString() || 0}</p>
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
              {(stats?.recentActivity || []).map((enrollment: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 border-b border-primary-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-800">{enrollment.course?.title}</p>
                    <p className="text-sm text-gray-500">
                      Enrolled by {enrollment.student?.name}
                    </p>
                  </div>
                  <span className="text-sm text-primary-600 font-medium">
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
              {(!stats?.recentActivity || stats.recentActivity.length === 0) && (
                <p className="text-center text-gray-500 py-4">No recent activity</p>
              )}
            </div>
          </div>

          {/* Student Progress Overview */}
          <div className="bg-white rounded-2xl shadow-md border border-primary-100 p-7">
            <ProgressOverview stats={stats} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/admin/dashboard/courses/create-course" className="btn">Add New Course</Link>
        </div>
      </main>
    </div>
  );
}