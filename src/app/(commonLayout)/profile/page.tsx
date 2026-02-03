'use client'
import { useGetUserQuery } from '@/redux/api/userApi';
import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import Loader from '@/components/Shared/Loader';
import ProfileUpdateModal from '@/components/Modals/ProfileUpdateModal';
import ChangePasswordModal from '@/components/Modals/ChangePasswordModal';
import LogoutButton from '@/components/Shared/Logout/LogoutButton';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiBook, 
  FiFileText, 
  FiShield,
  FiEdit2,
  FiLock,
  FiCalendar
} from 'react-icons/fi';

const ProfilePage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { data, isLoading } = useGetUserQuery(undefined);

  if (isLoading) {
    return <Loader message="Retrieving your profile..." minHeight="min-h-screen" />;
  }

  const user = data?.data;

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* === Layout Grid === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- Left Sidebar: Profile Summary --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden text-center p-8 transition-all hover:shadow-md">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-primary-500 rounded-full blur-2xl opacity-20 animate-pulse" />
                <div className="relative w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden active:scale-95 transition-transform duration-300">
                  <Image
                    src={user?.image || "/logo/logo.png"}
                    alt={user?.name || "Profile"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-1">
                {user?.name || "Learning Navigator"}
              </h1>
              <p className="text-slate-500 font-medium mb-6">
                {user?.role ? user?.role.toUpperCase() : "STUDENT"}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-primary-200 active:scale-95"
                >
                  <FiEdit2 className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl transition-all active:scale-95"
                >
                  <FiLock className="w-4 h-4" />
                  Security
                </button>
                <LogoutButton 
                  className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-3.5 rounded-2xl transition-all active:scale-95 shadow-sm shadow-rose-100"
                />
              </div>
            </div>

            {/* Quick Status Bar */}
            <div className="bg-white rounded-4xl shadow-sm border border-slate-100 p-6 flex justify-around">
               <div className="text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    Active
                  </div>
               </div>
               <div className="w-px h-10 bg-slate-100" />
               <div className="text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Level</p>
                  <p className="text-slate-800 font-bold">Expert</p>
               </div>
            </div>
          </div>

          {/* --- Right Content: Detailed Info --- */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Bio Card */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 lg:p-10 transition-all hover:shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                  <FiFileText className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Biography</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">
                {user?.bio || "No biography provided yet. Tell us about your learning journey!"}
              </p>
            </div>

            {/* Information Grid */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 lg:p-10 transition-all hover:shadow-md">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                  <FiUser className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Core Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: <FiMail />, label: "Email Address", value: user?.email, color: "text-blue-500" },
                  { icon: <FiPhone />, label: "Phone Number", value: user?.phone, color: "text-emerald-500" },
                  { icon: <FiMapPin />, label: "Location", value: user?.address, color: "text-rose-500" },
                  { icon: <FiBook />, label: "Education", value: user?.education, color: "text-purple-500" },
                  { icon: <FiCalendar />, label: "Joined", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Founding Member", color: "text-amber-500" },
                  { icon: <FiShield />, label: "Account Permission", value: user?.role, isBadge: true, color: "text-slate-500" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className={`mt-1 p-2.5 rounded-xl bg-slate-50 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 underline decoration-slate-200 underline-offset-4 mb-1 uppercase tracking-wider">
                        {item.label}
                      </p>
                      {item.isBadge ? (
                         <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-black rounded-full uppercase tracking-tighter">
                            {item.value}
                         </span>
                      ) : (
                        <p className="text-slate-800 font-semibold truncate max-w-[200px]">
                          {item.value || "Not set"}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info Block */}
            <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-8 lg:p-10 text-white shadow-xl">
               <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/10 rounded-2xl text-white">
                  <FiFileText className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight">Additional Notes</h2>
              </div>
              <p className="text-slate-300 leading-relaxed italic">
                {user?.additionalInfo || "No additional information provided."}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      {isModalOpen && user && (
        <ProfileUpdateModal
          user={user}
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