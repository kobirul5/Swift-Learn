'use client';

import { useState } from 'react';



interface User{
  name:string,
  email:string,
  image:string,
}


export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const formData:User = {
    name: 'Kobirul Islam',
    email: 'kabi@gmail.com',
    image: 'https://i.ibb.co/M5K6Jb8B/kobirul.jpg',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // no logic needed for now
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // no logic needed for now
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto pt-32">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-dark-800">My Profile</h1>
        {/* {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn px-4 py-2 rounded-lg  transition mx-w-[50px]"
          >
            Edit Profile
          </button>
        )} */}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <img
                  src={formData.image || '/default-avatar.jpg'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <input
                  type="file"
                  className="hidden"
                  id="image-upload"
                  accept="image/*"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-dark-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-dark-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-dark-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-dark-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-dark-300 rounded-md text-dark-700 hover:bg-dark-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <img
                src={formData.image || '/default-avatar.jpg'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{formData.name}</h2>
              <p className="text-dark-600">{formData.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-dark-500 mb-1">Role</h3>
                <p className="text-dark-800 capitalize">student</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-dark-500 mb-1">Member Since</h3>
                <p className="text-dark-800">July 1, 2024</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-dark-800 mb-4">My Courses</h3>
              <div className="bg-dark-50 p-4 rounded-lg">
                <p className="text-dark-600">You haven&apos;t enrolled in any courses yet.</p>
                <button className="mt-2 text-primary-600 hover:text-primary-800">
                  Browse Courses
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
