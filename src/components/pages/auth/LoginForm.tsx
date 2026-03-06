/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useActionState, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginPatient } from '@/services/auth/login';

interface IUser {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const [userData, setUserData] = useState<IUser>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(loginPatient, null);

  useEffect(() => {
    if (state && !isPending) {
      if (state.success) {
        toast.success(state.message || 'Login successful');
        setUserData({ email: '', password: '' });

        if (redirect) {
          router.push(redirect);
        } else {
          router.push('/');
        }
      } else {
        if (state.message) {
          toast.error(state.message);
        }

        if (state.message === "Please verify your email!") {
          router.push(`/verify-otp?email=${userData.email}`);
        }
      }
    }
  }, [state, isPending, router, redirect, userData.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const getFieldError = (fieldName: string) => {
    if (!state?.errors) return null;

    const fieldError = state.errors.find(
      (err: any) => err.field === fieldName
    );

    return fieldError?.message ?? null;
  };

  const handleQuickLogin = (type: 'user' | 'admin') => {
    if (type === 'user') {
      setUserData({
        email: 'kobirul7k@gmail.com',
        password: '12345678',
      });
    } else if (type === 'admin') {
      setUserData({
        email: 'admin@gmail.com',
        password: '12345678',
      });
    }
    toast.success(`${type === 'user' ? 'User' : 'Admin'} credentials filled!`);
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
      <form action={formAction} className="space-y-6">
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
              className={`w-full pl-12 pr-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition ${getFieldError('email')
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                }`}
            />
          </div>
          {getFieldError('email') && (
            <p className="mt-1 text-xs text-red-500">{getFieldError('email')}</p>
          )}
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
              minLength={6}
              value={userData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full pl-12 pr-12 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition ${getFieldError('password')
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
            </button>
          </div>
          {getFieldError('password') && (
            <p className="mt-1 text-xs text-red-500">{getFieldError('password')}</p>
          )}

          <div className="mt-3 text-right">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Quick Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleQuickLogin('user')}
            className="w-full py-3 rounded-xl text-white font-semibold bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            👤 User Login
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleQuickLogin('admin')}
            className="w-full py-3 rounded-xl text-white font-semibold bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🔐 Admin Login
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 rounded-xl text-white font-semibold bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isPending ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
}