'use client'
import { useGetUserQuery } from '@/redux/api/userApi';
import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import Loader from '@/components/Shared/Loader';
import ProfileUpdateModal from '@/components/Modals/ProfileUpdateModal';
import ChangePasswordModal from '@/components/Modals/ChangePasswordModal';

const ProfilePage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { data, isLoading } = useGetUserQuery(undefined);


  if (isLoading) {
    return <Loader message="Retrieving your profile..." minHeight="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/80">
          {/* === Hero / Header Section === */}
          <div className="bg-linear-to-r from-primary-500 to-primary-600 px-6 py-10 md:py-12 lg:py-14 text-white relative overflow-hidden">
            {/* subtle overlay pattern (optional eye-catching effect) */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_70%,white_1px,transparent_1px)] bg-size-[20px_20px]" />

            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              <div className="relative">
                <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border-4 border-white/90 shadow-2xl ring-2 ring-white/30">
                  <Image
                    src={data?.data?.image || "/public/logo/logo.png"}
                    alt={data?.data.name || "Profile"}
                    fill
                    className="object-cover rounded-full "
                  />
                </div>
                {/* subtle glow effect */}
                <div className="absolute -inset-2 rounded-full bg-white/20 blur-xl -z-10" />
              </div>

              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight drop-shadow-md">
                  {data?.data.name || "Welcome"}
                </h1>
                <p className="mt-2 text-lg text-primary-100/90 font-medium">
                  {data?.data.role ? data?.data.role.charAt(0).toUpperCase() + data?.data.role.slice(1) : "User"}
                </p>
              </div>
            </div>
          </div>

          {/* === Main Content === */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-dark-800 mb-6 border-b border-primary-100 pb-3">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  { label: "Full Name", value: data?.data.name || "—" },
                  { label: "Email Address", value: data?.data.email || "—" },
                  { label: "Education / Learning", value: data?.data.education || "—" },
                  { label: "Role", value: data?.data.role || "User", isBadge: true },
                ].map((item, idx) => (
                  <div key={idx} className="group">
                    <label className="block text-sm font-medium text-dark-600 mb-2.5">
                      {item.label}
                    </label>
                    {item.isBadge ? (
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 font-medium shadow-sm transition-all group-hover:shadow-md">
                        {item.value}
                      </div>
                    ) : (
                      <div className="p-4 bg-dark-50/70 rounded-xl border border-dark-200 text-dark-800 font-medium transition-all group-hover:shadow-md group-hover:border-primary-200">
                        {item.value}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-dark-200">
              <h2 className="text-2xl font-bold text-dark-800 mb-6">Account Actions</h2>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-7 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="px-7 py-3 bg-dark-200 text-dark-800 font-medium rounded-xl hover:bg-dark-300 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && data?.data && (
        <ProfileUpdateModal
          user={data.data}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isPasswordModalOpen && (
        <ChangePasswordModal
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;