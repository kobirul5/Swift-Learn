'use client';

import { useUpdateMeMutation } from '@/redux/api/userApi';
import { IUser } from '@/type/user.interface';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
    FiX,
    FiLoader,
    FiCamera,
    FiUser,
    FiPhone,
    FiMapPin,
    FiBook,
    FiFileText,
    FiCheck,
    FiEdit2
} from 'react-icons/fi';
import Image from 'next/image';

interface ProfileUpdateModalProps {
    user: IUser;
    onClose: () => void;
}

export default function ProfileUpdateModal({ user, onClose }: ProfileUpdateModalProps) {
    const [updateMe, { isLoading }] = useUpdateMeMutation();

    const [name, setName] = useState(user.name || '');
    const [education, setEducation] = useState(user.education || '');
    const [bio, setBio] = useState(user.bio || '');
    const [address, setAddress] = useState(user.address || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [additionalInfo, setAdditionalInfo] = useState(user.additionalInfo || '');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(user.image || null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        const data = {
            name,
            education,
            bio,
            address,
            phone,
            additionalInfo
        };

        formData.append('data', JSON.stringify(data));
        if (imageFile) {
            formData.append('file', imageFile);
        }

        try {
            const res = await updateMe(formData).unwrap();

            if (res?.success) {
                toast.success('Profile updated successfully!');
                onClose();
            } else {
                toast.error(res?.message || 'Failed to update profile');
            }
        } catch (error: any) {
            console.error('Update Error:', error);
            const errorMessage =
                error?.data?.message ||
                error?.message ||
                (typeof error?.data === 'string' ? error.data : null) ||
                'Something went wrong!';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">

                {/* --- Header --- */}
                <div className="bg-linear-to-r from-primary-600 to-primary-500 p-8 text-white relative">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_70%,white_1px,transparent_1px)] bg-size-[20px_20px]" />
                    <div className="relative flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                                <FiEdit2 className="w-8 h-8" />
                                Edit Profile
                            </h2>
                            <p className="text-primary-100 font-medium mt-1">Refine your digital presence</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-white/20 hover:bg-white/30 p-3 rounded-2xl transition-all outline-none active:scale-90"
                        >
                            <FiX className="text-2xl" />
                        </button>
                    </div>
                </div>

                {/* --- Content (Scrollable) --- */}
                <div className="overflow-y-auto custom-scrollbar flex-1">
                    <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-10">

                        {/* Avatar Section */}
                        <div className="flex flex-col items-center gap-4">
                            <div
                                className="relative group cursor-pointer"
                                onClick={() => document.getElementById('profile-image-input')?.click()}
                            >
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-xl group-hover:border-primary-100 transition-all duration-500 relative">
                                    <Image
                                        src={imagePreview || "/logo/logo.png"}
                                        alt="Profile Preview"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-primary-600/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <FiCamera className="text-white text-3xl" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-primary-600 text-white p-2.5 rounded-2xl shadow-lg border-2 border-white ring-4 ring-primary-50">
                                     <FiCamera className="w-4 h-4" />
                                </div>
                                <input
                                    id="profile-image-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                            <p className="text-sm font-bold text-slate-400 tracking-wide uppercase">Click photo to upload</p>
                        </div>

                        {/* Form Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Name */}
                            <div className="space-y-2 group">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-primary-600 transition-colors">
                                    <FiUser className="w-3.5 h-3.5" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Enter your name"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white outline-none transition-all duration-300 font-semibold text-slate-700"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2 group">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-emerald-600 transition-colors">
                                    <FiPhone className="w-3.5 h-3.5" />
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+123 456 7890"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all duration-300 font-semibold text-slate-700"
                                />
                            </div>

                            {/* Education */}
                            <div className="space-y-2 group">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-blue-600 transition-colors">
                                    <FiBook className="w-3.5 h-3.5" />
                                    Education
                                </label>
                                <input
                                    type="text"
                                    value={education}
                                    onChange={(e) => setEducation(e.target.value)}
                                    placeholder="Computer Science Student"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all duration-300 font-semibold text-slate-700"
                                />
                            </div>

                            {/* Address */}
                            <div className="space-y-2 group">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-rose-600 transition-colors">
                                    <FiMapPin className="w-3.5 h-3.5" />
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Dhaka, Bangladesh"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 focus:bg-white outline-none transition-all duration-300 font-semibold text-slate-700"
                                />
                            </div>

                            {/* Bio - Full Width */}
                            <div className="md:col-span-2 space-y-2 group">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-amber-600 transition-colors">
                                    <FiFileText className="w-3.5 h-3.5" />
                                    Bio / Biography
                                </label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={3}
                                    placeholder="Tell the world about yourself..."
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 font-semibold text-slate-700 resize-none h-32"
                                />
                            </div>

                            {/* Additional Info - Full Width */}
                            <div className="md:col-span-2 space-y-2 group">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-indigo-600 transition-colors">
                                    <FiFileText className="w-3.5 h-3.5" />
                                    Additional Information
                                </label>
                                <textarea
                                    value={additionalInfo}
                                    onChange={(e) => setAdditionalInfo(e.target.value)}
                                    rows={2}
                                    placeholder="Any other details you'd like to share..."
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all duration-300 font-semibold text-slate-700 resize-none h-24"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* --- Footer (Actions) --- */}
                <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-8 py-4.5 rounded-[1.25rem] bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
                    >
                        Dismiss
                    </button>
                    <button
                        type="submit"
                        onClick={(e: any) => handleSubmit(e)}
                        disabled={isLoading}
                        className="flex-[1.5] px-8 py-4.5 rounded-[1.25rem] bg-primary-600 text-white font-black hover:bg-primary-700 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-3 shadow-xl shadow-primary-200"
                    >
                        {isLoading ? (
                            <>
                                <FiLoader className="animate-spin text-2xl" />
                                Synchronizing...
                            </>
                        ) : (
                            <>
                                <FiCheck className="text-2xl" />
                                Save Profile
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
