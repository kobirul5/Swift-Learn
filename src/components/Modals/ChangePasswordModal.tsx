'use client';

import { useChangePasswordMutation } from '@/redux/api/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiX, FiLoader, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

interface ChangePasswordModalProps {
    onClose: () => void;
}

export default function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return toast.error('New passwords do not match!');
        }

        if (newPassword.length < 6) {
            return toast.error('Password must be at least 6 characters long!');
        }

        try {
            const res = await changePassword({ oldPassword, newPassword }).unwrap();

            if (res?.success) {
                toast.success('Password changed successfully!');
                onClose();
            } else {
                toast.error(res?.message || 'Failed to change password');
            }
        } catch (error: any) {
            console.error('Password Change Error:', error);
            // Handle different error formats safely
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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">

                {/* Header */}
                <div className="bg-linear-to-r from-dark-800 to-dark-700 p-6">
                    <div className="flex justify-between items-center text-white">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <FiLock className="text-primary-400" />
                            Change Password
                        </h2>
                        <button
                            onClick={onClose}
                            className="hover:bg-white/20 p-2 rounded-full transition-all outline-none"
                        >
                            <FiX className="text-2xl" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">

                    {/* Old Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Current Password</label>
                        <div className="relative">
                            <input
                                type={showOld ? "text" : "password"}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:outline-none transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOld(!showOld)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                            >
                                {showOld ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">New Password</label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:outline-none transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                            >
                                {showNew ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:outline-none transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                            >
                                {showConfirm ? <FiEyeOff /> : <FiEye />}
                            </button>
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
                            className="flex-1 px-6 py-3.5 rounded-xl bg-dark-800 text-white font-semibold hover:bg-dark-900 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <FiLoader className="animate-spin text-xl" />
                                    Updating...
                                </>
                            ) : (
                                'Update Password'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
