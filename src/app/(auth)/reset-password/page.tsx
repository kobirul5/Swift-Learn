/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/api/auth";
// Assuming you have an RTK Query mutation for resetting password
// import { useResetPasswordMutation } from '@/redux/api/auth';

interface IResetPassword {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordForm() {
  // If you need a token from URL (e.g., ?token=abc123)
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email"); // optional, for pre-filling
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const router = useRouter();


  const [formData, setFormData] = useState<IResetPassword>({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }


    try {
      
        const res : any = await resetPassword({ password: formData.password, email }).unwrap();
      // Mock success for demo
      toast.success("Password reset successfully!");

      setFormData({ password: "", confirmPassword: "" });

        router.push("/");
     
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reset password");
     
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100 max-w-md mx-auto  w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
        <p className="text-sm text-gray-600 mt-2">
          Enter your new password below.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 ">
        {/* New Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            New Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-primary-500
                         focus:border-primary-500 transition"
            />
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-primary-500
                         focus:border-primary-500 transition"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 rounded-xl text-white font-semibold
                     bg-primary-600 hover:bg-primary-700 disabled:opacity-70
                     focus:ring-4 focus:ring-primary-300
                     transition shadow-lg"
        >
          {isLoading ? "Resetting Password..." : "Reset Password"}
        </button>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
    </div>
  );
}
