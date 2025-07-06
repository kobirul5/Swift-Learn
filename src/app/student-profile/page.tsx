'use client'
import { useGetUserQuery } from '@/features/userAPI';
import { IUser } from '@/type/user.interface';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ProfilePage: NextPage = () => {
  // User data - in a real app, this would come from an API or context

  const [user, setUser] = useState<IUser>({
    _id: "",
    name: "",
    email: "",
    image: "",
  });
  const { data, isLoading } = useGetUserQuery(undefined);

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <h1 className="text-center py-40 mx-auto">Loading....</h1>;
  }



  // const user: IUser = {
  //   _id: "asdfsdfadfasd",
  //   name: "Md. Kobirul Islam",
  //   email: "kobirul@gmail.com",
  //   image: "https://i.ibb.co/G4yDhqLg/man-7.jpg",
  //   role: "admin"
  // };

  return (
    <div className="min-h-screen  pt-20">

      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
            <div className="flex items-center">
              <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src={user.image || "/public/logo/logo.png"}
                  alt={user.name || 'user name'}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-primary-100">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-dark-800 mb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-1">Full Name</label>
                  <div className="p-3 bg-dark-50 rounded-md border border-dark-200">
                    {user.name}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-1">Email Address</label>
                  <div className="p-3 bg-dark-50 rounded-md border border-dark-200">
                    {user.email}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-dark-600 mb-1">Role</label>
                  <div className="p-3 bg-dark-50 rounded-md border border-dark-200">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-dark-200 pt-6">
              <h2 className="text-xl font-semibold text-dark-800 mb-4">Account Settings</h2>
              
              <div className="space-y-4">
                <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                  Edit Profile
                </button>
                
                <button className="ml-4 px-4 py-2 bg-dark-200 text-dark-800 rounded-md hover:bg-dark-300 transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;