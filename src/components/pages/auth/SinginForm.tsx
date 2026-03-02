/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useCreateUserMutation } from '@/redux/api/auth';
import { useRouter } from 'next/navigation';



interface IUser {
  name: string;
  email: string;
  password: string;
}

export default function SignupForm() {
 const [registerUser, { isLoading }] = useCreateUserMutation();
 const router = useRouter();

  const [userData, setUserData] = useState<IUser>({
    name: '',
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userData.password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
     const res = await registerUser(userData).unwrap();
      
     if (!res.success) {
       toast.error('Registration failed. Please try again.');
       return;
     }
      toast.success('Account created successfully');
      
      setUserData({ name: '', email: '', password: '' });
      setConfirmPassword('');
       router.push(`/verify-otp?email=${encodeURIComponent(userData.email)}`);
      
   
    } catch (error:any) {
     toast.error(error?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input
              id="name"
              name="name"
              type="text"
              required
              value={userData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-primary-500
                         focus:border-primary-500 transition"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input
              id="email"
              name="email"
              type="email"
              required
              value={userData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-primary-500
                         focus:border-primary-500 transition"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              value={userData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-primary-500
                         focus:border-primary-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-primary-500
                         focus:border-primary-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Submit */}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 rounded-xl text-white font-semibold
                     bg-primary-600 hover:bg-primary-700
                     focus:ring-4 focus:ring-primary-300
                     transition shadow-lg"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
