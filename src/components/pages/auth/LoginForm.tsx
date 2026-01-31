/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { FiMail, FiLock } from 'react-icons/fi';
import { useLoginUserMutation } from '@/redux/api/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

interface IUser {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [loginUser] = useLoginUserMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const [userData, setUserData] = useState<IUser>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res: any = await loginUser(userData);

      if (res?.data?.success) {
        Cookies.set('accessToken', res.data.token);
        if (res.data.refreshToken) {
            Cookies.set('refreshToken', res.data.refreshToken);
        }
        toast.success('Login successful');
        setUserData({ email: '', password: '' });
        
        if (redirect) {
            router.push(redirect);
        } else {
            router.push('/');
        }
       
      } else {
        toast.error(res.error.data.message || "Something went wrong");
        if(res.error.data.message === "Please verify your email!") {
          router.push(`/verify-otp?email=${userData.email}`);
        }
      }
    } catch (err:any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
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
              type="password"
              required
              minLength={8}
              value={userData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
          </div>

          <div className="mt-3 text-right">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl text-white font-semibold bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 transition shadow-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}