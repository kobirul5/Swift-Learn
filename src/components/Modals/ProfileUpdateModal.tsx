'use client';

import { useUpdateMeMutation } from '@/redux/api/userApi';
import { IUser } from '@/type/user.interface';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiX, FiLoader, FiCamera } from 'react-icons/fi';
import Image from 'next/image';

interface ProfileUpdateModalProps {
    user: IUser;
    onClose: () => void;
}

export default function ProfileUpdateModal({ user, onClose }: ProfileUpdateModalProps) {
    const [updateMe, { isLoading }] = useUpdateMeMutation();

    const [name, setName] = useState(user.name || '');
    const [education, setEducation] = useState(user.education || '');
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100">

                {/* Header */}
                <div className="bg-linear-to-r from-primary-600 to-primary-500 p-6">
                    <div className="flex justify-between items-center text-white">
                        <h2 className="text-2xl font-bold">Edit Profile</h2>
                        <button
                            onClick={onClose}
                            className="hover:bg-white/20 p-2 rounded-full transition-all outline-none"
                        >
                            <FiX className="text-2xl" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">

                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center gap-4 mb-2">
                        <div className="relative group cursor-pointer" onClick={() => document.getElementById('profile-image-input')?.click()}>
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-50 shadow-lg group-hover:border-primary-100 transition-all">
                                <Image
                                    src={imagePreview || "/logo/logo.png"}
                                    alt="Profile Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <FiCamera className="text-white text-2xl" />
                            </div>
                            <input
                                id="profile-image-input"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                        <p className="text-sm font-medium text-primary-600">Click avatar to change photo</p>
                    </div>

                    <div className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:outline-none transition-all duration-200"
                            />
                        </div>

                        {/* Education */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Learning / Education</label>
                            <input
                                type="text"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                                placeholder="e.g. Computer Science Student"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:outline-none transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-6 py-3.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-primary-200"
                        >
                            {isLoading ? (
                                <>
                                    <FiLoader className="animate-spin text-xl" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
