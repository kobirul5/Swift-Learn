
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLoginUserMutation } from '@/features/userAPI';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FiLock, FiMail } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/authSlice';

interface IUser {
  email: string,
  password: string
}

export default function LoginPage() {

  const [loginUser] = useLoginUserMutation()
  const router = useRouter()

  const [userData, setUserData] = useState<IUser>({
    email: '',
    password: ''
  });
  const dispatch = useDispatch()

  // handle form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle user login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await loginUser(userData)
    console.log("------------------data fr", res.data.data.email)

    if (res.data?.success) {
      const data = {
        name: res.data.data.name,
        email: res.data.data.email,
        role: res.data.data.role
      }
      dispatch(setUser(data))
      toast.success("Login successfully")
      router.push("/")
    }

    if (!res.data.success) {
      toast.error("Invalid user")
      return
    }

    setUserData({ email: "", password: "" });
  }


  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-dark-900">Create your account</h1>
          <p className="mt-2 text-sm text-dark-600">
            You don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
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
