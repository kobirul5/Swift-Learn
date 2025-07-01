'use client'
import { useGetUserQuery } from '@/features/userAPI';
import Image from 'next/image';
import { FiBell, FiSearch, FiMenu } from 'react-icons/fi';

export default function DashboardHeader() {

      const {data} = useGetUserQuery(undefined)
      console.log(data)

  return (
    <div className="bg-white shadow-sm">
      <div className="px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Mobile menu button */}
        <button className="md:hidden text-dark-500 focus:outline-none">
          <FiMenu className="h-6 w-6" />
        </button>
        
        {/* Search */}
        <div className="relative max-w-md w-full mx-4 hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-dark-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border border-dark-300 rounded-md leading-5 bg-white placeholder-dark-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full text-dark-400 hover:text-dark-500 focus:outline-none">
            <FiBell className="h-6 w-6" />
          </button>
          
          {/* User dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-2 focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-medium">
                    <Image src="/logo/logo.png" alt="logo" width={30} height={30} />
                </span>
              </div>
              <span className="hidden md:block text-sm font-medium text-dark-700">User</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}