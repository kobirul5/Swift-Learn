'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { IUser } from '@/type/user.interface';


export default function SignupPage() {
  const [userData, setUserData] = useState<IUser>({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(userData)

  }


  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-dark-900">Create your account</h1>
          <p className="mt-2 text-sm text-dark-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-dark-400" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={userData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 border border-dark-300 rounded-md"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-dark-400" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={userData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 border border-dark-300 rounded-md"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-dark-400" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={userData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-dark-300 rounded-md"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-dark-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-3 border border-dark-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
