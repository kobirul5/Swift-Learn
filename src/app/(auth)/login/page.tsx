import LoginForm from '@/components/pages/auth/LoginForm';
import Link from 'next/link';
import { GraduationCap, BookOpen, Users, Lightbulb } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Education Theme Illustration */}
      <div className={`hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary-600 to-primary-800 relative overflow-hidden`}>

        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col justify-center items-start text-white px-16 py-12">
          <GraduationCap className="w-20 h-20 mb-8" />
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Learn Without Limits
          </h2>
          <p className="text-xl mb-12 max-w-lg opacity-95">
            Access premium courses, expert instructors, and a vibrant learning community — all in one place.
          </p>

          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <BookOpen className="w-12 h-12 mx-auto mb-3" />
              <p className="text-3xl font-bold">500+</p>
              <p className="text-lg">Courses</p>
            </div>
            <div>
              <Users className="w-12 h-12 mx-auto mb-3" />
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-lg">Students</p>
            </div>
            <div>
              <Lightbulb className="w-12 h-12 mx-auto mb-3" />
              <p className="text-3xl font-bold">98%</p>
              <p className="text-lg">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#f3f4f6"
              fillOpacity="0.15"
              d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,186.7C672,171,768,149,864,154.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-3 text-lg text-gray-600">Continue your learning journey</p>
          </div>

          <LoginForm />

          <p className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-primary-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}